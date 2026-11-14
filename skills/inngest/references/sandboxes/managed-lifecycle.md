# Managed lifecycle

Coordinate Sandbox creation, commands, and cleanup as durable steps in a function run. Inngest records each operation's result, so a resumed function can continue after completed steps.

## Signature / Usage

```typescript
import { Inngest } from "inngest";
import { sandboxMiddleware } from "inngest/experimental";

const inngest = new Inngest({
  id: "sandbox-lifecycle",
  middleware: [sandboxMiddleware()],
});

export const runInSandbox = inngest.createFunction(
  {
    id: "run-in-sandbox",
    triggers: { event: "sandbox/job.requested" },
  },
  async ({ event, step }) => {
    const sandbox = await step.sandbox.create("create-sandbox", {
      name: `job-${event.data.jobId}`,
      vcpu: 1,
      memoryMb: 1024,
      runningTimeout: "60s",
    });

    const result = await sandbox.commands.run(
      "run-command",
      ["node", "-e", "console.log('done')"],
      { timeout: "30s" },
    );

    await sandbox.destroy("destroy-sandbox");

    return { exitCode: result.exitCode, stdout: result.stdout };
  },
);
```

Run Python or TypeScript in one call (experimental):

```typescript
const stats = await step.sandbox.python(
  "stats",
  `import statistics
return {"mean": statistics.mean(values)}`,
  {
    input: { values: [1, 2, 3, 4] },
    schema: { output: z.object({ mean: z.number() }) },
  },
);

const total = await step.sandbox.typescript(
  "sum",
  `return numbers.reduce((a: number, b: number) => a + b, 0)`,
  { input: { numbers: [1, 2, 3] } },
);
```

Scope a Sandbox to a block with `await using`, which destroys the Sandbox when the block exits:

```typescript
await using sb = await step.sandbox.create("build", {
  name: "build",
  vcpu: 2,
  memoryMb: 2048,
});
await sb.commands.run("test", "npm test");
```

`group.sandbox()` (experimental) runs a callback with a fresh Sandbox and destroys it afterwards:

```typescript
await group.sandbox("build", async (sb) => {
  await sb.commands.run("test", "npm test");
});
```

## Options / Props

| API | What Inngest handles | What you handle |
|-----|----------------------|-----------------|
| `step.sandbox.create()` and other low-level steps | Durable operation results, safe retries, readiness polling by default, and step failures | When to pause, resume, snapshot, clone, and destroy the Sandbox; cleanup after permanent failure |
| `inngest.sandboxes` | Immediate Sandbox requests and bounded readiness polling | Retries, cancellation, and cleanup in your server process |
| `step.sandbox.python` and `step.sandbox.typescript` (experimental) | Creates a Sandbox, runs your code, returns the result, and destroys the Sandbox in one call | Nothing to clean up; pass `input`, `schema`, and `tools` |

### One-call runners

- `schema.output` types the result and fails the step, with the schema's issues, when the result does not match.
- A non-zero exit fails the step with the error output.
- A top-level `return` gives the result back. Each key of `input` becomes a variable. Code can be indented to match your source. Top-level `await` works in TypeScript, which needs Node 22.13 or later in the image.
- The first argument is a step ID or step options, such as `{ id: "stats", name: "Compute the mean" }`.
- Pass `tools` to let the code call your functions, plus any `step.sandbox.create()` option such as `image` or `secrets`.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta: Sandboxes are available on Pro plans and above. The low-level TypeScript API follows the Sandbox beta; the `step.sandbox.python` / `step.sandbox.typescript` runners and `group.sandbox()` are experimental.
- Use a stable, Sandbox-safe job ID in the event. A completed step replays its result, including the Sandbox object returned by Create, which avoids creating another Sandbox on resume. It does not keep the guest process or filesystem alive if the Sandbox itself is lost.
- Create waits for `RUNNING` by default. If readiness times out, the Sandbox may still exist. When cleanup needs an ID even if readiness fails, create with `runningTimeout: false`, then call `sandbox.waitUntilRunning("wait-for-sandbox", { timeout: "60s" })` as a separate step.
- Clean up after failure: the example's Destroy step runs only if execution reaches it. After all retries fail, use an `onFailure` handler or a separate cleanup function that can retrieve the Sandbox ID (store the ID somewhere the handler can read it after Create). A JavaScript `finally` block in the main function does not replace this cleanup path. For immediate calls through `inngest.sandboxes`, use `try/finally` and call `sandbox?.destroy()`; the direct client has no durable step replay.
- Destroy removes the Sandbox filesystem, processes, and retained process output. Persist artifacts outside the Sandbox first. Destroy may first return `TERMINATING`.
- Pause releases the live runtime into a private checkpoint; Resume returns the same Sandbox ID with its filesystem, memory, and remaining runtime. The current beta allows one hour of active runtime per Sandbox; paused time does not consume it. Use the returned running Sandbox before another command, file, log, or process call.
- A user snapshot keeps a copy of memory, disk, environment, image, and resource settings while the source keeps running. Clone creates a new Sandbox ID from a ready snapshot. A wait timeout does not cancel the snapshot being created. S3-backed persistent filesystem mounts can share a backing path across Sandboxes, including clones.
- Let unexpected `step.sandbox` errors escape the function. An `operation_ambiguous` error means a command, process start, or signal may have happened without a confirmed response; inspect the Sandbox or the operation's external effect before repeating it. Inspect current state with Get when work resumes after a long wait.
- `group.sandbox()`: the Sandbox's whole lifetime shows as one group in the trace. It is destroyed when the callback ends, even when it throws, so a failure after that is final and is not retried. `group` comes from the function's arguments next to `step`: `async ({ event, step, group }) => {}`. `group.sandbox()` uses 2 vCPU and 2048 MiB when you pass only an ID; `step.sandbox.create()` needs `name`, `vcpu`, and `memoryMb`.
- Durations such as `runningTimeout` and `timeout` accept compound strings like `"4m30s"`.
- Deployment preview environments are called branch deploys, not Sandboxes.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/managed-lifecycle (retrieved 2026-11-14)

## Related

- [Commands](./commands.md)
- [Tools](./tools.md)
- [Traces](./traces.md)
- [Secrets](./secrets.md)
- [Reference](./reference.md)
- [Best practices](./best-practices.md)
