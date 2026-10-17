---
source: https://tailwindcss.com/docs/list-style-position
---

# list-style-position

Utilities for controlling the position of bullets and numbers in lists.

## Signature / Usage

```html
<ul class="list-inside">
  <li>5 cups chopped Porcini mushrooms</li>
  <!-- ... -->
</ul>

<ul class="list-outside">
  <li>5 cups chopped Porcini mushrooms</li>
  <!-- ... -->
</ul>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `list-inside` | `list-style-position: inside;` |
| `list-outside` | `list-style-position: outside;` |

## Notes

- Use utilities like `list-inside` and `list-outside` to control the position of the markers and text indentation in a list.
- Responsive design: prefix a `list-style-position` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <ul class="list-outside md:list-inside ...">
    <!-- ... -->
  </ul>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/list-style-position.mdx` (fetched 2026-10-16)

## Related

- [list-style-type](./list-style-type.md)
- [list-style-image](./list-style-image.md)
