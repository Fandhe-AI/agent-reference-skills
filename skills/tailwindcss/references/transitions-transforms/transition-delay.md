---
source: https://tailwindcss.com/docs/transition-delay
---

# transition-delay

Utilities for controlling the delay of CSS transitions.

## Signature / Usage

```html
<button class="transition delay-150 duration-300 ease-in-out ...">Button A</button>
<button class="transition delay-300 duration-300 ease-in-out ...">Button B</button>
<button class="transition delay-700 duration-300 ease-in-out ...">Button C</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `delay-<number>` | `transition-delay: <number>ms;` |
| `delay-(<custom-property>)` | `transition-delay: var(<custom-property>);` |
| `delay-[<value>]` | `transition-delay: <value>;` |

## Notes

- Use utilities like `delay-150` and `delay-700` to set the transition delay of an element in milliseconds.
- Supporting reduced motion: use the `motion-safe` and `motion-reduce` variants:

```html
<button type="button" class="delay-300 motion-reduce:delay-0 ...">
  <!-- ... -->
</button>
```

- Custom value: use the `delay-[<value>]` syntax; for CSS variables use `delay-(<custom-property>)`, shorthand for `delay-[var(<custom-property>)]`.

```html
<button class="delay-[1s,250ms] ...">
  <!-- ... -->
</button>
<button class="delay-(--my-delay) ...">
  <!-- ... -->
</button>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<button class="delay-150 md:delay-300 ...">
  <!-- ... -->
</button>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transition-delay.mdx` (fetched 2026-10-16).

## Related

- [transition-property](./transition-property.md)
- [transition-duration](./transition-duration.md)
- [transition-timing-function](./transition-timing-function.md)
