# Storybook for Angular (Webpack)

`@storybook/angular` is the Webpack-based Storybook framework for Angular applications. It uses Angular builders and integrates with Compodoc for automatic documentation.

## Signature / Usage

```bash
npm install --save-dev @storybook/angular

# Run / build through Angular builders
ng run <your-project>:storybook
ng run <your-project>:build-storybook
```

```jsonc
// angular.json
{
  "projects": {
    "your-project": {
      "architect": {
        "storybook": {
          "builder": "@storybook/angular:start-storybook",
          "options": {
            "configDir": ".storybook",
            "browserTarget": "your-project:build",
            "port": 6006
          }
        },
        "build-storybook": {
          "builder": "@storybook/angular:build-storybook",
          "options": {
            "configDir": ".storybook",
            "browserTarget": "your-project:build",
            "outputDir": "dist/storybook/your-project"
          }
        }
      }
    }
  }
}
```

## Options / Props

Framework option:

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Webpack builder docs). |

Common Angular builder options (`angular.json`):

| Name | Description |
|------|-------------|
| `browserTarget` | Build target to be served, format `"example-project:builder:config"`. |
| `debugWebpack` | Debug the Webpack configuration. |
| `tsConfig` | TypeScript configuration file location relative to the workspace. |
| `preserveSymlinks` | Do not use the real path when resolving modules. |
| `port` / `host` | Port / custom host for Storybook. |
| `configDir` | Storybook configuration directory. |
| `https` / `sslCa` / `sslCert` / `sslKey` | HTTPS setup (`sslCert` required for `https`). |
| `smokeTest` | Exit Storybook after successful start. |
| `ci` | CI mode (no interactive prompts, no browser window). |
| `open` | Open Storybook automatically in the browser. |
| `quiet` | Filter verbose build output. |
| `enableProdMode` | Disable Angular's development mode. |
| `docs` | Start Storybook in documentation mode. |
| `compodoc` / `compodocArgs` | Run Compodoc first / pass Compodoc CLI args (`-p` and `-d` are always given). |
| `styles` / `stylePreprocessorOptions` / `assets` | Application styles, preprocessor options, static assets. |
| `initialPath` | URL path appended on first visit. |
| `webpackStatsJson` | Write Webpack Stats JSON to disk. |
| `previewUrl` | Disable the default preview and use your own. |
| `loglevel` | One of trace, debug, info (default), warn, error, silent. |
| `sourceMap` | Configure sourcemaps. |
| `experimentalZoneless` | Configure zoneless change detection. |

Full lists are in the Angular builder schemas (`build-schema.json`, `start-schema.json`) in the Storybook repository.

## Notes

- Requirements: Angular ≥ 18.0 < 23.0, Webpack 5.
- For Angular ≥ 21 with faster builds and the Vitest addon, consider `@storybook/angular-vite` (same authoring surface).
- Compodoc: install `@compodoc/compodoc`, set `"compodoc": true` and `"compodocArgs": ["-e", "json", "-d", "."]` on both builders, then add `setCompodocJson` in `.storybook/preview.ts`. Compodoc is built into `@storybook/angular`; remove explicit `compodoc` npm scripts.
- Application-wide providers: use the `applicationConfig` decorator. Dependencies (modules, directives, declarations, providers): use the `moduleMetadata` decorator, for all stories of a component or a single story.
- Migrating to the Angular builder: `npx storybook@latest automigrate`, or add the `storybook` / `build-storybook` entries to `angular.json` and replace npm scripts with `ng run <project-name>:storybook` / `ng run <project-name>:build-storybook`. With multiple projects, each needs its own `.storybook` folder (run `npx storybook@latest init` per project) and Storybook composition can combine them.
- Source: https://storybook.js.org/docs/get-started/frameworks/angular (Storybook v10.6.2 docs)

## Related

- [angular-vite](./angular-vite.md)
