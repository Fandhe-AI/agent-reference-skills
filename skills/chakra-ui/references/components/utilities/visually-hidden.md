# VisuallyHidden

Hides content visually while keeping it accessible to screen readers and other assistive technologies.

## Import

```tsx
import { VisuallyHidden } from "@chakra-ui/react"
```

## Usage

```tsx
<Button>
  <LuBell /> 3 <VisuallyHidden>Notifications</VisuallyHidden>
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Variants / Sizes

```tsx
{/* Wrap a native element with asChild */}
<VisuallyHidden asChild>
  <input type="text" placeholder="Search..." />
</VisuallyHidden>
```

## Notes

- Implemented with CSS (`position: absolute; clip: rect(0 0 0 0); height: 1px; width: 1px; overflow: hidden`) — content remains in the DOM and is announced by screen readers
- Unlike `display: none` or `visibility: hidden`, this does **not** hide content from assistive technology
- Focus-visible styles are preserved, so keyboard-focused elements (e.g. skip links) still appear when focused

## Related

- [SkipNav](./skip-nav.md)
