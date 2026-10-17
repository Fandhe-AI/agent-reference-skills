---
source: https://tailwindcss.com/docs/transition-property
---

# transition-property

Utilities for controlling which CSS properties transition.

## Signature / Usage

```html
<button class="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...">
  Save Changes
</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `transition` | `transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-all` | `transition-property: all;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-colors` | `transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-opacity` | `transition-property: opacity;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-shadow` | `transition-property: box-shadow;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-transform` | `transition-property: transform, translate, scale, rotate;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-none` | `transition-property: none;` |
| `transition-(<custom-property>)` | `transition-property: var(<custom-property>);` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |
| `transition-[<value>]` | `transition-property: <value>;` `transition-timing-function: var(--default-transition-timing-function); /* cubic-bezier(0.4, 0, 0.2, 1) */` `transition-duration: var(--default-transition-duration); /* 150ms */` |

## Notes

- Use utilities like `transition` and `transition-colors` to specify which properties should transition when they change.
- Supporting reduced motion: use the `motion-safe` and `motion-reduce` variants to conditionally apply animations and transitions when the user prefers reduced motion:

```html
<button class="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">
  <!-- ... -->
</button>
```

- Custom value: use the `transition-[<value>]` syntax (for example `transition-[height]`) to set the transition properties based on a completely custom value; for CSS variables use `transition-(<custom-property>)`, shorthand for `transition-[var(<custom-property>)]`.

```html
<button class="transition-[height] ...">
  <!-- ... -->
</button>
<button class="transition-(--my-properties) ...">
  <!-- ... -->
</button>
```

- Responsive design: prefix with a breakpoint variant like `md:` to apply only at medium screen sizes and above:

```html
<button class="transition-none md:transition-all ...">
  <!-- ... -->
</button>
```

- Migration (v3 -> v4): `transition` and `transition-colors` now include the `outline-color` property. If you add an outline with a custom color on focus, the color transitions from the default color; set the outline color unconditionally (for example `outline-cyan-500 transition hover:outline-2`) or for both states.
- Migration (v3 -> v4): `rotate-*`, `scale-*` and `translate-*` are based on the individual `rotate`, `scale` and `translate` CSS properties, so `transition-[opacity,transform]` no longer transitions them. Include the individual properties instead, for example `transition-[opacity,scale]`.
- JS animation libraries (Motion) are covered by the motion skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transition-property.mdx` (fetched 2026-10-16).

## Related

- [transition-duration](./transition-duration.md)
- [transition-timing-function](./transition-timing-function.md)
- [transition-delay](./transition-delay.md)
- [transition-behavior](./transition-behavior.md)
- [animation](./animation.md)
