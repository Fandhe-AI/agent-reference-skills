---
source: https://tailwindcss.com/docs/skew
---

# skew

Utilities for skewing elements with transform.

## Signature / Usage

```html
<img class="skew-3 ..." src="/img/mountains.jpg" />
<img class="skew-6 ..." src="/img/mountains.jpg" />
<img class="skew-12 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `skew-<number>` | `transform: skewX(<number>deg) skewY(<number>deg);` |
| `-skew-<number>` | `transform: skewX(-<number>deg) skewY(-<number>deg);` |
| `skew-(<custom-property>)` | `transform: skewX(var(<custom-property>)) skewY(var(<custom-property>));` |
| `skew-[<value>]` | `transform: skewX(<value>) skewY(<value>);` |
| `skew-x-<number>` | `transform: skewX(<number>deg);` |
| `-skew-x-<number>` | `transform: skewX(-<number>deg);` |
| `skew-x-(<custom-property>)` | `transform: skewX(var(<custom-property>));` |
| `skew-x-[<value>]` | `transform: skewX(<value>);` |
| `skew-y-<number>` | `transform: skewY(<number>deg);` |
| `-skew-y-<number>` | `transform: skewY(-<number>deg);` |
| `skew-y-(<custom-property>)` | `transform: skewY(var(<custom-property>));` |
| `skew-y-[<value>]` | `transform: skewY(<value>);` |

## Notes

- Use `skew-<number>` utilities like `skew-4` and `skew-10` to skew an element on both axes; `-skew-<number>` (e.g. `-skew-4`, `-skew-10`) for negative values.
- Use `skew-x-<number>` (e.g. `skew-x-4`, `-skew-x-10`) to skew on the x-axis and `skew-y-<number>` (e.g. `skew-y-4`, `-skew-y-10`) on the y-axis.
- The source table lists some `skew-x-*` / `skew-x-[<value>]` rows with an extra closing parenthesis (`skewX(<number>deg));`); the CSS above is written with balanced parentheses.
- Custom value: use `skew-[<value>]`; for CSS variables use `skew-(<custom-property>)`, shorthand for `skew-[var(<custom-property>)]`.

```html
<img class="skew-[3.142rad] ..." src="/img/mountains.jpg" />
<img class="skew-(--my-skew) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix `skewX()` and `skewY()` utilities with a breakpoint variant like `md:`:

```html
<img class="skew-3 md:skew-12 ..." src="/img/mountains.jpg" />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/skew.mdx` (fetched 2026-10-16).

## Related

- [rotate](./rotate.md)
- [scale](./scale.md)
- [translate](./translate.md)
- [transform](./transform.md)
