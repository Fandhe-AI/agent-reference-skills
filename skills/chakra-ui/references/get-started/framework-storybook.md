# Framework: Storybook

A guide for integrating Chakra UI with Storybook.

## Installation

```bash
npm i @storybook/addon-themes @chakra-ui/react @emotion/react
```

## Setup

### 1. Configure preview

`.storybook/preview.tsx`:

```tsx
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
```

### 2. Add dark mode toggle (optional)

Use `withThemeByClassName` from `@storybook/addon-themes` to add a color mode toggle to the Storybook toolbar:

```tsx
import { withThemeByClassName } from "@storybook/addon-themes"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import type { Preview } from "@storybook/react"

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
}

export default preview
```

## Notes

- `defaultSystem` provides Chakra UI's default design tokens and configuration
- `@storybook/addon-themes` manages theme switching in the Storybook toolbar
- This setup allows testing components across light and dark modes during development

## Related

- [Installation](./installation.md)
- [CLI](./cli.md)
- [Framework: Vite](./framework-vite.md)
