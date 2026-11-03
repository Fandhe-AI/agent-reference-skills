---
source: https://developers.cloudflare.com/workflows/build/workers-api/
---

# WorkflowEntrypoint and WorkflowEvent

`WorkflowEntrypoint` is the base class of a Workflow definition; its `run` method receives a `WorkflowEvent` and a `WorkflowStep`.

## Signature / Usage

```ts
export class MyWorkflow extends WorkflowEntrypoint<Env, Params> {
	async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
		// Steps here
		let someComputedState = await step.do("my step", async () => {});

		// Optional: return state from our run() method
		return someComputedState;
	}
}
```

`WorkflowEvent` and `WorkflowCronSchedule`:

```ts
export type WorkflowCronSchedule = {
	/** Cron expression that triggered this event. */
	cron: string;
	/** Timestamp of the scheduled trigger, in milliseconds since the Unix epoch. */
	scheduledTime: number;
};

export type WorkflowEvent<T> = {
	payload: Readonly<T>;
	timestamp: Date;
	instanceId: string;
	workflowName: string;
	schedule?: WorkflowCronSchedule;
};
```

## Options / Props

`run(event: WorkflowEvent<T>, step: WorkflowStep): Promise<T>` parameters:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| event | `WorkflowEvent<T>` | — | The event passed to the Workflow, including an optional `payload` |
| step | `WorkflowStep` | — | Provides the step methods |

`WorkflowEvent` fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| payload | `Readonly<T>` | — | Type `any` by default, or `T` if a type parameter is provided |
| timestamp | `Date` | — | Time the Workflow instance was created (triggered) |
| instanceId | `string` | — | ID of the associated instance |
| workflowName | `string` | — | Name of the associated Workflow |
| schedule | `WorkflowCronSchedule` | — | Set for instances created by a cron schedule: `cron` expression and `scheduledTime` (ms since Unix epoch) |

## Notes

- A Workflow must extend `WorkflowEntrypoint` and define a `run` method with at least one `step` call to be valid.
- The value returned by `run` is available when querying instance status (Workers API, REST API, dashboard).
- Any JS control flow (if, loops, `try...catch`, promises) can manage steps inside `run`.
- `WorkflowEvent` and its `payload` are effectively immutable: mutations are not persisted across steps or restarts. Persist state by returning it from `step.do`.
- A type parameter does not validate the incoming event: TypeScript types are erased at runtime, so nothing is checked or removed and extra or malformed properties still reach `run()`. Validate at runtime with a schema library such as zod or your own checks, and copy only the fields you need. Corrected from the official docs: the source says non-conforming properties "are dropped", which TypeScript does not do.
- `event.timestamp` is a `Date`.

## Related

- [workflow-step.md](./workflow-step.md)
- [events-and-parameters.md](./events-and-parameters.md)
- [rules-of-workflows.md](./rules-of-workflows.md)
