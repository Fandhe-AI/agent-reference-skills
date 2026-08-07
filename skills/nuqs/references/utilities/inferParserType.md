# inferParserType

パーサー（または、パーサーのマッピングオブジェクト）から返り値の TypeScript 型を取り出す型ヘルパー。v1.18.0+。

## シグネチャ

```ts
import { parseAsInteger, type inferParserType } from 'nuqs' // または 'nuqs/server'

type T = inferParserType<typeof parser>
```

## 例

単一パーサーからの推論:

```ts
import { parseAsInteger, type inferParserType } from 'nuqs'

const intNullable = parseAsInteger
const intNonNull = parseAsInteger.withDefault(0)

inferParserType<typeof intNullable> // number | null
inferParserType<typeof intNonNull> // number
```

パーサーのマッピングオブジェクト（`createLoader` や `useQueryStates` に渡すもの）からの推論:

```ts
import {
  parseAsBoolean,
  parseAsInteger,
  type inferParserType
} from 'nuqs'

const parsers = {
  a: parseAsInteger,
  b: parseAsBoolean.withDefault(false)
}

inferParserType<typeof parsers>
// { a: number | null, b: boolean }
```

## Notes

- `.withDefault()` を付けたパーサーは `null` を含まない型になる
- オブジェクトを渡した場合、各プロパティがそのパーサーの推論型に置き換わったオブジェクト型を返す

## 関連

- [Server-side Usage](../server/server-side.md)
- [ビルトインパーサー](../parsers/built-in.md)
