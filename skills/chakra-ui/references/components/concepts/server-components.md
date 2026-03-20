# Server Components

Guide for using Chakra UI with React Server Components (RSC).

## Overview

Chakra UI components are **client components** because they rely on `useState`, `useRef`, and `useContext` — APIs that are not available in server components.

## Key Points

- Chakra UI components must be used in client component trees
- Client components are still server-rendered (SSR) but require hydration on the client
- You can freely use Chakra UI components inside `"use client"` boundaries

## Patterns

To use Chakra UI within a server component tree, wrap in a client boundary:

```tsx
// server-page.tsx (Server Component)
import { ClientCard } from "./client-card"

export default function Page() {
  return <ClientCard />
}
```

```tsx
// client-card.tsx
"use client"
import { Box, Text } from "@chakra-ui/react"

export function ClientCard() {
  return (
    <Box p="4">
      <Text>This is a Chakra UI component</Text>
    </Box>
  )
}
```

## Notes

- Review Next.js [Server Component Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) for composition strategies
- Pass server-fetched data as props into client components containing Chakra UI
- Avoid importing Chakra components at the server component level

## Related

- [Overview](./overview.md)
- [Color Mode](./color-mode.md)
