---
source: https://vite.dev/plugins/
---

# Official Plugins

List of official Vite plugins plus pointers to community, Rolldown built-in, and Rolldown/Rollup plugins.

## Signature / Usage

```bash
npm create vite@latest -- --template rsc
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `@vitejs/plugin-vue` | official | Provides Vue 3 Single File Components support |
| `@vitejs/plugin-vue-jsx` | official | Provides Vue 3 JSX support (via dedicated Babel transform) |
| `@vitejs/plugin-react` | official | Provides React Fast Refresh support via Oxc Transformer |
| `@vitejs/plugin-react-swc` | official | Replaces Oxc with SWC during development for SWC plugin usage. During production builds, SWC+Oxc Transformer are used when using plugins |
| `@vitejs/plugin-rsc` | official | React Server Components (RSC) support; uses the Environment API to provide low-level primitives that React frameworks can use |
| `@vitejs/plugin-legacy` | official | Provides legacy browsers support for the production build |

## Notes

- `plugin-vue`, `plugin-vue-jsx` live in `vitejs/vite-plugin-vue`; `plugin-react`, `plugin-react-swc`, `plugin-rsc` live in `vitejs/vite-plugin-react`; `plugin-legacy` lives in the main `vitejs/vite` repo (`packages/plugin-legacy`).
- For big projects that require custom plugins, `plugin-react-swc` can make cold start and HMR significantly faster if the plugin is also available for SWC.
- Community plugins: Vite Plugin Registry (`registry.vite.dev/plugins`).
- Rolldown built-in plugins: Vite uses Rolldown under the hood, which provides a few built-in plugins for common use cases (see rolldown.rs/builtin-plugins/).
- Vite plugins are an extension of Rollup's plugin interface; see the Rollup Plugin Compatibility section of the Plugin API guide.
- Vite aims to provide out-of-the-box support for common patterns; check the Features Guide before searching for a plugin.

## Related

- [using-plugins.md](./using-plugins.md)
- [plugin-legacy.md](./plugin-legacy.md)
