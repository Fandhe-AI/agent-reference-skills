# Testing

Best practices for testing React components that use Chakra UI, with Vitest or Jest.

## Overview

Chakra UI components work with standard React testing utilities. The recommended testing frameworks are **Vitest** and **Jest**.

## Setup

Ensure your test environment supports DOM APIs. With Vitest:

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
  },
})
```

## Basic Test Example

```tsx
import { render, screen } from "@testing-library/react"
import { ChakraProvider } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"

function renderWithChakra(ui: React.ReactElement) {
  return render(<ChakraProvider>{ui}</ChakraProvider>)
}

test("renders button", () => {
  renderWithChakra(<Button>Click me</Button>)
  expect(screen.getByText("Click me")).toBeInTheDocument()
})
```

## Notes

- Wrap components under test with `ChakraProvider` (or your custom provider)
- Use `@testing-library/react` for user-centric queries
- Chakra UI's accessible markup makes it easy to query by role, label, and text
- For color mode testing, wrap with the appropriate color mode context

## Related

- [Overview](./overview.md)
- [Server Components](./server-components.md)
