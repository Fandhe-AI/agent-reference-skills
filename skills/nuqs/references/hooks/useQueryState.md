# useQueryState

`React.useState` のドロップイン置換。単一の URL クエリパラメータと React state を同期する。

## シグネチャ

```tsx
import { useQueryState } from 'nuqs'

const [value, setValue] = useQueryState(key, parserOrOptions?)
```

| 引数 | 型 | 説明 |
|------|------|------|
| `key` | `string` | クエリパラメータ名 |
| `parserOrOptions` | `Parser \| Options` | パーサーまたはオプション（省略可） |

## 戻り値

`[value, setValue]` — React.useState と同じタプル形式。

- `value`: クエリパラメータの現在値（デフォルトでは `string | null`）
- `setValue`: 状態更新関数。`Promise<URLSearchParams>` を返す

## URL と値の対応

| URL | value | 備考 |
|-----|-------|------|
| `/` | `null` | キーが URL に存在しない |
| `/?name=` | `''` | 空文字列 |
| `/?name=foo` | `'foo'` | 文字列値 |
| `/?name=2` | `'2'` | デフォルトでは常に string。パーサーで型変換する |

## 基本例

```tsx
'use client'

import { useQueryState } from 'nuqs'

export function Demo() {
  const [name, setName] = useQueryState('name')
  return (
    <>
      <input value={name || ''} onChange={e => setName(e.target.value)} />
      <button onClick={() => setName(null)}>Clear</button>
      <p>Hello, {name || 'anonymous visitor'}!</p>
    </>
  )
}
```

## パーサーを使った型付き state

```tsx
import { useQueryState, parseAsInteger } from 'nuqs'

const [count, setCount] = useQueryState('count', parseAsInteger)
// count: number | null
```

## デフォルト値

`null` の代わりにデフォルト値を返す。デフォルト値がある場合、戻り値の型から `null` が除去される。

```tsx
// .withDefault() メソッド（推奨）
const [count, setCount] = useQueryState('count', parseAsInteger.withDefault(0))
// count: number（null にならない）

// options オブジェクト
const [search] = useQueryState('search', { defaultValue: '' })
// search: string（null にならない）
```

## setState の動作

```tsx
// 値をセット
setName('foo')          // → ?name=foo

// null をセットするとキーを URL から削除
setName(null)           // → / （キー削除）

// 関数型アップデート
setCount(prev => prev + 1)

// call-level オプション
setName('bar', { history: 'push', scroll: true })

// Promise を返す
const searchParams = await setName('baz')
```

## 注意事項

- `null` をセットするとクエリパラメータが URL から削除される
- デフォルト値は React 内部でのみ使用される。URL には書き込まれない（`clearOnDefault: true` の場合）
- パーサーが無効な値を受け取った場合、デフォルト値（または `null`）が返される

## 関連

- [useQueryStates](./useQueryStates.md)
- [パーサー](../parsers/README.md)
- [オプション](../options/README.md)
