# @kubb/plugin-ts

OpenAPI スキーマから TypeScript の型・インターフェースを生成するプラグイン。

## インストール

```bash
npm install --save-dev @kubb/plugin-ts
```

## 設定オプション

### output

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.path` | `string` | `'types'` | 出力先パス |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` | バレルファイル制御 |
| `output.banner` | `string \| (oas: Oas) => string` | — | ファイル先頭コメント |
| `output.footer` | `string \| (oas: Oas) => string` | — | ファイル末尾コメント |
| `output.override` | `boolean` | `false` | 既存ファイル上書き |

### 型生成オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `syntaxType` | `'type' \| 'interface'` | `'type'` | type alias か interface か |
| `enumType` | `'enum' \| 'asConst' \| 'asPascalConst' \| 'constEnum' \| 'literal' \| 'inlineLiteral'` | `'asConst'` | enum の表現形式（v5 で `inlineLiteral` がデフォルト化） |
| `enumSuffix` | `string` | `'enum'` | enum 名のサフィックス |
| `enumKeyCasing` | `'screamingSnakeCase' \| 'snakeCase' \| 'pascalCase' \| 'camelCase' \| 'none'` | `'none'` | enum キーのケーシング |

### データ型オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `dateType` | `'string' \| 'date'` | `'string'` | 日付フィールドの型 |
| `integerType` | `'number' \| 'bigint'` | `'bigint'` | int64 の型 |
| `unknownType` | `'any' \| 'unknown' \| 'void'` | `'any'` | 不明な型のフォールバック |
| `emptySchemaType` | `'any' \| 'unknown' \| 'void'` | `unknownType` の値 | 空スキーマの型 |
| `optionalType` | `'questionToken' \| 'undefined' \| 'questionTokenAndUndefined'` | `'questionToken'` | オプショナルフィールドの表記 |
| `arrayType` | `'array' \| 'generic'` | `'array'` | 配列構文（`Type[]` vs `Array<Type>`） |

### 詳細オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `contentType` | `'application/json' \| string` | — | コンテンツタイプ指定 |
| `paramsCasing` | `'camelcase'` | — | パラメータ名を camelCase に変換 |
| `group.type` | `'tag'` | — | タグによるファイルグループ化 |
| `group.name` | `(context) => string` | — | グループ名カスタマイズ |

### フィルタリング

| オプション | 型 | 説明 |
|-----------|-----|------|
| `include` | `Array<{type, pattern}>` | 特定タグ/operationId/path/method/contentType を含める |
| `exclude` | `Array<{type, pattern}>` | 特定タグ/operationId/path/method/contentType を除外 |
| `override` | `Array<{type, pattern, options}>` | 条件付きオプションオーバーライド |
| `transformers.name` | `(name, type?) => string` | 生成名のカスタマイズ |
| `generators` | `Generator[]` | カスタムジェネレーター |

## 設定例

```typescript
import { defineConfig } from "@kubb/core"
import { pluginOas } from "@kubb/plugin-oas"
import { pluginTs } from "@kubb/plugin-ts"

export default defineConfig({
  input: { path: "./petStore.yaml" },
  output: { path: "./src/gen" },
  plugins: [
    pluginOas(),
    pluginTs({
      output: { path: "./types" },
      exclude: [{ type: "tag", pattern: "store" }],
      group: {
        type: "tag",
        name: ({ group }) => `${group}Controller`,
      },
      enumType: "asConst",
      dateType: "date",
      unknownType: "unknown",
      optionalType: "questionTokenAndUndefined",
      paramsCasing: "camelcase",
    }),
  ],
})
```
