# Environment: Iframe

A guide for using Chakra UI inside an iframe — useful for isolating styles and logic, such as showcasing components in a dedicated sandbox.

## Templates

- [Iframe template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/iframe)

## Installation

> Minimum Node.js version: **20.x**

### 1. Install dependencies

```bash
npm i @chakra-ui/react @emotion/react @emotion/cache react-frame-component
```

Additional packages:
- `react-frame-component` — creates an iframe easily in React
- `@emotion/cache` — creates a custom insertion point for styles within the iframe

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

### 4. Setup IframeProvider

`components/ui/iframe-provider.tsx`:

```tsx
import {
  ChakraProvider,
  EnvironmentProvider,
  defaultSystem,
} from "@chakra-ui/react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import Iframe, { FrameContextConsumer } from "react-frame-component"

function memoize<T extends object, R>(func: (arg: T) => R): (arg: T) => R {
  const cache = new WeakMap<T, R>()
  return (arg: T) => {
    if (cache.has(arg)) return cache.get(arg)!
    const ret = func(arg)
    cache.set(arg, ret)
    return ret
  }
}

const createCacheFn = memoize((container: HTMLElement) =>
  createCache({ container, key: "frame" }),
)

export const IframeProvider = (props: React.PropsWithChildren) => {
  const { children } = props
  return (
    <Iframe>
      <FrameContextConsumer>
        {(frame) => {
          const head = frame.document?.head
          if (!head) return null
          return (
            <CacheProvider value={createCacheFn(head)}>
              <EnvironmentProvider value={() => head.ownerDocument}>
                <ChakraProvider value={defaultSystem}>
                  {children}
                </ChakraProvider>
              </EnvironmentProvider>
            </CacheProvider>
          )
        }}
      </FrameContextConsumer>
    </Iframe>
  )
}
```

### 5. Setup root provider

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

### 6. Use the IframeProvider

Wrap any component tree with `IframeProvider` to render it inside an iframe:

`src/App.tsx`:

```tsx
import { Button, Container, Heading, Stack } from "@chakra-ui/react"
import { IframeProvider } from "./components/ui/iframe-provider"

function App() {
  return (
    <Container py="8">
      <Heading mb="5">Outside Iframe</Heading>
      <IframeProvider>
        <Stack p="6" align="flex-start" border="1px solid red">
          <Heading>Inside Iframe</Heading>
          <Button>Click me</Button>
        </Stack>
      </IframeProvider>
    </Container>
  )
}

export default App
```

## Customization

If you created a custom theme with `createSystem`, pass it to both `IframeProvider` and `Provider`:

```tsx
export const system = createSystem(defaultConfig, {
  theme: { colors: {} },
})

// In IframeProvider and Provider:
<ChakraProvider value={system}>{/* ... */}</ChakraProvider>
```

## Notes

- Iframes provide style encapsulation, preventing external styles from affecting components inside
- The `memoize` utility in `IframeProvider` ensures the emotion cache is created only once per container

## Related

- [Environment: Shadow DOM](./env-shadow-dom.md)
- [Installation](./installation.md)
- [Framework: Vite](./framework-vite.md)
