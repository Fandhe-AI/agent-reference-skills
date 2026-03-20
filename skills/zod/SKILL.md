---
name: zod
description: >
  Zod (TypeScript スキーマバリデーション) リファレンス。
  parse, safeParse, infer, refine, transform, pipe
user-invocable: false
---

# Zod リファレンス

Zod 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構造

```
.claude/skills/zod/
├── SKILL.md                                ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md           ← インストール・基本操作（2ページ）
    ├── api/README.md                       ← スキーマ定義 API（9ページ）
    ├── errors/README.md                    ← エラー処理（2ページ）
    ├── advanced/README.md                  ← メタデータ・JSON Schema・コーデック（3ページ）
    ├── ecosystem/README.md                 ← エコシステム・ライブラリ作者向け（2ページ）
    ├── migration/README.md                 ← Zod 4 リリース・移行ガイド（2ページ）
    └── packages/README.md                  ← パッケージ別 API（3ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、parse、safeParse、型推論 | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| z.string, z.object, z.array, バリデーション、変換 | api | [references/api/README.md](./references/api/README.md) |
| ZodError、エラーメッセージ、i18n、フォーマット | errors | [references/errors/README.md](./references/errors/README.md) |
| レジストリ、メタデータ、JSON Schema 変換、コーデック | advanced | [references/advanced/README.md](./references/advanced/README.md) |
| サードパーティ連携、ライブラリ開発、peer dependencies | ecosystem | [references/ecosystem/README.md](./references/ecosystem/README.md) |
| Zod 3→4 移行、破壊的変更、新機能 | migration | [references/migration/README.md](./references/migration/README.md) |
| ZodType メソッド、Zod Mini、Zod Core | packages | [references/packages/README.md](./references/packages/README.md) |
