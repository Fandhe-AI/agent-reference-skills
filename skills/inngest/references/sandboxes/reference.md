# Sandboxes reference

The current beta API calls and constraints for creating, running, and managing Sandboxes, from both the durable `step.sandbox` surface and the direct `inngest.sandboxes` client.

## Signature / Usage

Configure the middleware to add `step.sandbox` (the direct `inngest.sandboxes` client needs no middleware):

```typescript
import { Inngest } from "inngest";
import { sandboxMiddleware } from "inngest/experimental";

export const inngest = new Inngest({
  id: "my-app",
  middleware: [sandboxMiddleware()],
});
```

Durable call shape (every `step.sandbox` operation takes a stable step ID first):

```typescript
const sandbox = await step.sandbox.create("create-sandbox", {
  name: `job-${event.data.jobId}`,
  vcpu: 1,
  memoryMb: 1024,
});

const result = await sandbox.commands.run(
  "run-tests",
  ["npm", "test"],
  { cwd: "/workspace/repo", timeout: "5m" },
);

await sandbox.destroy("destroy-sandbox");
```

Durations:

```typescript
await step.sandbox.create("build", {
  name: "build",
  vcpu: 2,
  memoryMb: 2048,
  runningTimeout: "4m30s", // compound string, v4.24.0+
});

await sandbox.commands.run("test", "npm test", { timeout: "5m" }); // ms string
await sandbox.commands.run("test", "npm test", { timeout: 90_000 }); // milliseconds
await sandbox.commands.run("test", "npm test", {
  timeout: Temporal.Duration.from({ minutes: 5 }), // Temporal.Duration
});
```

## Options / Props

### TypeScript surfaces

| Surface | Use it for | Behavior |
|---------|------------|----------|
| `step.sandbox` | Sandbox work inside an Inngest function | Each call is a durable step with a stable step ID. It memoizes the API result and applies step retry classification. |
| `inngest.sandboxes` | API routes, workers, and trusted server scripts | Calls run immediately. The caller owns retries, cancellation, and cleanup. |

### Operation index

| Task | Direct client | Durable step |
|------|---------------|--------------|
| Create, list, get | `inngest.sandboxes.create(options)`, `.list(options?)`, `.get(id)` | `step.sandbox.create(id, options)`, `.list(id, options?)`, `.get(id, sandboxId)` |
| Wait, destroy | `sandbox.waitUntilRunning(options?)`, `.destroy()` | `sandbox.waitUntilRunning(id, options?)`, `.destroy(id)` |
| Pause, resume | `sandbox.pause(options?)`, `.resume(options?)` | `sandbox.pause(id, options?)`, `.resume(id, options?)` |
| Captured command | `sandbox.commands.run(command, options?)` | `sandbox.commands.run(id, command, options?)` |
| Processes | `sandbox.processes.start/list/get`; process `getOutput/signal/wait` | The same operations with a stable step ID first |
| Snapshots | `sandbox.snapshot(options?, waitOptions?)` (`options.name` names it); `snapshots.list({ name })` filters by name; `snapshot.clone(options)`; snapshot `list/get/delete` | The same operations with a stable step ID first |
| One-call runners | Unavailable | `step.sandbox.python(id, code, options?)`, `step.sandbox.typescript(id, code, options?)` (experimental) |
| Files and live streams | `sandbox.files.upload/download`; `sandbox.logs.stream`; `process.streamOutput` | Unavailable through `step.sandbox` |

### Experimental surface

| API | Use it for |
|-----|------------|
| `step.sandbox.python`, `step.sandbox.typescript` | Create a Sandbox, run code, return a result, and destroy the Sandbox. Options: `input`, `schema.output`, `tools`, `cwd`, `timeout`, and any create option. |
| `sandbox.$`, `getCommandError`, `exitCodes` on `commands.run` | Run commands as tagged templates with `.text()`, `.lines()` and `.json()`, and read failures. |
| `tools`, `toolOptions` on `commands.run` and the runners | Let Sandbox code call your functions as durable steps. |
| `tool.step()`, `tool.group()` from `inngest/experimental` | Declare a tool with typed input and output, or a tool whose body is a group of steps. |
| `toolDefinitions(tools)` | Turn tools into `{ name, description, input_schema }` for a model API. |
| `image.inngest()`, `image.custom()` from `inngest/experimental` | Choose the image with `from`. |
| `group.sandbox(id, callback)` | Run a callback with a fresh Sandbox and destroy it afterwards. |

Stable additions: `await using` scopes a durable Sandbox to a block, and durations accept compound strings such as `"4m30s"`.

### Errors

`SandboxError` exposes `action`, `code`, `ambiguous`, `retryable`, `requestId`, and relevant resource IDs. Branch on these fields rather than message text. `operation_ambiguous` means an operation might have completed without a confirmed response; reconcile by action:

- `exec`: inspect the command's external effects or a completion marker.
- `process.start`: list processes and compare command and start time.
- `process.signal`: get or wait for the process before sending another signal.
- `snapshot.create`: list recent snapshots before creating another.

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open beta: Sandboxes are available on Pro plans and above. The TypeScript and REST contracts can change without a compatibility period.
- Prerequisites: a trusted server-side Node.js 20+ runtime with the standard Fetch API and `inngest@4.21.1` or newer (4.21.1 includes fixes for snapshot and list response validation). Use an Inngest Cloud account on Pro or above and set `INNGEST_SIGNING_KEY`; a `403 access_denied` response means the plan does not include Sandboxes. Keep the signing key and Sandbox client out of browser code.
- New Sandboxes use the default image unless you choose another. Fresh Sandboxes accept 1, 2, or 4 vCPU with 1, 2, or 4 GiB of memory per vCPU (for example `2 / 2048`, `2 / 4096`, or `2 / 8192`). A clone inherits its snapshot's image and resources.
- Use a stable job-derived name. A matching active name and configuration returns the existing Sandbox; a conflicting configuration returns `sandbox_name_taken`. Completed calls replay from memoized step results; step memoization does not preserve guest processes or files after the Sandbox ends. Keep step IDs stable across replays and deployments.
- Lifecycle: `PENDING → STARTING → RUNNING → PAUSING → PAUSED → RESUMING → RUNNING` is the normal pause path. Destroy moves a Sandbox through `TERMINATING` to `TERMINATED`. A Sandbox can also enter `FAILED`. Commands, files, logs, and process operations require `RUNNING`. Create waits for `RUNNING` by default, up to 120 seconds; set `runningTimeout: false` to get the ID immediately, then call `waitUntilRunning` separately. A readiness timeout stops the wait; it does not cancel Create or destroy the Sandbox. SDK objects show the state observed by that request; Get or a lifecycle call returns a new object.
- Pause and Resume keep the same Sandbox ID, filesystem, memory, environment, and remaining runtime. The beta allows one hour of active runtime per Sandbox; paused time does not consume it. The runtime timeout requests an automatic Pause. Pause can interrupt external connections. There is no in-place restore from a user snapshot.
- `commands.run` waits for one command and returns `stdout`, `stderr`, `exitCode`, and output-truncation metadata. A nonzero exit code is a result, not an SDK exception, unless you pass `exitCodes`. A string command runs through `/bin/sh -c`; an argv array preserves argument boundaries. The observation timeout defaults to 30 seconds and caps at five minutes.
- `processes.start` starts a background process with a public UUID; use `list`, `get`, `getOutput`, `signal`, and `wait`. Wait observes the process; its timeout does not stop it. Retained output is bounded, and live streams can miss or replay chunks.
- The direct client uploads or downloads one complete regular file at an absolute path, up to 100 MiB. Upload replaces the file. There is no directory-list, append, rename, or recursive-transfer API. Files persist across Pause and Resume but end when the Sandbox is destroyed.
- Fresh Sandbox Create can select existing workspace secrets with `secrets: ["SECRET_NAME"]`; the SDK and REST API send names. Snapshot clones restore captured values and cannot select new secrets.
- `sandbox.snapshot()` captures memory, disk, environment, image, and resources while the source keeps running. The SDK waits for `READY` by default, up to five minutes; a timeout stops polling, but snapshot creation may continue. `snapshot.clone()` creates a new Sandbox ID from a READY snapshot, inheriting resources, filesystem, memory, and environment. Snapshots are crash-consistent and expire at a server-defined time; flush application state first. A private Pause checkpoint serves only Resume of the same Sandbox; it is not a user snapshot and cannot be cloned.
- Durations: every Sandbox duration option (`runningTimeout`, command and process `timeout`, snapshot and wait timeouts, `toolOptions`) takes a number (milliseconds), an `ms` string such as `"30s"` or `"2h"`, several joined (`"4m30s"`, `"1h 30m"`; every part needs a unit), or a `Temporal.Duration` (without calendar years, months, or weeks). The result must be a positive whole number of milliseconds within the limit for that option.
- The direct client never retries an operation automatically. Durable middleware maps retryable failures to retriable step errors and invalid or unsafe failures to non-retriable errors. Captured-command timeout and output-limit errors may also mean the command ran. Create, Destroy, Pause, Resume, snapshot Delete, and identical file upload are safe to repeat after an unconfirmed availability failure under the beta contract. Let unexpected durable step errors escape unless the function has a deliberate reconciliation path.
- The caller owns cleanup in this beta: use `finally` for direct calls; destroy the Sandbox on a function's successful path and use an `onFailure` cleanup path when permanent failure must release it.
- Source: https://www.inngest.com/docs-markdown/sandboxes/reference (retrieved 2026-11-14)

## Related

- [Limits](./limits.md)
- [Managed lifecycle](./managed-lifecycle.md)
- [Commands](./commands.md)
- [Tools](./tools.md)
- [Secrets](./secrets.md)
- [Best practices](./best-practices.md)
