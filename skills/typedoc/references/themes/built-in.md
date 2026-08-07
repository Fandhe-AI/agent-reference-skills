# Built-in Theme

TypeDoc ships with a single built-in theme (`default`); additional themes are provided by plugins.

## Signature / Usage

```bash
typedoc --theme default
```

```bash
typedoc --customCss ./custom-styles.css
typedoc --customJs ./custom-script.js
typedoc --customFooterHtml "<p>Copyright 2024</p>"
```

```json
{
  "theme": "default",
  "customCss": "./custom-styles.css",
  "customJs": "./custom-script.js",
  "customFooterHtml": "<p>Copyright 2024 My Company</p>",
  "router": "kind"
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `theme` | string | `"default"` | Selects the active theme. TypeDoc only bundles `default`; other values require a plugin. |
| `customCss` | string | — | Path to a CSS file applied to every generated page, overriding the default theme's classes/CSS variables. |
| `customJs` | string | — | Path to a JavaScript file loaded on every generated page. |
| `customFooterHtml` | string | — | Custom HTML injected into the page footer. |
| `customFooterHtmlDisableWrapper` | boolean | `false` | Disables the automatic `<p>` wrapper around `customFooterHtml`. |
| `router` | string | `"kind"` | Controls the output folder structure (v0.28+). Extensible via plugins. |

## Notes

- TypeDoc bundles exactly one built-in theme (`default`); additional themes are supplied by plugins — see [Community Themes](./community-themes.md).
- `customCss` can override the default theme's internal CSS classes and variables, but that internal structure may change between theme updates.
- `customJs` is loaded on every page, so consider its performance impact.
- Since v0.28, the built-in CSS is wrapped in `@layer typedoc`; account for cascade/layer priority when overriding with `customCss`.
- The default theme includes: search, dark/light mode toggle, source code links, type information (parameters, return values, properties), inheritance hierarchy display, signature rendering, Markdown rendering in comments, and syntax highlighting for code blocks.
- The default sidebar navigation reflects the module/namespace/class hierarchy, supports organizing entries by category or group, and supports expand/collapse of navigation items.

## Related

- [Community Themes](./community-themes.md) — list of third-party themes
- [Community Plugins](../plugins/community-plugins.md) — plugin list
