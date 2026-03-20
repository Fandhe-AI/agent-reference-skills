# What's a Story?

A story captures the rendered state of a UI component; developers write multiple stories per component to describe all the interesting states it can support.

## Overview

Stories are written in **Component Story Format (CSF)**, an ES6 modules-based standard. Each named export in a `*.stories.ts` file is a story — an object that describes how to render the component in a specific state.

## Usage

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

## Notes

- The `args` property defines the component's input values and drives both the **Controls** panel (live editing) and the **Actions** panel (callback logging)
- Add new stories by exporting additional named objects from the same file
- Stories double as documentation and testing artifacts — running all stories catches visual regressions early
- Use the sidebar ➕ button or duplicate an existing story file to create new stories quickly

## Related

- [Setup](./setup.md)
- [Browse Stories](./browse-stories.md)
