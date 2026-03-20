# Portal

Renders content outside the normal DOM hierarchy using `ReactDOM.createPortal`, appending to `document.body` by default.

## Import

```tsx
import { Portal } from "@chakra-ui/react"
```

## Usage

```tsx
<>
  <p>Welcome</p>
  <Portal>This text has been portaled</Portal>
</>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `container` | `RefObject<HTMLElement \| null>` | `document.body` | A ref to the container element to render into |
| `disabled` | `boolean` | — | When `true`, renders children in place without portaling |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Variants / Sizes

```tsx
{/* Custom container */}
const ref = useRef<HTMLDivElement | null>(null)

<Portal container={ref}>
  <span>Portaled into ref</span>
</Portal>
<div ref={ref} />
```

## Notes

- Commonly used by overlay components (dialogs, drawers, tooltips, popovers) to escape CSS `overflow` and `z-index` constraints
- Set `disabled` to render children inline, useful for testing or non-browser environments

## Related

- [EnvironmentProvider](./environment-provider.md)
- [Presence](./presence.md)
