# webpackFinal

Customizes Storybook's Webpack configuration when using a Webpack-based builder.

## Type

```typescript
type webpackFinal = (
  config: Config,
  options: { configType?: 'DEVELOPMENT' | 'PRODUCTION' }
) => Config | Promise<Config>
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  webpackFinal: async (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      // development-only modifications
    }
    if (configType === 'PRODUCTION') {
      // production-only modifications
    }
    return config;
  },
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `config` (param) | `Config` | Storybook's prepared Webpack configuration |
| `options.configType` | `'DEVELOPMENT' \| 'PRODUCTION'` | Current build environment |

## Notes

- Only applicable when using a Webpack-based builder
- Must return the modified Webpack configuration object
- Function must be `async`

## Related

- [vite-final.md](./vite-final.md)
- [framework.md](./framework.md)
- [babel.md](./babel.md)
- [swc.md](./swc.md)
