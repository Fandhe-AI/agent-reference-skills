---
source: https://opencode.ai/docs/build/plugins/gui/#tabs
---

# Tabs

`ctx.tabs` reads and changes the shell's tab strip: the sessions and drafts open as tabs.

## Signature / Usage

`ctx.tabs` reads and changes the shell's tab strip: the sessions and drafts open as tabs. This moves a session's tab to
the front when its run finishes:

```ts
import { onCleanup } from "solid-js"
import { createKeyed } from "@opencode/plugin/gui"

createKeyed(
  () => ctx.servers.get("sidecar")?.data,
  (data) =>
    onCleanup(
      data.on("session.execution.succeeded", (event) => {
        const tab = ctx.tabs.list().find((item) => item.session?.id === event.data.sessionID)

        if (tab) ctx.tabs.move(tab.key, 0)
      }),
    ),
)
```

- `list()` returns the open tabs in strip order. It is reactive. A tab's `session` is `undefined` for a draft, and
  `active` is `true` for the tab on screen.
- `open({ server, id }, { focus? })` opens a session as a tab at the end of the strip, in the background unless `focus`
  is `true`. A session that is already open keeps its tab, as does a subagent that its parent's tab shows.
- `focus(key)` shows a tab, `move(key, index)` moves it, and `close(key)` closes it as the user does.
- A key that no open tab has does nothing. Writes made before the app interface mounts wait for it.

#### Reference

```ts
interface Tabs {
  list(): ShellTab[]
  open(session: { server: string; id: string }, options?: { focus?: boolean }): void
  focus(key: string): void
  move(key: string, index: number): void
  close(key: string): void
}

interface ShellTab {
  key: string
  session: SessionRef | undefined
  active: boolean
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Servers and server events](./servers-events.md)
- [Layout](./layout.md)
