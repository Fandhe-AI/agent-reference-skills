---
source: https://tailwindcss.com/docs/translate
---

# translate

Utilities for translating elements.

## Signature / Usage

```html
<img class="-translate-6 ..." src="/img/mountains.jpg" />
<img class="translate-2 ..." src="/img/mountains.jpg" />
<img class="translate-8 ..." src="/img/mountains.jpg" />
```

## Options / Props

| Class | Styles |
| --- | --- |
| `translate-<number>` | `translate: calc(var(--spacing) * <number>) calc(var(--spacing) * <number>);` |
| `-translate-<number>` | `translate: calc(var(--spacing) * -<number>) calc(var(--spacing) * -<number>);` |
| `translate-<fraction>` | `translate: calc(<fraction> * 100%) calc(<fraction> * 100%);` |
| `-translate-<fraction>` | `translate: calc(<fraction> * -100%) calc(<fraction> * -100%);` |
| `translate-full` | `translate: 100% 100%;` |
| `-translate-full` | `translate: -100% -100%;` |
| `translate-px` | `translate: 1px 1px;` |
| `-translate-px` | `translate: -1px -1px;` |
| `translate-(<custom-property>)` | `translate: var(<custom-property>) var(<custom-property>);` |
| `translate-[<value>]` | `translate: <value> <value>;` |
| `translate-x-<number>` | `translate: calc(var(--spacing) * <number>) var(--tw-translate-y);` |
| `-translate-x-<number>` | `translate: calc(var(--spacing) * -<number>) var(--tw-translate-y);` |
| `translate-x-<fraction>` | `translate: calc(<fraction> * 100%) var(--tw-translate-y);` |
| `-translate-x-<fraction>` | `translate: calc(<fraction> * -100%) var(--tw-translate-y);` |
| `translate-x-full` | `translate: 100% var(--tw-translate-y);` |
| `-translate-x-full` | `translate: -100% var(--tw-translate-y);` |
| `translate-x-px` | `translate: 1px var(--tw-translate-y);` |
| `-translate-x-px` | `translate: -1px var(--tw-translate-y);` |
| `translate-x-(<custom-property>)` | `translate: var(<custom-property>) var(--tw-translate-y);` |
| `translate-x-[<value>]` | `translate: <value> var(--tw-translate-y);` |
| `translate-y-<number>` | `translate: var(--tw-translate-x) calc(var(--spacing) * <number>);` |
| `-translate-y-<number>` | `translate: var(--tw-translate-x) calc(var(--spacing) * -<number>);` |
| `translate-y-<fraction>` | `translate: var(--tw-translate-x) calc(<fraction> * 100%);` |
| `-translate-y-<fraction>` | `translate: var(--tw-translate-x) calc(<fraction> * -100%);` |
| `translate-y-full` | `translate: var(--tw-translate-x) 100%;` |
| `-translate-y-full` | `translate: var(--tw-translate-x) -100%;` |
| `translate-y-px` | `translate: var(--tw-translate-x) 1px;` |
| `-translate-y-px` | `translate: var(--tw-translate-x) -1px;` |
| `translate-y-(<custom-property>)` | `translate: var(--tw-translate-x) var(<custom-property>);` |
| `translate-y-[<value>]` | `translate: var(--tw-translate-x) <value>;` |
| `translate-z-<number>` | `translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * <number>);` |
| `-translate-z-<number>` | `translate: var(--tw-translate-x) var(--tw-translate-y) calc(var(--spacing) * -<number>);` |
| `translate-z-px` | `translate: var(--tw-translate-x) var(--tw-translate-y) 1px;` |
| `-translate-z-px` | `translate: var(--tw-translate-x) var(--tw-translate-y) -1px;` |
| `translate-z-(<custom-property>)` | `translate: var(--tw-translate-x) var(--tw-translate-y) var(<custom-property>);` |
| `translate-z-[<value>]` | `translate: var(--tw-translate-x) var(--tw-translate-y) <value>;` |
| `translate-none` | `translate: none;` |

## Notes

- Spacing scale: `translate-<number>` utilities like `translate-2` and `-translate-4` translate on both axes based on the spacing scale (`--spacing`).
- Percentage: `translate-<fraction>` utilities like `translate-1/4` and `-translate-full` translate by a percentage of the element's size.
- Axes: `translate-x-<number>` / `translate-x-<fraction>` (e.g. `translate-x-4`, `translate-x-1/4`) on the x-axis; `translate-y-<number>` / `translate-y-<fraction>` (e.g. `translate-y-6`, `translate-y-1/3`) on the y-axis; `translate-z-<number>` (e.g. `translate-z-6`, `-translate-z-12`) on the z-axis.
- The `translate-z-<number>` utilities require the `transform-3d` utility to be applied to the parent element:

```html
<div class="transform-3d">
  <img class="-translate-z-8 rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
  <img class="translate-z-2 rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
  <img class="translate-z-1/2 rotate-x-50 rotate-z-45 ..." src="/img/mountains.jpg" />
</div>
```

- Caution: the `translate-z-1/2` line above is reproduced as written in the official example, but the z component of CSS `translate` accepts only a `<length>` (no percentage), so fraction values do not work on the z-axis; use `translate-z-<number>` (e.g. `translate-z-4`) or an arbitrary length such as `translate-z-[2rem]`.
- Custom value: use `translate-[<value>]`; for CSS variables use `translate-(<custom-property>)`, shorthand for `translate-[var(<custom-property>)]`.

```html
<img class="translate-[3.142rad] ..." src="/img/mountains.jpg" />
<img class="translate-(--my-translation) ..." src="/img/mountains.jpg" />
```

- Caution: `3.142rad` above is reproduced as written in the official example, but `translate` accepts only lengths and percentages, so an angle value produces an invalid declaration; use a length such as `translate-[3.142rem]`.
- Responsive design: prefix with a breakpoint variant like `md:`:

```html
<img class="translate-45 md:translate-60 ..." src="/img/mountains.jpg" />
```

- Migration (v3 -> v4): `translate-*` is now based on the individual `translate` CSS property. `transform-none` no longer resets it; reset with `translate-none`. Including `transform` in a customized transitioned-property list (`transition-[opacity,transform]`) no longer transitions it; list `translate` instead.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/translate.mdx` (fetched 2026-10-16).

## Related

- [rotate](./rotate.md)
- [scale](./scale.md)
- [transform-style](./transform-style.md)
- [transform](./transform.md)
