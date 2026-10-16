---
source: https://r3f.docs.pmnd.rs/api/canvas#errors-and-fallbacks
---

# Errors and fallbacks

Provide a fallback when WebGL is unsupported and guard the canvas against WebGL context crashes.

## Signature / Usage

```jsx
<Canvas fallback={<div>Sorry no WebGL supported!</div>}>
  <mesh />
</Canvas>
```

Safeguarding against WebGL context crashes, for instance if users have the GPU disabled or GPU drivers are faulty:

```jsx
import { useErrorBoundary } from 'use-error-boundary'

function App() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()
  return didCatch ? (
    <div>{error.message}</div>
  ) : (
    <ErrorBoundary>
      <Canvas>
        <mesh />
      </Canvas>
    </ErrorBoundary>
  )
}
```

## Notes

- On some systems WebGL may not be supported; the `fallback` component is rendered instead of the canvas.
- Ideally, and if possible, your fallback is a seamless, visual replacement for what the canvas would have otherwise rendered.
- `use-error-boundary` is a third-party package used by the official example, not part of `@react-three/fiber`.

## Related

- [Canvas (Properties)](./canvas.md)
