# How Widgets Run

Widgets execute inside the Figma plugin sandbox and run **only in response to user interaction**, on the specific client that initiated that interaction.

## Signature / Usage

```tsx
// Rendering code — synchronous, state-only
function MyWidget() {
  const [label] = useSyncedState("label", "Hello")
  return <Text>{label}</Text>  // must not read canvas nodes
}

// State-updating code — async, can use Plugin API
<AutoLayout onClick={async () => {
  const node = figma.getNodeById(widgetId)
  // interact with canvas
}} />
```

## Options / Props

| Code type | Sync | Can read canvas | Can do network |
|-----------|------|-----------------|----------------|
| Rendering code | Synchronous | No | No |
| Event handlers / `useEffect` | Async | Yes (Plugin API) | Yes (via iframe) |

## Notes

- Rendering code must be **deterministic**: identical state must always produce identical output. Future API versions will enforce this restriction.
- Page-level lazy loading: Figma loads pages on demand, so widgets that read other pages should account for this behavior.
- Direct `fetch()` calls from widgets are restricted to domains listed in `manifest.json` `networkAccess.allowedDomains`; iframed pages retain their own network access.
- State-updating code keeps the widget alive until the async operation resolves or `figma.closePlugin()` is called.

## Related

- [overview](./overview.md)
- [widget-state-and-multiplayer](./widget-state-and-multiplayer.md)
- [useSyncedState](./useSyncedState.md)
- [useEffect](./useEffect.md)
- [waitForTask](./waitForTask.md)
