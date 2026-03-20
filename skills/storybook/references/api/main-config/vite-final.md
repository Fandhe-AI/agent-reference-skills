# viteFinal

Customizes Storybook's Vite configuration when using a Vite-based builder.

## Type

```typescript
type viteFinal = (
  config: Vite.InlineConfig,
  options: { configType?: 'DEVELOPMENT' | 'PRODUCTION' }
) => Vite.InlineConfig | Promise<Vite.InlineConfig>
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    if (configType === 'DEVELOPMENT') {
      // development-only modifications
    }
    if (configType === 'PRODUCTION') {
      // production-only modifications
    }
    return mergeConfig(config, {
      // your custom Vite options
    });
  },
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `config` (param) | `Vite.InlineConfig` | Storybook's prepared Vite configuration |
| `options.configType` | `'DEVELOPMENT' \| 'PRODUCTION'` | Current build environment |

## Notes

- Use Vite's `mergeConfig` utility to safely merge custom settings
- The function can be `async` for dynamic configuration loading
- Only applicable when using a Vite-based framework

## Related

- [webpack-final.md](./webpack-final.md)
- [framework.md](./framework.md)
- [core.md](./core.md)
