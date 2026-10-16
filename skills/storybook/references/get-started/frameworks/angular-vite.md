# Storybook for Angular with Vite (Preview)

`@storybook/angular-vite` is the Vite-based Storybook framework for Angular applications (Vite transform pipeline powered by the AnalogJS Vite plugin). It supports the Vitest addon.

## Signature / Usage

```bash
npm install --save-dev @storybook/angular-vite
```

```jsonc
// angular.json
{
  "projects": {
    "your-project": {
      "architect": {
        "storybook": {
          "builder": "@storybook/angular-vite:start-storybook",
          "options": { "configDir": ".storybook", "port": 6006 }
        },
        "build-storybook": {
          "builder": "@storybook/angular-vite:build-storybook",
          "options": { "configDir": ".storybook", "outputDir": "dist/storybook/your-project" }
        }
      }
    }
  }
}
```

Then run `ng run your-project:storybook` and `ng run your-project:build-storybook`, or use `storybook dev` / `storybook build`.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `builder` | `Record<string, any>` | — | Options for the framework's builder (Vite builder docs). |
| `jit` | `boolean` | `true` | Use Angular's JIT compiler (passed to the AnalogJS plugin). |
| `liveReload` | `boolean` | `false` | Enable live-reload in the AnalogJS plugin. |
| `tsconfig` | `string` | `./.storybook/tsconfig.json` | TypeScript config path relative to the workspace root. |
| `inlineStylesExtension` | `string` | `'css'` | File extension for inline component styles. |
| `compodoc` | `boolean` | `true` | Run Compodoc to generate `documentation.json`. Only effective with `experimentalDocgenServer: false`. |
| `compodocArgs` | `string[]` | `['-e', 'json', '-d', '.']` | Arguments for the Compodoc CLI. Only read with `experimentalDocgenServer` off. |
| `propsTable` | `'all' \| 'api' \| 'inputs'` | `'api'` | Which members the props table renders: `'all'` (every member), `'api'` (template-facing API; drops `private`, `#` private, and `@internal` members, keeps `protected`), `'inputs'` (inputs only). Tag a member `@ignore` to drop it. |

Builder options also include `zoneless` (default `true`; set `false` for Zone.js change detection, `zone.js` is then auto-imported) and `stylePreprocessorOptions` (`includePaths` or `loadPaths`).

## Notes

- Status: preview; planned to be marked stable in Storybook 11. APIs and defaults may change.
- Requirements: Angular ≥ 21, Vite ≥ 8. Use `@storybook/angular` (Webpack) for Angular ≤ 20 or Webpack setups you cannot migrate.
- Authoring surface (stories, `moduleMetadata`, `applicationConfig`, `componentWrapperDecorator`, parameters) is identical to `@storybook/angular`.
- Builders take no `browserTarget`. Since Storybook 10.6, `@storybook/angular-vite` sets Vite's `resolve.tsconfigPaths: true` by default, so `tsconfig` `paths` aliases resolve in dev and build without a plugin, and `paths` sources take priority over a same-named `node_modules` package (MIGRATION.md, 10.5.x to 10.6.0). To restore the old behavior, set `resolve.tsconfigPaths: false` in `viteFinal`. The framework page's `vite-tsconfig-paths` / `resolve.alias` guidance predates 10.6. SCSS include paths from the app's `build` target are not inherited; set `stylePreprocessorOptions` on the Storybook target or `css.preprocessorOptions.scss.loadPaths` in `viteFinal`.
- Component docs: `experimentalDocgenServer` is on by default (reads TypeScript sources on the server; Compodoc never runs). Turning it off (Compodoc path) is planned to be deprecated in Storybook 11 and removed in Storybook 12, along with the `compodoc` / `compodocArgs` options and `setCompodocJson`. `npx storybook automigrate` removes obsolete Compodoc wiring.
- Known limitations (default path): code snippets do not follow Controls changes; an input typed `T | undefined` falls back to an object control (mark it optional with `?` instead).
- Vitest: install the addon, and standalone `yarn vitest` runs use `storybookAngularVitest` from `@storybook/angular-vite/vitest` next to `storybookTest`.
- Migration from `@storybook/angular`: `npx storybook automigrate`; `webpackFinal` must be rewritten as `viteFinal`, and direct `.md` imports need Vite's `?raw` suffix.
- Source: https://storybook.js.org/docs/get-started/frameworks/angular-vite (Storybook v10.6.2 docs)

## Related

- [angular](./angular.md)
