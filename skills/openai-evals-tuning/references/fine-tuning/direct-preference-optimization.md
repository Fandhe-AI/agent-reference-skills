# Direct Preference Optimization (DPO)

Fine-tunes a model from prompts paired with a preferred and a non-preferred response, for subjective/stylistic decision-making (tone, style, summarization focus) rather than a single "correct" answer. Text-only (no image inputs/outputs).

Supported models: `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14`, `gpt-4.1-nano-2025-04-14`.

## Signature / Usage

Training file (JSONL), one preference pair per line. Only single-turn conversations are supported (preferred/non-preferred are the final assistant message):

```json
{
  "input": {
    "messages": [{"role": "user", "content": "User prompt here"}],
    "tools": [],
    "parallel_tool_calls": true
  },
  "preferred_output": [{"role": "assistant", "content": "Better response"}],
  "non_preferred_output": [{"role": "assistant", "content": "Weaker response"}]
}
```

```javascript
const job = await openai.fineTuning.jobs.create({
  training_file: "file-all-about-the-weather",
  model: "gpt-4.1-mini-2025-04-14",
  method: {
    type: "dpo",
    dpo: { hyperparameters: { beta: 0.1 } },
  },
});
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `method.type` | string | Must be `"dpo"` |
| `method.dpo.hyperparameters.beta` | number (0-2) or `"auto"` | How strictly the new model adheres to prior behavior vs the provided preferences. Lower = more aggressive alignment to preferences; higher = more conservative. Default `"auto"` |

## Notes

- Recommended workflow: run Supervised Fine-Tuning first on the preferred responses to establish correct patterns, then use that SFT model as the starting checkpoint for DPO.
- Fine-tuned models undergo the same 13-category safety evaluation before deployment.
- Subject to the same platform wind-down as other fine-tuning methods (see [model-optimization.md](./model-optimization.md) Notes).

## Related

- [supervised-fine-tuning.md](./supervised-fine-tuning.md)
- [vision-fine-tuning.md](./vision-fine-tuning.md)
- [reinforcement-fine-tuning.md](./reinforcement-fine-tuning.md)
