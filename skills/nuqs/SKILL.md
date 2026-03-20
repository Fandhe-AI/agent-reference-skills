---
name: nuqs
description: >
  nuqs (URL search params state manager) リファレンス。
  useQueryState, useQueryStates, parsers
user-invocable: false
---

# nuqs API リファレンス

nuqs — Type-safe URL query state management for React。
`React.useState` のドロップイン置換として URL クエリパラメータと状態を同期する。

## ディレクトリ構造

```
.claude/skills/nuqs/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── hooks/README.md                   ← hooks 索引（2ページ）
    ├── parsers/README.md                 ← parsers 索引（2ページ）
    ├── options/README.md                 ← options 索引（1ページ）
    └── server/README.md                  ← server 索引（1ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| useQueryState、useQueryStates、基本的な使い方、バッチ更新、urlKeys | hooks | [references/hooks/README.md](./references/hooks/README.md) |
| パーサー、型変換、parseAs*、createParser、カスタムパーサー | parsers | [references/parsers/README.md](./references/parsers/README.md) |
| history, shallow, scroll, throttle, debounce, clearOnDefault, startTransition | options | [references/options/README.md](./references/options/README.md) |
| createLoader, createSearchParamsCache, サーバーサイド | server | [references/server/README.md](./references/server/README.md) |
