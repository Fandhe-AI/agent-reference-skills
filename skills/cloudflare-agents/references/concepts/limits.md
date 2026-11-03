---
source: https://developers.cloudflare.com/agents/platform/limits/
---

# Limits

Concurrency, storage, and compute-time limits for Cloudflare Agents; many are inherited from Workers and Durable Objects.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/agents/runtime/lifecycle/job-queue/ (job duration interacts with these limits: split long work with a heartbeat):

```ts
import { DurableObject } from "cloudflare:workers";
import {
	Lifecycle,
	type LifecycleJobContext,
	type LifecycleJobOutcome,
} from "agents/lifecycle";

const HEARTBEAT_MS = 30_000;

export class ImportAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);
	#running: Promise<void> | undefined;

	async startImport(): Promise<void> {
		await this.lifecycle.start();
		await this.ctx.storage.put("import:pending", true);
		await this.lifecycle.jobs.push({
			id: "import",
			fn: "import",
			time: Date.now(),
			recoveryLoop: true,
		});
	}

	async onJob({ job }: LifecycleJobContext): Promise<LifecycleJobOutcome> {
		if (job.fn !== "import") return;
		if (!(await this.ctx.storage.get("import:pending"))) return;

		// Start the loop if this wake has none, for example after an eviction.
		this.#running ??= this.#runImport().finally(() => {
			this.#running = undefined;
		});
		this.lifecycle.trackAlarmWork(this.#running);
		return { rescheduleAt: Date.now() + HEARTBEAT_MS };
	}

	async #runImport(): Promise<void> {
		// Resume from the last checkpoint in storage, then clear the flag.
		await this.ctx.storage.delete("import:pending");
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Max concurrent (running) Agents per account | limit | — | Tens of millions+ (each Agent is a unique Durable Object). |
| Max definitions per account | limit | — | ~250,000+ (up to 500 scripts per account; each script can define multiple Agents; a deployed script can be up to 10 MB on the Workers Paid plan). |
| Max state stored per unique Agent | limit | — | 1 GB. |
| Max compute time per Agent | limit | — | 30 seconds, refreshed per HTTP request, scheduled task, or incoming WebSocket message. |
| Wall-clock duration per step | limit | — | Unlimited (for example, waiting on a database call or an LLM response). |

## Notes

- Compute (CPU) time is limited to 30 seconds per Agent but is refreshed when the Agent receives a new HTTP request, runs a scheduled task, or receives a WebSocket message.
- To request a higher limit use the Cloudflare Limit Increase Request Form; Cloudflare contacts you if the limit can be increased.
- Workers and Durable Object limits themselves: cloudflare-workers and cloudflare-stateful.

## Related

- [What are agents?](./what-are-agents.md)
- [Jobs and alarms](../runtime/job-queue.md)
