# @kubb/plugin-zod

OpenAPI スキーマから Zod バリデーションスキーマを生成するプラグイン。v5 で Zod v3 対応は廃止され、`zod@^4` 専用になった（plugin-zod 5.4.12 の docs に準拠）。

## インストール

```bash
npm install --save-dev @kubb/plugin-zod
npm install zod
```

他のプラグインは不要。利用側アプリに `zod` v4 を入れる（`compile` は 4.5 以上、`typeGuards` は 4.6 以上）。`@kubb/plugin-fetch` / `@kubb/plugin-axios` / `@kubb/plugin-client` は `validator` オプション指定時にこのスキーマを使う。

## 設定オプション（v5）

`version` オプションは削除された（Zod v4 専用）。`typed` は `inferred: true` に置き換わった。`dateType` / `unknownType` / `emptySchemaType` は `adapterOas` に移動した。`mapper` / `operations` / `wrapOutput` は削除され、`resolver` / `macros` / `printer` に統合された。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'zod', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割 |
| `importPath` | `string` | `mini ? 'zod/mini' : 'zod'` | `z` の import 元モジュール。`'zod'` / `'zod/mini'` は `import * as z`、カスタムは `import { z }`（名前付き export が必要） |
| `inferred` | `boolean` | `false` | 各スキーマの隣に `z.infer` 型を export（PascalCase 名 + `SchemaType`）。operation ごとの `ResponsesSchema` と inferred 型も出力 |
| `coercion` | `boolean \| { dates?: boolean, strings?: boolean, numbers?: boolean }` | `false` | `z.coerce` による型変換。`false` でも `bigint`（`format: int64`）は常に `z.coerce.bigint()` |
| `guidType` | `'uuid' \| 'guid'` | `'uuid'` | `format: uuid` のバリデーター（`z.uuid()` / 緩い `z.guid()`） |
| `regexType` | `'literal' \| 'constructor'` | `'literal'` | OpenAPI `pattern` の表現（`.regex(/.../)` / `.regex(new RegExp('...'))`） |
| `compile` | `boolean \| { strict?: boolean }` | `false` | スキーマを `z.compile(...)` で包み検証コード化。`{ strict: true }` はコンパイル不能な部分があれば throw。循環参照（`z.lazy`）と bare `$ref` レスポンスエイリアスは未コンパイルのまま |
| `mini` | `boolean` | `false` | Zod Mini スキーマ生成（beta）。`importPath` の既定が `'zod/mini'` になる |
| `typeGuards` | `boolean \| { is?: boolean, assert?: boolean }` | `false` | `is*` 型ガードと `assert*` アサーションを生成。`inferred: true` なら `PetSchemaType` に narrow、`mini: true` なら `z.validate` / `z.parse` 経由 |
| `include` | `Array<Include>` | None | 対象を絞り込む |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外する |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverZod>` | `resolverZod` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterZodNodes \| PrinterZodMiniNodes }` | None | スキーマ種別ごとのハンドラー差し替え（旧 `wrapOutput`）。`this.base(node)` で既定出力、`this.transform(node)` で再帰 |

### coercion の例

```typescript
// true: z.coerce.string(), z.coerce.number(), z.coerce.date()
// { numbers: true, strings: false }: z.string(), z.coerce.number()
```

### mini モードの例（beta）

```typescript
import { z } from 'zod/mini'
z.optional(z.string())
z.nullable(z.number())
z.array(z.string()).check(z.minLength(1), z.maxLength(10))
```

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginZod } from '@kubb/plugin-zod'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [pluginZod({ inferred: true })],
})
```

## Notes

- Migration (v4 → v5): `typed: true` は `inferred: true`。inferred 型名は `Type` で終わる（`PetSchema` → `PetSchemaType`）
- Migration (v4 → v5): レスポンススキーマに `Status<code>` が付く（`listPets200Schema` → `listPetsStatus200Schema`）
- Migration (v4 → v5): `wrapOutput` は printer override に置き換え。`operations` は削除（operation/path マップの再構築にはカスタムプラグインが必要）
- Migration (v4 → v5): 出力は Zod 4 のチェーン呼び出し。`mini: true` では関数型ラッパー。getter は循環参照のみ
- `coercion.dates` は `Date` 型フィールド（`dateType: 'date'`）のみを変換。ISO 文字列フィールドと `format: time` は変換しない
- printer ハンドラーは `this.options.direction`（レスポンスは `'decode'`、リクエストボディ・パラメーターは `'encode'`）を読める。方向ごとに式が異なると `${name}InputSchema` も出力される
- カスタマイズの詳細は plugin-guides の zod-customization（Encode custom types）を参照

## Related

- [@kubb/plugin-ts](./plugin-ts.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-axios](./plugin-axios.md)
- [zod-customization](../plugin-guides/zod-customization.md)
