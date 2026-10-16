# Storybook for React with Webpack

`@storybook/react-webpack5` is the Storybook framework for React applications built with Webpack 5.

## Signature / Usage

```bash
npm install --save-dev @storybook/react-webpack5
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/react-webpack5', // 👈 Add this
};

export default config;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (the Webpack builder). |

## Notes

- Requirements: React ≥ 16.8, Webpack 5.
- The docs recommend `@storybook/react-vite` for most React projects (faster, more modern, better testing support). Use this Webpack framework only if you need Webpack features not available in Vite.
- Manual install also requires installing and registering a compiler addon, SWC (recommended) or Babel. This step can be skipped for Create React App projects. See the Webpack builder docs for compiler support.
- Create React App (CRA) support is provided by `@storybook/preset-create-react-app`, which enables all CRA features including Sass/SCSS and TypeScript.
- For manually initialized apps (no CRA), ensure `react-dom` is a dependency; otherwise Storybook may hit unforeseen issues.
- Migrating to Vite: follow the migration instructions on the `react-vite` page.
- Source: https://storybook.js.org/docs/get-started/frameworks/react-webpack5 (Storybook v10.6.2 docs)

## Related

- [react-vite](./react-vite.md)
