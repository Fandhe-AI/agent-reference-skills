# Carousel

A slideshow component for cycling through elements such as images or cards.

## Import

```tsx
import { Carousel } from "@chakra-ui/react"
```

## Usage

```tsx
const items = Array.from({ length: 5 })

<Carousel.Root slideCount={items.length} maxW="md" mx="auto">
  <Carousel.ItemGroup>
    {items.map((_, index) => (
      <Carousel.Item key={index} index={index}>
        <Box w="100%" h="300px" rounded="lg">{index + 1}</Box>
      </Carousel.Item>
    ))}
  </Carousel.ItemGroup>
  <Carousel.Control justifyContent="center" gap="4">
    <Carousel.PrevTrigger asChild>
      <IconButton size="xs" variant="ghost"><LuChevronLeft /></IconButton>
    </Carousel.PrevTrigger>
    <Carousel.Indicators />
    <Carousel.NextTrigger asChild>
      <IconButton size="xs" variant="ghost"><LuChevronRight /></IconButton>
    </Carousel.NextTrigger>
  </Carousel.Control>
</Carousel.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slideCount` | `number` | — | **Required.** Total number of slides |
| `page` | `number` | — | Controlled current page |
| `defaultPage` | `number` | `0` | Initial page (uncontrolled) |
| `slidesPerPage` | `number` | `1` | Number of slides visible per page |
| `slidesPerMove` | `number \| 'auto'` | `"auto"` | Number of slides to scroll per move |
| `orientation` | `'horizontal' \| 'vertical'` | `"horizontal"` | Scroll direction |
| `loop` | `boolean` | `false` | Whether to loop around |
| `autoplay` | `boolean \| { delay: number }` | `false` | Auto-advance slides |
| `allowMouseDrag` | `boolean` | `false` | Enable drag with mouse |
| `spacing` | `string` | `"0px"` | Space between items |
| `snapType` | `'proximity' \| 'mandatory'` | `"mandatory"` | Scroll snap type |
| `onPageChange` | `(details: PageChangeDetails) => void` | — | Callback when page changes |

### Carousel.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | — | **Required.** Index of this item |
| `snapAlign` | `'center' \| 'start' \| 'end'` | `"start"` | Snap alignment |

### Carousel.Indicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `index` | `number` | — | **Required.** Index of the indicator |
| `readOnly` | `boolean` | `false` | Whether the indicator is read-only |

## Notes

- `Carousel.Indicators` renders a default set of dot indicators; use `Carousel.IndicatorGroup` + `Carousel.Indicator` for custom thumbnail indicators
- `Carousel.AutoplayTrigger` controls play/pause when `autoplay` is set
- `Carousel.ProgressText` displays current page as "X / Y"
- Use `useCarouselContext()` to access carousel state from child components
- Use `useCarousel()` hook with `Carousel.RootProvider` for external control

## Related

- [Tabs](./tabs.md)
