<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing, https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5 / last verified: 2026-10-17 -->

# Classification prompt with evaluation workflow

Route customer support tickets by intent using a fast model, then measure accuracy with exact-match evaluation.

```python
import re
import anthropic

client = anthropic.Anthropic()
DEFAULT_MODEL = "claude-haiku-5-5"

def classify_support_request(ticket_contents):
    classification_prompt = f"""You will be acting as a customer support ticket
    classification system. Analyze the request and output your reasoning inside
    <reasoning> tags, then the intent inside <intent> tags.

    Categories: Technical issue, Account management, Product information,
    Feedback, Order-related.

    <request>{ticket_contents}</request>
    """
    message = client.messages.create(
        model=DEFAULT_MODEL,
        max_tokens=4000,  # thinking counts toward max_tokens; leave room for it
        output_config={"effort": "low"},
        messages=[{"role": "user", "content": classification_prompt}],
    )
    text = next(block.text for block in message.content if block.type == "text")
    reasoning = re.search(r"<reasoning>(.*?)</reasoning>", text, re.DOTALL).group(1).strip()
    intent = re.search(r"<intent>(.*?)</intent>", text, re.DOTALL).group(1).strip()
    return reasoning, intent


def evaluate_exact_match(model_output, correct_answer):
    return model_output.strip().lower() == correct_answer.lower()


tickets = [
    {"text": "My password reset link keeps expiring before I can use it.", "intent": "Technical issue"},
    {"text": "I want to update the billing email on my account.", "intent": "Account management"},
]
outputs = [classify_support_request(t["text"])[1] for t in tickets]
accuracy = sum(
    evaluate_exact_match(output, t["intent"]) for output, t in zip(outputs, tickets)
) / len(tickets)
print(f"Routing accuracy: {accuracy * 100}%")
```

## Notes

- `effort: "low"` is the Haiku 5.5 level the official guide recommends for chat, short tool tasks, and simple high-volume requests; compare two or three levels on your own evals. `temperature` is omitted because non-default `temperature` / `top_p` / `top_k` returns a 400 error on Claude 4.7 and later models (including Haiku 5.5); the earlier `temperature=0` was for Haiku 4.5.
- Thinking is on by default on Haiku 5.5 and counts toward `max_tokens`; a limit sized for Haiku 4.5 without thinking can cut the reply off, so `max_tokens` is raised and the text block is read by type.
- Splitting `<reasoning>` and `<intent>` into separate tags lets each be parsed independently with regex for downstream routing logic.
- Categories must be clear and well-scoped — routing accuracy is directly proportional to how well-defined the category list is. Wire the exact-match evaluator into a held-out labeled ticket set (see `eval-rubric-workflow.md`).
