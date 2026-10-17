---
source: https://tailwindcss.com/docs/text-indent
---

# text-indent

Utilities for controlling the amount of empty space shown before text in a block.

## Signature / Usage

```html
<p class="indent-8">So I started to walk into the water...</p>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `indent-<number>` | `text-indent: calc(var(--spacing) * <number>);` |
| `-indent-<number>` | `text-indent: calc(var(--spacing) * -<number>);` |
| `indent-px` | `text-indent: 1px;` |
| `-indent-px` | `text-indent: -1px;` |
| `indent-(<custom-property>)` | `text-indent: var(<custom-property>);` |
| `indent-[<value>]` | `text-indent: <value>;` |

## Notes

- Use `indent-<number>` utilities like `indent-2` and `indent-8` to set the amount of empty space (indentation) that's shown before text in a block.
- To use a negative text indent value, prefix the class name with a dash to convert it to a negative value:

```html
<p class="-indent-8">So I started to walk into the water...</p>
```

- Use the `indent-[<value>]` syntax to set the text indentation based on a completely custom value:

```html
<p class="indent-[50%] ...">
  Lorem ipsum dolor sit amet...
</p>
```

- For CSS variables, you can also use the `indent-(<custom-property>)` syntax:

```html
<p class="indent-(--my-indentation) ...">
  Lorem ipsum dolor sit amet...
</p>
```

This is just a shorthand for `indent-[var(<custom-property>)]` that adds the `var()` function for you automatically.

- Prefix a `text-indent` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="indent-4 md:indent-8 ...">
  Lorem ipsum dolor sit amet...
</p>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-indent.mdx` (fetched 2026-10-16).

## Related

- [text-align](./text-align.md)
- [tab-size](./tab-size.md)
