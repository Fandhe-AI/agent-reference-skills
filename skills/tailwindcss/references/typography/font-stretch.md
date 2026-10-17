---
source: https://tailwindcss.com/docs/font-stretch
---

# font-stretch

Utilities for selecting the width of a font face.

## Signature / Usage

```html
<p class="font-stretch-extra-condensed">The quick brown fox...</p>
<p class="font-stretch-condensed">The quick brown fox...</p>
<p class="font-stretch-normal">The quick brown fox...</p>
<p class="font-stretch-expanded">The quick brown fox...</p>
<p class="font-stretch-extra-expanded">The quick brown fox...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `font-stretch-ultra-condensed` | `font-stretch: ultra-condensed; /* 50% */` |
| `font-stretch-extra-condensed` | `font-stretch: extra-condensed; /* 62.5% */` |
| `font-stretch-condensed` | `font-stretch: condensed; /* 75% */` |
| `font-stretch-semi-condensed` | `font-stretch: semi-condensed; /* 87.5% */` |
| `font-stretch-normal` | `font-stretch: normal; /* 100% */` |
| `font-stretch-semi-expanded` | `font-stretch: semi-expanded; /* 112.5% */` |
| `font-stretch-expanded` | `font-stretch: expanded; /* 125% */` |
| `font-stretch-extra-expanded` | `font-stretch: extra-expanded; /* 150% */` |
| `font-stretch-ultra-expanded` | `font-stretch: ultra-expanded; /* 200% */` |
| `font-stretch-<percentage>` | `font-stretch: <percentage>;` |
| `font-stretch-(<custom-property>)` | `font-stretch: var(<custom-property>);` |
| `font-stretch-[<value>]` | `font-stretch: <value>;` |

## Notes

- This only applies to fonts that have multiple width variations available, otherwise the browser selects the closest match.
- Using percentages: use `font-stretch-<percentage>` utilities like `font-stretch-50%` and `font-stretch-125%` to set the width of a font face using a percentage.

  ```html
  <p class="font-stretch-50%">The quick brown fox...</p>
  <p class="font-stretch-100%">The quick brown fox...</p>
  <p class="font-stretch-150%">The quick brown fox...</p>
  ```

- Custom value: use the `font-stretch-[<value>]` syntax to set the font width based on a completely custom value.

  ```html
  <p class="font-stretch-[66.66%] ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- For CSS variables, use the `font-stretch-(<custom-property>)` syntax; it is a shorthand for `font-stretch-[var(<custom-property>)]` that adds the `var()` function automatically.

  ```html
  <p class="font-stretch-(--my-font-width) ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Responsive design: prefix a `font-stretch` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <div class="font-stretch-normal md:font-stretch-expanded ...">
    <!-- ... -->
  </div>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-stretch.mdx` (fetched 2026-10-16)

## Related

- [font-weight](./font-weight.md)
- [font-family](./font-family.md)
