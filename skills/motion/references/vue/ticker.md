# Ticker

Motion+ component for infinitely-scrolling marquee-style animations, cloning only the elements needed for the current viewport.

## Signature / Usage

```bash
npm install motion-plus-vue
```

```ts
import { Ticker } from "motion-plus-vue"
```

## Notes

- Not included in the free `motion-v` package; installed from `motion-plus-vue`.
- Requires a Motion+ subscription; adds approximately 2.6kb.
- Supports both horizontal and vertical scrolling.
- Includes focus trapping and respects OS reduced-motion preferences.
- Uses velocity-based motion by default but accepts custom motion values.
- Powered by `<motion>` components; drive the ticker offset with motion values for scroll-driven or draggable tickers.

## Related

- [carousel](./carousel.md)
- [motion](./motion.md)
- [motion-value](./motion-value.md)
