# Parameters

Static, named metadata attached to stories to configure Storybook features and addons.

## Overview

Parameters are a plain object of static metadata — they control addon behavior (backgrounds, viewport, layout, etc.) but do not affect component rendering directly. Use [Args](./args.md) for dynamic component inputs. Parameters can be defined at three levels and follow a merge-based precedence hierarchy.

## Usage

### Story-level parameters

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = { component: Button } satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const OnDark: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
```

### Component-level parameters (meta)

```typescript
const meta = {
  component: Button,
  parameters: {
    backgrounds: {
      options: {
        red: { name: 'Red', value: '#f00' },
        green: { name: 'Green', value: '#0f0' },
      },
    },
  },
} satisfies Meta<typeof Button>;
```

### Global parameters

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#fff' },
        dark: { name: 'Dark', value: '#333' },
      },
    },
  },
};

export default preview;
```

## Notes

- Precedence: story > component > global. More specific parameters override less specific ones.
- Parameters **merge** at the key level — only overwritten keys change; other keys from a lower-precedence level are preserved.
- Parameters are **static**; they cannot be changed at runtime by interactions. For dynamic behavior, use Args.

## Related

- [Args](./args.md)
- [Decorators](./decorators.md)
