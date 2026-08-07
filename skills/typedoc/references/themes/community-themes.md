# Community Themes

Third-party themes developed and maintained by the TypeDoc community, organized by version compatibility.

## Signature / Usage

```bash
npm install --save-dev typedoc-theme-oxide
typedoc --plugin typedoc-theme-oxide --theme oxide
```

```json
{
  "plugin": ["typedoc-theme-oxide"],
  "theme": "oxide"
}
```

Themes are installed as npm packages and selected via the `--theme` (or `--plugin`) option. Each theme is compatible with a specific range of TypeDoc versions.

## Options / Props

### v0.28-compatible themes

| Package | Author | Version | Description | License |
| --- | --- | --- | --- | --- |
| `typedoc-theme-oxide` | balthild | 0.3.0 | TypeDoc theme styled after rustdoc | MIT |
| `typedoc-github-theme` | killerjulian | 0.4.0 | Elegant, seamless theme for docs hosted on GitHub Pages | MIT |
| `typedoc-rhineai-theme` | hran2004 | 1.2.0 | GitHub-style, carefully designed TypeDoc theme | MIT |
| `typedoc-theme-fresh` | ekzhang | 0.2.3 | Clean, minimalist TypeDoc theme | MIT |
| `varvara-typedoc-theme` | mmarine | 0.3.9 | Varvara theme | MIT |
| `ig-typedoc-theme` | igniteui | 7.0.1 | Infragistics theme; versioned and localized API docs | MIT |
| `typedoc-material-theme` | dmnsgn | 1.4.1 | TypeDoc theme based on Material 3 | MIT |
| `@typhonjs-typedoc/typedoc-theme-dmt` | typhonrt | 0.4.0 | Modern, customizable UX extension for the default theme | MPL-2.0 |
| `typedoc-unhoax-theme` | sacdenoeuds | 0.5.3 | Custom TypeDoc theme | MIT |
| `typedoc-theme-hierarchy` | difuks | 6.0.0 | Hierarchy-focused display theme | MIT |

### v0.27-compatible themes

| Package | Author | Version | Description | License |
| --- | --- | --- | --- | --- |
| `typedoc-material-theme` | dmnsgn | — | TypeDoc theme based on Material 3 | MIT |
| `@mxssfd/typedoc-theme` | mxssfd | 1.1.7 | Custom TypeDoc theme with demos/samples | MIT |

### v0.26-compatible themes

| Package | Author | Version | Description | License |
| --- | --- | --- | --- | --- |
| `typedoc-material-theme` | dmnsgn | — | TypeDoc theme based on Material 3 | MIT |
| `@mxssfd/typedoc-theme` | mxssfd | 1.1.7 | Custom TypeDoc theme with demos/samples | MIT |

## Notes

- Each theme is compatible with a specific range of TypeDoc versions; pick the theme version matching your installed TypeDoc version.
- Check each theme's npm page or GitHub repository for the latest compatibility information.
- The value passed to `--theme` varies per package; consult the individual theme's documentation.
- Most themes are MIT-licensed, though some use other licenses (e.g. MPL-2.0).
- Themes and plugins can be combined.

## Related

- [Built-in Theme](./built-in.md) — default theme features and customization
- [Community Plugins](../plugins/community-plugins.md) — plugin list
