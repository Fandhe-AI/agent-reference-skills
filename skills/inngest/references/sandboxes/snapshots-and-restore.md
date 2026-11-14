# Snapshots and restore

Prepare dependencies or files once, snapshot the Sandbox, and clone new Sandboxes from the snapshot for separate jobs. Each clone gets its own Sandbox ID and a copy of the captured local filesystem.

## Signature / Usage

Direct client (assumes `sandbox` is running):

```typescript
await sandbox.commands.run(
  "mkdir -p /work && printf 'prepared\\n' > /work/config.txt"
);

const snapshot = await sandbox.snapshot({}, { timeout: "5m" });

try {
  const clone = await snapshot.clone({
    name: `prepared-${crypto.randomUUID()}`,
    runningTimeout: "2m",
  });

  try {
    const result = await clone.commands.run("cat /work/config.txt");
    console.log(result.stdout);
  } finally {
    await clone.destroy();
  }
} finally {
  await snapshot.delete();
}
```

Inside an Inngest function (stable step IDs):

```typescript
const snapshot = await sandbox.snapshot(
  "snapshot-prepared-sandbox",
  {},
  { timeout: "5m" }
);

const clone = await snapshot.clone("clone-prepared-sandbox", {
  name: `prepared-${event.data.jobId}`,
  runningTimeout: "2m",
});

const result = await clone.commands.run(
  "read-prepared-file",
  "cat /work/config.txt"
);

await clone.destroy("destroy-clone");
await snapshot.delete("delete-snapshot");

return result.stdout;
```

Name and find a snapshot:

```typescript
const snapshot = await sandbox.snapshot({ name: "deps-installed" });

const found = await inngest.sandboxes.snapshots.list({ name: "deps-installed" });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` (snapshot) | `string` | Optional snapshot name; case-sensitive, up to 255 characters, no control characters, no leading/trailing whitespace |
| `timeout` (snapshot) | duration string | SDK wait for `READY`; default and maximum five minutes |
| `name` (clone) | `string` | Name for the new sandbox |
| `runningTimeout` (clone) | duration string | Wait for the clone to reach `RUNNING` |

### Snapshot states

`CREATING`, `READY`, `DELETING`, `DELETED`, `FAILED`, `LOST`. Clone only a `READY` snapshot.

### Management API

- Direct client: `inngest.sandboxes.snapshots.list()`, `get(snapshotId)`.
- In a function: `step.sandbox.snapshots.list(stepId)` (also `list(stepId, { name })`) and `get(stepId, snapshotId)`.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta, Pro plans and above; use `inngest@4.21.1` or newer. Do not use snapshots as permanent storage.
- A user snapshot captures memory, disk, environment, image, and CPU/memory configuration. The source sandbox keeps running. An S3-backed persistent mount attaches the same backing path to each clone.
- Snapshots are point-in-time and crash-consistent; flush databases and application state first. Each snapshot has a server-defined `expiresAt` and counts against account-specific snapshot limits; the beta guide publishes no fixed quota or retention values.
- `sandbox.snapshot()` returns when the snapshot reaches `READY` (REST initially returns `202 CREATING`). If the wait times out, creation continues; list or get the snapshot before creating another.
- `snapshot.clone()` creates a sandbox with a new UUID that inherits image, resources, environment, memory, and disk. It may start immediately or enter `STARTING`; the SDK waits for `RUNNING` by default. A timeout does not destroy the new sandbox.
- Delete the snapshot when done making clones, destroy each clone, and clean up the source sandbox separately.
- In functions, snapshot Create and its readiness wait are separate memoized steps. Let unexpected errors escape so Inngest applies retry policy. Use an `onFailure` handler or cleanup function; a `finally` block around durable steps does not guarantee cleanup after permanent failure or cancellation.
- Clone vs pause: a clone starts a new sandbox and does not overwrite the source; pause/resume preserves the original sandbox ID. Private pause checkpoints do not appear in the user snapshot list or count against quota. There is no operation that replaces an existing sandbox with a user snapshot.
- A name is held by one `CREATING` or unexpired `READY` snapshot at a time; reuse fails with `sandbox_snapshot_name_taken`.
- Snapshot Create has no idempotency key. If a request returns `operation_ambiguous`, list recent snapshots and reconcile before another Create. Count or storage quota can also reject creation.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/snapshots-and-restore (retrieved 2026-11-14)

## Related

- [Cloning](./cloning.md)
- [Pause and resume](./pause-and-resume.md)
- [Durable filesystems](./durable-filesystems.md)
