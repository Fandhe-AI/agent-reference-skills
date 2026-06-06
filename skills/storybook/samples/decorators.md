# Decorators

Wrap stories in extra rendering functionality such as layout, theming, or context providers.

```typescript
// Story-level decorator
import type { Meta, StoryObj } from '@storybook/your-framework';
import { YourComponent } from './YourComponent';

const meta = {
  component: YourComponent,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof YourComponent>;

export default meta;
```

```typescript
// Global decorator in .storybook/preview.ts
import type { Preview } from '@storybook/your-framework';

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      const { pageLayout } = parameters;
      switch (pageLayout) {
        case 'page':
          return <div className="page-layout"><Story /></div>;
        default:
          return <Story />;
      }
    },
  ],
};

export default preview;
```

## Notes

- Decorators defined in `meta` apply to all stories in that file; global decorators in `preview.ts` apply project-wide
- The second argument to a decorator is the story context, which includes `parameters`, `args`, and `globals`
- Common uses: adding padding/margin, wrapping with a theme provider, injecting router or store context
- Story-level decorators can also be added directly to individual named exports
