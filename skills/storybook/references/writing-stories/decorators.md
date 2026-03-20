# Decorators

Functions that wrap stories in extra rendering functionality such as markup, context providers, or theme wrappers.

## Overview

A decorator is a function `(Story, context) => JSX` that wraps the rendered story. Decorators are used to inject providers (theme, router, i18n), add layout padding, or mock context without modifying the component itself. They can be applied at story, component (meta), or global level.

## Usage

### Story-level decorator

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};
```

### Component-level decorator (meta)

```typescript
const meta = {
  component: Button,
  decorators: [
    (Story) => (
      <ThemeProvider theme="default">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Button>;
```

### Global decorator

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

### Using context inside a decorator

The second argument provides story context with `args`, `argTypes`, `globals`, `parameters`, `viewMode`, etc.:

```typescript
const preview: Preview = {
  decorators: [
    (Story, context) => {
      const { parameters } = context;
      if (parameters.pageLayout === 'centered') {
        return (
          <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <Story />
          </div>
        );
      }
      return <Story />;
    },
  ],
};
```

## Notes

- Execution order: global decorators run first (outermost), then component decorators, then story decorators (innermost).
- Multiple decorators in an array are applied from last to first (outermost-to-innermost left-to-right).
- The Source Doc Block works best when decorators are kept separate from the story implementation.

## Related

- [Parameters](./parameters.md)
- [Args](./args.md)
