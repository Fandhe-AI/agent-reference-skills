---
source: https://tailwindcss.com/docs/border-radius
---

# border-radius

Utilities for controlling the border radius of an element.

## Signature / Usage

```html
<div class="rounded-sm ..."></div>
<div class="rounded-md ..."></div>
<div class="rounded-lg ..."></div>
<div class="rounded-xl ..."></div>
```

## Options / Props

Each prefix below accepts the same twelve forms: `<prefix>-xs`, `-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-3xl`, `-4xl`, `-none`, `-full`, `<prefix>-(<custom-property>)`, `<prefix>-[<value>]`. The source table lists only these suffixed forms; the bare `rounded` class appears in the page's examples (see Notes).

| Prefix | Properties |
|--------|------------|
| `rounded` | `border-radius` |
| `rounded-s` | `border-start-start-radius`, `border-end-start-radius` |
| `rounded-e` | `border-start-end-radius`, `border-end-end-radius` |
| `rounded-t` | `border-top-left-radius`, `border-top-right-radius` |
| `rounded-r` | `border-top-right-radius`, `border-bottom-right-radius` |
| `rounded-b` | `border-bottom-right-radius`, `border-bottom-left-radius` |
| `rounded-l` | `border-top-left-radius`, `border-bottom-left-radius` |
| `rounded-ss` | `border-start-start-radius` |
| `rounded-se` | `border-start-end-radius` |
| `rounded-ee` | `border-end-end-radius` |
| `rounded-es` | `border-end-start-radius` |
| `rounded-tl` | `border-top-left-radius` |
| `rounded-tr` | `border-top-right-radius` |
| `rounded-br` | `border-bottom-right-radius` |
| `rounded-bl` | `border-bottom-left-radius` |

| Suffix | Value set on every property of the prefix |
|--------|-------------------------------------------|
| `-xs` | `var(--radius-xs); /* 0.125rem (2px) */` |
| `-sm` | `var(--radius-sm); /* 0.25rem (4px) */` |
| `-md` | `var(--radius-md); /* 0.375rem (6px) */` |
| `-lg` | `var(--radius-lg); /* 0.5rem (8px) */` |
| `-xl` | `var(--radius-xl); /* 0.75rem (12px) */` |
| `-2xl` | `var(--radius-2xl); /* 1rem (16px) */` |
| `-3xl` | `var(--radius-3xl); /* 1.5rem (24px) */` |
| `-4xl` | `var(--radius-4xl); /* 2rem (32px) */` |
| `-none` | `0;` |
| `-full` | `calc(infinity * 1px);` |
| `-(<custom-property>)` | `var(<custom-property>);` |
| `-[<value>]` | `<value>;` |

Expanded, for example: `rounded-t-lg` is `border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg);`; `rounded-s-full` is `border-start-start-radius: calc(infinity * 1px); border-end-start-radius: calc(infinity * 1px);`.

Logical property utilities and their physical equivalents:

| Class | Left-to-right | Right-to-left |
|-------|---------------|---------------|
| `rounded-s-*` | `rounded-l-*` | `rounded-r-*` |
| `rounded-e-*` | `rounded-r-*` | `rounded-l-*` |
| `rounded-ss-*` | `rounded-tl-*` | `rounded-tr-*` |
| `rounded-se-*` | `rounded-tr-*` | `rounded-tl-*` |
| `rounded-es-*` | `rounded-bl-*` | `rounded-br-*` |
| `rounded-ee-*` | `rounded-br-*` | `rounded-bl-*` |

## Notes

- Sides: `rounded-t-md`, `rounded-r-lg`, `rounded-b-lg`, `rounded-l-lg`. Corners: `rounded-tl-lg`, `rounded-tr-lg`, `rounded-br-lg`, `rounded-bl-lg`.
- Logical properties (`rounded-s-md`, `rounded-se-xl`) map to the appropriate corners based on the text direction. For more control, use the LTR and RTL modifiers (`ltr:` / `rtl:`, see the hover-focus-and-other-states page).
- `rounded-full` creates pill buttons; `rounded-none` removes an existing border radius.
- Custom value: `rounded-[2vw]`; for CSS variables `rounded-(--my-radius)`, shorthand for `rounded-[var(--my-radius)]`.
- Responsive: prefix with a breakpoint variant like `md:` (`rounded md:rounded-lg`).
- Theme: customize with `--radius-*` theme variables, e.g. `@theme { --radius-5xl: 3rem; }` makes `rounded-5xl` available.
- Migration (v3 → v4): the default radius scale was renamed so every utility has a named value. `rounded-sm` is now `rounded-xs` and `rounded` is now `rounded-sm`; the "bare" versions still work for backward compatibility, but `rounded-sm` looks different unless updated to `rounded-xs`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/border-radius.mdx` (fetched 2026-10-16).

```css
@theme {
  --radius-5xl: 3rem;
}
```

```html
<div class="rounded-5xl"></div>
<div class="rounded-[2vw] ..."></div>
<div class="rounded-(--my-radius) ..."></div>
<div class="rounded md:rounded-lg ..."></div>
```

## Related

- [border-width](./border-width.md)
- [border-color](./border-color.md)
- [border-style](./border-style.md)
