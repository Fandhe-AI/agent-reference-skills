# Framework: TanStack Router

A guide for installing Chakra UI with TanStack Router projects.

## Templates

- [TanStack Router template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/tanstack-router)

## Installation

> Minimum Node.js version: **20.x**

### 1. Create new project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

### 2. Install dependencies

```bash
npm i @chakra-ui/react @emotion/react @tanstack/react-router
npm i -D @tanstack/router-plugin @tanstack/router-devtools
```

### 3. Add snippets

```bash
npx @chakra-ui/cli snippet add
```

### 4. Update tsconfig

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

### 5. Configure Vite

`vite.config.ts`:

```ts
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react()],
  resolve: {
    tsconfigPaths: true,
  },
})
```

For Vite 7 or lower, install `vite-tsconfig-paths` instead:

```bash
npm i -D vite-tsconfig-paths
```

```ts
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tsconfigPaths(),
  ],
})
```

### 6. Setup root route

`src/routes/__root.tsx`:

```tsx
import { Provider } from "@/components/ui/provider"
import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  )
}
```

### 7. Setup entry point

`src/main.tsx`:

```tsx
import { RouterProvider, createRouter } from "@tanstack/react-router"
import React from "react"
import ReactDOM from "react-dom/client"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

### 8. Create first route

`src/routes/index.tsx`:

```tsx
import { Button, HStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}
```

## Notes

- The Chakra `Provider` is placed at the root route to wrap the entire application
- TanStack Router auto code-splitting is enabled via the `autoCodeSplitting` option
- For Vite 7 or lower, use `vite-tsconfig-paths` plugin instead of `resolve.tsconfigPaths`

## Related

- [Installation](./installation.md)
- [CLI](./cli.md)
- [Framework: Vite](./framework-vite.md)
