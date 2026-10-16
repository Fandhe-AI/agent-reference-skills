# Vite Builder

Bundles Storybook components and stories using Vite, offering faster startup and hot module replacement compared to Webpack.

## Overview

The Vite builder (`@storybook/builder-vite`) is a fast ESM-based bundler ideal for Vite-based applications. It automatically merges your existing `vite.config.js|ts` and supports most frameworks out-of-the-box. Startup and refresh times are significantly faster than Webpack, though the execution environment differs.

## Signature / Usage

### Installation

```bash
npm install @storybook/builder-vite --save-dev
```

### Basic setup in `.storybook/main.ts`

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    builder: '@storybook/builder-vite',
  },
};

export default config;
```

### Customizing with `viteFinal`

```typescript
async viteFinal(config) {
  const { mergeConfig } = await import('vite');

  return mergeConfig(config, {
    optimizeDeps: {
      include: ['storybook-dark-mode'],
    },
  });
}
```

### Environment-based configuration

```typescript
async viteFinal(config, { configType }) {
  if (configType === 'DEVELOPMENT') {
    // Development-specific options
  }
  if (configType === 'PRODUCTION') {
    // Production-specific options
  }
  return mergeConfig(config, { /* config */ });
}
```

### Custom Vite config path

```typescript
core: {
  builder: {
    name: '@storybook/builder-vite',
    options: {
      viteConfigPath: '../customVite.config.js',
    },
  },
}
```

### Set configLoader for vite config

Pass the `configLoader` argument to `vite` via builder options. This is equivalent to the `--configLoader` command line argument (added in 10.5.0: "Builder Vite: Support configLoader via builder options - #34080"). See Vite's documentation for valid `configLoader` options.

```typescript
core: {
  builder: {
    name: '@storybook/builder-vite',
    options: {
      configLoader: 'runner',
    },
  },
}
```

## Notes

- Auto ArgType inference is limited to React, Vue 3, and Svelte (JSDocs only). React defaults to `react-docgen`; revert with `typescript: { reactDocgen: 'react-docgen-typescript' }`.
- If interaction tests throw `window is undefined`, add `<script>window.global = window;</script>` to `.storybook/preview-head.html`.
- When migrating from Webpack, start with minimal Vite config — most features work automatically.
- Set `viteConfigPath` to a non-existent file to prevent automatic Vite config loading.

## Related

- [Webpack Builder](./webpack.md)
- [Builder API](./builder-api.md)
