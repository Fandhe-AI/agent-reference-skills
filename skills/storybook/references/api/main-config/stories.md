# stories

Required. Determines which files Storybook loads as story definitions.

## Type

```typescript
type stories =
  | (string | StoriesSpecifier)[]
  | async (list: (string | StoriesSpecifier)[]) => (string | StoriesSpecifier)[]

type StoriesSpecifier = {
  directory: string;
  files?: string;
  titlePrefix?: string;
}
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
};

export default config;
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `directory` | `string` | — | Where to begin searching, relative to project root |
| `files` | `string` | `'**/*.@(mdx\|stories.@(js\|jsx\|mjs\|ts\|tsx))'` | Glob pattern for filenames |
| `titlePrefix` | `string` | `''` | Prefix for auto-generated story titles |

## Notes

- This field is **required** in every `.storybook/main.ts`
- Stories appear in the sidebar in the order they are defined in the array
- Custom async implementations may reduce static analysis optimization

## Related

- [indexers.md](./indexers.md)
