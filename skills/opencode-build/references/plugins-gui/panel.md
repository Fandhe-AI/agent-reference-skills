---
source: https://opencode.ai/docs/build/plugins/gui/#panels
---

# Panel

`Panel` contributes tabs to a session's side region; includes panel width and reopening closed tabs.

## Signature / Usage

### Panels

`Panel` contributes tabs to a session's side region (`region: "side"`). The user can drag a tab to a bottom pane below
the timeline.

```tsx
import { Panel, type PanelTab } from "@opencode/plugin/gui"

const mainTab: PanelTab = {
  id: "main",
  get title() {
    return ctx.t("panel.title")
  },
  closable: "compact",
  fallback: true,
}

ctx.add(Panel, {
  id: "main",
  region: "side",
  mobile: {
    get title() {
      return ctx.t("panel.title")
    },
    order: 45,
    kind: "menu",
    icon: "file-tree",
  },
  list: (input) => (input.open.includes("main") ? [mainTab] : []),
  render: (props) => <NotesView session={props.session} screen={props.screen} tab={props.tab} />,
})
```

All panel callbacks (`list`, `render`, `focus`, `enter`, `close`, `closed`, `restore`, `normalize`) receive a single
input object:

- Read `props.session` and `props.tab` as reactive getters where you use them. Never destructure them at the top of
  `render`: when the user switches from session A to session B, the panel stays mounted and `props.session` updates in
  place.
- `props.screen` is the constant owning `SessionScreen` (`file`, `comment`, `composer`). Its actions always target the
  session that is routed.
- Return the same `PanelTab` object from `list` while a tab is unchanged, so the host does not remount its trigger.
  Read its labels from getters, so they follow the language without a new object.

A panel's callbacks:

- `list` returns the tabs to show. `input.open` holds this plugin's tab ids stored in the session. It is reactive.
- `render` renders a tab's content once.
- `focus` runs when a tab is selected. `restored` is `true` for the selection the region mounts with.
- `enter` runs when the user opens the side region on the tab with its toggle, once the tab is on screen. Move keyboard
  focus to the tab's own target, such as a text field. When focus is still outside the region, the host focuses the
  region.
- `close` runs after the host removes a tab.
- `closed` and `restore` let the user reopen a closed tab; see [Reopen closed tabs](#reopen-closed-tabs).
- `normalize` returns the canonical form of a stored tab id that can be stored more than one way.

A panel's options:

- `mobile` adds a narrow-screen view of the panel. With `cached: true`, the view stays mounted while the user shows
  another view. By default, the view mounts each time it shows.
- `wide` asks for the wider session minimum while the side region is open.
- `width` gives the panel a side region width of its own; see [Panel width](#panel-width).
- `transient` panels' tabs are not restored.

#### Panel width

By default, every tab in the side region shares the conversation's width. Set `width` when your panel needs less room
than a review or a browser, or more. Pass CSS pixels, or `"narrow"` for the narrowest the region goes.

```ts
ctx.add(Panel, {
  id: "quota",
  region: "side",
  width: "narrow",
  list: (input) => (input.open.includes("quota") ? [tab] : []),
  render: () => <Quota />,
})
```

- The width applies while the side pane shows one of the panel's tabs. Other tabs keep the conversation's width.
- When the user drags the divider on one of the panel's tabs, the host keeps that width for the panel, app-wide, in place
  of `width`.
- The host keeps the conversation at its minimum width and the region at least `"narrow"`.
- `ctx.layout.side.width(panel)` reads the stored width, and `ctx.layout.side.resize(panel, width)` stores one, as a drag
  does. A stored width applies even to a panel without `width`.

A tab's options:

- `id` is the tab id; its host key is `<plugin id>:<id>`. `title` is its accessible name, and `label` renders custom
  trigger content.
- `pinned` tabs are listed without being opened, come first, and are never closed or dragged.
- `draggable` lets the user reorder the tab. It defaults to `true`.
- `closable` sets the close button's look: `"compact"`, `"hover"`, or `false` for none.
- `transient` marks a launcher tab, such as **Open file**, that the next preview replaces.
- `fallback` opts into fallback selection when the stored selection is missing.
- Tabs in one `group` share one render that stays mounted.
- `missing` strikes the tab through, for example for a file that no longer exists.
- `hidden` keeps a restored tab listed and selectable but not drawn, while its content is not known yet.
- `file` is the workspace path the tab shows, listed as one of the session's open files.
- `tabbable` puts the tab panel in the tab order, for content without focusable elements.

#### Reference

```ts
interface Panel {
  id: string
  region: "side"
  mobile?: MobileView
  wide?: boolean
  width?: number | "narrow"
  transient?: boolean
  list(input: { session: MountedSession; screen: SessionScreen; open: string[] }): PanelTab[]
  render(props: PanelProps): JSX.Element
  focus?(input: PanelProps & { restored: boolean }): void
  enter?(input: PanelProps): void
  close?(input: PanelProps): void
  closed?(input: PanelProps): ClosedPanelTab | false | undefined
  restore?(input: { session: MountedSession; screen: SessionScreen; id: string; data?: string }): void
  normalize?(input: { id: string; session: MountedSession; screen: SessionScreen }): string
}

interface PanelProps {
  tab: PanelTab
  session: MountedSession
  screen: SessionScreen
}

interface PanelTab {
  id: string
  title: string
  label?(state: { active: boolean; preview: boolean; session: MountedSession }): JSX.Element
  pinned?: boolean
  draggable?: boolean
  closable?: "compact" | "hover" | false
  transient?: boolean
  fallback?: boolean
  group?: string
  missing?: boolean
  hidden?: boolean
  file?: string
  tabbable?: boolean
}

interface MobileView {
  title: string
  order: number
  kind: "tab" | "menu" | "drawer"
  icon?: IconName
  cached?: boolean
}
```

### Reopen closed tabs

The host keeps an entry for each side tab the user closes. While focus is in the side region, ⌘⇧T reopens the newest
one. The side region's **New tab** view lists closed tabs that show a `file` under **Recently closed**. Add `closed` and
`restore` to control how a tab reads there and how it comes back.

```tsx
ctx.add(Panel, {
  id: "page",
  region: "side",
  list: (input) => input.open.map(pageTab),
  render: (props) => <PageView tab={props.tab} />,
  closed: (input) => {
    const url = pages.get(input.tab.id)

    return url ? { icon: "globe", detail: new URL(url).host, data: url } : false
  },
  restore: (input) => {
    if (input.data) openPage(input.session, input.data)
  },
})
```

- `closed` runs as the user closes a tab. Capture what reopening needs now: return how the row reads and the `data`
  that `restore` needs, or `false` when the tab cannot come back.
- `title` defaults to the tab's title, and `icon` to the panel's mobile icon. A tab with a `file` shows its file icon,
  and its folder as `detail`.
- The host stores the entry, so keep `data` small, such as a URL.
- `restore` receives the closed tab's `id` and the `data` that `closed` returned. Without `restore`, the host opens the
  same key again.
- Without `closed`, a tab that is not `transient` lists under its title and reopens under the same key.

#### Reference

```ts
interface ClosedPanelTab {
  title?: string
  icon?: IconName
  detail?: string
  data?: string
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | string | — | Panel id. |
| region | "side" | — | Side region of a session. |
| mobile | MobileView | — | Adds a narrow-screen view of the panel. |
| wide | boolean | — | Asks for the wider session minimum while the side region is open. |
| width | number \| "narrow" | — | Side region width of its own; CSS pixels or `"narrow"`. |
| transient | boolean | — | Tabs of transient panels are not restored. |

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Layout](./layout.md)
- [Sessions and the session screen](./sessions-screen.md)
- [Menu items](./menu-item.md)
