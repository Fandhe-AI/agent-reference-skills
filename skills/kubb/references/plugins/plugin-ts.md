# @kubb/plugin-ts

OpenAPI スキーマから TypeScript の型・インターフェースを生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-ts
```

## 設定オプション（v5）

`enumType` / `enumSuffix` / `enumTypeSuffix` / `enumKeyCasing` は単一の `enum` オブジェクトに統合された。`dateType` / `integerType` / `unknownType` / `emptySchemaType` は `adapterOas` に移動した。`contentType` / `paramsCasing` / `generators` は削除され、`transformers.name` は `resolver` に置き換わった。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'types', barrel: { type: 'named' } }` | 出力先（`path` / `mode` / `barrel` / `banner` / `footer`） |
| `group` | `Group` | None | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `enum` | `{ type?, constCasing?, typeSuffix?, keyCasing? }` | `{ type: 'asConst', constCasing: 'camelCase', typeSuffix: 'Key', keyCasing: 'none' }` | enum の表現形式・ケーシングをまとめて指定。`type`: `'asConst' \| 'enum' \| 'constEnum' \| 'literal' \| 'inlineLiteral'`（`'inlineLiteral'` は property 上の enum を使用箇所に inline する。`$ref` が指すコンポーネント enum は名前付き型のまま）、`constCasing`: `'camelCase' \| 'pascalCase'`（`asConst` のみ）、`typeSuffix`: `asConst` の補助型の接尾辞（`''` で省略）、`keyCasing`: `'none' \| 'camelCase' \| 'pascalCase' \| 'snakeCase' \| 'screamingSnakeCase'` |
| `syntaxType` | `'type' \| 'interface'` | `'type'` | オブジェクトスキーマを type alias か interface で出力 |
| `optionalType` | `'questionToken' \| 'undefined' \| 'questionTokenAndUndefined'` | `'questionToken'` | オプショナルフィールドの表記 |
| `arrayType` | `'array' \| 'generic'` | `'array'` | 配列構文（`Type[]` vs `Array<Type>`） |
| `operations` | `'export' \| 'inline'` | `'export'` | operation ごとの型ファイル（`AddPetOptions` / `AddPetResponses` / `AddPetStatus200` / `AddPetPath` 等。response の `headers` は `ListPetsStatus200Headers`、cookie は `ListPetsCookies`）を出力するか、スキーマ型のみ出力して利用側に inline 展開するか |
| `include` | `Array<Include>` | None | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverTs>` | `resolverTs` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterTsNodes }` | None | スキーマ種別ごとのハンドラー差し替え。各ハンドラーは TypeScript の型を文字列で返す（コンパイラーノードを返すハンドラーは deprecated） |

## 設定例

```typescript
import { defineConfig } from "kubb/config"
import { pluginTs } from "@kubb/plugin-ts"

export default defineConfig({
  input: "./petStore.yaml",
  output: { path: "./src/gen" },
  plugins: [
    pluginTs({
      output: { path: "./types", mode: "directory" },
      exclude: [{ type: "tag", pattern: "store" }],
      group: {
        type: "tag",
        name: ({ group }) => `${group}Controller`,
      },
      enum: { type: "asConst" },
      optionalType: "questionTokenAndUndefined",
    }),
  ],
})
```

## Notes

- Migration (v4 → v5): `enumType` / `enumTypeSuffix` / `enumKeyCasing` は `enum` の `type` / `typeSuffix` / `keyCasing` へ。`'asPascalConst'` は `{ type: 'asConst', constCasing: 'pascalCase' }`
- 生成されるリクエスト入力は `body` / `path` / `query` / `headers` を持つ `*Options`。プロパティは OpenAPI の名前を保持（`pet_id`、`X-Api-Key` など）
- 既定の enum は const-asserted オブジェクト + `*Key` ユニオン型。インライン enum 名は operation スコープ。開いた string ユニオンは `(string & {})` で補完候補を保持
- `output` オブジェクトを渡すと既定の `barrel: { type: 'named' }` が置き換わる（plugin-barrel.md 参照）
- `typeSuffix: ''` と `constCasing: 'pascalCase'` の組み合わせで const と型が同名 `PetStatus` に統合される
- `operations: 'export'` で operation ファイル名がスキーマファイル名と大文字小文字無視で衝突する場合は `Operation` 接尾辞が付く（operation `point` は `PointOperation.ts`、スキーマ `Point.ts` と共存）。`plugin-zod` / `plugin-faker` も同じ命名。`'inline'` はインライン source に対応した Kubb が必要。`resolver` に `param.cookies` と `response.headers` が追加された
- Migration (5.11 → 5.20): printer handlers that return TypeScript compiler nodes are deprecated and will be removed in the next major. They still work when `@kubb/parser-ts` and `typescript` 5 or 6 (or `@typescript/typescript6` next to TypeScript 7) are installed; without `@kubb/parser-ts` the build stops with an error. The macro helper is imported as `defineMacro` from `kubb/kit` (was `ast.defineMacro`)
- Source: https://kubb.dev/extensions/kubb-labs/plugin-ts/options （`@kubb/plugin-ts@5.5.1`、取得日 2026-11-14）
- カスタマイズ（Map schema types）は [ts-customization](../plugin-guides/ts-customization.md) を参照
