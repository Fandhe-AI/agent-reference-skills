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

## Notes

- Follows the WAI-ARIA menu pattern. Keyboard: Space/Enter to select, Arrow Up/Down to navigate, Arrow Left/Right to open/close submenus, Esc to close.
- Data attributes: `[data-state="open"|"closed"]`, `[data-highlighted]`, `[data-disabled]`, `[data-value]`.
- Items can render as links via `asChild`; `Menu.ContextTrigger` enables right-click context menus; `Menu.TriggerItem` nests submenus.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Select](./select.md)
