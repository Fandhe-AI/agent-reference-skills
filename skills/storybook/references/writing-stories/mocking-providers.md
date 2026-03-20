# Mocking Providers

Supplies required React context (theme, Redux store, auth, etc.) to stories by wrapping them in decorators that provide mock context values.

## Overview / Signature

The standard approach is a decorator in `.storybook/preview.ts` that wraps every story in the necessary provider. For per-story variation, read from `parameters` inside the decorator.

## Usage

### Global provider decorator (`.storybook/preview.tsx`)

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

### Configurable provider via parameters

```typescript
// .storybook/preview.tsx
const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      const { theme = 'light' } = parameters;
      return (
        <ThemeProvider theme={themes[theme]}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};
```

```typescript
// Button.stories.ts
export const Dark: Story = {
  parameters: {
    theme: 'dark',
  },
};
```

## Notes

- Preview file must use `.tsx` or `.jsx` extension to include JSX in decorators.
- Define the provider once globally and adjust only the values via parameters to avoid repetition.
- For more complex scenarios (Redux + mock data), see the [Intro to Storybook tutorial](https://storybook.js.org/tutorials/intro-to-storybook/react/en/screen/).

## Related

- [Decorators](./decorators.md)
- [Parameters](./parameters.md)
- [Build Pages](./build-pages.md)
