# Parameters

Static metadata used to configure stories and addons in Storybook.

## Overview

Parameters are plain objects attached at three levels — **story**, **component** (meta), or **project** (`.storybook/preview.ts`). They merge hierarchically: project → meta → story, with objects deep-merged and primitives/arrays overwritten at each level.

## Usage

```typescript
// Project level — .storybook/preview.ts
export const parameters = {
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#fff' },
      { name: 'dark', value: '#333' },
    ],
  },
};

// Component level
const meta = {
  component: Button,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Button>;

// Story level
export const FullPage: Story = {
  parameters: { layout: 'fullscreen' },
};
```

## Core Parameters

### `layout`

| Value | Description |
|-------|-------------|
| `'padded'` | Default — adds padding around the story |
| `'centered'` | Centers the story horizontally and vertically |
| `'fullscreen'` | No padding, fills the canvas |

### `options` (project-level only)

Controls story ordering via `storySort`.

```typescript
// preview.ts
export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',         // 'alphabetical' | 'configure'
      order: ['Intro', 'Components'], // explicit ordering array
      locales: 'en-US',
      includeNames: true,
    },
  },
};
```

`storySort` also accepts a comparator function `(a, b) => number`.

### `test`

Controls mock behavior between stories (useful with Vitest).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `clearMocks` | boolean | false | Clear mock call history on unmount |
| `mockReset` | boolean | false | Reset mocks to empty functions on unmount |
| `restoreMocks` | boolean | true | Restore original implementations on unmount |
| `dangerouslyIgnoreUnhandledErrors` | boolean | false | Suppress unhandled errors from causing test failure |

## Essential Addon Parameters

The following parameters are provided by built-in addons:

| Parameter | Addon | Description |
|-----------|-------|-------------|
| `actions` | @storybook/addon-actions | Event handler tracking config |
| `backgrounds` | @storybook/addon-backgrounds | Canvas background options |
| `controls` | @storybook/addon-controls | Controls panel configuration |
| `docs` | @storybook/addon-docs | Documentation generation settings |
| `highlight` | @storybook/addon-highlight | Element highlighting |
| `viewport` | @storybook/addon-viewport | Responsive device simulation |
| `a11y` | @storybook/addon-a11y | Accessibility check config |

## Notes

- Objects deep-merge across levels; arrays and primitives are overwritten (more specific level wins)
- `parameters` at story level always takes highest precedence

## Related

- [CSF](./csf.md)
- [ArgTypes](./arg-types.md)
