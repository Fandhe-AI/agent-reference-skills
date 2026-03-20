# babel

Customizes Storybook's Babel configuration for Webpack-based projects.

## Type

```typescript
type babel = (
  config: Babel.Config,
  options: { configType: 'DEVELOPMENT' | 'PRODUCTION' }
) => Babel.Config | Promise<Babel.Config>
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  async babel(config, { configType }) {
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
| `config` | `Babel.Config` | The existing Babel configuration to modify |
| `options.configType` | `'DEVELOPMENT' \| 'PRODUCTION'` | Current build environment |

## Notes

- Only applicable when `@storybook/addon-webpack5-compiler-babel` addon is enabled
- If a `.babelrc` file exists, it is auto-detected and used without additional configuration
- Addon authors should use `babelDefault` instead (runs before user presets)

## Related

- [swc.md](./swc.md)
- [webpack-final.md](./webpack-final.md)
