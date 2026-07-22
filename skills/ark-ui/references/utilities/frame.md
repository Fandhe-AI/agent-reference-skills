# Frame

The `Frame` component renders content within an iframe while tracking content dimensions and exposing them via CSS variables, and supports dynamic style injection and lifecycle callbacks.

## Signature / Usage

```tsx
import { Frame } from '@ark-ui/react/frame'

export const App = () => (
  <Frame onMount={(frameWindow) => console.log(frameWindow)}>
    <div>Content rendered inside an iframe</div>
  </Frame>
)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `head` | `ReactNode` | — | Additional content injected into the frame's `<head>` |
| `onMount` | `function` | — | Executes when the iframe completes mounting |
| `onUnmount` | `function` | — | Executes during iframe unmounting |
| `srcDoc` | `string` | — | Custom HTML content for the iframe document |

## Notes

- Tracks content size and exposes it via CSS variables
- Supports script/stylesheet injection into the iframe head
- Useful for rendering isolated component sandboxes

## Related

- [Environment](./environment.md)
