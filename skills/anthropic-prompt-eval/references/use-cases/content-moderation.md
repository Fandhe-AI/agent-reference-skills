<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/content-moderation / last verified: 2026-08-07 -->

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
- Model choice trades off cost vs. accuracy — a high-volume social platform can moderate at scale with Claude Haiku 4.5; Opus models cost roughly 5x more per token for the same workload.
- Instead of binary flag/no-flag, define multiple risk levels (e.g. 0–3) to allow automatic blocking of high-risk content while routing medium-risk content to human review.
- Advanced techniques: pair each unsafe category with a detailed definition to sharpen borderline decisions; batch multiple messages into a single prompt to reduce cost when real-time moderation isn't required.

## Related

- [Overview](./overview.md)
- [Classification](./classification.md)
