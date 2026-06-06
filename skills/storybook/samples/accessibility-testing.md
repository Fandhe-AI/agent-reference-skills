# Accessibility Testing

Audit stories against WCAG rules using the `@storybook/addon-a11y` addon.

```bash
npx storybook add @storybook/addon-a11y
```

```typescript
// Global a11y configuration in .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  parameters: {
    a11y: {
      context: 'body',
      config: {},
      options: {},
    },
  },
};

export default preview;
```

```typescript
// Story-level rule overrides
import type { Meta, StoryObj } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
  parameters: {
    a11y: {
      test: 'error', // fail the story on a11y violations
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IndividualRulesExample: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'image-alt', enabled: false }, // disable a specific rule
        ],
      },
    },
  },
};
```

## Notes

- The addon adds an "Accessibility" panel to each story showing violations, passes, and incomplete checks
- `a11y.test: 'error'` causes play function assertions to fail when violations exist — useful in CI
- Exclude DOM nodes from checks with `a11y.context.exclude: ['.selector']`
- Rules follow the axe-core rule IDs; see the axe-core docs for available rule identifiers
