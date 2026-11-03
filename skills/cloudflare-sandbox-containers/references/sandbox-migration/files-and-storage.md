---
source: https://developers.cloudflare.com/sandbox/sdk/migrate/files/, https://developers.cloudflare.com/sandbox/sdk/migrate/backups/, https://developers.cloudflare.com/sandbox/sdk/migrate/bucket-mounts/
---

# Migrating files, backups and bucket mounts

Replace 0.12 file calls with `Files` (needs the `sandbox-shim` helper in the image), `createBackup()` / `restoreBackup()` with `DirectoryBackup`, and `mountBucket()` with `S3Mount` plus an exported `S3Gateway`.

## Signature / Usage

Files (create one `Files` as a class field; call `ensureRunning()` before each file call):

```ts
import { Files, SandboxFileError } from "@cloudflare/sandbox";

export class MySandbox extends DurableObject<Env> {
	private readonly files = new Files(this.container);
	// ...
}
```

Write into a new directory (0.12 created parents; 1.0 needs `mkdir()`):

```ts
await this.files.mkdir("/workspace/app/src", { recursive: true });
await this.files.writeFile("/workspace/app/src/index.js", code);
```

Error handling:

```ts
try {
	await this.files.stat("/workspace/package.json");
} catch (cause) {
	if (SandboxFileError.is(cause) && cause.code === "ENOENT") {
		// The file does not exist.
	} else {
		throw cause;
	}
}
```

Bucket mounts (Worker exports the gateway; the class mounts a key prefix):

```ts
import {
	S3Mount,
	SandboxS3MountError,
} from "@cloudflare/sandbox";

// S3Mount sends each storage request to this entrypoint.
export { S3Gateway } from "@cloudflare/sandbox";
```

Adapted (not in the official docs): comment added; `job` must be a validated, path-safe identifier and credentials come from Worker secrets, see Notes.

```ts
// `this.mounts` is the S3Mount instance of your class. Validate `job` (for example
// /^[a-z0-9-]{1,64}$/) before building the key prefix; never use raw request input.
await this.mounts.mount({
	mountPath: "/data",
	source: {
		type: "s3",
		endpoint: this.env.S3_ENDPOINT,
		region: "auto",
		bucket: this.env.S3_BUCKET,
		credentials: {
			type: "static",
			accessKeyId: this.env.S3_ACCESS_KEY_ID,
			secretAccessKey: this.env.S3_SECRET_ACCESS_KEY,
		},
	},
	keyPrefix: `jobs/${job}`,
	access: "read-write",
});
```

Backups declarations (top level of `src/index.ts`):

```ts
import {
	DirectoryBackup,
	type DirectoryBackupRecord,
} from "@cloudflare/sandbox";

// Gives the Durable Object this.ctx.exports.DirectoryBackupGateway,
// which moves each backup between the container and the bucket
export { DirectoryBackupGateway } from "@cloudflare/sandbox";

// 0.12 kept a backup for three days unless you set ttl.
const DEFAULT_TTL_SECONDS = 3 * 24 * 60 * 60;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `readFile(path)` text | 0.x call | — | `await (await this.files.readFile(path)).text()`; binary: `new Uint8Array(await response.arrayBuffer())`. |
| `readFileStream(path)`, `streamFile()`, `collectFile()` | 0.x call | — | `(await this.files.readFile(path)).body` (file bytes). |
| `exists(path)` | 0.x call | — | `this.files.stat(path)`, catch `SandboxFileError` code `ENOENT`. |
| `mkdir(path, { recursive })` | 0.x call | — | `this.files.mkdir(path, { recursive })`. |
| `deleteFile(path)` | 0.x call | — | `this.files.remove(path)`; directories need `recursive: true` (else `EISDIR`). |
| `renameFile()`, `moveFile()` | 0.x call | — | `this.files.rename(source, destination)` with the full new path. |
| `listFiles()` | 0.x call | — | `this.files.readDirectory(path)` (name and type only, includes dotfiles) plus `stat()` for sizes (`bigint`, convert with `Number()`). |
| `watch()` | 0.x call | — | `inotifywait -m -r -e create,modify,delete,move --format "%e %w%f" /workspace` under `timeout` via `container.exec()`; add `inotify-tools` to the image. |
| `checkChanges()` | 0.x call | — | No replacement. |
| `FileNotFoundError`, `FileExistsError`, `PermissionDeniedError`, `FileSystemError` | 0.x error | — | `SandboxFileError` codes `ENOENT`, `EEXIST`, `EACCES`, and the failure's own code (`EISDIR`, `ENOTDIR`...). |
| `mountBucket()` | 0.x call | — | `S3Mount.mount()`; `prefix` becomes `keyPrefix` (no leading `/`), `readOnly` becomes `access`, `s3fsOptions` is an object, credentials come from `source.credentials`. Dockerfile needs `fuse3` and `s3fs`. |
| `unmountBucket()` | 0.x call | — | `S3Mount.unmount()`; `S3_MOUNT_BUSY` while a process uses the path. |
| `createBackup()`, `restoreBackup()` | 0.x call | — | Durable Object methods of the same names built on `DirectoryBackup`; keep the R2 binding named `BACKUP_BUCKET`. |
| `dir`, `name`, `ttl`, `excludes`, `gitignore` | 0.x option | — | `dir`, `name`, expiry stored in `backups/<ID>.meta.json`, `exclude` (`.gitignore` syntax), `gitignore`. |

## Notes

- Files: relative paths throw `TypeError: cwd is required when path is relative`; pass `cwd`. Without `mkdir()`, `writeFile()` rejects with code `ENOENT`. `writeFile()` writes directly, so readers can see a partly written file; write to a temporary path then `rename()` to match 0.12. `rename()` follows Linux rules: it replaces the destination, rejects `ENOTEMPTY` for a non-empty directory, and fails with `EXDEV` across filesystems (copy with `cp -a`, check the result, then `files.remove(source, { recursive: true })`). Binary responses carry no `Content-Type`. A recursive listing needs a walk of `readDirectory()`.
- `inotifywait` takes one regular expression for `--include`/`--exclude` (last `--exclude` wins) and needs absolute paths; if the client disconnects first, the watcher exits on its next write. Commands in the watcher run inside the container, never on the host. It reports only changes made while it runs.
- Bucket mounts: `S3Mount` reaches `S3Gateway` through `this.ctx.exports` (compatibility date `2025-11-17` or later, or `enable_ctx_exports`); bucket credentials stay in the Worker, none in the container, and are not read from `AWS_*` / `R2_*` environment variables. 1.0 cannot mount through an R2 binding: create an R2 API token with Object Read & Write for the bucket. Each mount uses one of the 64 intercept targets of the container and `unmount()` does not free it; give each job its own sandbox name. Mount before `interceptAllOutboundHttp()`; a mount after it fails with `cannot verify the new FUSE connection`. `localBucket` is replaced by running `S3Mount` under `wrangler dev` with a local S3-compatible server. Objects stay in the bucket across the switch; 0.12 `prefix: "/jobs/ada/"` maps to `keyPrefix: "jobs/ada"`. `S3Mount` always sets `nomixupload`. Errors: `SandboxS3MountError` codes `S3_MOUNT_CONFLICT`, `S3_MOUNT_FAILED`, `S3_MOUNT_BUSY`; invalid requests throw `TypeError`.
- Backups: `DirectoryBackup` saves a compressed archive to the same `BACKUP_BUCKET` binding (0.12 saved a SquashFS image and mounted it); the container never receives bucket credentials. 0.12 `dir` accepted only `/workspace`, `/home`, `/tmp`, `/var/tmp`, `/app`; `DirectoryBackup` accepts any absolute path, so validate request-chosen directories. An expired backup stays in the bucket until `this.backups.delete(backup)` (also delete its `.meta.json`). 0.12 `multipart`, `localBucket`, `compression` are removed. Errors: `SandboxBackupError` codes `BACKUP_NOT_FOUND`, `BACKUP_TRANSFER`, `BACKUP_INTEGRITY`; `SandboxFileError` for Linux errors.
- Converting 0.12 backups: 0.12 stored `backups/<ID>/data.sqsh` and `backups/<ID>/meta.json`; they remain in the bucket. On first restore, extract the SquashFS image (add `squashfs-tools` to the image, `unsquashfs`) into the directory and back it up with `DirectoryBackup`. For the whole filesystem use `container.snapshotContainer()` (see snapshots.md in the containers category).
- Mounts and files at the in-place switch: a 0.12 mount ends with the container; the mount path does not exist in the new container until you mount again; files in old containers do not carry over. `this.mounts.inspect("/data")` reports `attachment` `managed`, `fuse` `connected`, `gateway` `reachable`, `upstream` `usable` for a working mount.
- Adapted from the official docs: the mount snippet builds `keyPrefix` from a `job` variable that the page leaves undefined; if it derives from request input, restrict it to a validated identifier so one caller cannot mount another job's prefix.
- Added: every shell or `exec()` string here runs inside the sandbox container; do not paste credentials into Worker source (use secrets for `S3_ACCESS_KEY_ID` and `S3_SECRET_ACCESS_KEY`) and add `.dev.vars` to `.gitignore` for local values.
- Sibling reference: the `sandbox/` category of this skill documents `Files`, `S3Mount` and `DirectoryBackup` in detail.

## Related

- [API map](./api-map.md)
- [Plan and move](./plan-and-move.md)
- [Commands and processes](./commands-and-processes.md)
- [Networking and other features](./networking-and-other.md)
