---
source: https://tailwindcss.com/docs/text-transform
---

# text-transform

Utilities for controlling the capitalization of text.

## Signature / Usage

```html
<p class="uppercase">The quick brown fox ...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `uppercase` | `text-transform: uppercase;` |
| `lowercase` | `text-transform: lowercase;` |
| `capitalize` | `text-transform: capitalize;` |
| `normal-case` | `text-transform: none;` |

## Notes

- `uppercase`, `lowercase`, and `capitalize` uppercase, lowercase, or capitalize the text of an element.
- Use the `normal-case` utility to preserve the original text casing of an element, typically used to reset capitalization at different breakpoints:

```html
<p class="normal-case">The quick brown fox ...</p>
```

- Prefix a `text-transform` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="capitalize md:uppercase ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-transform.mdx` (fetched 2026-10-16).

## Related

- [text-align](./text-align.md)
- [text-overflow](./text-overflow.md)
