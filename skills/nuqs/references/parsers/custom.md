# Custom Parsers

`createParser` でカスタムデータ型の URL パーサーを作成する。

## シグネチャ

```tsx
import { createParser } from 'nuqs'

const myParser = createParser<T>({
  parse(queryValue: string): T | null,
  serialize(value: T): string,
  eq?(a: T, b: T): boolean,
})
```

| プロパティ | 型 | 説明 |
|-----------|------|------|
| `parse` | `(query: string) => T \| null` | URL 文字列 → 型付き値。無効な場合 `null` を返す |
| `serialize` | `(value: T) => string` | 型付き値 → URL 文字列 |
| `eq` | `(a: T, b: T) => boolean` | カスタム等価比較。`clearOnDefault` で使用。非プリミティブ型では必須 |

## 例: Star Rating パーサー

```tsx
import { createParser } from 'nuqs'

const parseAsStarRating = createParser({
  parse(queryValue) {
    const inBetween = queryValue.split('★')
    const isValid = inBetween.length > 1 && inBetween.every(s => s === '')
    if (!isValid) return null
    return Math.min(5, inBetween.length - 1)
  },
  serialize(value) {
    return Array.from({ length: value }, () => '★').join('')
  },
})
```

## 等価関数 (`eq`)

オブジェクトや配列など、`===` で比較できない型のデフォルト値検出に必要:

```tsx
const parseAsSort = createParser({
  parse(query) {
    const [key = '', direction = ''] = query.split(':')
    return { id: key, desc: direction === 'desc' }
  },
  serialize(value) {
    return `${value.id}:${value.desc ? 'desc' : 'asc'}`
  },
  eq(a, b) {
    return a.id === b.id && a.desc === b.desc
  },
})
// ?sort=name:asc → { id: 'name', desc: false }
```

## Multi Parsers（繰り返しキー）

`createMultiParser` は繰り返しキー（`?tag=a&tag=b`）を扱う:

```tsx
import { createMultiParser } from 'nuqs'

const parseAsFilters = createMultiParser({
  parse(values: string[]) {
    // values は同一キーの全値の配列
    // パース結果を返す。無効なら null
  },
  serialize(value) {
    // string[] を返す
    return [...]
  },
})
```

- `SingleParser`: キーの最初の出現のみ処理（デフォルト）
- `MultiParser`: キーの全出現を処理

## 注意事項

- `parse` は無効な入力に対して `null` を返すこと。throw しない
- **Lossy serializer に注意**: シリアライザが精度を失う場合（例: `toFixed(4)`）、ページリロード時にデータが劣化する。URL がハイドレーション時の唯一の情報源であるため
- カスタムパーサーでも `.withDefault()` と `.withOptions()` のビルダーメソッドが使用可能

## 関連

- [ビルトインパーサー](./built-in.md)
- [オプション](../options/README.md)
