---
source: https://opencode.ai/docs/console/models/#endpoints
---

# System One models (Jev, Decision)

Jev is a System One model from TypeSafe AI for fast, structured decisions. Instead of generating text, it evaluates a `state` against typed questions and returns values and probabilities that your code can use directly. It supports yes/no (`noul`), multiple-choice (`choice`), and rubric-based (`score`) questions.

## Signature / Usage

Use your OpenCode Console API key with the `https://opencode.ai/inference/systemone/v1/systemone` endpoint. This example checks whether a support request is urgent:

```bash
curl https://opencode.ai/inference/systemone/v1/systemone \
  -H "Authorization: Bearer $OPENCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jev-1.13",
    "state": "My payments have failed for three days and I am losing sales. Please help now.",
    "questions": {
      "is_urgent": {
        "type": "noul",
        "instructions": "Does this request require urgent attention?"
      }
    }
  }'
```

You can ask multiple questions in one request. Jev evaluates them in parallel and returns each answer under the matching question ID:

```bash
curl https://opencode.ai/inference/systemone/v1/systemone \
  -H "Authorization: Bearer $OPENCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "jev-1.13",
    "state": "My order arrived late and the item is damaged. I want a refund.",
    "questions": {
      "department": {
        "type": "choice",
        "instructions": "Which team should handle this request?",
        "criteria": {
          "returns": "Refunds, exchanges, or damaged items",
          "shipping": "Delivery delays or lost packages",
          "billing": "Charges, invoices, or payment problems"
        }
      },
      "frustration": {
        "type": "score",
        "instructions": "How frustrated is the customer?",
        "criteria": ["Calm", "Frustrated", "Very angry"]
      }
    }
  }'
```

Use `jev-1.13-free` instead of `jev-1.13` to use the limited-time free model. See the [TypeSafe AI documentation](https://docs.typesafe.ai/) for details about question types and response fields.

### GPT 6 Luna Decision and Gemini Decision 1

`gpt-6-luna-decision` and `gemini-decision-1` take the same System One request as Jev, on the same endpoint. Pass images, audio, video, and PDFs in `state` as chat-style parts (`image_url`, `input_audio`, `video_url`, `file`). GPT 6 Luna Decision accepts text and images; Gemini Decision 1 also accepts audio, video, and PDFs.

```bash
curl https://opencode.ai/inference/systemone/v1/systemone \
  -H "Authorization: Bearer $OPENCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-decision-1",
    "state": "I was charged twice for my order.",
    "questions": {
      "refund": {
        "type": "noul",
        "instructions": "Is this a refund request?"
      }
    }
  }'
```

## Notes

- Sections "Jev" and "GPT 6 Luna Decision and Gemini Decision 1" are H3 headings under "Endpoints"; their anchors were not measured, so `source` points at `#endpoints`.
- Prices for these models are in [Model pricing](./models-pricing.md); endpoint rows are in [Model endpoints](./models-endpoints.md).

## Related

- [Model endpoints](./models-endpoints.md)
- [Model pricing](./models-pricing.md)
