# plugin-zod: Customization

生成される schema をカスタマイズする。inferred 型に prefix を付ける、Zod validator を変える、カスタムのリクエスト型をエンコードする。

## Signature / Usage

[Zod plugin の設定例](https://kubb.dev/extensions/kubb-labs/plugin-zod#example)から始め、その `pluginZod()` に以下を適用する。

### Prefix inferred types

`inferred` を有効にし `resolver.schema.typeName` を上書きする:

```typescript
import { pluginZod } from '@kubb/plugin-zod'

pluginZod({
  inferred: true,
  resolver: {
    schema: {
      typeName(name) {
        return 'Api' + name
      },
    },
  },
})
```

型は `ApiPet` になり、schema 定数は `petSchema` のまま。コールバックは casing 済みの型名を受け取るため追加の casing ヘルパーは不要。

### Use numbers for int64 fields

`bigint` printer handler を置き換えて `int64` を `z.int()` で検証する:

```typescript
pluginZod({
  printer: {
    nodes: {
      bigint() {
        return 'z.int()'
      },
    },
  },
})
```

### Encode custom types

方向を認識する printer が、レスポンス値をデコードしリクエスト値をエンコードする。ISO 時刻文字列を `Temporal.PlainTime` に変換する例:

```typescript
import { pluginZod, type PrinterZodNodes } from '@kubb/plugin-zod'

const nodes: PrinterZodNodes = {
  time() {
    return this.options.direction === 'encode'
      ? 'z.instanceof(Temporal.PlainTime).transform((value) => value.toString())'
      : 'z.iso.time().transform((value) => Temporal.PlainTime.from(value))'
  },
}

pluginZod({ inferred: true, printer: { nodes } })
```

generator は `$ref` を介する場合も含め、レスポンス用と入力用の別 schema を出力する:

```typescript
// src/gen/zod/slotSchema.ts
export const slotSchema = z.object({
  startsAt: z.iso.time().transform((value) => Temporal.PlainTime.from(value)),
})

export const slotInputSchema = z.object({
  startsAt: z.instanceof(Temporal.PlainTime).transform((value) => value.toString()),
})
```

### Import a custom codec

printer node を上書きし、`this.import` でパッケージ import を登録する。例: `int64` に自パッケージの `myCodec.uint64()` を使う:

```typescript
import { ast } from 'kubb/kit'
import { pluginZod } from '@kubb/plugin-zod'

pluginZod({
  printer: {
    nodes: {
      bigint() {
        this.import(ast.factory.createImport({
          name: ['myCodec'],
          path: 'my-codec/zod',
        }))
        return 'myCodec.uint64()'
      },
    },
  },
})
```

## Options / Props

`@kubb/plugin-zod` は OpenAPI の型 / format を Zod v4 に次のとおり対応付ける:

| OpenAPI type and format | Zod | Zod Mini | Notes |
| --- | --- | --- | --- |
| `integer` | `z.int()` | `z.int()` | `coercion.numbers` 有効時は `z.coerce.number().int()` |
| `integer`, `format: int32` | `z.int32()` | `z.int32()` | 32-bit signed integer |
| `integer`, `format: uint32` | `z.uint32()` | `z.uint32()` | 32-bit unsigned integer |
| `integer`, `format: int64` | `z.bigint()` | `z.bigint()` | 64-bit integer |
| `string`, `format: byte` / `base64` | `z.base64()` | `z.base64()` | Base64 string validation |
| `string`, `format: base64url` | `z.base64url()` | `z.base64url()` | URL-safe base64 string validation |
| `string`, `format: jwt` | `z.jwt()` | `z.jwt()` | JSON Web Token format |
| `string`, `format: ulid` | `z.ulid()` | `z.ulid()` | ULID format |
| `string`, `format: iban` | `z.iban()` | `z.iban()` | International Bank Account Number |
| `string`, `format: duration` | `z.iso.duration()` | `z.iso.duration()` | ISO 8601 duration format |
| `string`, `format: uuid` | `z.uuid()` (or `z.guid()`) | `z.uuid()` (or `z.guid()`) | `guidType` で設定 |
| `string`, `format: email` | `z.email()` | `z.email()` | Email format |
| `string`, `format: uri` / `url` | `z.url()` | `z.url()` | URL format |
| `string`, `format: ipv4` / `ipv6` | `z.ipv4()` / `z.ipv6()` | `z.ipv4()` / `z.ipv6()` | IP address format |
| `string`, `format: date` | `z.iso.date()` | `z.iso.date()` | ISO 8601 date |
| `string`, `format: date-time` | `z.iso.datetime()` | `z.string()` | ISO 8601 date-time |
| `string`, `format: time` | `z.iso.time()` | `z.iso.time()` | ISO 8601 time |
| `object`, `additionalProperties: <schema>` | `z.record(z.string(), schema)` | `z.record(z.string(), schema)` | 固定プロパティなしの辞書 |
| `object`, `additionalProperties: true` | `z.looseObject(shape)` | `z.looseObject(shape)` | 余分なキーを許す open / passthrough object |
| `object`, `propertyNames: <schema>` | `z.record(keySchema, schema)` | `z.record(keySchema, schema)` | キー schema（pattern / format 等）を検証する動的 map |
| `object`, `propertyNames: <enum>` | `z.partialRecord(enumSchema, schema)` | `z.partialRecord(enumSchema, schema)` | enum キーは欠落可 |

## Notes

- `integer` handler は `int32` フィールドを別に制御する。全プラグイン横断で整数表現を変えるには adapter の [`integerType`](https://kubb.dev/extensions/kubb-labs/adapter-oas/options#integertype) を使う
- description の削除は plugin-ts ページの description 削除 macro を `pluginZod({ macros: [dropDescriptions] })` で使う。生成 schema から description メタデータが消える
- `Temporal` を提供する runtime を使うか、生成 import や banner で polyfill を追加する。OpenAPI の format に合わせる（`time` / `date` / `date-time` は `time` / `date` / `datetime` handler）
- 原文 IMPORTANT: client 型がこれらの変換に従うよう、`inferred: true` を `pluginTs` なしで使う。`pluginTs` の型は wire format を表す
- 組み込みの日付変換は adapter に `dateType: 'date'` を設定する。生成レスポンス schema は ISO datetime を `Date` に変換し、リクエスト schema は `toISOString()` で戻す
- カスタム codec の import では `root` を未設定のままにするとパッケージ specifier が保たれる。`root` を設定すると相対ファイルパスに書き換わる。生成ファイルは `my-codec/zod` から `myCodec` を import する
- OpenAPI 3.1 の `propertyNames` は辞書キーを検証する。open なキー schema は `z.record(keySchema, valueSchema)`（regex / UUID / 長さ制約を含む）、enum・literal・enum の union のような closed なキーは `z.partialRecord` を使い、存在するキーだけ検証する。推論型は `Partial<Record<Keys, Value>>`
- `patternProperties` はキーの regex パターンを alternation にまとめ `z.record(z.string().regex(...), valueSchema)` を出力する。Zod Mini はキー schema に `z.string().check(z.regex(...))` を使う
- 固定プロパティなしの `additionalProperties` schema は辞書を、固定プロパティがあれば宣言形を保つため `.catchall(valueSchema)` を生成する。`additionalProperties: true` は `z.looseObject(shape)`
- Source: https://kubb.dev/extensions/kubb-labs/plugin-zod/guides/customization （`@kubb/plugin-zod@5.4.12`）

## Related

- [plugin-zod](../plugins/plugin-zod.md)
- [ts-customization](./ts-customization.md)
