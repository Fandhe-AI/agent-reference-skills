# Toggle Tip

A tooltip-styled component that toggles open on click rather than hover, combining tooltip appearance with popover behavior.

## Usage

```tsx
import { ToggleTip } from "@chakra-ui/react"

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

### Sizes

The toggle tip supports `xs`, `sm`, `md`, and `lg` size variants. Pass the `size` prop to both the component and the button to scale it consistently.

```tsx
<For each={["xs", "sm", "md", "lg"]}>
  {(size) => (
    <InfoTip
      key={size}
      size={size}
      buttonProps={{ size }}
      content={`This is the "${size}" size variant`}
    />
  )}
</For>
```

### Arrow

Set `showArrow` to display a directional arrow pointing from the popover content to the trigger element.

```tsx
<InfoTip showArrow content="This is some additional information." />
```

### Close on Escape

By default (`true`), pressing the Escape key closes the toggle tip. Set `closeOnEscape` to `false` to keep it open on Escape.

```tsx
<InfoTip closeOnEscape={false} content="This is some additional information." />
```

### Close on Interact Outside

By default (`true`), clicking outside the toggle tip closes it. Set `closeOnInteractOutside` to `false` to allow outside interaction without closing.

```tsx
<InfoTip closeOnInteractOutside={false} content="This is some additional information." />
```

## Notes

- Sub-parts: `Root`, `Trigger`, `Content`, `Positioner`.
- Looks like a `Tooltip` (small, non-modal) but works like a `Popover` (click to toggle, persists until dismissed).
- Useful for icon buttons that reveal brief contextual info without navigating away.
- Does not auto-close on mouse leave — user must click the trigger again or click outside.

## Related

- [tooltip.md](./tooltip.md)
- [popover.md](./popover.md)
