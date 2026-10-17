---
source: https://tailwindcss.com/docs/columns
---

# columns

Utilities for controlling the number of columns within an element.

## Signature / Usage

```html
<div class="columns-3 gap-8 ...">
  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />
  <img class="aspect-square ..." src="/img/mountains-2.jpg" />
  <img class="aspect-square ..." src="/img/mountains-3.jpg" />
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `columns-<number>` | `columns: <number>;` |
| `columns-3xs` | `columns: var(--container-3xs); /* 16rem (256px) */` |
| `columns-2xs` | `columns: var(--container-2xs); /* 18rem (288px) */` |
| `columns-xs` | `columns: var(--container-xs); /* 20rem (320px) */` |
| `columns-sm` | `columns: var(--container-sm); /* 24rem (384px) */` |
| `columns-md` | `columns: var(--container-md); /* 28rem (448px) */` |
| `columns-lg` | `columns: var(--container-lg); /* 32rem (512px) */` |
| `columns-xl` | `columns: var(--container-xl); /* 36rem (576px) */` |
| `columns-2xl` | `columns: var(--container-2xl); /* 42rem (672px) */` |
| `columns-3xl` | `columns: var(--container-3xl); /* 48rem (768px) */` |
| `columns-4xl` | `columns: var(--container-4xl); /* 56rem (896px) */` |
| `columns-5xl` | `columns: var(--container-5xl); /* 64rem (1024px) */` |
| `columns-6xl` | `columns: var(--container-6xl); /* 72rem (1152px) */` |
| `columns-7xl` | `columns: var(--container-7xl); /* 80rem (1280px) */` |
| `columns-auto` | `columns: auto;` |
| `columns-(<custom-property>)` | `columns: var(<custom-property>);` |
| `columns-[<value>]` | `columns: <value>;` |

## Notes

- Setting by number (`columns-3`): the column width automatically adjusts to accommodate the specified number of columns.
- Setting by width (`columns-xs`, `columns-3xs`, ...): sets the ideal column width; the number of columns automatically adjusts so they do not get too narrow.
- Column gap: use `gap-<width>` utilities, e.g. `columns-3 gap-8`; see the gap documentation.
- Custom value: `columns-[30vw]`; `columns-(--my-columns)` is shorthand for `columns-[var(--my-columns)]`.
- Responsive: `columns-2 gap-4 sm:columns-3 sm:gap-8`.
- Theme: the width utilities are driven by `--container-*` theme variables, e.g. `@theme { --container-4xs: 14rem; }` then use `columns-4xs`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/columns.mdx` (fetched 2026-10-16).

## Related

- [break-after](./break-after.md)
- [break-before](./break-before.md)
- [break-inside](./break-inside.md)
- [gap](../flexbox-grid/gap.md)
