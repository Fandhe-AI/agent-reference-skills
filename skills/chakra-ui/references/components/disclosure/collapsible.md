# Collapsible

A component that expands and collapses content with an animated transition.

## Import

```tsx
import { Collapsible } from "@chakra-ui/react"
```

## Usage

```tsx
<Collapsible.Root>
  <Collapsible.Trigger paddingY="3">Toggle Collapsible</Collapsible.Trigger>
  <Collapsible.Content>
    <Box padding="4" borderWidth="1px">
      Content goes here.
    </Box>
  </Collapsible.Content>
</Collapsible.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state (uncontrolled) |
| `disabled` | `boolean` | — | Whether the collapsible is disabled |
| `collapsedHeight` | `string \| number` | — | Height when collapsed (for partial reveal) |
| `collapsedWidth` | `string \| number` | — | Width when collapsed |
| `lazyMount` | `boolean` | `false` | Whether to enable lazy mounting |
| `unmountOnExit` | `boolean` | `false` | Whether to unmount content on exit |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |
| `onExitComplete` | `VoidFunction` | — | Callback when exit animation completes |

## Notes

- Use `collapsedHeight` to create a "show more / show less" pattern with partial content visibility
- `Collapsible.Indicator` can be used for animated chevron/arrow icons
- `unmountOnExit` removes the DOM node when collapsed, which is useful for performance
- Use `useCollapsible()` hook with `Collapsible.RootProvider` for external state control

## Related

- [Accordion](./accordion.md)
