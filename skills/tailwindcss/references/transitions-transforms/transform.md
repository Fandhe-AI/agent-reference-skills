---
source: https://tailwindcss.com/docs/transform
---

# transform

Utilities for transforming elements.

## Signature / Usage

```html
<div class="scale-150 transform-gpu">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `transform-(<custom-property>)` | `transform: var(<custom-property>);` |
| `transform-[<value>]` | `transform: <value>;` |
| `transform-none` | `transform: none;` |
| `transform-gpu` | `transform: translateZ(0) var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y);` |
| `transform-cpu` | `transform: var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y);` |

## Notes

- Hardware acceleration: if a transition performs better when rendered by the GPU instead of the CPU, add `transform-gpu`. Use `transform-cpu` to force things back to the CPU if you need to undo this conditionally.
- Use `transform-none` to remove all of the transforms on an element at once:

```html
<div class="skew-y-3 md:transform-none">
  <!-- ... -->
</div>
```

- Custom value: use `transform-[<value>]`; for CSS variables use `transform-(<custom-property>)`, shorthand for `transform-[var(<custom-property>)]`.

```html
<div class="transform-[matrix(1,2,3,4,5,6)] ...">
  <!-- ... -->
</div>
<div class="transform-(--my-transform) ...">
  <!-- ... -->
</div>
```

- Migration (v3 -> v4): `rotate-*`, `scale-*` and `translate-*` are based on the individual `rotate`, `scale` and `translate` CSS properties, so `transform-none` no longer resets them. Reset the individual properties instead (e.g. `scale-150 focus:scale-none`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transform.mdx` (fetched 2026-10-16).

## Related

- [rotate](./rotate.md)
- [scale](./scale.md)
- [translate](./translate.md)
- [skew](./skew.md)
