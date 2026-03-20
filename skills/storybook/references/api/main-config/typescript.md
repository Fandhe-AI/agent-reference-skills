# typescript

Manages how Storybook processes TypeScript files, including type checking and React component documentation.

## Type

```typescript
{
  check?: boolean;
  checkOptions?: CheckOptions;
  reactDocgen?: 'react-docgen' | 'react-docgen-typescript' | false;
  reactDocgenTypescriptOptions?: ReactDocgenTypescriptOptions;
  skipCompiler?: boolean;
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `check` | `boolean` | — | Runs `fork-ts-checker-webpack-plugin` (Webpack only) |
| `checkOptions` | `CheckOptions` | — | Options passed to `fork-ts-checker-webpack-plugin` |
| `reactDocgen` | `'react-docgen' \| 'react-docgen-typescript' \| false` | `'react-docgen'` (if `@storybook/react` installed) | Selects which library parses React component props |
| `reactDocgenTypescriptOptions` | `ReactDocgenTypescriptOptions` | — | Options passed to the react-docgen-typescript-plugin |
| `skipCompiler` | `boolean` | — | Disables TypeScript compiler processing for Webpack5 builds |

## Notes

- `check` is Webpack-specific and unavailable for Vite builds
- `react-docgen` is faster but may miss complex types; `react-docgen-typescript` is slower but more accurate
- The default `propFilter` excludes node_modules from documentation extraction

## Related

- [docs.md](./docs.md)
- [babel.md](./babel.md)
