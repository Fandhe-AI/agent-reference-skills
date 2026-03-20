# Framework: Remix

A guide for installing Chakra UI with Remix projects.

## Templates

- [Remix template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/remix-ts)

## Installation

### 1. Install dependencies

```bash
npm i @chakra-ui/react @emotion/react
```

### 2. Add snippets

```bash
npx @chakra-ui/cli snippet add
```

### 3. Setup emotion cache

Remix requires an emotion cache for SSR style injection. Copy the emotion cache snippet from the sandbox:

[Emotion cache snippet](https://github.com/chakra-ui/chakra-ui/blob/main/sandbox/remix-ts/app/emotion)

### 4. Update tsconfig

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true
  }
}
```

For JavaScript projects, create `jsconfig.json` with the same content.

### 5. Setup provider

`app/root.tsx`:

```tsx
import { Provider } from "@/components/ui/provider"

export default function App() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  )
}
```

The `Provider` composes:
- `ChakraProvider` from `@chakra-ui/react` — styling system
- `ThemeProvider` from `next-themes` — color mode

### 6. Usage

```tsx
import { Button, HStack } from "@chakra-ui/react"

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}
```

## Known Issues

You may encounter this hydration error:

```
Error: There was an error while hydrating. Because the error happened outside
of a Suspense boundary, the entire root will switch to client rendering.
```

This is related to browser extensions. Test in incognito mode to confirm. Contributions to fix this are welcome.

## Related

- [Installation](./installation.md)
- [CLI](./cli.md)
- [Framework: Vite](./framework-vite.md)
