---
source: https://opencode.ai/docs/build/plugins/gui/#titlebar-items
---

# TitlebarItem

`TitlebarItem` renders a pill button in the window titlebar or tabs footer. Its label shows on hover.

## Signature / Usage

```ts
import { TitlebarItem } from "@opencode/plugin/gui"

ctx.add(TitlebarItem, (): TitlebarItem | undefined =>
  syncing() ? { id: "sync", label: ctx.t("syncing"), icon: "server", busy: true, run: () => sync() } : undefined,
)
```

- `title` is the accessible name when it differs from `label`.
- `busy` shows a spinner and disables the pill. `pressed` shows it pressed.
- `run` runs on click. Omit it for an item that only shows.

#### Reference

```ts
interface TitlebarItem {
  id: string
  label: string
  title?: string
  icon?: IconName
  busy?: boolean
  pressed?: boolean
  run?(): void
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Composer pills](./composer-pill.md)
- [Registries](./registries.md)
