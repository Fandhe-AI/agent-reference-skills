---
source: https://tailwindcss.com/docs/grid-auto-columns
---

# grid-auto-columns

Utilities for controlling the size of implicitly-created grid columns.

## Signature / Usage

```html
<div class="grid auto-cols-max grid-flow-col">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `auto-cols-auto` | `grid-auto-columns: auto;` |
| `auto-cols-min` | `grid-auto-columns: min-content;` |
| `auto-cols-max` | `grid-auto-columns: max-content;` |
| `auto-cols-fr` | `grid-auto-columns: minmax(0, 1fr);` |
| `auto-cols-<number>` | `grid-auto-columns: calc(var(--spacing) * <number>);` |
| `auto-cols-(<custom-property>)` | `grid-auto-columns: var(<custom-property>);` |
| `auto-cols-[<value>]` | `grid-auto-columns: <value>;` |

## Notes

- Basic example: utilities like `auto-cols-min` and `auto-cols-max` control the size of implicitly-created grid columns.
- Custom value: use the `auto-cols-[<value>]` syntax to set the size of implicitly-created grid columns based on a completely custom value:

```html
<div class="auto-cols-[minmax(0,2fr)] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `auto-cols-(<custom-property>)` syntax, which is just a shorthand for `auto-cols-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="auto-cols-(--my-auto-cols) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `grid-auto-columns` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid grid-flow-col auto-cols-max md:auto-cols-min ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/grid-auto-columns.mdx` (fetched 2026-10-16).

## Related

- [grid-auto-flow](./grid-auto-flow.md)
- [grid-auto-rows](./grid-auto-rows.md)
- [grid-template-columns](./grid-template-columns.md)
