# Backgrounds

Sets the background color behind stories in the Storybook UI, enabling visual testing against different color schemes.

## Overview

The backgrounds addon adds a toolbar control for switching the canvas background color. Default options include light and dark. Colors can be pinned per story via `globals` to prevent toolbar changes.

## Configuration

### Global setup (`.storybook/preview.ts`)

```typescript
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark:   { name: 'Dark',   value: '#333' },
        light:  { name: 'Light',  value: '#F7F9F2' },
        maroon: { name: 'Maroon', value: '#400' },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};
```

### Parameters (`parameters.backgrounds`)

| Name | Type | Description |
|------|------|-------------|
| `options` | `Record<string, { name: string; value: string }>` | Available background colors |
| `disable` | boolean | Disables the addon for the story/component |
| `grid` | object | Grid overlay configuration (see below) |

#### Grid options

| Name | Type | Description |
|------|------|-------------|
| `cellSize` | number | Size of each grid cell in px |
| `opacity` | number | Grid opacity (0–1) |
| `cellAmount` | number | Number of subdivisions per cell |
| `offsetX` | number | Horizontal offset in px |
| `offsetY` | number | Vertical offset in px |

## Usage

### Lock background for a specific story

```typescript
export const OnDark: Story = {
  globals: {
    backgrounds: { value: 'dark' },
  },
};
```

When set via `globals`, the background is applied and cannot be changed via the toolbar.

### Disable for a story

```typescript
export const Large: Story = {
  parameters: {
    backgrounds: { disable: true },
  },
};
```

## Notes

- Setting `globals.backgrounds.value` in a story locks the background and disables the toolbar control for that story.
- The grid overlay is purely visual and does not affect component rendering.

## Related

- [Controls](./controls.md)
- [Viewport](./viewport.md)
- [Toolbars & Globals](./toolbars-and-globals.md)
