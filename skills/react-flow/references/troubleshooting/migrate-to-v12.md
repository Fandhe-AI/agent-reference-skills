# Migrate to v12

`reactflow` パッケージから `@xyflow/react` v12 へのマイグレーションガイド。サーバーサイドレンダリング・Computing Flows・ダークモードなどの新機能が追加されたが、いくつかの Breaking Changes がある。

## 詳細説明

### インストール

```bash
npm install @xyflow/react
```

### Breaking Changes 一覧

| カテゴリ | 変更内容 |
|----------|----------|
| パッケージ名 | `reactflow` → `@xyflow/react` |
| CSS インポート | `reactflow/dist/style.css` → `@xyflow/react/dist/style.css` |
| ノード寸法 | `node.width` / `node.height` の意味が変化（measured vs defined） |
| ノード更新 | オブジェクトのイミュータブル更新が必須 |
| Edge 再接続 API | `onEdgeUpdate` 系 → `onReconnect` 系にリネーム |
| 親ノード参照 | `parentNode` → `parentId` |
| カスタムノード Props | `xPos` / `yPos` → `positionAbsoluteX` / `positionAbsoluteY` |
| Handle CSS クラス | `react-flow__handle-connecting` / `react-flow__handle-valid` が変更 |
| Store 参照 | `nodeInternals` → `nodeLookup` |
| ユーティリティ関数 | `getNodesBounds` シグネチャ変更、複数関数が削除 |
| TypeScript | ノード型定義のパターン変更 |

### 1. パッケージ名とインポートの変更

**Before:**
```js
import ReactFlow from 'reactflow';
```

**After:**
```js
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
// または基本スタイルのみ
import '@xyflow/react/dist/base.css';
```

### 2. ノード寸法の扱い変更

v12 では寸法が「ライブラリが計測した値」と「ユーザーが定義した値」に分離された。

- **計測値**（ライブラリがセット）: `node.measured.width` / `node.measured.height`
- **定義値**（ユーザーがセット）: `node.width` / `node.height`（インラインスタイルとして適用）

Dagre / ELK などのレイアウトライブラリを使用している場合は `node.measured?.width` / `node.measured?.height` を参照するよう変更する。

**Before:**
```js
const nodeWidth = node.width;
const nodeHeight = node.height;
```

**After:**
```js
const nodeWidth = node.measured?.width;
const nodeHeight = node.measured?.height;
```

ノード定義での寸法指定:

**Before:**
```js
const nodes = [{
  id: '1',
  type: 'input',
  data: { label: 'input node' },
  position: { x: 250, y: 5 },
  style: { width: 180, height: 40 },
}];
```

**After:**
```js
const nodes = [{
  id: '1',
  type: 'input',
  data: { label: 'input node' },
  position: { x: 250, y: 5 },
  width: 180,
  height: 40,
}];
```

### 3. ノード・エッジのイミュータブル更新

ノード・エッジの更新は必ず新しいオブジェクトを生成すること。

**Before:**
```js
setNodes((currentNodes) =>
  currentNodes.map((node) => {
    node.hidden = true; // 直接変更は NG
    return node;
  })
);
```

**After:**
```js
setNodes((currentNodes) =>
  currentNodes.map((node) => ({
    ...node,
    hidden: true,
  }))
);
```

### 4. Edge 再接続 API のリネーム

| 旧 API | 新 API |
|--------|--------|
| `onEdgeUpdate` | `onReconnect` |
| `onEdgeUpdateStart` | `onReconnectStart` |
| `onEdgeUpdateEnd` | `onReconnectEnd` |
| `updateEdge` | `reconnectEdge` |
| `edgeUpdaterRadius` | `reconnectRadius` |
| `edge.updatable` | `edge.reconnectable` |
| `edgesUpdatable` | `edgesReconnectable` |

**Before:**
```tsx
<ReactFlow
  onEdgeUpdate={onEdgeUpdate}
  onEdgeUpdateStart={onEdgeUpdateStart}
  onEdgeUpdateEnd={onEdgeUpdateEnd}
/>
```

**After:**
```tsx
<ReactFlow
  onReconnect={onReconnect}
  onReconnectStart={onReconnectStart}
  onReconnectEnd={onReconnectEnd}
/>
```

### 5. `parentNode` → `parentId`

**Before:**
```js
const nodes = [{
  id: 'xyz-id',
  position: { x: 0, y: 0 },
  type: 'default',
  data: {},
  parentNode: 'abc-id',
}];
```

**After:**
```js
const nodes = [{
  id: 'xyz-id',
  position: { x: 0, y: 0 },
  type: 'default',
  data: {},
  parentId: 'abc-id',
}];
```

### 6. カスタムノードの位置 Props

**Before:**
```tsx
function CustomNode({ xPos, yPos }: NodeProps) {
  // ...
}
```

**After:**
```tsx
function CustomNode({ positionAbsoluteX, positionAbsoluteY }: NodeProps) {
  // ...
}
```

### 7. Handle CSS クラスの変更

| 旧クラス | 新クラス |
|----------|----------|
| `react-flow__handle-connecting` | `connectingto` / `connectingfrom` |
| `react-flow__handle-valid` | `valid` |

### 8. `getNodesBounds` のシグネチャ変更

**Before:**
```js
const bounds = getNodesBounds(nodes, nodeOrigin);
```

**After:**
```js
const bounds = getNodesBounds(nodes, { nodeOrigin });
```

### 9. Store の `nodeInternals` → `nodeLookup`

**Before:**
```js
const node = useStore((s) => s.nodeInternals.get(id));
```

**After:**
```js
const node = useStore((s) => s.nodeLookup.get(id));
```

### 10. 削除された非推奨関数

| 削除された関数 | 代替 |
|----------------|------|
| `getTransformForBounds` | `getViewportForBounds` |
| `getRectOfNodes` | `getNodesBounds` |
| `project` | `screenToFlowPosition` |
| `getMarkerEndId` | （削除、代替なし） |
| `updateEdge` | `reconnectEdge` |

### 11. TypeScript: ノード型定義

**After（推奨パターン）:**
```tsx
import { Node, OnNodesChange, applyNodeChanges } from '@xyflow/react';
import { useState, useCallback } from 'react';

type NumberNode = Node<{ value: number }, 'number'>;
type TextNode = Node<{ text: string }, 'text'>;
type AppNode = NumberNode | TextNode;

const nodes: AppNode[] = [
  { id: '1', type: 'number', data: { value: 1 }, position: { x: 100, y: 100 } },
  { id: '2', type: 'text', data: { text: 'Hello' }, position: { x: 200, y: 200 } },
];

const onNodesChange: OnNodesChange<AppNode> = useCallback(
  (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  [],
);
```

## コード例

### 完全な移行例（パッケージ名 + CSS）

```tsx
// Before
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

// After
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
```

### ダークモードの設定（v12 新機能）

```tsx
<ReactFlow colorMode="dark" />
// または "light" | "system"
```

## 注意点

- `node.width` / `node.height` の意味が変わった。レイアウト計算には `node.measured?.width` / `node.measured?.height` を使用すること
- ノード・エッジの更新は常にイミュータブルに行う（直接プロパティを変更しない）
- `parentNode` → `parentId` のリネームはサブフロー機能を使っている場合に必須
- カスタムな `applyChanges` 実装では "reset" イベントが "replace" に変更された
- `react-flow__handle-connecting` / `react-flow__handle-valid` の CSS クラスを使用していた場合は更新が必要

## 関連

- [./common-errors.md](./common-errors.md)
- [./migrate-to-v11.md](./migrate-to-v11.md)
- [./migrate-to-v10.md](./migrate-to-v10.md)
