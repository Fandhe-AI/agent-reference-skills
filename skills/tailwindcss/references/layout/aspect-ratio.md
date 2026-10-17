---
source: https://tailwindcss.com/docs/aspect-ratio
---

# aspect-ratio

Utilities for controlling the aspect ratio of an element.

## Signature / Usage

```html
<img class="aspect-3/2 object-cover ..." src="/img/villas.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `aspect-<ratio>` | `aspect-ratio: <ratio>;` |
| `aspect-square` | `aspect-ratio: 1 / 1;` |
| `aspect-video` | `aspect-ratio: var(--aspect-video); /* 16 / 9 */` |
| `aspect-auto` | `aspect-ratio: auto;` |
| `aspect-(<custom-property>)` | `aspect-ratio: var(<custom-property>);` |
| `aspect-[<value>]` | `aspect-ratio: <value>;` |

## Notes

- Use `aspect-video` to give a video element (e.g. `iframe`) a 16 / 9 aspect ratio: `<iframe class="aspect-video ..." src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>`.
- Custom value: `aspect-[calc(4*3+1)/3]`; CSS variable shorthand `aspect-(--my-aspect-ratio)` is shorthand for `aspect-[var(--my-aspect-ratio)]`.
- Responsive: prefix with a breakpoint variant, e.g. `aspect-video md:aspect-square`.
- Theme: customize with `--aspect-*` theme variables, e.g. `@theme { --aspect-retro: 4 / 3; }` then use `aspect-retro`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/aspect-ratio.mdx` (fetched 2026-10-16).

## Related

- [object-fit](./object-fit.md)
- [width](../spacing-sizing/width.md)
