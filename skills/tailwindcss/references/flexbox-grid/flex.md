---
source: https://tailwindcss.com/docs/flex
---

# flex

Utilities for controlling how flex items both grow and shrink.

## Signature / Usage

```html
<div class="flex">
  <div class="w-14 flex-none ...">01</div>
  <div class="w-64 flex-1 ...">02</div>
  <div class="w-32 flex-1 ...">03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `flex-<number>` | `flex: <number>;` |
| `flex-<fraction>` | `flex: calc(<fraction> * 100%);` |
| `flex-auto` | `flex: auto;` |
| `flex-initial` | `flex: 0 auto;` |
| `flex-none` | `flex: none;` |
| `flex-(<custom-property>)` | `flex: var(<custom-property>);` |
| `flex-[<value>]` | `flex: <value>;` |

## Notes

- Basic example: `flex-<number>` utilities like `flex-1` allow a flex item to grow and shrink as needed, ignoring its initial size.
- Initial: `flex-initial` allows a flex item to shrink but not grow, taking into account its initial size.
- Auto: `flex-auto` allows a flex item to grow and shrink, taking into account its initial size.
- None: `flex-none` prevents a flex item from growing or shrinking.

```html
<div class="flex ...">
  <div class="w-14 flex-none ...">01</div>
  <div class="w-32 flex-none ...">02</div>
  <div class="flex-1 ...">03</div>
</div>
```

- Custom value: use the `flex-[<value>]` syntax to set the flex shorthand property based on a completely custom value:

```html
<div class="flex-[3_1_auto] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `flex-(<custom-property>)` syntax, which is just a shorthand for `flex-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="flex-(--my-flex) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `flex` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="flex-none md:flex-1 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/flex.mdx` (fetched 2026-10-16).

## Related

- [flex-basis](./flex-basis.md)
- [flex-grow](./flex-grow.md)
- [flex-shrink](./flex-shrink.md)
