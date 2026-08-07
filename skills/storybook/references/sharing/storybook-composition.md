# Storybook Composition

Browse components from any other Storybook — published or running locally — inside your own, across view layers, tech stacks, and dependencies.

## Signature / Usage

```typescript
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

Composing multiple local instances:

```typescript
refs: {
  react: { title: 'React', url: 'http://localhost:7007' },
  angular: { title: 'Angular', url: 'http://localhost:7008' },
}
```

Environment-based composition:

```typescript
refs: (config, { configType }) => {
  if (configType === 'DEVELOPMENT') {
    return { react: { title: 'Development React Storybook', url: 'http://localhost:7007' } };
  }
  return { react: { title: 'Production React Storybook', url: 'https://your-production-url' } };
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `title` | string | Display name for the composed Storybook |
| `url` | string | Accessible URL to the Storybook (published or local) |
| `expanded` | boolean | Sidebar expansion state (default: `true`) |
| `sourceUrl` | string | Optional link to the source repository |

## Notes

- `refs` also accepts a function `(config, { configType }) => refs` for dynamic composition based on Storybook's build configuration.
- Addons in composed Storybooks will not work as they normally do in a non-composed Storybook.

## Related

- [Publish Storybook](./publish-storybook.md)
- [Package Composition](./package-composition.md)
- [Main Configuration: refs](../api/main-config/refs.md)
