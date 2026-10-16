# Storybook for React with Vite

`@storybook/react-vite` is the Storybook framework for developing and testing UI components in isolation in React applications built with Vite.

## Signature / Usage

```bash
# Install Storybook in an existing React project (project root)
npm create storybook@latest

# Manual install of the framework
npm install --save-dev @storybook/react-vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  // ...
  // framework: '@storybook/react-webpack5', 👈 Remove this
  framework: '@storybook/react-vite', // 👈 Add this
};

export default config;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (the Vite builder). |

## Notes

- Requirements: React ≥ 16.8, Vite ≥ 5.
- Run with `npm run storybook`; build with the build command. Output goes to the configured `outputDir` (default `storybook-static`).
- Migrating from the React Webpack framework: running the `upgrade` command should prompt you to migrate to `@storybook/react-vite`. Otherwise install the framework and change the `framework` property in `.storybook/main.js|ts`.
- Source: https://storybook.js.org/docs/get-started/frameworks/react-vite (Storybook v10.6.2 docs)

## Related

- [react-webpack5](./react-webpack5.md)
- [tanstack-react](./tanstack-react.md)
