# Sandboxes limits

Choose a supported Sandbox size and plan tasks around the current beta limits for runtime, command output, tools, files, and snapshots. These limits apply to Sandboxes; workflow limits are separate.

## Signature / Usage

Adapted (not in the official docs): the page has no code; this snippet is built only from the page's mentions of `runningTimeout` (`false` returns before readiness) and `toolOptions.maxCalls` / `toolOptions.toolTimeout`. The call shapes are taken from the Reference and Tools pages.

```typescript
const sandbox = await step.sandbox.create("create-sandbox", {
  name: `job-${event.data.jobId}`,
  vcpu: 1,
  memoryMb: 1024,
  runningTimeout: false, // return before readiness; call waitUntilRunning separately
});

await sandbox.waitUntilRunning("wait-for-sandbox", { timeout: "60s" });

await sandbox.commands.run("agent", "node agent.js", {
  tools: { getCustomer },
  toolOptions: { maxCalls: 200, toolTimeout: "1m" },
});
```

## Options / Props

| Limit | Current beta value and scope | If you reach it |
|-------|------------------------------|-----------------|
| Access | Inngest Cloud account on Pro or above. | `403 access_denied` means the plan does not include Sandboxes. |
| Size | 1, 2, or 4 vCPU with 1, 2, or 4 GiB of memory per vCPU. A clone inherits its snapshot's size. | Other sizes return `400 invalid_field_format`. Entitlement or capacity can still reject a supported size. |
| Custom images | One `linux/amd64` image per upload, up to 5 GiB uploaded and 5 GiB expanded. At most 10 unfinished builds per workspace; builds count against Sandbox concurrency. | Too many unfinished builds returns `429 rate_limited`. |
| Active name | 1-255 Unicode characters, unique among active Sandboxes in a workspace. | Reusing a name with the same configuration returns the existing Sandbox. Conflicting configuration returns `409 sandbox_name_taken`. |
| Create readiness wait | TypeScript SDK waits 120 seconds by default. `runningTimeout` changes the wait; `false` returns before readiness. | A wait timeout does not cancel Create or destroy the Sandbox. Get its state and clean up if needed. |
| Captured command | 30-second default; five-minute maximum observation timeout per command. | A timeout can leave the command's effects uncertain. Check its effect before repeating a state-changing command. Use a managed process for longer work. |
| Captured command output | Direct SDK and REST: 4 MiB combined stdout and stderr. `step.sandbox`: 2 MiB retained tail per step result. | Direct output over the cap returns `413 sandbox_exec_output_too_large`; the command may have run. The durable result reports truncation. Write large output to a file or external store. |
| Sandbox tools | One call 256 KiB request and 1 MiB reply. 100 calls per command and a 30-second timeout per `tool.step()` by default. | A tool step fails, or the command is stopped at `maxCalls`. Raise `toolOptions.maxCalls` or `toolOptions.toolTimeout`, or send less data. |
| Managed-process wait | 30-second default; five-minute maximum per wait. | The wait ends while the process can keep running. Get the process or wait again. |
| Managed-process output | Approximately 512 KiB per process across both streams; rings kept for the newest 32 processes in a Sandbox. `tailBytes` accepts 0-524,288 bytes. | Older output can be evicted while metadata remains. Save important output externally. Live streams are best effort. |
| File upload or download | 100 MiB per regular file, through the direct SDK or REST. Unavailable through `step.sandbox` in the beta. | `413 sandbox_file_too_large`. Split it or use external storage. |
| Snapshot readiness wait | TypeScript SDK waits up to five minutes for a new snapshot to become `READY`. | A timeout stops polling, not snapshot creation. List or Get recent snapshots before creating another. |
| Snapshot quota and retention | Account-specific count and stored-byte quotas, with no published numeric values. Each snapshot has a server-defined `expiresAt`. | `403 sandbox_snapshot_limit_exceeded`. Delete unneeded snapshots or ask Inngest about your entitlement. |
| Runtime, disk, and concurrent Sandbox quota | One hour of active runtime per Sandbox in the newer beta reference. Paused time does not count. Disk and concurrent-Sandbox quotas have no published numeric beta values. No user-configurable lifetime, disk size, or resizing. | The runtime timeout requests an automatic Pause (see Runtime expiry). Destroy Sandboxes when work ends. |

### Runtime expiry

When a Sandbox reaches its entitled runtime, Inngest requests an automatic Pause. The normal transition is `RUNNING` → `PAUSING` → `PAUSED`. Reaching the runtime limit does not itself destroy the Sandbox or mark it `FAILED`. The timeout and pause run asynchronously and can be retried, so the state change is not guaranteed at the exact second the limit is reached.

Pause saves memory and disk in a private checkpoint and releases the live runtime. The Sandbox keeps its ID and can be resumed while its checkpoint is retained. Pause checkpoints have a separate retention period and are not permanent storage.

- A captured command started with `commands.run()` can be terminated when Pause closes its exec connection. The call can fail without returning a final exit code or complete output. Inspect files or an application-defined completion marker after Resume before repeating work with external effects.
- A background process started with `processes.start()` is independent of its start request. Its captured state can continue after Resume, but active wait, output-stream, and external network connections can break. Reconnect and inspect the process after the Sandbox is running again.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta: these values describe the current Sandbox beta, not a launch guarantee. The API and limits can change without a compatibility period. Use the beta for evaluation and feedback, not production data you cannot recreate.
- New Sandboxes use the default image or a custom image you publish to the workspace and choose at create, and the workspace's default egress-allowed network. The beta does not expose template, VPC, or public ingress selection. The beta also limits argument, environment, process specification, and JSON body sizes.
- A snapshot captures memory, disk, environment, image, and resources. A clone has a new Sandbox ID and captured filesystem. Pause and Resume preserve the same Sandbox ID and filesystem; a private pause checkpoint does not count as a user snapshot. Snapshots are crash-consistent, expire, and are not permanent storage. Destroy removes the Sandbox filesystem and process output.
- After a Pause, use Get to inspect the current state and wait for Resume to return `RUNNING` before issuing commands, files, logs, or process calls. Save lasting artifacts externally.
- Source: https://www.inngest.com/docs-markdown/sandboxes/limits (retrieved 2026-11-14)

## Related

- [Reference](./reference.md)
- [Tools](./tools.md)
- [Commands](./commands.md)
- [Managed lifecycle](./managed-lifecycle.md)
- [Best practices](./best-practices.md)
