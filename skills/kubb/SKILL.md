---
name: kubb
description: >
  Kubb (OpenAPI / Swagger コードジェネレーター) リファレンス。
  kubb.config.ts、TypeScript 型・TanStack Query フック・Zod・Faker・MSW モック生成プラグイン、
  Fetch / Axios / SWR / React Query クライアント、plugin-client (自前クライアント)。
  CLI 8 コマンド、拡張レジストリ (kubb add)、Kubb Studio、Kit (kubb/kit)、
  parser-ts / parser-md、adapter-oas、diagnostics、プラグインベース、モノレポ対応。
  TanStack Query 本体の API は tanstack-query スキル。
user-invocable: false
---

# Kubb リファレンス

Kubb（kubb.dev）の `/docs/5.x` と `/extensions/kubb-labs/*` のドキュメントを網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

対象 Kubb v5 stable — kubb / @kubb/core / adapter-oas / parser-ts / parser-md / plugin-barrel / unplugin-kubb / @kubb/mcp 5.11.0（kubb-labs/kubb タグ `kubb@5.11.0`）。プラグインは kubb-labs/plugins からパッケージ単位で pin（plugin-ts 5.0.14、client 5.5.15、fetch 5.6.5、axios 5.6.5、zod 5.4.12、faker 5.1.9、msw 5.1.3、react-query 5.5.3、vue-query 5.5.3、swr 5.4.3、mcp 5.2.3、cypress 5.0.14、redoc 5.0.12）。取得日 2026-10-16。plugin-solid-query / plugin-svelte-query / plugin-oas は v4 系（4.39.3）のままで v5 リリースなし。

## ディレクトリ構成

```text
skills/kubb/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      introduction.md
      quick-start.md
      telemetry.md
      troubleshooting.md
    plugins/
      README.md
      overview.md
      core.md
      plugin-axios.md
      plugin-barrel.md
      plugin-client.md
      plugin-cypress.md
      plugin-faker.md
      plugin-fetch.md
      plugin-mcp.md
      plugin-msw.md
      plugin-react-query.md
      plugin-redoc.md
      plugin-swr.md
      plugin-ts.md
      plugin-vue-query.md
      plugin-zod.md
    plugin-guides/            # 27 ページ（プラグイン別 how-to）
      README.md
      fetch-*.md              # authentication / base-url / calling-operations / error-handling / interceptors / serialization / server-sent-events / transport
      axios-*.md              # 同上 8 ページ
      client-*.md             # authentication / calling-operations / validate-requests-and-responses / write-your-client
      react-query-calling-operations.md
      vue-query-calling-operations.md
      swr-calling-operations.md
      msw-mock-api.md
      mcp-server.md
      ts-customization.md
      zod-customization.md
    adapters/
      README.md
      adapter-oas.md
    parsers/
      README.md
      parser-md.md
      parser-ts.md
    kit/                      # 13 ページ（kubb/kit API 概念別）
      README.md
      adapters.md
      ast.md
      engine.md
      extension-docs.md
      extensions.md
      generators.md
      hooks.md
      manifest.md
      parsers.md
      plugins.md
      resolvers.md
      storage.md
      testing.md
    commands/                 # CLI 8 コマンド
      README.md
      init.md
      generate.md
      validate.md
      mcp.md
      studio.md
      add.md
      update.md
      list.md
    integrations/
      README.md
      overview.md
      studio.md
      ci.md
      github-actions.md
      gitlab.md
    reference/
      README.md
      configuration.md
      plugin-options.md
      diagnostics.md
      kit-api.md
      jsx.md
      serialization.md
      registry.md
      github-actions.md
    helpers/
      README.md
      cli.md
      mcp.md
      unplugin.md
    ai/
      README.md
      claude.md
      claude-desktop.md
      context7.md
      llmstxt.md
      mcp.md
    examples/
      README.md
      simple.md
      typescript.md
      client.md
      axios.md
      fetch.md
      sdk.md
      cypress.md
      react-query.md
      vue-query.md
      svelte-query.md    # v4 専用（v5 で削除）
      solid-query.md     # v4 専用（v5 で削除）
      swr.md
      zod.md
      faker.md
      msw.md
      mcp.md
      generators.md
      advanced.md
    guides/
      README.md
      architecture.md
      ast.md
      barrel-files.md
      concepts-plugins.md
      creating-plugins.md
      generators.md
      macros.md
      migration-guide.md
      printers.md
      publish-a-plugin.md
      recipes.md
      renderers.md
      resolver-customization.md
      resolvers.md
      submit-to-the-registry.md
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
| インストール、初期設定、クイックスタート | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| トラブルシューティング、テレメトリー設定 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| kubb.config.ts のトップレベルオプション・デフォルト値 | reference | [references/reference/README.md](references/reference/README.md)（configuration） |
| 複数プラグイン共通のオプション | reference | [references/reference/README.md](references/reference/README.md)（plugin-options） |
| TypeScript 型・API クライアント（plugin-client 自前クライアント / Fetch / Axios）生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| Zod スキーマ・Faker モック・MSW ハンドラー生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| React Query / Vue Query / SWR hooks 生成（Solid Query / Svelte Query は v5 で削除） | plugins | [references/plugins/README.md](references/plugins/README.md) |
| barrel（index.ts）出力、Cypress テスト定義・MCP サーバー・Redoc ドキュメント生成 | plugins | [references/plugins/README.md](references/plugins/README.md) |
| プラグイン別 how-to（認証・baseURL・interceptors・SSE・transport・エラー処理・シリアライズ・バリデーション） | plugin-guides | [references/plugin-guides/README.md](references/plugin-guides/README.md) |
| OpenAPI 仕様のパース・アダプター（@kubb/adapter-oas） | adapters | [references/adapters/README.md](references/adapters/README.md) |
| Kubb の AST から TypeScript / Markdown ソースへの変換（parser-ts / parser-md） | parsers | [references/parsers/README.md](references/parsers/README.md) |
| Kit API（`kubb/kit`）の概念別リファレンス（plugins / generators / resolvers / hooks / storage / testing） | kit | [references/kit/README.md](references/kit/README.md) |
| ビルド失敗時の診断メッセージ、JSX・シリアライズ仕様 | reference | [references/reference/README.md](references/reference/README.md) |
| CLI 各コマンド（init / generate / validate / mcp / studio / add / update / list） | commands | [references/commands/README.md](references/commands/README.md) |
| Kubb Studio、CI スナップショット、GitHub Actions / GitLab 連携 | integrations | [references/integrations/README.md](references/integrations/README.md) |
| 拡張レジストリ（`kubb add`）の利用・拡張の登録申請 | reference / guides | [references/reference/README.md](references/reference/README.md)（registry）、[references/guides/README.md](references/guides/README.md)（submit-to-the-registry） |
| CLI ヘルパー概要、MCP サーバー統合、Vite / webpack / Rollup / esbuild / Rolldown / Rspack / Farm / Nuxt / Astro 統合 | helpers | [references/helpers/README.md](references/helpers/README.md) |
| Claude Code / Claude Desktop 連携、Context7、llms.txt、AI アシスタントからの MCP サーバー利用 | ai | [references/ai/README.md](references/ai/README.md) |
| 各プラグインの kubb.config.ts 設定例、カスタムジェネレーター | examples | [references/examples/README.md](references/examples/README.md) |
| アーキテクチャ、AST・Resolver・Renderer・Printer 概念の理解 | guides | [references/guides/README.md](references/guides/README.md) |
| カスタムプラグインの作成・公開、Macro・Resolver のカスタマイズ、barrel files、レシピ | guides | [references/guides/README.md](references/guides/README.md) |
| v4→v5 マイグレーション、ステップバイステップチュートリアル | guides | [references/guides/README.md](references/guides/README.md) |
| 典型的な使い方・ワークフローを知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンド・generate コマンドを実行したい | scripts | [scripts/README.md](scripts/README.md) |
