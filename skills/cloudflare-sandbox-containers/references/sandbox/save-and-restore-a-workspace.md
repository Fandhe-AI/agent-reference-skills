---
source: https://developers.cloudflare.com/sandbox/files/save-and-restore-a-workspace/
---

# Save and restore a sandbox with snapshots

A Durable Object saves the filesystem of a sandbox as a Container snapshot, stores the snapshot ID, and starts the next instance from it. Container snapshots are in public beta; features and behavior may change.

## Signature / Usage

Durable Object methods (fragment of `MyContainer`; the constructor re-applies `container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS)` when the container is already running, with `const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;`):

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	private async startSandbox(): Promise<Container> {
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
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		return container;
	}

	private queue: Promise<unknown> = Promise.resolve();

	// Runs each operation after the previous one finishes.
	private exclusive<T>(operation: () => Promise<T>): Promise<T> {
		const result = this.queue.then(operation);
		this.queue = result.catch(() => {});
		return result;
	}

	async save() {
		return this.exclusive(async () => {
			const container = await this.startSandbox();
			const snapshot = await container.snapshotContainer({ name: "workspace" });

			await this.ctx.storage.put("snapshotId", snapshot.id);
			await container.destroy();

			return { snapshotId: snapshot.id, size: snapshot.size };
		});
	}

	async note(line?: string) {
		return this.exclusive(async () => {
			const container = await this.startSandbox();
			const script = line
				? 'mkdir -p /workspace && printf "%s\n" "$1" >> /workspace/notes.txt && cat /workspace/notes.txt'
				: "cat /workspace/notes.txt";
			// Runs inside the disposable sandbox container, never on the host.
			const process = await container.exec(["sh", "-c", script, "sh", line ?? ""]);
			const output = await process.output();

			return new TextDecoder().decode(output.stdout);
		});
	}
}
```

Worker routes:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/(notes|snapshot)$/.exec(
			url.pathname,
		);

		if (!match) {
			return new Response("Not found", { status: 404 });
		}

		const [, name, action] = match;
		// Authenticate first; derive the name from the caller (snapshots can hold secrets).
		const sandbox = env.MY_CONTAINER.getByName(name);

		if (action === "snapshot" && request.method === "POST") {
			return Response.json(await sandbox.save());
		}

		if (action === "notes" && request.method === "POST") {
			return new Response(await sandbox.note(await request.text()));
		}

		if (action === "notes") {
			return new Response(await sandbox.note());
		}

		return new Response("Method not allowed", { status: 405 });
	},
} satisfies ExportedHandler<Env>;
```

Copy a sandbox (a snapshot ID restores in any Durable Object of the same class) and start over:

```ts
export class MyContainer extends DurableObject<Env> {
	// ...

	async snapshotId() {
		return (await this.ctx.storage.get<string>("snapshotId")) ?? null;
	}

	async useSnapshot(snapshotId: string) {
		return this.exclusive(async () => {
			// Replacing a running instance would discard files it has not saved.
			if (this.ctx.container?.running) {
				return false;
			}

			await this.ctx.storage.put("snapshotId", snapshotId);
			return true;
		});
	}

	async reset() {
		return this.exclusive(async () => {
			if (this.ctx.container?.running) {
				await this.ctx.container.destroy();
			}

			await this.ctx.storage.delete("snapshotId");
		});
	}
}
```

Copy route (add `copy` to the actions in the route pattern):

```ts
if (action === "copy" && request.method === "POST") {
	const from = url.searchParams.get("from") ?? "";
	const snapshotId = await env.MY_CONTAINER.getByName(from).snapshotId();

	if (!snapshotId || !(await sandbox.useSnapshot(snapshotId))) {
		return new Response("Cannot copy", { status: 409 });
	}

	return new Response(null, { status: 204 });
}
```

## Notes

- A failed restore (`Snapshot "<SNAPSHOT_ID>" was not found.`) fails the request and later requests until the stored ID changes; the method deliberately does not fall back to the image, which would silently give an empty workspace.
- A command writing a file while the snapshot runs can succeed and then vanish when `destroy()` stops the instance; `exclusive()` serializes every disk-touching method with the save. A snapshot saves the writable root filesystem only (no mounts, memory, or processes); finish writing before saving.
- Snapshots can contain credentials and sensitive files. Authenticate callers and give each user their own sandbox name. The copy route above takes `from` from the query string: in production verify that the caller owns both sandboxes; copy only between sandboxes of the same user. Deleting the stored ID does not delete the snapshot, so a copy can still restore it until it expires (30 days after creation or last restore).
- Try it: `curl .../sandboxes/ada/notes --data "Continue from this checkpoint."`, `curl .../sandboxes/ada/snapshot --request POST` (returns `{"snapshotId":"<SNAPSHOT_ID>","size":123456}`), then read notes; `curl ".../sandboxes/grace/copy?from=ada" --request POST`.
- `snapshotContainer()` and `containerSnapshot` are in the `containers` category of this skill. Example: https://github.com/cloudflare/sandbox-sdk/tree/main/examples/checkpoint-workspace.

## Related

- [Save a sandbox automatically](./save-a-sandbox-automatically.md)
- [Back up a directory to R2](./back-up-a-directory-to-r2.md)
- [Sandbox lifetime](./sandbox-lifetime.md)
