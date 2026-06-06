---
name: zod
description: >
  Zod (TypeScript-first スキーマバリデーションライブラリ) リファレンス。
  z.object / z.string / z.number / z.array / z.union / z.enum 等のスキーマ定義、
  parse, safeParse, z.infer (型推論)、refine, transform, pipe、
  default, optional, nullable、エラー処理、Zod 4 移行。
user-invocable: false
model: sonnet
---

# Zod リファレンス

Zod 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/zod/
  SKILL.md
  references/
    getting-started/
      README.md
      introduction.md
      basic-usage.md
    api/
      README.md
      primitives.md
      strings.md
      numbers.md
      enums-and-literals.md
      objects.md
      collections.md
      unions-and-intersections.md
      special-types.md
      transforms-and-refinements.md
    errors/
      README.md
      error-customization.md
      error-formatting.md
    advanced/
      README.md
      metadata.md
      json-schema.md
      codecs.md
    ecosystem/
      README.md
      ecosystem.md
      library-authors.md
    migration/
      README.md
      v4-release-notes.md
      v4-migration-guide.md
    packages/
      README.md
      zod.md
      mini.md
      core.md
  samples/
    README.md
    basic-schema.md
    safe-parse.md
    string-validation.md
    object-composition.md
    transform-and-default.md
    custom-refinement.md
    discriminated-union.md
    error-formatting.md
    error-customization.md
    recursive-schema.md
  scripts/
    README.md
    install.md
    imports.md
    parse.md
    json-schema.md
    migrate-v3-to-v4.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール・基本的な使い方を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| parse / safeParse / z.infer で型推論したい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| z.string / z.number / z.boolean 等のプリミティブ型を使いたい | api | [references/api/README.md](references/api/README.md) |
| z.object / z.array / z.record / z.tuple を使いたい | api | [references/api/README.md](references/api/README.md) |
| z.union / z.discriminatedUnion / z.intersection を使いたい | api | [references/api/README.md](references/api/README.md) |
| refine / superRefine / transform / pipe / default を使いたい | api | [references/api/README.md](references/api/README.md) |
| ZodError のメッセージをカスタマイズ・フォーマットしたい | errors | [references/errors/README.md](references/errors/README.md) |
| i18n・グローバルエラー設定を変更したい | errors | [references/errors/README.md](references/errors/README.md) |
| JSON Schema への変換・OpenAPI 連携をしたい | advanced | [references/advanced/README.md](references/advanced/README.md) |
| レジストリ・メタデータ・コーデックを使いたい | advanced | [references/advanced/README.md](references/advanced/README.md) |
| サードパーティ連携・エコシステムを知りたい | ecosystem | [references/ecosystem/README.md](references/ecosystem/README.md) |
| Zod を使うライブラリを開発したい | ecosystem | [references/ecosystem/README.md](references/ecosystem/README.md) |
| Zod 3 から Zod 4 に移行したい | migration | [references/migration/README.md](references/migration/README.md) |
| Zod 4 の新機能・破壊的変更を確認したい | migration | [references/migration/README.md](references/migration/README.md) |
| Zod / Zod Mini / Zod Core の違いを知りたい | packages | [references/packages/README.md](references/packages/README.md) |
| バンドルサイズを削減したい（tree-shaking） | packages | [references/packages/README.md](references/packages/README.md) |
| 典型的な使い方のサンプルを見たい | samples | [samples/README.md](samples/README.md) |
| インストール・import・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
