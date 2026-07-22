# Marquee

A continuous scrolling component that displays content in a seamless loop, commonly used for partner logos, announcements, or other rotating content.

## Signature / Usage

```tsx
import { Marquee } from '@ark-ui/react/marquee'

export const Basic = () => (
  <Marquee.Root speed={50}>
    <Marquee.Viewport>
      <Marquee.Content>
        <Marquee.Item>Item 1</Marquee.Item>
        <Marquee.Item>Item 2</Marquee.Item>
      </Marquee.Content>
    </Marquee.Viewport>
  </Marquee.Root>
)
```

## Anatomy

- `Marquee.Root` — main container wrapper
- `Marquee.Viewport` — the scrolling area boundary
- `Marquee.Content` — wrapper that receives the animation
- `Marquee.Item` — individual marquee elements
- `Marquee.Edge` — optional gradient overlays for fade effects

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `autoFill` | `boolean` | `false` | Duplicates content to fill the viewport |
| `speed` | `number` | `50` | Animation speed in pixels/second |
| `reverse` | `boolean` | `false` | Reverses the scroll direction |
| `side` | `"start" \| "end" \| "top" \| "bottom"` | `"start"` | Scroll direction |
| `pauseOnInteraction` | `boolean` | `false` | Pauses scrolling on hover/focus |
| `loopCount` | `number` | `0` | Number of loop iterations (`0` = infinite) |
| `spacing` | `string` | `"1rem"` | Gap between duplicated items |

## Notes

- Requires keyframe animations (`marqueeX` / `marqueeY`) and the CSS variable `--marquee-translate` for seamless looping.
- Enable `pauseOnInteraction` and provide a descriptive `aria-label` for accessibility.
- Avoid using for critical information that requires careful reading.
- Use `RootProvider` with the `useMarquee` hook to control state externally.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Highlight](./highlight.md)
