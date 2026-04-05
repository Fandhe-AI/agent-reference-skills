# JSX DOM (Client-Side)

Client-side interactive UIs using `hono/jsx/dom`. The bundle is only ~2.8KB (Brotli) vs React's ~47.8KB.

## Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx/dom"
  }
}
```

### Vite (vite.config.ts)

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsxImportSource: 'hono/jsx/dom',
  },
})
```

Using `hono/jsx/dom` (not `hono/jsx`) produces smaller bundles.

## Signature / Usage

```tsx
import { useState } from 'hono/jsx'
import { render } from 'hono/jsx/dom'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

const root = document.getElementById('root')
render(<Counter />, root)
```

## Available Hooks

| Hook | Description |
|------|-------------|
| `useState` | Local state management |
| `useReducer` | Reducer-based state |
| `useEffect` | Side effects after render |
| `useLayoutEffect` | Side effects before paint |
| `useInsertionEffect` | DOM injection before layout |
| `useRef` / `createRef` | Mutable refs |
| `forwardRef` / `useImperativeHandle` | Ref forwarding |
| `useCallback` | Memoize callbacks |
| `useMemo` | Memoize computed values |
| `useDeferredValue` | Defer non-urgent updates |
| `useTransition` / `startTransition` | Mark updates as non-urgent |
| `useViewTransition` | View Transitions API |
| `useFormStatus` | Form submission state |
| `useActionState` | Form action state |
| `useOptimistic` | Optimistic UI updates |
| `use` | Read resources / context |
| `useId` | Stable unique IDs |
| `useSyncExternalStore` | Subscribe to external stores |
| `memo` | Memoize components |
| `createElement` | Create elements imperatively |
| `isValidElement` | Type guard for JSX elements |

## View Transitions API

### Basic Transition with startViewTransition

```tsx
import { useState, startViewTransition } from 'hono/jsx'

export default function App() {
  const [showLarge, setShowLarge] = useState(false)
  return (
    <button onClick={() => startViewTransition(() => setShowLarge((s) => !s))}>
      Toggle
    </button>
  )
}
```

### With useViewTransition Hook

`useViewTransition()` returns `[isUpdating, startViewTransition]`. `isUpdating` is `true` during the transition animation, enabling style changes.

```tsx
const [isUpdating, startViewTransition] = useViewTransition()
```

### With Keyframe Animations

```tsx
import { viewTransition } from 'hono/jsx/dom/css'
import { css, keyframes, Style } from 'hono/css'

const rotate = keyframes`
  from { rotate: 0deg; }
  to { rotate: 360deg; }
`

const [transitionNameClass] = useState(() =>
  viewTransition(css`
    ::view-transition-old() { animation-name: ${rotate}; }
    ::view-transition-new() { animation-name: ${rotate}; }
  `)
)
```

## Notes

- The hook API is compatible with React's — same names and semantics.
- Use `hono/jsx/dom` as `jsxImportSource` (not `hono/jsx`) for the smaller client runtime.

## Related

- [jsx.md](./jsx.md)
