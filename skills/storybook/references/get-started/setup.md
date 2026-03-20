# Setup

Configure Storybook after installation: render component styles, handle build errors, and provide runtime context via decorators.

## Overview

After writing initial stories, three areas typically need configuration: CSS/styling, build-tool settings (Webpack/Babel), and component context providers (themes, routers, state).

## Usage

**Create a story file alongside your component:**

```typescript
import type { Meta, StoryObj } from '@storybook/your-framework';
import { YourComponent } from './YourComponent';

const meta = {
  component: YourComponent,
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
```

**Wrap all stories with a context provider via `.storybook/preview.ts`:**

```typescript
import React from 'react';
import type { Preview } from '@storybook/your-framework';
import { ThemeProvider } from 'styled-components';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="default">
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
```

## Notes

- CSS setup recipes are available for Tailwind CSS, Material UI, Vuetify, Styled Components, Emotion, Sass, Bootstrap, Less, and Vanilla-extract
- Build errors (Webpack/Babel) can be resolved via **Presets** (e.g. CRA, Ant Design) or custom Babel/Webpack configuration
- Serve static assets externally rather than bundling them inside stories for consistent availability
- Decorators defined in `preview.ts` apply globally to every story

## Related

- [Install](./install.md)
- [What's a Story?](./whats-a-story.md)
