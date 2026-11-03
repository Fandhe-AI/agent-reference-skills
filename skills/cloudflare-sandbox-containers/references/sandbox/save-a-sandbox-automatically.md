---
source: https://developers.cloudflare.com/sandbox/files/save-a-sandbox-automatically/
---

# Save a sandbox automatically

An alarm in the Durable Object saves a Container snapshot of an idle sandbox and stops it; while the sandbox is in use it also saves checkpoints. The next request starts from the last snapshot. Container snapshots are in public beta.

## Signature / Usage

Constants and methods (fragments of `MyContainer`):

```ts
const CHECK_INTERVAL_MS = 60 * 1000;
const IDLE_LIMIT_MS = 10 * 60 * 1000;
const CHECKPOINT_INTERVAL_MS = 15 * 60 * 1000;
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
```

```ts
constructor(ctx: DurableObjectState, env: Env) {
	super(ctx, env);
	const container = ctx.container;
	if (container?.running) {
		void ctx.blockConcurrencyWhile(() =>
			container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
		);
	}
}
```

Adapted (not in the official docs): `exec()`, the save, and the stop in `alarm()` run through one `exclusive()` queue (the helper from the save-and-restore page) instead of the `busy` counter and `activeDuringSave` check, so a command being accepted cannot be mistaken for idle and killed by `destroy()`.

```ts
private queue: Promise<unknown> = Promise.resolve();

// Runs each operation after the previous one finishes.
private exclusive<T>(operation: () => Promise<T>): Promise<T> {
	const result = this.queue.then(operation);
	this.queue = result.catch(() => {});
	return result;
}

async exec(argv: string[]) {
	// A command is accepted, run, and recorded as one unit, so the alarm
	// never sees a half-started command as idle.
	return this.exclusive(async () => {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured");
		}

		if (!container.running) {
			const snapshotId = await this.ctx.storage.get<string>("snapshotId");
			container.start({
				...(snapshotId
					? { containerSnapshot: { id: snapshotId } }
					: { image: "cloudflare/debian-trixie" }),
				entrypoint: ["sleep", "infinity"],
				enableInternet: false,
			});
			await this.ctx.storage.put("savedAt", Date.now());
		}
		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		if ((await this.ctx.storage.getAlarm()) === null) {
			await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);
		}

		try {
			// Runs inside the disposable sandbox container, never on the host.
			const process = await container.exec(argv);
			const output = await process.output();
			return {
				stdout: new TextDecoder().decode(output.stdout),
				exitCode: output.exitCode,
			};
		} finally {
			await this.ctx.storage.put("lastActivity", Date.now());
		}
	});
}

async save() {
	const startedAt = Date.now();
	const snapshot = await this.ctx.container!.snapshotContainer({
		name: "auto",
	});
	await this.ctx.storage.put({ snapshotId: snapshot.id, savedAt: startedAt });
}

async alarm() {
	// Save and stop run in the same queue as exec(), so no command can start
	// between the save and destroy().
	return this.exclusive(async () => {
		const container = this.ctx.container;
		if (!container?.running) {
			return;
		}

		const lastActivity = (await this.ctx.storage.get<number>("lastActivity")) ?? 0;
		const savedAt = (await this.ctx.storage.get<number>("savedAt")) ?? 0;
		const idle = Date.now() - lastActivity > IDLE_LIMIT_MS;
		const checkpoint =
			lastActivity > savedAt && Date.now() - savedAt > CHECKPOINT_INTERVAL_MS;

		if (idle || checkpoint) {
			try {
				await this.save();
			} catch (error) {
				// Keep the instance and try again at the next check.
				console.error("Saving the sandbox failed", error);
				await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
				await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);
				return;
			}
		}

		if (idle) {
			await container.destroy("idle");
			return;
		}

		await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		await this.ctx.storage.setAlarm(Date.now() + CHECK_INTERVAL_MS);
	});
}

async status() {
	return {
		running: this.ctx.container?.running ?? false,
		snapshotId: (await this.ctx.storage.get<string>("snapshotId")) ?? null,
	};
}
```

Worker routes:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)$/.exec(url.pathname);
		if (!match) {
			return new Response("Not found", { status: 404 });
		}

		// Authenticate first and derive the name from the caller; the argv below
		// is caller-supplied and runs inside that caller's sandbox only.
		const sandbox = env.MY_CONTAINER.getByName(match[1]);
		if (request.method === "GET") {
			return Response.json(await sandbox.status());
		}

		const { argv } = (await request.json()) as { argv: string[] };
		return Response.json(await sandbox.exec(argv));
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- The inactivity timeout (5 min) is longer than the check interval (1 min), so the instance keeps running between checks; if checks stop, the timeout stops the instance and the sandbox keeps its last saved files. `savedAt` is when files were last saved or restored; no save/stop happens while a command runs.
- Adapted from the official docs: the official example tracks running commands with an in-memory `busy` counter and re-checks `lastActivity` after the save. Because `exec()` awaits `setInactivityTimeout()` and storage calls before updating those values, a request accepted during a save could be missed and `destroy()` would kill its command and drop changes made after the snapshot. Here `exec()` (acceptance through completion), the save, and the stop share one `exclusive()` queue, as in the save-and-restore page. Trade-offs: commands run one at a time per sandbox, a request that arrives during a save waits for it, and the alarm waits for a running command.
- A save takes a few seconds; requests during it queue behind it; if the save was the idle save, the instance stops and the queued request starts a new one from the snapshot just saved. A failed save keeps the instance and retries at the next check. If a deploy interrupts a save, the runtime runs the alarm again. Checkpoints limit data loss when something other than the alarm stops the sandbox; restore returns the last checkpoint only.
- A Durable Object has one alarm: merge these checks into an existing `alarm()` and set the alarm to the earliest time needed.
- A snapshot saves the writable root filesystem only; a process writing a file during a save can leave a partial file. Each save creates a new snapshot; the container API has no delete, snapshots expire 30 days after creation or last restore; raise `CHECKPOINT_INTERVAL_MS` or drop checkpoints to save fewer.
- The official route accepts `argv` from any caller. Snapshots can contain credentials: authenticate callers and give each user their own sandbox name (see sandbox-security).
- Durable Objects alarms are covered by the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/); `snapshotContainer()` / `destroy()` by the `containers` category of this skill.

## Related

- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
- [Run code when a sandbox stops](./run-code-when-a-sandbox-stops.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
