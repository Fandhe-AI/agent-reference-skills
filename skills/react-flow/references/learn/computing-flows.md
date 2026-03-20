# Computing Flows

React Flow can compute and transform data directly as it passes through connected nodes, enabling applications that run entirely in the browser without an external server.

## 詳細説明

This pattern treats nodes as computation units. Data flows from source nodes to destination nodes through edges, with each node transforming the data it receives.

### Core Hooks for Data Flow

| Hook | Purpose |
|------|---------|
| `updateNodeData()` from `useReactFlow()` | Write computed values into a node's `data` object |
| `useNodeConnections()` | Get the list of nodes connected to the current node |
| `useNodesData()` | Read the `data` object of one or more nodes by ID |

`updateNodeData()` merges by default. Pass `{ replace: true }` to replace the data object entirely.

### Architecture Pattern

1. **Input nodes** — capture user input and call `updateNodeData()` to store values
2. **Processing nodes** — use `useNodeConnections()` to find connected sources, `useNodesData()` to read their values, then compute and write results
3. **Output nodes** — read upstream data and render the result

## コード例

### Input node with range validation

```tsx
import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function NumberInput({ id, data }) {
  const [number, setNumber] = useState(0);
  const { updateNodeData } = useReactFlow();

  const onChange = useCallback(
    (evt) => {
      const cappedNumber = Math.round(
        Math.min(255, Math.max(0, Number(evt.target.value))),
      );
      setNumber(cappedNumber);
      updateNodeData(id, { value: cappedNumber });
    },
    [id, updateNodeData],
  );

  return (
    <div className="number-input">
      <div>{data.label}</div>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
```

### Output node reading connected node data

```tsx
import { useNodeConnections, useNodesData } from '@xyflow/react';

function ColorPreview({ id }) {
  const connections = useNodeConnections({ nodeId: id, handleType: 'target' });
  const sourceIds = connections.map((c) => c.source);
  const nodesData = useNodesData(sourceIds);

  const r = nodesData.find((n) => n.id === sourceIds[0])?.data.value ?? 0;
  const g = nodesData.find((n) => n.id === sourceIds[1])?.data.value ?? 0;
  const b = nodesData.find((n) => n.id === sourceIds[2])?.data.value ?? 0;

  return (
    <div
      className="node"
      style={{ background: `rgb(${r}, ${g}, ${b})` }}
    >
      <Handle type="target" position={Position.Left} id="red" />
      <Handle type="target" position={Position.Left} id="green" />
      <Handle type="target" position={Position.Left} id="blue" />
    </div>
  );
}
```

### Conditional branching with luminance

```tsx
// luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B
const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

updateNodeData(id, {
  values: luminance >= 128
    ? { light: computedValue, dark: undefined }
    : { light: undefined, dark: computedValue },
});
```

## 注意点

- **Do not use a node's `data` object as direct UI state** for input fields — there is a delay in updating `data` which can cause the cursor to jump erratically. Maintain a separate local `useState` for the input value and call `updateNodeData()` in the change handler
- Keep a consistent data structure across all nodes; when using per-handle data objects, apply that pattern uniformly throughout the flow
- `updateNodeData()` merges by default; use `{ replace: true }` only when the full data object must be replaced

## 関連

- [hooks-providers.md](./hooks-providers.md)
- [typescript.md](./typescript.md)
- [state-management.md](./state-management.md)
