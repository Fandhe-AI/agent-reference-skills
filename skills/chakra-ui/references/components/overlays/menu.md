# Menu

Dropdown menu with keyboard navigation, checkbox/radio items, and nested submenus.

## Usage

```tsx
import { Menu } from "@chakra-ui/react"

<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Portal>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="edit">Edit</Menu.Item>
        <Menu.Item value="duplicate">Duplicate</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="delete" color="red.500">Delete</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>
```

## Options / Props

### Menu.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md"` | `"md"` | The size of the menu |
| `variant` | `"subtle" \| "solid"` | `"subtle"` | The visual variant for items |
| `colorPalette` | `string` | `"gray"` | The color palette |
| `closeOnSelect` | `boolean` | `true` | Close menu after item selection |
| `typeahead` | `boolean` | `true` | Whether typeahead navigation is enabled |
| `loopFocus` | `boolean` | `true` | Whether keyboard navigation loops |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `positioning` | `PositioningOptions` | — | Floating UI positioning options |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |
| `onSelect` | `(details: SelectionDetails) => void` | — | Callback when an item is selected |
| `hideMode` | `"display-none" \| "activity"` | `"display-none"` | How kept-mounted content is hidden when closed. `"activity"` uses React 19 `Activity` and pauses effects (requires React 19+) |
| `triggerValue` | `string` | — | Controlled trigger value (multiple triggers) |
| `onTriggerValueChange` | `(details: TriggerValueChangeDetails) => void` | — | Called when the trigger value changes |

### Menu.Trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | The value that identifies this specific trigger |

## Notes

- Sub-parts: `Root`, `Trigger`, `ContextTrigger`, `Content`, `Positioner`, `Item`, `ItemText`, `ItemCommand`, `ItemGroup`, `ItemGroupLabel`, `ItemIndicator`, `CheckboxItem`, `RadioItem`, `RadioItemGroup`, `Separator`, `TriggerItem`, `Arrow`.
- Sizes: `sm`, `md`. Variants: `subtle`, `solid`.
- Use `Menu.ContextTrigger` instead of `Menu.Trigger` for right-click context menus.
- Nested menus: place a `Menu.Root` inside an item and use `Menu.TriggerItem` as the trigger.
- `Menu.CheckboxItem` and `Menu.RadioItem` / `Menu.RadioItemGroup` provide stateful menu items.
- 3.35.0 (Ark UI 5.36.0): `Menu.Trigger` supports multiple triggers sharing one menu, and `aria-expanded` is set when closed.
- 3.37.0: fixed `Menu.ContextTrigger` flashing at the top-left corner on the first right-click, and long-press context menus on touch opening stuck at `(0,0)`.

## Related

- [action-bar.md](./action-bar.md)
- [popover.md](./popover.md)
