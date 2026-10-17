---
source: https://tailwindcss.com/docs/box-shadow
---

# box-shadow

Utilities for controlling the box shadow of an element.

## Signature / Usage

```html
<div class="shadow-md ..."></div>
<div class="shadow-xl/20 ..."></div>
<div class="shadow-lg shadow-cyan-500/50 ..."></div>
<div class="inset-shadow-sm inset-shadow-indigo-500 ..."></div>
<button class="ring-2 ring-blue-500 ...">Subscribe</button>
<button class="inset-ring-2 inset-ring-blue-500 ...">Subscribe</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `shadow-2xs` | `box-shadow: var(--shadow-2xs); /* 0 1px rgb(0 0 0 / 0.05) */` |
| `shadow-xs` | `box-shadow: var(--shadow-xs); /* 0 1px 2px 0 rgb(0 0 0 / 0.05) */` |
| `shadow-sm` | `box-shadow: var(--shadow-sm); /* 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) */` |
| `shadow-md` | `box-shadow: var(--shadow-md); /* 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) */` |
| `shadow-lg` | `box-shadow: var(--shadow-lg); /* 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) */` |
| `shadow-xl` | `box-shadow: var(--shadow-xl); /* 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) */` |
| `shadow-2xl` | `box-shadow: var(--shadow-2xl); /* 0 25px 50px -12px rgb(0 0 0 / 0.25) */` |
| `shadow-none` | `box-shadow: 0 0 #0000;` |
| `shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `shadow-(color:<custom-property>)` | `--tw-shadow-color: var(<custom-property>);` |
| `shadow-[<value>]` | `box-shadow: <value>;` |
| `shadow-inherit` | `--tw-shadow-color: inherit;` |
| `shadow-current` | `--tw-shadow-color: currentColor;` |
| `shadow-transparent` | `--tw-shadow-color: transparent;` |
| `shadow-<color>` | `--tw-shadow-color: var(--color-<color>); /* value from theme.css */` |
| `inset-shadow-2xs` | `box-shadow: var(--inset-shadow-2xs); /* inset 0 1px rgb(0 0 0 / 0.05) */` |
| `inset-shadow-xs` | `box-shadow: var(--inset-shadow-xs); /* inset 0 1px 1px rgb(0 0 0 / 0.05) */` |
| `inset-shadow-sm` | `box-shadow: var(--inset-shadow-sm); /* inset 0 2px 4px rgb(0 0 0 / 0.05) */` |
| `inset-shadow-none` | `box-shadow: inset 0 0 #0000;` |
| `inset-shadow-(<custom-property>)` | `box-shadow: var(<custom-property>);` |
| `inset-shadow-[<value>]` | `box-shadow: <value>;` |
| `inset-shadow-inherit` | `--tw-inset-shadow-color: inherit;` |
| `inset-shadow-current` | `--tw-inset-shadow-color: currentColor;` |
| `inset-shadow-transparent` | `--tw-inset-shadow-color: transparent;` |
| `inset-shadow-<color>` | `--tw-inset-shadow-color: var(--color-<color>); /* value from theme.css */` |
| `ring` | `--tw-ring-shadow: 0 0 0 1px;` |
| `ring-<number>` | `--tw-ring-shadow: 0 0 0 <number>px;` |
| `ring-(<custom-property>)` | `--tw-ring-shadow: 0 0 0 var(<custom-property>);` |
| `ring-[<value>]` | `--tw-ring-shadow: 0 0 0 <value>;` |
| `ring-inherit` | `--tw-ring-color: inherit;` |
| `ring-current` | `--tw-ring-color: currentColor;` |
| `ring-transparent` | `--tw-ring-color: transparent;` |
| `ring-<color>` | `--tw-ring-color: var(--color-<color>); /* value from theme.css */` |
| `inset-ring` | `--tw-inset-ring-shadow: inset 0 0 0 1px` |
| `inset-ring-<number>` | `--tw-inset-ring-shadow: inset 0 0 0 <number>px` |
| `inset-ring-(<custom-property>)` | `--tw-inset-ring-shadow: inset 0 0 0 var(<custom-property>);` |
| `inset-ring-[<value>]` | `--tw-inset-ring-shadow: inset 0 0 0 <value>;` |
| `inset-ring-inherit` | `--tw-inset-ring-color: inherit;` |
| `inset-ring-current` | `--tw-inset-ring-color: currentColor;` |
| `inset-ring-transparent` | `--tw-inset-ring-color: transparent;` |
| `inset-ring-<color>` | `--tw-inset-ring-color: var(--color-<color>); /* value from theme.css */` |

`<color>` stands for every default palette color (the docs table lists one row per color): `black`, `white`, and the families `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `slate`, `gray`, `zinc`, `neutral`, `stone`, `mauve`, `olive`, `mist`, `taupe`, each with shades `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950` (for example `shadow-indigo-500` sets `--tw-shadow-color: var(--color-indigo-500);`). The values are the `--color-*` variables in `theme.css` (`oklch(...)` for families, `#000` / `#fff` for `black` / `white`).

## Notes

- Basic example: use `shadow-sm`, `shadow-lg` etc. for different sized outer box shadows.
- Changing the opacity: use the opacity modifier, e.g. `shadow-xl/20`, `shadow-xl/30`. The default box shadow opacities are quite low (25% or less), so increasing the opacity (to like 50%) will make the box shadows more pronounced.
- Setting the shadow color: `shadow-indigo-500`, `shadow-cyan-500/50`. By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.
- Inset shadow: `inset-shadow-2xs`, `inset-shadow-xs`, `inset-shadow-sm`; adjust opacity with e.g. `inset-shadow-sm/50`. The default inset shadow opacities are quite low (5%).
- Inset shadow color: `inset-shadow-indigo-500`, `inset-shadow-indigo-500/50`.
- Ring: `ring` or `ring-<number>` such as `ring-2` and `ring-4` apply a solid box-shadow. By default rings match the `currentColor` of the element they are applied to. Ring color: `ring-indigo-500`, `ring-cyan-500/50` (default opacity 100%).
- Inset ring: `inset-ring`, `inset-ring-2`, `inset-ring-4`. By default inset rings match the `currentColor` of the element. Inset ring color: `inset-ring-indigo-500`, `inset-ring-cyan-500/50`.
- Removing a box shadow: use `shadow-none`, `inset-shadow-none`, `ring-0`, and `inset-ring-0`.
- Table is transcribed as published (the `ring-0` / `inset-ring-0` classes are mentioned in the prose but not listed in the table).

### Using a custom value

Use utilities like `shadow-[<value>]`, `inset-shadow-[<value>]`, `ring-[<value>]` and `inset-ring-[<value>]` to set the box shadow based on a completely custom value:

```html
<div class="shadow-[0_35px_35px_rgba(0,0,0,0.25)] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `shadow-(<custom-property>)` syntax:

```html
<div class="shadow-(--my-shadow) ...">
  <!-- ... -->
</div>
```

This is just a shorthand for `shadow-[var(<custom-property>)]` that adds the `var()` function for you automatically.

### Responsive design

Prefix a `box-shadow` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="shadow-none md:shadow-lg ...">
  <!-- ... -->
</div>
```

Learn more about using variants in the variants documentation (`core-concepts/hover-focus-and-other-states.md`).

### Customizing your theme

Use the `--shadow-*` theme variables to customize the box shadow utilities in your project:

```css
@theme {
  --shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25);
}
```

Now the `shadow-3xl` utility can be used in your markup:

```html
<div class="shadow-3xl">
  <!-- ... -->
</div>
```

Use the `--inset-shadow-*` theme variables to customize the inset box shadow utilities:

```css
@theme {
  --inset-shadow-md: inset 0 2px 3px rgba(0, 0, 0, 0.25);
}
```

Now the `inset-shadow-md` utility can be used in your markup. Use the `--color-*` theme variables to customize the color utilities:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Now utilities like `shadow-regal-blue`, `inset-shadow-regal-blue`, `ring-regal-blue` and `inset-ring-regal-blue` can be used in your markup.

Migration (v3 → v4): the default shadow scale was renamed. The "bare" versions still work for backward compatibility, but `shadow-sm` will look different unless updated: replace v3 `shadow-sm` with `shadow-xs`, and v3 `shadow` with `shadow-sm`. `ring-opacity-*` was removed; use opacity modifiers like `ring-black/50`.

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/box-shadow.mdx` (fetched 2026-10-16); palette values from `tailwindlabs/tailwindcss@v4.3.3` `packages/tailwindcss/theme.css`.

## Related

- [text-shadow](./text-shadow.md)
- [opacity](./opacity.md)
- filter-drop-shadow
- [outline-width](../backgrounds-borders/outline-width.md)
