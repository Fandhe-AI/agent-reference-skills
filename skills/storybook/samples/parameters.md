# Parameters

Pass static metadata to addons and configure story-level, component-level, or global behavior.

```typescript
// Global parameters in .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

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

```typescript
// Component-level and story-level override
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    backgrounds: { options: {} }, // disable for this component
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    backgrounds: {
      options: {
        red: { name: 'Red', value: '#f00' },
      },
    },
  },
};
```

## Notes

- Specificity order: story > component > global; more specific values take precedence
- Parameters merge rather than replace, allowing targeted overrides
- Each addon (backgrounds, viewport, a11y, etc.) reads its own namespace under `parameters`
- Parameters are static — use `args` for values that should be interactive in Controls
