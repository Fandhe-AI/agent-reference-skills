---
source: https://opencode.ai/docs/build/plugins/gui/#lifetimes-and-cleanup
---

# Lifetimes and cleanup

Everything registered through `ctx` is withdrawn when its owning scope ends; other resources need a cleanup function.

## Signature / Usage

Everything registered through `ctx` (`ctx.add`, `ctx.provide`, `ctx.dialogs.open`, `ctx.embeds.create`, and `Ipc`
event listeners) is withdrawn when its owning scope ends:

- Inside a component or a `createKeyed` callback, registrations end when that component or `createKeyed` run disposes.
- At the top level of `setup`, registrations end when the plugin is disabled, reloaded, or removed, or its window
  closes.
- In `main`, registrations end when the plugin is disabled, reloaded, or removed, or the app quits. An embed also ends
  when its window closes.

For other resources, such as timers or sockets, return a cleanup function from the setup. It runs at the same time.

- **Window `setup`** cannot be `async`, because it runs under a Solid owner. Return a cleanup function, or use
  `onCleanup` or `ctx.signal`.
- **`main`** may be `async`. Return, or resolve to, a cleanup function, or use `ctx.onCleanup(fn)`.

### Window setup

Window `setup` must be synchronous. Start asynchronous work inside `createKeyed` or `createLatest`.

```tsx title="src/gui.tsx"
import { Command, createKeyed, Plugin } from "@opencode/plugin/gui"
import { Changes } from "@opencode/plugin/gui/review"

export default Plugin.define({
  i18n: { en: { changes: "Show changes" } },
  setup(ctx) {
    // Runs once per active generation of Changes; the command is withdrawn with it.
    createKeyed(ctx.use(Changes), (changes) => {
      ctx.add(Command, () => ({
        id: "changes",
        title: ctx.t("changes"),
        run: () => {
          const session = ctx.sessions.current()

          if (session) changes.open(session)
        },
      }))
    })

    const timer = setInterval(() => console.log("still here"), 60_000)

    return () => clearInterval(timer)
  },
})
```

### Main setup

`main` may be `async`. Return, or resolve to, a cleanup function for resources it opens, or register it with
`ctx.onCleanup(fn)`.

```ts
async main(ctx) {
  const socket = await connect(ctx.options)

  ctx.onCleanup(() => socket.close())
}
```

- `ctx.onCleanup` runs its functions when the plugin is disabled, reloaded, or removed, or the app quits, last
  registered first. It runs a function at once when the plugin is already gone.
- After an `await`, return if `ctx.signal` aborted, before you register or change anything.
- An `async` cleanup delays quitting until it settles, for at most 3 seconds.

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Reactive primitives](./reactive-primitives.md)
- [Main context](./main-context.md)
