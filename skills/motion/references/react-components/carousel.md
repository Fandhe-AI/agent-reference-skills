# Carousel (Motion+)

Performant, accessible and infinitely scrollable carousel for React, with pointer, wheel and keyboard navigation out of the box.

## Signature / Usage

```tsx
import { Carousel } from "motion-plus/react"

const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Carousel items={items} />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `items` | ReactNode[] | Mandatory. Components, strings or numbers |
| `axis` | `"x"` \| `"y"` | Scroll direction. Defaults to horizontal; `"y"` makes it vertical |
| `gap` | number | Spacing between items (items are laid out via flexbox) |
| `align` | string | Off-axis alignment of items, e.g. `"start"` |
| `overflow` | boolean | When `true`, items visually extend out of the container to the viewport edges |

```tsx
<Carousel items={items} gap={0} align="start" />
<Carousel items={items} overflow />
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires Motion UI install and a Motion+ access token.
- Adds about 5.5kb on top of the `motion` component. Automatic ARIA labels, respects reduced motion, supports RTL.
- Uses the same rendering as Ticker to scroll infinitely while minimising item cloning.
- Provides functions and state for custom controls and pagination; those parts of the page are for Motion+ members and not documented here.

## Related

- [Ticker](./ticker.md)
- [motion](./motion.md)
