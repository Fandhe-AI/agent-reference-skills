# Framework: Vite

A guide for installing Chakra UI with Vite.js projects.

## Templates

- [Vite template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/vite-ts)

## Installation

> Minimum Node.js version: **20.x**

### 1. Install dependencies

```bash
npm i @chakra-ui/react @emotion/react
```

### 2. Add snippets

```bash
npx @chakra-ui/cli snippet add
```

### 3. Update tsconfig

`tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

For JavaScript projects, create `jsconfig.json` with the same content.

### 4. Setup provider

`src/main.tsx`:

```tsx
import { Provider } from "@/components/ui/provider"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
)
```

The `Provider` composes:
- `ChakraProvider` from `@chakra-ui/react` — styling system
- `ThemeProvider` from `next-themes` — color mode

### 5. Setup Vite config paths

Install the `vite-tsconfig-paths` plugin to sync `tsconfig` path aliases with Vite:

```bash
npm i -D vite-tsconfig-paths
```

`vite.config.ts`:

```ts
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
```

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

## Related

- [Installation](./installation.md)
- [CLI](./cli.md)
- [Framework: Remix](./framework-remix.md)
- [Environment: Shadow DOM](./env-shadow-dom.md)
