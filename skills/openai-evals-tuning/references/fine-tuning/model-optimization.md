# Model Optimization (overview)

Top-level workflow for improving LLM output quality in the OpenAI platform: evals to measure performance, prompt engineering to add context/instructions, and fine-tuning when task-specific training is needed.

## Workflow

1. Establish baseline metrics with evals, using representative test data.
2. Craft effective prompts: relevant context, clear instructions, example outputs (few-shot).
3. Consider fine-tuning when specialized task performance is still insufficient after prompt engineering.
4. Measure results against the test dataset.
5. Iterate continuously based on evaluation feedback.

## Fine-Tuning Methods (summary)

| Method | Best for | Page |
|--------|----------|------|
| Supervised Fine-Tuning (SFT) | Classification, format-specific generation, correcting instruction-following failures | [supervised-fine-tuning.md](./supervised-fine-tuning.md) |
| Vision Fine-Tuning | Image understanding tasks | [vision-fine-tuning.md](./vision-fine-tuning.md) |
| Direct Preference Optimization (DPO) | Tone/style refinement via preferred vs non-preferred response pairs | [direct-preference-optimization.md](./direct-preference-optimization.md) |
| Reinforcement Fine-Tuning (RFT) | Complex reasoning tasks with gradeable, verifiable answers (reasoning models only) | [reinforcement-fine-tuning.md](./reinforcement-fine-tuning.md) |

## Notes

- OpenAI is winding down the self-serve fine-tuning platform: no new organizations can start fine-tuning as of May 7, 2026, restrictions tighten further on July 2, 2026, and existing organizations lose the ability to create new fine-tuning jobs on January 6, 2027. Already fine-tuned models remain available for inference until their base model is deprecated. OpenAI's stated rationale is that newer base models (e.g. GPT-5.x) plus prompt engineering / RAG are cheaper and sufficient for most cases that previously needed fine-tuning.
- Evals (not covered in this category — see the `evals` scope) should be set up before investing in fine-tuning.

## Related

- [fine-tuning-best-practices.md](./fine-tuning-best-practices.md)
- [prompt-optimizer.md](./prompt-optimizer.md)
