# Widget Minimal Counter

Minimal widget implementation: a click-to-increment counter using `useSyncedState`, synced across all collaborators.

```json
// manifest.json
{
  "name": "Counter Widget",
  "id": "",
  "api": "1.0.0",
  "widgetApi": "1.0.0",
  "containsWidget": true,
  "documentAccess": "dynamic-page",
  "main": "dist/code.js",
  "editorType": ["figma", "figjam"]
}
```

```tsx
// code.tsx  (compiled to dist/code.js)
const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

function Counter() {
  const [count, setCount] = useSyncedState("count", 0);

  return (
    <AutoLayout
      padding={16}
      cornerRadius={8}
      fill="#4f8ef7"
      onClick={() => setCount((n) => n + 1)}
    >
      <Text fontSize={24} fill="#ffffff">
        {count}
      </Text>
    </AutoLayout>
  );
}

widget.register(Counter);
```

## Notes

- Destructure from `figma.widget` at the top of the file to avoid verbose qualified names like `figma.widget.AutoLayout`.
- `useSyncedState` uses last-writer-wins semantics; for concurrent multi-user increments (e.g., voting), use `useSyncedMap` instead.
- `documentAccess: "dynamic-page"` and `containsWidget: true` are both required in the manifest.
- Rendering code must be synchronous and depend only on widget state — do not read external data during render.
