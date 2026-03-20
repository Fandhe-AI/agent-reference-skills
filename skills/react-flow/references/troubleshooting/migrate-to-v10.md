# Migrate to v10

`react-flow-renderer` v9 から v10 へのマイグレーションガイド。`elements` 配列の廃止・状態管理の Zustand 移行・各種 API リネームが主な変更点。

## 詳細説明

### v10 の主な新機能

- **Sub Flows**: 親ノードの下に子ノードを配置できるネストフロー
- **Group ノードタイプ**: ハンドルなしのグループ用ノードタイプ
- **タッチデバイス対応**: タッチ操作でのノード接続
- **新フック**: `useReactFlow`, `useNodes`, `useEdges`, `useViewport`, `useKeyPress`
- **エッジマーカー**: `markerStart` / `markerEnd` を個別に設定可能

### Breaking Changes 一覧

| カテゴリ | 変更内容 |
|----------|----------|
| データ構造 | `elements` → `nodes` + `edges` に分離 |
| コールバック | `onElementsRemove` → `onNodesChange` / `onEdgesChange` に変更 |
| 状態管理 | `useStoreState` / `useStoreActions` → `useStore` / `useStoreApi` |
| 初期化コールバック | `onLoad` → `onInit` |
| パン設定 | `paneMoveable` → `panOnDrag` |
| フック | `useZoomPanHelper` → `useReactFlow` |
| プロパティ名 | `isHidden` → `hidden`, `arrowHeadType` → `markerEnd` / `markerStart` |
| 型名 | `ArrowHeadType` → `MarkerType` |
| イベント | `onElementsClick` → `onNodeClick` + `onEdgeClick` |

### 1. `elements` → `nodes` + `edges` の分離

v10 の最大の変更。`elements` 配列が廃止され、ノードとエッジを別々に管理する。

**Before:**
```jsx
import { useState, useCallback } from 'react';
import { ReactFlow, removeElements, addEdge } from 'react-flow-renderer';

const initialElements = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
  { id: 'e1-2', source: '1', target: '2' },
];

const BasicFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    [],
  );
  const onConnect = useCallback(
    (connection) => setElements((es) => addEdge(connection, es)),
    [],
  );

  return (
    <ReactFlow
      elements={elements}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
    />
  );
};
```

**After（Controlled モード）:**
```tsx
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'react-flow-renderer';

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const BasicFlow = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    [],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  );
};
```

**ヘルパーフックを使う場合:**
```tsx
import { useNodesState, useEdgesState } from 'react-flow-renderer';

const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
```

**After（Uncontrolled モード）:**
```tsx
import ReactFlow from 'react-flow-renderer';

const defaultNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
];
const defaultEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const BasicFlow = () => {
  return <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} />;
};
```

### 2. `nodeTypes` / `edgeTypes` のメモ化

**NG:**
```jsx
<ReactFlow
  nodes={[]}
  nodeTypes={{ specialType: SpecialNode }} // 毎レンダーで新しいオブジェクトが生成される
/>
```

**OK（useMemo）:**
```tsx
function Flow() {
  const nodeTypes = useMemo(() => ({ specialType: SpecialNode }), []);
  return <ReactFlow nodes={[]} nodeTypes={nodeTypes} />;
}
```

**OK（コンポーネント外）:**
```tsx
const nodeTypes = { specialType: SpecialNode };

function Flow() {
  return <ReactFlow nodes={[]} nodeTypes={nodeTypes} />;
}
```

### 3. 状態管理: Redux → Zustand

**Before:**
```jsx
import { useStoreState, useStoreActions } from 'react-flow-renderer';

const transform = useStoreState((store) => store.transform);
```

**After:**
```tsx
import { useStore } from 'react-flow-renderer';

const transform = useStore((store) => store.transform);
```

**再レンダーなしでストアにアクセスする場合:**
```tsx
import { useStoreApi } from 'react-flow-renderer';

const store = useStoreApi();
const [x, y, zoom] = store.getState().transform;
```

### 4. `onLoad` → `onInit`

**Before:**
```tsx
const onLoad = (reactFlowInstance: OnLoadParams) => reactFlowInstance.zoomTo(2);
<ReactFlow onLoad={onLoad} />
```

**After:**
```tsx
const onInit = (reactFlowInstance: ReactFlowInstance) => reactFlowInstance.zoomTo(2);
<ReactFlow onInit={onInit} />
```

### 5. `paneMoveable` → `panOnDrag`

**Before:**
```jsx
<ReactFlow paneMoveable={false} />
```

**After:**
```tsx
<ReactFlow panOnDrag={false} />
```

### 6. `useZoomPanHelper` → `useReactFlow`

**Before:**
```js
const { transform, setCenter, setZoom } = useZoomPanHelper();
transform({ x: 100, y: 100, zoom: 2 });
```

**After:**
```tsx
const { setViewport, setCenter, setZoom } = useReactFlow();
setViewport({ x: 100, y: 100, zoom: 2 });
```

v10 で追加された関数: `getZoom`, `getViewport`

### 7. `isHidden` → `hidden`

**Before:**
```js
const hiddenNode = { id: '1', isHidden: true, position: { x: 50, y: 50 } };
```

**After:**
```js
const hiddenNode = { id: '1', hidden: true, position: { x: 50, y: 50 } };
```

その他リネームされたプロパティ: `animated`, `selected`, `draggable`, `selectable`, `connectable`

### 8. `arrowHeadType` → `markerStart` / `markerEnd`

**Before:**
```js
const markerEdge = { source: '1', target: '2', arrowHeadType: 'arrow' };
```

**After:**
```js
const markerEdge = {
  source: '1',
  target: '2',
  markerStart: 'myCustomSvgMarker',
  markerEnd: { type: 'arrow', color: '#f00' },
};
```

### 9. `ArrowHeadType` → `MarkerType`

型名のリネーム。

**Before:**
```tsx
import { ArrowHeadType } from 'react-flow-renderer';
```

**After:**
```tsx
import { MarkerType } from 'react-flow-renderer';
```

### 10. イベントのリネーム

| 旧 | 新 |
|----|-----|
| `onElementsClick` | `onNodeClick` / `onEdgeClick` |
| `onElementsRemove` | `onNodesChange` / `onEdgesChange` のハンドラ |

## コード例

上記「詳細説明」の各セクションにコード例を掲載。

## 注意点

- `elements` 配列は完全に廃止された。`nodes` と `edges` に分離が必須
- `nodeTypes` / `edgeTypes` は必ずメモ化すること（パフォーマンス問題とバグの原因になる）
- `ReactFlowProvider` ラッパーは引き続き必要
- v10 からアトリビューション（"React Flow" 表示）がデフォルトで表示される。`attributionPosition` で位置変更可能、商用利用の場合は Pro サブスクリプションで削除可能
- Uncontrolled モードを使うと状態ハンドラなしでシンプルに実装できる

## 関連

- [./migrate-to-v11.md](./migrate-to-v11.md)
- [./migrate-to-v12.md](./migrate-to-v12.md)
- [./common-errors.md](./common-errors.md)
- [./remove-attribution.md](./remove-attribution.md)
