# Sandboxes guides

Run isolated code, preserve work across lifecycle changes, and inspect failures in one durable run. This page is an index of the Sandbox guides: start, keep or branch work, access and inspect, and recover and clean up.

## Signature / Usage

Adapted (not in the official docs): the page has no code; this snippet is built only from the page's statements that direct `inngest.sandboxes` calls need application cleanup such as `try/finally`. The `create` and `destroy` call shapes are taken from the Managed lifecycle and Reference pages.

```typescript
const sandbox = await inngest.sandboxes.create({
  name: `job-${jobId}`,
  vcpu: 1,
  memoryMb: 1024,
});

try {
  // ... run commands
} finally {
  await sandbox.destroy();
}
```

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta: Sandboxes are available on Pro plans and above. The current TypeScript APIs support Sandbox creation, commands, and cleanup. You can select existing workspace secrets when you create a Sandbox. SSH and S3-backed persistent mounts are planned for launch.
- Start and run: create a Sandbox in a durable TypeScript function, run one command, inspect its result, and destroy it (quick start). Use Managed lifecycle for `step.sandbox` inside a function. The immediate `inngest.sandboxes` client supports command inputs, captured output, and timeouts. `step.sandbox.python` and `step.sandbox.typescript` start a Sandbox, run code, and clean up in one call; Tools let that code call your functions. File upload and download, background processes, retained output, and live output are supported; file transfer and live streams currently use the direct server-side client.
- Keep or branch your work: Pause and resume (same Sandbox with its filesystem, memory, and Sandbox ID); create a snapshot and clone it (cloning does not replace the original); share files across Sandboxes with an S3-backed persistent mount (a clone attaches the same backing path).
- Access and inspect: SSH is planned for launch and will use an uploaded public key and Sandbox address. Select existing workspace secrets by exact name when creating a fresh Sandbox (code throughout that Sandbox can read the injected values; output is not automatically redacted). Inspect Sandbox steps in a trace to find the operation, result, error, and retry attempt.
- Recover and clean up: Managed lifecycle explains safe step retries and `operation_ambiguous`; inspect the current Sandbox or external effect before repeating a command that may already have run. The beta `step.sandbox.create()` flow needs an explicit Destroy step and a failure cleanup path when a permanently failed run could leave a Sandbox. Direct `inngest.sandboxes` calls need application cleanup, such as `try/finally`.
- Source: https://www.inngest.com/docs-markdown/sandboxes/guides (retrieved 2026-11-14)

## Related

- [Managed lifecycle](./managed-lifecycle.md)
- [Tools](./tools.md)
- [Secrets](./secrets.md)
- [Traces](./traces.md)
- [Reference](./reference.md)
- [Best practices](./best-practices.md)
