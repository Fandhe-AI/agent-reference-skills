---
source: https://tailwindcss.com/docs/font-smoothing
---

# font-smoothing

Utilities for controlling the font smoothing of an element.

## Signature / Usage

```html
<p class="antialiased ...">The quick brown fox ...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `antialiased` | `-webkit-font-smoothing: antialiased;` `-moz-osx-font-smoothing: grayscale;` |
| `subpixel-antialiased` | `-webkit-font-smoothing: auto;` `-moz-osx-font-smoothing: auto;` |

## Notes

- Grayscale antialiasing: use the `antialiased` utility to render text using grayscale antialiasing.
- Subpixel antialiasing: use the `subpixel-antialiased` utility to render text using subpixel antialiasing.

  ```html
  <p class="subpixel-antialiased ...">The quick brown fox ...</p>
  ```

- Responsive design: prefix `-webkit-font-smoothing` and `-moz-osx-font-smoothing` utilities with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="antialiased md:subpixel-antialiased ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-smoothing.mdx` (fetched 2026-10-16)

## Related

- [font-style](./font-style.md)
- [font-weight](./font-weight.md)
