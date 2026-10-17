---
source: https://tailwindcss.com/docs/scroll-padding
---

# scroll-padding

Utilities for controlling an element's scroll offset within a snap container.

## Signature / Usage

```html
<div class="snap-x scroll-pl-6 ...">
  <div class="snap-start ...">
    <img src="/img/vacation-01.jpg" />
  </div>
  <div class="snap-start ...">
    <img src="/img/vacation-02.jpg" />
  </div>
  <div class="snap-start ...">
    <img src="/img/vacation-03.jpg" />
  </div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scroll-p-<number>` | `scroll-padding: calc(var(--spacing) * <number>);` |
| `scroll-p-px` | `scroll-padding: 1px;` |
| `scroll-p-(<custom-property>)` | `scroll-padding: var(<custom-property>);` |
| `scroll-p-[<value>]` | `scroll-padding: <value>;` |
| `scroll-px-<number>` | `scroll-padding-inline: calc(var(--spacing) * <number>);` |
| `scroll-px-px` | `scroll-padding-inline: 1px;` |
| `scroll-px-(<custom-property>)` | `scroll-padding-inline: var(<custom-property>);` |
| `scroll-px-[<value>]` | `scroll-padding-inline: <value>;` |
| `scroll-py-<number>` | `scroll-padding-block: calc(var(--spacing) * <number>);` |
| `scroll-py-px` | `scroll-padding-block: 1px;` |
| `scroll-py-(<custom-property>)` | `scroll-padding-block: var(<custom-property>);` |
| `scroll-py-[<value>]` | `scroll-padding-block: <value>;` |
| `scroll-ps-<number>` | `scroll-padding-inline-start: calc(var(--spacing) * <number>);` |
| `scroll-ps-px` | `scroll-padding-inline-start: 1px;` |
| `scroll-ps-(<custom-property>)` | `scroll-padding-inline-start: var(<custom-property>);` |
| `scroll-ps-[<value>]` | `scroll-padding-inline-start: <value>;` |
| `scroll-pe-<number>` | `scroll-padding-inline-end: calc(var(--spacing) * <number>);` |
| `scroll-pe-px` | `scroll-padding-inline-end: 1px;` |
| `scroll-pe-(<custom-property>)` | `scroll-padding-inline-end: var(<custom-property>);` |
| `scroll-pe-[<value>]` | `scroll-padding-inline-end: <value>;` |
| `scroll-pbs-<number>` | `scroll-padding-block-start: calc(var(--spacing) * <number>);` |
| `scroll-pbs-px` | `scroll-padding-block-start: 1px;` |
| `scroll-pbs-(<custom-property>)` | `scroll-padding-block-start: var(<custom-property>);` |
| `scroll-pbs-[<value>]` | `scroll-padding-block-start: <value>;` |
| `scroll-pbe-<number>` | `scroll-padding-block-end: calc(var(--spacing) * <number>);` |
| `scroll-pbe-px` | `scroll-padding-block-end: 1px;` |
| `scroll-pbe-(<custom-property>)` | `scroll-padding-block-end: var(<custom-property>);` |
| `scroll-pbe-[<value>]` | `scroll-padding-block-end: <value>;` |
| `scroll-pt-<number>` | `scroll-padding-top: calc(var(--spacing) * <number>);` |
| `scroll-pt-px` | `scroll-padding-top: 1px;` |
| `scroll-pt-(<custom-property>)` | `scroll-padding-top: var(<custom-property>);` |
| `scroll-pt-[<value>]` | `scroll-padding-top: <value>;` |
| `scroll-pr-<number>` | `scroll-padding-right: calc(var(--spacing) * <number>);` |
| `scroll-pr-px` | `scroll-padding-right: 1px;` |
| `scroll-pr-(<custom-property>)` | `scroll-padding-right: var(<custom-property>);` |
| `scroll-pr-[<value>]` | `scroll-padding-right: <value>;` |
| `scroll-pb-<number>` | `scroll-padding-bottom: calc(var(--spacing) * <number>);` |
| `scroll-pb-px` | `scroll-padding-bottom: 1px;` |
| `scroll-pb-(<custom-property>)` | `scroll-padding-bottom: var(<custom-property>);` |
| `scroll-pb-[<value>]` | `scroll-padding-bottom: <value>;` |
| `scroll-pl-<number>` | `scroll-padding-left: calc(var(--spacing) * <number>);` |
| `scroll-pl-px` | `scroll-padding-left: 1px;` |
| `scroll-pl-(<custom-property>)` | `scroll-padding-left: var(<custom-property>);` |
| `scroll-pl-[<value>]` | `scroll-padding-left: <value>;` |

## Notes

- Basic example: use the `scroll-pt-<number>`, `scroll-pr-<number>`, `scroll-pb-<number>`, and `scroll-pl-<number>` utilities like `scroll-pl-4` and `scroll-pt-6` to set the scroll offset of an element within a snap container.
- Using logical properties: use the `scroll-ps-<number>` and `scroll-pe-<number>` utilities to set the `scroll-padding-inline-start` and `scroll-padding-inline-end` logical properties, which map to either the left or right side based on the text direction:

```html
<div dir="ltr">
  <div class="snap-x scroll-ps-6 ...">
    <!-- ... -->
  </div>
</div>

<div dir="rtl">
  <div class="snap-x scroll-ps-6 ...">
    <!-- ... -->
  </div>
</div>
```

- Use the `scroll-pbs-<number>` and `scroll-pbe-<number>` utilities to set the `scroll-padding-block-start` and `scroll-padding-block-end` logical properties, which map to either the top or bottom side based on the writing mode:

```html
<div class="snap-y scroll-pbs-6 ...">
  <!-- ... -->
</div>
```

- Using a custom value: use utilities like `scroll-pl-[<value>]` and `scroll-pe-[<value>]` to set the scroll padding based on a completely custom value:

```html
<div class="scroll-pl-[24rem] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `scroll-pl-(<custom-property>)` syntax (shorthand for `scroll-pl-[var(<custom-property>)]` that adds the `var()` function for you automatically):

```html
<div class="scroll-pl-(--my-scroll-padding) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `scroll-padding` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="scroll-p-8 md:scroll-p-0 ...">
  <!-- ... -->
</div>
```

- Customizing your theme: the `scroll-p-<number>`, `scroll-px-<number>`, `scroll-py-<number>`, `scroll-ps-<number>`, `scroll-pe-<number>`, `scroll-pbs-<number>`, `scroll-pbe-<number>`, `scroll-pt-<number>`, `scroll-pr-<number>`, `scroll-pb-<number>` and `scroll-pl-<number>` utilities are driven by the `--spacing` theme variable, which can be customized in your own theme:

```css
@theme {
  --spacing: 1px;
}
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scroll-padding.mdx` (fetched 2026-10-16).

## Related

- [scroll-margin](./scroll-margin.md)
- [scroll-snap-align](./scroll-snap-align.md)
- [scroll-snap-type](./scroll-snap-type.md)
