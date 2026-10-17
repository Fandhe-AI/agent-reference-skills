---
source: https://tailwindcss.com/docs/padding
---

# padding

Utilities for controlling an element's padding.

## Signature / Usage

```html
<div class="p-8 ...">p-8</div>
<div class="pt-6 ...">pt-6</div>
<div class="px-8 ...">px-8</div>
<div class="ps-8 ...">ps-8</div>
<div class="pbs-8 ...">pbs-8</div>
```

## Options / Props

Each prefix below accepts the same four forms: `<prefix>-<number>`, `<prefix>-px`, `<prefix>-(<custom-property>)`, `<prefix>-[<value>]`. `<property>` is the CSS property for that prefix.

| Prefix | Property |
|--------|----------|
| `p` | `padding` |
| `px` | `padding-inline` |
| `py` | `padding-block` |
| `ps` | `padding-inline-start` |
| `pe` | `padding-inline-end` |
| `pbs` | `padding-block-start` |
| `pbe` | `padding-block-end` |
| `pt` | `padding-top` |
| `pr` | `padding-right` |
| `pb` | `padding-bottom` |
| `pl` | `padding-left` |

| Class | Styles |
|-------|--------|
| `<prefix>-<number>` | `<property>: calc(var(--spacing) * <number>);` |
| `<prefix>-px` | `<property>: 1px;` |
| `<prefix>-(<custom-property>)` | `<property>: var(<custom-property>);` |
| `<prefix>-[<value>]` | `<property>: <value>;` |

Expanded, for example: `p-<number>` is `padding: calc(var(--spacing) * <number>);`, `px-px` is `padding-inline: 1px;`, `pbe-(<custom-property>)` is `padding-block-end: var(<custom-property>);`, `pl-[<value>]` is `padding-left: <value>;`.

## Notes

- Basic: `p-<number>` utilities like `p-4` and `p-8` control the padding on all sides.
- One side: `pt-<number>`, `pr-<number>`, `pb-<number>`, `pl-<number>` (for example `pt-6`, `pr-4`).
- Horizontal / vertical: `px-<number>` and `py-<number>`.
- Logical properties: `ps-<number>` / `pe-<number>` set `padding-inline-start` / `padding-inline-end`, which map to the left or right side based on the text direction. For more control, use the LTR and RTL modifiers (`ltr:` / `rtl:`, see the hover-focus-and-other-states page).
- `pbs-<number>` / `pbe-<number>` set `padding-block-start` / `padding-block-end`, which map to the top or bottom side based on the writing mode. Introduced in v4.2.0 (CHANGELOG 4.2.0).
- Custom value: `p-[5px]`, `px-[5px]`, `pb-[5px]` set padding to a completely custom value; for CSS variables use the `p-(--my-padding)` syntax, which is shorthand for `p-[var(--my-padding)]`.
- Responsive: prefix with a breakpoint variant like `md:` to apply only at medium screen sizes and above (`py-4 md:py-8`).
- Theme: `p-<number>` utilities are driven by the `--spacing` theme variable, customized with `@theme { --spacing: 1px; }` (see the theme page).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/padding.mdx` (fetched 2026-10-16).

```html
<div class="py-4 md:py-8 ...">
  <!-- ... -->
</div>
<div class="p-[5px] ...">
  <!-- ... -->
</div>
<div class="p-(--my-padding) ...">
  <!-- ... -->
</div>
```

```css
@theme {
  --spacing: 1px;
}
```

## Related

- [margin](./margin.md)
- [width](./width.md)
