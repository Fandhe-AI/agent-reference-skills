---
source: https://tailwindcss.com/docs/backdrop-filter-invert
---

# backdrop-filter: invert()

Utilities for applying backdrop invert filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert-0 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert-65 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-invert ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-invert` | `backdrop-filter: invert(100%);` |
| `backdrop-invert-<number>` | `backdrop-filter: invert(<number>%);` |
| `backdrop-invert-(<custom-property>)` | `backdrop-filter: invert(var(<custom-property>))` |
| `backdrop-invert-[<value>]` | `backdrop-filter: invert(<value>);` |

## Notes

- Use utilities like `backdrop-invert` and `backdrop-invert-65` to control the color inversion of an element's backdrop.
- Using a custom value: use the `backdrop-invert-[<value>]` syntax to set the backdrop inversion based on a completely custom value:

```html
<div class="backdrop-invert-[.25] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-invert-(<custom-property>)` syntax. This is just a shorthand for `backdrop-invert-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-invert-(--my-backdrop-inversion) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: invert()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-invert-0 md:backdrop-invert ...">
  <!-- ... -->
</div>
```

- The `backdrop-invert-(<custom-property>)` row in the source API table omits the trailing semicolon; transcribed verbatim.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-invert.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
- [filter: invert()](./filter-invert.md)
