# Storybook API — main.js|ts Configuration

Configuration options for `.storybook/main.js|ts`. The file must be valid ESM and export a default config object typed as `StorybookConfig`.

```typescript
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = { /* options below */ };
export default config;
```

| Name | Description | Path |
|------|-------------|------|
| `framework` | **Required.** Specifies the UI framework and build tooling | [./framework.md](./framework.md) |
| `stories` | **Required.** Glob patterns or specifiers for story file discovery | [./stories.md](./stories.md) |
| `addons` | Registers addon packages | [./addons.md](./addons.md) |
| `babel` | Customizes Babel config (requires `addon-webpack5-compiler-babel`) | [./babel.md](./babel.md) |
| `build` | Optimizes production builds for testing scenarios | [./build.md](./build.md) |
| `core` | Configures internal features: dev server, builder, telemetry | [./core.md](./core.md) |
| `docs` | Controls auto-generated documentation pages | [./docs.md](./docs.md) |
| `env` | Defines custom environment variables | [./env.md](./env.md) |
| `features` | Enables or disables built-in and experimental features | [./features.md](./features.md) |
| `experimental_indexers` | Customizes story file discovery and parsing (experimental) | [./indexers.md](./indexers.md) |
| `logLevel` | Sets browser console log verbosity | [./log-level.md](./log-level.md) |
| `managerHead` | Programmatically injects content into the manager `<head>` | [./manager-head.md](./manager-head.md) |
| `previewAnnotations` | Adds scripts to the preview environment (for framework authors) | [./preview-annotations.md](./preview-annotations.md) |
| `previewBody` | Programmatically injects content into the preview `<body>` | [./preview-body.md](./preview-body.md) |
| `previewHead` | Programmatically injects content into the preview `<head>` | [./preview-head.md](./preview-head.md) |
| `refs` | Embeds external Storybook instances (composition) | [./refs.md](./refs.md) |
| `staticDirs` | Serves static asset directories to stories | [./static-dirs.md](./static-dirs.md) |
| `swc` | Customizes SWC compiler config (requires `addon-webpack5-compiler-swc`) | [./swc.md](./swc.md) |
| `tags` | Defines custom tags and sidebar filter defaults | [./tags.md](./tags.md) |
| `typescript` | Manages TypeScript processing and React docgen | [./typescript.md](./typescript.md) |
| `viteFinal` | Customizes Vite configuration (Vite builders only) | [./vite-final.md](./vite-final.md) |
| `webpackFinal` | Customizes Webpack configuration (Webpack builders only) | [./webpack-final.md](./webpack-final.md) |
