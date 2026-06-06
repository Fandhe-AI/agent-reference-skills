# Chakra Factory

Create style-enabled HTML elements and wrap third-party components using the `chakra` factory.

```tsx
import { chakra } from "@chakra-ui/react"

// Style an HTML element directly
const StyledButton = ({ children }) => (
  <chakra.button
    bg="blue.500"
    color="white"
    py="2"
    px="4"
    rounded="md"
    _hover={{ bg: "blue.600" }}
  >
    {children}
  </chakra.button>
)

// Wrap a native element
const Link = chakra("a")

export function Example() {
  return (
    <Link href="https://chakra-ui.com" color="blue.500" textDecoration="underline">
      Visit Chakra UI
    </Link>
  )
}

// Attach base styles and variants
const Card = chakra("div", {
  base: {
    shadow: "lg",
    rounded: "lg",
    p: "6",
    bg: "bg.panel",
  },
  variants: {
    variant: {
      outline: { border: "1px solid", borderColor: "border.muted" },
      filled:  { bg: "bg.subtle" },
    },
  },
})

export function CardDemo() {
  return (
    <Card variant="outline">
      <p>Card content</p>
    </Card>
  )
}

// Wrap a third-party component (must accept className prop)
import NextLink from "next/link"

const ChakraNextLink = chakra(NextLink)

export function NavLink() {
  return (
    <ChakraNextLink href="/about" color="fg.muted" _hover={{ color: "fg" }}>
      About
    </ChakraNextLink>
  )
}
```

## Notes

- `chakra.<element>` enables all style props on standard HTML elements inline
- The `chakra()` factory requires the wrapped component to forward `className`
- The `as` prop is supported for polymorphic rendering
- Attaching styles to the factory is equivalent to `defineRecipe` but colocated with the component
