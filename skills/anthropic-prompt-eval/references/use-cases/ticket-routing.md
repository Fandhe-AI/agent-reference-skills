<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing / last verified: 2026-08-07 -->

# Ticket routing

Guide to classifying customer support tickets at scale by intent, urgency, prioritization, and customer profile using Claude. See the [classification cookbook](https://platform.claude.com/cookbook/capabilities-classification-guide) for evaluation guidance.

## Signature / Usage

```python
import re

client = anthropic.Anthropic()
DEFAULT_MODEL = "claude-haiku-4-5-20251001"

def classify_support_request(ticket_contents):
    classification_prompt = f"""You will be acting as a customer support ticket
    classification system. Analyze the request and output your reasoning inside
    <reasoning> tags, then the intent inside <intent> tags.

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
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| ticket_contents | str | Raw customer support request text |
| DEFAULT_MODEL | str | `claude-haiku-4-5-20251001` — fastest/cheapest Claude 4 model, sufficient for most routing; use Sonnet for deep subject-matter expertise or many intent categories |

## Notes

- Define a clear, well-scoped list of user intent categories (e.g. Technical issue, Account management, Product information, Feedback, Order-related) — routing accuracy is directly proportional to how well-defined categories are.
- Splitting the response into `<reasoning>` and `<intent>` tags lets you parse each independently with regex for downstream routing logic.
- For 20+ intent categories, use a taxonomic hierarchy with cascading classifiers per tree level (improves nuance/accuracy, increases latency — use with Haiku).
- For highly variable tickets, use vector-database similarity search to retrieve the most relevant few-shot examples per query (reported to improve accuracy from 71% to 93%).
- Integration is push-based (ticketing system sends a webhook per new ticket) or pull-based (your service polls on a schedule).

## Related

- [Overview](./overview.md)
- [Classification](./classification.md)
- [Customer support agent](./customer-support-chat.md)
