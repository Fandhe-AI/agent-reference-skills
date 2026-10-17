---
source: https://tailwindcss.com/docs/transition-duration
---

# transition-duration

Utilities for controlling the duration of CSS transitions.

## Signature / Usage

```html
<button class="transition duration-150 ease-in-out ...">Button A</button>
<button class="transition duration-300 ease-in-out ...">Button B</button>
<button class="transition duration-700 ease-in-out ...">Button C</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `duration-<number>` | `transition-duration: <number>ms;` |
| `duration-initial` | `transition-duration: initial;` |
| `duration-(<custom-property>)` | `transition-duration: var(<custom-property>);` |
| `duration-[<value>]` | `transition-duration: <value>;` |

## Notes

- Use utilities like `duration-150` and `duration-700` to set the transition duration of an element in milliseconds.
- Supporting reduced motion: use the `motion-safe` and `motion-reduce` variants:

```html
<button type="button" class="duration-300 motion-reduce:duration-0 ...">
  <!-- ... -->
</button>
```

- Custom value: use the `duration-[<value>]` syntax to set the transition duration based on a completely custom value; for CSS variables use `duration-(<custom-property>)`, shorthand for `duration-[var(<custom-property>)]`.

```html
<button class="duration-[1s,15s] ...">
  <!-- ... -->
</button>
<button class="duration-(--my-duration) ...">
  <!-- ... -->
</button>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<button class="duration-0 md:duration-150 ...">
  <!-- ... -->
</button>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transition-duration.mdx` (fetched 2026-10-16).

## Related

- [transition-property](./transition-property.md)
- [transition-timing-function](./transition-timing-function.md)
- [transition-delay](./transition-delay.md)
