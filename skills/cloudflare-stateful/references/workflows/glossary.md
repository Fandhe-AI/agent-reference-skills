---
source: https://developers.cloudflare.com/workflows/reference/glossary/
---

# Glossary

Definitions of terms used across the Workflows documentation.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workflows/build/workers-api/ (a Workflow, its steps, and an instance's event):

```ts
export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		// Steps here
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Durable Execution | term | — | A programming model where applications execute reliably, persist state automatically, retry, and resist API, network, or infrastructure failures |
| Event | term | — | The event that triggered the Workflow instance; a `WorkflowEvent` may contain optional parameters (data) |
| instance | term | — | A specific instance (running, paused, errored) of a Workflow; a Workflow can have a potentially infinite number of instances |
| step | term | — | A self-contained, individually retryable component of a Workflow that may emit state so the Workflow can continue from it; up to the step limit |
| Workflow | term | — | The named Workflow definition, associated with a single Workers script |

## Related

- [overview.md](./overview.md)
- [workflow-step.md](./workflow-step.md)
- [limits.md](./limits.md)
