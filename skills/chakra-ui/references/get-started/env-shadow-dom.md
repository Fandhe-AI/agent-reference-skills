# Environment: Shadow DOM

A guide for using Chakra UI inside a Shadow DOM — useful for browser extensions and large projects requiring style and logic encapsulation.

## Templates

- [Shadow DOM template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/shadow-dom)

## Installation

> Minimum Node.js version: **20.x**

### 1. Install dependencies

```bash
npm i @chakra-ui/react @emotion/react @emotion/cache react-shadow
```

Additional packages:
- `react-shadow` — creates a Shadow DOM easily in React
- `@emotion/cache` — creates a custom insertion point for styles within the Shadow DOM

### 2. Add snippets

```bash
npx @chakra-ui/cli snippet add
```

### 3. Update tsconfig

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 4. Configure style engine

`components/ui/system.ts`:

```ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const varRoot = ":host"

const config = defineConfig({
  cssVarsRoot: varRoot,
  conditions: {
    light: `${varRoot} &, .light &`,
  },
  preflight: { scope: varRoot },
  globalCss: {
    [varRoot]: defaultConfig.globalCss?.html ?? {},
  },
})

export const system = createSystem(defaultConfig, config)
```

The purpose of `system.ts` is to configure the style engine to target the Shadow DOM's `:host` root instead of `:root`.

### 5. Setup provider

`components/ui/provider.tsx`:

```tsx
"use client"
import { ChakraProvider, EnvironmentProvider } from "@chakra-ui/react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider, type ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"
import root from "react-shadow/emotion"
import { system } from "./system"

export function Provider(props: ThemeProviderProps) {
  const [shadow, setShadow] = useState<HTMLElement | null>(null)
  const [cache, setCache] = useState<ReturnType<typeof createCache> | null>(null)

  useEffect(() => {
    if (!shadow?.shadowRoot || cache) return
    const emotionCache = createCache({
      key: "root",
      container: shadow.shadowRoot,
    })
    setCache(emotionCache)
  }, [shadow, cache])

  return (
    <root.div ref={setShadow}>
      {shadow && cache && (
        <EnvironmentProvider value={() => shadow.shadowRoot ?? document}>
          <CacheProvider value={cache}>
            <ChakraProvider value={system}>
              <ThemeProvider {...props} />
            </ChakraProvider>
          </CacheProvider>
        </EnvironmentProvider>
      )}
    </root.div>
  )
}
```

This provider composes:
- `ChakraProvider` — styling system
- `EnvironmentProvider` from `react-shadow` — ensures Chakra components query the DOM correctly
- `CacheProvider` from `@emotion/react` — provides the custom style insertion point
- `ThemeProvider` from `next-themes` — color mode

### 6. Use the provider

`src/main.tsx`:

```tsx
import { Provider } from "@/components/ui/provider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
```

### 7. Usage

```tsx
import { Button, HStack } from "@chakra-ui/react"

export default function App() {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}
```

## Notes

- Shadow DOM provides style isolation, preventing external styles from leaking in or out
- Particularly valuable for browser extensions and embedded components in third-party applications

## Related

- [Environment: Iframe](./env-iframe.md)
- [Installation](./installation.md)
- [Framework: Vite](./framework-vite.md)
