---
source: https://tailwindcss.com/docs/scale
---

# scale

Utilities for scaling elements.

## Signature / Usage

```html
<img class="scale-75 ..." src="/img/mountains.jpg" />
<img class="scale-100 ..." src="/img/mountains.jpg" />
<img class="scale-125 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scale-none` | `scale: none;` |
| `scale-<number>` | `scale: <number>% <number>%;` |
| `-scale-<number>` | `scale: calc(<number>% * -1) calc(<number>% * -1);` |
| `scale-(<custom-property>)` | `scale: var(<custom-property>) var(<custom-property>);` |
| `scale-[<value>]` | `scale: <value>;` |
| `scale-x-<number>` | `scale: <number>% var(--tw-scale-y);` |
| `-scale-x-<number>` | `scale: calc(<number>% * -1) var(--tw-scale-y);` |
| `scale-x-(<custom-property>)` | `scale: var(<custom-property>) var(--tw-scale-y);` |
| `scale-x-[<value>]` | `scale: <value> var(--tw-scale-y);` |
| `scale-y-<number>` | `scale: var(--tw-scale-x) <number>%;` |
| `-scale-y-<number>` | `scale: var(--tw-scale-x) calc(<number>% * -1);` |
| `scale-y-(<custom-property>)` | `scale: var(--tw-scale-x) var(<custom-property>);` |
| `scale-y-[<value>]` | `scale: var(--tw-scale-x) <value>;` |
| `scale-z-<number>` | `scale: var(--tw-scale-x) var(--tw-scale-y) <number>%;` |
| `-scale-z-<number>` | `scale: var(--tw-scale-x) var(--tw-scale-y) calc(<number>% * -1);` |
| `scale-z-(<custom-property>)` | `scale: var(--tw-scale-x) var(--tw-scale-y) var(<custom-property>);` |
| `scale-z-[<value>]` | `scale: var(--tw-scale-x) var(--tw-scale-y) <value>;` |
| `scale-3d` | `scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z);` |

## Notes

- Use `scale-<number>` utilities like `scale-75` and `scale-150` to scale an element by a percentage of its original size.
- Use `scale-x-<number>` (e.g. `scale-x-75`, `-scale-x-150`) to scale on the x-axis by a percentage of the original width, and `scale-y-<number>` (e.g. `scale-y-75`, `scale-y-150`) on the y-axis by a percentage of the original height.
- Negative values: `-scale-<number>`, `-scale-x-<number>` or `-scale-y-<number>` (e.g. `-scale-x-75`, `-scale-125`) mirror and scale down an element.

```html
<img class="-scale-x-75 ..." src="/img/mountains.jpg" />
<img class="-scale-100 ..." src="/img/mountains.jpg" />
<img class="-scale-y-125 ..." src="/img/mountains.jpg" />
```

- Custom value: use `scale-[<value>]`; for CSS variables use `scale-(<custom-property>)`, shorthand for `scale-[var(<custom-property>)]`.

```html
<img class="scale-[1.7] ..." src="/img/mountains.jpg" />
<img class="scale-(--my-scale) ..." src="/img/mountains.jpg" />
```

- Applying on hover: prefix with a variant like `hover:*` to apply only in that state:

```html
<img class="scale-95 hover:scale-120 ..." src="/img/mountains.jpg" />
```

- Migration (v3 -> v4): `scale-*` is now based on the individual `scale` CSS property. `transform-none` no longer resets it; reset with `scale-none` (e.g. `scale-150 focus:scale-none`). Including `transform` in a customized transitioned-property list (`transition-[opacity,transform]`) no longer transitions it; use `transition-[opacity,scale]`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scale.mdx` (fetched 2026-10-16).

## Related

- [rotate](./rotate.md)
- [translate](./translate.md)
- [zoom](./zoom.md)
- [transform](./transform.md)
