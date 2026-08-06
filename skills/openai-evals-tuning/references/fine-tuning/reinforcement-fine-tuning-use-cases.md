# Reinforcement Fine-Tuning: Use Cases

Practical RFT case studies, grouped by task pattern, plus best-practice guidance for defining tasks and graders.

## Use Case Patterns

**Turn instructions into working code** (deterministic graders):
- ChipStack (semiconductor verification IP wiring) — Python multiset-comparison grader (precision/recall F1); <50 samples; ~12pt improvement on o1-mini/o3-mini.
- Runloop (Stripe API code snippets) — two-part reward: markdown format validation + AST Grep checks on TS/JS; ~12% average improvement.
- Milo (family schedule manager) — validated event classification/recurrence/conflict detection; correctness 0.86 → 0.91 overall, 0.46 → 0.71 on hard cases.

**Pull facts into clean format** (structured extraction):
- Ambience (ICD-10 medical coding) — o3-mini base 0.39, physician baseline 0.45, RFT-tuned 0.57.
- Harvey (legal excerpt extraction) — RapidFuzz-based F1 grader; F1 0.563 → 0.6765; won/tied 93% vs GPT-4o.

**Apply complex rules correctly** (nuanced rubric-based labeling):
- Accordance (tax analysis) — granular point-based rubric (0.05-0.15 pts per correct calculation); 40% improvement over base.
- SafetyKit (content moderation) — F1 86% → 90%, replacing dozens of production calls.
- Thomson Reuters (legal document review/compare/summarize skills) — consistently outperformed baseline o3-mini/o1.

## Best Practices

- Run an eval for the task before implementing RFT; it reveals gaps where experts agree but the model struggles, and confirms scores can vary between floor and ceiling.
- Start with a task the model can already solve occasionally — RFT reinforces better answers, it does not bootstrap from zero.
- Ensure the grader can score without human intervention (Python code or an LLM judge).
- Remove ambiguity: domain experts must agree on the correct answer.
- Minimize luck: avoid tasks gameable by guessing (e.g. plain multiple choice).
- Prefer smooth/graded scoring over binary pass/fail for a better training signal.
- Guard against reward hacking (shortcuts that score high without genuine competence).
- Balance datasets so the model cannot win by always guessing the dominant label.
- When using an LLM judge, evaluate its stability across repeated runs and give it few-shot examples.

## Notes

- Dataset sizes in these case studies were often modest (e.g. <50 samples for ChipStack); several companies did not disclose exact sizes.
- Subject to the same platform wind-down as other fine-tuning methods (see [model-optimization.md](./model-optimization.md) Notes).

## Related

- [reinforcement-fine-tuning.md](./reinforcement-fine-tuning.md)
- [fine-tuning-best-practices.md](./fine-tuning-best-practices.md)
