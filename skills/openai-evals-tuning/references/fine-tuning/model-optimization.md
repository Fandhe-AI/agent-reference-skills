# Model Optimization (overview)

Top-level workflow for improving LLM output quality in the OpenAI platform: evals to measure performance, prompt engineering to add context/instructions, and fine-tuning when task-specific training is needed.

## Workflow

1. Establish baseline metrics with evals, using representative test data.
2. Craft effective prompts: relevant context, clear instructions, example outputs (few-shot). Start with `gpt-6-astra` for new work, and use the reasoning model guidance to tune outcome-level instructions, reasoning effort, and verbosity.
3. Consider fine-tuning when specialized task performance is still insufficient after prompt engineering.
4. Measure results against the test dataset.
5. Iterate continuously based on evaluation feedback.

## Fine-Tuning Methods (summary)

| Method | Best for | Supported models | Page |
|--------|----------|------------------|------|
| Supervised Fine-Tuning (SFT) | Classification, format-specific generation, correcting instruction-following failures | `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14`, `gpt-4.1-nano-2025-04-14` | [supervised-fine-tuning.md](./supervised-fine-tuning.md) |
| Vision Fine-Tuning | Image understanding tasks | `gpt-4o-2024-08-06` | [vision-fine-tuning.md](./vision-fine-tuning.md) |
| Direct Preference Optimization (DPO) | Tone/style refinement via preferred vs non-preferred response pairs | `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14`, `gpt-4.1-nano-2025-04-14` | [direct-preference-optimization.md](./direct-preference-optimization.md) |
| Reinforcement Fine-Tuning (RFT) | Complex reasoning tasks with gradeable, verifiable answers (reasoning models only) | `o4-mini-2025-04-16` | [reinforcement-fine-tuning.md](./reinforcement-fine-tuning.md) |

## Notes

- OpenAI is winding down the self-serve fine-tuning platform: no new organizations can start fine-tuning as of May 7, 2026, restrictions tighten further on July 2, 2026, and existing organizations lose the ability to create new fine-tuning jobs on January 6, 2027. Already fine-tuned models remain available for inference until their base model is deprecated. The official guide states that it "covers evals and fine-tuning workflows that are being moved into legacy documentation" (see the deprecations page for timelines).
- Base model shutdowns (deprecations page): `gpt-4.1-nano-2025-04-14` and `o4-mini-2025-04-16` on 2026-10-23; `gpt-4o-2024-08-06`, `gpt-4.1-2025-04-14`, `gpt-4.1-mini-2025-04-14` on 2027-01-14. Fine-tuned versions follow the same schedule as their base models.
- Evals (not covered in this category — see the `evals` scope) should be set up before investing in fine-tuning.

## Related

- [fine-tuning-best-practices.md](./fine-tuning-best-practices.md)
- [prompt-optimizer.md](./prompt-optimizer.md)
