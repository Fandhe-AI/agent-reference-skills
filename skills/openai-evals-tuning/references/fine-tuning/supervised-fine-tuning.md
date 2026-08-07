# Supervised Fine-Tuning (SFT)

Trains a model on example prompts paired with correct ("ground truth") assistant responses, to reliably reproduce a desired style, format, or behavior.

Best use cases: classification, nuanced translation, format-specific content generation, correcting instruction-following failures.

Supported models: `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14`, `gpt-4.1-nano-2025-04-14`.

## Signature / Usage

Upload a JSONL training file (chat-completions message format, minimum 10 lines, 50+ recommended), then create the job:

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl"

curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-RCnFCYRhFDcq1aHxiYkBHw",
    "model": "gpt-4.1-nano-2025-04-14"
  }'
```

Training example (JSONL line, supports tool calls):

```json
{"messages":[{"role":"user","content":"What is the weather in San Francisco?"},{"role":"assistant","tool_calls":[{"id":"call_id","type":"function","function":{"name":"get_current_weather","arguments":"{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"}}]}],"parallel_tool_calls":false,"tools":[{"type":"function","function":{"name":"get_current_weather","description":"Get the current weather","parameters":{"type":"object","properties":{"location":{"type":"string"},"format":{"type":"string","enum":["celsius","fahrenheit"]}},"required":["location","format"]}}}]}
```

Use the resulting `ft:`-prefixed model ID like any other model:

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
    "input": "What is the weather like in Boston today?"
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `training_file` | string | ID of an uploaded file with `purpose=fine-tune` |
| `model` | string | Base model to fine-tune (must support SFT) |
| `method.type` | string | `"supervised"` (default when omitted) |
| `hyperparameters.n_epochs` | integer | Number of training epochs; increase 1-2 if underfitting, decrease if diversity suffers |
| `hyperparameters.batch_size` | integer | Larger batches are more stable but slower to train |
| `hyperparameters.learning_rate_multiplier` | number | Increase if convergence stalls |
| `suffix` | string | Custom string appended to the fine-tuned model name |
| `messages[].weight` | 0 or 1 | Per multi-turn assistant message; set 0 to exclude that message from the fine-tuning loss |

## Notes

- OpenAI is winding down the self-serve fine-tuning platform (no new orgs since May 7, 2026; further restrictions July 2, 2026; existing orgs lose new-job creation Jan 6, 2027). Already-tuned models keep serving until their base model is deprecated.
- Minimum 10 training examples; 50 well-crafted demonstrations is a reasonable starting point. Set up evals before investing in fine-tuning.
- Current models support 65,536 tokens of context per example; longer examples are truncated from the end.
- All training examples must use the exact same format expected at inference time; keep the distribution of desired behaviors (e.g. refusal rate) matching real inference-time expectations, not skewed.
- Checkpoints from the last three epochs are made available to counter overfitting/memorization.
- Fine-tuned models undergo automated safety evaluation across 13 safety categories before deployment; models failing thresholds are blocked.
- A larger model's outputs can be used to generate training data for fine-tuning a smaller, cheaper model (a distillation-style workflow), though there is no dedicated distillation product page in the current docs.

## Related

- [fine-tuning-best-practices.md](./fine-tuning-best-practices.md)
- [vision-fine-tuning.md](./vision-fine-tuning.md)
- [direct-preference-optimization.md](./direct-preference-optimization.md)
- [reinforcement-fine-tuning.md](./reinforcement-fine-tuning.md)
- [model-optimization.md](./model-optimization.md)
