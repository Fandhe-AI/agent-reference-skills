# addons

Registers addon packages that extend Storybook's functionality.

## Type

```typescript
type addons = (string | { name: string; options?: AddonOptions })[]
```

## Usage

```typescript
// .storybook/main.ts
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
      },
    },
  ],
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Package identifier for the addon |
| `options` | `AddonOptions` | Addon-specific configuration (varies per addon) |

## Notes

- Use a simple string for addons that need no configuration
- Consult each addon's documentation for supported `options`

## Related

- [features.md](./features.md)
- [build.md](./build.md)
