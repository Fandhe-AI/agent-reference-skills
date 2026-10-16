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

## Reduced motion

The built-in component animations play regardless of the user's `prefers-reduced-motion` setting. To disable the enter/exit animations for users who prefer reduced motion, add this rule to your `globalCss` config:

```tsx
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  globalCss: {
    '[data-state="open"], [data-state="closed"]': {
      _motionReduce: {
        animationDuration: "1ms !important",
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
```

This collapses the enter/exit animations of every disclosure component (dialog, drawer, menu, popover, tooltip, etc.) to `1ms` when reduced motion is enabled.

- **Scope to `data-state="open"` and `data-state="closed"`** rather than targeting all elements. A blanket rule also collapses looping animations (`Spinner`, `Skeleton`, indeterminate `Progress`), turning them into a flicker. Loading indicators are considered essential motion and are best left running.
- **`animation: none` also works.** The presence logic detects it and unmounts exiting components immediately. A `1ms` duration is suggested because it keeps `animationend` events firing for any custom code that listens for them.
- **The `!important` is required** because the rule lives in a lower CSS layer than component recipes.

When building custom animations, use the `_motionReduce` condition to provide a reduced-motion alternative:

```tsx
<Box
  data-state="open"
  _open={{ animationName: "slide-from-bottom, fade-in" }}
  _motionReduce={{ animationName: "fade-in" }}
>
  Slides on screen, but only fades for reduced motion users
</Box>
```

## Notes

- CSS animations are preferred over JavaScript animations for performance
- Use `data-state` attributes to coordinate enter/exit animations
- Both `_open` and `_closed` styles can define animations for smooth transitions

## Related

- [Overview](./overview.md)
- [Composition](./composition.md)
