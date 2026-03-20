---
name: chakra-ui
description: >
  Chakra UI v3 API リファレンス。
  コンポーネント, レイアウト, フォーム, オーバーレイ, チャート,
  テーマ, レシピ, スタイルプロップ, レスポンシブ, ダークモード
user-invocable: false
---

# Chakra UI v3 リファレンス

Chakra UI v3 公式ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/chakra-ui/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── get-started/README.md            ← 入門・セットアップ（17ページ）
    ├── components/README.md             ← 全コンポーネント（117ページ）
    ├── charts/README.md                 ← チャート（14ページ）
    ├── styling/README.md                ← スタイリング（29ページ）
    └── theming/README.md               ← テーマ設定（29ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、フレームワーク統合、環境設定 | get-started | [references/get-started/README.md](./references/get-started/README.md) |
| コンポーネントの使い方、Props、バリアント | components | [references/components/README.md](./references/components/README.md) |
| チャートの表示、useChart、データ可視化 | charts | [references/charts/README.md](./references/charts/README.md) |
| スタイルプロップ、レスポンシブ、ダークモード、CSS 変数 | styling | [references/styling/README.md](./references/styling/README.md) |
| トークン、レシピ、カスタマイズ、デザイントークン | theming | [references/theming/README.md](./references/theming/README.md) |
