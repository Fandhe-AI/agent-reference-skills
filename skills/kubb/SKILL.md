---
name: kubb
description: >
  Kubb (OpenAPI / Swagger コードジェネレーター) リファレンス。
  kubb.config.ts、OpenAPI から TypeScript 型・TanStack Query フック・
  Zod スキーマ・MSW モック・Faker・Axios / SWR / React Query クライアント生成。
  プラグインベース、モノレポ対応。
user-invocable: false
model: sonnet
---

# Kubb リファレンス

Kubb（kubb.dev）の全ドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/kubb/
  SKILL.md
  references/
    getting-started/
      README.md
      configure.md
      installation.md
      introduction.md
      quick-start.md
      telemetry.md
      troubleshooting.md
    plugins/
      README.md
      overview.md
      core.md
      plugin-oas.md
      plugin-ts.md
      plugin-client.md
      plugin-zod.md
      plugin-react-query.md
      plugin-vue-query.md
      plugin-solid-query.md
      plugin-svelte-query.md
      plugin-swr.md
      plugin-faker.md
      plugin-msw.md
      plugin-cypress.md
      plugin-mcp.md
      plugin-redoc.md
    helpers/
      README.md
      cli.md
      mcp.md
      unplugin.md
    examples/
      README.md
      simple.md
      typescript.md
      client.md
      fetch.md
      cypress.md
      react-query.md
      vue-query.md
      svelte-query.md
      solid-query.md
      swr.md
      zod.md
      faker.md
      msw.md
      mcp.md
      generators.md
      advanced.md
    guides/
      README.md
      migration-guide.md
      tutorial.md
  samples/
    README.md
    basic-typescript-generation.md
    react-query-hooks.md
    zod-schema-generation.md
    api-client-generation.md
    msw-mock-handlers.md
    multi-plugin-workflow.md
    multiple-specs.md
    programmatic-build.md
    filtering-and-grouping.md
  scripts/
    README.md
    cli.md
    generate.md
    install.md
    mcp.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール、初期設定、kubb.config.ts オプション | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| トラブルシューティング、テレメトリー設定 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| OpenAPI パース、TypeScript 型・API クライアント生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| Zod スキーマ・Faker モック・MSW ハンドラー生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| React Query / Vue Query / Solid Query / Svelte Query / SWR hooks 生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| Cypress テスト定義・MCP サーバー・Redoc ドキュメント生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| CLI コマンド詳細、MCP サーバー統合、Vite / webpack / Rollup / esbuild 統合 | helpers | [references/helpers/README.md](references/helpers/README.md) |
| 各プラグインの kubb.config.ts 設定例、カスタムジェネレーター | examples | [references/examples/README.md](references/examples/README.md) |
| v3→v5 マイグレーション、ステップバイステップチュートリアル | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方・ワークフローを知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・generate コマンドを実行したい | scripts | [scripts/README.md](scripts/README.md) |
