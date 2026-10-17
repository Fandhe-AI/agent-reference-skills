---
source: https://tailwindcss.com/docs/transform-origin
---

# transform-origin

Utilities for specifying the origin for an element's transformations.

## Signature / Usage

```html
<img class="origin-center rotate-45 ..." src="/img/mountains.jpg" />
<img class="origin-top-left rotate-12 ..." src="/img/mountains.jpg" />
<img class="origin-bottom -rotate-12 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `origin-center` | `transform-origin: center;` |
| `origin-top` | `transform-origin: top;` |
| `origin-top-right` | `transform-origin: top right;` |
| `origin-right` | `transform-origin: right;` |
| `origin-bottom-right` | `transform-origin: bottom right;` |
| `origin-bottom` | `transform-origin: bottom;` |
| `origin-bottom-left` | `transform-origin: bottom left;` |
| `origin-left` | `transform-origin: left;` |
| `origin-top-left` | `transform-origin: top left;` |
| `origin-(<custom-property>)` | `transform-origin: var(<custom-property>);` |
| `origin-[<value>]` | `transform-origin: <value>;` |

## Notes

- Use utilities like `origin-top` and `origin-bottom-left` to set an element's transform origin.
- Custom value: use `origin-[<value>]`; for CSS variables use `origin-(<custom-property>)`, shorthand for `origin-[var(<custom-property>)]`.

```html
<img class="origin-[33%_75%] ..." src="/img/mountains.jpg" />
<img class="origin-(--my-transform-origin) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<img class="origin-center md:origin-top ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transform-origin.mdx` (fetched 2026-10-16).

## Related

- [perspective-origin](./perspective-origin.md)
- [rotate](./rotate.md)
- [scale](./scale.md)
