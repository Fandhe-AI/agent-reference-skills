# @kubb/plugin-zod

OpenAPI スキーマから Zod バリデーションスキーマを生成するプラグイン。Zod v3/v4 対応。

## インストール

```bash
npm install --save-dev @kubb/plugin-zod
```

## 設定オプション

### output

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.path` | `string` | `'zod'` | 出力先パス |
| `output.barrelType` | `'all' \| 'named' \| 'propagate' \| false` | `'named'` | バレルファイル制御 |
| `output.banner` / `output.footer` | `string \| (oas) => string` | — | ファイルコメント |
| `output.override` | `boolean` | `false` | 既存ファイル上書き |

### Zod 固有オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `version` | `'3' \| '4'` | `'3'` | Zod バージョン |
| `importPath` | `string` | `'zod'` | Zod インポートパス |
| `typed` | `boolean` | `false` | TypeScript 型アノテーション有効化（@kubb/plugin-ts 必要） |
| `inferred` | `boolean` | `false` | `z.infer` で推論型を返す |
| `mini` | `boolean` | `false` | Zod Mini 機能 API（v4+、ベータ） |
| `guidType` | `'uuid' \| 'guid'` | `'uuid'` | UUID バリデーター（v4 のみ） |

### データ型オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `dateType` | `false \| 'string' \| 'stringOffset' \| 'stringLocal' \| 'date'` | `'string'` | 日付ハンドリング |
| `unknownType` | `'any' \| 'unknown' \| 'void'` | `'any'` | 不明な型のフォールバック |
| `emptySchemaType` | `'any' \| 'unknown' \| 'void'` | `unknownType` の値 | 空スキーマの型 |
| `coercion` | `boolean \| {dates?, strings?, numbers?}` | `false` | `z.coerce` の有効化 |

### その他

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `operations` | `boolean` | `false` | オペレーション関連スキーマ生成 |
| `mapper` | `Record<string, string>` | — | カスタム型マッピング |
| `contentType` | `'application/json' \| string` | — | コンテンツタイプ |
| `group.type` | `'tag'` | — | タグによるグループ化 |
| `include` / `exclude` | `Array<{type, pattern}>` | — | フィルタリング |
| `override` | `Array<{type, pattern, options}>` | — | 条件付きオーバーライド |
| `transformers.name` | `(name, type?) => string` | — | 名前カスタマイズ |
| `transformers.schema` | `(props, defaults) => Schema[]` | — | スキーマ生成カスタマイズ |
| `wrapOutput` | `({output, schema}) => string` | — | 生成スキーマの後処理 |

### dateType の例

```typescript
// false: z.string()
// 'string': z.string().datetime()
// 'stringOffset': z.string().datetime({ offset: true })
// 'stringLocal': z.string().datetime({ local: true })
// 'date': z.date()
```

### coercion の例

```typescript
// true: z.coerce.string(), z.coerce.date(), z.coerce.number()
// { numbers: true, strings: false }: z.string(), z.coerce.number()
```

### mini モードの例（v4+、ベータ）

```typescript
import { z } from 'zod/mini'
z.optional(z.string())
z.nullable(z.number())
z.array(z.string()).check(z.minLength(1), z.maxLength(10))
```

## 設定例

```typescript
import { defineConfig } from "@kubb/core"
import { pluginOas } from "@kubb/plugin-oas"
import { pluginTs } from "@kubb/plugin-ts"
import { pluginZod } from "@kubb/plugin-zod"

export default defineConfig({
  input: { path: "./petStore.yaml" },
  output: { path: "./src/gen" },
  plugins: [
    pluginOas(),
    pluginTs(),
    pluginZod({
      output: { path: "./zod" },
      group: { type: "tag", name: ({ group }) => `${group}Schemas` },
      typed: true,
      dateType: "stringOffset",
      unknownType: "unknown",
      version: "4",
      wrapOutput: ({ output }) =>
        `${output}.openapi({ description: 'Custom' })`,
    }),
  ],
})
```
