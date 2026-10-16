<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/ticket-routing / last verified: 2026-10-17 -->

# Ticket routing

Guide to classifying customer support tickets at scale by intent, urgency, prioritization, and customer profile using Claude. See the [classification cookbook](https://platform.claude.com/cookbook/capabilities-classification-guide) for evaluation guidance.

## Signature / Usage

```python
import re

client = anthropic.Anthropic()
DEFAULT_MODEL = "claude-haiku-5-5"

def classify_support_request(ticket_contents):
    classification_prompt = f"""You will be acting as a customer support ticket
    classification system. Analyze the request and output your reasoning inside
    <reasoning> tags, then the intent inside <intent> tags.

    <request>{ticket_contents}</request>
    """
    message = client.messages.create(
        model=DEFAULT_MODEL,
        max_tokens=2048,
        output_config={"effort": "low"},
        messages=[{"role": "user", "content": classification_prompt}],
        stream=False,
    )
    if message.stop_reason == "refusal":
        # stop_details.category names the category; route to a human / needs-review queue
        return None, None
    text = next((block.text for block in message.content if block.type == "text"), "")
    reasoning_match = re.search(r"<reasoning>(.*?)</reasoning>", text, re.DOTALL)
    reasoning = reasoning_match.group(1).strip() if reasoning_match else None
    intent_match = re.search(r"<intent>(.*?)</intent>", text, re.DOTALL)
    intent = intent_match.group(1).strip() if intent_match else None
    return reasoning, intent
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| ticket_contents | str | Raw customer support request text |
| DEFAULT_MODEL | str | `claude-haiku-5-5` — the fastest and most cost-effective current model; at `low` effort it handles simple, high-volume requests such as classification. Use a larger Sonnet model for deep subject-matter expertise, many intent categories, or complex reasoning |

## Notes

- Define a clear, well-scoped list of user intent categories (e.g. Technical issue, Account management, Product information, Feedback, Order-related) — routing accuracy is directly proportional to how well-defined categories are.
- This prompt is written for Claude Haiku 5.5, which runs here at `low` effort. On Claude Fable 5.1, Claude Fable 5, Claude Opus 5.5, Claude Opus 5, and Claude Sonnet 5.5, ask for the intent and a one-sentence summary of the request instead of `<reasoning>` (see "Keep reasoning in thinking blocks" in the official Refusals and fallback page).
- Claude Haiku 5.5 can decline a request with `stop_reason: "refusal"` (`stop_details.category` names the category) and has no server-side fallback; check `stop_reason` before parsing. The snippet returns `(None, None)` for a declined ticket so callers can route it to a human or a needs-review queue (see Prompting Claude Haiku 5.5 > Safeguard refusals); the refusal check is added on top of the official snippet, which omits it.
- Splitting the response into `<reasoning>` and `<intent>` tags lets you parse each independently with regex for downstream routing logic.
- For 20+ intent categories, use a taxonomic hierarchy with cascading classifiers per tree level (improves nuance/accuracy, increases latency — use with Haiku).
- For highly variable tickets, use vector-database similarity search to retrieve the most relevant few-shot examples per query (reported to improve accuracy from 71% to 93%).
- Integration is push-based (ticketing system sends a webhook per new ticket) or pull-based (your service polls on a schedule).

## Related

- [Overview](./overview.md)
- [Classification](./classification.md)
- [Customer support agent](./customer-support-chat.md)
