---
source: https://tailwindcss.com/docs/font-style
---

# font-style

Utilities for controlling the style of text.

## Signature / Usage

```html
<p class="italic ...">The quick brown fox ...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `italic` | `font-style: italic;` |
| `not-italic` | `font-style: normal;` |

## Notes

- Use the `italic` utility to make text italic; use `not-italic` to display text normally.

  ```html
  <p class="not-italic ...">The quick brown fox ...</p>
  ```

- Responsive design: prefix a `font-style` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="italic md:not-italic ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-style.mdx` (fetched 2026-10-16)

## Related

- [font-weight](./font-weight.md)
- [font-smoothing](./font-smoothing.md)
