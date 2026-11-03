---
source: https://developers.cloudflare.com/sandbox/files/back-up-a-directory-to-r2/
---

# Back up a directory to R2

`DirectoryBackup` from `@cloudflare/sandbox` saves one directory as one object in your R2 bucket and restores it as ordinary files, after the instance stops or a new image is deployed. R2 keeps each backup until you delete it.

## Signature / Usage

Setup (the `COPY` tag must match the installed package version; see the sandbox-package page):

```sh
npm i @cloudflare/sandbox
npx wrangler r2 bucket create sandbox-backups
```

```dockerfile
FROM node:24-trixie-slim

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

RUN mkdir /workspace
CMD ["sleep", "infinity"]
```

```jsonc
{
	"compatibility_flags": ["nodejs_compat"],
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"workspace": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
	"r2_buckets": [
		{
			"binding": "BACKUPS",
			"bucket_name": "sandbox-backups",
		},
	],
}
```

Durable Object (decline Wrangler's offer to add the bucket to the config; the config above adds the binding):

```ts
import {
	DirectoryBackup,
	type DirectoryBackupRecord,
} from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export { DirectoryBackupGateway } from "@cloudflare/sandbox";

const project = "/workspace/project";
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private readonly container: Container;
	private readonly backups: DirectoryBackup;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		this.container = container;
		this.backups = new DirectoryBackup(
			container,
			ctx.exports.DirectoryBackupGateway,
			{ binding: "BACKUPS", prefix: "backups/" },
		);

		// A restarted Durable Object sets the timeout again.
		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	private async startSandbox(): Promise<void> {
		if (!this.container.running) {
			this.container.start({
				image: this.container.images.workspace,
				enableInternet: false,
			});
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}
	}

	async note(line?: string) {
		await this.startSandbox();
		const script = line
			? `mkdir -p ${project} && printf "%s\n" "$1" >> ${project}/notes.txt && cat ${project}/notes.txt`
			: `cat ${project}/notes.txt`;
		// Runs inside the disposable sandbox container, never on the host.
		const process = await this.container.exec(["sh", "-c", script, "sh", line ?? ""]);
		const output = await process.output();

		return new TextDecoder().decode(output.stdout);
	}

	async backup() {
		await this.startSandbox();
		const backup = await this.backups.backup({ dir: project });

		await this.ctx.storage.put(`backup:${backup.id}`, backup);
		return { id: backup.id, size: backup.size };
	}

	async restore(id: string) {
		const backup = await this.ctx.storage.get<DirectoryBackupRecord>(
			`backup:${id}`,
		);

		if (!backup) {
			return false;
		}

		await this.startSandbox();
		await this.backups.restore(backup);
		return true;
	}

	async deleteBackup(id: string) {
		const backup = await this.ctx.storage.get<DirectoryBackupRecord>(
			`backup:${id}`,
		);

		if (backup) {
			// `delete()` does not need a running container
			await this.backups.delete(backup);
			await this.ctx.storage.delete(`backup:${id}`);
		}
	}
}
```

Worker routes:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match =
			/^\/sandboxes\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)\/(notes|backups)(?:\/([0-9a-f-]{36})\/restore)?$/.exec(
				url.pathname,
			);

		if (!match) {
			return new Response("Not found", { status: 404 });
		}

		const [, name, resource, id] = match;
		// Authenticate first; backups hold every file, including credentials.
		const sandbox = env.MY_CONTAINER.getByName(name);

		if (resource === "notes" && !id) {
			const line = request.method === "POST" ? await request.text() : undefined;
			return new Response(await sandbox.note(line));
		}

		if (resource === "backups" && request.method === "POST") {
			if (!id) {
				return Response.json(await sandbox.backup(), { status: 201 });
			}

			return (await sandbox.restore(id))
				? new Response(null, { status: 204 })
				: new Response("Backup not found", { status: 404 });
		}

		return new Response("Method not allowed", { status: 405 });
	},
} satisfies ExportedHandler<Env>;
```

Leave out files (`.gitignore` syntax, relative to the directory):

```ts
const backup = await this.backups.backup({
	dir: project,
	exclude: ["node_modules/", "/build"],
	// Also apply the `.gitignore` files in the directory and `.git/info/exclude`,
	// without `git` in the image
	gitignore: true,
});
```

## Notes

- The container sends the backup through `DirectoryBackupGateway`, which writes it to the bucket; the container never receives R2 credentials and reaches only the object of the operation in progress. The record (ID, size, SHA-256) is stored by the Durable Object and looked up by ID, so a request cannot point a restore at another object in the bucket. The package keeps no list of backups.
- Stop commands that write to the directory before `backup()`; a file changed during the backup can be saved partly old, partly new.
- `restore()` replaces the directory (files not in the backup are removed) after checking the SHA-256; on `SandboxFileError` / `SandboxBackupError` it leaves the directory as it was. `BACKUP_NOT_FOUND` when the object is gone, `BACKUP_INTEGRITY` when it does not match the record. A lifecycle rule expiring `backups/` also deletes backups but leaves records.
- A failed backup leaves no object. If the Durable Object restarts mid-backup, the incomplete multipart upload stays until the bucket's default lifecycle rule aborts it after seven days.
- Test (on your machine): `curl .../sandboxes/ada/notes --data "Keep this line."`, `curl .../sandboxes/ada/backups --request POST` (returns `{"id":"<BACKUP_ID>","size":217}`), then `.../backups/<BACKUP_ID>/restore --request POST` returns `204`. Authenticate callers so others cannot back up or restore another sandbox. R2 is covered by the cloudflare-storage skill.

## Related

- [DirectoryBackup API](./directory-backup-api.md)
- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
- [Mount an R2 bucket](./mount-an-r2-bucket.md)
