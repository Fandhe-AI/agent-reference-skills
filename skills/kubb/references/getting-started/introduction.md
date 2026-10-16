# Introduction

Kubb は API 仕様から TypeScript の型・API クライアント・クエリフック・バリデーター・モックを生成するプラグインベースのコードジェネレーター（Kubb 5.11.0 / docs 5.x に準拠）。

## 概要

Kubb generates code from API specifications: TypeScript types, API clients, query hooks, validators, and mocks. Regenerate when your specification changes to keep these files in sync with your API, then import them in your application. Choose the outputs you need with plugins in one `kubb.config.ts` file. Generated files belong to your project.

## 生成できるコード

| カテゴリ | 内容 |
|---------|------|
| TypeScript Types | `@kubb/plugin-ts` |
| HTTP Clients | `@kubb/plugin-axios` / `@kubb/plugin-fetch`（型付きクライアント） |
| Data Fetching Hooks | React Query / Vue Query / SWR |
| Validation | Zod（`@kubb/plugin-zod`） |
| Mock Data | Faker / MSW |
| Testing | Cypress |
| AI Integration | `@kubb/plugin-mcp` による生成 MCP サーバー |

## 対応 OpenAPI バージョン

デフォルトの OpenAPI アダプター（`adapterOas`）は OpenAPI 2.0 / 3.0 / 3.1 に対応。

## システム要件

- **Node.js:** 22.12 以上

## クイックスタート

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginTs(), pluginZod()],
})
```

```bash
npx kubb init
npx kubb generate
```

## プラグインエコシステム

プラグインのソースは kubb-labs/plugins リポジトリに移り、各プラグインは独立したバージョンを持つ。レジストリ（`kubb add <extension>`）経由でインストールできる。

### プラグイン

| パッケージ | 用途 |
|-----------|------|
| `@kubb/plugin-ts` | TypeScript 型・インターフェース生成 |
| `@kubb/plugin-axios` | 型付き Axios クライアント生成 |
| `@kubb/plugin-fetch` | 型付き Fetch クライアント生成 |
| `@kubb/plugin-client` | ユーザーが書いたクライアントモジュールを呼ぶ型付き関数の生成 |
| `@kubb/plugin-zod` | Zod スキーマ生成 |
| `@kubb/plugin-react-query` | React Query フック生成 |
| `@kubb/plugin-vue-query` | Vue Query フック生成 |
| `@kubb/plugin-swr` | SWR フック生成 |
| `@kubb/plugin-faker` | Faker.js モックデータ生成 |
| `@kubb/plugin-msw` | MSW ハンドラー生成 |
| `@kubb/plugin-cypress` | Cypress テストユーティリティ生成 |
| `@kubb/plugin-mcp` | MCP サーバー生成 |
| `@kubb/plugin-redoc` | ReDoc ドキュメント生成 |

### ビルドツール・基盤

| パッケージ | 用途 |
|-----------|------|
| `kubb` | CLI・コアランタイム・OpenAPI アダプター・TS/TSX/Markdown パーサー同梱 |
| `@kubb/core` | 既定値を持たない素のエンジン（`createKubb` を import 可能） |
| `@kubb/mcp` | MCP サーバー |
| `unplugin-kubb` | Vite / webpack / Rollup などのバンドラー連携 |

## Notes

- v5 で `@kubb/plugin-solid-query` と `@kubb/plugin-svelte-query` は削除され、代替は無い（最終版は 4.39.3）
- `@kubb/plugin-oas` は `adapterOas`（`defineConfig` が既定で供給）に置き換えられた
- `@kubb/plugin-client` の役割が変わり、ユーザーが書いたクライアントモジュールを呼ぶ型付き関数のジェネレーターになった。Axios / Fetch クライアントは `@kubb/plugin-axios` / `@kubb/plugin-fetch`
- 旧版ページにあった FAQ とコミュニティ節は、5.x の introduction ページに相当する節が無い。5.x のコミュニティ情報は Discord（discord.gg/shfBFeczrm）、GitHub issues、Contributing ページ

## Related

- [installation.md](./installation.md)
- [quick-start.md](./quick-start.md)
