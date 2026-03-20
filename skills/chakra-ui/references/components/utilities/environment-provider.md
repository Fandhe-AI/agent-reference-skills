# EnvironmentProvider

Provides the correct root node and document context for Chakra UI components operating in custom DOM environments such as iframes, Shadow DOM, or Electron.

## Import

```tsx
import { EnvironmentProvider } from "@chakra-ui/react"
```

## Usage

```tsx
import { EnvironmentProvider } from "@chakra-ui/react"

export function App() {
  return (
    <EnvironmentProvider>
      {/* Your components here */}
    </EnvironmentProvider>
  )
}
```

## Props

### EnvironmentProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `RootNode \| (() => RootNode)` | — | The root node or a function returning the root node |

## Notes

- Chakra UI relies on `document.querySelectorAll` and `document.getElementById` internally via Zag.js; in non-standard environments these may fail without this provider
- Pass a custom `value` pointing to the correct `document` or shadow root when rendering inside an iframe or Shadow DOM
- Built on Zag.js's custom window environment composition pattern

## Related

- [ClientOnly](./client-only.md)
- [Portal](./portal.md)
