# @kubb/plugin-msw

OpenAPI 仕様から operation ごとの型付き MSW（Mock Service Worker）リクエストハンドラーを生成するプラグイン（plugin-msw 6.2.1 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-msw
npm install msw
```

`@kubb/plugin-ts` が必要。`parser: 'faker'` を使う場合は `@kubb/plugin-faker` と `@faker-js/faker` v10 も必要（既定の `data` parser では不要）。利用側アプリに `msw` v3 を入れる（plugin-msw 6 は `msw@^3.0.0` 必須）。

### 設定オプション（v6）

`contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'handlers', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `baseURL` | `string` | None | 各ハンドラーのリクエストに付与するベース URL。省略時はホストを付けず spec の相対パスにマッチ。末尾スラッシュは付けない（operation path が `/` で始まるため）。`'${process.env.API_URL}'` のようなテンプレート式はハンドラー生成時に評価される。実行時に決める場合はハンドラーまたは `createHandlers` に `{ baseURL }` を渡す |
| `handlers` | `boolean` | `false` | 全ハンドラーを operation 順に持つ `handlers.ts` を生成。`handlers`（設定の `baseURL` 付きコレクション。`setupServer` / `setupWorker` に spread する）と `createHandlers(options?)`（実行時の `baseURL` を渡して同じコレクションを作る）を export |
| `parser` | `'data' \| 'faker'` | `'data'` | レスポンスボディの生成元。`'data'` は渡したデータを返す（`new HttpResponse(JSON.stringify(data), ...)`。`data` 省略時は spec にあれば成功レスポンスの最初の example の `value`、無ければ `serializedValue` を送る。JSON レスポンスはパースして、テキストレスポンスはそのまま送信。`null` を渡すと `null` ボディ）。`'faker'` は `data` が `undefined` / `null` のとき `@kubb/plugin-faker` の値にフォールバック（`0` / `false` / `''` はそのまま返す） |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverMsw>` | `resolverMsw` | 生成名・ファイルパスのカスタマイズ（`handler.name` / `handler.listName` など） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginMsw } from '@kubb/plugin-msw'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginTs(),
    pluginMsw({ output: { path: 'handlers', mode: 'directory' }, handlers: true }),
  ],
})
```

## Notes

- `parser: 'faker'` では成功レスポンススキーマを持つ operation のみモックデータが付く。`pluginFaker()` を併せて登録する
- ハンドラーは operation の `{ baseURL }` を第 2 引数に取り、そのハンドラーのみ設定済み `baseURL` を上書きする（第 1 引数に `undefined` を渡すと既定レスポンスのまま）。各ハンドラーファイルは spec の status code ごとに `getPetHandlerResponse200(data)` / `getPetHandlerResponse404(data)` のようなレスポンスヘルパーも export し、コールバックから返して別ステータスをモックできる（`getPetHandler(() => getPetHandlerResponse404())`）
- `int64`（`bigint`）フィールドは JSON number として送信される。安全な整数範囲外の値は精度を失わず throw する
- Migration (5 → 6): `@kubb/plugin-msw@6.0.0` generates handlers for MSW 3 and needs `msw@^3.0.0`; it imports `http`, `HttpResponse`, and `HttpResponseResolver` from `msw/http` instead of `msw` (MSW 2 has no `msw/http` entry) and returns `HttpResponse` instead of the plain Fetch `Response`. To upgrade, install MSW 3 (`npm install msw@^3.0.0`) and regenerate the handlers. A project pinning an older Kubb keeps one `@kubb/core` with npm and Bun; with pnpm or Yarn, pin `@kubb/kit` and `@kubb/renderer-jsx` to the Kubb version in `overrides` / `resolutions`
- Migration (6.2.0): a status range such as `2XX` is a success response and is written in lower case (`ListPetsStatus2XX` becomes `ListPetsStatus2xx`, key `'2XX'` becomes `'2xx'`); rename imports of the `…Status2XX` names after regeneration (needs Kubb 5.18.4 or later). With `group: { type: 'tag' }`, a tag with an OpenAPI 3.2 `parent` is nested in the parent's folder (`payment` under `store` writes to `store/payment/`); pass `group.name` to keep one folder per tag
- Source: https://kubb.dev/extensions/kubb-labs/plugin-msw/options （`@kubb/plugin-msw@6.2.1`、取得日 2026-11-14）。移行の根拠は `@kubb/plugin-msw` CHANGELOG.md の 6.0.0 / 6.2.0 / 6.2.1
- Migration (v4 → v5): `parser` / `handlers` / `baseURL` は v4 と同じ挙動。生成ハンドラーはリクエストボディとヘッダーに型付けされた `HttpResponseResolver` を使う。共通の resolver・adapter `contentType`・generator オプションの移行を適用する
- 詳細は [msw-mock-api](../plugin-guides/msw-mock-api.md) を参照

## Related

- [@kubb/plugin-faker](./plugin-faker.md)
- [@kubb/plugin-ts](./plugin-ts.md)
