# Traces

Find failed or slow Sandbox operations alongside the other steps in a function run. Each `step.sandbox` call is a durable step: Inngest records its result for replay and applies that operation's retry classification.

## Signature / Usage

Requires `sandboxMiddleware()`, an account on Pro or above, and `INNGEST_SIGNING_KEY`.

```typescript
const sandbox = await step.sandbox.create("create-sandbox", {
  name: `trace-${event.data.jobId}`,
  vcpu: 1,
  memoryMb: 1024,
});

const result = await sandbox.commands.run(
  "run-command",
  "printf 'hello from the sandbox\\n'",
  { timeout: "30s" },
);

await sandbox.destroy("destroy-sandbox");

return {
  sandboxId: sandbox.id,
  exitCode: result.exitCode,
  stdout: result.stdout,
};
```

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- Open the function run in the Inngest dashboard or Dev Server; select a step to inspect its timing, input, output, error details, and retry attempts.
- Each command is one row, tagged `[$]` and named after the command it ran. Sandbox operations such as creating or destroying show as plain names, like "Create sandbox". A command row's Metadata tab shows the command, exit code, and Sandbox. With `commands.run`, a nonzero exit code is a result, so the step still completes; a `$` command fails its step on one unless `exitCodes` allows it.
- Give each Sandbox operation a stable, descriptive step ID (for example `create-sandbox`, `run-command`, `destroy-sandbox`). A retry appears as another attempt for that step. Completed steps return their recorded results when the function replays.
- Each step carries `inngest.sandbox` metadata naming the action and the machine, command, process, or snapshot involved. A snapshot shows as one group, "Create snapshot" and "Wait for snapshot". `group.sandbox()`, `step.sandbox.python`, and `step.sandbox.typescript` show the Sandbox's whole lifetime as one group (create, run, destroy inside). Each tool call is its own step.
- A trace records the durable API operations. It does not make the Sandbox guest process, filesystem, or output durable.
- The example destroys the Sandbox on the successful path. For a function that can fail permanently, add an `onFailure` cleanup strategy; a JavaScript `finally` block around durable steps does not guarantee cleanup after permanent failure or cancellation.
- `inngest.sandboxes` makes immediate server-side requests: it does not memoize each operation as a step or add a step to the run trace. Use `step.sandbox` when the operation belongs to a durable function run; use the direct client for immediate calls, live streams, or file transfer.
- Protect trace data: environment values you pass to `step.sandbox` calls (`create`, `commands.run`, `processes.start`) are not recorded; the trace keeps only the variable names. Command strings, captured output, and returned values are recorded as they are, so keep credentials out of them. Selected workspace secrets are not automatically redacted from command output or files.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/traces (retrieved 2026-11-14)

## Related

- [Managed lifecycle](./managed-lifecycle.md)
- [Commands](./commands.md)
- [Secrets](./secrets.md)
- [Tools](./tools.md)
