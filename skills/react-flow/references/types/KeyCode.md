# KeyCode

Type for specifying keyboard key codes or combinations used to trigger interactions (e.g., node deletion, multi-selection).

## 型定義

```typescript
type KeyCode = string | Array<string>;
```

## 値

| Form | Type | Description |
|------|------|-------------|
| Single key | `string` | A single key code (e.g., `'Delete'`, `'Backspace'`) |
| Multiple keys | `string[]` | An array of key codes as alternatives or combinations |

## 使用例

```tsx
import { ReactFlow } from '@xyflow/react';

// Single key
<ReactFlow
  nodes={nodes}
  edges={edges}
  deleteKeyCode="Backspace"
  multiSelectionKeyCode="Meta"
/>

// Multiple alternatives
<ReactFlow
  nodes={nodes}
  edges={edges}
  deleteKeyCode={['Backspace', 'Delete']}
  selectionKeyCode="Shift"
/>
```

## 注意点

- `deleteKeyCode`、`multiSelectionKeyCode`、`selectionKeyCode` などの props に使用される
- 文字列配列を渡した場合、そのうちどれかのキーが押されるとトリガーされる
- キーコードは `KeyboardEvent.key` の値に対応する（例: `'Delete'`, `'Escape'`, `'Meta'`）

## 関連

- [ReactFlowInstance](./ReactFlowInstance.md)
