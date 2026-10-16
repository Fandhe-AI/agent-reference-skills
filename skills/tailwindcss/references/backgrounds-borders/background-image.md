---
source: https://tailwindcss.com/docs/background-image
---

# background-image

Utilities for controlling an element's background image.

## Signature / Usage

```html
<div class="bg-[url(/img/mountains.jpg)] ..."></div>
<div class="h-14 bg-linear-to-r from-cyan-500 to-blue-500"></div>
<div class="bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `bg-[<value>]` | `background-image: <value>;` |
| `bg-(image:<custom-property>)` | `background-image: var(<custom-property>);` |
| `bg-none` | `background-image: none;` |
| `bg-linear-to-t` | `background-image: linear-gradient(to top, var(--tw-gradient-stops));` |
| `bg-linear-to-tr` | `background-image: linear-gradient(to top right, var(--tw-gradient-stops));` |
| `bg-linear-to-r` | `background-image: linear-gradient(to right, var(--tw-gradient-stops));` |
| `bg-linear-to-br` | `background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));` |
| `bg-linear-to-b` | `background-image: linear-gradient(to bottom, var(--tw-gradient-stops));` |
| `bg-linear-to-bl` | `background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));` |
| `bg-linear-to-l` | `background-image: linear-gradient(to left, var(--tw-gradient-stops));` |
| `bg-linear-to-tl` | `background-image: linear-gradient(to top left, var(--tw-gradient-stops));` |
| `bg-linear-<angle>` | `background-image: linear-gradient(<angle> in oklab, var(--tw-gradient-stops));` |
| `-bg-linear-<angle>` | `background-image: linear-gradient(-<angle> in oklab, var(--tw-gradient-stops));` |
| `bg-linear-(<custom-property>)` | `background-image: linear-gradient(var(--tw-gradient-stops, var(<custom-property>)));` |
| `bg-linear-[<value>]` | `background-image: linear-gradient(var(--tw-gradient-stops, <value>));` |
| `bg-radial` | `background-image: radial-gradient(in oklab, var(--tw-gradient-stops));` |
| `bg-radial-(<custom-property>)` | `background-image: radial-gradient(var(--tw-gradient-stops, var(<custom-property>)));` |
| `bg-radial-[<value>]` | `background-image: radial-gradient(var(--tw-gradient-stops, <value>));` |
| `bg-conic-<angle>` | `background-image: conic-gradient(from <angle> in oklab, var(--tw-gradient-stops));` |
| `-bg-conic-<angle>` | `background-image: conic-gradient(from -<angle> in oklab, var(--tw-gradient-stops));` |
| `bg-conic-(<custom-property>)` | `background-image: var(<custom-property>);` |
| `bg-conic-[<value>]` | `background-image: <value>;` |
| `from-<color>` | `--tw-gradient-from: <color>;` |
| `from-<percentage>` | `--tw-gradient-from-position: <percentage>;` |
| `from-(<custom-property>)` | `--tw-gradient-from: var(<custom-property>);` |
| `from-[<value>]` | `--tw-gradient-from: <value>;` |
| `via-<color>` | `--tw-gradient-via: <color>;` |
| `via-<percentage>` | `--tw-gradient-via-position: <percentage>;` |
| `via-(<custom-property>)` | `--tw-gradient-via: var(<custom-property>);` |
| `via-[<value>]` | `--tw-gradient-via: <value>;` |
| `to-<color>` | `--tw-gradient-to: <color>;` |
| `to-<percentage>` | `--tw-gradient-to-position: <percentage>;` |
| `to-(<custom-property>)` | `--tw-gradient-to: var(<custom-property>);` |
| `to-[<value>]` | `--tw-gradient-to: <value>;` |

## Notes

- Basic: use `bg-[<value>]` to set the background image, e.g. `bg-[url(/img/mountains.jpg)]`.
- Linear gradient: use `bg-linear-to-r` or `bg-linear-<angle>` (e.g. `bg-linear-65`) with the color stop utilities.
- Radial gradient: use `bg-radial` and `bg-radial-[<position>]` (e.g. `bg-radial-[at_50%_75%]`) with the color stop utilities.
- Conic gradient: use `bg-conic` and `bg-conic-<angle>` (e.g. `bg-conic-180`, `bg-conic/decreasing`) with the color stop utilities.
- Color stops: `from-indigo-500`, `via-purple-500`, `to-pink-500`. Stop positions: `from-10%`, `via-30%`, `to-90%`.
- Interpolation mode: use the modifier, e.g. `bg-linear-to-r/srgb`, `/hsl`, `/oklab`, `/oklch`, `/longer`, `/shorter`, `/increasing`, `/decreasing`. By default gradients are interpolated in the `oklab` color space.
- `bg-none` removes an existing background image.
- Custom value: `bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]` and `from-[<value>]`; for CSS variables use `bg-linear-(--my-gradient)` / `from-(--my-gradient)`, shorthand for `bg-linear-[var(--my-gradient)]` that adds the `var()` function automatically.
- Responsive: prefix with a breakpoint variant like `md:` (`from-purple-400 md:from-yellow-500`).
- Theme: color stops use the `--color-*` theme variables; `@theme { --color-regal-blue: #243c5a; }` makes `from-regal-blue`, `via-regal-blue`, `to-regal-blue` available.
- Migration (v3 → v4): in v3, overriding part of a gradient with a variant reset the entire gradient; in v4 the other stop values are preserved. Use `via-none` to unset a three-stop gradient back to two stops in a specific state (`dark:via-none`). The upgrade guide's examples show the v3 `bg-gradient-to-r` against the v4 `bg-linear-to-r`. Variables in arbitrary values use parentheses (`bg-(--brand-color)`), not `bg-[--brand-color]`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-image.mdx` (fetched 2026-10-16).

```html
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none dark:from-blue-500 dark:to-teal-400">
  <!-- ... -->
</div>
```

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

## Related

- [background-color](./background-color.md)
- [background-size](./background-size.md)
- [background-position](./background-position.md)
- [background-repeat](./background-repeat.md)
