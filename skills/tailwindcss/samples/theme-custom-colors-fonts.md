---
source: https://tailwindcss.com/docs/theme
---

# Custom Colors and Fonts with @theme

Add or override theme variables with `@theme` so matching utility classes become available.

```css
@import "tailwindcss";

@theme {
  --font-script: Great Vibes, cursive;
}
```

```html
<p class="font-script">This will use the Great Vibes font family.</p>
```

Replace the whole color namespace with your own palette:

```css
@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-purple: #3f3cbb;
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
  --color-bermuda: #78dcca;
}
```

Disable the whole default theme:

```css
@import "tailwindcss";

@theme {
  --*: initial;

  --spacing: 4px;

  --font-body: Inter, sans-serif;

  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-coral: oklch(0.74 0.17 40.24);
  --color-driftwood: oklch(0.79 0.06 74.59);
  --color-tide: oklch(0.49 0.08 205.88);
  --color-dusk: oklch(0.82 0.15 72.09);
}
```

When a theme variable references another variable, use `@theme inline`:

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
}
```

## Notes

- Overriding a namespace with `--color-*: initial;` removes defaults such as `bg-red-500`; only your values (e.g. `bg-midnight`) remain.
- Use `@theme static` to always emit all theme CSS variables instead of only the used ones.
- Chakra UI v3 design tokens / `defineConfig` theme are a different system; see the chakra-ui skill. fandhe-frontend themes (Rust) are also separate.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/theme.mdx` (fetched 2026-10-16).
