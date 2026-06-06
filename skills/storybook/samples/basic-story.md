# Basic Story

Define a component's renderable states using Component Story Format (CSF 3).

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

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Button',
  },
};
```

## Notes

- The default export (`meta`) describes the component; named exports are individual stories
- `args` map to component props (React props, Vue props, Angular `@Input`, etc.)
- Each story appears as a separate entry in the Storybook sidebar
- Story files (`*.stories.ts`) are excluded from production bundles automatically
