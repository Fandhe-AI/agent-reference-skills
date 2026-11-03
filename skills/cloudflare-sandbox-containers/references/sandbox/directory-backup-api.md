---
source: https://developers.cloudflare.com/sandbox/reference/directory-backups/
---

# DirectoryBackup API

`DirectoryBackup` saves a directory from a running container to an R2 bucket and restores it later, including into a container running a newer image. Data moves through `DirectoryBackupGateway` in your Worker, so the container needs no Internet access and no R2 credentials. It does not start or stop the container.

## Signature / Usage

```ts
import {
	DirectoryBackup,
	type DirectoryBackupRecord,
} from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export { DirectoryBackupGateway } from "@cloudflare/sandbox";

export class MyContainer extends DurableObject<Env> {
	readonly #backups: DirectoryBackup;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("No container is configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.#backups = new DirectoryBackup(
			ctx.container,
			ctx.exports.DirectoryBackupGateway,
			{ binding: "BACKUPS", prefix: "workspaces/" },
		);
	}

	// The container must already be running.
	async saveWorkspace() {
		const backup = await this.#backups.backup({
			dir: "/workspace/app",
			exclude: ["node_modules/"],
		});
		// Keep the record. The package does not list backups.
		await this.ctx.storage.put("workspace", backup);
	}

	async restoreWorkspace() {
		const backup =
			await this.ctx.storage.get<DirectoryBackupRecord>("workspace");
		if (backup) {
			await this.#backups.restore(backup);
		}
	}
}
```

```ts
new DirectoryBackup(
	container: Pick<Container, "exec" | "interceptOutboundHttp">,
	gateway: DirectoryBackupGatewayBinding,
	storage: DirectoryBackupStorage,
)
```

## Options / Props

`DirectoryBackupStorage`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| binding | string | — | Name of the R2 bucket binding in `env`, such as `"BACKUPS"`. |
| prefix | string | no prefix | Key prefix; if not empty it must end in `/`. |

`DirectoryBackupOptions` (`backup(options)`):

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| dir | string | — | Absolute path of the directory to back up. |
| name | string | — | Label stored in the record and in object custom metadata. |
| exclude | string[] | — | `.gitignore`-syntax patterns relative to `dir`. `"node_modules/"` matches any such directory; `"/build"` only the top-level one. |
| gitignore | boolean | false | Also apply `.gitignore` files inside `dir` and `.git/info/exclude` (not global excludes). Image needs no `git`. |
| signal | AbortSignal | — | Cancels the operation. |

`DirectoryRestoreOptions` (`restore(record, options)`): `dir` (string, default `dir` from the record; absolute path to replace), `signal` (AbortSignal). `DirectoryBackupDeleteOptions`: `signal` (an aborted signal rejects before deletion).

`DirectoryBackupRecord` (plain object, storable): `id` (UUID; object key is `<prefix><id>.tar.zst`), `dir`, `size` (bytes), `name` (optional), `sha256` (64 lowercase hex, checked on every restore), `format` (`"tar+zstd/1"`).

Methods:

| Method | Signature | Description |
| --- | --- | --- |
| backup | `(options) => Promise<DirectoryBackupRecord>` | Saves `dir` as one object. Not consistent if processes write to `dir` during the backup. A failed or canceled backup aborts its multipart upload. |
| restore | `(backup, options?) => Promise<void>` | Replaces the target atomically after verifying size and SHA-256. |
| delete | `(backup, options?) => Promise<void>` | Deletes the object; container need not run; missing object succeeds. |
| intercept | `() => Promise<void>` | Routes backup traffic to the gateway. Call before `interceptAllOutboundHttp()`; do not call during a backup or restore. |

Errors: `SandboxBackupError` (`code`: `BACKUP_NOT_FOUND`, `BACKUP_INTEGRITY`, `BACKUP_TRANSFER`; `operation`: `backup` or `restore`; `path`; `detail`; use `.is(error)`), `SandboxFileError` (`EBUSY`, `EINVAL`, `ENOENT`, `ENOSPC`, `ENOTDIR`, `EXDEV`), `SandboxProtocolError`, `TypeError` (invalid options/record/storage), abort reasons, and R2 binding errors.

## Notes

- Requirements (in addition to the package requirements): an R2 bucket binding on the Worker, and the main module must re-export `DirectoryBackupGateway`. Do not route HTTP requests to it.
- The container reaches only the object of the operation in progress (upload parts / byte-range reads) at `backups.sandbox.internal`; it cannot list or delete other objects.
- `restore()`: the target's parent must exist; the target must not be or contain a mount point (`EBUSY`; unmount an `S3Mount` first). It extracts beside the target, verifies, then renames atomically; on `SandboxFileError`/`SandboxBackupError` or cancellation before verification the target is left as it was. Processes with cwd or open files inside the old target keep the old directory; restart them. Needs free space for both copies; stops with `ENOSPC` before free space falls below 5% of the filesystem or 256 MiB, whichever is smaller. Restored files are not compressed on disk.
- A backup walks `dir` without following symlinks and does not enter other filesystems (mount points become empty directories). It keeps contents, directories, symlinks, hard links inside `dir`, permission bits, numeric uid/gid, nanosecond mtimes. It does not keep sockets/devices/FIFOs, setuid/setgid bits, xattrs/ACLs/capabilities, sparse holes, or atime. When the image user is root, restore sets saved IDs numerically; otherwise files belong to the image user.
- One `backup()`/`restore()` runs at a time per container; others wait. `delete()` does not wait. No timeouts or retries; an aborted `signal` rejects without waiting for the helper. After a restore verifies its download it completes the replacement even if aborted. A Durable Object restart during an operation loses the result; an interrupted upload stays in the bucket until an R2 lifecycle rule aborts it.
- Limit: 16 MiB parts and 10,000 R2 multipart parts, so a compressed backup is at most 160,000 MiB (about 156 GiB); larger fails with `BACKUP_TRANSFER`.
- Local development: under `wrangler dev`, `restore()` cannot replace a directory that is part of the image (`EXDEV`, directory unchanged); directories created after start, in a volume, or not yet existing work.
- `interceptOutboundHttp()` / `interceptAllOutboundHttp()` are Containers APIs, in the `containers` category of this skill; R2 is covered by the cloudflare-storage skill.

## Related

- [Back up a directory to R2](./back-up-a-directory-to-r2.md)
- [S3Mount API](./s3-mount-api.md)
- [Files API](./files-api.md)
- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
