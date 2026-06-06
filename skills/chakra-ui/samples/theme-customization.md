# Theme Customization

Extend the default theme with custom tokens and brand colors using `defineConfig` and `createSystem`.

```tsx
// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50:  { value: "#e6f2ff" },
          100: { value: "#bdd9ff" },
          200: { value: "#90beff" },
          300: { value: "#63a4ff" },
          400: { value: "#3d8bff" },
          500: { value: "#1a72ff" },
          600: { value: "#1459cc" },
          700: { value: "#0e4199" },
          800: { value: "#092a66" },
          900: { value: "#041433" },
          950: { value: "#02091a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid:     { value: "{colors.brand.500}" },
          contrast:  { value: "white" },
          fg:        { value: "{colors.brand.700}" },
          muted:     { value: "{colors.brand.100}" },
          subtle:    { value: "{colors.brand.50}" },
          emphasized:{ value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

// app/layout.tsx
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/theme"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChakraProvider value={system}>{children}</ChakraProvider>
      </body>
    </html>
  )
}

// Use brand color via colorPalette
import { Button, Box } from "@chakra-ui/react"

export function BrandComponents() {
  return (
    <>
      <Button colorPalette="brand">Primary Action</Button>
      <Box bg="brand.50" color="brand.700" p="4">Brand subtle background</Box>
    </>
  )
}
```

## Notes

- `createSystem(defaultConfig, config)` merges with defaults; use `createSystem(config)` alone to start from scratch
- Semantic tokens enable `colorPalette` prop on all built-in components
- Run `npx @chakra-ui/cli typegen ./theme.ts` after changes to update TypeScript types
- To fully eject and customize all tokens: `npx @chakra-ui/cli eject --outdir ./theme`
