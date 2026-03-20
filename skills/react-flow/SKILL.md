---
name: react-flow
description: >
  React Flow API リファレンス。
  reactflow, ノード, エッジ, ハンドル, ビューポート,
  カスタムノード, レイアウト, dagre, elkjs
user-invocable: false
---

# React Flow リファレンス

React Flow ライブラリの全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/react-flow/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── learn/README.md                   ← 学習ガイド（25ページ）
    ├── troubleshooting/README.md         ← トラブルシューティング（5ページ）
    ├── components/README.md              ← コンポーネント（16ページ）
    ├── hooks/README.md                   ← フック（19ページ）
    ├── types/README.md                   ← 型定義（64ページ）
    ├── utils/README.md                   ← ユーティリティ（15ページ）
    └── examples/README.md               ← 実装例（8ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| 基本概念、用語、フロー構築、インタラクション、カスタマイズ | learn | [references/learn/README.md](./references/learn/README.md) |
| エラー対応、マイグレーション、アトリビューション | troubleshooting | [references/troubleshooting/README.md](./references/troubleshooting/README.md) |
| ReactFlow, Background, Controls, Handle, MiniMap 等 | components | [references/components/README.md](./references/components/README.md) |
| useReactFlow, useNodes, useEdges, useStore 等 | hooks | [references/hooks/README.md](./references/hooks/README.md) |
| Node, Edge, Connection, Viewport 等の型定義 | types | [references/types/README.md](./references/types/README.md) |
| addEdge, getBezierPath, applyNodeChanges 等 | utils | [references/utils/README.md](./references/utils/README.md) |
| ノード/エッジ/インタラクション/レイアウト等の実装例 | examples | [references/examples/README.md](./references/examples/README.md) |
