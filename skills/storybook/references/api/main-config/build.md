# build

Optimizes Storybook's production build output, particularly for testing scenarios.

## Type

```typescript
type TestBuildConfig = {
  test?: TestBuildFlags;
};

type TestBuildFlags = {
  disableBlocks?: boolean;
  disabledAddons?: string[];
  disableMDXEntries?: boolean;
  disableAutoDocs?: boolean;
  disableDocgen?: boolean;
  disableSourcemaps?: boolean;
  disableTreeShaking?: boolean;
};
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-vitest'],
  build: {
    test: {
      disableBlocks: false,
      disabledAddons: ['@storybook/addon-a11y'],
      disableAutoDocs: false,
    },
  },
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `test.disableBlocks` | `boolean` | Excludes `@storybook/addon-docs/blocks` from the build |
| `test.disabledAddons` | `string[]` | List of addons to exclude from the build |
| `test.disableMDXEntries` | `boolean` | Removes user-written MDX documentation entries |
| `test.disableAutoDocs` | `boolean` | Prevents autodocs-generated documentation |
| `test.disableDocgen` | `boolean` | Disables automatic argType/prop inference |
| `test.disableSourcemaps` | `boolean` | Overrides default source map generation |
| `test.disableTreeShaking` | `boolean` | Disables tree shaking during build |

## Notes

- These options activate automatically when using `storybook build --test`
- Override only when debugging build issues or disabling specific features for testing

## Related

- [addons.md](./addons.md)
