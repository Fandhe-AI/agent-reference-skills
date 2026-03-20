---
name: vitest
description: >
  Vitest テストフレームワーク API リファレンス。
  test, describe, expect, vi.fn, vi.mock, vi.spyOn,
  coverage, snapshot, vitest.config.ts
user-invocable: false
---

# Vitest API リファレンス

Vitest — Vite ネイティブのテストフレームワーク。
テスト作成・レビュー・リファクタリング時に参照する。

## ディレクトリ構造

```
.claude/skills/vitest/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── api/README.md                     ← API リファレンス索引（3ページ）
    ├── guide/README.md                   ← ガイド索引（7ページ）
    └── patterns/README.md                ← パターン索引（2ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| describe, it/test, hooks, modifiers, expect, マッチャー, vi ユーティリティ | api | [references/api/README.md](./references/api/README.md) |
| vitest.config.ts, CLI, スナップショット, カバレッジ, 環境, 型テスト, ワークスペース | guide | [references/guide/README.md](./references/guide/README.md) |
| モックパターン, 非同期テスト, フェイクタイマー | patterns | [references/patterns/README.md](./references/patterns/README.md) |
