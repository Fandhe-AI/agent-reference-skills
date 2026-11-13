---
source: https://opencode.ai/docs/build/plugins/gui/#host-apis
---

# Host APIs

Host APIs are properties of `ctx`; none throw before the app interface mounts.

## Signature / Usage

Host APIs are properties of `ctx`. None of them throw before the app interface mounts: reads return their documented
defaults, and early writes, such as `ctx.layout.open`, `ctx.dialogs.open`, and store updates, wait and apply in call
order once the first route renders.

```ts
ctx.add(Command, () => ({
  id: "copy-directory",
  title: ctx.t("command.copyDirectory"),
  run: () => {
    const session = ctx.sessions.current()

    if (session) void ctx.system.copy(session.directory)
  },
}))
```

The sections below cover each API. `ctx.options`, `ctx.client`, and `ctx.app` are the
[shared context](./shared-context.md), `ctx.provide`, `ctx.use`, and `ctx.main` work with
[contracts and tokens](./contracts-and-tokens.md), and `ctx.stores` holds the stores the plugin
[declares](./define-plugin.md).

#### Reference

```ts
interface SetupContext<D> extends Context {
  stores: Record<string, Persisted<unknown> | ((session: SessionRef) => Persisted<unknown>)>
}

interface Context {
  id: string
  options: PluginOptions
  client: OpenCodeClient
  app: App
  signal: AbortSignal
  add<T>(registry: Registry<T>, item: () => T | undefined): Cleanup
  add<T>(registry: Registry<T>, item: T): Cleanup
  list<T>(registry: Registry<T>): T[]
  provide<T>(token: Contract<T>, impl: T): Cleanup
  use<T>(token: Contract<T>): () => Live<T>
  use<S extends IpcSpec>(token: Ipc<S>): () => Live<IpcClient<S>>
  main<S extends IpcSpec>(token: Ipc<S>): IpcClient<S>
  t(key: string, params?: Record<string, string | number | boolean>): string
  plural(key: string, count: number, params?: Record<string, string | number | boolean>): string
  layout: Layout
  sessions: Sessions
  screen: Screen
  servers: Servers
  storage: Storage
  dialogs: Dialogs
  toast: Toasts
  attention: Attention
  tabs: Tabs
  keybinds: Keybinds
  commands: Commands
  links: Links
  embeds: Embeds
  ui: Ui
  system: System
  desktop: Desktop | undefined
  locale: Locale
  appearance: Appearance
  router: Router
  workspaces: Workspaces
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Layout](./layout.md)
- [Sessions and the session screen](./sessions-screen.md)
- [Dialogs](./dialogs.md)
- [System and environment](./system-environment.md)
