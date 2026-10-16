# AnimateNumber (Motion+)

Lightweight (2.5kb) React component for number ticker and countdown animations (counters, dynamic pricing, countdowns). Built on Motion's layout animations.

## Signature / Usage

```tsx
import { AnimateNumber } from "motion-plus/react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <AnimateNumber>{count}</AnimateNumber>
    </>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` | number | Single child, a number. Animates to the latest value when it changes |
| `transition` | Motion transition options | Accepts value-specific settings for `layout`, `y` and `opacity` |

```tsx
<AnimateNumber transition={{
  layout: { duration: 0.3 },
  opacity: { ease: "linear" },
  y: { type: "spring", visualDuration: 0.4, bounce: 0.2 }
}}>
```

## Notes

- Motion+ (paid) component; not included in the free `motion` package. Requires installing Motion UI and a Motion+ access token.
- Import from `"motion-plus/react"`.
- Uses the built-in `Intl.NumberFormat` for locale-aware formatting (e.g. currency, compact notation), and exposes distinct CSS classes for prefix, integer, fraction and suffix parts.
- The source material only covers the public part of the page; the remainder (formatting props, class names) is for Motion+ members and is not documented here.

## Related

- [motion](./motion.md)
