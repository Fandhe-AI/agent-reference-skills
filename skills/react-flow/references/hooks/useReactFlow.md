# useReactFlow

ノード・エッジの操作やビューポート制御、フロー状態の照会が可能な `ReactFlowInstance` を返す。

## Signature

```ts
useReactFlow<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
>(): ReactFlowInstance<NodeType, EdgeType>
```

## Parameters

なし

## Returns

`ReactFlowInstance` — 以下のメソッド・プロパティを持つオブジェクト。

### ノード・エッジ操作

| Method | Signature | Description |
|--------|-----------|-------------|
| `getNodes` | `() => Node[]` | 全ノードを返す |
| `setNodes` | `(payload: Node[] \| ((nodes: Node[]) => Node[])) => void` | ノード配列を更新する |
| `addNodes` | `(payload: Node \| Node[]) => void` | ノードを追加する |
| `getNode` | `(id: string) => Node \| undefined` | ID でノードを取得する |
| `getInternalNode` | `(id: string) => InternalNode \| undefined` | ID で内部ノードを取得する |
| `updateNode` | `(id: string, update: Partial<Node> \| ((node: Node) => Partial<Node>), options?: { replace: boolean }) => void` | ノードのプロパティを更新する |
| `updateNodeData` | `(id: string, dataUpdate: Partial<...> \| ((node: Node) => Partial<...>), options?: { replace: boolean }) => void` | ノードの `data` を更新する |
| `getEdges` | `() => Edge[]` | 全エッジを返す |
| `setEdges` | `(payload: Edge[] \| ((edges: Edge[]) => Edge[])) => void` | エッジ配列を更新する |
| `addEdges` | `(payload: Edge \| Edge[]) => void` | エッジを追加する |
| `getEdge` | `(id: string) => Edge \| undefined` | ID でエッジを取得する |
| `updateEdge` | `(id: string, update: Partial<Edge> \| ((edge: Edge) => Partial<Edge>), options?: { replace: boolean }) => void` | エッジのプロパティを更新する |
| `updateEdgeData` | `(id: string, dataUpdate: Partial<...> \| ((edge: Edge) => Partial<...>), options?: { replace: boolean }) => void` | エッジの `data` を更新する |
| `deleteElements` | `(params: DeleteElementsOptions) => Promise<{ deletedNodes: Node[]; deletedEdges: Edge[] }>` | ノード・エッジを削除する |
| `toObject` | `() => ReactFlowJsonObject<Node, Edge>` | ノード・エッジ・ビューポートを JSON オブジェクトとして返す |

### 接続・交差

| Method | Signature | Description |
|--------|-----------|-------------|
| `getHandleConnections` | `({ type, nodeId, id? }) => HandleConnection[]` | 特定ハンドルへの接続を取得する |
| `getNodeConnections` | `({ type?, nodeId, handleId? }) => NodeConnection[]` | ノードへの接続を取得する |
| `getNodesBounds` | `(nodes: (string \| Node \| InternalNode)[]) => Rect` | 指定ノード群のバウンディングボックスを返す |
| `getIntersectingNodes` | `(node: Node \| Rect \| { id: string }, partially?: boolean, nodes?: Node[]) => Node[]` | 交差しているノードを返す |
| `isNodeIntersecting` | `(node: Node \| Rect \| { id: string }, area: Rect, partially?: boolean) => boolean` | ノードが指定エリアと交差するか判定する |

### ビューポート操作

| Method | Signature | Description |
|--------|-----------|-------------|
| `getViewport` | `() => Viewport` | 現在のビューポートを返す |
| `setViewport` | `(viewport: Viewport, options?: ViewportHelperFunctionOptions) => Promise<boolean>` | ビューポートを設定する |
| `getZoom` | `() => number` | 現在のズームレベルを返す |
| `zoomIn` | `(options?: ViewportHelperFunctionOptions) => Promise<boolean>` | 1.2倍ズームインする |
| `zoomOut` | `(options?: ViewportHelperFunctionOptions) => Promise<boolean>` | 1/1.2倍ズームアウトする |
| `zoomTo` | `(zoomLevel: number, options?: ViewportHelperFunctionOptions) => Promise<boolean>` | 指定レベルにズームする |
| `setCenter` | `(x: number, y: number, options?: ViewportHelperFunctionOptions & { zoom?: number }) => Promise<boolean>` | ビューポートを指定座標に中央揃えする |
| `fitView` | `(options?: FitViewOptions) => Promise<boolean>` | ノードに合わせてビューをフィットさせる |
| `fitBounds` | `(bounds: Rect, options?: ViewportHelperFunctionOptions & { padding?: number }) => Promise<boolean>` | 指定矩形にビューをフィットさせる |
| `screenToFlowPosition` | `(clientPosition: XYPosition, options?: { snapToGrid: boolean }) => XYPosition` | スクリーン座標をフロー座標に変換する |
| `flowToScreenPosition` | `(flowPosition: XYPosition) => XYPosition` | フロー座標をスクリーン座標に変換する |

### プロパティ

| Property | Type | Description |
|----------|------|-------------|
| `viewportInitialized` | `boolean` | ビューポートが DOM にマウントされ初期化済みであれば `true` |

## 使用例

```tsx
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export function NodeCounter() {
  const { getNodes, fitView } = useReactFlow();

  const handleFit = useCallback(() => {
    fitView({ padding: 0.2, duration: 400 });
  }, [fitView]);

  return (
    <button onClick={handleFit}>
      Fit {getNodes().length} nodes
    </button>
  );
}
```

## 注意点

- `<ReactFlowProvider>` または `<ReactFlow>` の子コンポーネント内でのみ使用可能
- `useNodes` / `useEdges` と異なり、**状態変化時に自動で再レンダリングしない**
- 初回レンダリング時は未初期化のため、`useEffect` や `useCallback` の依存配列に含めること
- カスタムノード型・エッジ型のジェネリクス引数に対応

## 関連

- [useStore.md](./useStore.md)
- [useStoreApi.md](./useStoreApi.md)
- [useViewport.md](./useViewport.md)
- [useNodes.md](./useNodes.md)
- [useEdges.md](./useEdges.md)
