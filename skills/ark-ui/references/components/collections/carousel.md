# Carousel

An interactive slideshow component for cycling through a set of elements.

## Signature / Usage

```tsx
import { Carousel } from "@ark-ui/react"

const App = () => (
  <Carousel.Root slideCount={3}>
    <Carousel.Control>
      <Carousel.PrevTrigger>Prev</Carousel.PrevTrigger>
      <Carousel.NextTrigger>Next</Carousel.NextTrigger>
    </Carousel.Control>
    <Carousel.ItemGroup>
      <Carousel.Item index={0}>Slide 1</Carousel.Item>
      <Carousel.Item index={1}>Slide 2</Carousel.Item>
      <Carousel.Item index={2}>Slide 3</Carousel.Item>
    </Carousel.ItemGroup>
    <Carousel.IndicatorGroup>
      <Carousel.Indicator index={0} />
      <Carousel.Indicator index={1} />
      <Carousel.Indicator index={2} />
    </Carousel.IndicatorGroup>
  </Carousel.Root>
)
```

## Anatomy

- `Carousel.Root` — main container
- `Carousel.Control` — navigation wrapper
  - `Carousel.PrevTrigger` / `Carousel.NextTrigger` — navigation buttons
- `Carousel.ItemGroup` — slide container
  - `Carousel.Item` — individual slide
- `Carousel.IndicatorGroup` — pagination wrapper
  - `Carousel.Indicator` — dot indicator

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `slideCount` | `number` | — | Total slide quantity |
| `allowMouseDrag` | `boolean` | `false` | Enable drag scrolling |
| `autoplay` | `boolean \| object` | `false` | Auto-scroll toggle (default delay 4000ms) |
| `autoSize` | `boolean` | `false` | Variable slide width support |
| `defaultPage` | `number` | `0` | Initial slide index |
| `loop` | `boolean` | `false` | Circular navigation |
| `orientation` | `"horizontal" \| "vertical"` | `horizontal` | Layout direction |
| `slidesPerPage` | `number` | `1` | Visible slides count |
| `spacing` | `string` | `0px` | Gap between slides |
| `snapType` | `string` | `mandatory` | Scroll snap behavior mode |

## Notes

- Implements the Carousel WAI-ARIA design pattern for keyboard navigation and screen reader support.
- Data attributes: `[data-scope="carousel"]`, `[data-orientation]`, `[data-part]`, `[data-current]`, `[data-inview]`, `[data-dragging]`.
- Controlled state via `page` prop and `onPageChange` handler. Programmatic control via `Carousel.Context`: `page`, `pageSnapPoints`, `isPlaying`, `isDragging`, `canScrollNext`/`canScrollPrev`, `scrollToIndex()`, `scrollNext()`, `scrollPrev()`, `play()`, `pause()`, `getProgress()`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Pagination](./pagination.md)
