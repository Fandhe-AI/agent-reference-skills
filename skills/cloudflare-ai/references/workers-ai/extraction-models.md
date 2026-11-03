---
source: https://developers.cloudflare.com/workers-ai/concepts/extraction-models/
---

# Extraction models

Concept page: models that return typed values (amounts, dates, durations, text) from an input state and named field definitions.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/ (generic REST call pattern for the inference endpoint; model-specific request and response schemas are on the model page):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/baai/bge-m3?queueRequest=true" \
 --header "Authorization: Bearer $API_TOKEN" \
 --header 'Content-Type: application/json' \
 --json '{
    "request_id": "<uuid>"
  }'
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Extraction | capability | — | Return a value explicitly present in the input, such as the total printed on an invoice. |
| Computation | capability | — | Derive a value from facts in the input, such as days overdue from a due date and a supplied current date. |
| Estimation | capability | — | Predict a value the input does not determine, such as when an unpaid invoice will be paid. |
| Forecasting | capability | — | Predict a sequence of future values over an interval. |
| Decision model | comparison | — | Selects from a predefined set of options. |
| Generative model | comparison | — | Produces open-ended content. |

## Notes

- A request combines an input state with named field definitions (type, constraints, instructions); the result is a typed value per field.
- Missing results: single-value fields return `null` when the input is considered insufficient; lists return an empty list; estimates and forecasts return predictions even with little information.
- Uncertainty: single-value fields include confidence scores; estimates and forecasts include distributions (for example 10th and 90th percentiles mark the middle 80%).
- Extracted text includes a source span (start and end positions in the input).
- Types and constraints define the form of a result, not its correctness. Match safeguards to risk: check against other evidence or require human review before consequential or irreversible actions.
- Include task-relevant context in the input (for example state which current date to use).
- Capabilities vary by model; see the Clairic model page https://developers.cloudflare.com/workers-ai/models/clairic/ for supported inputs, field types, limits, and request and response schemas. The model catalog is a separate category.

## Related

- [JSON Mode](./json-mode.md)
- [REST API](./rest-api.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
