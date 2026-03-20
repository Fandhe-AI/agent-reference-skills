---
name: biome
description: >
  Biome (formatter/linter) API リファレンス。
  biome.json, biome check, biome lint, biome format,
  ルール設定, eslint/prettier 移行, suppressions
user-invocable: false
---

# Biome リファレンス

Biome（biomejs.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/biome/
├── SKILL.md                              ← このファイル（エントリーポイント）
└── references/
    ├── guides/README.md                  ← ガイド（8ページ）
    ├── formatter/README.md               ← フォーマッター（3ページ）
    ├── analyzer/README.md                ← アナライザー（1ページ）
    ├── linter/README.md                  ← リンター（12ページ）
    ├── assist/README.md                  ← アシスト（6ページ）
    ├── reference/README.md               ← リファレンス（8ページ）
    ├── recipes/README.md                 ← レシピ（4ページ）
    └── internals/README.md               ← 内部情報（2ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、初期設定、biome init、pnpm | guides | [references/guides/README.md](./references/guides/README.md) |
| ESLint/Prettier からの移行、biome migrate | guides | [references/guides/README.md](./references/guides/README.md) |
| モノレポ対応、extends、共有設定 | guides | [references/guides/README.md](./references/guides/README.md) |
| v2 アップグレード、破壊的変更 | guides | [references/guides/README.md](./references/guides/README.md) |
| VCS 統合、--changed、--staged | guides | [references/guides/README.md](./references/guides/README.md) |
| パフォーマンス問題、遅い、トレーシング | guides | [references/guides/README.md](./references/guides/README.md) |
| コードフォーマット、インデント、行幅 | formatter | [references/formatter/README.md](./references/formatter/README.md) |
| Prettier との違い、フォーマット差異 | formatter | [references/formatter/README.md](./references/formatter/README.md) |
| biome-ignore、抑制コメント、suppress | analyzer | [references/analyzer/README.md](./references/analyzer/README.md) |
| リンタールール、lint エラー、ルール設定 | linter | [references/linter/README.md](./references/linter/README.md) |
| ドメイン（React, Next.js, Vue）設定 | linter | [references/linter/README.md](./references/linter/README.md) |
| カスタムルール、GritQL プラグイン | linter | [references/linter/README.md](./references/linter/README.md) |
| ESLint ルールとの対応、ルール移行 | linter | [references/linter/README.md](./references/linter/README.md) |
| import ソート、キーソート、アシスト | assist | [references/assist/README.md](./references/assist/README.md) |
| organizeImports、useSortedKeys | assist | [references/assist/README.md](./references/assist/README.md) |
| CLI コマンド、biome check/lint/format/ci | reference | [references/reference/README.md](./references/reference/README.md) |
| biome.json 設定、全オプション | reference | [references/reference/README.md](./references/reference/README.md) |
| 診断、レポーター、環境変数 | reference | [references/reference/README.md](./references/reference/README.md) |
| VS Code 拡張、Zed 設定 | reference | [references/reference/README.md](./references/reference/README.md) |
| GritQL 構文、パターンマッチ | reference | [references/reference/README.md](./references/reference/README.md) |
| CI/CD、GitHub Actions、GitLab CI | recipes | [references/recipes/README.md](./references/recipes/README.md) |
| Git Hooks、husky、lefthook | recipes | [references/recipes/README.md](./references/recipes/README.md) |
| 言語サポート状況、対応言語 | internals | [references/internals/README.md](./references/internals/README.md) |
