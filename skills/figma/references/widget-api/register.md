# register

The main entry point for a widget. Registers the functional component that Figma calls to render the widget whenever it is inserted or its state changes.

## Signature / Usage

```typescript
register(component: FunctionalWidget<any>): void
```

```tsx
const { widget } = figma
const { Text, register } = widget

function MyFirstWidget() {
  return <Text>Hello Widget</Text>
}

widget.register(MyFirstWidget)
```

## Notes

- `register` must be called **exactly once** when `manifest.main` executes.
- The registered component function runs every time the widget re-renders (on insert and on every state update).
- The component must return a single root Figma element (e.g., `AutoLayout`, `Frame`, `Text`). `Fragment` cannot be the root.

## Related

- [overview](./overview.md)
- [waitForTask](./waitForTask.md)
- [useSyncedState](./useSyncedState.md)
