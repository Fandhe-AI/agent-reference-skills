# ControlButton

A button component for adding custom actions inside the `<Controls />` panel. Accepts all standard HTML button attributes.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `...props` | `ButtonHTMLAttributes<HTMLButtonElement>` | — | All standard HTML `<button>` element attributes (`onClick`, `className`, `disabled`, `title`, etc.) |

## 使用例

```tsx
import { ReactFlow, Controls, ControlButton } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow nodes={[]} edges={[]}>
      <Controls>
        <ControlButton
          onClick={() => alert('Something magical just happened!')}
          title="magic"
        >
          {/* Any icon or text */}
          ✨
        </ControlButton>
      </Controls>
    </ReactFlow>
  );
}
```

## 注意点

- Must be rendered as a child of `<Controls />` to appear in the control panel.
- The component is intentionally minimal and delegates all behaviour to standard HTML button attributes.
- Child elements can be icons (e.g. from `@radix-ui/react-icons`) or plain text.

## 関連

- [./Controls.md](./Controls.md)
