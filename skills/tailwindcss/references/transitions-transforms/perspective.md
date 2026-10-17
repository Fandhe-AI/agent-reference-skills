---
source: https://tailwindcss.com/docs/perspective
---

# perspective

Utilities for controlling an element's perspective when placed in 3D space.

## Signature / Usage

```html
<div class="size-20 perspective-dramatic ...">
  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>
  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>
</div>

<div class="size-20 perspective-normal ...">
  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>
  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `perspective-dramatic` | `perspective: var(--perspective-dramatic); /* 100px */` |
| `perspective-near` | `perspective: var(--perspective-near); /* 300px */` |
| `perspective-normal` | `perspective: var(--perspective-normal); /* 500px */` |
| `perspective-midrange` | `perspective: var(--perspective-midrange); /* 800px */` |
| `perspective-distant` | `perspective: var(--perspective-distant); /* 1200px */` |
| `perspective-none` | `perspective: none;` |
| `perspective-(<custom-property>)` | `perspective: var(<custom-property>);` |
| `perspective-[<value>]` | `perspective: <value>;` |

## Notes

- Use utilities like `perspective-normal` and `perspective-distant` to control how close or how far away the z-plane is from the screen. This is like moving a camera closer to or further away from an object.
- Use `perspective-none` to remove a perspective transform from an element.
- Custom value: use `perspective-[<value>]`; for CSS variables use `perspective-(<custom-property>)`, shorthand for `perspective-[var(<custom-property>)]`.

```html
<div class="perspective-[750px] ...">
  <!-- ... -->
</div>
<div class="perspective-(--my-perspective) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<div class="perspective-midrange md:perspective-dramatic ...">
  <!-- ... -->
</div>
```

- Customizing your theme: use the `--perspective-*` theme variables:

```css
@theme {
  --perspective-remote: 1800px;
}
```

Then `perspective-remote` can be used in your markup.

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/perspective.mdx` (fetched 2026-10-16).

## Related

- [perspective-origin](./perspective-origin.md)
- [transform-style](./transform-style.md)
- [backface-visibility](./backface-visibility.md)
