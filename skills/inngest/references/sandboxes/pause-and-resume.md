# Pause and resume

Pause a Sandbox while a job waits, then resume the same environment under the same ID without rebuilding its files. While paused, Inngest releases the live runtime and restores filesystem, memory, processes, environment, resources, network identity, and remaining runtime on resume.

## Signature / Usage

Direct client (server-side):

```typescript
import type { Sandbox } from "inngest/experimental";
import { inngest } from "./inngest/client";

let sandbox: Sandbox | undefined;

try {
  sandbox = await inngest.sandboxes.create({
    name: `paused-work-${crypto.randomUUID()}`,
    vcpu: 1,
    memoryMb: 1024,
  });

  await sandbox.commands.run(
    "printf 'work in progress\n' > /tmp/progress.txt",
  );

  const paused = await sandbox.pause({ timeout: "5m" });
  console.log(paused.status);

  const running = await paused.resume({ timeout: "5m" });
  sandbox = running;

  console.log(running.id === paused.id);
  console.log(running.status);

  const result = await running.commands.run("cat /tmp/progress.txt");
  console.log(result.stdout);
} finally {
  await sandbox?.destroy();
}
```

Inside an Inngest function (requires `sandboxMiddleware()` and stable step IDs):

```typescript
const sandbox = await step.sandbox.create("create-sandbox", {
  name: `paused-work-${event.data.jobId}`,
  vcpu: 1,
  memoryMb: 1024,
});

await sandbox.commands.run(
  "write-progress",
  "printf 'work in progress\n' > /tmp/progress.txt",
);

const paused = await sandbox.pause("pause-sandbox", { timeout: "5m" });
const running = await paused.resume("resume-sandbox", { timeout: "5m" });

const result = await running.commands.run(
  "read-progress",
  "cat /tmp/progress.txt",
);

await running.destroy("destroy-sandbox");
return result.stdout;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `timeout` | duration string (e.g. `"5m"`) | How long the SDK call waits for the transition; the transition can continue if the wait fails |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta, Pro plans and above; use `inngest@4.21.1` or newer. API and limits can change.
- State flow: `RUNNING` -> `PAUSING` -> `PAUSED` -> `RESUMING` -> `RUNNING`. Both SDK methods wait for the stable state and return a new Sandbox object; use the object returned by `resume()` to continue. SDK objects are immutable views.
- The beta allows one hour of active runtime per Sandbox; paused time does not consume remaining runtime. The runtime timeout requests an automatic Pause (see Limits, Runtime expiry).
- Pause is a cold checkpoint: active external network connections can break; reconnect clients after resume. Commands, file operations, logs, and process operations require `RUNNING`.
- The direct client does not make operations durable or retry them. If a wait fails, call `inngest.sandboxes.get(sandboxId)` to inspect state before retrying; keep the Sandbox ID if another request will resume it.
- Cleanup: the final Destroy step handles the success path; for permanent failures add an `onFailure` cleanup handler or a separate cleanup function that receives the Sandbox ID. Destroy removes filesystem, processes, and retained output.
- Pause vs snapshot: pause/resume continues one Sandbox under its original ID; a user snapshot is a reusable artifact for cloning or restoring to a point in time.
- Pause does not coordinate your application's shutdown. The paused Sandbox remains a lifecycle resource; destroy it when done. No permanent storage guarantee for pause checkpoints; store lasting artifacts outside the Sandbox.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/pause-and-resume (retrieved 2026-11-14)

## Related

- [Snapshots and restore](./snapshots-and-restore.md)
- [Cloning](./cloning.md)
- [Durable filesystems](./durable-filesystems.md)
- [SSH](./ssh.md)
