# Autodocs

Automatically generate documentation pages from component stories and metadata.

```typescript
// Enable globally in .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  tags: ['autodocs'],
};

export default preview;
```

```typescript
// Enable per-component in the story file
import type { Meta } from '@storybook/your-framework';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
```

```typescript
// Customize the docs page template in .storybook/preview.ts
import { Title, Primary, Controls, Stories } from '@storybook/addon-docs/blocks';

const preview = {
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};

export default preview;
```

## Notes

- `tags: ['autodocs']` on `meta` opts a single component in; the global tag opts every component in
- Use `tags: ['!autodocs']` on `meta` or a named story export to opt out selectively
- The generated page lists all stories, their args, and interactive Controls automatically
- Set `docs.defaultName` in `main.ts` to rename the "Docs" tab label project-wide
