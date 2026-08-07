<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing / last verified: 2026-08-07 -->

# Classification prompt with evaluation workflow

Route customer support tickets by intent using a fast model, then measure accuracy with exact-match evaluation.

```python
import re
import anthropic

client = anthropic.Anthropic()
DEFAULT_MODEL = "claude-haiku-4-5-20251001"

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
        max_tokens=500,
        temperature=0,
        messages=[{"role": "user", "content": classification_prompt}],
        stream=False,
    )
    text = message.content[0].text
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

- `temperature=0` is valid here because the model is Claude Haiku 4.5 — on Sonnet-class models (Sonnet 5+), non-default `temperature`/`top_p`/`top_k` returns a 400 error; drop the parameter if adapting this to Sonnet.
- Splitting `<reasoning>` and `<intent>` into separate tags lets each be parsed independently with regex for downstream routing logic.
- Categories must be clear and well-scoped — routing accuracy is directly proportional to how well-defined the category list is.
- Wire the exact-match evaluator into a held-out labeled ticket set to track accuracy over time, per the eval-design workflow in `eval-rubric-workflow.md`.
