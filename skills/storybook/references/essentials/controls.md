# Controls

Provides an interactive panel to adjust component args in real time without modifying code.

## Overview

Controls auto-generates UI inputs from component prop types (via `react-docgen` or similar). Each control can be customized through `argTypes`. Changes in the panel update the story immediately.

## Configuration

### Control types

| Data type | Control type | Description |
|-----------|-------------|-------------|
| boolean | `boolean` | Toggle switch |
| number | `number`, `range` | Numeric input or slider |
| object / array | `object` | JSON editor |
| file | `file` | File picker (returns data URLs) |
| enum | `radio`, `inline-radio`, `check`, `inline-check`, `select`, `multi-select` | Single or multiple selection |
| string | `text`, `color`, `date` | Text field, color picker, or date picker |

### `argTypes` customization

```typescript
const meta = {
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};
```

### Parameters (`parameters.controls`)

| Name | Type | Description |
|------|------|-------------|
| `expanded` | boolean | Show full prop documentation |
| `sort` | `'none'` \| `'alpha'` \| `'requiredFirst'` | Control ordering |
| `include` | `string[]` \| `RegExp` | Only show matching controls |
| `exclude` | `string[]` \| `RegExp` | Hide matching controls |
| `presetColors` | `string[]` | Predefined swatches for color picker |
| `disableSaveFromUI` | boolean | Prevent story creation/editing from the panel |
| `matchers` | object | Auto-detect control types by prop name pattern |

```typescript
// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
```

## Usage

### Basic story with args

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: { variant: 'primary' },
};
```

### Mapping complex values

```typescript
argTypes: {
  arrow: {
    options: Object.keys(arrows),
    mapping: arrows,
    control: { type: 'select' },
  },
}
```

### Conditional controls

```typescript
argTypes: {
  advanced: { control: 'boolean' },
  margin: {
    control: 'number',
    if: { arg: 'advanced' },
  },
}
```

## Notes

- Controls require stories written with the `args` pattern (Storybook 6+).
- Non-primitive values lose URL serialization; use `mapping` or a `render` function to convert them.
- The `date` control converts values to UNIX timestamps; manual conversion to a `Date` object is required in the story.
- With `inline: false` on docs stories, controls do not update the documentation preview.

## Related

- [Actions](./actions.md)
- [Toolbars & Globals](./toolbars-and-globals.md)
