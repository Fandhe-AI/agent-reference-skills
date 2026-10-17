---
source: https://tailwindcss.com/docs/order
---

# order

Utilities for controlling the order of flex and grid items.

## Signature / Usage

```html
<div class="flex justify-between ...">
  <div class="order-3 ...">01</div>
  <div class="order-1 ...">02</div>
  <div class="order-2 ...">03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `order-<number>` | `order: <number>;` |
| `-order-<number>` | `order: calc(<number> * -1);` |
| `order-first` | `order: -9999;` |
| `order-last` | `order: 9999;` |
| `order-(<custom-property>)` | `order: var(<custom-property>);` |
| `order-[<value>]` | `order: <value>;` |

## Notes

- Explicitly setting a sort order: `order-<number>` utilities like `order-1` and `order-3` render flex and grid items in a different order than they appear in the document.
- Ordering items first or last: `order-first` and `order-last` render flex and grid items first or last.

```html
<div class="flex justify-between ...">
  <div class="order-last ...">01</div>
  <div class="...">02</div>
  <div class="order-first ...">03</div>
</div>
```

- Negative values: to use a negative order value, prefix the class name with a dash:

```html
<div class="-order-1">
  <!-- ... -->
</div>
```

- Custom value: use the `order-[<value>]` syntax to set the order based on a completely custom value:

```html
<div class="order-[min(var(--total-items),10)] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `order-(<custom-property>)` syntax, which is just a shorthand for `order-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="order-(--my-order) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix an `order` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="order-first md:order-last ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/order.mdx` (fetched 2026-10-16).

## Related

- [flex-direction](./flex-direction.md)
- [grid-column](./grid-column.md)
