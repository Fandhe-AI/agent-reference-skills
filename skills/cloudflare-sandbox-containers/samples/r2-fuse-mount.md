---
source: https://developers.cloudflare.com/containers/examples/r2-fuse-mount/
---

# Mount R2 buckets with FUSE

Start a Container that mounts an R2 bucket read-only with FUSE (tigrisfs), lists it, and exits; the Durable Object awaits completion with `monitor()`.

## Signature / Usage

`wrangler.jsonc` (replace the bucket name and account ID; use R2 API credentials with Object Read access scoped to that bucket):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "r2-fuse-container",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "observability": {
    "enabled": true
  },
  "containers": [
    {
      "class_name": "FUSEDemo",
      "scheduling_policy": "durable_object",
      "images": {
        "base": {
          "dockerfile": "./Dockerfile"
        }
      }
    }
  ],
  "durable_objects": {
    "bindings": [
      {
        "name": "FUSE_DEMO",
        "class_name": "FUSEDemo"
      }
    ]
  },
  "exports": {
    "FUSEDemo": {
      "type": "durable-object",
      "storage": "sqlite"
    }
  },
  "vars": {
    "R2_BUCKET_NAME": "<BUCKET_NAME>",
    "R2_ACCOUNT_ID": "<ACCOUNT_ID>"
  }
}
```

Store the credentials (and the route token added below) as Worker secrets; each command prompts on stdin:

```sh
npx wrangler secret put AWS_ACCESS_KEY_ID
npx wrangler secret put AWS_SECRET_ACCESS_KEY
npx wrangler secret put RUN_TOKEN
```

`Dockerfile`:

```dockerfile
FROM alpine:3.20
RUN apk add --no-cache ca-certificates fuse curl

ARG TIGRISFS_VERSION=1.2.1
RUN ARCH=$(uname -m) && \
    case "$ARCH" in x86_64) ARCH=amd64 ;; aarch64) ARCH=arm64 ;; esac && \
    curl -fL "https://github.com/tigrisdata/tigrisfs/releases/download/v${TIGRISFS_VERSION}/tigrisfs_${TIGRISFS_VERSION}_linux_${ARCH}.tar.gz" -o /tmp/tigrisfs.tar.gz && \
    tar -xzf /tmp/tigrisfs.tar.gz -C /usr/local/bin/ && \
    rm /tmp/tigrisfs.tar.gz && \
    chmod +x /usr/local/bin/tigrisfs

COPY startup.sh /startup.sh
CMD ["sh", "/startup.sh"]
```

`startup.sh` (runs inside the container, not on the host):

```sh
set -eu
mkdir -p /mnt/r2

/usr/local/bin/tigrisfs \
  --endpoint "https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com" \
  --region auto -o ro -f "$R2_BUCKET_NAME" /mnt/r2 &
fuse_pid=$!
trap 'fusermount -u /mnt/r2 2>/dev/null || true; kill "$fuse_pid" 2>/dev/null || true' EXIT

# Wait for the mount instead of reading an empty local directory.
attempt=0
until mountpoint -q /mnt/r2; do
  if ! kill -0 "$fuse_pid" 2>/dev/null; then
    echo "FUSE process exited before mounting" >&2
    exit 1
  fi
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo "Timed out mounting R2" >&2
    exit 1
  fi
  sleep 1
done

ls -lah /mnt/r2
```

Adapted (not in the official docs): the `POST /run` route now requires a bearer token and rejects every request when `RUN_TOKEN` is unset; see Notes.

`src/index.js`:

```js
import { DurableObject } from "cloudflare:workers";

export class FUSEDemo extends DurableObject {
	currentRun;

	run() {
		this.currentRun ??= this.runOnce().finally(() => {
			this.currentRun = undefined;
		});
		return this.currentRun;
	}

	async runOnce() {
		const container = this.ctx.container;
		if (!container.running) {
			container.start({
				image: container.images.base,
				instance: "lite",
				enableInternet: true,
				env: {
					AWS_ACCESS_KEY_ID: this.env.AWS_ACCESS_KEY_ID,
					AWS_SECRET_ACCESS_KEY: this.env.AWS_SECRET_ACCESS_KEY,
					R2_BUCKET_NAME: this.env.R2_BUCKET_NAME,
					R2_ACCOUNT_ID: this.env.R2_ACCOUNT_ID,
				},
			});
		}
		await container.monitor();
	}
}

// Fail closed: reject when RUN_TOKEN is unset or the header does not match.
function authorized(request, env) {
	const expected = env.RUN_TOKEN;
	if (!expected) return false;
	const encoder = new TextEncoder();
	const given = encoder.encode(request.headers.get("Authorization") ?? "");
	const wanted = encoder.encode(`Bearer ${expected}`);
	return (
		given.byteLength === wanted.byteLength &&
		crypto.subtle.timingSafeEqual(given, wanted)
	);
}

export default {
	async fetch(request, env) {
		if (new URL(request.url).pathname !== "/run") {
			return new Response("Not found", { status: 404 });
		}
		if (request.method !== "POST") {
			return new Response("Use POST /run", {
				status: 405,
				headers: { Allow: "POST" },
			});
		}
		if (!authorized(request, env)) {
			return new Response("Unauthorized", { status: 401 });
		}
		await env.FUSE_DEMO.getByName("demo").run();
		return new Response("Bucket listing complete. Check the container logs.");
	},
};
```

Test locally (Docker-compatible engine with FUSE support, Wrangler 4.136.0 or later). Put the R2 credentials and a test `RUN_TOKEN` in `.dev.vars` (add it to `.gitignore`):

```sh
npx wrangler dev
```

In another terminal:

```sh
curl -X POST http://localhost:8787/run -H "Authorization: Bearer ${RUN_TOKEN}"
```

## Notes

- Adapted from the official docs: the official route is unauthenticated, but it starts a container that holds R2 credentials. The token check (`RUN_TOKEN`) is added and fails closed.
- FUSE gives filesystem access to object storage, not local-disk performance or full POSIX semantics. Good for reading datasets, models, and shared assets.
- `enableInternet: true` is required so tigrisfs can reach the R2 endpoint. A mount failure makes `monitor()` reject.
- A path inside the mount (for example `/mnt/r2/datasets`) does not restrict the credentials to that prefix. To write, remove `-o ro`, use Object Read and Write credentials, and unmount cleanly before the container exits.
- Concurrent calls share the active task; a later call starts a new run.

## Related

- [Environment variables and secrets](./env-vars-and-secrets.md)
- [Outbound traffic](../references/containers/outbound-traffic.md)
- [Local development](../references/containers/local-dev.md)
