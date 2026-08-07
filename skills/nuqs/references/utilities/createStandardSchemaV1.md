# createStandardSchemaV1

パーサー定義から [Standard Schema](https://standardschema.dev) 準拠のバリデータを生成する。外部データソースの検証や、他ツールへの型推論の受け渡しに使う。v2.5.0+。

## シグネチャ

```ts
import { createStandardSchemaV1 } from 'nuqs' // または 'nuqs/server'

const validator = createStandardSchemaV1(searchParams, options?)
```

| 引数 | 型 | 説明 |
|------|------|------|
| `searchParams` | `Record<string, Parser>` | キーとパーサーのマッピング |
| `options` | `object` | 省略可 |
| `options.partialOutput` | `boolean` | 出力の各プロパティを optional 扱いにする。TanStack Router 連携で使用 |

## 例

```ts
import {
  createStandardSchemaV1,
  parseAsInteger,
  parseAsString,
} from 'nuqs'

// 1. 通常どおり search params を定義
export const searchParams = {
  searchTerm: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10)
}

// 2. Standard Schema 準拠のバリデータを作成
export const validateSearchParams = createStandardSchemaV1(searchParams)

// 3. tRPC 等の他ツールで使用
router({
  search: publicProcedure.input(validateSearchParams).query(/* ... */)
})
```

## TanStack Router との連携（validateSearch）

TanStack Router の `validateSearch` に Standard Schema バリデータを渡すと、nuqs の URL state への型安全なリンクが可能。nuqs は TSR とデフォルト値の扱いが異なるため、出力を `Partial` にする `partialOutput: true` を指定する:

```tsx title="src/routes/search.tsx"
import { createStandardSchemaV1 } from 'nuqs'

const validateSearch = createStandardSchemaV1(searchParams, {
  partialOutput: true
})

export const Route = createFileRoute('/search')({
  validateSearch
})
```

## Notes

- TanStack Router 連携は experimental であり制約がある（詳細はアダプター側のドキュメントを参照）
- `partialOutput` を指定しない場合、TSR 側のデフォルト値戦略と不整合が起きうる

## 関連

- [Options](../options/options.md)
- [Server-side Usage](../server/server-side.md)
