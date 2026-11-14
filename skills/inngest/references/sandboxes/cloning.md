# Cloning

Prepare a Sandbox once, snapshot it, and clone a separate Sandbox for each job. Each clone starts from the captured state with its own Sandbox ID.

## Signature / Usage

Direct client:

```typescript
const builder = await inngest.sandboxes.create({
  name: `builder-${crypto.randomUUID()}`,
  vcpu: 2,
  memoryMb: 2048,
});

try {
  await builder.commands.run(
    "mkdir -p /tmp/project && cd /tmp/project && npm init -y && npm install lodash",
    { timeout: "5m" },
  );

  const snapshot = await builder.snapshot({}, { timeout: "5m" });

  try {
    const clone = await snapshot.clone({
      name: `worker-${crypto.randomUUID()}`,
      runningTimeout: "2m",
    });

    try {
      const result = await clone.commands.run(
        "node -p \"require('/tmp/project/node_modules/lodash').VERSION\"",
      );

      console.log(clone.id, result.stdout);
    } finally {
      await clone.destroy();
    }
  } finally {
    await snapshot.delete();
  }
} finally {
  await builder.destroy();
}
```

Inside an Inngest function (`builder` created with `step.sandbox.create()`):

```typescript
const snapshot = await builder.snapshot(
  "snapshot-builder",
  {},
  { timeout: "5m" },
);

const clone = await snapshot.clone("clone-worker", {
  name: `worker-${event.data.jobId}`,
  runningTimeout: "2m",
});

const result = await clone.commands.run(
  "run-check",
  "node -p \"require('/tmp/project/node_modules/lodash').VERSION\"",
);

await clone.destroy("destroy-clone");
await snapshot.delete("delete-snapshot");

return result.stdout;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Name of the clone |
| `runningTimeout` | duration string | Bound on waiting for the clone to reach `RUNNING`; default up to 120 seconds |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta, Pro plans and above; the API can change.
- A user snapshot captures memory, disk, environment, image, and CPU/memory configuration. Each clone has a **new sandbox ID** and inherits the snapshot's resource size and environment; a clone does not accept an environment override that replaces captured values. Snapshots are crash-consistent: flush databases and important state first.
- Use `try`/`finally` around direct-client work. Destroy every clone and the source, and delete the snapshot when no more clones are needed.
- In functions, each durable operation uses its own step ID. If a function can fail permanently before cleanup, use an `onFailure` handler or a separate cleanup function; a `finally` block around durable steps does not guarantee cleanup.
- `sandbox.snapshot()` waits for `READY` up to five minutes by default; on timeout creation continues, so list or get before retrying (and list recent snapshots after an ambiguous result). `snapshot.clone()` returns a `RUNNING` clone or waits for `STARTING` to reach `RUNNING`; a timeout does not destroy the new sandbox, so track and clean it up.
- Snapshots have a server-defined `expiresAt`, are not permanent storage, and use account-specific count and storage quotas; exact retention and quotas are still being finalized. Clones inherit CPU and memory (see supported sizes in Base images).
- Clone vs pause: clone gives a separate sandbox with a new ID; pause/resume continues the same sandbox. User snapshots do not restore in place.
- Persistent mounts: with an S3-backed persistent filesystem mount on the source, each clone attaches the **same backing path**; use separate paths when jobs need independent files.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/cloning (retrieved 2026-11-14)

## Related

- [Snapshots and restore](./snapshots-and-restore.md)
- [Pause and resume](./pause-and-resume.md)
- [Base images](./base-images.md)
- [Durable filesystems](./durable-filesystems.md)
