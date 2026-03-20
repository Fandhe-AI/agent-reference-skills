# @kubb/plugin-react-query

OpenAPI 仕様から React Query（TanStack Query）hooks を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-react-query
```

## 設定オプション

### output

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.path` | `string` | `'hooks'` | 出力先パス |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` | バレルファイル制御 |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — | ファイルコメント |
| `output.override` | `boolean` | `false` | 既存ファイル上書き |

### client

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `client.importPath` | `string` | — | カスタムクライアントパス |
| `client.dataReturnType` | `'data' \| 'full'` | `'data'` | レスポンス形式 |
| `client.baseURL` | `string` | — | ベース URL |
| `client.clientType` | `'function' \| 'class'` | `'function'` | クライアント形式（function のみ対応） |
| `client.bundle` | `boolean` | `false` | クライアントランタイムバンドル |

### query / mutation

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `query.methods` | `Array<HttpMethod>` | `['get']` | クエリ対象 HTTP メソッド |
| `query.importPath` | `string` | `'@tanstack/react-query'` | useQuery インポートパス |
| `query` | `false` | — | クエリ生成を無効化（queryOptions のみ） |
| `mutation.methods` | `Array<HttpMethod>` | `['post', 'put', 'delete']` | ミューテーション対象メソッド |
| `mutation.importPath` | `string` | `'@tanstack/react-query'` | useMutation インポートパス |

### パラメータ

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `paramsType` | `'object' \| 'inline'` | `'inline'` | パラメータ渡し方 |
| `pathParamsType` | `'object' \| 'inline'` | `'inline'` | パスパラメータ渡し方 |
| `paramsCasing` | `'camelcase'` | — | camelCase 変換 |
| `parser` | `'client' \| 'zod'` | `'client'` | データパーサー |
| `contentType` | `'application/json' \| string` | — | コンテンツタイプ |

### 高度な機能

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `infinite` | `Infinite \| false` | `false` | 無限クエリ hooks の生成 |
| `suspense` | `object \| false` | — | Suspense Query hooks（React v5+） |
| `customOptions` | `{importPath, name?}` | — | カスタムフックオプション |
| `queryKey` | `(props) => unknown[]` | — | クエリキーカスタマイズ |
| `mutationKey` | `(props) => unknown[]` | — | ミューテーションキーカスタマイズ |

### infinite の型

```typescript
type Infinite = {
  queryParam: string        // デフォルト: 'id'
  initialPageParam: unknown // デフォルト: 0
  nextParam?: string | string[]
  previousParam?: string | string[]
} | false
```

### フィルタリング

| オプション | 型 | 説明 |
|-----------|-----|------|
| `group.type` | `'tag'` | タグによるグループ化 |
| `include` / `exclude` | `Array<{type, pattern}>` | フィルタリング |
| `override` | `Array<{type, pattern, options}>` | 条件付きオーバーライド |
| `transformers.name` | `(name, type?) => string` | 名前カスタマイズ |
| `generators` | `Generator[]` | カスタムジェネレーター |

## 設定例

```typescript
pluginReactQuery({
  output: { path: './hooks' },
  group: { type: 'tag', name: ({ group }) => `${group}Hooks` },
  client: { dataReturnType: 'full' },
  query: { methods: ['get'], importPath: '@tanstack/react-query' },
  mutation: { methods: ['post', 'put', 'delete'] },
  infinite: { queryParam: 'page', initialPageParam: 0 },
  suspense: {},
  parser: 'zod',
})
```
