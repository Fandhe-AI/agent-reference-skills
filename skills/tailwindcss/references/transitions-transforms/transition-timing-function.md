---
source: https://tailwindcss.com/docs/transition-timing-function
---

# transition-timing-function

Utilities for controlling the easing of CSS transitions.

## Signature / Usage

```html
<button class="duration-300 ease-in ...">Button A</button>
<button class="duration-300 ease-out ...">Button B</button>
<button class="duration-300 ease-in-out ...">Button C</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `ease-linear` | `transition-timing-function: linear;` |
| `ease-in` | `transition-timing-function: var(--ease-in); /* cubic-bezier(0.4, 0, 1, 1) */` |
| `ease-out` | `transition-timing-function: var(--ease-out); /* cubic-bezier(0, 0, 0.2, 1) */` |
| `ease-in-out` | `transition-timing-function: var(--ease-in-out); /* cubic-bezier(0.4, 0, 0.2, 1) */` |
| `ease-initial` | `transition-timing-function: initial;` |
| `ease-(<custom-property>)` | `transition-timing-function: var(<custom-property>);` |
| `ease-[<value>]` | `transition-timing-function: <value>;` |

## Notes

- Use utilities like `ease-in` and `ease-out` to control the easing curve of an element's transition.
- Custom value: use the `ease-[<value>]` syntax; for CSS variables use `ease-(<custom-property>)`, shorthand for `ease-[var(<custom-property>)]`.

```html
<button class="ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ...">
  <!-- ... -->
</button>
<button class="ease-(--my-ease) ...">
  <!-- ... -->
</button>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<button class="ease-out md:ease-in ...">
  <!-- ... -->
</button>
```

- Customizing your theme: use the `--ease-*` theme variables to customize the utilities, e.g. `--ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);` inside `@theme`, then use `ease-in-expo`:

```css
@theme {
  --ease-in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transition-timing-function.mdx` (fetched 2026-10-16).

## Related

- [transition-property](./transition-property.md)
- [transition-duration](./transition-duration.md)
- [transition-delay](./transition-delay.md)
