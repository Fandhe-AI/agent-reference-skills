# Fine-Tuning Best Practices

Practical guidance for improving a fine-tuned model that underperforms, covering data quality/quantity and hyperparameter tuning. Applies to Supervised Fine-Tuning; hyperparameter tuning concepts generalize to other methods.

## Data Preparation

- Scrutinize training examples for grammar, logic, and style issues — they propagate into model behavior.
- Balance and diversify response distributions to match real inference-time expectations (e.g. do not train with 60% refusals when only 5% are expected at inference).
- Include all context needed for an accurate response in each training example, to avoid teaching the model to hallucinate.
- Keep consistency across annotators — model performance is bounded by inter-annotator agreement.
- Use the exact same message format expected at inference time for every training example.
- For small datasets (<100 examples), repeat the instructions/system prompt that worked best before fine-tuning in every example.
- Use the `weight` field (0 or 1) on assistant messages in multi-turn examples to exclude specific turns from the fine-tuning loss.

## Data Quantity

Quality beats quantity — a smaller high-quality dataset generally outperforms a larger low-quality one. To estimate whether more data will help, compare results from fine-tuning on the full dataset versus a half-sized subset.

## Hyperparameter Tuning

| Parameter | Guidance |
|-----------|----------|
| `n_epochs` | Increase by 1-2 if the model underperforms on training data itself (classification/extraction); decrease if output diversity suffers |
| `learning_rate_multiplier` | Increase if convergence stalls |
| `batch_size` | Larger = more stable but slower training |

Start with platform defaults, then adjust based on observed behavior against a held-out test set.

## Notes

- Submit both a training file and a test/validation file to get comparative statistics during training.
- Current models support 65,536 tokens of context per training example; longer examples are truncated from the end — use a tokenizer tool to check.
- Base models named in the guide's token-limit table are scheduled to shut down: `gpt-4.1-nano-2025-04-14` on 2026-10-23; `gpt-4.1`, `gpt-4.1-mini`, `gpt-4o-2024-08-06`, `gpt-4o-mini-2024-07-18` on 2027-01-14 (deprecations page).
- Subject to the same platform wind-down as other fine-tuning methods (see [model-optimization.md](./model-optimization.md) Notes).

## Related

- [supervised-fine-tuning.md](./supervised-fine-tuning.md)
- [model-optimization.md](./model-optimization.md)
