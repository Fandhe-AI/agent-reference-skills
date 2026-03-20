# previewHead

Programmatically modifies the preview iframe's `<head>` section.

## Type

```typescript
type previewHead = (head: string) => string
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  previewHead: (head) => `
    ${head}
    ${
      process.env.ANALYTICS_ID
        ? '<script src="https://cdn.example.com/analytics.js"></script>'
        : ''
    }
  `,
};

export default config;
```

## Notes

- For static additions (no runtime logic needed), use `preview-head.html` instead
- Commonly used by addon authors for conditional head injection

## Related

- [preview-body.md](./preview-body.md)
- [manager-head.md](./manager-head.md)
