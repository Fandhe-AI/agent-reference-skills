---
name: typedoc
description: >
  TypeDoc (TypeScript API ドキュメントジェネレーター) リファレンス。
  typedoc.json、TSDoc タグ、CLI オプション、entryPoints、
  テーマ (default / markdown)、プラグイン開発、
  TSDoc / JSDoc コメントから HTML / Markdown ドキュメント生成。
user-invocable: false
model: sonnet
---

# TypeDoc リファレンス

TypeDoc (TypeScript ドキュメントジェネレーター) の全 API ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/typedoc/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      node-module-api.md
      browser-bundle.md
    guides/
      README.md
      doc-comments.md
      jsdoc-support.md
      external-documents.md
      declaration-references.md
    tags-block/
      README.md
      author.md
      category.md
      defaultValue.md
      deprecated.md
      document.md
      example.md
      expand.md
      group.md
      import.md
      inline-type.md
      license.md
      mergeModuleWith.md
      module.md
      param.md
      privateRemarks.md
      property.md
      remarks.md
      returns.md
      see.md
      since.md
      sortStrategy.md
      summary.md
      template.md
      throws.md
      typeParam.md
      typescript-tags.md
    tags-modifier/
      README.md
      abstract.md
      alpha.md
      beta.md
      class.md
      enum.md
      event.md
      eventProperty.md
      experimental.md
      function.md
      hidden.md
      hideconstructor.md
      ignore.md
      interface.md
      internal.md
      namespace.md
      overload.md
      override.md
      packageDocumentation.md
      primaryExport.md
      private.md
      protected.md
      public.md
      readonly.md
      sealed.md
      useDeclaredType.md
      virtual.md
    tags-inline/
      README.md
      include.md
      inheritDoc.md
      label.md
      link.md
    options/
      README.md
      comments.md
      configuration.md
      input.md
      organization.md
      other.md
      output.md
      validation.md
    themes/
      README.md
      built-in.md
      community-themes.md
    plugins/
      README.md
      community-plugins.md
    development/
      README.md
      overview.md
      plugin-development.md
      custom-themes.md
      internationalization.md
    api/
      README.md
      application.md
      converter.md
      events.md
      options-api.md
      reflections.md
      renderer.md
      serialization.md
      types.md
  samples/
    README.md
    basic-cli-usage.md
    typedoc-json-config.md
    programmatic-api.md
    doc-comments.md
    grouping-and-categories.md
    external-documents.md
    plugin-authoring.md
    monorepo-entry-points.md
  scripts/
    README.md
    install.md
    cli.md
    watch.md
    config.md
    output.md
    validate.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール・CLI 使用法・Node.js からプログラマティックに使う・ブラウザバンドル | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| コメント構文・JSDoc/TSDoc 互換性・外部ドキュメント・宣言参照 | guides | [references/guides/README.md](references/guides/README.md) |
| @param, @returns, @example, @category, @group 等のブロックタグ | tags-block | [references/tags-block/README.md](references/tags-block/README.md) |
| @hidden, @internal, @override, @alpha, @beta 等のモディファイアタグ | tags-modifier | [references/tags-modifier/README.md](references/tags-modifier/README.md) |
| @link, @inheritDoc, @include 等のインラインタグ | tags-inline | [references/tags-inline/README.md](references/tags-inline/README.md) |
| typedoc.json, entryPoints, out, theme 等の設定オプション | options | [references/options/README.md](references/options/README.md) |
| デフォルトテーマ・コミュニティテーマ・カスタム CSS | themes | [references/themes/README.md](references/themes/README.md) |
| コミュニティプラグイン一覧 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| カスタムテーマ開発・プラグイン開発・国際化・アーキテクチャ | development | [references/development/README.md](references/development/README.md) |
| Application, Converter, Renderer, Reflection 等のプログラマティック API | api | [references/api/README.md](references/api/README.md) |
| 典型的な使い方・設定例・ユースケースを知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・出力・バリデーション等の実行コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
