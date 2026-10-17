---
source: https://tailwindcss.com/docs/box-decoration-break
---

# box-decoration-break

Utilities for controlling how element fragments should be rendered across multiple lines, columns, or pages.

## Signature / Usage

```html
<span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">
  Hello<br />World
</span>
<span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">
  Hello<br />World
</span>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `box-decoration-clone` | `box-decoration-break: clone;` |
| `box-decoration-slice` | `box-decoration-break: slice;` |

## Notes

- `box-decoration-slice` and `box-decoration-clone` control whether properties like background, border, border-image, box-shadow, clip-path, margin, and padding are rendered as if the element were one continuous fragment, or distinct blocks.
- Responsive: `box-decoration-clone md:box-decoration-slice`.
- Migration (v3 → v4): renamed from `decoration-slice` / `decoration-clone` (v3) to `box-decoration-slice` / `box-decoration-clone` (v4), per the upgrade guide's removed-deprecated-utilities table.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/box-decoration-break.mdx` (fetched 2026-10-16).

## Related

- [box-sizing](./box-sizing.md)
- [display](./display.md)
