# State Management with Zustand

Zustand ストアでノード・エッジ状態を集中管理し、カスタムノードからストアのアクションを直接呼び出す。

```tsx
// store.ts
import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeColor: (nodeId: string, color: string) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },

  updateNodeColor: (nodeId, color) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, color } }
          : node,
      ),
    });
  },
}));

export default useStore;
```

```tsx
// ColorChooserNode.tsx — ストアのアクションをノード内から直接呼び出す
import useStore from './store';

function ColorChooserNode({ id, data }) {
  const updateNodeColor = useStore((s) => s.updateNodeColor);

  return (
    <div>
      <span>{data.label}</span>
      <input
        type="color"
        defaultValue={data.color}
        onChange={(evt) => updateNodeColor(id, evt.target.value)}
        className="nodrag"
      />
    </div>
  );
}
```

```tsx
// App.tsx — ストアの状態を ReactFlow へ接続する
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useStore from './store';

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
```

## Notes

- ノード・エッジオブジェクトを更新するときは必ずスプレッドして新しい参照を作る。React Flow は参照の変化で変更を検知する
- Zustand セレクター（例: `useStore((s) => s.updateNodeColor)`）を使うと必要な値のみ購読でき不要な再レンダリングを抑制できる
- Redux / Recoil / Jotai も同じパターンで利用できる
- `nodrag` CSS クラスをインタラクティブな要素に付与しないとノードが意図せずドラッグされる
