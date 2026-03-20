# Code Panel

Displays a story's source code in the canvas view, with arg values substituted inline — replacing the discontinued Storysource addon from Storybook 9.

## Overview

The code panel renders the same snippet as the `Source` doc block used in Autodocs pages. It can be toggled at global, component, or story level via the `docs.codePanel` parameter.

## Usage

### Enable globally

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

export default preview;
```

### Enable per component

```typescript
const meta = {
  component: Button,
  parameters: {
    docs: {
      codePanel: true,
    },
  },
} satisfies Meta<typeof Button>;
```

### Disable for a specific story

```typescript
export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
  parameters: {
    docs: {
      codePanel: false,
    },
  },
};
```

## Options

| Parameter | Type | Description |
|-----------|------|-------------|
| `docs.codePanel` | `boolean` | Show or hide the code panel for the canvas view |

## Notes

- The code panel uses the same snippet and configuration as the `Source` doc block; customizing `parameters.docs.source` also affects the code panel output.
- Supported across all frameworks (React, Vue, Angular, Web Components, Svelte, etc.).
- Introduced in Storybook 9 as a built-in replacement for the `@storybook/addon-storysource` addon.

## Related

- [Doc Blocks](./doc-blocks.md)
- [Autodocs](./autodocs.md)
