---
source: https://tailwindcss.com/docs/grid-auto-rows
---

# grid-auto-rows

Utilities for controlling the size of implicitly-created grid rows.

## Signature / Usage

```html
<div class="grid grid-flow-row auto-rows-max">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `auto-rows-auto` | `grid-auto-rows: auto;` |
| `auto-rows-min` | `grid-auto-rows: min-content;` |
| `auto-rows-max` | `grid-auto-rows: max-content;` |
| `auto-rows-fr` | `grid-auto-rows: minmax(0, 1fr);` |
| `auto-rows-<number>` | `grid-auto-rows: calc(var(--spacing) * <number>);` |
| `auto-rows-(<custom-property>)` | `grid-auto-rows: var(<custom-property>);` |
| `auto-rows-[<value>]` | `grid-auto-rows: <value>;` |

## Notes

- Basic example: utilities like `auto-rows-min` and `auto-rows-max` control the size of implicitly-created grid rows.
- Custom value: use the `auto-rows-[<value>]` syntax to set the size of implicitly-created grid rows based on a completely custom value:

```html
<div class="auto-rows-[minmax(0,2fr)] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `auto-rows-(<custom-property>)` syntax, which is just a shorthand for `auto-rows-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="auto-rows-(--my-auto-rows) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `grid-auto-rows` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid grid-flow-row auto-rows-max md:auto-rows-min ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/grid-auto-rows.mdx` (fetched 2026-10-16).

## Related

- [grid-auto-flow](./grid-auto-flow.md)
- [grid-auto-columns](./grid-auto-columns.md)
- [grid-template-rows](./grid-template-rows.md)
