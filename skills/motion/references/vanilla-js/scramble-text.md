# scrambleText (Motion+)

`scrambleText()` animates text by scrambling characters, with stagger and timing controls. A 1kb function working on DOM elements or `MotionValue`s.

## Signature / Usage

Motion+ (paid); not included in the free `motion` package. Install Motion UI first (access token requires Motion+ membership).

```
import { scrambleText } from "motion-plus"

scrambleText("#title", { duration: 1 })

// With element reference
const element = document.querySelector(".text")
scrambleText(element, { duration: 1 })
```

With a `MotionValue<string>` (animates back to the value as read when the animation starts):

```
import { scrambleText } from "motion-plus-dom"
import { motionValue } from "motion"

const text = motionValue("Hello world!")

// Subscribe to changes
text.on("change", (latest) => {
  document.querySelector("#title").textContent = latest
})

scrambleText(text, { duration: 1 })
```

Stagger:

```
import { stagger } from "motion"

// Start scrambling at the same time, reveal with stagger
scrambleText(element, {
  duration: stagger(0.05, { startDelay: 1 })
})

// Chars start scrambling one-by-one, all reveal after 1s
scrambleText(element, {
  delay: stagger(0.1),
  duration: 1
})

// Direction via stagger's `from`
scrambleText(element, {
  delay: stagger(0.05, { from: "center" }),
  duration: 0.5
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `duration` | number \| stagger function | Scramble duration in seconds; a `stagger()` reveals characters one by one |
| `delay` | number \| stagger function | Delay before characters start scrambling |

## Notes

- Motion+ members only; the source page notes the rest of its content is for members. Playback controls (pause, play, stop, finish) and custom character sets (including emoji) are listed as features, but their option names are not shown in the public part of the page.
- The source page shows the import as `motion-plus` in the header and `motion-plus-dom` in the usage examples; both are as written there.
- Source: https://motion.dev/docs/scramble-text (fetched 2026-10).

## Related

- [split-text](./split-text.md)
- [typewriter](./typewriter.md)
- [stagger](./stagger.md)
- [motion-value](./motion-value.md)
