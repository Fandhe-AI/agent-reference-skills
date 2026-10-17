---
source: https://tailwindcss.com/docs/text-decoration-thickness
---

# text-decoration-thickness

Utilities for controlling the thickness of text decorations.

## Signature / Usage

```html
<p class="underline decoration-1">The quick brown fox...</p>
<p class="underline decoration-2">The quick brown fox...</p>
<p class="underline decoration-4">The quick brown fox...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `decoration-<number>` | `text-decoration-thickness: <number>px;` |
| `decoration-from-font` | `text-decoration-thickness: from-font;` |
| `decoration-auto` | `text-decoration-thickness: auto;` |
| `decoration-(length:<custom-property>)` | `text-decoration-thickness: var(<custom-property>);` |
| `decoration-[<value>]` | `text-decoration-thickness: <value>;` |

## Notes

- Use `decoration-<number>` utilities like `decoration-2` and `decoration-4` to change the text decoration thickness of an element.
- Use the `decoration-[<value>]` syntax to set the text decoration thickness based on a completely custom value:

```html
<p class="decoration-[0.25rem] ...">
  Lorem ipsum dolor sit amet...
</p>
```

- For CSS variables, you can also use the `decoration-(length:<custom-property>)` syntax:

```html
<p class="decoration-(length:--my-decoration-thickness) ...">
  Lorem ipsum dolor sit amet...
</p>
```

This is just a shorthand for `decoration-[length:var(<custom-property>)]` that adds the `var()` function for you automatically.

- Prefix a `text-decoration-thickness` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="underline md:decoration-4 ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-decoration-thickness.mdx` (fetched 2026-10-16).

## Related

- [text-decoration-line](./text-decoration-line.md)
- [text-decoration-style](./text-decoration-style.md)
- [text-underline-offset](./text-underline-offset.md)
