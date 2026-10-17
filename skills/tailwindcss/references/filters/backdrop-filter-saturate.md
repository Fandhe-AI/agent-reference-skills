---
source: https://tailwindcss.com/docs/backdrop-filter-saturate
---

# backdrop-filter: saturate()

Utilities for applying backdrop saturation filters to an element.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-50 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-125 ..."></div>
</div>
<div class="bg-[url(/img/mountains.jpg)]">
  <div class="bg-white/30 backdrop-saturate-200 ..."></div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `backdrop-saturate-<number>` | `backdrop-filter: saturate(<number>%);` |
| `backdrop-saturate-(<custom-property>)` | `backdrop-filter: saturate(var(<custom-property>));` |
| `backdrop-saturate-[<value>]` | `backdrop-filter: saturate(<value>);` |

## Notes

- Use utilities like `backdrop-saturate-50` and `backdrop-saturate-100` to control the saturation of an element's backdrop.
- Using a custom value: use the `backdrop-saturate-[<value>]` syntax to set the backdrop saturation based on a completely custom value:

```html
<div class="backdrop-saturate-[.25] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `backdrop-saturate-(<custom-property>)` syntax. This is just a shorthand for `backdrop-saturate-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="backdrop-saturate-(--my-backdrop-saturation) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `backdrop-filter: saturate()` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="backdrop-saturate-50 md:backdrop-saturate-150 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/backdrop-filter-saturate.mdx` (fetched 2026-10-16)

## Related

- [backdrop-filter](./backdrop-filter.md)
- [filter: saturate()](./filter-saturate.md)
