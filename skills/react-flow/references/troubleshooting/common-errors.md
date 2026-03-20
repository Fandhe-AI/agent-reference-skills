# Common Errors

React Flow で頻出するエラーと警告のリファレンス。エラーメッセージ・原因・解決方法をまとめる。

## 詳細説明

### 1. Zustand Provider Warning

**エラーメッセージ:** `Warning: Seems like you have not used zustand provider as an ancestor.`

**原因:**
- `@reactflow/core` が重複インストールされている
- `useReactFlow()` などのフックを `<ReactFlow>` の外側で呼び出している

**解決方法:** `<ReactFlowProvider>` でラップする。

### 2. NodeTypes / EdgeTypes Recreation Warning

**警告メッセージ:** `It looks like you have created a new nodeTypes or edgeTypes object.`

**原因:** `nodeTypes` / `edgeTypes` オブジェクトをコンポーネント内で毎レンダー生成している。

**解決方法:** コンポーネント外で定義するか `useMemo()` を使う。

### 3. Node Type Not Found

**エラーメッセージ:** `Node type not found. Using fallback type 'default'.`

**原因:** ノードの `type` 文字列と `nodeTypes` のキーが一致していない（大文字・小文字を含む完全一致が必要）。

### 4. Container Width / Height

**エラーメッセージ:** `React Flow parent container needs width and height.`

**解決方法:** 親 `div` に `height` を設定する。

### 5. Parent Extent Warning

**エラーメッセージ:** `Only child nodes can use a parent extent.`

**解決方法:** ノードに `parentNode` プロパティを追加する。

### 6. Edge の Source / Target が Missing

エッジに `source` / `target` が設定されていない場合、エッジは描画されない。

### 7. Handle Not Found

`updateNodeInternals()` をプログラム的にハンドルを変更した後に呼び出す必要がある。

### 8. Webpack 4 との互換性

babel-loader と特定のプリセット・プラグインをインストールしてトランスパイルを設定する。

### 9. Canvas Element のマウスイベント座標

`getZoom()` で取得した値を使い、座標を `1 / zoom` でスケールする。

### 10. エッジが表示されない

- `import '@xyflow/react/dist/style.css'` が抜けていないか確認
- CSS で `overflow: hidden` が競合していないか確認
- `display: none` ではなく `opacity: 0` / `visibility: hidden` を使う

### 11. エッジの位置がずれる

カスタムエッジコンポーネントで `sourceX`, `sourceY`, `targetX`, `targetY` をパス関数に渡し、`sourcePosition` / `targetPosition` を含める。

## コード例

### Zustand Provider Warning の修正

```tsx
// NG: ReactFlow の外側でフックを使用
import { ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function FlowWithoutProvider(props) {
  const reactFlowInstance = useReactFlow(); // ここでは使えない
  return <ReactFlow {...props} />;
}

// OK: ReactFlowProvider でラップ
import { ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function Flow(props) {
  const reactFlowInstance = useReactFlow();
  return <ReactFlow {...props} />;
}

function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
export default FlowWithProvider;
```

### NodeTypes のメモ化

```tsx
// NG: 毎レンダーで新しいオブジェクトを生成
import { ReactFlow } from '@xyflow/react';
import MyCustomNode from './MyCustomNode';

function Flow(props) {
  const nodeTypes = { myCustomNode: MyCustomNode }; // 毎回再生成される
  return <ReactFlow nodeTypes={nodeTypes} />;
}

// OK: コンポーネント外で定義
import { ReactFlow } from '@xyflow/react';
import MyCustomNode from './MyCustomNode';

const nodeTypes = { myCustomNode: MyCustomNode };

function Flow(props) {
  return <ReactFlow nodeTypes={nodeTypes} />;
}

// OK: useMemo を使用
import { useMemo } from 'react';
import { ReactFlow } from '@xyflow/react';
import MyCustomNode from './MyCustomNode';

function Flow(props) {
  const nodeTypes = useMemo(
    () => ({ myCustomNode: MyCustomNode }),
    [],
  );
  return <ReactFlow nodeTypes={nodeTypes} />;
}
```

### Node Type の大文字・小文字一致

```tsx
// NG: キーが "Custom"、type が "custom" で不一致
const nodes = [{ id: 'node1', type: 'custom' }];
const nodeTypes = { Custom: MyCustomNode };

// OK: 完全一致
const nodes = [{ id: 'node1', type: 'custom' }];
const nodeTypes = { custom: MyCustomNode };

function Flow(props) {
  return <ReactFlow nodes={nodes} nodeTypes={nodeTypes} />;
}
```

### コンテナに height を設定

```tsx
// NG: 親に height なし
function Flow(props) {
  return (
    <div>
      <ReactFlow {...props} />
    </div>
  );
}

// OK: height を指定
function Flow(props) {
  return (
    <div style={{ height: 800 }}>
      <ReactFlow {...props} />
    </div>
  );
}
```

### Parent Extent の修正

```tsx
// NG: parentNode なし
const nodes = [
  { id: 'node1', extent: 'parent' },
];

// OK: parentNode を指定
const nodes = [
  { id: 'node1', parentNode: 'parent1', extent: 'parent' },
];
```

### エッジの必須プロパティ

```tsx
// NG
const edges = [{ nosource: '1', notarget: '2' }];

// OK
const edges = [{ source: '1', target: '2' }];
```

## 注意点

- `useReactFlow()` などのフックは必ず `<ReactFlow>` または `<ReactFlowProvider>` の子コンポーネント内で使用する
- `nodeTypes` / `edgeTypes` の変更は再レンダーやバグを引き起こすため、必ず安定した参照を渡す
- ノードの `type` 文字列と `nodeTypes` オブジェクトのキーは大文字・小文字を含め完全一致が必要
- `display: none` でノードを非表示にするとエッジの位置計算が崩れる。`opacity: 0` や `visibility: hidden` を使う
- プログラム的にハンドルを追加・削除した後は `updateNodeInternals()` を呼び出す

## 関連

- [./migrate-to-v12.md](./migrate-to-v12.md)
- [./migrate-to-v11.md](./migrate-to-v11.md)
- [./migrate-to-v10.md](./migrate-to-v10.md)
- [./remove-attribution.md](./remove-attribution.md)
