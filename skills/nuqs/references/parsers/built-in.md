# Built-in Parsers

nuqs が提供する全ビルトインパーサー。`useQueryState` の第2引数に渡して型安全な値変換を行う。

## 一覧

| Parser | 戻り値型 | 説明 |
|--------|---------|------|
| `parseAsString` | `string` | No-op パーサー。`.withDefault()` / `.withOptions()` ビルダー用 |
| `parseAsInteger` | `number` | `parseInt(value, 10)` で整数に変換 |
| `parseAsFloat` | `number` | `parseFloat(value)` で浮動小数点数に変換 |
| `parseAsHex` | `number` | 16進数エンコードされた整数 |
| `parseAsIndex` | `number` | 整数 + オフセット（URL では +1、parse 時に -1）。ページネーション用 |
| `parseAsBoolean` | `boolean` | 真偽値 |
| `parseAsStringLiteral(values)` | `'a' \| 'b' \| ...` | 文字列リテラルのユニオン型 |
| `parseAsNumberLiteral(values)` | `1 \| 2 \| ...` | 数値リテラルのユニオン型 |
| `parseAsStringEnum<E>(values)` | `E` | 文字列 enum |
| `parseAsIsoDateTime` | `Date` | ISO 8601 datetime |
| `parseAsIsoDate` | `Date` | ISO 8601 date（時刻 00:00:00 UTC）。v2.1.0+ |
| `parseAsTimestamp` | `Date` | Unix epoch からのミリ秒 |
| `parseAsArrayOf(parser, sep?)` | `T[]` | カンマ区切り配列（セパレータ変更可） |
| `parseAsNativeArrayOf(parser)` | `T[]` | ネイティブ URL 配列（`?k=a&k=b`）。v2.7.0+ |
| `parseAsJson(schema)` | `T` | JSON + オプションバリデーション |

すべて `nuqs` からインポート:

```tsx
import { parseAsString, parseAsInteger, parseAsFloat, /* ... */ } from 'nuqs'
```

## 使用例

### String

```tsx
import { parseAsString } from 'nuqs'

// No-op パーサー。.withDefault() / .withOptions() のビルダーパターンに有用
export const searchParsers = {
  q: parseAsString.withDefault('').withOptions({ shallow: false })
}
```

### Integer / Float

```tsx
import { parseAsInteger, parseAsFloat } from 'nuqs'

useQueryState('page', parseAsInteger.withDefault(0))
useQueryState('zoom', parseAsFloat.withDefault(1.0))
```

### Hex

```tsx
import { parseAsHex } from 'nuqs'

useQueryState('color', parseAsHex.withDefault(0x00))
```

### Index（ページネーション）

```tsx
import { parseAsIndex } from 'nuqs'

const [pageIndex] = useQueryState('page', parseAsIndex.withDefault(0))
// pageIndex 0 → ?page=1
// pageIndex 1 → ?page=2
```

### Boolean

```tsx
import { parseAsBoolean } from 'nuqs'

useQueryState('enabled', parseAsBoolean.withDefault(false))
```

### String Literals

```tsx
import { parseAsStringLiteral, type inferParserType } from 'nuqs'

const sortOrder = ['asc', 'desc'] as const
const parser = parseAsStringLiteral(sortOrder)
type SortOrder = inferParserType<typeof parser> // 'asc' | 'desc'
```

### Number Literals

```tsx
import { parseAsNumberLiteral } from 'nuqs'

const diceSides = [1, 2, 3, 4, 5, 6] as const
parseAsNumberLiteral(diceSides)
```

### String Enum

```tsx
import { parseAsStringEnum } from 'nuqs'

enum Direction {
  up = 'UP',
  down = 'DOWN',
  left = 'LEFT',
  right = 'RIGHT',
}
parseAsStringEnum<Direction>(Object.values(Direction))
// URL の値は enum の value: ?direction=UP
```

### Dates

```tsx
import { parseAsIsoDateTime, parseAsIsoDate, parseAsTimestamp } from 'nuqs'

useQueryState('at', parseAsIsoDateTime)      // ISO 8601 datetime
useQueryState('date', parseAsIsoDate)        // ISO 8601 date, 00:00 UTC (v2.1.0+)
useQueryState('ts', parseAsTimestamp)        // ms since Unix epoch
```

### Array（カンマ区切り）

```tsx
import { parseAsArrayOf, parseAsInteger } from 'nuqs'

parseAsArrayOf(parseAsInteger)              // ?ids=1,2,3
parseAsArrayOf(parseAsInteger, ';')         // カスタムセパレータ: ?ids=1;2;3
```

### Native Array（繰り返しキー）

```tsx
import { parseAsNativeArrayOf, parseAsInteger } from 'nuqs'

const [ids] = useQueryState('id', parseAsNativeArrayOf(parseAsInteger))
// ?id=1&id=2&id=3 → [1, 2, 3]
// ビルトインデフォルト [] — null を扱う必要なし
```

### JSON（スキーマバリデーション付き）

```tsx
import { parseAsJson } from 'nuqs'
import { z } from 'zod'

const schema = z.object({
  pkg: z.string(),
  version: z.number(),
  worksWith: z.array(z.string()),
})

const [data, setData] = useQueryState('json', parseAsJson(schema))
```

`parseAsJson` は以下を受け付ける:
- Standard Schema（Zod, ArkType, Valibot）
- カスタム同期バリデーション関数（throw または null を返す）

## ビルダーメソッド

すべてのパーサーで使用可能:

```tsx
// デフォルト値を設定（戻り値の型から null を除去）
parser.withDefault(value)

// オプションを設定
parser.withOptions({ history: 'push', shallow: false })

// チェーン可能
parseAsInteger.withDefault(0).withOptions({ history: 'push' })
```

## 注意事項

- `parseAsString` はバリデーションなしで任意の値を受け付ける。制約付き文字列には `parseAsStringLiteral` を使う
- `parseAsNativeArrayOf` はビルトインデフォルト `[]` を持つ。`.withDefault()` でカスタムデフォルトを設定可能
- Next.js App Router のサーバー + クライアント共有コードでは `nuqs/server` からインポートする（`'use client'` バンドルエラー回避）。他フレームワークでは `nuqs` と `nuqs/server` は互換

## 関連

- [カスタムパーサー](./custom.md)
- [useQueryState](../hooks/useQueryState.md)
