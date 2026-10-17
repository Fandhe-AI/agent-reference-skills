---
source: https://tailwindcss.com/docs/stroke-width
---

# stroke-width

Utilities for styling the stroke width of SVG elements.

## Signature / Usage

```html
<svg class="stroke-1 ..."></svg>
<svg class="stroke-2 ..."></svg>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `stroke-<number>` | `stroke-width: <number>;` |
| `stroke-(length:<custom-property>)` | `stroke-width: var(<custom-property>);` |
| `stroke-[<value>]` | `stroke-width: <value>;` |

## Notes

- Basic example: use `stroke-<number>` utilities like `stroke-1` and `stroke-2` to set the stroke width of an SVG. This can be useful for styling icon sets like Heroicons.
- Using a custom value: use the `stroke-[<value>]` syntax to set the stroke width based on a completely custom value:

```html
<svg class="stroke-[1.5] ...">
  <!-- ... -->
</svg>
```

- For CSS variables, you can also use the `stroke-(length:<custom-property>)` syntax (shorthand for `stroke-[length:var(<custom-property>)]` that adds the `var()` function for you automatically):

```html
<svg class="stroke-(length:--my-stroke-width) ...">
  <!-- ... -->
</svg>
```

- The `length:` data type hint disambiguates this utility from the color utility `stroke-<color>` (see stroke), which shares the `stroke-` prefix.
- Responsive design: prefix a `stroke-width` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="stroke-1 md:stroke-2 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/stroke-width.mdx` (fetched 2026-10-16).

## Related

- [stroke](./stroke.md)
- [fill](./fill.md)
