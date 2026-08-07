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
| `output` | `Output` | `{ path: 'types' }` | 出力先パス |
| `group` | `Group` | — | tag / path によるフォルダー分割（`output.mode: 'directory'` 必須） |
| `enum` | `EnumOptions` | `{ type: 'asConst', … }` | enum の表現形式・ケーシングをまとめて指定 |
| `syntaxType` | `'type' \| 'interface'` | `'type'` | オブジェクトスキーマを type alias か interface で出力 |
| `optionalType` | `'questionToken' \| 'undefined' \| 'questionTokenAndUndefined'` | `'questionToken'` | オプショナルフィールドの表記 |
| `arrayType` | `'array' \| 'generic'` | `'array'` | 配列構文（`Type[]` vs `Array<Type>`） |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverTs>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterTsNodes }` | — | スキーマ種別ごとのハンドラー差し替え |

## 設定例

```typescript
import { defineConfig } from "kubb/config"
import { pluginTs } from "@kubb/plugin-ts"

export default defineConfig({
  input: { path: "./petStore.yaml" },
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
