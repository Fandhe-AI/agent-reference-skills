# Base images

The default Sandbox image includes Node.js, Python, Ruby, and common command-line tools, so you can run generated code or inspect a repository without building an image first. Pass `from` to choose another image.

## Signature / Usage

```typescript
import { image } from "inngest/experimental";

await step.sandbox.create("build", {
  name: "build",
  vcpu: 2,
  memoryMb: 2048,
  from: image.inngest("base"),
});

await step.sandbox.create("custom", {
  name: "custom",
  vcpu: 2,
  memoryMb: 2048,
  from: image.custom("my-image:v1"),
});
```

Inspect the image after the Sandbox reaches `RUNNING` (direct client):

```typescript
const result = await sandbox.commands.run(
  "node --version && python3 --version && ruby --version && git --version",
  { timeout: "30s" },
);

console.log(result.stdout);
console.error(result.stderr);
console.log(result.exitCode);
```

Inside an Inngest function, give the operation a stable step ID:

```typescript
const result = await sandbox.commands.run(
  "inspect-image",
  "node --version && python3 --version && ruby --version && git --version",
  { timeout: "30s" },
);
```

Install packages inside a running Sandbox:

```typescript
await sandbox.commands.run(
  "mkdir -p /tmp/project && cd /tmp/project && npm init -y && npm install lodash",
  { timeout: "5m" },
);
```

## Options / Props

### What the beta image includes

| Tool | Included |
|------|----------|
| Node.js | Latest release as `node`, `npm`, `npx`; LTS release as `node-lts`, `npm-lts`, `npx-lts` |
| Python | Python 3.14 |
| Ruby | Ruby 4.0 |
| Repository and network tools | Git, curl, OpenSSH, CA certificates |
| Operating system and utilities | Debian 13 slim with GNU `grep`, `sed`, `awk`, `find`, `diff`, `tar`, `gzip`, plus `ripgrep` and `jq` |

Not included: Go, Rust, Java, Bun, Deno.

### Supported sizes

Fresh Sandboxes accept 1, 2, or 4 vCPU with 1, 2, or 4 GiB of memory per vCPU. `memoryMb` is in MiB.

| `vcpu` | Allowed `memoryMb` values |
|--------|---------------------------|
| 1 | 1024, 2048, 4096 |
| 2 | 2048, 4096, 8192 |
| 4 | 4096, 8192, 16384 |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta, Pro plans and above; API, image, and limits may change. Exact installed versions can change when Inngest rebuilds the image.
- `image.inngest()` and `image.custom()` are experimental and exported from `inngest/experimental`.
- Reference a custom image by name, `name:tag`, or `name@sha256:<hex>`; a name without a tag uses `latest`. The image must already be published to your workspace; Create does not build or upload one.
- Create resolves the image once. A retry of the same Sandbox keeps its original image even if the tag moved; use a new Sandbox name to pick up an update. A Sandbox's `imageRef` and `imageDigest` show what it started from.
- A snapshot clone keeps its source image and cannot select another and inherits CPU and memory.
- `inngest.sandboxes.create()` takes the same `from`, or a plain `image` string such as `"my-image:v1"`. With REST, set `"image": "my-image:v1"` on `POST /v2/sandboxes`; to pin an artifact use `my-image@sha256:<digest>` (64-character lowercase hex).
- A nonzero command exit code appears in the result and does not throw an SDK error.
- Installed packages change only that Sandbox, not the base image. They persist across pause and resume, a snapshot captures them, and destroying the Sandbox removes them. User snapshots expire; for files shared across Sandboxes use S3-backed persistent mounts.
- Other sizes are not available and no size profile name is accepted. Missing capacity returns `503 compute_unavailable`.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/base-images (retrieved 2026-11-14)

## Related

- [Custom images](./custom-images.md)
- [Snapshots and restore](./snapshots-and-restore.md)
- [Durable filesystems](./durable-filesystems.md)
- [Features overview](./features-overview.md)
