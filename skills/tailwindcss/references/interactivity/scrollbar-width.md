---
source: https://tailwindcss.com/docs/scrollbar-width
---

# scrollbar-width

Utilities for controlling the width of an element's scrollbar.

## Signature / Usage

```html
<div class="scrollbar-thin overflow-auto ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scrollbar-auto` | `scrollbar-width: auto;` |
| `scrollbar-thin` | `scrollbar-width: thin;` |
| `scrollbar-none` | `scrollbar-width: none;` |

## Notes

- Using the default scrollbar width: use the `scrollbar-auto` utility to use the browser's default scrollbar width:

```html
<div class="scrollbar-auto overflow-auto ...">
  <!-- ... -->
</div>
```

- Using a thin scrollbar: use the `scrollbar-thin` utility to use a thinner scrollbar.
- Hiding scrollbars: use the `scrollbar-none` utility to hide scrollbars while still allowing an element to scroll:

```html
<div class="scrollbar-none overflow-auto ...">
  <!-- ... -->
</div>
```

- These utilities only support the browser keywords `auto`, `thin`, and `none`.
- Responsive design: prefix a `scrollbar-width` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="scrollbar-none md:scrollbar-auto ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scrollbar-width.mdx` (fetched 2026-10-16).

## Related

- [scrollbar-color](./scrollbar-color.md)
- [scrollbar-gutter](./scrollbar-gutter.md)
