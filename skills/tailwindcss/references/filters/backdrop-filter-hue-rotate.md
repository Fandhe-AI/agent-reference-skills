---
source: https://tailwindcss.com/docs/backdrop-filter-hue-rotate
---

# backdrop-filter: hue-rotate()

Utilities for applying backdrop hue-rotate filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-90 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-180 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-hue-rotate-270 ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-hue-rotate-<number>` | `backdrop-filter: hue-rotate(<number>deg);` |
| `-backdrop-hue-rotate-<number>` | `backdrop-filter: hue-rotate(calc(<number>deg * -1));` |
| `backdrop-hue-rotate-(<custom-property>)` | `backdrop-filter: hue-rotate(var(<custom-property>));` |
| `backdrop-hue-rotate-[<value>]` | `backdrop-filter: hue-rotate(<value>);` |

## Notes

- Use utilities like `backdrop-hue-rotate-90` and `backdrop-hue-rotate-180` to rotate the hue of an element's backdrop.
- Using negative values: use utilities like `-backdrop-hue-rotate-90` and `-backdrop-hue-rotate-180` to set a negative backdrop hue rotation value:

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 -backdrop-hue-rotate-15 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 -backdrop-hue-rotate-45 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 -backdrop-hue-rotate-90 ..."></div>
</div>
```

- Using a custom value: use the `backdrop-hue-rotate-[<value>]` syntax to set the backdrop hue rotation based on a completely custom value:

```html
<div class="backdrop-hue-rotate-[3.142rad] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-hue-rotate-(<custom-property>)` syntax. This is just a shorthand for `backdrop-hue-rotate-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-hue-rotate-(--my-backdrop-hue-rotation) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: hue-rotate()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-hue-rotate-15 md:backdrop-hue-rotate-0 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-hue-rotate.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
- [filter: hue-rotate()](./filter-hue-rotate.md)
