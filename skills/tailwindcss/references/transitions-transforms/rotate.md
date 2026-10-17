---
source: https://tailwindcss.com/docs/rotate
---

# rotate

Utilities for rotating elements.

## Signature / Usage

```html
<img class="rotate-45 ..." src="/img/mountains.jpg" />
<img class="rotate-90 ..." src="/img/mountains.jpg" />
<img class="rotate-210 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `rotate-none` | `rotate: none;` |
| `rotate-<number>` | `rotate: <number>deg;` |
| `-rotate-<number>` | `rotate: calc(<number>deg * -1);` |
| `rotate-(<custom-property>)` | `rotate: var(<custom-property>);` |
| `rotate-[<value>]` | `rotate: <value>;` |
| `rotate-x-<number>` | `transform: rotateX(<number>deg) var(--tw-rotate-y);` |
| `-rotate-x-<number>` | `transform: rotateX(-<number>deg) var(--tw-rotate-y);` |
| `rotate-x-(<custom-property>)` | `transform: rotateX(var(<custom-property>)) var(--tw-rotate-y);` |
| `rotate-x-[<value>]` | `transform: rotateX(<value>) var(--tw-rotate-y);` |
| `rotate-y-<number>` | `transform: var(--tw-rotate-x) rotateY(<number>deg);` |
| `-rotate-y-<number>` | `transform: var(--tw-rotate-x) rotateY(-<number>deg);` |
| `rotate-y-(<custom-property>)` | `transform: var(--tw-rotate-x) rotateY(var(<custom-property>));` |
| `rotate-y-[<value>]` | `transform: var(--tw-rotate-x) rotateY(<value>);` |
| `rotate-z-<number>` | `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(<number>deg);` |
| `-rotate-z-<number>` | `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(-<number>deg);` |
| `rotate-z-(<custom-property>)` | `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(var(<custom-property>));` |
| `rotate-z-[<value>]` | `transform: var(--tw-rotate-x) var(--tw-rotate-y) rotateZ(<value>);` |

## Notes

- Use `rotate-<number>` utilities like `rotate-45` and `rotate-90` to rotate an element by degrees.
- Negative values: `-rotate-<number>` utilities like `-rotate-45` and `-rotate-90` rotate counterclockwise.
- 3D rotation: use `rotate-x-<number>`, `rotate-y-<number>` and `rotate-z-<number>` together, e.g. `rotate-x-50 rotate-z-45`, `rotate-x-15 -rotate-y-30`, `rotate-y-25 rotate-z-30`.

```html
<img class="rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
<img class="rotate-x-15 -rotate-y-30 ..." src="/img/mountains.jpg" />
```

- Custom value: use `rotate-[<value>]`; for CSS variables use `rotate-(<custom-property>)`, shorthand for `rotate-[var(<custom-property>)]`.

```html
<img class="rotate-[3.142rad] ..." src="/img/mountains.jpg" />
<img class="rotate-(--my-rotation) ..." src="/img/mountains.jpg" />
```

- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<img class="rotate-45 md:rotate-60 ..." src="/img/mountains.jpg" />
```

- Migration (v3 -> v4): `rotate-*` is now based on the individual `rotate` CSS property. `transform-none` no longer resets it; reset the individual property instead (e.g. `focus:rotate-none`). Including `transform` in a customized transitioned-property list (`transition-[opacity,transform]`) no longer transitions it; list `rotate` instead.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/rotate.mdx` (fetched 2026-10-16).

## Related

- [scale](./scale.md)
- [translate](./translate.md)
- [skew](./skew.md)
- [transform](./transform.md)
