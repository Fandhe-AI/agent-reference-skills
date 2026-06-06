# Responsive Styles

Apply breakpoint-based styles using object syntax, array syntax, or modifier notation.

```tsx
import { Box, Text, Stack } from "@chakra-ui/react"

// Object syntax — mobile-first with named breakpoints
export function ResponsiveCard() {
  return (
    <Box
      width={{ base: "100%", md: "50%", lg: "33%" }}
      padding={{ base: "4", md: "8" }}
      fontSize={{ base: "sm", lg: "md" }}
    >
      <Text fontWeight={{ base: "medium", lg: "bold" }}>
        Responsive text
      </Text>
    </Box>
  )
}

// Visibility helpers
import { Box } from "@chakra-ui/react"

export function VisibilityExample() {
  return (
    <>
      <Box hideFrom="md">Visible only on mobile</Box>
      <Box hideBelow="md">Visible only on md and above</Box>
    </>
  )
}

// Stack direction that changes per breakpoint
import { Stack, Box } from "@chakra-ui/react"

export function AdaptiveLayout() {
  return (
    <Stack direction={{ base: "column", md: "row" }} gap="4">
      <Box flex="1">Left</Box>
      <Box flex="1">Right</Box>
    </Stack>
  )
}
```

## Notes

- Default breakpoints: `base` (0px), `sm` (480px), `md` (768px), `lg` (992px), `xl` (1280px), `2xl` (1536px)
- Chakra uses min-width (mobile-first) media queries
- Array syntax `[mobile, sm, md, ...]` also works; use `undefined` to skip a breakpoint
- Modifier notation: `smDown`, `mdOnly`, `mdToXl` for range-based targeting
- `compoundVariants` in recipes do not support responsive values
