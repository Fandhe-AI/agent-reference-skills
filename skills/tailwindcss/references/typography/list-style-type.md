---
source: https://tailwindcss.com/docs/list-style-type
---

# list-style-type

Utilities for controlling the marker style of a list.

## Signature / Usage

```html
<ul class="list-disc">
  <li>Now this is a story all about how, my life got flipped-turned upside down</li>
  <!-- ... -->
</ul>

<ol class="list-decimal">
  <li>Now this is a story all about how, my life got flipped-turned upside down</li>
  <!-- ... -->
</ol>

<ul class="list-none">
  <li>Now this is a story all about how, my life got flipped-turned upside down</li>
  <!-- ... -->
</ul>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `list-disc` | `list-style-type: disc;` |
| `list-decimal` | `list-style-type: decimal;` |
| `list-none` | `list-style-type: none;` |
| `list-(<custom-property>)` | `list-style-type: var(<custom-property>);` |
| `list-[<value>]` | `list-style-type: <value>;` |

## Notes

- Custom value: use the `list-[<value>]` syntax to set the marker based on a completely custom value.

  ```html
  <ol class="list-[upper-roman] ...">
    <!-- ... -->
  </ol>
  ```

- For CSS variables, use the `list-(<custom-property>)` syntax; it is a shorthand for `list-[var(<custom-property>)]` that adds the `var()` function automatically.

  ```html
  <ol class="list-(--my-marker) ...">
    <!-- ... -->
  </ol>
  ```

- Responsive design: prefix a `list-style-type` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <ul class="list-none md:list-disc ...">
    <!-- ... -->
  </ul>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/list-style-type.mdx` (fetched 2026-10-16)

## Related

- [list-style-position](./list-style-position.md)
- [list-style-image](./list-style-image.md)
