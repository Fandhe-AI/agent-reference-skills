---
name: knip
description: >
  Knip (TypeScript / JavaScript 未使用コード検出ツール) リファレンス。
  未使用ファイル・export・依存関係・型・列挙メンバーの検出、
  auto-fix、monorepo (workspaces) 対応、
  knip.json / knip.config.ts 設定、プラグイン、ignore 設定。
user-invocable: false
model: sonnet
---

# Knip リファレンス

Knip の公式ドキュメント全コアページを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/knip/
  SKILL.md
  references/
    overview/
      README.md
      configuration.md
      features.md
      getting-started.md
      screenshots-videos.md
    explanations/
      README.md
      comparison-and-migration.md
      entry-files.md
      plugins.md
      why-use-knip.md
    features/
      README.md
      auto-fix.md
      catalogs.md
      compilers.md
      custom-elements.md
      integrated-monorepos.md
      monorepos-and-workspaces.md
      production-mode.md
      reporters.md
      rules-and-filters.md
      script-parser.md
      source-mapping.md
    guides/
      README.md
      configuring-project-files.md
      contributing.md
      handling-issues.md
      issue-reproduction.md
      namespace-imports.md
      performance.md
      troubleshooting.md
      using-knip-in-ci.md
      working-with-commonjs.md
    reference/
      README.md
      cli.md
      configuration.md
      configuration-hints.md
      dynamic-configuration.md
      faq.md
      integrations.md
      issue-types.md
      jsdoc-tsdoc-tags.md
      known-issues.md
      plugins.md
      related-tooling.md
    typescript/
      README.md
      unused-dependencies.md
      unused-exports.md
    writing-a-plugin/
      README.md
      argument-parsing.md
      inputs.md
      writing-a-plugin.md
  samples/
    README.md
    auto-fix.md
    basic-configuration.md
    ci-integration.md
    getting-started.md
    ignore-patterns.md
    jsdoc-tags.md
    monorepo-workspaces.md
    output-formats.md
    production-mode.md
    rules-and-filters.md
  scripts/
    README.md
    ci.md
    cli.md
    debug.md
    fix.md
    install.md
    lint.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール・初期設定・基本的な使い方を知りたい | overview | [references/overview/README.md](references/overview/README.md) |
| 機能一覧・ゼロ設定の仕組みを知りたい | overview | [references/overview/README.md](references/overview/README.md) |
| エントリーファイル・プラグインの仕組みを理解したい | explanations | [references/explanations/README.md](references/explanations/README.md) |
| 導入理由・他ツールとの比較・移行手順を知りたい | explanations | [references/explanations/README.md](references/explanations/README.md) |
| auto-fix・production mode・monorepo・reporters を使いたい | features | [references/features/README.md](references/features/README.md) |
| rules / filters・compilers・script parser を設定したい | features | [references/features/README.md](references/features/README.md) |
| プロジェクトファイル設定・トラブルシューティング・CI 統合 | guides | [references/guides/README.md](references/guides/README.md) |
| パフォーマンス最適化・CommonJS 対応・namespace imports | guides | [references/guides/README.md](references/guides/README.md) |
| CLI フラグ・設定オプション・issue types・JSDoc タグ | reference | [references/reference/README.md](references/reference/README.md) |
| FAQ・プラグイン一覧・統合ツール・既知の問題を調べたい | reference | [references/reference/README.md](references/reference/README.md) |
| 未使用 exports / dependencies の検出詳細を理解したい | typescript | [references/typescript/README.md](references/typescript/README.md) |
| カスタムプラグインを作成したい | writing-a-plugin | [references/writing-a-plugin/README.md](references/writing-a-plugin/README.md) |
| 典型的な使い方・実例を確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・CI 実行コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
