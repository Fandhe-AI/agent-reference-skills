# Text animation

Overview of text animation techniques: splitting, staggering, clipped reveals, rolling labels, scramble text, typewriters, numbers and scroll-linked words.

## Signature / Usage

Split text into characters/words/lines with `splitText` (from `motion-plus`), then animate with `stagger()`:

```tsx
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"

useEffect(() => {
  const { chars } = splitText(ref.current)

  animate(
    chars,
    { opacity: 1, y: 0 },
    { delay: stagger(0.03) }
  )
}, [])
```

## Techniques

| Technique | Approach |
|-----------|----------|
| Split text | `splitText` returns `chars`, `words`, `lines` arrays of ordinary elements; original string moved to the container's `aria-label` |
| Stagger | `stagger(interval, { from })` turns an interval in seconds into a sequence of delays; `from` can be `"center"`, the end, or an index |
| Clipped container | Set `display: block` and `overflow: hidden` on each line, animate words `y: ["120%", "0%"]` |
| Rolling text hover | Stack two copies of a label in a one-line clipped container; animate first `0%` to `100%`, second `-100%` to `0%`. Motion UI `RollingTextButton` (`staggerCharacters` prop) |
| Scramble text | Cycle random characters before settling; `ScrambleText` component (`motion-plus/react`), `scrambleText` function |
| Typewriter | `Typewriter` component (`motion-plus/react`), `typewriter()` function (`motion-plus`) with `speed` |
| Number animation | `AnimateNumber` (`motion-plus/react`) with `format` (`Intl.NumberFormat` options) and `transition` |
| Reveal on scroll | `useTransform(progress, range, [0.15, 1])` per word; Motion UI `ScrollWordReveal` |

## Clipped containers

```tsx
const { lines, words } = splitText(ref.current)

lines.forEach((line) => {
  line.style.display = "block"
  line.style.overflow = "hidden"
})

animate(words, { y: ["120%", "0%"] }, { delay: stagger(0.04) })
```

## Stagger from the centre

```tsx
animate(
  chars,
  { opacity: 1 },
  { delay: stagger(0.05, { from: "center" }) }
)
```

## Scramble text and Typewriter

```tsx
import { stagger } from "motion"
import { ScrambleText } from "motion-plus/react"

<ScrambleText delay={stagger(0.05, { from: "center" })}>
  Hello world!
</ScrambleText>
```

```tsx
import { Typewriter } from "motion-plus/react"

<Typewriter speed="slow">Hello world!</Typewriter>
```

```tsx
import { typewriter } from "motion-plus"

typewriter(".typewriter", "Hello world!", { speed: "slow" })
```

## Number animation

```tsx
import { AnimateNumber } from "motion-plus/react"

<AnimateNumber format={{ style: "currency", currency: "GBP" }}>
  {price}
</AnimateNumber>
```

## Reveal on scroll

```tsx
const start = words.length === 1
  ? 0
  : (index / (words.length - 1)) * 0.8
const range = [start, start + 0.2]

const opacity = useTransform(progress, range, [0.15, 1])
```

## Notes

- `splitText`, `ScrambleText`, `scrambleText`, `Typewriter`, `typewriter`, `AnimateNumber` come from the `motion-plus` package (Motion+).
- `splitText` applies `display: inline-block` to its character, word and line spans, because CSS transforms do not apply to ordinary inline boxes. This can change final text rendering.
- When splitting on page mount, run after `document.fonts.ready` so line measurements use the intended font.
- Keep visual copies inside `aria-hidden` and put the accessible name on the button via `aria-label`, otherwise screen readers may announce a rolling label twice.
- If characters are clipped at the bottom after a clipped reveal, add bottom padding like `0.15em` with a matching negative bottom margin like `-0.15em`.
- Scramble text: update a motion value (rendered by `motion` components) instead of React `setState`.
- Typewriter and scramble text update strings via `innerText`, triggering layout recalculation each update. Use mono fonts for scramble and `contain: layout` for typewriter.
- Animate numbers as numbers and format on output; splitting a number into character spans discards useful information.
- Performance: `transform` and `opacity` are cheapest; per-character blur is a trap (many small overlapping layers are costly). Animate fewer, smaller elements and profile (Chrome Performance panel, MotionScore).
- CSS cannot target individual letters beyond `::first-letter`; text must be split into elements first.

## Related

- [hover.md](./hover.md)
- [scroll.md](./scroll.md)
- [transitions.md](./transitions.md)
- [layout.md](./layout.md)
