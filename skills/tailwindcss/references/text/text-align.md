---
source: https://tailwindcss.com/docs/text-align
---

# text-align

Utilities for controlling the alignment of text.

## Signature / Usage

```html
<p class="text-left">So I started to walk into the water...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `text-left` | `text-align: left;` |
| `text-center` | `text-align: center;` |
| `text-right` | `text-align: right;` |
| `text-justify` | `text-align: justify;` |
| `text-start` | `text-align: start;` |
| `text-end` | `text-align: end;` |

## Notes

- Use `text-left`, `text-right`, `text-center`, and `text-justify` to align the text of an element left, right, center, or justified.
- `text-start` and `text-end` use logical properties to map to either the left or right side based on the text direction:

```html
<div dir="rtl" lang="ar">
  <p class="text-end">فبدأت بالسير نحو الماء...</p>
</div>
```

- Prefix a `text-align` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="text-left md:text-center ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-align.mdx` (fetched 2026-10-16).

## Related

- [color](./color.md)
- [text-wrap](./text-wrap.md)
- [vertical-align](./vertical-align.md)
