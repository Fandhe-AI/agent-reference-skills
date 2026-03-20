# Animation

Chakra UI recommends using CSS animations to animate components for optimal performance and control over enter/exit states.

## Data State Attributes

Disclosure components (popovers, dialogs, drawers) use `data-state` to track visibility:

- `data-state="open"` — component is open
- `data-state="closed"` — component is closed

Styled using the `_open` / `_closed` pseudo props:

```tsx
<Box
  data-state="open"
  _open={{
    animation: "fade-in 300ms ease-out",
  }}
  _closed={{
    animation: "fade-out 200ms ease-in",
  }}
>
  Animated content
</Box>
```

## Built-in Animations

Chakra UI provides pre-built keyframe animations:

| Animation | Description |
|-----------|-------------|
| `fade-in` / `fade-out` | Opacity transition |
| `slide-from-top` / `slide-to-top` | Slide from/to top |
| `slide-from-bottom` / `slide-to-bottom` | Slide from/to bottom |
| `slide-from-left` / `slide-to-left` | Slide from/to left |
| `slide-from-right` / `slide-to-right` | Slide from/to right |
| `scale-in` / `scale-out` | Scale transition |
| `spin` | Continuous rotation |
| `pulse` | Opacity pulsing |
| `bounce` | Bounce effect |

## Notes

- CSS animations are preferred over JavaScript animations for performance
- Use `data-state` attributes to coordinate enter/exit animations
- Both `_open` and `_closed` styles can define animations for smooth transitions

## Related

- [Overview](./overview.md)
- [Composition](./composition.md)
