---
source: https://tailwindcss.com/docs/text-shadow
---

# text-shadow

Utilities for controlling the shadow of a text element.

## Signature / Usage

```html
<p class="text-shadow-2xs ...">The quick brown fox...</p>
<p class="text-shadow-lg/20 ...">The quick brown fox...</p>
<button class="text-sky-950 text-shadow-2xs text-shadow-sky-300 ...">Book a demo</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `text-shadow-2xs` | `text-shadow: var(--text-shadow-2xs); /* 0px 1px 0px rgb(0 0 0 / 0.15) */` |
| `text-shadow-xs` | `text-shadow: var(--text-shadow-xs); /* 0px 1px 1px rgb(0 0 0 / 0.2) */` |
| `text-shadow-sm` | `text-shadow: var(--text-shadow-sm); /* 0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075) */` |
| `text-shadow-md` | `text-shadow: var(--text-shadow-md); /* 0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1) */` |
| `text-shadow-lg` | `text-shadow: var(--text-shadow-lg); /* 0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1) */` |
| `text-shadow-none` | `text-shadow: none;` |
| `text-shadow-(<custom-property>)` | `text-shadow: var(<custom-property>);` |
| `text-shadow-(color:<custom-property>)` | `--tw-shadow-color var(<custom-property>);` |
| `text-shadow-[<value>]` | `text-shadow: <value>;` |
| `text-shadow-inherit` | `--tw-shadow-color inherit;` |
| `text-shadow-current` | `--tw-shadow-color currentColor;` |
| `text-shadow-transparent` | `--tw-shadow-color transparent;` |
| `text-shadow-<color>` | `--tw-text-shadow-color var(--color-<color>); /* value from theme.css */` |

`<color>` stands for every default palette color (the docs table lists one row per color): `black`, `white`, and the families `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `slate`, `gray`, `zinc`, `neutral`, `stone`, `mauve`, `olive`, `mist`, `taupe`, each with shades `50` to `950` (`50`, `100`-`900`, `950`). Values are the `--color-*` variables in `theme.css`.

## Notes

- Table is transcribed as published, including the missing colons in the `--tw-shadow-color` rows.
- The official docs custom value example is `rgb(0, 0, 0 / 0.25)`, which is invalid because it mixes comma and slash syntax. This page corrects it to the space-separated `rgb(0 0 0 / 0.25)`.
- Basic example: `text-shadow-2xs`, `text-shadow-xs`, `text-shadow-sm`, `text-shadow-md`, `text-shadow-lg`.
- Changing the opacity: use the opacity modifier, e.g. `text-shadow-lg/20`, `text-shadow-lg/30`. The default text shadow opacities are quite low (20% or less), so increasing the opacity (to like 50%) will make the text shadows more pronounced.
- Setting the shadow color: `text-shadow-indigo-500`, `text-shadow-cyan-500/50`. By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.
- Removing a text shadow: `text-shadow-none`, e.g. `text-shadow-lg dark:text-shadow-none`.
- Related to `box-shadow`: `box-shadow.md` covers `shadow-*` (box). `text-shadow-*` uses the `--text-shadow-*` theme namespace.

### Using a custom value

Use the `text-shadow-[<value>]` syntax to set the text shadow based on a completely custom value:

```html
<p class="text-shadow-[0_35px_35px_rgb(0_0_0_/_0.25)] ...">
  Lorem ipsum dolor sit amet...
</p>
```

For CSS variables, you can also use the `text-shadow-(<custom-property>)` syntax:

```html
<p class="text-shadow-(--my-text-shadow) ...">
  Lorem ipsum dolor sit amet...
</p>
```

This is just a shorthand for `text-shadow-[var(<custom-property>)]` that adds the `var()` function for you automatically.

### Responsive design

Prefix a `text-shadow` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<p class="text-shadow-none md:text-shadow-lg ...">
  Lorem ipsum dolor sit amet...
</p>
```

### Customizing your theme

Use the `--text-shadow-*` theme variables to customize the text shadow utilities in your project:

```css
@theme {
  --text-shadow-xl: 0 35px 35px rgb(0 0 0 / 0.25);
}
```

Now the `text-shadow-xl` utility can be used in your markup. Use the `--color-*` theme variables to customize the color utilities:

```css
@theme {
  --color-regal-blue: #243c5a;
}
```

Now the `text-shadow-regal-blue` utility can be used in your markup.

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/text-shadow.mdx` (fetched 2026-10-16); palette values from `tailwindlabs/tailwindcss@v4.3.3` `packages/tailwindcss/theme.css`.

## Related

- [box-shadow](./box-shadow.md)
- [opacity](./opacity.md)
