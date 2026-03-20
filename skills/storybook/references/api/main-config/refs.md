# refs

Configures Storybook composition by embedding external Storybook instances.

## Type

```typescript
type refs = {
  [key: string]:
    | { title: string; url: string; expanded?: boolean; sourceUrl?: string }
    | ((config: { title: string; url: string; expanded?: boolean; sourceUrl?: string }) =>
        { title: string; url: string; expanded?: boolean; sourceUrl?: string })
    | { disable: boolean }
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  refs: {
    'design-system': {
      title: 'Storybook Design System',
      url: 'https://master--5ccbc373887ca40020446347.chromatic.com/',
      expanded: false,
      sourceUrl: 'https://github.com/storybookjs/storybook',
    },
  },
};

export default config;
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Display name in the composed Storybook sidebar |
| `url` | `string` | — | URL of the external Storybook instance |
| `expanded` | `boolean` | `true` | Controls initial sidebar visibility |
| `sourceUrl` | `string` | — | Link to associated source code repository |
| `disable` | `boolean` | — | Set to `true` to prevent automatic composition of a package dependency |

## Notes

- Package dependencies automatically compose their Storybooks by default
- Use a function for environment-specific URLs (development vs. production)
- `disable: true` prevents a specific package from being auto-composed
