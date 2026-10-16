# CSS spring generation

Generate spring animations as CSS, on the server or in the browser (React Server Components, Astro, Vue, CSS-in-JS).

## Signature / Usage

```
import { spring } from "motion"

transition: transform ${spring(0.5, 0.2)};

// Outputs:
// transition: transform 800ms linear(...)
```

`spring` has a `toString()` method that returns the spring as a CSS duration and easing, and a `spring(visualDuration, bounce)` shorthand.

`visualDuration` is the time the animation takes to first reach its target, not including the "bouncy bit", so it coordinates with other transitions:

```
transition:
  opacity 0.5s ease-out,
  transform ${spring(0.5, 0.2)};
```

React Server Components:

```
<div style={{ transition: "all " + spring() }}>

<style>{`
  button:hover {
    transition: transform ${spring(0.8, 0)};
    transform: scale(1.2);
  }
`}</style>
```

`style` attribute at runtime:

```
const element = document.querySelector("button")

element.style.transition = "transform " + spring(0.3)
element.style.transform = "scale(1.2)"
```

Styled Components / Tamagui:

```
const Button = styled.button`
  transition: opacity ${spring(0.5)};
`

export const RoundedSquare = styled(View, {
  transition: "opacity " + spring(0.5)
})
```

Astro:

```
<style define:vars={{ spring: spring(0.2, 0) }}>
  span {
    transition: transform var(--spring);
  }
</style>
```

Vue:

```
const springTransition = ref(spring(0.3, 1))
```

```
<div :style="{ transition: 'filter ' + springTransition }"></div>
```

Fallback (a second, earlier `transition` for browsers without `linear()`):

```
transition: filter 0.3s ease-out;
transition: filter ${spring(0.3)};
```

## Notes

- Browsers without the `linear()` easing function ignore the animation; use a fallback `transition` where the CSS generator supports it (setting via `style` may not).
- The generated duration can be longer than the one provided because `spring()` accepts `visualDuration`.
- Server-side generation (RSC) has no runtime overhead.
- The Motion AI Kit lets AI code editors generate CSS springs without importing any library.
- Source: https://motion.dev/docs/css (fetched 2026-10).

## Related

- [spring](./spring.md)
- [tween](./tween.md)
- [animate](./animate.md)
