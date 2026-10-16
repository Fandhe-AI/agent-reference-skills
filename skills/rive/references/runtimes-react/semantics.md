# Semantics (React)

Expose Rive graphics to screen readers by opting into semantics through `useRive`.

## Signature / Usage

```jsx
import { useRive, SemanticMode } from "@rive-app/react-canvas";

export default function Login() {
  const { RiveComponent } = useRive({
    src: "/login.riv",
    stateMachine: "State Machine 1",
    autoplay: true,
    autoBind: true,
    semanticsMode: SemanticMode.Enabled,
  });

  return <RiveComponent />;
}
```

Label the graphic with `semanticsOptions.riveCanvasLabel` (sets an `aria-label` on the semantic overlay container):

```jsx
const { RiveComponent } = useRive({
  src: "/login.riv",
  stateMachine: "State Machine 1",
  autoplay: true,
  autoBind: true,
  semanticsMode: SemanticMode.Enabled,
  semanticsOptions: {
    riveCanvasLabel: "Login Experience",
  },
});
```

Enable after load: omit `semanticsMode` and call `enableSemantics()` on the returned `rive` instance:

```jsx
useEffect(() => {
  if (rive && accessibilityEnabled) {
    rive.enableSemantics();
  }
}, [rive, accessibilityEnabled]);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| semanticsMode | SemanticMode | Opt-in; `SemanticMode.Enabled` turns semantics on. `SemanticMode` is re-exported from the React package. |
| semanticsOptions.riveCanvasLabel | string | `aria-label` for the semantic overlay container. |

## Notes

- Semantics (roles, labels, values, states, actions) must be defined in the Rive editor; elements without semantics are not exposed to screen readers regardless of mode.
- React runtimes are thin wrappers over the JS runtime, so semantics behave identically; the Web (JS) semantics page is the reference for ARIA role mapping, keyboard interactions, overlay positioning, and screen reader testing.
- Overlay positioning: `RiveComponent` renders the `<canvas>` inside a container `<div>` that is not positioned by default. If there is no positioned ancestor, pass a `className` that sets `position: relative`:

```css
.rive-container {
  position: relative;
  width: 100%;
  height: 100%;
}
```

## Related

- [useRive](./use-rive.md)

Source: https://rive.app/docs/runtimes/react/semantics (fetched 2026-10)
