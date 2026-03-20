# framework

Required. Configures Storybook based on your UI framework, determining the rendering engine and build tooling.

## Type

```typescript
type FrameworkConfig = FrameworkName | {
  name: FrameworkName;
  options?: FrameworkOptions;
}

// FrameworkName: string (e.g. '@storybook/react-vite', '@storybook/nextjs')
// FrameworkOptions: Record<string, any>
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/your-framework',
    options: {
      legacyRootApi: true,
    },
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Framework package identifier (e.g. `'@storybook/react-vite'`) |
| `options` | `Record<string, any>` | Framework-specific configuration parameters |
| `options.builder` | `Record<string, any>` | Configures the underlying build tool (Vite or Webpack) |

## Notes

- This field is **required** in every `.storybook/main.ts`
- Available options vary significantly by framework; consult framework-specific docs
- `framework.options.builder` is preferred over the legacy `core.builder.options`

## Related

- [core.md](./core.md)
- [vite-final.md](./vite-final.md)
- [webpack-final.md](./webpack-final.md)
