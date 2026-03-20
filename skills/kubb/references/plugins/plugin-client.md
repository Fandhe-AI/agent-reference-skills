# @kubb/plugin-client

OpenAPI 仕様から API クライアントコード（Axios/Fetch）を生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-client
```

## 設定オプション

### output

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.path` | `string` | `'clients'` | 出力先パス |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` | バレルファイル制御 |
| `output.banner` | `string \| (oas) => string` | — | ファイル先頭コメント |
| `output.footer` | `string \| (oas) => string` | — | ファイル末尾コメント |
| `output.override` | `boolean` | `false` | 既存ファイル上書き |

### クライアント設定

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `client` | `'axios' \| 'fetch'` | `'axios'` | HTTP クライアントライブラリ |
| `clientType` | `'function' \| 'class' \| 'staticClass'` | `'function'` | コード生成スタイル（v4.18.0+） |
| `importPath` | `string` | `'@kubb/plugin-client/clients/${client}'` | カスタムクライアントモジュールパス |

**注意**: Query プラグイン（React Query 等）は `clientType: 'function'` のみ対応。class ベースのクライアントとは非互換。

### データ・パラメータ

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `dataReturnType` | `'data' \| 'full'` | `'data'` | レスポンスの返却形式 |
| `parser` | `'client' \| 'zod'` | `'client'` | レスポンスパース戦略 |
| `paramsType` | `'object' \| 'inline'` | `'inline'` | パラメータの渡し方 |
| `pathParamsType` | `'object' \| 'inline'` | `'inline'` | パスパラメータの渡し方 |
| `paramsCasing` | `'camelcase'` | — | パラメータ名を camelCase に変換 |
| `contentType` | `'application/json' \| string` | — | コンテンツタイプ指定 |

### その他

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `urlType` | `'export' \| false` | `false` | URL ヘルパー関数の生成 |
| `baseURL` | `string` | — | カスタムベース URL |
| `bundle` | `boolean` | `false` | クライアントランタイムを `.kubb` にコピー |
| `operations` | `boolean` | `false` | `operations.ts` の生成 |
| `wrapper.className` | `string` | — | 複合ラッパークラス名 |
| `group.type` | `'tag'` | — | タグによるグループ化 |
| `include` / `exclude` | `Array<{type, pattern}>` | — | フィルタリング |
| `override` | `Array<{type, pattern, options}>` | — | 条件付きオーバーライド |
| `transformers.name` | `(name, type?) => string` | — | 名前カスタマイズ |
| `generators` | `Generator[]` | — | カスタムジェネレーター |

### カスタムクライアントの要件

`importPath` 使用時は以下の型をエクスポートする必要がある:
- `RequestConfig<TData>`
- `ResponseConfig<TData>`
- `ResponseErrorConfig<TError>`
- `Client`（Query プラグイン使用時に必須）

## 生成コードの例

### Function スタイル（デフォルト）

```typescript
export async function getPetById(
  petId: GetPetByIdPathParams['petId'],
  config?: Partial<RequestConfig>
): Promise<GetPetByIdQueryResponse>
```

### Static Class スタイル

```typescript
export class Pet {
  static async getPetById(
    { petId }: { petId: GetPetByIdPathParams['petId'] },
    config?: Partial<RequestConfig>
  ): Promise<GetPetByIdQueryResponse>
}
```

## 設定例

```typescript
import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'

export default defineConfig({
  input: { path: './petStore.yaml' },
  output: { path: './src/gen' },
  plugins: [
    pluginOas(),
    pluginClient({
      output: { path: './clients', barrelType: 'named' },
      client: 'fetch',
      clientType: 'staticClass',
      group: { type: 'tag' },
      dataReturnType: 'full',
      paramsType: 'object',
    }),
  ],
})
```
