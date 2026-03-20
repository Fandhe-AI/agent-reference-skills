# Drawer

Slide-in panel from any edge of the viewport, similar to Dialog.

## Import

```tsx
import { Drawer } from "@chakra-ui/react"
```

## Usage

```tsx
<Drawer.Root placement="end">
  <Drawer.Trigger asChild>
    <Button>Open Drawer</Button>
  </Drawer.Trigger>
  <Portal>
    <Drawer.Backdrop />
    <Drawer.Positioner>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Settings</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>Drawer content here.</Drawer.Body>
        <Drawer.Footer>
          <Button>Save</Button>
        </Drawer.Footer>
        <Drawer.CloseTrigger />
      </Drawer.Content>
    </Drawer.Positioner>
  </Portal>
</Drawer.Root>
```

## Props

### Drawer.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | The size (width/height) of the drawer |
| `placement` | `"start" \| "end" \| "top" \| "bottom"` | `"end"` | Which edge the drawer slides in from |
| `contained` | `boolean` | `false` | Constrain the drawer within its parent element |
| `modal` | `boolean` | `true` | Whether to block interaction outside |
| `trapFocus` | `boolean` | `true` | Whether to trap focus inside |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |
| `closeOnInteractOutside` | `boolean` | `true` | Close on outside click |
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | — | Initial open state |
| `onOpenChange` | `(details: OpenChangeDetails) => void` | — | Callback when open state changes |
| `lazyMount` | `boolean` | `false` | Mount content only when opened |
| `unmountOnExit` | `boolean` | `false` | Unmount content when closed |

## Sub-parts

`Root`, `Trigger`, `Backdrop`, `Positioner`, `Content`, `Header`, `Body`, `Footer`, `Title`, `Description`, `CloseTrigger`, `ActionTrigger`

## Variants / Sizes

- **sizes**: `xs`, `sm`, `md`, `lg`, `xl`, `full`
- **placements**: `start`, `end`, `top`, `bottom`

## Notes

- Shares sub-part structure with `Dialog`.
- Set `contained={true}` to render the drawer within a positioned parent container rather than the viewport.

## Related

- [dialog.md](./dialog.md)
