# Sandboxes overview

Run generated code or test a project in a fully isolated microVM while a durable Inngest function coordinates the job. Sandboxes boot in under a second, can be paused and resumed, or snapshotted and cloned.

## Signature / Usage

Adapted (not in the official docs): minimal shape assembled from the quick start page (`sandboxMiddleware()` on the client, then `step.sandbox.create()` / `sandbox.destroy()` inside a function).

```typescript
import { Inngest } from "inngest";
import { sandboxMiddleware } from "inngest/experimental";

export const inngest = new Inngest({
  id: "sandbox-beta-demo",
  middleware: [sandboxMiddleware()],
});

// inside a function handler
const sandbox = await step.sandbox.create("create-sandbox", {
  name: "my-sandbox",
  vcpu: 1,
  memoryMb: 1024,
});
await sandbox.destroy("destroy-sandbox");
```

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Capabilities: boot a microVM in under a second; run code in isolation from the function's runtime; pause and continue; snapshot and clone (pause/resume continue the original Sandbox, files persist); follow sandbox activity in the run trace; run Python or TypeScript in one call (`step.sandbox.python` / `step.sandbox.typescript`); run commands like a script with `sb.$`; call your app's functions from the Sandbox as durable steps (Tools); start from your own image.
- Lifecycle depends on the API: with the low-level `step.sandbox.create()` your function calls create and destroy as durable operations and handles cleanup after permanent failure. `step.sandbox.python` and `step.sandbox.typescript` start a Sandbox, run code, and destroy it in one call.
- Example use case: an agent edits a repository and runs its tests in a Sandbox while the durable function coordinates the task.
- Sandboxes are an execution environment for work inside a run, separate from where an Inngest app's functions are hosted. Inngest branch deploys are different: they give a Git branch its own deployment preview and event data.
- Inngest CI (Inngest Labs) is built on Sandboxes: write CI pipelines in TypeScript and run each job on its own Sandbox.
- Source: https://www.inngest.com/docs-markdown/sandboxes/overview (retrieved 2026-11-14)

## Related

- [Quick start](./quick-start.md)
- [Features overview](./features-overview.md)
- [Base images](./base-images.md)
- [Pause and resume](./pause-and-resume.md)
