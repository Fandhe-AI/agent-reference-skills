# Story Rendering

Control how stories are rendered in Storybook's preview iframe (Canvas).

## Overview

Stories render within a preview iframe inside the larger Storybook application. You can run code globally for every story or inject custom HTML into the iframe's `<head>` and `<body>`.

## Configuration

### Run Code for Every Story

Code in `.storybook/preview.ts` executes for all stories globally. Use it for global setup, library initialization, or CSS imports.

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';
import { initialize } from '../lib/your-library';

initialize();

const preview: Preview = {
  // decorators, parameters, globalTypes, etc.
};

export default preview;
```

### Add to `<head>` — preview-head.html

```html
<!-- .storybook/preview-head.html -->
<link rel="preload" href="/fonts/my-font.woff2" />
<script src="https://use.typekit.net/xxxyyy.js"></script>
<script>
  try {
    Typekit.load();
  } catch (e) {}
</script>
```

### Add to `<body>` — preview-body.html

```html
<!-- .storybook/preview-body.html -->
<div id="custom-root"></div>

<style>
  html {
    font-size: 15px;
  }
</style>
```

## Notes

- `preview-head.html` and `preview-body.html` inject into the **preview iframe**, not the main Storybook UI
- Use `preview.ts` for setup that needs HMR support
- The JavaScript build configuration is managed by the selected builder (Webpack or Vite)

## Related

- [Styling and CSS](./styling-and-css.md)
- [Images and Assets](./images-and-assets.md)
- [Story Layout](./story-layout.md)
