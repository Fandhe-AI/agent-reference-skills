# Styling Examples

## Base Style

React Flow の必須ベーススタイルシートを使ったミニマルなスタイリング実装。

### コード例

```tsx
import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/base.css'; // 必須インポート

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
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
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};
```

### ポイント

- `'@xyflow/react/dist/base.css'` のインポートは必須。このスタイルシートがなければフローは正常に機能しない
- `base.css` はカスタマイズの土台となる最小限のスタイルのみを提供する（デフォルトテーマなし）
- `Background`、`Controls`、`MiniMap` が基本的な UI コンポーネント
- デフォルトの `@xyflow/react/dist/style.css` ではなく `base.css` を使うと完全なカスタムスタイリングが可能

---

## Dark Mode

組み込みの `colorMode` prop を使ってライト・ダーク・システムの3つのカラーモードを切り替える。

### コード例

```tsx
const ColorModeFlow = () => {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');

  const onChange: ChangeEventHandler<HTMLSelectElement> = (evt) => {
    setColorMode(evt.target.value as ColorMode);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      colorMode={colorMode}
      fitView
    >
      <Panel position="top-right">
        <select onChange={onChange}>
          <option value="dark">dark</option>
          <option value="light">light</option>
          <option value="system">system</option>
        </select>
      </Panel>
    </ReactFlow>
  );
};
```

### ポイント

- `colorMode` prop に `'dark'`/`'light'`/`'system'` を渡すだけで切り替えできる
- `useState<ColorMode>()` で現在のカラーモードを管理する
- `'system'` オプションはユーザーの OS レベルのカラースキーム設定を自動的に反映する

---

## Tailwind

Tailwind CSS ユーティリティクラスを使って React Flow を完全にスタイリングする実装例。

### コード例

```tsx
import '@xyflow/react/dist/base.css'; // base.css を使用（デフォルトスタイル上書き）

const Flow = () => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      className="bg-teal-50"
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

// カスタムノードに Tailwind を使用
const CustomNode = () => (
  <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
    <Handle type="target" className="w-16 !bg-teal-500" position={Position.Left} />
    <div>{data.label}</div>
    <Handle type="source" className="w-16 !bg-teal-500" position={Position.Right} />
  </div>
);
```

### ポイント

- `tailwind.config.js` で `important: true` を設定して Tailwind クラスがデフォルトスタイルを上書きするようにする
- `@xyflow/react/dist/base.css` を使うことで Tailwind クラスとの競合を最小化する
- `<ReactFlow>` の `className` prop で背景色などを設定できる
- ハンドルサイズは `!` 修飾子（`!bg-teal-500`）で重要度を上げて適用する

---

## Turbo Flow

グローイングアニメーション付きグラデーションボーダーを持つノードと、グラデーションエッジで構成された視覚的に印象的なノードベース UI。turbo.build ウェブサイトのデザインを参考にした実装。

### コード例

```tsx
// TurboNode - グロー効果付きカスタムノード
// グラデーションボーダーのラッパー、タイトル・サブタイトル・アイコンを表示

// TurboEdge - グラデーションカラーのカスタムエッジ
// ベジェ曲線パスにグラデーションを適用

// グラデーション設定
// エッジ: linear-gradient #ae53ba (紫) → #2a8af6 (青)
// ノードボーダー: conic-gradient（選択時に回転アニメーション）
// ボックスシャドウ: 10px 0 15px rgba(42, 138, 246, 0.3)（グロー効果）

// ダークテーマ設定
// 背景: rgb(17, 17, 17)
// テキスト: rgb(243, 244, 246)
// ボーダー半径: 10px

// アニメーション
// 選択ノード: 4秒かけて360度回転するスピナーアニメーション
```

### ポイント

- `nodeTypes` と `edgeTypes` でカスタムコンポーネントを登録する
- SVG `<defs>` 内にマーカーを定義してエッジエンドポイントのスタイルを設定
- `<Controls>` を非インタラクティブモードで設定してシンプルに表示
- CSS カスタム変数でノードのダークテーマカラーを一元管理する
- 選択ノードへの conic-gradient アニメーション: `@keyframes` で360度回転を4秒かけて実行
