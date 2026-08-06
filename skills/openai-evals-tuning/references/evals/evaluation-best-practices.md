# Evaluation best practices

High-level guidance for designing evals: what counts as an eval, the eval-design workflow, where nondeterminism enters increasingly complex architectures, evaluator types, and common edge cases.

## Signature / Usage

Eval workflow (5 steps):

1. **Define eval objective** — success criteria.
2. **Collect dataset** — production, synthetic, domain-expert, purchased, or historical data.
3. **Define eval metrics** — how success is measured (e.g. ROUGE-L ≥ 0.40, coherence ≥ 80%).
4. **Run and compare evals** — via the [Evals API](./working-with-evals.md).
5. **Continuously evaluate** — set up continuous evaluation (CE) on every change; grow the eval set from production monitoring.

## Options / Props

| Architecture | New nondeterminism source | What to evaluate |
|---|---|---|
| Single-turn | Model input/output | Instruction following, functional correctness |
| Workflow (chained calls) | Same as single-turn, per step | Evaluate each chained step in isolation |
| Single-agent | Tool selection | + Tool selection, data precision (correct tool arguments) |
| Multi-agent | Agent handoff | + Handoff accuracy (correct triage/return between agents) |

| Evaluator type | Trade-off |
|---|---|
| Metric-based (exact match, ROUGE/BLEU, function-call accuracy, executable evals) | Scalable, automated; may miss nuance |
| Human evals | Highest quality; slow, expensive, disagreement among raters |
| LLM-as-a-judge / model graders | Cheaper/faster than human evals; position bias, verbosity bias |

## Notes

- Avoid "vibe-based evals" (shipping without evals) and overly generic academic metrics (perplexity, BLEU) as your only signal.
- LLMs discriminate better than they generate open-endedly — prefer pairwise comparison, classification, or criteria scoring over open-ended generation when using LLM-as-judge.
- LLM-as-judge recommendations: use the most capable model available, control for response-length bias, add chain-of-thought before the score, validate agreement against human labels before optimizing for cost/latency.
- Edge cases to cover: input variability (multilingual, non-text formats, images), contextual complexity (multi-intent, typos, long context, ambiguous tool-call data), personalization/jailbreak conflicts.
- Once evals are mature, use the data to drive reinforcement fine-tuning (see the fine-tuning scope).

## Related

- [Working with evals](./working-with-evals.md)
- [Graders](./graders.md)
- [Getting started with datasets](./getting-started-datasets.md)
