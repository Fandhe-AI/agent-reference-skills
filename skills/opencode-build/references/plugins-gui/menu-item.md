---
source: https://opencode.ai/docs/build/plugins/gui/#menu-items
---

# MenuItem

`MenuItem` adds an entry to the side panel's **+** menu, the **Add server** menu, or each server's row menu in Settings.

## Signature / Usage

`MenuItem` adds an entry to the side panel's **+** menu (`"session.panel"`), the **Add server** menu (`"server.add"`),
or each server's row menu in Settings (`"server.row"`).

```ts
import { MenuItem } from "@opencode/plugin/gui"

ctx.add(MenuItem, (): MenuItem => {
  const session = ctx.sessions.current()

  return {
    menu: "session.panel",
    id: "open",
    title: ctx.t("menu.open"),
    icon: "folder",
    keybind: `${ctx.id}.open`,
    opened: !!session && ctx.layout.state(`${ctx.id}:main`, session) !== "closed",
    run: () => {
      if (session) ctx.layout.open(`${ctx.id}:main`, session)
    },
  }
})
```

- `order` sorts the items in ascending order. It defaults to `0`.
- A `server.row` item's `run` receives the row's server key. `when` lists the item only on some rows, and `enabled`
  shows it disabled on others.

A `session.panel` item is also a launcher. When the user opens the side region with no tabs, or clicks **+** while no
item is `primary`, the host shows a **New tab** view that lists the launchers.

- `icon` is the item's icon, and `keybind` a published command id whose shortcut the item shows.
- `description` is a short muted detail after the title in a launcher row, such as a count.
- `opened: true` means the tab the item opens is already open. Launcher lists leave the item out, and the **+** menu
  still lists it.
- `primary: true` makes **+** run the item directly instead of showing the launchers. The first primary item in `order`
  wins. Opening the side region with no tabs still shows the **New tab** view, which lists the items that are not
  primary and not open.
- `ctx.layout.side.menu()` lists every plugin's `session.panel` items, for a launcher of your own; see
  [Layout](./layout.md).

#### Reference

```ts
type MenuItem = SessionPanelMenuItem | ServerAddMenuItem | ServerRowMenuItem

interface SessionPanelMenuItem {
  menu: "session.panel"
  id: string
  title: string
  order?: number
  icon?: IconName
  keybind?: string
  description?: string
  opened?: boolean
  primary?: true
  run(): void
}

interface ServerAddMenuItem {
  menu: "server.add"
  id: string
  title: string
  order?: number
  run(): void
}

interface ServerRowMenuItem {
  menu: "server.row"
  id: string
  title: string
  order?: number
  when?(server: string): boolean
  enabled?(server: string): boolean
  run(server: string): void
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Layout](./layout.md)
- [Panel](./panel.md)
- [Native app menu](./menubar-item.md)
