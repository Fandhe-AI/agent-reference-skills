# Plugins

| Name | Description | Path |
|------|-------------|------|
| @kubb/core | Kubb のコアエンジン（プラグインドライバー・ファイルマネージャー・ビルド制御層）。Kubb 5.11.0 の… | [core.md](./core.md) |
| プラグイン概要 | Kubb の拡張モデル（adapter / plugin / macro / resolver / printer…… | [overview.md](./overview.md) |
| @kubb/plugin-axios | OpenAPI 仕様から type-safe な Axios クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を… | [plugin-axios.md](./plugin-axios.md) |
| @kubb/plugin-barrel | Kubb が生成したコードの `index.ts` バレルファイルを書き出すプラグイン。Kubb（`kubb` パッケージ）に標準同梱され… | [plugin-barrel.md](./plugin-barrel.md) |
| @kubb/plugin-client | OpenAPI 仕様の各 operation を、自分で書いた client モジュールを呼ぶ型付き関数へ変換するプラグイン。生成コードは… | [plugin-client.md](./plugin-client.md) |
| @kubb/plugin-cypress | OpenAPI 仕様から operation ごとの型付き `cy.request()` ヘルパーを生成するプラグイン（plugin-cypress 5.0.14 の… | [plugin-cypress.md](./plugin-cypress.md) |
| @kubb/plugin-faker | OpenAPI スキーマから Faker.js モックデータのファクトリ関数を生成するプラグイン。スキーマごとに 1 つのファクトリを… | [plugin-faker.md](./plugin-faker.md) |
| @kubb/plugin-fetch | OpenAPI 仕様から type-safe な Fetch API クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を… | [plugin-fetch.md](./plugin-fetch.md) |
| @kubb/plugin-mcp | OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成するプラグイン。各 operation が AI アシスタントから… | [plugin-mcp.md](./plugin-mcp.md) |
| @kubb/plugin-msw | OpenAPI 仕様から operation ごとの型付き MSW（Mock Service Worker）リクエストハンドラーを生成するプラグイン（plugin-msw… | [plugin-msw.md](./plugin-msw.md) |
| @kubb/plugin-react-query | OpenAPI 仕様から React Query（TanStack Query）のヘルパーを生成するプラグイン。既定では `queryOptions` / `mutationOptions`… | [plugin-react-query.md](./plugin-react-query.md) |
| @kubb/plugin-redoc | OpenAPI 仕様を Redoc で文書化する単一 HTML ページを生成するプラグイン（plugin-redoc 5.0.12 の docs に準拠）。 | [plugin-redoc.md](./plugin-redoc.md) |
| @kubb/plugin-swr | OpenAPI 仕様から SWR hooks（クエリごとの `useSWR`、ミューテーションごとの `useSWRMutation`）を生成するプラグイン… | [plugin-swr.md](./plugin-swr.md) |
| @kubb/plugin-ts | OpenAPI スキーマから TypeScript の型・インターフェースを生成するプラグイン。 | [plugin-ts.md](./plugin-ts.md) |
| @kubb/plugin-vue-query | OpenAPI 仕様から Vue Query（TanStack Query）のヘルパーを生成するプラグイン。既定では `queryOptions` ファクトリとキーのみ、… | [plugin-vue-query.md](./plugin-vue-query.md) |
| @kubb/plugin-zod | OpenAPI スキーマから Zod バリデーションスキーマを生成するプラグイン。v5 で Zod v3 対応は廃止され、`zod@^4` 専用に… | [plugin-zod.md](./plugin-zod.md) |
