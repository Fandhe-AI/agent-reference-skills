# Ticker (Motion+)

Infinitely-scrolling ticker and marquee effects, driven by time, drag or scroll. Clones only the minimum number of items needed for a seamless loop.

## Signature / Usage

```tsx
import { Ticker } from "motion-plus/react"

const items = [
  <span>One</span>,
  <span>Two</span>,
  <span>Three</span>
]

return <Ticker items={items} />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `items` | ReactNode[] | Mandatory. Components, strings or numbers |
| `axis` | `"x"` \| `"y"` | Defaults to horizontal; `"y"` animates vertically |
| `velocity` | number | Pixels per second. Negative reverses direction; `0` stops motion |

```tsx
<Ticker items={items} axis="y" />
<Ticker items={items} velocity={-100} />
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires Motion UI install and a Motion+ access token.
- Adds about 2.1kb on top of Motion for React. Supports reduced motion, keyboard focus-trapping and RTL.
- Can be controlled manually with a motion value for scroll-driven or draggable effects, and supports full-width overflow; the details are in the members-only part of the page and are not documented here.
- Source: https://motion.dev/docs/react-ticker (fetched 2026-10).

## Related

- [Carousel](./carousel.md)
- [motion](./motion.md)
