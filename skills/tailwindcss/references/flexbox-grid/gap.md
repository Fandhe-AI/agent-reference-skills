---
source: https://tailwindcss.com/docs/gap
---

# gap

Utilities for controlling gutters between grid and flexbox items.

## Signature / Usage

```html
<div class="grid grid-cols-2 gap-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `gap-<number>` | `gap: calc(var(--spacing) * <value>);` |
| `gap-px` | `gap: 1px;` |
| `gap-(<custom-property>)` | `gap: var(<custom-property>);` |
| `gap-[<value>]` | `gap: <value>;` |
| `gap-x-<number>` | `column-gap: calc(var(--spacing) * <value>);` |
| `gap-x-px` | `column-gap: 1px;` |
| `gap-x-(<custom-property>)` | `column-gap: var(<custom-property>);` |
| `gap-x-[<value>]` | `column-gap: <value>;` |
| `gap-y-<number>` | `row-gap: calc(var(--spacing) * <value>);` |
| `gap-y-px` | `row-gap: 1px;` |
| `gap-y-(<custom-property>)` | `row-gap: var(<custom-property>);` |
| `gap-y-[<value>]` | `row-gap: <value>;` |

## Notes

- Migration (v3 → v4): the upgrade guide recommends migrating to a flex or grid layout and using `gap` instead of `space-x-*` / `space-y-*` if the changed `space-*` selector causes issues:

```html
<div class="space-y-4 p-4">
<div class="flex flex-col gap-4 p-4">
```

The first line is the `space-y-*` usage, the second its `gap` replacement.
- Basic example: `gap-<number>` utilities like `gap-2` and `gap-4` change the gap between both rows and columns in grid and flexbox layouts.
- Changing row and column gaps independently: `gap-x-<number>` or `gap-y-<number>` utilities like `gap-x-8` and `gap-y-4` change the gap between columns and rows independently:

```html
<div class="grid grid-cols-3 gap-x-8 gap-y-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div>
```

- Custom value: use utilities like `gap-[<value>]`, `gap-x-[<value>]` and `gap-y-[<value>]` to set the gap based on a completely custom value:

```html
<div class="gap-[10vw] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `gap-(<custom-property>)` syntax, which is just a shorthand for `gap-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="gap-(--my-gap) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix `gap`, `column-gap` and `row-gap` utilities with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid gap-4 md:gap-6 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/gap.mdx` (fetched 2026-10-16).

## Related

- [grid-template-columns](./grid-template-columns.md)
- [flex-wrap](./flex-wrap.md)
