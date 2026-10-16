# Add to the integration catalog

The Storybook integration catalog lists addons (distributed via npm) and recipes (instructions for integrating third-party libraries). The catalog is populated from `package.json` metadata in the npm registry.

## Signature / Usage

```json
{
  "name": "storybook-addon-example",
  "version": "1.0.0",
  "description": "Outline all elements with CSS to help with layout placement and alignment",
  "repository": {
    "type": "git",
    "url": "https://github.com/chromaui/storybook-addon-example"
  },
  "author": "winkerVSbecks",
  "keywords": ["storybook-addon", "style", "debug", "layout", "css"],
  "storybook": {
    "displayName": "Outline",
    "unsupportedFrameworks": ["vue"],
    "supportedFrameworks": ["react", "angular"],
    "icon": "https://yoursite.com/addon-icon.png"
  }
}
```

Verify the published version includes the catalog metadata:

```shell
npm view your-addon-package-name --json
```

## Options / Props

Addon requirements: `package.json` with module information and addon metadata; `README.md` with installation and configuration instructions; `/dist` directory with transpiled ES5 code; `preset.js` written as an ES5 module at the root level.

| Property | Description | Example |
|----------|-------------|---------|
| `name` | Addon package name | storybook-addon-example |
| `description` | Addon description | Outline all elements with CSS to help with layout placement and alignment |
| `author` | Name of the author | winkerVSbecks |
| `keywords` | Keywords; `storybook-addon` must be first, followed by the category | `["storybook-addon","style","debug"]` |
| `repository` | Addon repository | `{"type": "git","url": "https://github.com/someone/my-addon" }` |
| `storybook.displayName` | Display name | Example |
| `storybook.icon` | Link to custom icon (SVG not supported) | https://yoursite.com/addon-icon.png |
| `storybook.unsupportedFrameworks` | Unsupported frameworks | `["vue"]` |
| `storybook.supportedFrameworks` | Supported frameworks | `["react", "angular"]` |

Allowed framework values (copy exactly): react, vue, angular, web-components, ember, html, svelte, preact, react-native.

## Notes

- There may be a delay between publishing and appearing in the catalog. If it is still missing, check the required fields and keywords, then open an issue in the `storybookjs/web` repository with the npm package URL (including latest version), the repository, and the command output.
- Recipes are written and maintained by the Storybook team, prioritized by community popularity, tool maturity, and integration stability. Request one via a new GitHub discussion in the `storybookjs/storybook` repository (category `ideas`).
- The doc text mentions ES5 `/dist` and `preset.js`; for Storybook 10 addons are ESM-only (see the migration guide).
- Source: https://storybook.js.org/docs/addons/integration-catalog (Storybook v10.6.2).

## Related

- [Write an addon](./writing-addons.md)
- [Addon migration guide for Storybook 10.0](./addon-migration-guide.md)
- [Introduction to addons](./introduction.md)
