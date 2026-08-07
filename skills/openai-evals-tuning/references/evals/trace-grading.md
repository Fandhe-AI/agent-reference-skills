# Trace grading

Assigning structured scores/labels to an agent's trace (the end-to-end log of model calls, tool calls, and reasoning steps) to assess correctness, quality, or adherence to expectations. Trace evals then use graded traces to systematically evaluate agent performance across many examples for benchmarking and regression detection.

## Signature / Usage

1. Dashboard: Logs > **Traces**, select a workflow — traces come from SDK-based apps or Agent Builder workflows.
2. Select a trace to inspect the run.
3. Create a grader and run it against the trace to score the agent's performance.
4. Click **Grade all** to move to the evaluation dashboard: add/edit test criteria, then add a run (configure model, date range, tool calls) to evaluate outputs at scale.

## Notes

- Unlike black-box evaluations, trace evals expose more data to understand *why* an agent succeeds or fails.
- Use together with `agent-evals.md`'s decision guide (traces while debugging, datasets/evals once repeatable).

## Related

- [Evaluate agent workflows](./agent-evals.md)
- [Working with evals](./working-with-evals.md)
