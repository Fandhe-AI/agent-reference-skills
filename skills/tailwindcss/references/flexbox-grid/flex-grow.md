---
source: https://tailwindcss.com/docs/flex-grow
---

# flex-grow

Utilities for controlling how flex items grow.

## Signature / Usage

```html
<div class="flex ...">
  <div class="size-14 flex-none ...">01</div>
  <div class="size-14 grow ...">02</div>
  <div class="size-14 flex-none ...">03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `grow` | `flex-grow: 1;` |
| `grow-<number>` | `flex-grow: <number>;` |
| `grow-[<value>]` | `flex-grow: <value>;` |
| `grow-(<custom-property>)` | `flex-grow: var(<custom-property>);` |

## Notes

- Migration (v3 → v4): the deprecated `flex-grow-*` utilities were removed in v4; use `grow-*` instead (upgrade guide, "Removed deprecated utilities").
- Allowing items to grow: `grow` allows a flex item to grow to fill any available space.
- The official `grow-[25vw]` example is transcribed verbatim, but `flex-grow` accepts only a non-negative unitless number, so a length such as `25vw` makes the declaration invalid; use a number such as `grow-[2.5]`.
- Growing items based on factor: `grow-<number>` utilities like `grow-3` make flex items grow proportionally based on their growth factor, allowing them to fill the available space relative to each other.

```html
<div class="flex ...">
  <div class="size-14 grow-3 ...">01</div>
  <div class="size-14 grow-7 ...">02</div>
  <div class="size-14 grow-3 ...">03</div>
</div>
```

- Preventing items from growing: `grow-0` prevents a flex item from growing.
- Custom value: use the `grow-[<value>]` syntax to set the flex grow factor based on a completely custom value:

```html
<div class="grow-[25vw] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `grow-(<custom-property>)` syntax, which is just a shorthand for `grow-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="grow-(--my-grow) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `flex-grow` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grow md:grow-0 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/flex-grow.mdx` (fetched 2026-10-16).

## Related

- [flex](./flex.md)
- [flex-shrink](./flex-shrink.md)
- [flex-basis](./flex-basis.md)
