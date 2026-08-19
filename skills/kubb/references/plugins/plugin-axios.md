# @kubb/plugin-axios

OpenAPI 仕様から type-safe な Axios クライアントを生成するプラグイン。operation ごとに 1 つの async 関数を生成する。

## インストール

```bash
npm install --save-dev @kubb/plugin-axios@beta
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
| `resolver` | `ResolverPatch<ResolverClient>` | — | 生成される名前・ファイルパスのカスタマイズ |
| `macros` | `Array<Macro>` | — | 出力前に AST ノードを書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginAxios({
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
- `baseURL` はテンプレートリテラル（例: `'${process.env.API_URL}'`）による実行時展開に対応
- `validator` は `'zod'`（レスポンス検証）または `{ request?: 'zod', response?: 'zod' }` の形で指定可能
- 執筆時点（v3.x 系）で `@beta` タグでの配布

## Related

- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
