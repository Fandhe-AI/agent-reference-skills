---
source: https://developers.cloudflare.com/sandbox/manage/run-code-when-a-sandbox-stops/
---

# Run code when a sandbox stops

The runtime does not wake a Durable Object when its container stops. The Durable Object watches the container with `monitor()` while it is in memory and checks for a missed stop on every command and alarm. This example also stops idle sandboxes itself so the record shows why each stopped.

## Signature / Usage

Constants and record:

```ts
const CHECK_INTERVAL_MS = 60 * 1000;
// Stop a sandbox after this long without requests
const IDLE_LIMIT_MS = 10 * 60 * 1000;
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;

interface SandboxRecord {
	state: "running" | "stopped";
	lastActivity: number;
	reason?: string;
	exitCode?: number | null;
	stoppedAt?: number;
}
```

Durable Object (fragments of `MyContainer`):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;
		// A restarted Durable Object loses the earlier `monitor()` call and the
		// inactivity timeout
		if (container?.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
			this.watch();
		}
	}

	watch() {
		this.ctx.container?.monitor().then(
			() => this.onStop("exited", 0),
			(error: unknown) => {
				const exitCode = (error as { exitCode?: number }).exitCode;
				if (exitCode === undefined) {
					return this.onStop(String(error), null);
				}
				return this.onStop("exited", exitCode);
			},
		);
	}

	async onStop(reason: string, exitCode: number | null) {
		const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
		// Record each stop once, even when two checks report it
		if (record?.state !== "running") {
			return;
		}

		await this.ctx.storage.put<SandboxRecord>("sandbox", {
			...record,
			state: "stopped",
			reason,
			exitCode,
			stoppedAt: Date.now(),
		});
		await this.ctx.storage.deleteAlarm();
		console.log(JSON.stringify({ event: "sandbox.stopped", reason, exitCode }));
	}

	async reconcile() {
		const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
		if (record?.state === "running" && !this.ctx.container?.running) {
			// A stop that happened while the Durable Object was not in memory has
			// no exit code
			await this.onStop("unknown", null);
		}
	}

	// Count the commands that are running. A request in progress keeps the
	// Durable Object in memory, so the count does not need storage
	busy = 0;

	async exec(argv: string[]) {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured");
		}

		await this.reconcile();
		if (!container.running) {
			container.start({
				image: "cloudflare/debian-trixie",
				entrypoint: ["sleep", "infinity"],
				enableInternet: false,
			});
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
			this.watch();
		}
		await this.ctx.storage.put<SandboxRecord>("sandbox", {
			state: "running",
			lastActivity: Date.now(),
		});
		await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);

		this.busy++;
		try {
			// Runs inside the disposable sandbox container, never on the host.
			const process = await container.exec(argv);
			const output = await process.output();
			return {
				stdout: new TextDecoder().decode(output.stdout),
				exitCode: output.exitCode,
			};
		} finally {
			this.busy--;
			const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
			if (record?.state === "running") {
				await this.ctx.storage.put<SandboxRecord>("sandbox", {
					...record,
					lastActivity: Date.now(),
				});
			}
		}
	}

	async alarm() {
		await this.reconcile();
		const record = await this.ctx.storage.get<SandboxRecord>("sandbox");
		if (record?.state !== "running") {
			return;
		}

		if (this.busy === 0 && Date.now() - record.lastActivity > IDLE_LIMIT_MS) {
			await this.ctx.container?.destroy("idle");
			return;
		}
		await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);
	}

	async status() {
		return (await this.ctx.storage.get<SandboxRecord>("sandbox")) ?? null;
	}

	async stop() {
		await this.ctx.container?.destroy("stopped");
	}
}
```

Worker routes (`GET` returns the record, `DELETE` stops, `POST` runs a command):

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Authenticate callers first, otherwise anyone can use or stop the sandbox.
		const sandbox = env.MY_CONTAINER.getByName("sandbox");

		if (request.method === "GET") {
			return Response.json(await sandbox.status());
		}

		if (request.method === "DELETE") {
			await sandbox.stop();
			return new Response(null, { status: 204 });
		}

		const { argv } = (await request.json()) as { argv: string[] };
		return Response.json(await sandbox.exec(argv));
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

`reason` values in the record:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| exited | string | — | The main process exited; `exitCode` holds its exit code. |
| idle | string | — | Your Durable Object called `destroy("idle")`. |
| stopped | string | — | Your Durable Object called `destroy("stopped")`. |
| unknown | string | — | The container stopped while the Durable Object was not in memory and a later command or alarm found it stopped; no exit code. |
| other text | string | — | The error from `monitor()` when the container failed. |

## Notes

- Keep the inactivity timeout longer than the check interval so the container runs between alarms. While `monitor()` waits the inactivity timeout does not start, so the alarm enforces the idle limit; if alarms stop, the timeout still stops the container after the Durable Object leaves memory. The alarm does not stop a sandbox while a command runs.
- When the main process fails `monitor()` rejects with an error that has `exitCode`; `destroy(reason)` makes `monitor()` reject with that reason. A deploy while the sandbox runs does not record a stop.
- A Durable Object has one alarm: merge into an existing `alarm()` and set the earliest time needed.
- `monitor()` / `destroy()` are in the `containers` category of this skill; alarms and storage in the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/).

## Related

- [Sandbox lifetime](./sandbox-lifetime.md)
- [Save a sandbox automatically](./save-a-sandbox-automatically.md)
- [List a user's sandboxes](./list-sandboxes.md)
