# Story Layout

Control how stories are positioned within Storybook's Canvas tab using the `layout` parameter.

## Overview

The `layout` parameter provides three display modes for component rendering: `centered`, `fullscreen`, and `padded` (default).

## Options

| Value | Description |
|-------|-------------|
| `'padded'` | (Default) Adds surrounding spacing around the component |
| `'centered'` | Centers the component horizontally and vertically in the Canvas |
| `'fullscreen'` | Expands the component across the full width and height of the Canvas |

## Configuration

### Global (all stories)

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
};

export default preview;
```

### Component-level

```typescript
import type { Meta } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
```

### Story-level

```typescript
export const WithLayout: Story = {
  parameters: {
    layout: 'fullscreen',
  },
};
```

## Notes

- The parameter cascades: global → component → story; each level overrides the parent
- Use `'fullscreen'` for page-level components and layout components
- Use `'centered'` for isolated UI components like buttons or form inputs

## Related

- [Story Rendering](./story-rendering.md)
- [Features and Behavior](./features-and-behavior.md)
