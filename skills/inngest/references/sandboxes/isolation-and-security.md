# Isolation and security

Run generated code in a separate Linux microVM with its own files, processes, and network identity, so that code cannot share your function's process. When called through `step.sandbox`, Inngest records the operation beside the function steps.

## Signature / Usage

Adapted (not in the official docs): the page has no code; this snippet is built only from the page's statement that Create can select existing workspace secrets by exact name, and that the client runs in trusted server code with `INNGEST_SIGNING_KEY` kept on the server. The `create` call shape is taken from the Secrets page.

```typescript
// Server-side only: INNGEST_SIGNING_KEY must never reach browser code.
const sandbox = await step.sandbox.create("create-sandbox", {
  name: `agent-${event.data.jobId}`,
  vcpu: 1,
  memoryMb: 1024,
  secrets: ["OPENAI_API_KEY"],
});
```

## Options / Props

What belongs to one Sandbox:

| Resource | What a Sandbox contains |
|----------|-------------------------|
| Files and processes | A Sandbox has its own filesystem and running processes. Destroying it removes the live filesystem, processes, and retained process output. |
| Environment | Sandbox-level environment values apply to commands and processes unless those operations override them. Code inside the Sandbox can read those values. |
| Compute | A Sandbox has its own CPU and memory allocation. The beta offers a fixed menu of supported sizes. |
| Network | A Sandbox has a network identity. The beta creates it in the workspace's default egress-only VPC. The beta API does not expose public ingress or custom VPC selection. |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- The page describes the current open beta and the planned launch capabilities separately. The beta is for evaluation, not production workloads or data you cannot recreate.
- Confirmed for launch: each Sandbox runs as a separate VM with complete isolation from the host and other Sandboxes; Sandboxes cannot send traffic to one another. Outbound network access is allowed by default.
- Create and control Sandboxes from trusted server-side code. The TypeScript client and REST API use an Inngest signing key; keep `INNGEST_SIGNING_KEY` on the server and do not put the Sandbox client or signing key in browser code.
- The beta can select existing workspace secrets by exact name when it creates a fresh Sandbox; each value is injected as a guest environment variable with that name. Code anywhere in the Sandbox can read selected values. The API sends names rather than values, but output, files, and snapshots are not automatically redacted. A clone restores secret values captured in its snapshot and cannot select new secrets. Rotation does not revoke values already delivered to a running or paused Sandbox.
- Treat any outbound access available to the Sandbox as access that code inside it can use. Validate untrusted URLs before passing them to tools such as Git.
- Planned for launch: SSH access using public keys uploaded to Inngest and a Sandbox SSH address; the current beta docs do not define an SSH connection contract. S3-backed persistent filesystem mounts will let separate Sandboxes share a backing path (a clone with such a mount shares that path).
- A beta snapshot captures memory, disk, environment, image, and resources; the source keeps running. Cloning creates a new Sandbox with a new ID. Pause and Resume keep the same Sandbox ID and restore filesystem, memory, environment, resources, and network identity. Review files and environment before taking a snapshot; a clone receives the captured state, including data in memory or on disk. Snapshots expire at a server-defined time and are not permanent storage.
- Sandboxes run code in isolated microVMs; branch deploys provide deployment environments for testing changes to Inngest apps.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/isolation-and-security (retrieved 2026-11-14)

## Related

- [Secrets](./secrets.md)
- [Managed lifecycle](./managed-lifecycle.md)
- [Limits](./limits.md)
- [Best practices](./best-practices.md)
