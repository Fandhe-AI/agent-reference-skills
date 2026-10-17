---
source: https://tailwindcss.com/docs/text-underline-offset
---

# text-underline-offset

Utilities for controlling the offset of a text underline.

## Signature / Usage

```html
<p class="underline underline-offset-1">The quick brown fox...</p>
<p class="underline underline-offset-2">The quick brown fox...</p>
<p class="underline underline-offset-4">The quick brown fox...</p>
<p class="underline underline-offset-8">The quick brown fox...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `underline-offset-<number>` | `text-underline-offset: <number>px;` |
| `-underline-offset-<number>` | `text-underline-offset: calc(<number>px * -1);` |
| `underline-offset-auto` | `text-underline-offset: auto;` |
| `underline-offset-(<custom-property>)` | `text-underline-offset: var(<custom-property>);` |
| `underline-offset-[<value>]` | `text-underline-offset: <value>;` |

## Notes

- Use `underline-offset-<number>` utilities like `underline-offset-2` and `underline-offset-4` to change the offset of a text underline.
- Use the `underline-offset-[<value>]` syntax to set the text underline offset based on a completely custom value:

```html
<p class="underline-offset-[3px] ...">
  Lorem ipsum dolor sit amet...
</p>
```

- For CSS variables, you can also use the `underline-offset-(<custom-property>)` syntax:

```html
<p class="underline-offset-(--my-underline-offset) ...">
  Lorem ipsum dolor sit amet...
</p>
```

This is just a shorthand for `underline-offset-[var(<custom-property>)]` that adds the `var()` function for you automatically.

- Prefix a `text-underline-offset` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="underline md:underline-offset-4 ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-underline-offset.mdx` (fetched 2026-10-16).

## Related

- [text-decoration-line](./text-decoration-line.md)
- [text-decoration-thickness](./text-decoration-thickness.md)
