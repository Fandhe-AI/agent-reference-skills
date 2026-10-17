---
source: https://tailwindcss.com/docs/background-attachment
---

# background-attachment

Utilities for controlling how a background image behaves when scrolling.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)] bg-fixed ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-fixed` | `background-attachment: fixed;` |
| `bg-local` | `background-attachment: local;` |
| `bg-scroll` | `background-attachment: scroll;` |

## Notes

- `bg-fixed` fixes the background image relative to the viewport.
- `bg-local` scrolls the background image with the container and the viewport.
- `bg-scroll` scrolls the background image with the viewport, but not with the container.
- Responsive: prefix a `background-attachment` utility with a breakpoint variant like `md:` to apply it only at medium screen sizes and above (`bg-local md:bg-fixed`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-attachment.mdx` (fetched 2026-10-16).

```html
<div class="bg-local md:bg-fixed ...">
  <!-- ... -->
</div>
```

## Related

- [background-image](./background-image.md)
- [background-size](./background-size.md)
