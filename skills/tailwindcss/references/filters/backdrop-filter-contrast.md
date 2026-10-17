---
source: https://tailwindcss.com/docs/backdrop-filter-contrast
---

# backdrop-filter: contrast()

Utilities for applying backdrop contrast filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-contrast-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-contrast-200 ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-contrast-<number>` | `backdrop-filter: contrast(<number>%);` |
| `backdrop-contrast-(<custom-property>)` | `backdrop-filter: contrast(var(<custom-property>));` |
| `backdrop-contrast-[<value>]` | `backdrop-filter: contrast(<value>);` |

## Notes

- Use utilities like `backdrop-contrast-50` and `backdrop-contrast-100` to control an element's backdrop contrast.
- Using a custom value: use the `backdrop-contrast-[<value>]` syntax to set the backdrop contrast based on a completely custom value:

```html
<div class="backdrop-contrast-[.25] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-contrast-(<custom-property>)` syntax. This is just a shorthand for `backdrop-contrast-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-contrast-(--my-backdrop-contrast) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: contrast()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-contrast-125 md:backdrop-contrast-150 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-contrast.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
- [filter: contrast()](./filter-contrast.md)
