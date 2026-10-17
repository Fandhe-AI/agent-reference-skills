---
source: https://tailwindcss.com/docs/backdrop-filter-opacity
---

# backdrop-filter: opacity()

Utilities for applying backdrop opacity filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-10 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-60 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert backdrop-opacity-95 ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-opacity-<number>` | `backdrop-filter: opacity(<number>%);` |
| `backdrop-opacity-(<custom-property>)` | `backdrop-filter: opacity(var(<custom-property>));` |
| `backdrop-opacity-[<value>]` | `backdrop-filter: opacity(<value>);` |

## Notes

- Use utilities like `backdrop-opacity-50` and `backdrop-opacity-75` to control the opacity of all the backdrop filters applied to an element.
- Using a custom value: use the `backdrop-opacity-[<value>]` syntax to set the backdrop filter opacity based on a completely custom value:

```html
<div class="backdrop-opacity-[.15] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-opacity-(<custom-property>)` syntax. This is just a shorthand for `backdrop-opacity-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-opacity-(--my-backdrop-filter-opacity) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: opacity()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-opacity-100 md:backdrop-opacity-60 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-opacity.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
