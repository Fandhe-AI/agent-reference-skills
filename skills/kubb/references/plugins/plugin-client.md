# @kubb/plugin-client

OpenAPI 仕様の各 operation を、自分で書いた client モジュールを呼ぶ型付き関数へ変換するプラグイン。生成コードは Fetch / axios / Kubb ランタイムに依存しない。

## セットアップ

- 必須の `importPath` に自作 client モジュールを指定する。モジュールは `client` と、`Options` / `RequestResult` 型を export する必要がある。仕様に server-sent event の operation がある場合は、`toEventStream` と `EventStreamResult` / `SuccessOf` 型も export する
- operation の型として `@kubb/plugin-ts`、または `inferred: true` の `@kubb/plugin-zod` を追加する
- `validator` を設定する場合は `@kubb/plugin-zod` を追加し、`zod` v4 をインストールする（プラグインが無いと生成が失敗する）

各関数は `path` / `query` / `headers` / `body` をグループ化したパラメータを受け取り、operation の認証要件を `security` リストとして client に渡す。個別の呼び出しで `client` を渡せば既定の client を置き換えられる。

## 設定オプション

| Option | Purpose | Default |
|--------|---------|---------|
| `importPath` | 自作 client モジュールの import specifier（`string`） | Required |
| `output` | 出力先: `path` / `mode` / `barrel` / `banner` / `footer` | `{ path: 'clients', barrel: { type: 'named' } }` |
| `group` | tag または path 単位で分割: `type` / `name` | None |
| `throwOnErrorDefault` | client に渡す `throwOnError` の既定値（`boolean`） | `true` |
| `validator` | Zod スキーマを client に渡す（`false \| 'zod' \| { request?: 'zod'; response?: 'zod' }`） | `false` |
| `include` | マッチする operation のみ残す | None |
| `exclude` | マッチする operation をスキップ | `[]` |
| `override` | パターン別にオプションを上書き | `[]` |
| `resolver` | 生成される名前・ファイルパスのカスタマイズ | `resolverClient` |
| `macros` | 出力前に AST ノードを書き換え | `[]`（組み込み client マクロの後に実行） |

### importPath

生成される全 import にそのまま書き込まれるため、生成ファイルから解決できる必要がある。相対パス・パッケージ名・エイリアスのいずれも可。

```typescript
pluginClient({ importPath: '../../../client' }) // relative to src/gen/clients/<tag>/
pluginClient({ importPath: '@my-org/api-client' }) // a package
```

`group: { type: 'tag' }` かつ `output.path: 'clients'` の場合、生成ファイルは `src/gen/clients/<tag>/` に置かれるため `../../../client` が `src/client.ts` を指す。`group` なしなら `../../client`。

### throwOnErrorDefault

生成される全関数が client に渡す `throwOnError` フィールドの既定値。呼び出し側で `throwOnError` を指定した場合はそちらが優先される。フラグの意味は client 実装が決める（公式 example client は `true` で非 2xx を throw、`false` でエラーを値として返す）。プラグイン全体の設定のため `override` では設定できない。

### validator

`@kubb/plugin-zod` の Zod スキーマを `config.validator` として client に渡す。プラグイン自身はスキーマを実行せず、client が `config.validator` を読んで実行する。

- `false`: 何も渡さない（既定）
- `'zod'`: response と error のスキーマを渡す
- `{ request?: 'zod', response?: 'zod' }`: 方向ごとに opt-in

`validator` を設定する場合は `pluginZod()` を plugins に追加すること（無いとエラーで生成が止まる）。

## 設定例

```typescript [kubb.config.ts]
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginClient } from '@kubb/plugin-client'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginClient({
      output: { path: 'clients', mode: 'directory', barrel: { type: 'named' } },
      group: { type: 'tag' },
      // resolved from each generated file: src/gen/clients/<tag>/ to src/client.ts
      importPath: '../../../client',
    }),
  ],
})
```

## Notes

- 既製の client が必要なら `@kubb/plugin-fetch` または `@kubb/plugin-axios` を使う。query 系プラグインと `@kubb/plugin-mcp` も本プラグインと併用でき、その場合 hooks / handlers が自作 client モジュールを呼ぶ
- `include` / `exclude` / `override` / `resolver` / `macros` / `output` / `group` の共通オプション詳細は公式の Shared plugin options を参照
- 出典: `@kubb/plugin-client@5.5.15` の docs（`overview.md` / `options.md`）。公式ページ https://kubb.dev/extensions/kubb-labs/plugin-client

## Related

- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-zod](./plugin-zod.md)
