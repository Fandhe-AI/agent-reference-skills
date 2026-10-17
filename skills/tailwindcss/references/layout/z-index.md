---
source: https://tailwindcss.com/docs/z-index
---

# z-index

Utilities for controlling the stack order of an element.

## Signature / Usage

```html
<div class="z-40 ...">05</div>
<div class="z-30 ...">04</div>
<div class="z-20 ...">03</div>
<div class="z-10 ...">02</div>
<div class="z-0 ...">01</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `z-<number>` | `z-index: <number>;` |
| `z-auto` | `z-index: auto;` |
| `z-[<value>]` | `z-index: <value>;` |
| `z-(<custom-property>)` | `z-index: var(<custom-property>);` |

## Notes

- `z-<number>` utilities like `z-10` and `z-50` control the stack order of an element regardless of the order it is displayed.
- Negative values: prefix the class with a dash, e.g. `-z-10`.
- Custom value: `z-[calc(var(--index)+1)]`; `z-(--my-z)` is shorthand for `z-[var(--my-z)]`.
- Responsive: `z-0 md:z-50`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/z-index.mdx` (fetched 2026-10-16).

## Related

- [position](./position.md)
- [isolation](./isolation.md)
