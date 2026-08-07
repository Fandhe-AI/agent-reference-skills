# Package Composition

Automatically compose a published design system's stories inside a consumer's Storybook when the design system package is installed.

## Signature / Usage

For authors — add a `storybook` field to `package.json`:

```json
{
  "storybook": {
    "url": "https://host.com/your-storybook-for-this-version"
  }
}
```

Using Chromatic, a single URL is enough — Storybook automatically finds the correct URL for the installed package version:

```json
{
  "storybook": {
    "url": "https://master--xyz123.chromatic.com"
  }
}
```

For consumers — composition happens automatically for supporting packages. To disable or customize it, edit `.storybook/main.ts`:

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  refs: {
    'package-name': { disable: true },
  },
};

export default config;
```

## Notes

- Composition via a package requires a secure integration between the service where Storybook is published and Storybook's own APIs.
- Publishing to Chromatic is recommended for full feature support, including automatic version selection.

## Related

- [Publish Storybook](./publish-storybook.md)
- [Storybook Composition](./storybook-composition.md)
