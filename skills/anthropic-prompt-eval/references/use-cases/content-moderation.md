<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/content-moderation / last verified: 2026-10-17 -->

# Content moderation

Guide to moderating user-generated content within an application using Claude. For guardrails on Claude's own interactions, see the [guardrails guide](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations) instead. See the [content moderation cookbook](https://platform.claude.com/cookbook/misc-building-moderation-filter) for a worked example.

## Signature / Usage

```python
def moderate_message(message, unsafe_categories):
    unsafe_category_list = "\n".join(unsafe_categories)
    prompt = f"""
    Determine whether the following message warrants moderation,
    based on the unsafe categories outlined below.

    Message:
    {message}

    Unsafe categories:
    {unsafe_category_list}

    Respond with a JSON object with a violation boolean, the violated
    categories, and an optional explanation.
    """
    # send prompt to Claude and parse the JSON response
```

## Notes

- All Claude models have built-in safety behaviors and may still flag content deemed particularly dangerous per the [Acceptable Use Policy](https://www.anthropic.com/legal/aup), regardless of prompt instructions.
- Model choice trades off cost vs. accuracy. Official estimate for a platform receiving 1B posts per month (100 characters per post, input 28.6B tokens, 3% flagged, 50 output tokens per flagged message, output 1.5B tokens): Claude Haiku 5.5 at $0.10/MTok input and $0.50/MTok output is $3,610 USD per month; Claude Opus 5 and Claude Opus 4.8 at $5.00 / $25.00 are $180,500 USD per month each.
- The official prose recommends Claude Haiku 5.5, but the code examples on the page still use `claude-haiku-4-5-20251001` (the model ID is kept as in the source and not normalized).
- Instead of binary flag/no-flag, define multiple risk levels (e.g. 0–3) to allow automatic blocking of high-risk content while routing medium-risk content to human review.
- Advanced techniques: pair each unsafe category with a detailed definition to sharpen borderline decisions; batch multiple messages into a single prompt to reduce cost when real-time moderation isn't required.

## Related

- [Overview](./overview.md)
- [Classification](./classification.md)
