# Sandboxes quick start

Run a command in an isolated Linux Sandbox from a durable Inngest function, return its output, and destroy the Sandbox. The run trace shows each operation.

## Signature / Usage

Install the SDK:

```bash
npm install inngest@latest
```

Add the Sandbox middleware to the shared client (`inngest/client.ts`). This makes `step.sandbox` available:

```typescript
import { Inngest } from "inngest";
import { sandboxMiddleware } from "inngest/experimental";

export const inngest = new Inngest({
  id: "sandbox-beta-demo",
  middleware: [sandboxMiddleware()],
});
```

Create a function that runs one command (`inngest/functions/run-in-sandbox.ts`):

```typescript
import { inngest } from "../client";

export const runInSandbox = inngest.createFunction(
  {
    id: "run-in-sandbox",
    triggers: { event: "sandbox/demo.requested" },
  },
  async ({ event, step }) => {
    const sandbox = await step.sandbox.create("create-sandbox", {
      name: `beta-${event.data.jobId}`,
      vcpu: 1,
      memoryMb: 1024,
    });

    const result = await sandbox.commands.run(
      "run-command",
      "printf 'hello from the sandbox\\n'; printf 'diagnostic\\n' >&2",
      {
        cwd: "/",
        timeout: "30s",
      },
    );

    await sandbox.destroy("destroy-sandbox");

    return {
      sandboxId: sandbox.id,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      outputWasTruncated: result.output.truncated,
    };
  },
);
```

Trigger it with this event:

```json
{
  "name": "sandbox/demo.requested",
  "data": {
    "jobId": "job_123"
  }
}
```

A successful run returns:

```json
{
  "sandboxId": "...",
  "stdout": "hello from the sandbox\n",
  "stderr": "diagnostic\n",
  "exitCode": 0,
  "outputWasTruncated": false
}
```

## Options / Props

### Requirements

| Requirement | Detail |
|-------------|--------|
| App | Existing server-side TypeScript Inngest app connected to an Inngest Cloud environment |
| Runtime | Node.js 20 or newer with the standard Fetch API |
| Plan | Inngest Cloud Pro or above; `403 access_denied` on Create means the plan does not include Sandboxes |
| SDK | `inngest` 4.21.1 or newer (the quick start page); Custom images need 4.25 or newer |
| Env var | `INNGEST_SIGNING_KEY` in the **server** environment; keep it out of browser code and source control |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Sandboxes require TypeScript SDK v4, including `sandboxMiddleware()`. Installing `inngest@latest` in a v3 app is a major-version upgrade; follow the v3 to v4 migration guide first.
- Keep your existing app ID when adding this to an existing app. Register `runInSandbox` in the `functions` array of your `serve()` handler.
- Use a stable job ID that is safe in a Sandbox name; use a new ID for each new run.
- The run should show the steps `create-sandbox`, `run-command`, and `destroy-sandbox`.
- Durable Sandbox steps do not automatically guarantee cleanup after a permanent function failure. Add an `onFailure` handler or a separate deferred cleanup function that receives the Sandbox ID. A JavaScript `finally` block is not a substitute.
- Destroying a Sandbox removes its filesystem, processes, and retained output; save anything needed first.
- Source: https://www.inngest.com/docs-markdown/sandboxes/quick-start (retrieved 2026-11-14)

## Related

- [Sandboxes overview](./overview.md)
- [Features overview](./features-overview.md)
- [Base images](./base-images.md)
