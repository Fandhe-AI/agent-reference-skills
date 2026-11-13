---
source: https://opencode.ai/docs/build/plugins/gui/#slots
---

# Slot

`Slot` renders UI into one of four window slots.

## Signature / Usage

`Slot` renders UI into one of four window slots.

```tsx
import { Slot } from "@opencode/plugin/gui"

ctx.add(Slot, {
  at: "session.header",
  order: 10,
  render: (input) => <UsageRing session={input.session} active={input.active} />,
})
```

- `window.bottom` is a full-width strip at the bottom of the window, above toasts.
- `session.header` is the session timeline's title row. A cached timeline stays mounted while hidden, with `active`
  `false`.
- `session.location.menu` adds items to the project menu, after its location details.
- `session.panel.end` holds actions at the trailing end of the side region's tab strip.
- `order` sorts the items in one slot.

`session.location.menu` receives `shown`, which is `true` while the project menu is open. Subscribe to location data
only while it is `true`:

```tsx
ctx.add(Slot, {
  at: "session.location.menu",
  render: (input) => <BranchStatus session={input.session} screen={input.screen} shown={input.shown} />,
})
```

The project menu is a host menu: render its rows with `ctx.ui.MenuItem`, `MenuSub`, `MenuGroup`, and `MenuSeparator`,
so they navigate with the keyboard and close the menu like the host's rows. See [Menu rows](./ui-components.md).

```tsx
ctx.add(Slot, {
  at: "session.location.menu",
  render: (input) => <ctx.ui.MenuItem label={ctx.t("usage")} icon="status" onSelect={() => openUsage(input.session)} />,
})
```

#### Reference

```ts
type Slot = {
  [At in keyof SlotMap]: { at: At; order?: number; render(input: SlotMap[At]): JSX.Element }
}[keyof SlotMap]

interface SlotMap {
  "window.bottom": Record<string, never>
  "session.header": { screen: SessionScreen; session: MountedSession; active: boolean }
  "session.location.menu": { screen: SessionScreen; session: MountedSession; shown: boolean }
  "session.panel.end": { screen: SessionScreen; session: MountedSession }
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend). Terminal (TUI) plugin slots are a separate plugin surface and are not these window slots.

## Related

- [App components](./ui-components.md)
- [Panel](./panel.md)
