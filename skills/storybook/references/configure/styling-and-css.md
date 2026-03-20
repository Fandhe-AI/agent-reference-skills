# Styling and CSS

Configure CSS and styling in Storybook to match your application's styling approach.

## Overview

Storybook supports multiple CSS inclusion methods. The recommended approach is importing CSS in `.storybook/preview.ts` for hot module replacement (HMR) support. For external resources without HMR needs, use `.storybook/preview-head.html`.

## Configuration

### Import CSS in preview.ts (Recommended)

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {},
};

export default preview;
```

### Static CSS via preview-head.html

```html
<!-- .storybook/preview-head.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="stylesheet" href="path/to/your/styles.css" />
```

## CSS Processing Tools

| Tool | Vite | Webpack |
|------|------|---------|
| CSS Modules | Built-in, no config needed | Requires `@storybook/addon-styling-webpack` |
| PostCSS | Automatically applied | Requires `@storybook/addon-styling-webpack` |
| Sass / Less / Stylus | Built-in | Requires `@storybook/addon-styling-webpack` or custom loaders |

### Next.js

Storybook automatically recreates Next.js configuration, so CSS modules work without additional setup.

## CSS-in-JS

Most CSS-in-JS solutions work without additional configuration. For theme-dependent libraries, use `@storybook/addon-themes`'s `withThemeFromJSXProvider` decorator.

## Web Fonts

```html
<!-- .storybook/preview-head.html -->
<link rel="preload" href="/fonts/my-font.woff2" />
```

Or import via fontsource packages in `preview.ts`.

## Notes

- CSS imported in `preview.ts` supports HMR; changes reflect without server restart
- CSS added via `preview-head.html` requires a server restart to take effect
- Component-level CSS imports work automatically when using the `preview.ts` import approach

## Related

- [Story Rendering](./story-rendering.md)
- [Images and Assets](./images-and-assets.md)
