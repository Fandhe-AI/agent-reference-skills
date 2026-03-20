# Devtools and Debugging

React Flow's internal state can be revealed through three composable devtools components: Node Inspector, Change Logger, and Viewport Logger.

## 詳細説明

### Three Devtools Components

| Component | Hook used | What it shows |
|-----------|-----------|--------------|
| `NodeInspector` | `useNodes`, `useReactFlow` | Node ID, type, selection status, position, absolute position, measured dimensions, data payload |
| `ChangeLogger` | `useStore`, `useStoreApi` | `onNodesChange` events as they dispatch |
| `ViewportLogger` | `useStore` | Viewport x, y, and zoom values in real time |

`NodeInspector` uses `<ViewportPortal />` to render inside the React Flow viewport so it transforms with panning and zooming.

`ChangeLogger` intercepts `onNodesChange` by wrapping the user-provided handler with a logging layer using `useStoreApi` to update internal state.

`ViewportLogger` renders in a `<Panel />` component.

## コード例

### DevTools wrapper component

```tsx
import { useState, type Dispatch, type SetStateAction, type ReactNode, type HTMLAttributes } from 'react';
import { Panel } from '@xyflow/react';

import NodeInspector from './NodeInspector';
import ChangeLogger from './ChangeLogger';
import ViewportLogger from './ViewportLogger';

export default function DevTools() {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(true);
  const [changeLoggerActive, setChangeLoggerActive] = useState(true);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(true);

  return (
    <div className="react-flow__devtools">
      <Panel position="top-left">
        <DevToolButton setActive={setNodeInspectorActive} active={nodeInspectorActive} title="Toggle Node Inspector">
          Node Inspector
        </DevToolButton>
        <DevToolButton setActive={setChangeLoggerActive} active={changeLoggerActive} title="Toggle Change Logger">
          Change Logger
        </DevToolButton>
        <DevToolButton setActive={setViewportLoggerActive} active={viewportLoggerActive} title="Toggle Viewport Logger">
          Viewport Logger
        </DevToolButton>
      </Panel>
      {changeLoggerActive && <ChangeLogger />}
      {nodeInspectorActive && <NodeInspector />}
      {viewportLoggerActive && <ViewportLogger />}
    </div>
  );
}

function DevToolButton({
  active,
  setActive,
  children,
  ...rest
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={() => setActive((a) => !a)} className={active ? 'active' : ''} {...rest}>
      {children}
    </button>
  );
}
```

### NodeInspector

```tsx
import { useNodes, ViewportPortal, useReactFlow, type XYPosition } from '@xyflow/react';

export default function NodeInspector() {
  const { getInternalNode } = useReactFlow();
  const nodes = useNodes();

  return (
    <ViewportPortal>
      <div className="react-flow__devtools-nodeinspector">
        {nodes.map((node) => {
          const internalNode = getInternalNode(node.id);
          if (!internalNode) return null;
          const absPosition = internalNode.internals.positionAbsolute;
          return (
            <NodeInfo
              key={node.id}
              id={node.id}
              selected={!!node.selected}
              type={node.type || 'default'}
              position={node.position}
              absPosition={absPosition}
              width={node.measured?.width ?? 0}
              height={node.measured?.height ?? 0}
              data={node.data}
            />
          );
        })}
      </div>
    </ViewportPortal>
  );
}
```

### ChangeLogger

```tsx
import { useEffect, useRef, useState } from 'react';
import { useStore, useStoreApi, type OnNodesChange, type NodeChange } from '@xyflow/react';

export default function ChangeLogger({ limit = 20 }: { limit?: number }) {
  const [changes, setChanges] = useState<NodeChange[]>([]);
  const onNodesChangeIntercepted = useRef(false);
  const onNodesChange = useStore((s) => s.onNodesChange);
  const store = useStoreApi();

  useEffect(() => {
    if (!onNodesChange || onNodesChangeIntercepted.current) return;

    onNodesChangeIntercepted.current = true;
    const userOnNodesChange = onNodesChange;

    const onNodesChangeLogger: OnNodesChange = (changes) => {
      userOnNodesChange(changes);
      setChanges((oldChanges) => [...changes, ...oldChanges].slice(0, limit));
    };

    store.setState({ onNodesChange: onNodesChangeLogger });
  }, [onNodesChange, limit]);

  return (
    <div className="react-flow__devtools-changelogger">
      <div className="react-flow__devtools-title">Change Logger</div>
      {changes.length === 0 ? (
        <>no changes triggered</>
      ) : (
        changes.map((change, index) => (
          <div key={index}>{JSON.stringify(change)}</div>
        ))
      )}
    </div>
  );
}
```

### Usage in main flow

```tsx
import { ReactFlow, addEdge, useEdgesState, useNodesState, type OnConnect } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DevTools from './Devtools';

function Flow() {
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <DevTools />
    </ReactFlow>
  );
}
```

## 注意点

- Each of the three devtools components works independently and can be copied into a project separately
- `useNodes` re-renders on every node change — this is intentional for debugging but would be a performance issue in production components
- `ChangeLogger` intercepts the internal `onNodesChange` via `useStoreApi` — use carefully and remove from production builds
- `ViewportPortal` renders content inside the viewport coordinate space; content will pan and zoom with the canvas
- This implementation is experimental; the React Flow team invites feedback for improvements

## 関連

- [performance.md](./performance.md)
- [hooks-providers.md](./hooks-providers.md)
- [state-management.md](./state-management.md)
