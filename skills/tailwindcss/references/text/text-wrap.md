---
source: https://tailwindcss.com/docs/text-wrap
---

# text-wrap

Utilities for controlling how text wraps within an element.

## Signature / Usage

```html
<article class="text-wrap">
  <h3>Beloved Manhattan soup stand closes</h3>
  <p>New Yorkers are facing the winter chill...</p>
</article>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `text-wrap` | `text-wrap: wrap;` |
| `text-nowrap` | `text-wrap: nowrap;` |
| `text-balance` | `text-wrap: balance;` |
| `text-pretty` | `text-wrap: pretty;` |

## Notes

- Use the `text-wrap` utility to wrap overflowing text onto multiple lines at logical points in the text.
- Use the `text-nowrap` utility to prevent text from wrapping, allowing it to overflow if necessary:

```html
<article class="text-nowrap">
  <h3>Beloved Manhattan soup stand closes</h3>
  <p>New Yorkers are facing the winter chill...</p>
</article>
```

- Use the `text-balance` utility to distribute the text evenly across each line. For performance reasons browsers limit text balancing to blocks that are ~6 lines or less, making it best suited for headings:

```html
<article>
  <h3 class="text-balance">Beloved Manhattan soup stand closes</h3>
  <p>New Yorkers are facing the winter chill...</p>
</article>
```

- Use the `text-pretty` utility to prefer better text wrapping and layout at the expense of speed. Behavior varies across browsers but often involves approaches like preventing orphans (a single word on its own line) at the end of a text block:

```html
<article>
  <h3 class="text-pretty">Beloved Manhattan soup stand closes</h3>
  <p>New Yorkers are facing the winter chill...</p>
</article>
```

- Prefix a `text-wrap` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<h1 class="text-pretty md:text-balance ...">
  <!-- ... -->
</h1>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-wrap.mdx` (fetched 2026-10-16).

## Related

- [white-space](./white-space.md)
- [text-overflow](./text-overflow.md)
- [overflow-wrap](./overflow-wrap.md)
