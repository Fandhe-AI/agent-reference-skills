# managerHead

Programmatically modifies the manager UI's `<head>` section.

## Type

```typescript
type managerHead = (head: string) => string
```

## Usage

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  managerHead: (head) => `
    ${head}
    <link rel="preload" href="/fonts/my-custom-manager-font.woff2" />
  `,
};

export default config;
```

## Notes

- For static additions (no runtime logic needed), use `manager-head.html` instead
- Commonly used by addon authors who need conditional head injection
- The function receives existing head content and must return the complete modified string

## Related

- [preview-head.md](./preview-head.md)
- [preview-body.md](./preview-body.md)
