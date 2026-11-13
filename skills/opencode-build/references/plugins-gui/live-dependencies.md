---
source: https://opencode.ai/docs/build/plugins/gui/#live-dependencies-and-failure-handling
---

# Live dependencies and failure handling

`ctx.use(token)` returns an accessor of a reactive `Live<T>`: the state of the plugin that provides the token.

## Signature / Usage

`ctx.use(token)` returns an accessor of a reactive `Live<T>`: the state of the plugin that provides the token. Your
plugin keeps running while that provider is off, so handle the states that are not `active`. No control should be dead,
and no spinner should run forever.

```ts
import { Browser } from "@opencode/plugin/gui/browser"

const browser = ctx.use(Browser)

ctx.add(Command, () => {
  const live = browser()
  const session = ctx.sessions.current()

  return {
    id: "preview",
    title: ctx.t("command.preview"),
    enabled: live.status === "active" && !!session,
    run: () => {
      if (live.status === "active" && session) live.value.open(session, "http://localhost:3000")
    },
  }
})
```

- **`pending`:** the provider has not started yet, for example while its plugin loads or restarts. Show a loading
  state, or hide optional controls.
- **`active`:** the provider runs, and `value` is its contract or `Ipc` client. `generation` counts activations, so a
  provider that restarts comes back with a new one.
- **`inactive`, `disabled`:** the provider is turned off, absent, or not available on this platform, as every
  `Ipc` is on the web. Show an unavailable state, or omit the control.
- **`inactive`, `failed`:** the provider's setup threw an error. Show an unavailable state.
- Your own `main` has no `Live` state. Calls through [`ctx.main`](./ipc.md) wait while it starts, and
  reject when it cannot answer.

#### Reference

```ts
type Live<T> =
  | { status: "pending" }
  | { status: "active"; value: T; generation: number }
  | { status: "inactive"; reason: "disabled" | "failed" }
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Contracts and tokens](./contracts-and-tokens.md)
- [createKeyed](./reactive-primitives.md)
