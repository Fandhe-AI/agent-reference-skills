# Viewport

Adjusts the Storybook iframe dimensions to simulate different screen sizes and device resolutions for responsive UI development.

## Overview

The viewport addon adds a toolbar control for switching between predefined or custom device sizes. A minimal set of breakpoints is available by default; an extended set of real device presets can be imported from `storybook/viewport`.

## Configuration

### Global setup (`.storybook/preview.ts`)

```typescript
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  initialGlobals: {
    viewport: { value: 'ipad', isRotated: false },
  },
};
```

### Built-in viewport sets

| Export | Contents |
|--------|----------|
| `MINIMAL_VIEWPORTS` (default) | `mobile1` 320×568, `mobile2` 414×896, `tablet` 834×1112, `desktop` 1024×1280 |
| `INITIAL_VIEWPORTS` | All of the above plus iPhone SE3–14 Pro Max, Android, iPad Pro variants |

### Parameters (`parameters.viewport`)

| Name | Type | Description |
|------|------|-------------|
| `options` | `Record<string, ViewportConfig>` | Available viewport definitions |
| `disable` | boolean | Disables the addon |

### Globals (`globals.viewport`)

| Name | Type | Description |
|------|------|-------------|
| `value` | string | Viewport key to activate |
| `isRotated` | boolean | `true` for landscape orientation |

## Usage

### Custom viewports

```typescript
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

const kindleViewports = {
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: { width: '600px', height: '963px' },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...kindleViewports },
    },
  },
};
```

### Lock viewport for a specific story

```typescript
export const OnPhone: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
```

When set via `globals`, the viewport is fixed and cannot be changed via the toolbar.

## Notes

- Setting `globals.viewport` in a story locks the viewport and disables the toolbar control for that story.
- Keyboard shortcuts: next viewport `Alt+V`, previous `Alt+Shift+V`, reset `Alt+Control+V`.

## Related

- [Backgrounds](./backgrounds.md)
- [Toolbars & Globals](./toolbars-and-globals.md)
