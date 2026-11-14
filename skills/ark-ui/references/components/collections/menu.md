# Menu

A list of selectable options that appears when a user interacts with a trigger button, supporting grouping, checkboxes, radio groups, nested menus, and context menus.

## Signature / Usage

```tsx
import { Menu } from "@ark-ui/react"

const App = () => (
  <Menu.Root onSelect={(details) => console.log(details.value)}>
    <Menu.Trigger>Open Menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="edit">Edit</Menu.Item>
        <Menu.Item value="delete">Delete</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
```

## Anatomy

- `Menu.Root` — container
- `Menu.Trigger` — button that opens the menu
- `Menu.Indicator` — visual indicator (e.g. chevron)
- `Menu.Positioner` — positioning wrapper
- `Menu.Content` — menu container
- `Menu.Arrow` / `Menu.ArrowTip` — optional arrow pointer
- `Menu.Item` — individual menu option
- `Menu.ItemGroup` / `Menu.ItemGroupLabel` — grouped items with labels
- `Menu.Separator` — visual divider
- `Menu.CheckboxItem` — checkbox option
- `Menu.RadioGroup` / `Menu.RadioItem` — radio button options
- `Menu.ContextTrigger` — right-click trigger
- `Menu.TriggerItem` — submenu trigger

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `open` / `defaultOpen` | `boolean` | Control open state |
| `onSelect` | `function` | Callback when item is selected |
| `closeOnSelect` | `boolean` | Auto-close after selection (default: `true`) |
| `loopFocus` | `boolean` | Wrap keyboard navigation |
| `typeahead` | `boolean` | Enable character-based navigation |
| `positioning` | `object` | Dynamic positioning options |
| `lazyMount` / `unmountOnExit` | `boolean` | Performance optimizations |
| `hideMode` | `HideMode` (default: `'display-none'`) | How to hide content when mounted but not present. `'display-none'`: HTML `hidden` attribute, effects stay alive. `'activity'`: React 19 `<Activity mode="hidden">`, effects pause, requires React 19+ (5.38.0) |

## Notes

- Follows the WAI-ARIA menu pattern. Keyboard: Space/Enter to select, Arrow Up/Down to navigate, Arrow Left/Right to open/close submenus, Esc to close.
- Data attributes: `[data-state="open"|"closed"]`, `[data-highlighted]`, `[data-disabled]`, `[data-value]`.
- Items can render as links via `asChild`; `Menu.ContextTrigger` enables right-click context menus; `Menu.TriggerItem` nests submenus.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.
- 5.40.0: pressing Enter on a link item calls `onSelect` and closes the menu. The `onSelect` and `navigate` details include `modifiers`, so Cmd/Ctrl + Enter can be left to the browser:

  ```tsx
  <Menu.Root
    onSelect={(details) => {
      if (details.modifiers.metaKey || details.modifiers.ctrlKey) return
      // ...
    }}
  />
  ```

- Source: https://ark-ui.com/react/docs/components/menu (Ark UI @ark-ui/react 5.40.0, fetched 2026-11-14)
- Source: https://github.com/chakra-ui/ark/blob/9a3f857e79d5e891afb928781c2c8a0559f49181/packages/react/CHANGELOG.md (@ark-ui/react 5.40.0, fetched 2026-11-14)

## Related

- [Select](./select.md)
