# staticDirs

Configures directories containing static files that Storybook serves to stories.

## Type

```typescript
type staticDirs = (string | { from: string; to: string })[]
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    '../public',
    { from: '../my-custom-assets/images', to: '/assets' },
  ],
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `from` | `string` | Source directory path relative to the config file |
| `to` | `string` | Destination URL path in the served static directory |

## Notes

- Simple string entries serve the directory at the root
- When using Vite-based frameworks, additional directories may be copied due to Vite's own static asset handling; disable by setting Vite's `publicDir` to `false`
