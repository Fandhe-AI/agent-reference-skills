---
source: https://tailwindcss.com/docs/scroll-margin
---

# scroll-margin

Utilities for controlling the scroll offset around items in a snap container.

## Signature / Usage

```html
<div class="snap-x ...">
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-01.jpg"/>
  </div>
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-02.jpg"/>
  </div>
  <div class="snap-start scroll-ml-6 ...">
    <img src="/img/vacation-03.jpg"/>
  </div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scroll-m-<number>` | `scroll-margin: calc(var(--spacing) * <number>);` |
| `-scroll-m-<number>` | `scroll-margin: calc(var(--spacing) * -<number>);` |
| `scroll-m-px` | `scroll-margin: 1px;` |
| `-scroll-m-px` | `scroll-margin: -1px;` |
| `scroll-m-(<custom-property>)` | `scroll-margin: var(<custom-property>);` |
| `scroll-m-[<value>]` | `scroll-margin: <value>;` |
| `scroll-mx-<number>` | `scroll-margin-inline: calc(var(--spacing) * <number>);` |
| `-scroll-mx-<number>` | `scroll-margin-inline: calc(var(--spacing) * -<number>);` |
| `scroll-mx-px` | `scroll-margin-inline: 1px;` |
| `-scroll-mx-px` | `scroll-margin-inline: -1px;` |
| `scroll-mx-(<custom-property>)` | `scroll-margin-inline: var(<custom-property>);` |
| `scroll-mx-[<value>]` | `scroll-margin-inline: <value>;` |
| `scroll-my-<number>` | `scroll-margin-block: calc(var(--spacing) * <number>);` |
| `-scroll-my-<number>` | `scroll-margin-block: calc(var(--spacing) * -<number>);` |
| `scroll-my-px` | `scroll-margin-block: 1px;` |
| `-scroll-my-px` | `scroll-margin-block: -1px;` |
| `scroll-my-(<custom-property>)` | `scroll-margin-block: var(<custom-property>);` |
| `scroll-my-[<value>]` | `scroll-margin-block: <value>;` |
| `scroll-ms-<number>` | `scroll-margin-inline-start: calc(var(--spacing) * <number>);` |
| `-scroll-ms-<number>` | `scroll-margin-inline-start: calc(var(--spacing) * -<number>);` |
| `scroll-ms-px` | `scroll-margin-inline-start: 1px;` |
| `-scroll-ms-px` | `scroll-margin-inline-start: -1px;` |
| `scroll-ms-(<custom-property>)` | `scroll-margin-inline-start: var(<custom-property>);` |
| `scroll-ms-[<value>]` | `scroll-margin-inline-start: <value>;` |
| `scroll-me-<number>` | `scroll-margin-inline-end: calc(var(--spacing) * <number>);` |
| `-scroll-me-<number>` | `scroll-margin-inline-end: calc(var(--spacing) * -<number>);` |
| `scroll-me-px` | `scroll-margin-inline-end: 1px;` |
| `-scroll-me-px` | `scroll-margin-inline-end: -1px;` |
| `scroll-me-(<custom-property>)` | `scroll-margin-inline-end: var(<custom-property>);` |
| `scroll-me-[<value>]` | `scroll-margin-inline-end: <value>;` |
| `scroll-mbs-<number>` | `scroll-margin-block-start: calc(var(--spacing) * <number>);` |
| `-scroll-mbs-<number>` | `scroll-margin-block-start: calc(var(--spacing) * -<number>);` |
| `scroll-mbs-px` | `scroll-margin-block-start: 1px;` |
| `-scroll-mbs-px` | `scroll-margin-block-start: -1px;` |
| `scroll-mbs-(<custom-property>)` | `scroll-margin-block-start: var(<custom-property>);` |
| `scroll-mbs-[<value>]` | `scroll-margin-block-start: <value>;` |
| `scroll-mbe-<number>` | `scroll-margin-block-end: calc(var(--spacing) * <number>);` |
| `-scroll-mbe-<number>` | `scroll-margin-block-end: calc(var(--spacing) * -<number>);` |
| `scroll-mbe-px` | `scroll-margin-block-end: 1px;` |
| `-scroll-mbe-px` | `scroll-margin-block-end: -1px;` |
| `scroll-mbe-(<custom-property>)` | `scroll-margin-block-end: var(<custom-property>);` |
| `scroll-mbe-[<value>]` | `scroll-margin-block-end: <value>;` |
| `scroll-mt-<number>` | `scroll-margin-top: calc(var(--spacing) * <number>);` |
| `-scroll-mt-<number>` | `scroll-margin-top: calc(var(--spacing) * -<number>);` |
| `scroll-mt-px` | `scroll-margin-top: 1px;` |
| `-scroll-mt-px` | `scroll-margin-top: -1px;` |
| `scroll-mt-(<custom-property>)` | `scroll-margin-top: var(<custom-property>);` |
| `scroll-mt-[<value>]` | `scroll-margin-top: <value>;` |
| `scroll-mr-<number>` | `scroll-margin-right: calc(var(--spacing) * <number>);` |
| `-scroll-mr-<number>` | `scroll-margin-right: calc(var(--spacing) * -<number>);` |
| `scroll-mr-px` | `scroll-margin-right: 1px;` |
| `-scroll-mr-px` | `scroll-margin-right: -1px;` |
| `scroll-mr-(<custom-property>)` | `scroll-margin-right: var(<custom-property>);` |
| `scroll-mr-[<value>]` | `scroll-margin-right: <value>;` |
| `scroll-mb-<number>` | `scroll-margin-bottom: calc(var(--spacing) * <number>);` |
| `-scroll-mb-<number>` | `scroll-margin-bottom: calc(var(--spacing) * -<number>);` |
| `scroll-mb-px` | `scroll-margin-bottom: 1px;` |
| `-scroll-mb-px` | `scroll-margin-bottom: -1px;` |
| `scroll-mb-(<custom-property>)` | `scroll-margin-bottom: var(<custom-property>);` |
| `scroll-mb-[<value>]` | `scroll-margin-bottom: <value>;` |
| `scroll-ml-<number>` | `scroll-margin-left: calc(var(--spacing) * <number>);` |
| `-scroll-ml-<number>` | `scroll-margin-left: calc(var(--spacing) * -<number>);` |
| `scroll-ml-px` | `scroll-margin-left: 1px;` |
| `-scroll-ml-px` | `scroll-margin-left: -1px;` |
| `scroll-ml-(<custom-property>)` | `scroll-margin-left: var(<custom-property>);` |
| `scroll-ml-[<value>]` | `scroll-margin-left: <value>;` |

## Notes

- Basic example: use the `scroll-mt-<number>`, `scroll-mr-<number>`, `scroll-mb-<number>`, and `scroll-ml-<number>` utilities like `scroll-ml-4` and `scroll-mt-6` to set the scroll offset around items within a snap container.
- Using negative values: to use a negative scroll margin value, prefix the class name with a dash to convert it to a negative value:

```html
<div class="snap-start -scroll-ml-6 ...">
  <!-- ... -->
</div>
```

- Using logical properties: use the `scroll-ms-<number>` and `scroll-me-<number>` utilities to set the `scroll-margin-inline-start` and `scroll-margin-inline-end` logical properties, which map to either the left or right side based on the text direction. For more control, you can also use the LTR and RTL modifiers (see hover-focus-and-other-states) to conditionally apply specific styles depending on the current text direction:

```html
<div dir="ltr">
  <div class="snap-x ...">
    <div class="snap-start scroll-ms-6 ...">
      <img src="/img/vacation-01.jpg"/>
    </div>
    <!-- ... -->
  </div>
</div>

<div dir="rtl">
  <div class="snap-x ...">
    <div class="snap-start scroll-ms-6 ...">
      <img src="/img/vacation-01.jpg"/>
    </div>
    <!-- ... -->
  </div>
</div>
```

- Use the `scroll-mbs-<number>` and `scroll-mbe-<number>` utilities to set the `scroll-margin-block-start` and `scroll-margin-block-end` logical properties, which map to either the top or bottom side based on the writing mode:

```html
<div class="snap-y ...">
  <div class="snap-start scroll-mbs-6 ...">
    <!-- ... -->
  </div>
</div>
```

- Using a custom value: use utilities like `scroll-ml-[<value>]` and `scroll-me-[<value>]` to set the scroll margin based on a completely custom value:

```html
<div class="scroll-ml-[24rem] ...">
  <!-- ... -->
</div>
```

- For CSS variables, you can also use the `scroll-ml-(<custom-property>)` syntax (shorthand for `scroll-ml-[var(<custom-property>)]` that adds the `var()` function for you automatically):

```html
<div class="scroll-ml-(--my-scroll-margin) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `scroll-margin` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="scroll-m-8 md:scroll-m-0 ...">
  <!-- ... -->
</div>
```

- Customizing your theme: the `scroll-m-<number>`, `scroll-mx-<number>`, `scroll-my-<number>`, `scroll-ms-<number>`, `scroll-me-<number>`, `scroll-mbs-<number>`, `scroll-mbe-<number>`, `scroll-mt-<number>`, `scroll-mr-<number>`, `scroll-mb-<number>` and `scroll-ml-<number>` utilities are driven by the `--spacing` theme variable, which can be customized in your own theme:

```css
@theme {
  --spacing: 1px;
}
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scroll-margin.mdx` (fetched 2026-10-16).

## Related

- [scroll-padding](./scroll-padding.md)
- [scroll-snap-align](./scroll-snap-align.md)
- [scroll-snap-type](./scroll-snap-type.md)
