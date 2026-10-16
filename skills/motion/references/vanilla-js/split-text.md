# splitText (Motion+)

`splitText()` breaks text into characters, words, and lines (wrapped in `<span>` tags) for granular text animation. Adds about 0.7kb.

## Signature / Usage

Motion+ (paid); not included in the free `motion` package. Install Motion UI first (access token requires Motion+ membership).

```
import { splitText } from "motion-plus"

const { chars } = splitText("h1")

animate(
  chars,
  { opacity: [0, 1], y: [10, 0] },
  { duration: 1, delay: stagger(0.05) }
)
```

Accepts a CSS selector or HTML Element, replaces its text content with `<span>`s, and returns `chars`, `words` and `lines` as arrays of elements.

Any animation or gesture library can use the returned elements:

```
const { words } = splitText("h1")

hover(words, (wordElement) => {
  // Hover logic
})
```

Enter animations (avoid a flash of visible text):

```
.container {
  visibility: hidden;
}
```

```
document.querySelector(".container").style.visibility = "visible"

const { words } = splitText(".container")
animate(words, { opacity: [0, 1] })
```

Custom fonts:

```
document.fonts.ready.then(() => {
  const { words } = splitText(element)

  animate(
    words,
    { y: [-10, 10] },
    { delay: stagger(0.04) }
  )
})
```

## Notes

- Motion+ members only; the source page notes the rest of its content is for members.
- Applies ARIA tags to keep text readable for all users.
- If custom fonts download after `splitText` runs, text can be split incorrectly because dimensions changed; wait for `document.fonts.ready`.
- Set the container to `visibility: hidden` until ready to animate enter effects.
- Source: https://motion.dev/docs/split-text (fetched 2026-10).

## Related

- [scramble-text](./scramble-text.md)
- [typewriter](./typewriter.md)
- [stagger](./stagger.md)
- [hover](./hover.md)
