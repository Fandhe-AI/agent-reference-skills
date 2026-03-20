# previewBody

Programmatically modifies the preview iframe's `<body>` element.

## Type

```typescript
type previewBody = (body: string) => string
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  previewBody: (body) => `
    ${body}
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

- For static additions (no runtime logic needed), use `preview-body.html` instead
- Commonly used by addon authors for conditional script/style injection

## Related

- [preview-head.md](./preview-head.md)
- [manager-head.md](./manager-head.md)
