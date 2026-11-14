# Sandboxes best practices

Run isolated code while keeping cleanup, retries, and results visible in your workflow. Record important results outside the Sandbox and plan cleanup before you create it, because destroying the resource removes its local files and processes.

## Signature / Usage

Adapted (not in the official docs): the page has no code; this snippet is built only from the page's advice to use the direct client in trusted server code, keep the Sandbox ID, destroy in `finally`, and use `runningTimeout: false` then `waitUntilRunning`. The call shapes are taken from the Reference page.

```typescript
const sandbox = await inngest.sandboxes.create({
  name: `job-${jobId}`,
  vcpu: 1,
  memoryMb: 1024,
  runningTimeout: false, // get the ID before the readiness wait
});

try {
  await sandbox.waitUntilRunning();
  // ... run the work, read results before Destroy
} finally {
  await sandbox.destroy();
}
```

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta: the API can change without a compatibility period. Use Sandboxes for evaluation and feedback; do not use them for production workloads or data you cannot recreate.
- Pick the client: `step.sandbox` inside an Inngest function records each operation as a durable step (stable step ID each; Inngest can replay completed results and retry safe operations). `inngest.sandboxes` in trusted server-side code for immediate requests, file transfer, live logs, or live process output; it does not retry automatically. Keep the client and `INNGEST_SIGNING_KEY` on the server. Durable steps record API results; they do not preserve a guest process, a live Sandbox, its filesystem, or its output after that resource is lost or destroyed.
- Plan cleanup before creating: Destroy when the work finishes (it removes processes, filesystem, and retained output). With the direct client, keep the ID and destroy in `finally`. Inside a function, make Destroy a normal step on the success path and add an `onFailure` handler or a separate cleanup function for permanent failure (a JavaScript `finally` block does not replace it). Use `runningTimeout: false` when you need the ID before the readiness wait, then `waitUntilRunning` as a separate step; a readiness timeout does not destroy the Sandbox. Store the Sandbox ID and fetch by ID rather than storing a serialized SDK object. For one isolated task, `step.sandbox.python` / `step.sandbox.typescript` destroy for you; for a block scope, use `await using` or `group.sandbox()`.
- Make retries safe: keep the same logical step ID on replay. Give Create a stable, job-specific name and the same resources on retries (same resources returns the existing Sandbox; changed resources produce `sandbox_name_taken`). Treat `operation_ambiguous` as an unknown outcome and do not repeat just because the response was lost: for `exec`, check external effects or a completion marker; for `process.start`, list processes and compare command and start time (stop and reconcile if you cannot identify it); for `process.signal`, get or wait first and repeat only if duplicate delivery is safe; for snapshot creation, list recent snapshots first (Snapshot Create has no idempotency key). Let an unexpected ambiguous error escape an Inngest function unless you implement reconciliation or operator review.
- Save results outside the Sandbox: read command output, files, and artifacts before Destroy. Captured commands have a five-minute observation limit; the direct client accepts up to 4 MiB across stdout and stderr, `step.sandbox` keeps at most 2 MiB and retains the tail. Check `result.output.truncated` before treating output as complete. Managed-process output is best effort (about 512 KiB per process, newest 32 rings, slow consumers can miss chunks, reconnecting can repeat chunks); persist important output to a file or external store. Use external storage for files that must survive independently; snapshots expire and Destroy removes the filesystem. For shared files, the planned S3-backed persistent filesystem mount attaches the same backing path to each Sandbox, including a clone; decide how writers coordinate.
- Pause vs snapshots: pause and resume when you need the same Sandbox later (keeps ID, filesystem, memory, environment, remaining runtime; wait for `RUNNING` before calling commands, files, logs, or processes). Snapshot and clone for a new Sandbox from a prepared state (new ID; inherits image, resources, memory, environment, disk; source keeps running). Neither is a backup: user snapshots are crash-consistent, expire, and count against account-specific quotas.
- Size to beta limits: one-hour active runtime per Sandbox; 1, 2, or 4 vCPU with 1, 2, or 4 GiB of memory per vCPU; paused time does not consume runtime. Sandboxes start from the default image unless you choose a published one with `image.custom()`. Disk sizes, resizing, and a configurable TTL are not available. A valid size can still fail for access or capacity.
- Protect credentials: code inside a Sandbox can read its environment. Fresh Sandbox Create can select existing workspace secrets by exact name, injected throughout the guest; select only what the task needs. Values printed to output or saved in files and snapshots are not automatically redacted. A clone restores captured values and cannot select new ones. At launch, users will upload an SSH public key to Inngest and connect using an address shaped like `ssh <workload-id>@ssh.inngest.com`; do not place private keys in the Sandbox.
- Sandboxes are separate VMs isolated from the host and from other Sandboxes. Egress is allowed by default; review what a task can reach over the network before running generated or untrusted code.
- Source: https://www.inngest.com/docs-markdown/sandboxes/best-practices (retrieved 2026-11-14)

## Related

- [Managed lifecycle](./managed-lifecycle.md)
- [Reference](./reference.md)
- [Limits](./limits.md)
- [Secrets](./secrets.md)
- [Isolation and security](./isolation-and-security.md)
