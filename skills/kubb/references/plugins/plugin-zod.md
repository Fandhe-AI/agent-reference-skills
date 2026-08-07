# @kubb/plugin-zod

OpenAPI スキーマから Zod バリデーションスキーマを生成するプラグイン。v5 で Zod v3 対応は廃止され、`zod@^4` 専用になった。

## インストール

```bash
npm install --save-dev @kubb/plugin-zod
```

## 設定オプション（v5）

`version` オプションは削除された（Zod v4 専用）。`typed` は `inferred: true` に置き換わり、`z.infer` エイリアスをエクスポートする形になった。`dateType` / `unknownType` / `emptySchemaType` は `adapterOas` に移動した。`mapper` / `operations` / `wrapOutput` は削除され、`resolver` / `macros` / `printer` に統合された。`inferred: true` で生成される型名には `Type` サフィックスが付く（例: `PetSchema` → `PetSchemaType`）。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `Output` | `{ path: 'zod', barrel: { type: 'named' } }` | 出力先パス・バレルエクスポート設定 |
| `group` | `Group` | — | tag / path によるフォルダー分割 |
| `importPath` | `string` | `mini ? 'zod/mini' : 'zod'` | `z` のインポート元モジュール |
| `inferred` | `boolean` | `false` | 各スキーマに `z.infer` エイリアスを付与 |
| `coercion` | `boolean \| { dates?: boolean, strings?: boolean, numbers?: boolean }` | `false` | `z.coerce` によるバリデーション前の型変換 |
| `guidType` | `'uuid' \| 'guid'` | `'uuid'` | `format: uuid` プロパティのバリデーター |
| `regexType` | `'literal' \| 'constructor'` | `'literal'` | OpenAPI `pattern` の表現方法 |
| `mini` | `boolean` | `false` | Zod Mini スキーマ生成 |
| `include` | `Array<Include>` | — | 対象を絞り込むフィルタリング |
| `exclude` | `Array<Exclude>` | — | 対象を除外するフィルタリング |
| `override` | `Array<Override>` | — | パターン単位のオプション上書き |
| `resolver` | `ResolverPatch<ResolverZod>` | — | 生成名・ファイルパスのカスタマイズ（旧 `transformers.name`） |
| `macros` | `Array<Macro>` | — | 出力前の AST ノード書き換え |
| `printer` | `{ nodes?: PrinterZodNodes \| PrinterZodMiniNodes }` | — | スキーマ種別ごとのハンドラー差し替え（旧 `wrapOutput`） |

### coercion の例

```typescript
// true: z.coerce.string(), z.coerce.date(), z.coerce.number()
// { numbers: true, strings: false }: z.string(), z.coerce.number()
```

### mini モードの例（ベータ）

```typescript
import { z } from 'zod/mini'
z.optional(z.string())
z.nullable(z.number())
z.array(z.string()).check(z.minLength(1), z.maxLength(10))
```

## 設定例

```typescript
import { defineConfig } from "kubb/config"
import { pluginTs } from "@kubb/plugin-ts"
import { pluginZod } from "@kubb/plugin-zod"

export default defineConfig({
  input: { path: "./petStore.yaml" },
  output: { path: "./src/gen" },
  plugins: [
    pluginTs(),
    pluginZod({
      output: { path: "./zod", mode: "directory" },
      group: { type: "tag", name: ({ group }) => `${group}Schemas` },
      inferred: true,
      coercion: { dates: true },
      guidType: "uuid",
    }),
  ],
})
```
