# Server-side Usage

サーバーサイドで URL クエリパラメータを型安全に解析する API。

## createLoader（v2.3.0+）

型安全なサーバーサイドパラメータ解析。パーサー定義を共有して、クライアントとサーバーで一貫した型を使用する。

### シグネチャ

```tsx
import { createLoader } from 'nuqs/server'

const loadSearchParams = createLoader(keyMap)
```

### 基本例

```tsx
import { parseAsFloat, parseAsString, createLoader } from 'nuqs/server'

// パーサー定義（クライアントと共有）
export const coordinatesSearchParams = {
  latitude: parseAsFloat.withDefault(0),
  longitude: parseAsFloat.withDefault(0),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)
```

### フレームワーク別の使い方

**React Router / Remix:**

```tsx
// loader 内
export async function loader({ request }: LoaderFunctionArgs) {
  const { latitude, longitude } = loadSearchParams(request)
  // または
  const { latitude, longitude } = loadSearchParams(request.url)
  return { latitude, longitude }
}
```

**Next.js App Router:**

```tsx
export default async function Page({ searchParams }) {
  const { latitude, longitude } = await loadSearchParams(searchParams)
  return <Map lat={latitude} lng={longitude} />
}
```

### 受け付ける入力型

- 完全修飾 URL 文字列
- クエリ文字列（`?lat=45&lng=5`）
- `URL` オブジェクト
- `URLSearchParams` オブジェクト
- `Request` オブジェクト
- `Record<string, string | string[] | undefined>`
- 上記いずれかの `Promise`

### Strict Mode（v2.5.0+）

デフォルトでは無効な値はデフォルト値または `null` を返す。strict mode ではエラーを throw:

```tsx
loadSearchParams('?count=banana', { strict: true })
// Throws: [nuqs] Error while parsing query `banana` for key `count`
```

## createSearchParamsCache

深くネストされたサーバーコンポーネントで props drilling なしにパラメータにアクセスする。

> **注意**: この API は React の `cache` 関数に基づいており、**主に Next.js App Router のサーバーコンポーネント向け**。React Router / Remix では `createLoader` を使用する。

### シグネチャ

```tsx
import { createSearchParamsCache } from 'nuqs/server'

const searchParamsCache = createSearchParamsCache(keyMap)
```

### 基本例

```tsx
import { parseAsString, parseAsInteger, createSearchParamsCache } from 'nuqs/server'

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10),
})
```

### 使い方（Next.js App Router）

```tsx
// ページコンポーネントで .parse() を呼ぶ
export default async function Page({ searchParams }) {
  searchParamsCache.parse(searchParams)

  return <Results />
}

// 子コンポーネントで .get() または .all() でアクセス
function Results() {
  const q = searchParamsCache.get('q')
  const maxResults = searchParamsCache.get('maxResults')
  // または
  const { q, maxResults } = searchParamsCache.all()
  return <div>...</div>
}
```

### メソッド

| メソッド | 説明 |
|---------|------|
| `.parse(searchParams)` | パラメータを解析してキャッシュに格納 |
| `.get(key)` | 単一キーの値を取得 |
| `.all()` | 全キーの値をオブジェクトで取得 |

## 注意事項

- `createSearchParamsCache` は React の `cache` 関数に基づく。**現在のページレンダリング内でのみ有効**。Next.js App Router のサーバーコンポーネント専用
- React Router / Remix では `createSearchParamsCache` ではなく `createLoader` を loader 関数内で使い、`request` または `request.url` を渡す
- Loader はデータの**バリデーション**を行わない。JSON オブジェクトや特定の制約には Zod 等のスキーマバリデーションを併用する

## 関連

- [ビルトインパーサー](../parsers/built-in.md)
- [オプション](../options/README.md)
