---
source: https://tailwindcss.com/docs/text-overflow
---

# text-overflow

Utilities for controlling how the text of an element overflows.

## Signature / Usage

```html
<p class="truncate">The longest word in any of the major...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` |
| `text-ellipsis` | `text-overflow: ellipsis;` |
| `text-clip` | `text-overflow: clip;` |

## Notes

- Use the `truncate` utility to prevent text from wrapping and truncate overflowing text with an ellipsis (…) if needed.
- Use the `text-ellipsis` utility to truncate overflowing text with an ellipsis (…) if needed:

```html
<p class="overflow-hidden text-ellipsis">The longest word in any of the major...</p>
```

- Use the `text-clip` utility to truncate the text at the limit of the content area. This is the default browser behavior:

```html
<p class="overflow-hidden text-clip">The longest word in any of the major...</p>
```

- Prefix a `text-overflow` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="text-ellipsis md:text-clip ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-overflow.mdx` (fetched 2026-10-16).

## Related

- [text-wrap](./text-wrap.md)
- [white-space](./white-space.md)
