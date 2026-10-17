---
source: https://tailwindcss.com/docs/overflow-wrap
---

# overflow-wrap

Utilities for controlling line breaks within words in an overflowing element.

## Signature / Usage

```html
<p class="wrap-break-word">The longest word in any of the major...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `wrap-break-word` | `overflow-wrap: break-word;` |
| `wrap-anywhere` | `overflow-wrap: anywhere;` |
| `wrap-normal` | `overflow-wrap: normal;` |

## Notes

- Use the `wrap-break-word` utility to allow line breaks between letters in a word if needed.
- The `wrap-anywhere` utility behaves similarly to `wrap-break-word`, except that the browser factors in mid-word line breaks when calculating the intrinsic size of the element. This is useful for wrapping text inside of `flex` containers, where you would usually need to set `min-width: 0` on the child element to allow it to shrink below its content size:

```html
<div class="flex max-w-sm">
  <img class="size-16 rounded-full" src="/img/profile.jpg" />
  <div class="wrap-anywhere">
    <p class="font-medium">Jay Riemenschneider</p>
    <p>jason.riemenschneider@vandelayindustries.com</p>
  </div>
</div>
```

- Use the `wrap-normal` utility to only allow line breaks at natural wrapping points, like spaces, hyphens, and punctuation:

```html
<p class="wrap-normal">The longest word in any of the major...</p>
```

- Prefix an `overflow-wrap` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="wrap-normal md:wrap-break-word ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/overflow-wrap.mdx` (fetched 2026-10-16).

## Related

- [word-break](./word-break.md)
- [hyphens](./hyphens.md)
- [text-wrap](./text-wrap.md)
