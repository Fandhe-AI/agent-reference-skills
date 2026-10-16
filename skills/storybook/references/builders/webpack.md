# Webpack Builder

Storybook's default bundler using Webpack 5, with zero-config support and extensive customization options.

## Overview

The Webpack builder leverages your existing Webpack configuration while providing zero-config support for common use cases. It is the default builder when no alternative is specified during `storybook init`.

## Signature / Usage

### Builder options in `.storybook/main.ts`

| Option | Type | Description |
|--------|------|-------------|
| `fsCache` | `boolean` | Enables Webpack filesystem caching |
| `lazyCompilation` | `boolean` | Enables Webpack's experimental lazy compilation |

```typescript
core: {
  builder: {
    name: '@storybook/builder-webpack5',
    options: {
      fsCache: true,
      lazyCompilation: true,
    },
  },
}
```

### Extending with `webpackFinal`

```typescript
webpackFinal: async (config, { configType }) => {
  if (configType === 'DEVELOPMENT') {
    // Development-specific changes
  }
  return config;
}
```

### Adding plugins

```typescript
webpackFinal: async (config) => {
  config.plugins.push(/* new plugin */);
  return config;
}
```

### TypeScript path alias resolution

```typescript
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

webpackFinal: async (config) => {
  if (config.resolve) {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
  }
  return config;
}
```

## Compiler Support

### SWC (recommended for performance)

```bash
npx storybook@latest add @storybook/addon-webpack5-compiler-swc
```

### Babel

```bash
npx storybook@latest add @storybook/addon-webpack5-compiler-babel
```

## Troubleshooting

### @babel/preset-env: The 'bugfixes' option has been removed

If you use Babel 8, you may receive the following error when running Storybook:

```
@babel/preset-env: The
│  'bugfixes' option has been removed, and now bugfix plugins are always
│  enabled. Please remove it from your config.
```

Storybook attempts to detect when you use Babel 8 and to automatically remove the `bugfixes` option from your configuration. If version detection fails, you may set the `babelRemoveBugfixes` feature flag in your Storybook configuration file to forcefully disable the `bugfixes` option:

```js
// .storybook/main.js
export default {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  features: {
    babelRemoveBugfixes: true,
  },
};
```

## Notes

- Always preserve the `entry` and `output` properties when merging Webpack config in `webpackFinal`.
- Append to `config.plugins` rather than overwriting — Storybook relies on `HtmlWebpackPlugin`.
- Debug the effective Webpack config with `npm run storybook -- --debug-webpack`.
- Webpack 4 is no longer supported; upgrade to Webpack 5.
- Storybook now uses esbuild for the manager UI — remove any `managerWebpack` configuration.

## Related

- [Vite Builder](./vite.md)
- [Builder API](./builder-api.md)
