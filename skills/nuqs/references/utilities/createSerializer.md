# createSerializer

`<Link>` コンポーネント等に埋め込む URL 文字列を、パーサー定義から生成する。v1.16.0+。

## シグネチャ

```ts
import { createSerializer } from 'nuqs/server' // クライアントでは 'nuqs' からも可

const serialize = createSerializer(searchParams, options?)
```

| 引数 | 型 | 説明 |
|------|------|------|
| `searchParams` | `Record<string, Parser>` | キーとパーサーのマッピング |
| `options` | `object` | 省略可 |
| `options.urlKeys` | `Record<string, string>` | 変数名と URL キー名のマッピング |
| `options.processUrlSearchParams` | `(search: URLSearchParams) => URLSearchParams` | シリアライズ前に search params を加工。v2.6.0+ |

`serialize` 関数は `(base?, values) => string` の形で呼び出す:

| 引数 | 型 | 説明 |
|------|------|------|
| `base` | `string \| URLSearchParams \| URL` | 省略可。既存の search params に追記/上書きする対象 |
| `values` | `Partial<Record<keyof searchParams, T \| null>>` | 各キーの値。`undefined` は省略、`null` は削除 |

## 例

```ts
import {
  createSerializer,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server'

const searchParams = {
  search: parseAsString,
  limit: parseAsInteger,
  from: parseAsIsoDateTime,
  to: parseAsIsoDateTime,
  sortBy: parseAsStringLiteral(['asc', 'desc'])
}

const serialize = createSerializer(searchParams)

serialize({
  search: 'foo bar',
  limit: 10,
  from: new Date('2024-01-01'),
  // `to` を省略 → 追加されない
  sortBy: null // null も追加されない
})
// ?search=foo+bar&limit=10&from=2024-01-01T00:00:00.000Z
```

## Base パラメータ

`serialize` は既存の search params に対して追記/上書きする base を受け付ける:

```ts
serialize('/path?baz=qux', { foo: 'bar' }) // /path?baz=qux&foo=bar

const search = new URLSearchParams('?baz=qux')
serialize(search, { foo: 'bar' }) // ?baz=qux&foo=bar

const url = new URL('https://example.com/path?baz=qux')
serialize(url, { foo: 'bar' }) // https://example.com/path?baz=qux&foo=bar

// null を渡すと既存値を削除
serialize('?remove=me', { foo: 'bar', remove: null }) // ?foo=bar
```

## 短縮キー（urlKeys）

`useQueryStates` と同様、`urlKeys` で変数名を短い URL キーにマップできる:

```ts
const serialize = createSerializer(
  {
    latitude: parseAsFloat,
    longitude: parseAsFloat,
    zoomLevel: parseAsInteger
  },
  {
    urlKeys: {
      latitude: 'lat',
      longitude: 'lng',
      zoomLevel: 'z'
    }
  }
)

serialize({ latitude: 45.18, longitude: 5.72, zoomLevel: 12 })
// ?lat=45.18&lng=5.72&z=12
```

## processUrlSearchParams（v2.6.0+）

`<NuqsAdapter>` の `processUrlSearchParams` と同様、シリアライズ前に search params を加工できる。SEO 向けの正規 URL（キーのアルファベット順ソート等）に有用:

```ts
const serialize = createSerializer(
  { a: parseAsInteger, z: parseAsInteger },
  {
    processUrlSearchParams: (search) => {
      search.sort()
      return search
    }
  }
)

serialize('?foo=bar', { a: 1, z: 1 })
// ?a=1&foo=bar&z=1（マージ後にソート）
```

## 関連

- [Server-side Usage](../server/server-side.md)
- [ビルトインパーサー](../parsers/built-in.md)
- [Options](../options/options.md)
