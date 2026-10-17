---
source: https://ui.shadcn.com/docs/theming
---

# Theming

Using CSS variables and theme tokens. Semantic tokens such as `background`, `foreground`, and `primary` are overridden in your CSS to change the look of the app without rewriting component classes.

## Signature / Usage

```tsx
<div className="bg-background text-foreground" />
```

Set `tailwind.cssVariables` to `true` in `components.json` (the default):

```json
{
  "style": "base-nova",
  "rsc": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

Tokens come in background/foreground pairs; the surface token omits the `-foreground` suffix:

```css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

```tsx
<div className="bg-primary text-primary-foreground">Hello</div>
```

Add a new token under `:root` and `.dark`, then expose it to Tailwind with `@theme inline`:

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}

.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

Radius scale derived from `--radius`:

```css
@theme inline {
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

Opt out of CSS variables at install time:

```bash
npx shadcn@latest init --no-css-variables
```

## Options / Props

Theme tokens (defined under `:root` and `.dark`):

| Token | What it controls | Used by |
| --- | --- | --- |
| `background` / `foreground` | The default app background and text color. | The page shell, page sections, and default text. |
| `card` / `card-foreground` | Elevated surfaces and the content inside them. | `Card`, dashboard panels, settings panels. |
| `popover` / `popover-foreground` | Floating surfaces and the content inside them. | `Popover`, `DropdownMenu`, `ContextMenu`, and other overlays. |
| `primary` / `primary-foreground` | High-emphasis actions and brand surfaces. | Default `Button`, selected states, badges, and active accents. |
| `secondary` / `secondary-foreground` | Lower-emphasis filled actions and supporting surfaces. | Secondary buttons, secondary badges, and supporting UI. |
| `muted` / `muted-foreground` | Subtle surfaces and lower-emphasis content. | Descriptions, placeholders, empty states, helper text, and subdued surfaces. |
| `accent` / `accent-foreground` | Interactive hover, focus, and active surfaces. | Ghost buttons, menu highlight states, hovered rows, and selected items. |
| `destructive` | Destructive actions and error emphasis. | Destructive buttons, invalid states, and destructive menu items. |
| `border` | Default borders and separators. | Cards, menus, tables, separators, and layout dividers. |
| `input` | Form control borders and input surface treatment. | `Input`, `Textarea`, `Select`, and outline-style controls. |
| `ring` | Focus rings and outlines. | Buttons, inputs, checkboxes, menus, and other focusable controls. |
| `chart-1` ... `chart-5` | The default chart palette. | Charts and chart-driven dashboard blocks. |
| `sidebar` / `sidebar-foreground` | The base sidebar surface and default sidebar text. | The `Sidebar` container and its default content. |
| `sidebar-primary` / `sidebar-primary-foreground` | High-emphasis actions inside the sidebar. | Active items, icon tiles, badges, and sidebar CTAs. |
| `sidebar-accent` / `sidebar-accent-foreground` | Hover and selected states inside the sidebar. | Sidebar menu hover states, open items, and interactive rows. |
| `sidebar-border` | Sidebar-specific borders and separators. | Sidebar headers, groups, and internal dividers. |
| `sidebar-ring` | Sidebar-specific focus rings. | Focused controls inside the sidebar. |
| `radius` | The base corner radius scale. | Cards, inputs, buttons, popovers, and the derived `radius-*` tokens. |

Available `tailwind.baseColor` values: Neutral, Stone, Zinc, Mauve, Olive, Mist, Taupe.

## Notes

- `tailwind.baseColor` controls the default token values generated when you run `init` or use a preset.
- Tailwind maps tokens into utilities such as `bg-background`, `text-foreground`, `border-border`, and `ring-ring`.
- Dark mode overrides the same tokens inside a `.dark` selector; see [dark-mode.md](./dark-mode.md).
- `--no-css-variables` is an installation-time choice. To switch an existing project, delete and re-install your components.
- Chart tokens are covered in the Chart theming section of the chart component docs.
- The default `neutral` theme scaffold begins with `@import "tailwindcss";`, `@import "shadcn/tailwind.css";` and `@custom-variant dark (&:is(.dark *));`, followed by an `@theme inline` block mapping each `--color-*` to its variable, then `:root`, `.dark`, and an `@layer base` block applying `border-border outline-ring/50` to `*` and `bg-background text-foreground` to `body`. The full scaffold with all oklch values is at https://ui.shadcn.com/docs/theming.

## Related

- [Dark Mode](./dark-mode.md)
- [Typeset](./typeset.md)
