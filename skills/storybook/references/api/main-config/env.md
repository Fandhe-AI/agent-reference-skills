# env

Defines custom environment variables accessible throughout your Storybook instance.

## Type

```typescript
type env = (config: { [key: string]: string }) => { [key: string]: string }
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  env: (config) => ({
    ...config,
    EXAMPLE_VAR: 'An environment variable configured in Storybook',
  }),
};

export default config;
```

## Options

| Name | Type | Description |
|------|------|-------------|
| `config` (param) | `{ [key: string]: string }` | Existing environment variables (from `.env` files or shell) |
| return value | `{ [key: string]: string }` | Merged object of existing and new variables |

## Notes

- Always spread the incoming `config` to preserve pre-existing variables
- Variables defined here are accessible in story files and preview
