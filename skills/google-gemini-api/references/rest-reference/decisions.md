---
source: https://aistudio.google.com/api-reference/decisions
---

# Decisions API

REST reference for evaluating a batch of structured decision questions (binary `noul`, single-select `choice`, rubric `score`) against a shared input with Gemini Decision 1 (Beta).

## Signature / Usage

```text
POST https://generativelanguage.googleapis.com/v1beta/decisions
```

Python:

```python
from google import genai

client = genai.Client(http_options={"api_version": "v1beta"})
response = client.decisions.create(
    model="gemini-decision-1",
    input="Customer message: Hi, I was charged twice for my monthly subscription this morning. Can you refund the duplicate charge?",
    questions={
        "needs_billing_refund": {
            "type": "noul",
            "instructions": "Determine whether the customer is requesting a billing refund.",
            "criteria": {
                "true_description": "The customer explicitly asks for a refund or reversal of a charge.",
                "false_description": "The customer is asking a general question or reporting a non-billing issue.",
            },
        },
    },
)
print(response.answers["needs_billing_refund"].noul)
```

REST:

```sh
curl -X POST https://generativelanguage.googleapis.com/v1beta/decisions \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-decision-1",
    "input": "Customer message: Hi, I was charged twice for my monthly subscription this morning. Can you refund the duplicate charge?",
    "questions": {
      "needs_billing_refund": {
        "type": "noul",
        "instructions": "Determine whether the customer is requesting a billing refund.",
        "criteria": {
          "true_description": "The customer explicitly asks for a refund or reversal of a charge.",
          "false_description": "The customer is asking a general question or reporting a non-billing issue."
        }
      }
    }
  }'
```

## Options / Props

`CreateDecision` request body:

| Name | Type | Description |
|------|------|-------------|
| model | string (required) | The name of the `Model` used for evaluating the decisions. |
| input | `DecisionInputContent` or `DecisionInputContent array` or string (required) | Shared input prefix evaluated once across all decision questions. Content blocks: `AudioContent`, `DocumentContent`, `ImageContent`, `TextContent`, `VideoContent` (plus further block types listed on the official page). |
| questions | object (required) | The decision questions to evaluate, keyed by caller-defined unique question identifiers (at least 1 question). |

`Question` (polymorphic on `type`):

| Type | Fields | Description |
|------|--------|-------------|
| `noul` (`NoulQuestion`) | `instructions` (required) | Binary (true / false) question. Optional `criteria` object with `true_description` / `false_description`. |
| `choice` (`ChoiceQuestion`) | `instructions` (required), `criteria` (required object) | Single-select over 2 to 255 mutually exclusive options; maps option ID to optional description. Option IDs must be non-empty with no control characters or leading/trailing whitespace. |
| `score` (`ScoreQuestion`) | `instructions` (required), `criteria` (required string array) | 2 to 255 non-empty discrete levels; 0-based index `i` is the numeric level value and `criteria[i]` its rubric description. |

`instructions` is `DecisionInstructionContent` (text block), an array of them, or a string; at least one content block is required.

Response (`CreateDecisionResponse`):

| Name | Type | Description |
|------|------|-------------|
| answers | object | Output only. Decision answers keyed by the question identifiers from `questions`. |
| usage | `Usage` | Output only. Token usage statistics (`total_input_tokens`, `input_tokens_by_modality`, `total_output_tokens`, `total_tokens`, and further counters). |
| prompt_feedback | `PromptFeedback` | Output only. If `prompt_feedback.block_reason` is set, the prompt (`input` and question text) was blocked by the input policy, no decisions were evaluated, and `answers` is empty. |

`Answer` (polymorphic on `type`):

| Type | Fields |
|------|--------|
| `noul` (`NoulAnswer`) | `noul`: calibrated probability `P(true)` in `[0.01, 0.99]`; `confidence` |
| `choice` (`ChoiceAnswer`) | `choice`: option ID with the highest probability; `probabilities`: normalized probability in `[0, 1]` per option ID; `confidence` |
| `score` (`ScoreAnswer`) | `score`: probability-weighted expected score (`sum_k k * probability_k`); `probabilities`: per 0-based level index; `legend`: rubric description per non-empty level index; `confidence` |

`confidence` is in `[0, 1]` and equals the calibrated probability of the winning outcome: `max(noul, 1 - noul)` for `noul`, `p_max` for `choice` and `score`.

`PromptFeedback.block_reason` values: `safety`, `other`, `blocklist`, `prohibited_content`, `image_safety`. `block_reason_message` is an optional message detailing the reason.

## Notes

- This API is in Beta. Endpoints are under `/v1beta/`.
- The guide (use cases, limits, best practices, pricing) is in the decisions-api page of the interactions-core category.
- Source: https://aistudio.google.com/api-reference/decisions (fetched 2026-11-14)
- Source: https://aistudio.google.com/api-reference/decisions/create-decision (fetched 2026-11-14)

## Related

- [All methods](./all-methods.md)
- [Interactions API (v1)](./interactions-v1.md)
