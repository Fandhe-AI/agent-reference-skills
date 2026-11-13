---
source: https://opencode.ai/docs/build/plugins/effect/#hooks
---

# Hooks

Hooks intercept live operations. Multiple plugins can register the same hook; OpenCode runs them in plugin order so
later hooks see earlier changes. Registrations remain active for the plugin scope.

## Signature / Usage

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const session = ctx.session
    yield* session.hook("context", () => Effect.void)
  }),
```

### Sessions

Modify assembled system instructions, messages, or tools immediately before model dispatch. `context` runs for the
agent loop; `compaction`, `generate`, and `title` run for those auxiliary requests. `compaction` and `title` accept a
`result` that skips the model call.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const session = ctx.session
    yield* session.hook("context", (event) =>
      Effect.sync(() => {
        event.system.push({ type: "text", text: "Keep the review focused on correctness." })
        delete event.tools.write
      }),
    )
    yield* session.hook("compaction", (event) =>
      Effect.map(summarize(event.messages), (summary) => {
        event.result = { summary }
      }),
    )
  }),
```

Messages in the `context`, `compaction`, and `generate` hooks carry their stored message's `metadata`, read-only
(for example, what a `prompt` hook set). It is not sent to the model.

The `system` part that holds OpenCode's instructions also lists each source in `metadata.experimental.instructions` as
`{ key, text }`, such as `core/date` or `core/environment`, so a hook can tell the sources apart. The list is a copy:
editing the part's `text` does not update it. This is experimental and may change.

Modify model request settings and optionally scope the hook to one provider. The event carries the same `kind` as
the HTTP hooks below.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const session = ctx.session
    yield* session.hook(
      "model.request",
      (event) => Effect.sync(() => (event.headers["x-plugin"] = "review")),
      { providerID: "anthropic" },
    )
  }),
```

Modify native provider requests or responses. Their bodies are one-shot streams; clone or replace a body before reading
it. Both hooks run for every request a session issues; `event.kind` is `"primary"`, `"compaction"`, `"title"`, or
`"generate"` depending on which flow issued it.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const session = ctx.session
    yield* session.hook("http.request", (event) =>
      Effect.sync(() => {
        event.request.headers.set("x-session-id", event.sessionID)
        if (event.kind === "title") event.request.headers.set("x-priority", "background")
      }),
    )
    yield* session.hook("http.response", (event) =>
      Effect.sync(() => {
        event.response = new Response(event.response.body, {
          status: event.response.status,
          headers: { ...Object.fromEntries(event.response.headers), "x-plugin": "review" },
        })
      }),
    )
  }),
```

Providers that stream over a WebSocket reuse one connection per session, so the HTTP hooks never see that traffic. The
experimental `experimental.ws.handshake` hook runs once per model call before the connection is selected and exposes the
connection `url` and `headers`; changing either reopens the socket. HTTP hooks still run for any request a WebSocket
route falls back to.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    yield* ctx.session.hook(
      "experimental.ws.handshake",
      (event) =>
        Effect.gen(function* () {
          event.headers.authorization = `Bearer ${yield* mintToken(event.url)}`
          delete event.headers["api-key"]
        }),
      { providerID: "azure" },
    )
  }),
```

`experimental.ws.send` and `experimental.ws.receive` expose the frames themselves: `send` runs after the provider
driver builds an outbound frame, `receive` runs on each inbound frame before the driver observes it. Whatever `frame`
holds when the hook returns is what crosses the wire or reaches the driver; OpenCode does not validate it.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    yield* ctx.session.hook(
      "experimental.ws.send",
      (event) =>
        Effect.sync(() => {
          const body = JSON.parse(event.frame)
          if (body.type === "response.create") body.metadata = { ...body.metadata, session: event.sessionID }
          event.frame = JSON.stringify(body)
        }),
      { providerID: "openai" },
    )
  }),
```

Override the retry decision for a provider failure or replace its delay in milliseconds. The hook runs after OpenCode
classifies the failure and proposes its policy, but before any retry is scheduled. It does not expose how OpenCode
internally performs the next attempt.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    yield* ctx.session.hook("retry", (event) =>
      Effect.sync(() => {
        if (event.error.status === 429) {
          event.decision = { retry: true, delay: 10_000 }
          return
        }
        if (event.error.type === "provider.invalid-request" && event.attempt === 2) {
          event.decision = { retry: true, delay: 0 }
          return
        }
        if (event.attempt >= 3) event.decision = { retry: false }
      }),
    )
  }),
```

The initial `decision` is OpenCode's policy, so hooks may make a normally terminal provider failure retryable or veto a
proposed retry. Multiple hooks run in registration order and later hooks see the current decision. The built-in maximum
attempt count remains a hard limit. `attempt` is the physical attempt being proposed; the initial request is attempt `1`,
so the first retry is attempt `2`. Invalid delays (`NaN`, infinity, or negative values) fall back to the computed delay.
Context-overflow recovery remains separate because it compacts the conversation instead of retrying the same request.

#### Reference

```ts
interface SessionHooks {
  readonly context: SessionContext
  readonly compaction: SessionCompaction
  readonly generate: SessionGenerate
  readonly title: SessionTitle
  readonly "model.request": SessionModelRequest
  readonly "http.request": SessionHttpRequest
  readonly "http.response": SessionHttpResponse
  readonly "experimental.ws.handshake": SessionWebSocketHandshake
  readonly "experimental.ws.send": SessionWebSocketSend
  readonly "experimental.ws.receive": SessionWebSocketReceive
  readonly retry: SessionRetry
}

type RetryDecision = { retry: false } | { retry: true; delay: number }

interface SessionRetry {
  readonly sessionID: string
  readonly agent: string
  readonly model: { providerID: string; id: string; variant?: string }
  readonly error: { type: string; message: string; status?: number }
  readonly attempt: number
  decision: RetryDecision
}

interface SessionHookDomain {
  readonly hook: ModelHooks<SessionHooks>
}
```

### Shell

Modify shell commands, working directories, timeouts, executables, or environment variables before execution.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const shell = ctx.shell
    yield* shell.hook("create.before", (event) =>
      Effect.sync(() => {
        if (event.command === "npm") event.command = "bun"
        event.timeout = Math.min(event.timeout, 60_000)
        event.env.COMPANY_ENV = "development"
      }),
    )
  }),
```

#### Reference

```ts
interface ShellCreateBefore {
  command: string
  cwd: string
  timeout: number
  shell: string
  env: Record<string, string | undefined>
}

interface ShellHooks {
  readonly "create.before": ShellCreateBefore
}

interface ShellHookDomain {
  readonly hook: Hooks<ShellHooks>
}
```

### Tools

Before hooks may replace input or fail with `Tool.Error`.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const tool = ctx.tool
    yield* tool.hook("execute.before", (event) =>
      event.tool === "write"
        ? Effect.fail(new Tool.Error({ message: "Writes are disabled" }))
        : Effect.logDebug("tool input", { tool: event.tool, input: event.input }),
    )
  }),
```

After hooks may inspect or replace successful results and failures.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const tool = ctx.tool
    yield* tool.hook("execute.after", (event) => {
      if (event.status === "error") return Effect.logWarning("tool failed", { message: event.error.message })
      return Effect.sync(() => {
        event.result = { ...event.result, metadata: { observed: true } }
      })
    })
  }),
```

#### Reference

```ts
interface ToolHooks {
  readonly "execute.before": ToolExecuteBefore
  readonly "execute.after": ToolExecuteAfter
}

interface ToolFailures extends Record<keyof ToolHooks, unknown> {
  readonly "execute.before": Tool.Error
  readonly "execute.after": never
}

interface ToolHookDomain {
  readonly hook: Hooks<ToolHooks, ToolFailures>
}
```

The shared registration types show which operations require the plugin scope.

```ts
interface Registration {
  readonly dispose: Effect.Effect<void>
}

type Hooks<Spec, Failures extends Record<keyof Spec, unknown> = Record<keyof Spec, never>> = <Name extends keyof Spec>(
  name: Name,
  callback: (input: Spec[Name]) => Effect.Effect<void, Failures[Name]>,
) => Effect.Effect<Registration, never, Scope.Scope>

type Transform<Input> = (callback: (input: Input) => void) => Effect.Effect<Registration, never, Scope.Scope>
```

## Notes

- `mintToken` is a placeholder you define. In the `experimental.ws.send` example, `JSON.parse` throws inside `Effect.sync` on a malformed frame; handle parse failures in real code.
- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect` or similar hooks.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [overview.md](./overview.md)
- [api.md](./api.md)
- [publish.md](./publish.md)
