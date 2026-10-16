# Evaluate agent workflows

Decision guide for choosing between trace grading and dataset/eval runs when evaluating agent workflows (tool selection, handoffs, guardrail adherence).

## Signature / Usage

- Start with **trace grading** while still debugging behavior. Trace-grading workflow:
  1. Open Logs > Traces in the dashboard.
  2. Inspect a representative workflow trace (tool calls, handoffs, guardrails) from an SDK-based app, or from an existing Agent Builder workflow during the transition window.
  3. Create a grader and run it against the selected traces to find regressions/failure modes.
  4. Use the results to refine prompts, tool surfaces, routing logic, or guardrails.
- Move to **datasets and eval runs** once you know what "good" looks like and need repeatability — benchmarking changes, comparing prompts, larger-scale runs.
- For advanced needs (external models, API-driven runs, larger-scale batch evaluation), use the Evals API alongside datasets.

## Notes

- Trace grading questions to ask: Did the agent pick the right tool? Did a handoff happen when it should have? Did the workflow violate an instruction/safety policy? Did a prompt/routing change improve end-to-end behavior?
- For code-first SDK workflows, set up tracing/observability first (Integrations and observability guide) before formalizing graders.

- Agent Builder is scheduled to shut down on 2026-11-30 (deprecated 2026-06-03). The Evals platform is also being deprecated: existing evals read-only on 2026-10-31, dashboard and API shutdown scheduled for 2026-11-30.

## Related

- [Trace grading](./trace-grading.md)
- [Working with evals](./working-with-evals.md)
- [Getting started with datasets](./getting-started-datasets.md)
