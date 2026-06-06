# Dark Mode

Toggle between light and dark modes using the built-in color mode utilities.

```tsx
// 1. Add snippet
// npx @chakra-ui/cli snippet add color-mode

// 2. Use semantic tokens that adapt automatically
import { Box, Text } from "@chakra-ui/react"

export function Card() {
  return (
    <Box bg="bg.subtle" p="4" rounded="md">
      <Text color="fg.muted">Adapts to light and dark automatically</Text>
    </Box>
  )
}

// 3. Override per-mode with _dark condition
import { Box } from "@chakra-ui/react"

export function Hero() {
  return (
    <Box bg={{ base: "white", _dark: "gray.900" }}>
      Content
    </Box>
  )
}

// 4. Add a toggle button
import { ColorModeButton } from "@/components/ui/color-mode"

export function Header() {
  return <ColorModeButton />
}
```

## Notes

- Semantic tokens like `bg.subtle`, `fg.muted` adapt automatically without explicit `_dark` overrides
- `_dark` condition is available on any style prop for manual control
- `ColorModeButton` (from the snippet) wraps `useColorMode` hook internally
- `suppressHydrationWarning` on `<html>` prevents SSR mismatch for color-mode
