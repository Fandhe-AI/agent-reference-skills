---
source: https://tailwindcss.com/docs/backdrop-filter
---

# backdrop-filter

Utilities for applying backdrop filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)] ...">
  <div class="backdrop-blur-xs ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)] ...">
  <div class="backdrop-grayscale ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)] ...">
  <div class="backdrop-blur-xs backdrop-grayscale ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-filter-none` | `backdrop-filter: none;` |
| `backdrop-filter-(<custom-property>)` | `backdrop-filter: var(<custom-property>);` |
| `backdrop-filter-[<value>]` | `backdrop-filter: <value>;` |

## Notes

- Use utilities like `backdrop-blur-xs` and `backdrop-grayscale` to apply filters to an element's backdrop. You can combine the following backdrop filter utilities: blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia.
- Removing filters: use the `backdrop-filter-none` utility to remove all of the backdrop filters applied to an element:

```html
<div class="backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none"></div>
```

- Using a custom value: use the `backdrop-filter-[<value>]` syntax to set the backdrop filter based on a completely custom value:

```html
<div class="backdrop-filter-[url('filters.svg#filter-id')] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-filter-(<custom-property>)` syntax. This is just a shorthand for `backdrop-filter-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-filter-(--my-backdrop-filter) ...">
  <!-- ... -->
</div>
```

- Applying on hover: prefix a `backdrop-filter` utility with a variant like `hover:*` to only apply the utility in that state:

```html
<div class="backdrop-blur-sm hover:backdrop-filter-none ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-blur-sm md:backdrop-filter-none ...">
  <!-- ... -->
</div>
```

- Learn more about using variants in the variants documentation (`../core-concepts/hover-focus-and-other-states.md`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter.mdx` (fetched 2026-10-16)

## Related

- [filter](./filter.md)
- [backdrop-filter: blur()](./backdrop-filter-blur.md)
- [backdrop-filter: brightness()](./backdrop-filter-brightness.md)
- [backdrop-filter: contrast()](./backdrop-filter-contrast.md)
- [backdrop-filter: grayscale()](./backdrop-filter-grayscale.md)
- [backdrop-filter: hue-rotate()](./backdrop-filter-hue-rotate.md)
- [backdrop-filter: invert()](./backdrop-filter-invert.md)
- [backdrop-filter: opacity()](./backdrop-filter-opacity.md)
- [backdrop-filter: saturate()](./backdrop-filter-saturate.md)
- [backdrop-filter: sepia()](./backdrop-filter-sepia.md)
