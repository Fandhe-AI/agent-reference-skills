---
source: https://tailwindcss.com/docs/flex-shrink
---

# flex-shrink

Utilities for controlling how flex items shrink.

## Signature / Usage

```html
<div class="flex ...">
  <div class="h-14 w-14 flex-none ...">01</div>
  <div class="h-14 w-64 shrink ...">02</div>
  <div class="h-14 w-14 flex-none ...">03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `shrink` | `flex-shrink: 1;` |
| `shrink-<number>` | `flex-shrink: <number>;` |
| `shrink-[<value>]` | `flex-shrink: <value>;` |
| `shrink-(<custom-property>)` | `flex-shrink: var(<custom-property>);` |

## Notes

- Migration (v3 → v4): the deprecated `flex-shrink-*` utilities were removed in v4; use `shrink-*` instead (upgrade guide, "Removed deprecated utilities").
- Allowing flex items to shrink: `shrink` allows a flex item to shrink if needed.
- The official `shrink-[calc(100vw-var(--sidebar))]` example is transcribed verbatim, but `flex-shrink` accepts only a non-negative unitless number, so a length expression makes the declaration invalid; use a number such as `shrink-[2]`.
- Preventing items from shrinking: `shrink-0` prevents a flex item from shrinking.

```html
<div class="flex ...">
  <div class="h-16 flex-1 ...">01</div>
  <div class="h-16 w-32 shrink-0 ...">02</div>
  <div class="h-16 flex-1 ...">03</div>
</div>
```

- Custom value: use the `shrink-[<value>]` syntax to set the flex shrink factor based on a completely custom value:

```html
<div class="shrink-[calc(100vw-var(--sidebar))] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `shrink-(<custom-property>)` syntax, which is just a shorthand for `shrink-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="shrink-(--my-shrink) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `flex-shrink` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="shrink md:shrink-0 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/flex-shrink.mdx` (fetched 2026-10-16).

## Related

- [flex](./flex.md)
- [flex-grow](./flex-grow.md)
- [flex-basis](./flex-basis.md)
