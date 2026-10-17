---
source: https://tailwindcss.com/docs/top-right-bottom-left
---

# top / right / bottom / left

Utilities for controlling the placement of positioned elements.

## Signature / Usage

```html
<!-- Pin to top left corner -->
<div class="relative size-32 ...">
  <div class="absolute top-0 left-0 size-16 ...">01</div>
</div>

<!-- Span top edge -->
<div class="relative size-32 ...">
  <div class="absolute inset-x-0 top-0 h-16 ...">02</div>
</div>

<!-- Fill entire parent -->
<div class="relative size-32 ...">
  <div class="absolute inset-0 ...">05</div>
</div>
```

## Options / Props

Each of the 11 prefixes below (`inset` → `inset`, `inset-x` → `inset-inline`, `inset-y` → `inset-block`, `inset-s` → `inset-inline-start`, `inset-e` → `inset-inline-end`, `inset-bs` → `inset-block-start`, `inset-be` → `inset-block-end`, `top`, `right`, `bottom`, `left`) has the same 11 forms, expanded mechanically from the source.

| Class | Styles |
| --- | --- |
| `inset-<number>` | `inset: calc(var(--spacing) * <number>);` |
| `-inset-<number>` | `inset: calc(var(--spacing) * -<number>);` |
| `inset-<fraction>` | `inset: calc(<fraction> * 100%);` |
| `-inset-<fraction>` | `inset: calc(<fraction> * -100%);` |
| `inset-px` | `inset: 1px;` |
| `-inset-px` | `inset: -1px;` |
| `inset-full` | `inset: 100%;` |
| `-inset-full` | `inset: -100%;` |
| `inset-auto` | `inset: auto;` |
| `inset-(<custom-property>)` | `inset: var(<custom-property>);` |
| `inset-[<value>]` | `inset: <value>;` |
| `inset-x-<number>` | `inset-inline: calc(var(--spacing) * <number>);` |
| `-inset-x-<number>` | `inset-inline: calc(var(--spacing) * -<number>);` |
| `inset-x-<fraction>` | `inset-inline: calc(<fraction> * 100%);` |
| `-inset-x-<fraction>` | `inset-inline: calc(<fraction> * -100%);` |
| `inset-x-px` | `inset-inline: 1px;` |
| `-inset-x-px` | `inset-inline: -1px;` |
| `inset-x-full` | `inset-inline: 100%;` |
| `-inset-x-full` | `inset-inline: -100%;` |
| `inset-x-auto` | `inset-inline: auto;` |
| `inset-x-(<custom-property>)` | `inset-inline: var(<custom-property>);` |
| `inset-x-[<value>]` | `inset-inline: <value>;` |
| `inset-y-<number>` | `inset-block: calc(var(--spacing) * <number>);` |
| `-inset-y-<number>` | `inset-block: calc(var(--spacing) * -<number>);` |
| `inset-y-<fraction>` | `inset-block: calc(<fraction> * 100%);` |
| `-inset-y-<fraction>` | `inset-block: calc(<fraction> * -100%);` |
| `inset-y-px` | `inset-block: 1px;` |
| `-inset-y-px` | `inset-block: -1px;` |
| `inset-y-full` | `inset-block: 100%;` |
| `-inset-y-full` | `inset-block: -100%;` |
| `inset-y-auto` | `inset-block: auto;` |
| `inset-y-(<custom-property>)` | `inset-block: var(<custom-property>);` |
| `inset-y-[<value>]` | `inset-block: <value>;` |
| `inset-s-<number>` | `inset-inline-start: calc(var(--spacing) * <number>);` |
| `-inset-s-<number>` | `inset-inline-start: calc(var(--spacing) * -<number>);` |
| `inset-s-<fraction>` | `inset-inline-start: calc(<fraction> * 100%);` |
| `-inset-s-<fraction>` | `inset-inline-start: calc(<fraction> * -100%);` |
| `inset-s-px` | `inset-inline-start: 1px;` |
| `-inset-s-px` | `inset-inline-start: -1px;` |
| `inset-s-full` | `inset-inline-start: 100%;` |
| `-inset-s-full` | `inset-inline-start: -100%;` |
| `inset-s-auto` | `inset-inline-start: auto;` |
| `inset-s-(<custom-property>)` | `inset-inline-start: var(<custom-property>);` |
| `inset-s-[<value>]` | `inset-inline-start: <value>;` |
| `inset-e-<number>` | `inset-inline-end: calc(var(--spacing) * <number>);` |
| `-inset-e-<number>` | `inset-inline-end: calc(var(--spacing) * -<number>);` |
| `inset-e-<fraction>` | `inset-inline-end: calc(<fraction> * 100%);` |
| `-inset-e-<fraction>` | `inset-inline-end: calc(<fraction> * -100%);` |
| `inset-e-px` | `inset-inline-end: 1px;` |
| `-inset-e-px` | `inset-inline-end: -1px;` |
| `inset-e-full` | `inset-inline-end: 100%;` |
| `-inset-e-full` | `inset-inline-end: -100%;` |
| `inset-e-auto` | `inset-inline-end: auto;` |
| `inset-e-(<custom-property>)` | `inset-inline-end: var(<custom-property>);` |
| `inset-e-[<value>]` | `inset-inline-end: <value>;` |
| `inset-bs-<number>` | `inset-block-start: calc(var(--spacing) * <number>);` |
| `-inset-bs-<number>` | `inset-block-start: calc(var(--spacing) * -<number>);` |
| `inset-bs-<fraction>` | `inset-block-start: calc(<fraction> * 100%);` |
| `-inset-bs-<fraction>` | `inset-block-start: calc(<fraction> * -100%);` |
| `inset-bs-px` | `inset-block-start: 1px;` |
| `-inset-bs-px` | `inset-block-start: -1px;` |
| `inset-bs-full` | `inset-block-start: 100%;` |
| `-inset-bs-full` | `inset-block-start: -100%;` |
| `inset-bs-auto` | `inset-block-start: auto;` |
| `inset-bs-(<custom-property>)` | `inset-block-start: var(<custom-property>);` |
| `inset-bs-[<value>]` | `inset-block-start: <value>;` |
| `inset-be-<number>` | `inset-block-end: calc(var(--spacing) * <number>);` |
| `-inset-be-<number>` | `inset-block-end: calc(var(--spacing) * -<number>);` |
| `inset-be-<fraction>` | `inset-block-end: calc(<fraction> * 100%);` |
| `-inset-be-<fraction>` | `inset-block-end: calc(<fraction> * -100%);` |
| `inset-be-px` | `inset-block-end: 1px;` |
| `-inset-be-px` | `inset-block-end: -1px;` |
| `inset-be-full` | `inset-block-end: 100%;` |
| `-inset-be-full` | `inset-block-end: -100%;` |
| `inset-be-auto` | `inset-block-end: auto;` |
| `inset-be-(<custom-property>)` | `inset-block-end: var(<custom-property>);` |
| `inset-be-[<value>]` | `inset-block-end: <value>;` |
| `top-<number>` | `top: calc(var(--spacing) * <number>);` |
| `-top-<number>` | `top: calc(var(--spacing) * -<number>);` |
| `top-<fraction>` | `top: calc(<fraction> * 100%);` |
| `-top-<fraction>` | `top: calc(<fraction> * -100%);` |
| `top-px` | `top: 1px;` |
| `-top-px` | `top: -1px;` |
| `top-full` | `top: 100%;` |
| `-top-full` | `top: -100%;` |
| `top-auto` | `top: auto;` |
| `top-(<custom-property>)` | `top: var(<custom-property>);` |
| `top-[<value>]` | `top: <value>;` |
| `right-<number>` | `right: calc(var(--spacing) * <number>);` |
| `-right-<number>` | `right: calc(var(--spacing) * -<number>);` |
| `right-<fraction>` | `right: calc(<fraction> * 100%);` |
| `-right-<fraction>` | `right: calc(<fraction> * -100%);` |
| `right-px` | `right: 1px;` |
| `-right-px` | `right: -1px;` |
| `right-full` | `right: 100%;` |
| `-right-full` | `right: -100%;` |
| `right-auto` | `right: auto;` |
| `right-(<custom-property>)` | `right: var(<custom-property>);` |
| `right-[<value>]` | `right: <value>;` |
| `bottom-<number>` | `bottom: calc(var(--spacing) * <number>);` |
| `-bottom-<number>` | `bottom: calc(var(--spacing) * -<number>);` |
| `bottom-<fraction>` | `bottom: calc(<fraction> * 100%);` |
| `-bottom-<fraction>` | `bottom: calc(<fraction> * -100%);` |
| `bottom-px` | `bottom: 1px;` |
| `-bottom-px` | `bottom: -1px;` |
| `bottom-full` | `bottom: 100%;` |
| `-bottom-full` | `bottom: -100%;` |
| `bottom-auto` | `bottom: auto;` |
| `bottom-(<custom-property>)` | `bottom: var(<custom-property>);` |
| `bottom-[<value>]` | `bottom: <value>;` |
| `left-<number>` | `left: calc(var(--spacing) * <number>);` |
| `-left-<number>` | `left: calc(var(--spacing) * -<number>);` |
| `left-<fraction>` | `left: calc(<fraction> * 100%);` |
| `-left-<fraction>` | `left: calc(<fraction> * -100%);` |
| `left-px` | `left: 1px;` |
| `-left-px` | `left: -1px;` |
| `left-full` | `left: 100%;` |
| `-left-full` | `left: -100%;` |
| `left-auto` | `left: auto;` |
| `left-(<custom-property>)` | `left: var(<custom-property>);` |
| `left-[<value>]` | `left: <value>;` |

## Notes

- Use `top-<number>`, `right-<number>`, `bottom-<number>`, `left-<number>`, and `inset-<number>` utilities like `top-0` and `bottom-4` to set the horizontal or vertical position of a positioned element.
- Negative values: prefix the class name with a dash, e.g. `<div class="absolute -top-4 -left-4 size-14 ..."></div>`.
- Logical properties: `inset-s-<number>` / `inset-e-<number>` (e.g. `inset-s-0`, `inset-e-4`) set `inset-inline-start` / `inset-inline-end`, which map to left or right based on text direction. For more control, use the LTR and RTL modifiers to conditionally apply styles by text direction.
- Custom value: `inset-[3px]` and `top-[3px]`; `inset-(--my-position)` is shorthand for `inset-[var(--my-position)]`.
- Responsive: prefix with a breakpoint variant, e.g. `top-4 md:top-6`.
- Theme: the `<number>` utilities are driven by the `--spacing` theme variable, e.g. `@theme { --spacing: 1px; }`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/top-right-bottom-left.mdx` (fetched 2026-10-16).

## Related

- [position](./position.md)
- [z-index](./z-index.md)
