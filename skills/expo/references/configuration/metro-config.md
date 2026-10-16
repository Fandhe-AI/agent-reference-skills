---
source: https://docs.expo.dev/versions/v58.0.0/config/metro/
---

# metro.config.js

A reference of available configurations in Metro. See the customizing Metro guide (`customizing-metro.md`) for the general workflow.

## Signature / Usage

```js
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `getDefaultConfig(__dirname, { isCSSEnabled })` | boolean | CSS support is enabled by default. Set `isCSSEnabled: false` to disable it. |
| `config.resolver.resolveRequest` | function `(context, moduleName, platform)` | Chain to customize resolution. Return `{ filePath, type: 'sourceFile' }` to redirect, `{ type: 'empty' }` to make a module empty for a platform, or call `context.resolveRequest(context, moduleName, platform)` for the default resolver. |
| `config.resolver.unstable_enablePackageExports` | boolean | Set to `false` to stop Metro from using `package.json:exports` maps. |
| `transformer.babelTransformerPath` | string | Set by Expo's Metro config so `expo-babel-preset` is always used. Extend via `@expo/metro-config/babel-transformer`. |
| `experiments.onDemandFilesystem` (app config) | boolean | Enabled by default. Set to `false` to disable lazy file-map reads outside `watchFolders`. |

| Environment variable | Description |
| --- | --- |
| `EXPO_NO_DOTENV=1` | Fully disables dotenv file loading in Expo CLI. Define before invoking any Expo CLI command. |
| `EXPO_NO_CLIENT_ENV_VARS=1` | Disables inlining of `EXPO_PUBLIC_`-prefixed client environment variables. Define before any bundling. |
| `EXPO_USE_METRO_REQUIRE=1` | Enables a custom Metro `require` implementation (human-readable string module IDs, deterministic IDs, no legacy RAM bundles). |
| `EXPO_NO_METRO_LAZY=1` | Cannot be used together with web workers. |
| `process.env.EXPO_BASE_URL` | Inlined in the client bundle; exposes `experiments.baseUrl`. Must be accessed statically (`process.env["EXPO_BASE_URL"]` won't work); not defined in test environments. |

## Notes

- Environment variables: Expo CLI loads **.env** files; EAS CLI uses a different mechanism except when it invokes Expo CLI for compiling and bundling. For older projects, add `.env*.local` to **.gitignore**.
- CSS: support is under development and currently only works on web. Global styles are web-only and ignored on native. CSS Modules (`.module.css`, lightningcss under the hood) are web-only for now; `module.ios.css` / `module.android.css` platform extensions are supported, but `App.ios.module.css` is not. You cannot pass styles to `className` on React Native components; use `style`. With Expo Router, import global CSS in the root **_layout.tsx**.
- PostCSS: add `postcss.config.json` (or `.js`; `.json` caches better). Do not add `autoprefixer` (browserslist support is built in). Clear the Metro cache after changing PostCSS or `browserslist` config: `npx expo start --clear` / `npx expo export --clear`. Customize prefixes via a `browserslist` field in **package.json**.
- SASS: partial support. Install `sass`; extensionless modules resolve in the order `scss`, `sass`, `css`; importing other files from inside scss/sass is not currently supported.
- Tailwind CSS (standard) supports web only; NativeWind or Uniwind give universal support.
- Custom transforming: transformations are heavily cached; use `--clear`. Prefer implementing logic in the resolver over the transformer. Always use `babel-preset-expo`.
- Virtual modules are not supported by Metro; the documented technique writes a module to `node_modules/.cache/...` and redirects resolution to it.
- On-demand filesystem uses `@expo/metro-file-map` (fork of `metro-file-map`) and enables Global Virtual Store support for Bun and pnpm.
- Node.js built-ins are externalized automatically for server bundling; for browser bundling a locally installed module is used, otherwise an empty shim.
- Bundle splitting: web bundles are split by async imports in production; requires `@expo/metro-runtime` (available by default in Expo Router). The heuristic cannot be customized.
- Source map debug ID: `debugId` annotation is added when an external source map is exported (`npx expo export`, `npx expo export:embed`).
- Magic import comments (from SDK 52): `/* @metro-ignore */` in `import()` opts out of dynamic import handling; Webpack's `/* webpackIgnore: true */` is also supported. Avoid on native bundles.
- ES Module resolution (from SDK 53): `import` uses `package.json:exports` first, then falls back to classic resolution; `require` uses classic resolution. Conditions added: `react-native` (native), `browser` (web), `node` / `react-server` / `workerd` (server). Conditions match in the order of properties in the exports map. TypeScript needs `moduleResolution` of `"bundler"`, `"node16"` or `"nodenext"` to respect exports maps.
- Asset imports: on native an asset is a numeric ID; on web/server images are `{ uri, width?, height? }`, other files are a `string`. As of SDK 55, `String(asset)` returns the public URL on web (not in React Server Component environments).
- Web workers: alpha, subject to breaking changes; web-only. Requires Expo Router or `@expo/metro-runtime`. Usage: `new Worker(new URL('./worker', window.location.href))`. A variable path in the constructor is not supported for bundling.
- Existing React Native apps without Prebuild must make native files use Expo CLI (`npx expo export:embed` and `npx expo start` replace `npx react-native bundle` and `npx react-native start`). The Android **app/build.gradle** and iOS **project.pbxproj** snippets are not present in the stored source; see the official page. `CLI_PATH`, `BUNDLE_COMMAND` and `ENTRY_FILE` environment variables override defaults.
- Source modificationDate: October 02, 2026 (SDK 58, `/versions/v58.0.0/`).

## Related

- [Metro bundler](./customizing-metro.md)
- [Environment variables in Expo](./environment-variables.md)
- [babel.config.js](./babel-config.md)
- [app.json / app.config.js](./app-config.md)
