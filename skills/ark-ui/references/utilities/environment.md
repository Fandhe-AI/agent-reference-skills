# Environment

The `EnvironmentProvider` lets Ark UI components function correctly in custom runtime contexts (iframes, Shadow DOM, Electron) where DOM query methods like `document.querySelectorAll` may not behave as expected. It relies internally on Zag.js composition patterns.

## Signature / Usage

```tsx
import { EnvironmentProvider } from '@ark-ui/react/environment'
import Frame from 'react-frame-component'

export const App = () => {
  return (
    <Frame title="IFrame Context">
      <EnvironmentProvider>{/* Your App */}</EnvironmentProvider>
    </Frame>
  )
}
```

Manual document control in iframes:

```tsx
import Frame, { FrameContextConsumer } from 'react-frame-component'
import { EnvironmentProvider } from '@ark-ui/react/environment'

export const App = () => (
  <Frame title="IFrame Context">
    <FrameContextConsumer>
      {({ document }) => (
        <EnvironmentProvider value={document}>{/* Your App */}</EnvironmentProvider>
      )}
    </FrameContextConsumer>
  </Frame>
)
```

Accessing context values:

```tsx
import { useEnvironmentContext } from '@ark-ui/react/environment'

export const Usage = () => {
  const { getRootNode } = useEnvironmentContext()
  return <pre>{JSON.stringify(getRootNode(), null, 2)}</pre>
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `RootNode \| (() => RootNode)` | Auto-detected | The root node (document/shadow root) components should query against |

## Notes

- Automatically detects the current environment when no explicit `value` is provided
- Supports iframes, Shadow DOM, and Electron environments
- `useEnvironmentContext` exposes `RootNode`, `Document`, and `Window`

## Related

- [Frame](./frame.md)
- [Client Only](./client-only.md)
