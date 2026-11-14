# Commands

Run a command in a Sandbox as one durable step, then read its output as text, lines, or JSON. Every Sandbox has a `$` tagged template; each interpolated value is one argument, so there is no quoting to get wrong.

## Signature / Usage

```typescript
await group.sandbox("build", async (sb) => {
  await sb.$`git clone --depth 1 ${repoUrl} /work`;

  const sha = await sb.$({ cwd: "/work" })`git rev-parse HEAD`.text();

  await sb.$({ cwd: "/work", timeout: "20m" }).sh`pnpm install && pnpm test`;
});
```

Use a shell (`$.sh` runs the script with `/bin/sh -c`; interpolated values are quoted for you):

```typescript
await sb.$.sh`ls ${dir} | wc -l`;      // quoted for you
await sb.$.sh`ls "${dir}"`;            // throws: no values inside quotes or after a backslash
```

Read the output:

```typescript
const sha = await sb.$`git rev-parse HEAD`.text();       // trimmed stdout
const files = await sb.$`git ls-files`.lines();          // string[], [] when empty
const pkg = await sb.$`cat package.json`.json<{ name: string }>();   // parsed stdout
const { stdout, stderr, exitCode } = await sb.$`node -v`;
```

Set options:

```typescript
const work$ = sb.$({
  cwd: "/work",
  env: { NODE_ENV: "test", API_TOKEN: token },
  timeout: "10m",
  exitCodes: [0, 1],
});

await work$`pnpm lint`;
await work$.sh`pnpm test | tee out.log`;

await sb.$({ id: "install" }).sh`pnpm install`;
```

Handle failures:

```typescript
import { getCommandError } from "inngest/experimental";

try {
  await sb.$`pnpm test`;
} catch (error) {
  const failure = getCommandError(error);

  if (failure) {
    console.log(failure.type);        // "failed" or "timeout"
    console.log(failure.exitCode);    // 1 (not set for a timeout)
    console.log(failure.stderrTail);  // last 8 KiB of stderr
  }

  throw error;
}
```

Long-running commands:

```typescript
await sb.$({ timeout: "45m" }).sh`pnpm test:e2e`;
```

Keep secrets out of the trace:

```typescript
await sb.$({ env: { NPM_TOKEN: token } }).sh`pnpm publish`;   // token stays out of the trace
await sb.$`npm login --token ${token}`;                       // token is in the command text
```

## Options / Props

`$({ ... })` options:

| Option | Does |
|--------|------|
| `cwd` | The working directory. |
| `env` | Environment for this command, over the Sandbox's. Values are kept out of the trace. |
| `timeout` | How long it may run. Defaults to `5m`. Takes any duration. |
| `exitCodes` | The exit codes that are not failures. Defaults to `[0]`; `"any"` allows all. |
| `id` | The step ID for commands run by that `$({ id })`; later `$()` calls do not inherit it. Defaults to the command text; repeats are numbered. |

`getCommandError(error)` returns a plain object, or `undefined` for any other error:

| Field | Value |
|-------|-------|
| `type` | `"failed"` for a disallowed exit or a process that ended without one, or `"timeout"` for a command stopped at its timeout. |
| `message` | The error message. |
| `command` | The command text. |
| `exitCode` | The exit code, when it exited. |
| `stdoutTail`, `stderrTail` | The last 8 KiB of each stream. Both are empty when a command with a timeout of 5m or less times out. |

## Notes

- Sandboxes are experimental (imported from `inngest/experimental`; TypeScript SDK 4.25.0+).
- `getCommandError` is exported from `inngest/experimental`, and `group.sandbox` is experimental; the API can change.
- The text splits on whitespace and each `${value}` is exactly one argument, so a URL with spaces or quotes can't change the command. The first word is looked up on the Sandbox's `PATH`.
- `$({ ... })` returns a `$` with those options set; use it once or keep it. A configured `$` can be reused, and calling it again merges: `work$({ cwd: "/other" })` keeps `env` and `exitCodes`.
- Pipes, `&&`, redirects, and shell builtins need a shell, so use `$.sh`. In `$` and `$.sh`, arrays spread into several arguments (`` $`rm ${files}` ``), and `null`, `undefined`, and `false` are dropped (`` $`npm test ${verbose && "--verbose"}` ``).
- Awaiting the result directly gives `{ stdout, stderr, exitCode, output }`. `.json()` throws a `NonRetriableError`, naming the command, when the output is not JSON.
- `commands.run` takes `exitCodes` too, but defaults to `"any"`, so there the exit code comes back as data. `exitCodes` can't be combined with `tools` on `commands.run` (this page's source; the 4.26.2 release notes say `exitCodes` works with tools and shims, see Tools).
- A command that exits with a code not in `exitCodes` fails its step and is not retried. A program that isn't found also fails the step. The error reaches your handler as a `StepError` (a `NonRetriableError` for a timeout of 5m or less), so check it with `getCommandError`, not `instanceof`. To treat an exit as success, allow it with `exitCodes`.
- A timeout over five minutes runs the command as a process that the steps follow, with one wait step per five minutes; it is still one `[$]` row in the trace. Output is the last 512 KiB. Each wait counts against the run's step limit. The `timeout` does not extend the Sandbox's one hour of active runtime. A command that times out is killed and fails with `type: "timeout"`.
- Each command is one trace row tagged `[$]` and named after the command. `env` values are redacted from the trace, but the command text and step ID are not; pass secrets in `env` rather than interpolating them into the command.
- `group` comes from the function's arguments. `$` is also on the Sandbox from `step.sandbox.create()`.
- The `sb.$` / `sb.$.sh` helper, `exitCodes`, and `getCommandError(err)` are covered by this page's source. Command shims (`tool.shim()`) are described in the Tools page.
- Source: https://www.inngest.com/docs-markdown/sandboxes/features/commands (retrieved 2026-11-14)

## Related

- [Tools](./tools.md)
- [Managed lifecycle](./managed-lifecycle.md)
- [Secrets](./secrets.md)
- [Traces](./traces.md)
- [Limits](./limits.md)
- [Reference](./reference.md)
