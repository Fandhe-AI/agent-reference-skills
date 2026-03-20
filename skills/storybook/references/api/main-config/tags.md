# tags

Defines custom tags for stories or modifies default behavior of built-in tags.

## Type

```typescript
type tags = {
  [tagName: string]: {
    defaultFilterSelection?: 'include' | 'exclude';
  }
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  tags: {
    experimental: {
      defaultFilterSelection: 'exclude',
    },
  },
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `[tagName]` | `string` | Tag name (built-in or custom); must be a static string |
| `defaultFilterSelection` | `'include' \| 'exclude'` | Default filter state in the sidebar |

## Notes

- Tags are used for filtering stories in the Storybook sidebar
- This configuration applies globally across the entire Storybook instance
- When `defaultFilterSelection` is omitted, the tag has no default selection behavior
