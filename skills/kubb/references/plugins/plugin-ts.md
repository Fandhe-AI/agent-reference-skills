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
| `enum` | `{ type?, constCasing?, typeSuffix?, keyCasing? }` | `{ type: 'asConst', constCasing: 'camelCase', typeSuffix: 'Key', keyCasing: 'none' }` | enum の表現形式・ケーシングをまとめて指定。`type`: `'asConst' \| 'enum' \| 'constEnum' \| 'literal' \| 'inlineLiteral'`、`constCasing`: `'camelCase' \| 'pascalCase'`（`asConst` のみ）、`typeSuffix`: `asConst` の補助型の接尾辞（`''` で省略）、`keyCasing`: `'none' \| 'camelCase' \| 'pascalCase' \| 'snakeCase' \| 'screamingSnakeCase'` |
| `syntaxType` | `'type' \| 'interface'` | `'type'` | オブジェクトスキーマを type alias か interface で出力 |
| `optionalType` | `'questionToken' \| 'undefined' \| 'questionTokenAndUndefined'` | `'questionToken'` | オプショナルフィールドの表記 |
| `arrayType` | `'array' \| 'generic'` | `'array'` | 配列構文（`Type[]` vs `Array<Type>`） |
| `include` | `Array<Include>` | None | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | `[]` | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | `[]` | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverTs>` | `resolverTs` | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | `[]` | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterTsNodes }` | None | スキーマ種別ごとのハンドラー差し替え |

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
- カスタマイズ（Map schema types）は [ts-customization](../plugin-guides/ts-customization.md) を参照
