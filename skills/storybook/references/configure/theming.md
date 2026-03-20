# Theming

Customize Storybook's UI appearance using the built-in theming API.

## Overview

Storybook provides a lightweight theming API with built-in `light`, `dark`, and system-preference themes. Themes can be extended via `create()` or replaced entirely with a custom theme object.

## Configuration

### Apply a Built-in Theme

```javascript
// .storybook/manager.js
import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: themes.dark,
});
```

### Theme the Docs Separately

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';
import { themes } from 'storybook/theming';

const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
```

### Create a Custom Theme

```javascript
// .storybook/theme.js
import { create } from 'storybook/theming';

export default create({
  base: 'light', // required: 'light' or 'dark'
  brandTitle: 'My custom Storybook',
  brandUrl: 'https://example.com',
  brandImage: 'https://example.com/logo.png',
  brandTarget: '_self',
});
```

## Theme Variables

| Category | Variables |
|----------|-----------|
| Branding | `brandTitle`, `brandUrl`, `brandImage`, `brandTarget` |
| Typography | `fontBase`, `fontCode` |
| Colors | `colorPrimary`, `colorSecondary`, `textColor`, `textInverseColor` |
| UI Background | `appBg`, `appContentBg`, `appPreviewBg` |
| UI Borders | `appBorderColor`, `appBorderRadius` |
| Toolbar/Nav | `barBg`, `barTextColor`, `barSelectedColor`, `barHoverColor` |
| Forms | `inputBg`, `inputBorder`, `inputTextColor`, `inputBorderRadius` |

## Advanced CSS Overrides

For fine-grained control beyond the theming API:

```html
<!-- .storybook/manager-head.html (Storybook UI) -->
<!-- .storybook/preview-head.html (Docs) -->
<style>
  /* Target internal class names */
</style>
```

## MDX Component Overrides

```typescript
const preview: Preview = {
  parameters: {
    docs: {
      components: {
        code: CustomCodeBlock,
        Canvas: CustomCanvas,
      },
    },
  },
};
```

## For Addon Developers

```javascript
import { styled } from 'storybook/theming';

const Component = styled.div(({ theme }) => ({
  background: theme.background.app,
}));
```

## Notes

- When setting a theme, you must provide a **complete** theme object; partial updates are not merged
- The `base` property is **mandatory** when creating custom themes
- CSS class-name targeting is fragile; internal HTML structures may change across releases
- The UI theme and docs theme are configured independently

## Related

- [Features and Behavior](./features-and-behavior.md)
- [Addons](./addons.md)
