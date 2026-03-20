# Action Bar

Floating action bar that appears when items are selected, typically docked at the bottom of the viewport.

## Import

```tsx
import { ActionBar } from "@chakra-ui/react"
```

## Usage

```tsx
<ActionBar.Root open={selectedCount > 0}>
  <ActionBar.Positioner>
    <ActionBar.Content>
      <ActionBar.SelectionTrigger>
        {selectedCount} selected
      </ActionBar.SelectionTrigger>
      <ActionBar.Separator />
      <Button>Delete</Button>
      <Button>Archive</Button>
      <ActionBar.CloseTrigger />
    </ActionBar.Content>
  </ActionBar.Positioner>
</ActionBar.Root>
```

## Props

### ActionBar.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the action bar is visible |
| `placement` | `"bottom" \| "bottom-start" \| "bottom-end"` | `"bottom"` | Position of the bar |
| `closeOnInteractOutside` | `boolean` | — | Close when clicking outside |

## Sub-parts

`Root`, `Positioner`, `Content`, `SelectionTrigger`, `Separator`, `CloseTrigger`

## Notes

- Typically controlled by a boolean derived from a selection count (e.g., `open={selection.size > 0}`).
- Renders via a `Portal` by default — content is placed outside the normal DOM flow.

## Related

- [dialog.md](./dialog.md)
- [menu.md](./menu.md)
