# Toggle Tip

A tooltip-styled component that toggles open on click rather than hover, combining tooltip appearance with popover behavior.

## Import

```tsx
import { ToggleTip } from "@chakra-ui/react"
```

## Usage

```tsx
<ToggleTip.Root>
  <ToggleTip.Trigger asChild>
    <IconButton variant="ghost" size="xs">
      <LuInfo />
    </IconButton>
  </ToggleTip.Trigger>
  <Portal>
    <ToggleTip.Positioner>
      <ToggleTip.Content>
        This is additional information.
      </ToggleTip.Content>
    </ToggleTip.Positioner>
  </Portal>
</ToggleTip.Root>
```

## Sub-parts

`Root`, `Trigger`, `Content`, `Positioner`

## Notes

- Looks like a `Tooltip` (small, non-modal) but works like a `Popover` (click to toggle, persists until dismissed).
- Useful for icon buttons that reveal brief contextual info without navigating away.
- Does not auto-close on mouse leave — user must click the trigger again or click outside.

## Related

- [tooltip.md](./tooltip.md)
- [popover.md](./popover.md)
