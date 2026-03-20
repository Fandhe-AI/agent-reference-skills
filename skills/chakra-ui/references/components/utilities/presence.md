# Presence

Animates the entry and exit of an element while controlling its render/unmount behavior.

## Import

```tsx
import { Presence } from "@chakra-ui/react"
```

## Usage

```tsx
<Presence
  present={open}
  animationName={{ _open: "fade-in", _closed: "fade-out" }}
  animationDuration="moderate"
>
  <Center p="10" layerStyle="fill.muted">
    Fade
  </Center>
</Presence>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `present` | `boolean` | — | Whether the node is present (controls visibility and animation) |
| `lazyMount` | `boolean` | `false` | Defer mounting until `present` is `true` for the first time |
| `unmountOnExit` | `boolean` | `false` | Remove the element from the DOM when `present` becomes `false` |
| `immediate` | `boolean` | — | Apply the presence change immediately without deferring to the next frame |
| `skipAnimationOnMount` | `boolean` | `false` | Skip the entry animation on initial mount |
| `onExitComplete` | `() => void` | — | Callback fired when the exit animation completes |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Merge props onto the child element |

## Variants / Sizes

```tsx
{/* Scale fade */}
<Presence
  present={open}
  animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }}
  animationDuration="moderate"
>
  <Center p="10">Scale Fade</Center>
</Presence>

{/* Slide + fade */}
<Presence
  present={open}
  animationName={{
    _open: "slide-from-bottom, fade-in",
    _closed: "slide-to-bottom, fade-out",
  }}
  animationDuration="moderate"
>
  <Center p="10">Slide Fade</Center>
</Presence>

{/* Lazy mount + unmount on exit */}
<Presence lazyMount unmountOnExit present={open} ...>
  <Center p="10">Content</Center>
</Presence>
```

## Notes

- Use `lazyMount` to avoid rendering content until it is first shown
- Use `unmountOnExit` to fully remove the element from the DOM after the exit animation completes
- Pairs with Chakra UI's token-based animation names (`fade-in`, `slide-from-bottom-full`, etc.)

## Related

- [Portal](./portal.md)
