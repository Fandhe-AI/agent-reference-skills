---
source: https://developers.cloudflare.com/sandbox/reference/s3-mounts/
---

# S3Mount API

`S3Mount` mounts an S3-compatible bucket, or a prefix in one, at a path in a running container. The container runs `s3fs`, which sends requests to `S3Gateway` in your Worker; the gateway checks and signs each request with credentials the container never receives. It does not start or stop the container.

## Signature / Usage

```ts
import { S3Mount } from "@cloudflare/sandbox";
import { DurableObject } from "cloudflare:workers";

export { S3Gateway } from "@cloudflare/sandbox";

export class MyContainer extends DurableObject<Env> {
	private readonly mounts: S3Mount;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		if (!ctx.container) {
			throw new Error("No container is configured");
		}
		// ctx.container stays the same object while the Durable Object runs.
		this.mounts = new S3Mount(ctx.container, ctx.exports.S3Gateway);
	}

	// The container must already be running (the disposable sandbox container).
	async mountModels() {
		await this.mounts.mount({
			mountPath: "/mnt/models",
			source: {
				type: "s3",
				endpoint: `https://${this.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
				region: "auto",
				bucket: "models",
				credentials: {
					type: "static",
					accessKeyId: this.env.R2_ACCESS_KEY_ID,
					secretAccessKey: this.env.R2_SECRET_ACCESS_KEY,
				},
			},
			keyPrefix: "production",
			access: "read-only",
		});
	}
}
```

```ts
new S3Mount(container: Pick<Container, "exec" | "interceptOutboundHttp">, gateway: S3GatewayBinding)
```

## Options / Props

`S3MountRequest`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mountPath | string | — | Absolute, normalized path. Not `/`; cannot overlap `/proc/self/mountinfo`, `/run/sandbox/s3-mounts`, `/usr/local/bin/sandbox-shim`. |
| source.type | "s3" | — | Source kind. |
| source.endpoint | string | — | HTTP(S) origin of the S3 API, no credentials/path/query/fragment. R2: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`. |
| source.region | string | — | Signing region. R2: `auto`. |
| source.bucket | string | — | Bucket name; cannot start with `-` or contain `/` or `:`. |
| source.credentials | object | — | Static or provider credentials (below). |
| keyPrefix | string | whole bucket | Prefix to mount; cannot start with `/`; a trailing `/` is added. |
| access | "read-only" \| "read-write" | — | Whether processes can create, change, delete objects. |
| s3fsOptions | Readonly<Record<string, string \| number \| boolean>> | — | Extra `s3fs` options (`true` = flag, `false` = omitted, else `name=value`). Options setting endpoint, credentials, access mode, proxy, or identity throw `TypeError`; `nomixupload` is always set and cannot be passed. |

Credentials: static is `{ type: "static", accessKeyId, secretAccessKey, sessionToken? }`. Provider is `{ type: "provider", fetcher }`; the gateway sends `GET https://credentials.sandbox.internal/` with `Accept: application/json` and expects JSON of at most 16 KiB:

```json
{
	"accessKeyId": "<ACCESS_KEY_ID>",
	"secretAccessKey": "<SECRET_ACCESS_KEY>",
	"sessionToken": "<SESSION_TOKEN>",
	"expiresAt": 1790000000000
}
```

`sessionToken` is optional; `expiresAt` is Unix ms in the future. Credentials are not cached; failed provider requests are not retried.

Methods (all accept `S3MountOperationOptions { signal?: AbortSignal }`):

| Method | Signature | Description |
| --- | --- | --- |
| mount | `(request, options?) => Promise<void>` | Creates directory and mounts; reuses an identical mount; repairs leftover state from a failed identical mount; different settings or another filesystem throw `S3_MOUNT_CONFLICT`. |
| inspect | `(mountPath, options?) => Promise<S3MountInspection>` | Reports state without changing it; sends one list request through the gateway. No timeout; pass `signal`. |
| unmount | `(mountPath, options?) => Promise<void>` | Denies further requests (HTTP 403), then unmounts; never forces. A busy path throws `S3_MOUNT_BUSY`. |

`S3MountInspection.attachment.status`: `absent`, `unmanaged` (with `filesystemType`), `incompatible`, `stale`, `managed` (with `configuration`, `fuse.status` connected/disconnected/indeterminate, `gateway.status` unreachable/error/reachable, `gateway.upstream.status` usable/unavailable/rejected).

Errors: `SandboxS3MountError` (`code`: `S3_MOUNT_CONFLICT`, `S3_MOUNT_BUSY`, `S3_MOUNT_FAILED`, `S3_MOUNT_INCOMPATIBLE`; `operation`: mount/inspect/unmount; `path`; `detail`; use `.is(error)`), `SandboxProtocolError`, `TypeError`, abort reasons.

## Notes

- The official example passes R2 access keys as static credentials. They stay in the Worker and are never given to the container, but use credentials scoped to the one bucket and prefix, and store them as Worker secrets (gitignored `.dev.vars` locally).
- Requirements: the image contains FUSE 3 and `s3fs` (Debian/Ubuntu packages `fuse3` and `s3fs`); the main module re-exports `S3Gateway` (do not route HTTP to it).
- The gateway sends placeholder credentials to the container (s3fs needs a key pair), drops the container's `Authorization` header, allows only object and list operations within the mount's bucket and prefix, and rejects writes on read-only mounts. Any process that can reach the mount path can do every allowed operation on the prefix.
- `S3Mount` does not accept an R2 binding; use the R2 S3 API endpoint with R2 API credentials.
- Each new mount adds one outbound intercept target and shares the container intercept limit. Call `mount()` before `interceptAllOutboundHttp()`, right after starting the container; otherwise `mount()` fails with `cannot verify the new FUSE connection`.
- Mounted files are not a local disk: rename copies then deletes; locks, hard links, ownership, permissions, atomic replace do not work; directories come from key prefixes; `s3fs` caches metadata (including "not found") for 900 seconds by default (lower with `stat_cache_expire`; `disable_noobj_cache: true` stops caching missing files); interrupted writes can leave incomplete uploads; snapshots exclude mounts.
- After `unmount()` denial, a process still using the path can read empty files and lose writes without an error.
- Containers outbound intercepts are covered in the `containers` category of this skill; R2 in the cloudflare-storage skill.

## Related

- [Mount an R2 bucket](./mount-an-r2-bucket.md)
- [DirectoryBackup API](./directory-backup-api.md)
- [Sandbox security](./sandbox-security.md)
