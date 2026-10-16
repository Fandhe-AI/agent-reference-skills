# Checkpointing

Checkpointing is a performance optimization that executes steps eagerly on your server rather than waiting on internal orchestration, giving much lower inter-step latency (suited to real-time AI workflows).

## Signature / Usage

```ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "my-app",
  checkpointing: {
    maxRuntime: "50s", // slightly below the platform's max duration (e.g. 60s)
  },
});
```

All options (`maxRuntime`, `bufferedSteps`, `maxInterval`):

```ts
checkpointing: {
  maxRuntime: '300s',
  bufferedSteps: 2,
  maxInterval: "10s",
}
```

Disable for all functions, or per function:

```ts
new Inngest({ id: "my-app", checkpointing: false });

inngest.createFunction(
  { id: "my-function", checkpointing: false },
  async ({ step }) => {
    // steps here will use standard orchestration
  }
);
```

Go:

```go
inngestgo.FunctionOpts{
	ID:         "my-function",
	Checkpoint: checkpoint.ConfigSafe,
}
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `maxRuntime` | `0` (unlimited) | Maximum time the function continuously executes and checkpoints steps before returning the request response. Set slightly below the platform's request timeout (e.g. `800s` for a `900s` limit). |
| `bufferedSteps` | `1` (no buffering) | Number of steps buffered together before checkpointing. Buffered steps not yet checkpointed may be lost if the server is not gracefully terminated. |
| `maxInterval` | — | Maximum interval to wait before checkpointing even if `bufferedSteps` is not reached. |

## Notes

- Requirements: TypeScript SDK `3.51.0` or higher (enabled by default in v4); Go SDK `v0.15.0`.
- In TypeScript SDK v4 checkpointing is enabled by default. Configure it only to customize options or disable it.
- On serverless platforms (e.g. Vercel) set `maxRuntime` slightly below the function's maximum duration.
- Go: `go get github.com/inngest/inngestgo/pkg/checkpoint`, then set `Checkpoint` on function options. Setting `Checkpoint` on `ClientOpts` (e.g. `&checkpoint.Config{MaxRuntime: 50 * time.Second}`) applies to every function; a function's own `Checkpoint` overrides it.
- If a step fails and needs to retry, execution falls back to standard orchestration.
- Parallel steps switch execution to standard orchestration; the SDK usually switches back afterwards. With the deprecated `optimizeParallelism: false`, checkpointing does not resume after parallel execution.
- Supported on local development, self-hosted Inngest, and Inngest Cloud.

## Related

- [durable-execution](./durable-execution.md)
- [retries](./retries.md)
- [timeouts](./timeouts.md)
