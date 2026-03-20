# プラグイン概要

Kubb はプラグインベースのアーキテクチャで、OpenAPI 仕様から様々なコード成果物を生成する。

## プラグインの依存関係

ほとんどのプラグインは `@kubb/plugin-oas` を基盤として必要とする。

```
@kubb/plugin-oas（必須基盤）
├── @kubb/plugin-ts（TypeScript 型生成）
├── @kubb/plugin-client（API クライアント）
│   ├── @kubb/plugin-react-query
│   ├── @kubb/plugin-vue-query
│   ├── @kubb/plugin-solid-query
│   ├── @kubb/plugin-svelte-query
│   └── @kubb/plugin-swr
├── @kubb/plugin-zod（バリデーション）
├── @kubb/plugin-faker（モックデータ）
├── @kubb/plugin-msw（MSW ハンドラー）
├── @kubb/plugin-cypress（Cypress テスト）
├── @kubb/plugin-mcp（MCP サーバー）
└── @kubb/plugin-redoc（API ドキュメント）
```

## カテゴリ別プラグイン

### 基盤レイヤー
- **@kubb/plugin-oas**: OpenAPI 仕様の読み込み・パース・バリデーション

### 型生成
- **@kubb/plugin-ts**: TypeScript インターフェース・型の生成

### API クライアント
- **@kubb/plugin-client**: Axios/Fetch ベースの HTTP クライアント生成

### データフェッチング
- **@kubb/plugin-react-query**: TanStack Query for React
- **@kubb/plugin-vue-query**: TanStack Query for Vue
- **@kubb/plugin-solid-query**: TanStack Query for SolidJS
- **@kubb/plugin-svelte-query**: TanStack Query for Svelte
- **@kubb/plugin-swr**: Vercel SWR hooks

### バリデーション・モック
- **@kubb/plugin-zod**: Zod バリデーションスキーマ生成
- **@kubb/plugin-faker**: Faker.js モックデータ生成
- **@kubb/plugin-msw**: Mock Service Worker ハンドラー生成

### テスト・ドキュメント
- **@kubb/plugin-cypress**: Cypress リクエスト定義（v3.7.0+）
- **@kubb/plugin-redoc**: Redoc HTML ドキュメント生成

### AI 連携
- **@kubb/plugin-mcp**: MCP サーバー生成（v3.9.0+）

## 設定例

```typescript
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: { path: './petstore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginClient(),
  ],
})
```

## 共通パターン

全プラグインは一貫したパターンに従う:
- パッケージマネージャーでインストール
- `kubb.config.ts` の `plugins` 配列に追加
- 出力ディレクトリを指定
- 依存プラグインを宣言
