# Global Styles Setup

Import global CSS and configure fonts or static assets for all stories.

```typescript
// .storybook/preview.ts — import bundled CSS (supports HMR)
import type { Preview } from '@storybook/your-framework';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {},
};

export default preview;
```

```html
<!-- .storybook/preview-head.html — static resources without HMR -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

```typescript
// .storybook/main.ts — serve static files from a directory
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  staticDirs: ['../public'],
};

export default config;
```

## Notes

- Importing CSS in `preview.ts` is the recommended approach; it enables Hot Module Replacement during development
- `preview-head.html` injects markup into the `<head>` of the story iframe — use it for fonts and external stylesheets that do not need HMR
- Vite-based projects support CSS Modules, PostCSS, Sass, Less, and Stylus out of the box
- For CSS-in-JS theming, use the `withThemeFromJSXProvider` decorator from `@storybook/addon-themes`
