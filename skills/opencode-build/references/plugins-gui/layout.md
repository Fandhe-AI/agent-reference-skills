---
source: https://opencode.ai/docs/build/plugins/gui/#layout
---

# Layout

`ctx.layout` opens, closes, and inspects panel tabs, the side region, settings, and drafts.

## Signature / Usage

`ctx.layout.open(key, session, options?)` opens a panel tab by its key, `<plugin id>:<tab id>`. It works for sessions
that are not mounted.

```ts
const session = ctx.sessions.current()

if (session) ctx.layout.open(`${ctx.id}:main`, session, { tab: "select", background: true })
```

- `tab: "open"`, the default, selects the tab in the preview slot. `"preview"` makes it the new preview, `"append"` adds
  it without selecting it, and `"select"` adds and selects it, keeping the preview.
- `background: true` keeps the current view on narrow screens and opens the side region, for an action the user did
  not start from the panel.
- `close(key, session)` removes the tab and calls its panel's `close`. `toggle(key, session)` closes a visible tab, else
  opens it.
- `hide(key, session)` hides the pane that shows a visible tab, without closing the tab: the side region, or the bottom
  pane for a tab the user moved there. Opening the tab again shows its pane.
- `state(key, session)` is `"closed"` when the tab is not in the strip, `"open"` when it is but its pane shows another
  tab, `"active"` when its pane shows it but the pane is hidden (the side region is closed, or the bottom pane is
  hidden), and `"visible"` when it is on screen.
- `stored(session)` is this plugin's tab ids stored in the session's side strip.
- `ready()` is `true` once the stored layout has loaded, and `narrow()` while the viewport is under 768px.
- `side.opened(session)` is `true` while the side region is open, and `side.toggle(session)` opens or closes it.
- `side.menu()` lists every plugin's `session.panel` [menu items](./menu-item.md) in `order`, for a launcher of your own.
- `side.width(panel)` and `side.resize(panel, width)` read and store the side region width of one of your panels; see
  [Panel width](./panel.md).
- `sidebar.opened()` is the inner sidebar preference that every side panel shares.
- `scroll` stores scroll offsets per session and key.
- `settings(page?)` opens Settings. `project(server, title)` opens a project's directory picker and a new draft.
- `draft({ server, directory, prompt })` opens a new draft session in its own tab, with the prompt filled in for the
  user to review and send.

```ts
const session = ctx.sessions.current()
const launchers = () => ctx.layout.side.menu().filter((item) => !item.primary && !item.opened)

if (session) {
  ctx.layout.draft({ server: session.server.id, directory: session.directory, prompt: ctx.t("setup.prompt") })
}
```

#### Reference

```ts
interface Layout {
  open(key: string, session: SessionRef, options?: OpenOptions): void
  close(key: string, session: SessionRef): void
  toggle(key: string, session: SessionRef): void
  hide(key: string, session: SessionRef): void
  state(key: string, session: SessionRef): PanelState
  stored(session: SessionRef): string[]
  ready(): boolean
  narrow(): boolean
  side: {
    opened(session: SessionRef): boolean
    toggle(session: SessionRef): void
    menu(): SessionPanelMenuItem[]
    width(panel: string): number | undefined
    resize(panel: string, width: number): void
  }
  sidebar: {
    opened(): boolean
  }
  scroll: {
    get(session: SessionRef, key: string): { x: number; y: number } | undefined
    set(session: SessionRef, key: string, value: { x: number; y: number }): void
  }
  settings(page?: string): void
  project(server: string, title: string): void
  draft(input: { server: string; directory: string; prompt: string }): void
}

type PanelState = "closed" | "open" | "active" | "visible"

interface OpenOptions {
  tab?: "open" | "preview" | "append" | "select"
  background?: boolean
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Panel](./panel.md)
- [Menu items](./menu-item.md)
- [Sessions and the session screen](./sessions-screen.md)
