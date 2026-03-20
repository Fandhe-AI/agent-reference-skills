# Dark Mode

Chakra UI provides built-in dark mode support using the `next-themes` library, with semantic tokens that automatically adapt to light/dark color schemes.

## Overview

Dark mode is implemented via generated provider components and hooks. The recommended approach uses semantic tokens that adapt automatically; manual overrides are available via the `_dark` condition.

Core generated pieces (via CLI snippet):

| Name | Purpose |
|------|---------|
| `ColorModeProvider` | Wraps the application to manage color mode |
| `useColorMode` | Hook to access current mode and toggle function |
| `useColorModeValue` | Hook returning a value based on current mode |
| `ColorModeButton` | Pre-built UI toggle component |

## Usage

```tsx
// 1. Install snippet
// npx @chakra-ui/cli snippet add color-mode

// 2. Wrap app
<ChakraProvider value={defaultSystem}>
  <ColorModeProvider>{children}</ColorModeProvider>
</ChakraProvider>

// 3. Add toggle button
<ColorModeButton />

// 4a. Style with semantic tokens (recommended)
<Box bg="bg.subtle">
  <Text>Hello</Text>
</Box>

// 4b. Manual dark mode override
<Box bg={{ base: "white", _dark: "black" }}>
  Content
</Box>
```

## Notes

- Semantic tokens are the recommended approach for consistent light/dark styling
- The CLI generates all necessary setup code automatically
- Dark mode respects system preferences by default

## Related

- [Conditional Styles](./conditional-styles.md)
- [Virtual Color](./virtual-color.md)
