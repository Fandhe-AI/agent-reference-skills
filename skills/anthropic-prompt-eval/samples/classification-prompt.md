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
    if message.stop_reason == "refusal":
        # stop_details.category: cyber / frontier_llm / bio / general_harms
        return None, None
    text = next((block.text for block in message.content if block.type == "text"), "")
    reasoning_match = re.search(r"<reasoning>(.*?)</reasoning>", text, re.DOTALL)
    intent_match = re.search(r"<intent>(.*?)</intent>", text, re.DOTALL)
    reasoning = reasoning_match.group(1).strip() if reasoning_match else None
    intent = intent_match.group(1).strip() if intent_match else None
    return reasoning, intent


def evaluate_exact_match(model_output, correct_answer):
    return model_output.strip().lower() == correct_answer.lower()


tickets = [
    {"text": "My password reset link keeps expiring before I can use it.", "intent": "Technical issue"},
    {"text": "I want to update the billing email on my account.", "intent": "Account management"},
]
outputs = [classify_support_request(t["text"])[1] for t in tickets]
# Refused or unparsable tickets (None) are counted as needs-review and excluded from accuracy
scored = [(o, t) for o, t in zip(outputs, tickets) if o is not None]
needs_review = len(tickets) - len(scored)
accuracy = (
    sum(evaluate_exact_match(o, t["intent"]) for o, t in scored) / len(scored)
    if scored else 0.0
)
print(f"Routing accuracy: {accuracy * 100}% (needs review: {needs_review})")
```

## Notes

- `effort: "low"` is the Haiku 5.5 level the official guide recommends for chat, short tool tasks, and simple high-volume requests; compare two or three levels on your own evals. `temperature` is omitted because non-default `temperature` / `top_p` / `top_k` returns a 400 error on Claude 4.7 and later models (including Haiku 5.5); the earlier `temperature=0` was for Haiku 4.5.
- Thinking is on by default on Haiku 5.5 and counts toward `max_tokens`; a limit sized for Haiku 4.5 without thinking can cut the reply off, so `max_tokens` is raised and the text block is read by type.
- Haiku 5.5 safety classifiers can return `stop_reason: "refusal"` with `stop_details.category` (`cyber`, `frontier_llm`, `bio`, `general_harms`). There is no server-side fallback, so handle it in the client; sending the same request again usually returns another refusal.
- Splitting `<reasoning>` and `<intent>` into separate tags lets each be parsed independently with regex for downstream routing logic.
- Categories must be clear and well-scoped — routing accuracy is directly proportional to how well-defined the category list is. Wire the exact-match evaluator into a held-out labeled ticket set (see `eval-rubric-workflow.md`).
