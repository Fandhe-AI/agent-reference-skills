---
source: https://tailwindcss.com/docs/list-style-image
---

# list-style-image

Utilities for controlling the marker images for list items.

## Signature / Usage

```html
<ul class="list-image-[url(/img/checkmark.png)]">
  <li>5 cups chopped Porcini mushrooms</li>
  <!-- ... -->
</ul>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `list-image-[<value>]` | `list-style-image: <value>;` |
| `list-image-(<custom-property>)` | `list-style-image: var(<custom-property>);` |
| `list-image-none` | `list-style-image: none;` |

## Notes

- Use the `list-image-[<value>]` syntax to control the marker image for list items.
- Using a CSS variable: use the `list-image-(<custom-property>)` syntax; it is just a shorthand for `list-image-[var(<custom-property>)]` that adds the `var()` function for you automatically.

  ```html
  <ul class="list-image-(--my-list-image)">
    <!-- ... -->
  </ul>
  ```

- Removing a marker image: use the `list-image-none` utility.

  ```html
  <ul class="list-image-none">
    <!-- ... -->
  </ul>
  ```

- Responsive design: prefix a `list-style-image` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <ul class="list-image-none md:list-image-[url(/img/checkmark.png)] ...">
    <!-- ... -->
  </ul>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/list-style-image.mdx` (fetched 2026-10-16)

## Related

- [list-style-type](./list-style-type.md)
- [list-style-position](./list-style-position.md)
