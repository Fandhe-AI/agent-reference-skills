# TypeScript

Storybook provides zero-configuration TypeScript support with type-safe story authoring.

## Overview

The main configuration file (`main.ts`) is written in TypeScript as an ESM module, enabling strict type-checking and IDE autocompletion out of the box.

## Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  staticDirs: ['../public'],
};

export default config;
```

## TypeScript Options

Configure TypeScript behavior under the `typescript` key in `main.ts`:

| Option | Type | Description |
|--------|------|-------------|
| `check` | boolean | Enable type checking within Storybook (Webpack only) |
| `checkOptions` | object | Configure `fork-ts-checker-webpack-plugin` |
| `reactDocgen` | string \| false | Parser: `'react-docgen'`, `'react-docgen-typescript'`, or `false` |
| `reactDocgenTypescriptOptions` | object | Configure `react-docgen-typescript-plugin` |
| `skipCompiler` | boolean | Disable TypeScript file parsing through the compiler |

## Writing Type-Safe Stories

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
  },
};
```

The `satisfies` operator (TypeScript 4.9+) provides stricter type checking and notifies developers of missing required arguments.

## Notes

- Types not generated for external packages: switch to `react-docgen-typescript` with custom compiler options
- Components with `forwardRef` or `Enums` may require `react-docgen-typescript` for proper type inference
- Angular and Web Components frameworks may have constraints when applying `satisfies` due to difficulty determining required properties

## Related

- [Frameworks](./frameworks.md)
- [Compilers](./compilers.md)
