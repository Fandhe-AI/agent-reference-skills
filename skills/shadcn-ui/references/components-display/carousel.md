---
source: https://ui.shadcn.com/docs/components/base/carousel
---

# Carousel

A carousel with motion and swipe built using Embla.

## Signature / Usage

```bash
npx shadcn@latest add carousel
```

Manual install dependency:

```bash
npm install embla-carousel-react
```

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

Options via `opts`, orientation, and API access via `setApi`:

```tsx
<Carousel opts={{ align: "start", loop: true }} orientation="vertical">
  ...
</Carousel>

const [api, setApi] = React.useState<CarouselApi>()

React.useEffect(() => {
  if (!api) {
    return
  }

  api.on("select", () => {
    setCurrent(api.selectedScrollSnap() + 1)
  })
}, [api])

<Carousel setApi={setApi}>...</Carousel>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `opts` | Embla options | Passed to Embla Carousel, e.g. `align`, `loop` |
| `orientation` | `"horizontal" \| "vertical"` | Set the orientation; the vertical example uses `"vertical"` |
| `setApi` | function | Receives the Embla `CarouselApi` instance (type exported from `@/components/ui/carousel`) |

See the [Embla Carousel docs](https://www.embla-carousel.com/api/) for props and plugins.

## Notes

- Item size uses `basis-*` classes on `CarouselItem` (e.g. `basis-1/3`, `md:basis-1/2 lg:basis-1/3`).
- Spacing uses `pl-*` on `CarouselItem` and a negative `-ml-*` on `CarouselContent`.
- The RTL section states the `direction` option accepts `"ltr"` or `"rtl"` and should match the `dir` prop; rotate the nav buttons with `rtl:rotate-180`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/carousel ; React Aria variant: https://ui.shadcn.com/docs/components/aria/carousel
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [card](./card.md)
- [aspect-ratio](./aspect-ratio.md)
