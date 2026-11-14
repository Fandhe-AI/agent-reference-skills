# @kubb/plugin-faker

OpenAPI スキーマから Faker.js モックデータのファクトリ関数を生成するプラグイン。スキーマごとに 1 つのファクトリを生成し、部分データで生成値を上書きできる（plugin-faker 5.4.1 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-faker
```

`@kubb/plugin-ts` が必須（無いと生成失敗）。利用側アプリに `@faker-js/faker` v10 を入れる。`dateParser` / `regexGenerator` で選んだ場合は `dayjs` / `moment` / `randexp` も入れる。

## 設定オプション（v5）

`dateType` / `unknownType` / `emptySchemaType` は `adapterOas` に移動した。`mapper` / `paramsCasing` / `contentType` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'mocks', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割 |
| `typeMode` | `'inferred' \| 'schema'` | `'inferred'` | object / intersection ファクトリの入力・戻り値型。`'inferred'` は生成値と渡した override から型を導出（リテラル型を保持。スキーマ循環内のファクトリは循環推論を避けるため宣言モデルを基底の戻り値型にし、渡した override の型は保持する）、`'schema'` は `Partial<Model>` を受け宣言モデル型を返す |
| `dateParser` | `'faker' \| 'dayjs' \| 'moment' \| string` | `'faker'` | 文字列の `date` / `time` / `date-time` フィールドの整形ライブラリ。カスタムは default export が dayjs API を持つモジュール名（生成コードは `name(faker.date.anytime()).format('YYYY-MM-DD')` を呼び、default export は camelCase 化したモジュール名で import される。`'my-date-lib'` は `myDateLib`、`'@scope/lib'` は `scopeLib`）。`date` / `time` は `YYYY-MM-DD` / `HH:mm:ss`、`date-time` は `'faker'` で `toISOString()`、他の parser では `YYYY-MM-DDTHH:mm:ss[Z]`（ローカル date-time は `Z` 無し、スキーマが宣言する場合は数値オフセット付き）|
| `regexGenerator` | `'faker' \| 'randexp'` | `'faker'` | 正規表現 `pattern` から文字列を生成するライブラリ。`'faker'` は `\d` / `\w` / `\+` 等のエスケープ / `{1,}` 等の開いた回数を faker が読める形に書き換えるが、グループ・alternation（`a\|b`）・`\s` は未対応なので、それらを含む場合は `'randexp'`（利用側アプリに `randexp` が必要） |
| `locale` | `string` | `'en'` | Faker ロケールコード（`'en'` は `fakerEN`、`'de_AT'` は `fakerDE_AT` を import） |
| `seed` | `number \| number[]` | None | 生成ファイルごとに先頭で 1 回 `faker.seed(...)` に渡す固定シード（同じファクトリを 2 回呼ぶと同じシーケンスの次の値が返る） |
| `include` | `Array<Include>` | None | マッチする operation / schema のみ生成 |
| `exclude` | `Array<Exclude>` | `[]` | マッチするものをスキップ |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverFaker>` | `resolverFaker` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterFakerNodes }` | None | スキーマ種別（`'integer'` / `'date'` / `'string'` など）ごとのハンドラー差し替え |

### typeMode の例

```typescript
// 'inferred' (default)
// export function createOrder<TData extends Partial<Order> = object>(data?: TData)
// 'schema'
// export function createOrder(data?: Partial<Order>): Order
pluginFaker({
  override: [{ type: 'schemaName', pattern: '^Order$', options: { typeMode: 'schema' } }],
})
```

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFaker } from '@kubb/plugin-faker'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginTs(), pluginFaker({ seed: [100] })],
})
```

## Notes

- `dateParser` の `dayjs` / `moment` は、adapter が日付・時刻を `Date` 型にする場合（例: `dateType: 'date'`）は生成が失敗する
- `resolver` の `param.name` / `param.path` / `param.query` / `param.headers` / `response.status` / `response.body` / `response.response` / `response.responses` は `create` 接頭辞付きの名前（例 `createListPetsStatus200`、`createCreatePetsBody`）になり、`param.cookies` が追加された
- Migration (v4 → v5): `createPet` は名前を保ったまま generic `TData` を受け取り、override フィールドの型を戻り値に保持する。`paramsCasing` と `mapper` は削除（macro か printer を使う）
- Migration (5.11 → 5.20): `dateParser` now also formats `date-time` (it used to be Faker-only); `seed: 0` is no longer ignored and `seed` is emitted once per generated file rather than at the top of each factory; a `dateParser` module name that is not an identifier (such as `'my-date-lib'` or `'@scope/lib'`) is imported and called under a camelCased name (source: `@kubb/plugin-msw` CHANGELOG 6.2.1 and the plugin-faker options docs)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-faker/options （`@kubb/plugin-faker@5.4.1`、取得日 2026-11-14）
- `@kubb/plugin-msw` はこのファクトリで mock レスポンスを埋められる

## Related

- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-msw](./plugin-msw.md)
- [adapter-oas](../adapters/adapter-oas.md)
