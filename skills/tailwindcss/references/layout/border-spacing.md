---
source: https://tailwindcss.com/docs/border-spacing
---

# border-spacing

Utilities for controlling the spacing between table borders.

## Signature / Usage

```html
<table class="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
  <thead>
    <tr>
      <th class="border border-gray-300 dark:border-gray-600">State</th>
      <th class="border border-gray-300 dark:border-gray-600">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 dark:border-gray-700">Indiana</td>
      <td class="border border-gray-300 dark:border-gray-700">Indianapolis</td>
    </tr>
  </tbody>
</table>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `border-spacing-<number>` | `border-spacing: calc(var(--spacing) * <number>);` |
| `border-spacing-px` | `border-spacing: 1px;` |
| `border-spacing-(<custom-property>)` | `border-spacing: var(<custom-property>);` |
| `border-spacing-[<value>]` | `border-spacing: <value>;` |
| `border-spacing-x-<number>` | `border-spacing: calc(var(--spacing) * <number>) var(--tw-border-spacing-y);` |
| `border-spacing-x-px` | `border-spacing: 1px var(--tw-border-spacing-y);` |
| `border-spacing-x-(<custom-property>)` | `border-spacing: var(<custom-property>) var(--tw-border-spacing-y);` |
| `border-spacing-x-[<value>]` | `border-spacing: <value> var(--tw-border-spacing-y);` |
| `border-spacing-y-<number>` | `border-spacing: var(--tw-border-spacing-x) calc(var(--spacing) * <number>);` |
| `border-spacing-y-px` | `border-spacing: var(--tw-border-spacing-x) 1px;` |
| `border-spacing-y-(<custom-property>)` | `border-spacing: var(--tw-border-spacing-x) var(<custom-property>);` |
| `border-spacing-y-[<value>]` | `border-spacing: var(--tw-border-spacing-x) <value>;` |

## Notes

- Controls the space between the borders of table cells with separate borders (see `border-separate` on the border-collapse page).
- Custom value: `border-spacing-[7px]`; `border-spacing-(--my-border-spacing)` is shorthand for `border-spacing-[var(--my-border-spacing)]`.
- Responsive: `border-spacing-2 md:border-spacing-4`.
- Theme: `border-spacing-<number>` utilities are driven by the `--spacing` theme variable, e.g. `@theme { --spacing: 1px; }`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/border-spacing.mdx` (fetched 2026-10-16).

## Related

- [border-collapse](./border-collapse.md)
- [table-layout](./table-layout.md)
