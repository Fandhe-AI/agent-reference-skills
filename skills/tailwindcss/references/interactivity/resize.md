---
source: https://tailwindcss.com/docs/resize
---

# resize

Utilities for controlling how an element can be resized.

## Signature / Usage

```html
<textarea class="resize rounded-md ..."></textarea>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `resize-none` | `resize: none;` |
| `resize` | `resize: both;` |
| `resize-y` | `resize: vertical;` |
| `resize-x` | `resize: horizontal;` |

## Notes

- Resizing in all directions: use `resize` to make an element horizontally and vertically resizable.
- Resizing vertically: use `resize-y` to make an element vertically resizable:

```html
<textarea class="resize-y rounded-md ..."></textarea>
```

- Resizing horizontally: use `resize-x` to make an element horizontally resizable:

```html
<textarea class="resize-x rounded-md ..."></textarea>
```

- Prevent resizing: use `resize-none` to prevent an element from being resizable:

```html
<textarea class="resize-none rounded-md"></textarea>
```

- Responsive design: prefix a `resize` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="resize-none md:resize ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/resize.mdx` (fetched 2026-10-16).

## Related

- [field-sizing](./field-sizing.md)
- [appearance](./appearance.md)
