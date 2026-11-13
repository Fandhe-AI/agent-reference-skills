---
source: https://opencode.ai/docs/build/plugins/gui/#native-app-menu
---

# Native app menu (MenubarItem)

`main` adds items to the native menus and to the in-app menu on Windows and Linux with `MenubarItem`.

## Signature / Usage

`main` adds items to the native menus (the macOS app menu, File, Edit, View, Go, Window, and Help) and to the in-app
menu on Windows and Linux with `MenubarItem` from `@opencode/plugin/gui/main`:

```ts
import { MenubarItem } from "@opencode/plugin/gui/main"

ctx.add(
  MenubarItem,
  (): MenubarItem => ({
    menu: "help",
    id: "diagnostics",
    after: "logs.export",
    label: ctx.t("menu.diagnostics"),
    enabled: () => true,
    run: (focusedWindow) => {
      focusedWindow?.webContents.focus()
    },
  }),
)
```

- `after` names the item it follows: one of this plugin's items by its id, or a built-in item by its command, else its
  action, else its role, for example `logs.export`, `edit.copy`, or `about`. When nothing matches, the item goes at the
  end of the menu.
- `app` items appear only on macOS.
- `run` receives the focused window, if any.
- Main reads the function each time it builds the menu, so the label follows the language.

#### Reference

```ts
interface MenubarItem {
  menu: "app" | "file" | "edit" | "view" | "go" | "window" | "help"
  id: string
  label: string
  after?: string
  enabled?(): boolean
  run(window: BrowserWindow | undefined): void
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Main context](./main-context.md)
- [Menu items](./menu-item.md)
