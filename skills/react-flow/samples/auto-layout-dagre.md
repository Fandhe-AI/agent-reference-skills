# Auto Layout with Dagre

Dagre を使ってノードを自動配置する。方向（TB / LR）を切り替えるボタンも実装する。

```tsx
import { useCallback, useState } from 'react';
import dagre from 'dagre';
import { ReactFlow, useNodesState, useEdgesState, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = 'TB') {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const pos = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: pos.x - nodeWidth / 2,
        y: pos.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Input' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'Process A' }, position: { x: 0, y: 0 } },
  { id: '3', data: { label: 'Process B' }, position: { x: 0, y: 0 } },
  { id: '4', data: { label: 'Output' }, position: { x: 0, y: 0 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

export default function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: ln, edges: le } = getLayoutedElements(nodes, edges, direction);
      setNodes([...ln]);
      setEdges([...le]);
    },
    [nodes, edges, setNodes, setEdges],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      />
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button onClick={() => onLayout('TB')}>Vertical</button>
        <button onClick={() => onLayout('LR')}>Horizontal</button>
      </div>
    </div>
  );
}
```

## Notes

- `npm install dagre` でインストールする（React Flow 本体には含まれない）
- Dagre はツリー構造に最適。サブフロー内外をまたぐ接続が混在する場合は正しく配置されないことがある
- `getLayoutedElements` は副作用のある `dagreGraph` を共有しているため、モジュール外部で一度だけ定義する
- より複雑なレイアウト（エッジルーティング、サブフロー）が必要な場合は Elkjs を使用する
