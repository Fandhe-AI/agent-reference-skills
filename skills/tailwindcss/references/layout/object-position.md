---
source: https://tailwindcss.com/docs/object-position
---

# object-position

Utilities for controlling how a replaced element's content should be positioned within its container.

## Signature / Usage

```html
<img class="size-24 object-top-left ..." src="/img/mountains.jpg" />
<img class="size-24 object-top ..." src="/img/mountains.jpg" />
<img class="size-24 object-top-right ..." src="/img/mountains.jpg" />
<img class="size-24 object-left ..." src="/img/mountains.jpg" />
<img class="size-24 object-center ..." src="/img/mountains.jpg" />
<img class="size-24 object-right ..." src="/img/mountains.jpg" />
<img class="size-24 object-bottom-left ..." src="/img/mountains.jpg" />
<img class="size-24 object-bottom ..." src="/img/mountains.jpg" />
<img class="size-24 object-bottom-right ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `object-top-left` | `object-position: top left;` |
| `object-top` | `object-position: top;` |
| `object-top-right` | `object-position: top right;` |
| `object-left` | `object-position: left;` |
| `object-center` | `object-position: center;` |
| `object-right` | `object-position: right;` |
| `object-bottom-left` | `object-position: bottom left;` |
| `object-bottom` | `object-position: bottom;` |
| `object-bottom-right` | `object-position: bottom right;` |
| `object-(<custom-property>)` | `object-position: var(<custom-property>);` |
| `object-[<value>]` | `object-position: <value>;` |

## Notes

- Custom value: `object-[25%_75%]`; `object-(--my-object)` is shorthand for `object-[var(--my-object)]`.
- Responsive: `object-center md:object-top`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/object-position.mdx` (fetched 2026-10-16).

## Related

- [object-fit](./object-fit.md)
