# Write a preset addon

Presets are pre-configured settings that integrate Storybook with builders, Babel, and third-party tools without user configuration. They are typically split into local and root-level presets.

## Signature / Usage

Local preset (addon-specific config, `example-addon/src/preset.ts`):

```ts
import { webpackFinal as webpack } from './webpack/webpackFinal';

import { viteFinal as vite } from './vite/viteFinal';

import { babelDefault as babel } from './babel/babelDefault';

export const webpackFinal = webpack as any;

export const viteFinal = vite as any;

export const babelDefault = babel as any;
```

Root-level preset (user-facing, `example-addon/preset.js`):

```js
export const previewAnnotations = [import.meta.resolve('./dist/preview')];

export const managerEntries = [import.meta.resolve('./dist/manager')];

export * from './dist/preset.js';
```

## Options / Props

Presets API:

| API | Purpose |
|-----|---------|
| `babelDefault` | Customize Babel config; applied ahead of other user presets, user can further customize via `babel` |
| `viteFinal` | Modify the Vite builder config |
| `webpackFinal` | Extend the Webpack builder config (file types, loaders, plugins) |
| `managerEntries` | Load third-party addons / register manager entry points |
| `previewAnnotations` | Add decorators / parameters for rendering stories |
| `addons` | Array of addon / preset names loaded automatically (detects preset vs addon) |
| Entries | Register preview entry points (e.g. a configure-storybook preset loading all `*.stories.js`) |
| `previewHead` / `previewBody` | String-in, string-out; inject into preview `head` / `body` (like `preview-head.html` / `preview-body.html`) |
| `managerHead` | Modify the manager UI (like `manager-head.html`) |
| `previewMainTemplate` | Reference to a custom `ejs` template for the preview |

`viteFinal`:

```js
export function viteFinal(config, options = {}) {
  config.plugins.push(
    new MyCustomPlugin({
      someOption: true,
    }),
  );

  return config;
}
```

`babelDefault`:

```js
export function babelDefault(config) {
  return {
    ...config,
    plugins: [
      ...config.plugins,
      [import.meta.resolve('@babel/plugin-transform-react-jsx'), {}, 'preset'],
    ],
  };
}
```

`managerEntries` for a third-party addon:

```js
export const managerEntries = (entry = []) => {
  return [...entry, import.meta.resolve('path-to-third-party-addon')];
};
```

## Notes

- Babel config applies only to frameworks that use Babel internally; ignored for SWC / esbuild-based frameworks.
- Storybook builds the manager UI with esbuild, not Webpack: presets relying on `managerWebpack` to configure the manager or load files other than CSS or images no longer work. Remove it and convert extra files to JavaScript.
- Private presets (e.g. `.storybook/main.js|ts`) hold development-only configuration and are not published.
- The official snippet (storybook-addons-preset-viteFinal, v10.6.2) exports `ViteFinal`; Storybook only calls the lowercase `viteFinal` hook, so the example here uses `viteFinal`.
- Source: https://storybook.js.org/docs/addons/writing-presets (Storybook v10.6.2).

## Related

- [Types of addons](./addon-types.md)
- [Write an addon](./writing-addons.md)
- [Configure addons](./configure-addons.md)
- [Addons main config](../api/main-config/addons.md)
