# Reinforcement Fine-Tuning (RFT)

Adapts a reasoning model using a programmable grader instead of predetermined correct answers: the platform samples multiple candidate responses per prompt, scores them with the grader, and applies policy-gradient updates so higher-scoring outputs become more probable.

Supported models: o-series reasoning models only; currently only `o4-mini` (`o4-mini-2025-04-16`).

## Signature / Usage

Workflow: implement a grader that returns a numeric reward, upload train/validation JSONL datasets, create the job, monitor checkpoints, deploy the resulting model via the standard API.

Training datapoint (JSONL) — `messages` plus arbitrary fields used by the grader:

```json
{
  "messages": [
    {"role": "user", "content": "Do you have a dedicated security team?"}
  ],
  "compliant": "yes",
  "explanation": "A dedicated security team follows strict protocols for handling incidents."
}
```

Job creation:

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "training_file": "file-2STiufDaGXWCnT6XUBUEHW",
  "validation_file": "file-4TcgH85ej7dFCjZ1kThCYb",
  "model": "o4-mini-2025-04-16",
  "method": {
    "type": "reinforcement",
    "reinforcement": {
      "grader": { "...": "..." },
      "response_format": { "...": "..." },
      "hyperparameters": { "reasoning_effort": "medium" }
    }
  }
}'
```

Multi-grader example (weighted combination of graders — see `graders` scope for full grader-type reference):

```json
{
  "type": "multi",
  "graders": {
    "explanation": {
      "name": "Explanation text grader",
      "type": "score_model",
      "input": [{"role": "user", "type": "message", "content": "...prompt..."}],
      "model": "gpt-4o-2024-08-06"
    },
    "compliant": {
      "name": "compliant",
      "type": "string_check",
      "reference": "{{item.compliant}}",
      "operation": "eq",
      "input": "{{sample.output_json.compliant}}"
    }
  },
  "calculate_output": "0.5 * compliant + 0.5 * explanation"
}
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `training_file` / `validation_file` | string | Uploaded JSONL file IDs. Max 50,000 training examples, max 1,000 validation examples |
| `method.type` | string | Must be `"reinforcement"` |
| `method.reinforcement.grader` | object | Grader config (`string_check`, `score_model`, `text_similarity`, `python`, or `multi` combining several) |
| `method.reinforcement.response_format` | object | JSON schema constraining model output, e.g. `{"type": "json_schema", "json_schema": {...}}` |
| `method.reinforcement.hyperparameters.reasoning_effort` | string | e.g. `"medium"` |

## Notes

- Task suitability requirements: model must have a non-zero baseline success rate (RFT makes gradual improvements, it cannot bootstrap from 0%); tasks must have unambiguous, expert-agreed correct answers; tasks should resist lucky guessing; grading must be automatable.
- Grader scores should vary smoothly between minimum and maximum — binary/floor-ceiling scores provide no training signal.
- Billing is based on training time and tokens consumed during training only, not data prep/validation/queuing/safety evals.
- To qualify for data-sharing inference pricing, evaluation and fine-tuning data must be shared with OpenAI before job creation.
- Fine-tuned models undergo the same 13-category safety evaluation before deployment.
- Subject to the same platform wind-down as other fine-tuning methods (see [model-optimization.md](./model-optimization.md) Notes).
- Full grader type reference is covered under the `evals`/graders scope of this skill (`graders.md`), not duplicated here.

## Related

- [reinforcement-fine-tuning-use-cases.md](./reinforcement-fine-tuning-use-cases.md)
- [supervised-fine-tuning.md](./supervised-fine-tuning.md)
- [direct-preference-optimization.md](./direct-preference-optimization.md)
