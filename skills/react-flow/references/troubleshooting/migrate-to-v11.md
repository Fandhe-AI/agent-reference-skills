# Migrate to v11

`react-flow-renderer` から `reactflow`（`@xyflow/react`）v11 へのマイグレーションガイド。新しいパッケージ名・モジュラーアーキテクチャへの移行が主な変更点。Breaking Changes は意図的に最小限に抑えられている。

## 詳細説明

### 要件

- **React 17 以降が必須**

### Breaking Changes 一覧

| カテゴリ | 変更内容 |
|----------|----------|
| パッケージ名 | `react-flow-renderer` → `reactflow` |
| CSS インポート | 必須化（CSS インジェクション廃止） |
| Viewport Props | `defaultPosition` + `defaultZoom` → `defaultViewport` に統合 |
| Edge パスヘルパー | `getBezierEdgeCenter` 等を削除、パス関数がラベル座標を返すように |
| 接続イベント | `onConnectStop` → `onConnectEnd` にリネーム |
| パン動作 | `nodesDraggable={false}` 時のパン挙動が変更 |

### 1. パッケージ名の変更

**Before:**
```bash
npm install react-flow-renderer
```

**After:**
```bash
npm install reactflow
# または最新版
npm install @xyflow/react
```

**Before:**
```js
import ReactFlow from 'react-flow-renderer';
```

**After:**
```js
import { ReactFlow } from '@xyflow/react';
```

### 2. CSS インポートが必須

v11 では CSS インジェクションが廃止された。スタイルを明示的にインポートしないとライブラリが正常に動作しない。

```js
// デフォルトスタイル（推奨）
import '@xyflow/react/dist/style.css';

// または基本スタイルのみ
import '@xyflow/react/dist/base.css';
```

`/nocss` エントリーポイントは廃止された。

### 3. Viewport Props の統合

`defaultPosition` と `defaultZoom` は廃止され、`defaultViewport` に統合された。

**Before:**
```jsx
<ReactFlow defaultPosition={[10, 15]} defaultZoom={5} />
```

**After:**
```tsx
import { ReactFlow, Viewport } from '@xyflow/react';

const defaultViewport: Viewport = { x: 10, y: 15, zoom: 5 };

<ReactFlow defaultViewport={defaultViewport} />
```

### 4. Edge パスヘルパー関数の変更

エッジのセンター座標を計算する関数が削除され、パス関数自体がラベル位置を返すように変更された。

**削除された関数:**
- `getBezierEdgeCenter`
- `getSimpleBezierEdgeCenter`
- `getEdgeCenter`

**Before:**
```jsx
import { getBezierEdgeCenter, getBezierPath } from 'react-flow-renderer';

const path = getBezierPath(edgeParams);
const [centerX, centerY] = getBezierEdgeCenter(params);
```

**After:**
```tsx
import { getBezierPath } from '@xyflow/react';

const [path, labelX, labelY] = getBezierPath(edgeParams);
```

同様に `getStraightPath` / `getSmoothStepPath` も `[path, labelX, labelY]` を返す。

### 5. 接続イベントハンドラのリネーム

**Before:**
```jsx
<ReactFlow
  onConnectStop={onConnectStop}
  onClickConnectStop={onConnectStop}
/>
```

**After:**
```tsx
<ReactFlow
  onConnectEnd={onConnectEnd}
  onClickConnectEnd={onConnectEnd}
/>
```

### 6. `nodesDraggable={false}` 時のパン動作変更

v11 では `nodesDraggable={false}` のときにノード上でもパンできるようになった。v10 以前の動作に戻す場合は、カスタムノードのラッパーに `nopan` クラスを追加する。

## コード例

### 完全な移行例

```tsx
// Before
import ReactFlow from 'react-flow-renderer';

function App() {
  return (
    <ReactFlow
      elements={elements}
      defaultPosition={[10, 15]}
      defaultZoom={5}
      onConnectStop={handleConnectStop}
    />
  );
}

// After
import { ReactFlow, Viewport } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const defaultViewport: Viewport = { x: 10, y: 15, zoom: 5 };

function App() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      defaultViewport={defaultViewport}
      onConnectEnd={handleConnectEnd}
    />
  );
}
```

### カスタムエッジでのラベル位置

```tsx
import { getBezierPath, EdgeProps } from '@xyflow/react';

function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path d={edgePath} />
      <text x={labelX} y={labelY}>Label</text>
    </>
  );
}
```

## 注意点

- React 17 未満では v11 は動作しない
- CSS インポートを忘れるとレイアウトが完全に崩れる
- `getBezierEdgeCenter` 等の関数は完全に削除された（代替: パス関数の戻り値を使用）
- `/nocss` エントリーポイントは廃止されたため、カスタムスタイルを使いたい場合は `base.css` をインポートして上書きする

## v11 新機能（参考）

- キーボードナビゲーションと ARIA 属性によるアクセシビリティ強化
- `useOnViewportChange` / `useOnSelectionChange` フック
- `useNodesInitialized` フック
- `interactionWidth` エッジオプション（選択しやすさの改善）
- `nodeOrigin` prop
- `BackgroundVariant.Cross` パターン
- smoothstep / step エッジのルーティング改善
- 中ボタンでのパン操作サポート

## 関連

- [./migrate-to-v12.md](./migrate-to-v12.md)
- [./migrate-to-v10.md](./migrate-to-v10.md)
- [./common-errors.md](./common-errors.md)
