---
source: https://tailwindcss.com/docs/backdrop-filter-sepia
---

# backdrop-filter: sepia()

Utilities for applying backdrop sepia filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia-0 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-sepia ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-sepia` | `backdrop-filter: sepia(100%);` |
| `backdrop-sepia-<number>` | `backdrop-filter: sepia(<number>%);` |
| `backdrop-sepia-(<custom-property>)` | `backdrop-filter: sepia(var(<custom-property>));` |
| `backdrop-sepia-[<value>]` | `backdrop-filter: sepia(<value>);` |

## Notes

- Use utilities like `backdrop-sepia` and `backdrop-sepia-50` to control the sepia effect applied to an element's backdrop.
- Using a custom value: use the `backdrop-sepia-[<value>]` syntax to set the backdrop sepia based on a completely custom value:

```html
<div class="backdrop-sepia-[.25] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-sepia-(<custom-property>)` syntax. This is just a shorthand for `backdrop-sepia-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-sepia-(--my-backdrop-sepia) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: sepia()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-sepia md:backdrop-sepia-0 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-sepia.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
- [filter: sepia()](./filter-sepia.md)
