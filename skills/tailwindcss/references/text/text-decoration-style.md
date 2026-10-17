---
source: https://tailwindcss.com/docs/text-decoration-style
---

# text-decoration-style

Utilities for controlling the style of text decorations.

## Signature / Usage

```html
<p class="underline decoration-solid">The quick brown fox...</p>
<p class="underline decoration-double">The quick brown fox...</p>
<p class="underline decoration-dotted">The quick brown fox...</p>
<p class="underline decoration-dashed">The quick brown fox...</p>
<p class="underline decoration-wavy">The quick brown fox...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `decoration-solid` | `text-decoration-style: solid;` |
| `decoration-double` | `text-decoration-style: double;` |
| `decoration-dotted` | `text-decoration-style: dotted;` |
| `decoration-dashed` | `text-decoration-style: dashed;` |
| `decoration-wavy` | `text-decoration-style: wavy;` |

## Notes

- Use utilities like `decoration-dotted` and `decoration-dashed` to change the text decoration style of an element.
- Prefix a `text-decoration-style` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="underline md:decoration-dashed ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-decoration-style.mdx` (fetched 2026-10-16).

## Related

- [text-decoration-line](./text-decoration-line.md)
- [text-decoration-color](./text-decoration-color.md)
- [text-decoration-thickness](./text-decoration-thickness.md)
