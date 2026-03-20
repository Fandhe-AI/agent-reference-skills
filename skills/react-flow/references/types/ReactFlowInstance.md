# ReactFlowInstance

Object providing methods to programmatically query and manipulate flow state. Accessed via the `useReactFlow` hook or the `onInit` callback.

## 型定義

```typescript
type ReactFlowInstance<NodeType extends Node = Node, EdgeType extends Edge = Edge> = {
  // Nodes & Edges
  getNodes: () => NodeType[];
  setNodes: (payload: NodeType[] | ((nodes: NodeType[]) => NodeType[])) => void;
  addNodes: (payload: NodeType | NodeType[]) => void;
  getNode: (id: string) => NodeType | undefined;
  getInternalNode: (id: string) => InternalNode<NodeType> | undefined;
  getEdges: () => EdgeType[];
  setEdges: (payload: EdgeType[] | ((edges: EdgeType[]) => EdgeType[])) => void;
  addEdges: (payload: EdgeType | EdgeType[]) => void;
  getEdge: (id: string) => EdgeType | undefined;
  toObject: () => ReactFlowJsonObject<NodeType, EdgeType>;
  deleteElements: (params: { nodes?: { id: string }[]; edges?: { id: string }[] }) => Promise<{ deletedNodes: NodeType[]; deletedEdges: EdgeType[] }>;
  updateNode: (id: string, update: Partial<NodeType> | ((node: NodeType) => Partial<NodeType>), options?: { replace: boolean }) => void;
  updateNodeData: (id: string, update: Partial<Record<string, unknown>> | ((node: NodeType) => Partial<Record<string, unknown>>), options?: { replace: boolean }) => void;
  updateEdge: (id: string, update: Partial<EdgeType> | ((edge: EdgeType) => Partial<EdgeType>), options?: { replace: boolean }) => void;
  updateEdgeData: (id: string, update: Partial<Record<string, unknown>> | ((edge: EdgeType) => Partial<Record<string, unknown>>), options?: { replace: boolean }) => void;
  getNodesBounds: (nodes: (string | NodeType | InternalNode)[]) => Rect;
  getHandleConnections: (params: { type: 'source' | 'target'; id?: string; nodeId: string }) => HandleConnection[];
  getNodeConnections: (params: { type?: 'source' | 'target'; nodeId: string; handleId?: string }) => NodeConnection[];
  // Intersection
  getIntersectingNodes: (node: NodeType | Rect | { id: string }, partially?: boolean, nodes?: NodeType[]) => NodeType[];
  isNodeIntersecting: (node: NodeType | Rect | { id: string }, area: Rect, partially?: boolean) => boolean;
  // Viewport
  zoomIn: (options?: ViewportOptions) => Promise<boolean>;
  zoomOut: (options?: ViewportOptions) => Promise<boolean>;
  zoomTo: (zoomLevel: number, options?: ViewportOptions) => Promise<boolean>;
  getZoom: () => number;
  setViewport: (viewport: Viewport, options?: ViewportOptions) => Promise<boolean>;
  getViewport: () => Viewport;
  setCenter: (x: number, y: number, options?: ViewportOptions & { zoom?: number }) => Promise<boolean>;
  fitBounds: (bounds: Rect, options?: ViewportOptions & { padding?: number }) => Promise<boolean>;
  fitView: (options?: FitViewOptions) => Promise<boolean>;
  screenToFlowPosition: (clientPosition: XYPosition, options?: { snapToGrid: boolean }) => XYPosition;
  flowToScreenPosition: (flowPosition: XYPosition) => XYPosition;
  viewportInitialized: boolean;
};
```

## ノード・エッジ操作メソッド

| Method | Signature | Description |
|--------|-----------|-------------|
| `getNodes` | `() => Node[]` | 全ノードを取得 |
| `setNodes` | `(payload) => void` | ノード配列を置き換え、または関数で更新 |
| `addNodes` | `(payload) => void` | ノードを追加 |
| `getNode` | `(id) => Node \| undefined` | ID でノードを取得 |
| `getInternalNode` | `(id) => InternalNode \| undefined` | 内部ノード表現を取得 |
| `getEdges` | `() => Edge[]` | 全エッジを取得 |
| `setEdges` | `(payload) => void` | エッジ配列を置き換え、または関数で更新 |
| `addEdges` | `(payload) => void` | エッジを追加 |
| `getEdge` | `(id) => Edge \| undefined` | ID でエッジを取得 |
| `toObject` | `() => ReactFlowJsonObject` | フロー全体を JSON オブジェクトとしてエクスポート |
| `deleteElements` | `(params) => Promise<{...}>` | 指定したノード・エッジを削除 |
| `updateNode` | `(id, update, options?) => void` | ノードのプロパティを更新 |
| `updateNodeData` | `(id, update, options?) => void` | ノードの `data` プロパティを更新 |
| `updateEdge` | `(id, update, options?) => void` | エッジのプロパティを更新 |
| `updateEdgeData` | `(id, update, options?) => void` | エッジの `data` プロパティを更新 |
| `getNodesBounds` | `(nodes) => Rect` | 指定ノード群の境界矩形を計算 |
| `getHandleConnections` | `(params) => HandleConnection[]` | 特定ハンドルの接続情報を取得 |
| `getNodeConnections` | `(params) => NodeConnection[]` | ノードの全接続を取得（フィルタ可能） |

## 交差判定メソッド

| Method | Signature | Description |
|--------|-----------|-------------|
| `getIntersectingNodes` | `(node, partially?, nodes?) => Node[]` | 対象と重なるノードを返す |
| `isNodeIntersecting` | `(node, area, partially?) => boolean` | ノードが矩形と交差するか判定 |

## ビューポートメソッド

| Method | Signature | Description |
|--------|-----------|-------------|
| `zoomIn` | `(options?) => Promise<boolean>` | 1.2 倍にズームイン |
| `zoomOut` | `(options?) => Promise<boolean>` | 1/1.2 倍にズームアウト |
| `zoomTo` | `(zoomLevel, options?) => Promise<boolean>` | 指定ズームレベルに設定 |
| `getZoom` | `() => number` | 現在のズームレベルを取得 |
| `setViewport` | `(viewport, options?) => Promise<boolean>` | ビューポートを設定 |
| `getViewport` | `() => Viewport` | 現在のビューポート状態を取得 |
| `setCenter` | `(x, y, options?) => Promise<boolean>` | 指定座標を中心に表示 |
| `fitBounds` | `(bounds, options?) => Promise<boolean>` | 指定矩形にフィット |
| `fitView` | `(options?) => Promise<boolean>` | 全ノード（または指定ノード）にフィット |
| `screenToFlowPosition` | `(clientPosition, options?) => XYPosition` | スクリーン座標をフロー座標に変換 |
| `flowToScreenPosition` | `(flowPosition) => XYPosition` | フロー座標をスクリーン座標に変換 |
| `viewportInitialized` | `boolean` | ビューポートが初期化済みかどうかを示すプロパティ |

## 使用例

```tsx
import { useReactFlow } from '@xyflow/react';

function FlowController() {
  const {
    getNodes,
    setNodes,
    fitView,
    zoomTo,
    screenToFlowPosition,
  } = useReactFlow();

  const handleFit = () => {
    fitView({ padding: 0.2, duration: 800 });
  };

  const handleAddNode = (event: React.MouseEvent) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setNodes((nodes) => [
      ...nodes,
      { id: Date.now().toString(), position, data: { label: 'New Node' } },
    ]);
  };

  return (
    <div>
      <button onClick={handleFit}>Fit View</button>
      <button onClick={() => zoomTo(1)}>Reset Zoom</button>
    </div>
  );
}
```

## 注意点

- `useReactFlow()` フックで取得するか、`<ReactFlow />` の `onInit` コールバックで受け取る
- ビューポート操作メソッドは `Promise<boolean>` を返す（アニメーション完了を await できる）
- `viewportInitialized` が `true` になるまでビューポート操作は正常に動作しない場合がある
- `updateNode` / `updateEdge` の `options.replace` を `true` にすると、マージではなく完全置換になる

## 関連

- [Viewport](./Viewport.md)
- [FitViewOptions](./FitViewOptions.md)
- [ReactFlowJsonObject](./ReactFlowJsonObject.md)
- [DeleteElements](./DeleteElements.md)
- [XYPosition](./XYPosition.md)
- [Rect](./Rect.md)
