---
source: https://tailwindcss.com/docs/background-clip
---

# background-clip

Utilities for controlling the bounding box of an element's background.

## Signature / Usage

```html
<div class="border-4 bg-indigo-500 bg-clip-border p-3"></div>
<div class="border-4 bg-indigo-500 bg-clip-padding p-3"></div>
<div class="border-4 bg-indigo-500 bg-clip-content p-3"></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-clip-border` | `background-clip: border-box;` |
| `bg-clip-padding` | `background-clip: padding-box;` |
| `bg-clip-content` | `background-clip: content-box;` |
| `bg-clip-text` | `background-clip: text;` |

## Notes

- `bg-clip-text` crops an element's background to match the shape of the text; pair it with `text-transparent` and a gradient.
- Responsive: prefix with a breakpoint variant like `md:` (`bg-clip-border md:bg-clip-padding`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-clip.mdx` (fetched 2026-10-16).

```html
<p class="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent ...">
  Hello world
</p>
```

## Related

- [background-color](./background-color.md)
- [background-image](./background-image.md)
- [background-origin](./background-origin.md)
