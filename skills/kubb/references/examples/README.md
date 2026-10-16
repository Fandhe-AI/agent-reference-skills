# Examples

| Name | Description | Path |
|------|-------------|------|
| Advanced Configuration Example | 複数プラグインを組み合わせた高度な設定例。Redoc、TypeScript 型、Zod スキーマ、React Query hooks、Axios クライアント、MCP サーバー、Faker モック、Cypress、MSW ハンドラーを同時に生成する。 | [advanced.md](./advanced.md) |
| Axios Client Example | OpenAPI 仕様から Axios ベースのクライアントを `@kubb/plugin-axios` で生成する設定例。 | [axios.md](./axios.md) |
| Client Example (@kubb/plugin-client) | `@kubb/plugin-client` で、ユーザーが書いたクライアントモジュールを呼ぶ型付き関数を生成する設定例。 | [client.md](./client.md) |
| Cypress Example | OpenAPI 仕様から Cypress リクエスト定義を生成する設定例。 | [cypress.md](./cypress.md) |
| Faker Example | OpenAPI 仕様から Faker.js モックデータのファクトリを生成する設定例（CommonJS）。 | [faker.md](./faker.md) |
| Fetch Client Example | OpenAPI 仕様から Fetch ベースのクライアントを `@kubb/plugin-fetch` で生成する設定例。 | [fetch.md](./fetch.md) |
| Custom Generators Example | カスタムジェネレーターを使って生成コードをカスタマイズする設定例。 | [generators.md](./generators.md) |
| MCP Example | OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成する設定例。登録済みの Axios クライアントを検出し、生成済み関数を呼ぶ。 | [mcp.md](./mcp.md) |
| MSW Example | OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーと Faker モックを生成する設定例。 | [msw.md](./msw.md) |
| React Query Example | OpenAPI 仕様から React Query（TanStack Query）のヘルパーを生成する設定例。 | [react-query.md](./react-query.md) |
| SDK (class-based client) Example | OpenAPI 仕様からタグ単位でまとまった SDK クラス（`petStoreSDK`）を `@kubb/plugin-fetch` の `sdk` オプションで生成する設定例。 | [sdk.md](./sdk.md) |
| Simple Example | OpenAPI 仕様から基本的なコードを単一ファイル出力で生成する設定例。Redoc ドキュメント、型、Fetch クライアント、React Query、Zod を 1 つの config にまとめる。 | [simple.md](./simple.md) |
| Solid Query Example | v4 専用（v5 で削除）。OpenAPI 仕様から Solid Query hooks を生成する設定例。 | [solid-query.md](./solid-query.md) |
| Svelte Query Example | v4 専用（v5 で削除）。OpenAPI 仕様から Svelte Query hooks を生成する設定例。 | [svelte-query.md](./svelte-query.md) |
| SWR Example | OpenAPI 仕様から SWR hooks（`useSWR` / `useSWRMutation`）を生成する設定例。Fetch クライアントを自動検出して呼ぶ。 | [swr.md](./swr.md) |
| TypeScript Example | OpenAPI 仕様から TypeScript 型を生成する設定例。複数の enum スタイル・optional 表記・出力形式を配列形式の config で示す。 | [typescript.md](./typescript.md) |
| Vue Query Example | OpenAPI 仕様から Vue Query（TanStack Query）のヘルパーを生成する設定例。Fetch クライアントを自動検出し、composables が生成関数を呼ぶ。 | [vue-query.md](./vue-query.md) |
| Zod Example | OpenAPI 仕様から Zod バリデーションスキーマを生成する設定例。通常の Zod、Zod Mini、ユニオン + readOnly の 3 生成を定義する。 | [zod.md](./zod.md) |
