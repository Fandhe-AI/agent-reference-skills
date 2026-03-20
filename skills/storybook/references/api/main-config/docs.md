# docs

Controls Storybook's auto-generated documentation features.

## Type

```typescript
{
  defaultName?: string;
  docsMode?: boolean;
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  docs: {
    defaultName: 'Documentation',
  },
};

export default config;
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultName` | `string` | `'Docs'` | Name used for generated documentation pages in the sidebar |
| `docsMode` | `boolean` | — | Restricts the sidebar to show only documentation pages |

## Notes

- `docsMode` is usually set via the `--docs` CLI flag rather than directly in config

## Related

- [features.md](./features.md)
- [typescript.md](./typescript.md)
