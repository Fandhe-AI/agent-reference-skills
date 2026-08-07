<!-- source: https://platform.claude.com/docs/en/about-claude/use-case-guides/classification / last verified: 2026-08-07 -->

# Classification

Guide to building a text classifier with Claude, from use-case exploration to back-end integration. See the [classification cookbook](https://platform.claude.com/cookbook/capabilities-classification-guide) for a worked example.

## When to use Claude for classification

- **Rule-based classes**: classes defined by conditions rather than examples.
- **Evolving classes**: new or changing domains with shifting class boundaries.
- **Unstructured inputs**: large volumes of unstructured text of varying length.
- **Limited labeled examples**: few-shot learning from limited labeled data.
- **Reasoning requirements**: semantic understanding, context, higher-level reasoning.

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

- Claude Haiku 4.5 is typically ideal for classification due to speed/cost; Sonnet or Opus for tasks needing specialized knowledge or complex reasoning.
- Common industry use cases: content moderation and bug prioritization (Tech & IT), intent analysis and support ticket routing (Customer Service), patient triaging and clinical trial screening (Healthcare), fraud detection and credit risk assessment (Finance), legal document categorization (Legal).

## Related

- [Overview](./overview.md)
- [Ticket routing](./ticket-routing.md)
- [Content moderation](./content-moderation.md)
