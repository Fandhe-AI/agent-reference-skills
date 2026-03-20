# Marquee

A continuously scrolling content component for creating animated ticker and logo strip effects.

## Import

```tsx
import { Marquee } from "@chakra-ui/react"
```

## Usage

```tsx
<Marquee.Root autoFill>
  <Marquee.Viewport>
    <Marquee.Content>
      {items.map((item, i) => (
        <Marquee.Item key={i} px="2rem">
          {item}
        </Marquee.Item>
      ))}
    </Marquee.Content>
  </Marquee.Viewport>
</Marquee.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoFill` | `boolean` | `false` | Automatically duplicate content to fill the container |
| `speed` | `number` | `50` | Animation speed in pixels per second |
| `spacing` | `string` | `"1rem"` | Space between items |
| `reverse` | `boolean` | `false` | Reverse the scroll direction |
| `side` | `Side` | `"start"` | Scroll direction: `"start"` (left-to-right) or `"top"` (vertical) |
| `paused` | `boolean` | — | Controlled pause state |
| `defaultPaused` | `boolean` | `false` | Initial pause state (uncontrolled) |
| `pauseOnInteraction` | `boolean` | `false` | Pause on hover or focus |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `loopCount` | `number` | `0` | Number of loops (0 = infinite) |
| `onComplete` | `() => void` | — | Callback when all loops complete |
| `onLoopComplete` | `() => void` | — | Callback on each loop completion |
| `onPauseChange` | `(details: PauseStatusDetails) => void` | — | Callback when pause state changes |

### Edge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `Side` | — | **Required.** Which side to render the fade gradient (`"start"` or `"end"`) |

## Notes

- `Marquee.Viewport` clips the scrolling area; `Marquee.Content` contains the scrolling items
- `Marquee.Edge` renders a fade gradient on the leading or trailing edge
- Override animation duration via CSS variable `--marquee-duration` on `Marquee.Root`
- Use `side="top"` or `side="bottom"` for vertical scrolling
- Use `useMarquee()` hook with `Marquee.RootProvider` for external play/pause control

## Related

- [Carousel](../disclosure/carousel.md)
