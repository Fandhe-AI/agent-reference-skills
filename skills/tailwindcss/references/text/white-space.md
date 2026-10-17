---
source: https://tailwindcss.com/docs/white-space
---

# white-space

Utilities for controlling an element's white-space property.

## Signature / Usage

```html
<p class="whitespace-pre-line">Hey everyone!

It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.

You will never know.</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `whitespace-normal` | `white-space: normal;` |
| `whitespace-nowrap` | `white-space: nowrap;` |
| `whitespace-pre` | `white-space: pre;` |
| `whitespace-pre-line` | `white-space: pre-line;` |
| `whitespace-pre-wrap` | `white-space: pre-wrap;` |
| `whitespace-break-spaces` | `white-space: break-spaces;` |

## Notes

- `whitespace-normal` causes text to wrap normally within an element. Newlines and spaces will be collapsed.
- `whitespace-nowrap` prevents text from wrapping within an element. Newlines and spaces will be collapsed.
- `whitespace-pre` preserves newlines and spaces within an element. Text will not be wrapped.
- `whitespace-pre-line` preserves newlines but not spaces within an element. Text will be wrapped normally.
- `whitespace-pre-wrap` preserves newlines and spaces within an element. Text will be wrapped normally.
- `whitespace-break-spaces` preserves newlines and spaces within an element. White space at the end of lines will not hang, but will wrap to the next line.
- The source examples for `whitespace-nowrap` and `whitespace-pre` add `overflow-auto` to the element:

```html
<p class="overflow-auto whitespace-nowrap">Hey everyone!...</p>
```

- Prefix a `white-space` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="whitespace-pre md:whitespace-normal ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/white-space.mdx` (fetched 2026-10-16).

## Related

- [text-wrap](./text-wrap.md)
- [text-overflow](./text-overflow.md)
- [word-break](./word-break.md)
