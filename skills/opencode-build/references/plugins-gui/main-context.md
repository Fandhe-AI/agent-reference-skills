---
source: https://opencode.ai/docs/build/plugins/gui/#main-context
---

# Main context

`main` receives a `MainContext`; unlike the window `setup`, `main` may be `async`.

## Signature / Usage

`main` receives a `MainContext`. Unlike the window `setup`, `main` may be `async`, and it may return, or resolve to, a
cleanup function.

```ts
main(ctx) {
  ctx.log.write("info", "acme started", { version: ctx.app.version })
}
```

- `ctx.options`, `ctx.client`, and `ctx.app` are the [shared context](./shared-context.md). In `main`,
  `ctx.app.platform` is always `"desktop"`.
- `ctx.storage.store(key, { schema, initial })` opens a store synchronously in the plugin's namespace. Its `value` is
  always defined, and each `set` or `update` reaches the database before it returns. `ctx.storage.remove(key)` deletes
  the value.
- `ctx.signal` aborts when the plugin is disabled, reloaded, or removed, or the app quits. `ctx.onCleanup(fn)` runs `fn`
  then; see [Lifetimes and cleanup](./lifetimes.md).
- `ctx.provide` implements an `Ipc` under the plugin's id; see [Define and provide an Ipc](./ipc.md).
- `ctx.add` contributes to main-process registries such as [`MenubarItem`](./menubar-item.md).
- `ctx.windows` lists the app's windows and reports when one opens or closes.
- `ctx.embeds` places a `WebContentsView` in a window's layout; see [Embedded web views](./embeds.md).
- `ctx.serverEndpoints.get(id)` returns a server's URL and credentials. The desktop app's own server is `"sidecar"`.
- `ctx.cli` describes the OpenCode CLI the desktop app runs.
- `ctx.log.write` writes to the desktop log file.

#### Reference

`@opencode/plugin/gui/main` exports `MainStorage` and `MainEmbeds` below as `Storage` and `Embeds`.

```ts
interface MainContext {
  id: string
  options: PluginOptions
  client: OpenCodeClient
  app: App
  signal: AbortSignal
  onCleanup(fn: Cleanup): void
  storage: MainStorage
  provide<S extends IpcSpec>(token: Ipc<S>, impl: IpcImpl<S>): IpcProvider<S>
  add<T>(registry: Registry<T>, item: () => T | undefined): Cleanup
  add<T>(registry: Registry<T>, item: T): Cleanup
  list<T>(registry: Registry<T>): T[]
  t(key: string, params?: Record<string, string | number | boolean>): string
  plural(key: string, count: number, params?: Record<string, string | number | boolean>): string
  windows: Windows
  embeds: MainEmbeds
  serverEndpoints: { get(id: string): ServerEndpoint | undefined }
  cli: { version: string; command: string[]; binary?: string; development: boolean }
  log: { write(level: "debug" | "info" | "warn" | "error", message: string, data?: Record<string, unknown>): void }
}

interface MainStorage {
  store(key: string, options: { schema: Schema; initial: T }): Persisted<T, T>
  remove(key: string): void
}

interface Windows {
  get(id: number): BrowserWindow | undefined
  list(): BrowserWindow[]
  focused(): BrowserWindow | undefined
  on(event: "open" | "close", handler: (window: BrowserWindow) => void): Cleanup
}

interface ServerEndpoint {
  id: string
  url: string
  headers: Record<string, string>
  sameMachine: boolean
  password?: string
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- `ctx.serverEndpoints.get(id)` returns server URLs and credentials; do not log them, show them in the UI, or send them to a window or embed.

## Related

- [The main process](./main-process.md)
- [Shared context](./shared-context.md)
- [Stored state](./stored-state.md)
