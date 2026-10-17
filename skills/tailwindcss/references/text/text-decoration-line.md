---
source: https://tailwindcss.com/docs/text-decoration-line
---

# text-decoration-line

Utilities for controlling the decoration of text.

## Signature / Usage

```html
<p class="underline">The quick brown fox...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `underline` | `text-decoration-line: underline;` |
| `overline` | `text-decoration-line: overline;` |
| `line-through` | `text-decoration-line: line-through;` |
| `no-underline` | `text-decoration-line: none;` |

## Notes

- `underline` adds an underline, `overline` adds an overline, `line-through` adds a line through the text, and `no-underline` removes a line from the text.
- Prefix a `text-decoration-line` utility with a variant like `hover:*` to only apply the utility in that state:

```html
<p>The <a href="..." class="no-underline hover:underline ...">quick brown fox</a> jumps over the lazy dog.</p>
```

- Prefix a `text-decoration-line` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<a class="no-underline md:underline ..." href="...">
  <!-- ... -->
</a>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-decoration-line.mdx` (fetched 2026-10-16).

## Related

- [text-decoration-color](./text-decoration-color.md)
- [text-decoration-style](./text-decoration-style.md)
- [text-decoration-thickness](./text-decoration-thickness.md)
- [text-underline-offset](./text-underline-offset.md)
- [hover-focus-and-other-states](../core-concepts/hover-focus-and-other-states.md)
