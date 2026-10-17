# @kubb/plugin-faker

OpenAPI スキーマから Faker.js モックデータのファクトリ関数を生成するプラグイン。スキーマごとに 1 つのファクトリを生成し、部分データで生成値を上書きできる（plugin-faker 5.1.9 の docs に準拠）。

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
| `typeMode` | `'inferred' \| 'schema'` | `'inferred'` | object / intersection ファクトリの入力・戻り値型。`'inferred'` は生成値と渡した override から型を導出（リテラル型を保持）、`'schema'` は `Partial<Model>` を受け宣言モデル型を返す |
| `dateParser` | `'faker' \| 'dayjs' \| 'moment' \| string` | `'faker'` | 文字列の `date` / `time` フィールドの整形ライブラリ。カスタムは default export の整形関数を持つモジュール名 |
| `regexGenerator` | `'faker' \| 'randexp'` | `'faker'` | 正規表現 `pattern` から文字列を生成するライブラリ。`\d` `\w` `\s` を含む場合は `'randexp'` |
| `locale` | `string` | `'en'` | Faker ロケールコード（`'en'` は `fakerEN`、`'de_AT'` は `fakerDE_AT` を import） |
| `seed` | `number \| number[]` | None | 各ファクトリ先頭の `faker.seed(...)` に渡す固定シード |
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

- `dateParser` の `dayjs` / `moment` は、adapter が日付・時刻を `Date` 型にする場合（例: `dateType: 'date'`）は動作しない。`date-time` は常に Faker を使う
- Migration (v4 → v5): `createPet` は名前を保ったまま generic `TData` を受け取り、override フィールドの型を戻り値に保持する。`paramsCasing` と `mapper` は削除（macro か printer を使う）
- `@kubb/plugin-msw` はこのファクトリで mock レスポンスを埋められる

## Related

- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-msw](./plugin-msw.md)
- [adapter-oas](../adapters/adapter-oas.md)
