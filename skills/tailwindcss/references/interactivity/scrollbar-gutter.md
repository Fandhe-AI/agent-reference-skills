---
source: https://tailwindcss.com/docs/scrollbar-gutter
---

# scrollbar-gutter

Utilities for controlling the gutter space reserved for an element's scrollbar.

## Signature / Usage

```html
<div class="scrollbar-gutter-stable overflow-auto ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scrollbar-gutter-auto` | `scrollbar-gutter: auto;` |
| `scrollbar-gutter-stable` | `scrollbar-gutter: stable;` |
| `scrollbar-gutter-both` | `scrollbar-gutter: stable both-edges;` |

## Notes

- Reserving space for the scrollbar: use the `scrollbar-gutter-stable` utility to reserve space for the scrollbar even when an element isn't overflowing.
- Reserving space on both sides: use the `scrollbar-gutter-both` utility to reserve matching gutter space on both sides of the element:

```html
<div class="scrollbar-gutter-both overflow-auto ...">
  <!-- ... -->
</div>
```

- Using the default gutter: use the `scrollbar-gutter-auto` utility to only reserve gutter space when the browser would normally show a scrollbar:

```html
<div class="scrollbar-gutter-auto overflow-auto ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `scrollbar-gutter` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="scrollbar-gutter-auto md:scrollbar-gutter-stable ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scrollbar-gutter.mdx` (fetched 2026-10-16).

## Related

- [scrollbar-width](./scrollbar-width.md)
- [scrollbar-color](./scrollbar-color.md)
