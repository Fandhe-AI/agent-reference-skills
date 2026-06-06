# Args Composition

Reuse and extend args across stories to avoid duplication.

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
  // Component-level args apply to all stories
  args: {
    primary: true,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Button',
  },
};

// Spread Primary.args and override only what differs
export const PrimaryLongName: Story = {
  args: {
    ...Primary.args,
    label: 'Primary with a really long name',
  },
};
```

## Notes

- Component-level `args` in `meta` are inherited by all stories; story-level `args` override them
- Spreading `Story.args` avoids repeating shared prop values
- Args are displayed and editable in the Controls panel at runtime
- Use `useArgs` from `storybook/preview-api` when the component needs to update its own args (e.g., controlled inputs)
