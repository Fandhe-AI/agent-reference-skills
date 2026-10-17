---
source: https://tailwindcss.com/docs/hyphens
---

# hyphens

Utilities for controlling how words should be hyphenated.

## Signature / Usage

```html
<p class="hyphens-auto" lang="de">
  ... Kraftfahrzeughaftpflichtversicherung is a ...
</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `hyphens-none` | `hyphens: none;` |
| `hyphens-manual` | `hyphens: manual;` |
| `hyphens-auto` | `hyphens: auto;` |

## Notes

- Use the `hyphens-none` utility to prevent words from being hyphenated even if the line break suggestion `&shy;` is used:

```html
<p class="hyphens-none">
  ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...
</p>
```

- Use the `hyphens-manual` utility to only set hyphenation points where the line break suggestion `&shy;` is used. This is the default browser behavior:

```html
<p class="hyphens-manual">
  ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...
</p>
```

- Use the `hyphens-auto` utility to allow the browser to automatically choose hyphenation points based on the language. The line break suggestion `&shy;` will be preferred over automatic hyphenation points.
- Prefix a `hyphens` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="hyphens-none md:hyphens-auto ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/hyphens.mdx` (fetched 2026-10-16).

## Related

- [word-break](./word-break.md)
- [overflow-wrap](./overflow-wrap.md)
