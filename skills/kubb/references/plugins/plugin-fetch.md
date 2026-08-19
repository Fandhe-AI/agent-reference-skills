# @kubb/plugin-fetch

OpenAPI 仕様から type-safe な Fetch API クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を生成する。

## インストール

```bash
npm install --save-dev @kubb/plugin-fetch@beta
```

`@kubb/plugin-ts` が必須。`validator: 'zod'` を使う場合は `@kubb/plugin-zod` も必要。

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'clients', barrel: { type: 'named' } }` | 生成ファイルの出力先とエクスポート方法 |
| `group` | `Group` | — | tag / path 単位でのフォルダ分割 |
| `baseURL` | `string` | — | 各リクエストに付与するベース URL |
| `validator` | `false \| 'zod' \| object` | `false` | Zod によるリクエスト/レスポンスバリデーション |
| `sdk` | `{ mode?: 'tag' \| 'flat'; name?: string }` | — | クラスベース SDK を生成（`mode: 'tag'` はタグ毎、`'flat'` は単一クラス） |
| `include` | `Array<Include>` | — | マッチする operation のみ生成 |
| `exclude` | `Array<Exclude>` | `[]` | マッチする operation をスキップ |
| `override` | `Array<Override>` | `[]` | パターン別にオプションを上書き |
| `resolver` | `ResolverPatch` | — | 生成される名前・ファイルパスのカスタマイズ |
| `macros` | `Array<Macro>` | — | 出力前に AST ノードを書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginFetch({
      output: { path: 'clients', mode: 'directory', barrel: { type: 'named' } },
      baseURL: 'https://petstore.swagger.io/v2',
      group: {
        type: 'tag',
        name: ({ group }) => `${group}Service`,
      },
    }),
  ],
})
```

## Notes

- `group` を使う場合、`output.mode` は `'directory'` である必要がある（`'file'` との併用はビルドエラー）
- ネイティブ Fetch API ベースで、multipart/form-data やバイナリダウンロードのシリアライズ、typed server-sent events、interceptor / カスタム transport に対応
- 認証は OpenAPI security scheme から解決される
- 執筆時点（v3.x 系）で `@beta` タグでの配布

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
