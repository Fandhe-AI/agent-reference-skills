# swc

Customizes Storybook's SWC compiler configuration for Webpack-based projects.

## Type

```typescript
type swc = (
  config: swc.Options,
  options: { configType?: 'DEVELOPMENT' | 'PRODUCTION' }
) => swc.Options | Promise<swc.Options>
```

## Usage

```typescript
// .storybook/main.ts
import type { Options } from '@swc/core';
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/your-framework',
    options: {},
  },
  swc: (config: Options, options): Options => {
    return {
      ...config,
      // Apply your custom SWC configuration
    };
  },
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `config` (param) | `swc.Options` | Existing SWC configuration to modify |
| `options.configType` | `'DEVELOPMENT' \| 'PRODUCTION'` | Current build environment |

## Notes

- Only applicable when `@storybook/addon-webpack5-compiler-swc` addon is enabled
- Function can return a Promise for async configuration
- Refer to the [SWC documentation](https://swc.rs/docs/configuration/swcrc) for available options

## Related

- [babel.md](./babel.md)
- [webpack-final.md](./webpack-final.md)
