# Evaluate agent workflows

Decision guide for choosing between trace grading and dataset/eval runs when evaluating agent workflows (tool selection, handoffs, guardrail adherence).

## Signature / Usage

- Start with **trace grading** while still debugging behavior: inspect Logs > Traces in the dashboard for a representative run (tool calls, handoffs, guardrails), then create a grader and run it against selected traces to find regressions/failure modes.
- Move to **datasets and eval runs** once you know what "good" looks like and need repeatability — benchmarking changes, comparing prompts, larger-scale runs.
- For advanced needs (external models, API-driven runs, larger-scale batch evaluation), use the Evals API alongside datasets.

## Notes

- Trace grading questions to ask: Did the agent pick the right tool? Did a handoff happen when it should have? Did the workflow violate an instruction/safety policy? Did a prompt/routing change improve end-to-end behavior?
- For code-first SDK workflows, set up tracing/observability first (Integrations and observability guide) before formalizing graders.

## Related

- [Trace grading](./trace-grading.md)
- [Working with evals](./working-with-evals.md)
- [Getting started with datasets](./getting-started-datasets.md)
