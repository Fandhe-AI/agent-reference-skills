<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/classification / last verified: 2026-08-07 -->

# Classification

Guide to building a text classifier with Claude, from use-case exploration to back-end integration. See the [classification cookbook](https://platform.claude.com/cookbook/capabilities-classification-guide) for a worked example.

## Signature / Usage

```text
You will be building a text classifier that can automatically categorize text into a set of predefined categories.
Here are the categories the classifier will use:

<categories>
{{CATEGORIES}}
</categories>

<examples>
{{EXAMPLES}}
</examples>

Write your analysis inside <category_analysis> tags, your step-by-step reasoning inside
<classification_process> tags, then output the final <classification>.
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| Accuracy | metric | (Number of correct predictions) / (Overall number of predictions) |
| F1 Score | metric | Balances precision and recall |
| Consistency | metric | Output consistent with predictions for similar inputs |
| Structure | metric | Output follows expected format (e.g. JSON) |
| Speed | metric | Response within acceptable latency threshold |
| Bias and Fairness | metric | No demographic bias when classifying data about people |

## Notes

- `{{CATEGORIES}}` and `{{EXAMPLES}}` in the prompt above are intentional template variables to be replaced with your own category definitions and labeled examples; they are not unreplaced placeholders.
- When to use Claude for classification: rule-based classes (conditions rather than examples); evolving classes (shifting domains and boundaries); unstructured inputs (large volumes of varying-length text); limited labeled examples (few-shot learning); reasoning requirements (semantic understanding, context, higher-level reasoning).
- Removed: the official page /docs/en/about-claude/use-case-guides/classification returns 404 and is no longer listed in llms.txt or the use-case overview (as of 2026-10-16); retained for reference. Ticket routing covers the classification pattern.
- At time of last verification (2026-08-07), the page said Claude Haiku 4.5 is typically ideal for classification due to speed/cost; Sonnet or Opus for tasks needing specialized knowledge or complex reasoning. For the current model choice, see ticket-routing (Claude Haiku 5.5 at low effort).
- Common industry use cases: content moderation and bug prioritization (Tech & IT), intent analysis and support ticket routing (Customer Service), patient triaging and clinical trial screening (Healthcare), fraud detection and credit risk assessment (Finance), legal document categorization (Legal).

## Related

- [Overview](./overview.md)
- [Ticket routing](./ticket-routing.md)
- [Content moderation](./content-moderation.md)
