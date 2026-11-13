---
source: https://opencode.ai/docs/build/plugins/gui/#define-and-provide-an-ipc
---

# Define and provide an Ipc

An `Ipc` spec declares per-window `state`, callable `methods`, and pushed `events`; Effect `Schema` validates every value.

## Signature / Usage

An `Ipc` spec can declare per-window `state`, callable `methods`, and pushed `events`. Effect `Schema` validates and
encodes every value that crosses the bridge.

```ts title="src/gui/contract.ts"
import { Schema } from "effect"
import { Ipc } from "@opencode/plugin/gui"

export const Counter = Ipc.define({
  id: "acme.counter",
  state: Schema.Struct({ count: Schema.Number }),
  methods: {
    increment: {
      input: Schema.Number,
      output: Schema.Number,
    },
    reset: {},
  },
  events: {
    overflow: Schema.Struct({ limit: Schema.Number }),
  },
})
```

- The id is your plugin's id or starts with it, as `acme.counter`. `ctx.provide` in `main` and `ctx.main` in a window
  throw for any other id.
- Omit `input` for a method that takes no argument, and `output` for a method that returns nothing.

#### Reference

```ts
interface IpcSpec {
  id: string
  state?: Schema
  methods: Record<string, { input?: Schema; output?: Schema }>
  events?: Record<string, Schema>
}
```

### Implement the provider in main

Each method receives the decoded input and a `Caller` (`{ window, signal }`). Call `provider.changed(window?)` when
`state` changes to push the new snapshot to subscribed windows, or `provider.emit(name, payload, window?)` to send an
event.

```ts title="src/gui/main.ts"
import type { Plugin } from "@opencode/plugin/gui"
import { Counter } from "./contract"

export const main: Plugin.MainSetup = (ctx) => {
  const counts = new Map<number, number>()

  const provider = ctx.provide(Counter, {
    state: (window: number) => ({ count: counts.get(window) ?? 0 }),
    increment: (step, caller) => {
      const next = (counts.get(caller.window) ?? 0) + step
      counts.set(caller.window, next)
      provider.changed(caller.window)

      if (next > 100) provider.emit("overflow", { limit: 100 }, caller.window)

      return next
    },
    reset: (_input, caller) => {
      counts.set(caller.window, 0)
      provider.changed(caller.window)
    },
  })
}
```

- A spec with `state` also needs `state(window)` in the implementation. Main reads it when a window subscribes and on
  every `changed`.
- A method that throws rejects the window's call.
- `changed` and `emit` reach every window when you omit `window`.
- `dispose()` withdraws the `Ipc` early. Windows see it `pending`, and `ctx.main` calls wait, until the plugin provides
  it again or stops. The host also withdraws it when the plugin stops.

#### Reference

```ts
type IpcImpl<S extends IpcSpec> = {
  [Name in keyof S["methods"]]: (input: Input<Name>, caller: Caller) => Output<Name> | Promise<Output<Name>>
} & { state(window: number): State }

interface Caller {
  window: number
  signal: AbortSignal
}

interface IpcProvider<S extends IpcSpec> {
  changed(window?: number): void
  emit(name: keyof S["events"], data: EventData, window?: number): void
  dispose(): void
}
```

### Use the Ipc in a window

In a window, `ctx.main(Counter)` returns the client of the `Ipc` your `main` provides. A method without an `input`
schema takes only optional `{ signal }` call options. Do not pass `undefined` as its first argument.

```tsx title="src/gui/window.tsx"
import { Command, type Plugin } from "@opencode/plugin/gui"
import { Counter } from "./contract"
import type { definition } from "./definition"

export const setup: Plugin.Setup<typeof definition> = (ctx) => {
  const counter = ctx.main(Counter)

  // Follows main across restarts; removed when the plugin stops.
  counter.on("overflow", (data) => console.log(`Counter exceeded ${data.limit}`))

  ctx.add(Command, () => ({
    id: "increment",
    title: ctx.t("command.increment"),
    enabled: ctx.app.platform === "desktop",
    run: async () => {
      await counter.increment(1, { signal: ctx.signal })
      await counter.reset({ signal: ctx.signal })
    },
  }))
}
```

- A call waits while `main` starts. It rejects when `main` cannot answer: on the web, while the plugin's `main` is off
  or failed, or when the method throws. Catch the rejection where the user needs feedback.
- `state()` and `on()` follow `main` across restarts. A listener ends with the current owner, else with the plugin.
- `ctx.main` returns the same client for every call with the token.

Read this window's `state` with `client.state()`. It is `undefined` until the first snapshot arrives, and updates each
time `main` calls `changed`.

```tsx
const count = () => ctx.main(Counter).state()?.count ?? 0
```

#### Reference

```ts
type IpcClient<S extends IpcSpec> = {
  [Name in keyof S["methods"]]: S["methods"][Name] extends { input: Schema }
    ? (input: Input<Name>, options?: { signal?: AbortSignal }) => Promise<Output<Name>>
    : (options?: { signal?: AbortSignal }) => Promise<Output<Name>>
} & {
  state(): State | undefined
  on(name: keyof S["events"], listener: (data: EventData) => void): Cleanup
}
```

Define the plugin with both setups in `src/gui.tsx`: `Plugin.define({ ...definition, setup, main })`.

### Other plugins

Another plugin follows your `Ipc` with `ctx.use(Counter)`, as it follows a contract. While it is `active`, its value is
the same `IpcClient`.

```ts
const counter = ctx.use(Counter)

const count = () => {
  const live = counter()

  return live.status === "active" ? (live.value.state()?.count ?? 0) : 0
}
```

- Every `Ipc` is `inactive` on the web, where no main process runs.

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- Ipc methods are the boundary between window code and the privileged main process. `Schema` checks the shape of each value; still check paths, URLs, and commands before passing window-supplied values to shell or file system calls.

## Related

- [Contracts and tokens](./contracts-and-tokens.md)
- [Main context](./main-context.md)
- [Live dependencies and failure handling](./live-dependencies.md)
