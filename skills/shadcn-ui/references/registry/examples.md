---
source: https://ui.shadcn.com/docs/registry/examples
---

# Examples

Example registry items by type: `registry:style`, `registry:theme`, `registry:block`, `registry:ui`, `registry:lib`, `registry:hook`, `registry:font`, `registry:base`, plus common fields, CSS variables, custom CSS, utilities, imports, plugins, animations, `envVars` and universal items.

## Signature / Usage

Custom style that extends shadcn/ui (applied on `npx shadcn init`):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "example-style",
  "type": "registry:style",
  "dependencies": ["@tabler/icons-react"],
  "registryDependencies": [
    "login-01",
    "calendar",
    "https://example.com/r/editor.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

Custom font (`font` is required for `registry:font`):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "font-inter",
  "type": "registry:font",
  "font": {
    "family": "'Inter Variable', sans-serif",
    "provider": "google",
    "import": "Inter",
    "variable": "--font-sans",
    "subsets": ["latin"],
    "dependency": "@fontsource-variable/inter"
  }
}
```

Target placeholders and universal items (explicit `target` on every file):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "python-rules",
  "type": "registry:item",
  "files": [
    {
      "path": "/path/to/your/registry/default/custom-python.mdc",
      "type": "registry:file",
      "target": "~/.cursor/rules/custom-python.mdc",
      "content": "..."
    }
  ]
}
```

## Options / Props

`config` field of `registry:base` items (all optional; unique to `registry:base`):

| Property | Type | Description |
| --- | --- | --- |
| `style` | `string` | The style name for the base. |
| `iconLibrary` | `string` | The icon library to use (e.g. `lucide`). |
| `rsc` | `boolean` | Whether to enable React Server Components. Defaults to `false`. |
| `tsx` | `boolean` | Whether to use TypeScript. Defaults to `true`. |
| `rtl` | `boolean` | Whether to enable right-to-left support. Defaults to `false`. |
| `menuColor` | `"default" \| "inverted" \| "default-translucent" \| "inverted-translucent"` | The menu color scheme. Defaults to `"default"`. |
| `menuAccent` | `"subtle" \| "bold"` | The menu accent style. Defaults to `"subtle"`. |
| `tailwind.baseColor` | `string` | The base color name (e.g. `neutral`, `slate`, `zinc`). |
| `tailwind.css` | `string` | Path to the Tailwind CSS file. |
| `tailwind.prefix` | `string` | A prefix to add to all Tailwind classes. |
| `aliases.components` | `string` | Import alias for components. |
| `aliases.utils` | `string` | Import alias for utilities. |
| `aliases.ui` | `string` | Import alias for UI components. |
| `aliases.lib` | `string` | Import alias for lib. |
| `aliases.hooks` | `string` | Import alias for hooks. |
| `registries` | `Record<string, string \| object>` | Custom registry URLs. Keys must start with `@`. |

## Notes

- `extends: none` creates a style or base from scratch instead of extending shadcn/ui defaults (examples `new-style`, `my-design-system`).
- Target placeholders: `@components/`, `@ui/`, `@lib/`, `@hooks/` resolve from `components.json`; anything after the placeholder is preserved (`@ui/ai/prompt-input.tsx`). `target` decides where the file is written even when it differs from the file `type`.
- `font.selector` applies the font to specific selectors via `@apply` inside `@layer base` instead of `<html>`; the CSS variable is still injected on `<html>`.
- CSS: `css` accepts `@layer base`, `@layer components`, `@utility name` (including functional `@utility tab-*`), `@import` (placed at the top of the CSS file; `url()` and media-query forms supported), `@plugin` (placed after imports; npm plugins must also appear in `dependencies`; multiple plugins are grouped and deduplicated), and `@keyframes`. Animations need both `@keyframes` in `css` and a `theme` entry in `cssVars` (e.g. `--animate-wiggle`).
- `cssVars.theme` can override Tailwind variables such as `spacing` and `breakpoint-*`.
- Common fields: `author`, `devDependencies`, `meta` (arbitrary key/value metadata).
- `envVars` are written to `.env.local` or `.env`; existing variables are not overwritten. Use only for development or example variables, NOT production variables.
- Universal items (as of `2.9.0`): installable without framework detection or `components.json` when every file has an explicit `target`.
- Examples in the source docs use `"content": "..."` placeholders for file bodies.

## Related

- [registry-item.json](./registry-item-json.md)
- [Getting Started](./getting-started.md)
