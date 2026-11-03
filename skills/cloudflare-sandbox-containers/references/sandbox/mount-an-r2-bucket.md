---
source: https://developers.cloudflare.com/sandbox/files/mount-an-r2-bucket/
---

# Mount an R2 bucket

Mount a prefix of an R2 bucket (or another S3-compatible bucket) in a sandbox with `S3Mount`, run a command against the mounted files, then unmount. `S3Gateway` in your Worker checks each request against the bucket, prefix, and access mode, signs it with credentials the container never receives, and forwards it to R2.

## Signature / Usage

Setup:

```sh
npm i @cloudflare/sandbox
npx wrangler types
npx wrangler secret put S3_ACCESS_KEY_ID
npx wrangler secret put S3_SECRET_ACCESS_KEY
```

```dockerfile
FROM node:24-trixie-slim

RUN apt-get update \
	&& apt-get install -y --no-install-recommends ca-certificates fuse3 s3fs \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=docker.io/cloudflare/sandbox:<VERSION> /usr/local/bin/sandbox-shim /usr/local/bin/sandbox-shim

CMD ["sleep", "infinity"]
```

```jsonc
{
	"compatibility_flags": ["nodejs_compat"],
	"vars": {
		"S3_ENDPOINT": "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
		"S3_BUCKET": "sandbox-artifacts",
	},
	"secrets": {
		"required": ["S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"],
	},
	"containers": [
		{
			"class_name": "MyContainer",
			"scheduling_policy": "durable_object",
			"images": {
				"artifacts": {
					"dockerfile": "./Dockerfile",
				},
			},
		},
	],
}
```

Durable Object and Worker:

```ts
import { S3Mount } from "@cloudflare/sandbox";

// S3Mount sends storage requests from the sandbox to this entrypoint.
export { S3Gateway } from "@cloudflare/sandbox";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyContainer extends DurableObject<Env> {
	private readonly container: Container;
	private readonly mounts: S3Mount;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		const container = ctx.container;

		if (!container) {
			throw new Error("No container is configured");
		}

		this.container = container;
		this.mounts = new S3Mount(container, ctx.exports.S3Gateway);

		if (container.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	private async mountArtifacts(job: string) {
		if (!this.container.running) {
			this.container.start({
				image: this.container.images.artifacts,
				enableInternet: false,
			});
			await this.container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}

		await this.mounts.mount({
			mountPath: "/mnt/artifacts",
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
	}

	async digest(job: string) {
		await this.mountArtifacts(job);
		// Runs inside the disposable sandbox container, never on the host.
		const process = await this.container.exec(
			// The command reads `input.txt` from R2 through the mount
			// and writes `input.sha256` next to it
			["sh", "-c", "sha256sum input.txt > input.sha256"],
			{ cwd: "/mnt/artifacts" },
		);
		const output = await process.output();

		return {
			exitCode: output.exitCode,
			stderr: new TextDecoder().decode(output.stderr),
		};
	}

	async finish() {
		if (!this.container.running) {
			return;
		}

		await this.mounts.unmount("/mnt/artifacts");
		await this.container.destroy();
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const match = /^\/jobs\/([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(\/digest)?$/.exec(url.pathname);

		if (!match) {
			return new Response("Not found", { status: 404 });
		}

		const [, job, digest] = match;
		// Authenticate callers first so others cannot run jobs or read results.
		const sandbox = env.MY_CONTAINER.getByName(job);

		if (digest && request.method === "POST") {
			return Response.json(await sandbox.digest(job));
		}

		if (!digest && request.method === "DELETE") {
			await sandbox.finish();
			return new Response(null, { status: 204 });
		}

		return new Response("Method not allowed", { status: 405 });
	},
} satisfies ExportedHandler<Env>;
```

Try it (on your machine; the R2 object commands use `--remote` to act on the real bucket):

```sh
echo "artifact input" > input.txt
npx wrangler r2 object put sandbox-artifacts/jobs/ada/input.txt --file input.txt --remote
curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/jobs/ada/digest --request POST
npx wrangler r2 object get sandbox-artifacts/jobs/ada/input.sha256 --remote --pipe
curl https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/jobs/ada --request DELETE
```

Develop locally against MinIO (put the values in a `.dev.vars` file and keep it out of version control):

Adapted (not in the official docs): the MinIO port is published on `127.0.0.1` only, because the server uses the default `minioadmin` credentials; see Notes.

```sh
docker run --detach --name minio --publish 127.0.0.1:9000:9000 minio/minio server /data
docker exec minio sh -c "mc alias set local http://localhost:9000 minioadmin minioadmin && mc mb local/sandbox-artifacts"
```

```txt
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
```

## Notes

- Adapted from the official docs: the official `docker run` publishes `9000:9000` on all interfaces; binding to `127.0.0.1` keeps the default-credential MinIO off the network. These credentials are local-only throwaways and `.dev.vars` must not be committed.
- `secrets.required` adds the secrets to generated types and makes `wrangler deploy` fail when missing. To use another S3-compatible service, change `S3_ENDPOINT`, `S3_BUCKET` and the credentials.
- Any process in the sandbox can read, change, or delete every object under the mounted prefix: mount the narrowest prefix and use `access: "read-only"` for read-only jobs; scope the R2 token to that bucket. The sandbox gets placeholder credentials (`s3fs` needs a key pair); the mount works with `enableInternet: false`. For short-lived credentials see the S3Mount API page.
- Repeating `mount()` with identical settings reuses the mount; each new mount adds an outbound intercept that `unmount()` does not remove, and an instance supports a limited number of intercepts, so give each job its own sandbox name. `keyPrefix` here comes from a path segment limited by the route regex; still authenticate callers.
- A mount maps files to objects: renames, locks, and permissions differ from a local disk. Keep working files (dependencies, build output) on the sandbox disk and write results other systems read to the mount. Call `finish()` only after writers have ended: `unmount()` denies requests first, so a still-writing process loses writes; a busy path throws `S3_MOUNT_BUSY`.
- Local dev under `wrangler dev` runs the container in Docker and `S3Gateway` in your local Worker; FUSE needs Docker in a VM (for example Docker Desktop) or rootless Linux Docker with `/dev/fuse`. See Local development in the `containers` category of this skill. Example: https://github.com/cloudflare/sandbox-sdk/tree/main/examples/artifact-workspace. R2 is covered by the cloudflare-storage skill.

## Related

- [S3Mount API](./s3-mount-api.md)
- [Save and restore a sandbox with snapshots](./save-and-restore-a-workspace.md)
- [Back up a directory to R2](./back-up-a-directory-to-r2.md)
