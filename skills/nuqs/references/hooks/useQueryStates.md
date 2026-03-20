# useQueryStates

複数のクエリパラメータをアトミックに読み書きする。同一イベントループ内の更新はバッチ処理され、1回の URL 更新にまとめられる。

## シグネチャ

```tsx
import { useQueryStates } from 'nuqs'

const [state, setState] = useQueryStates(keyMap, options?)
```

| 引数 | 型 | 説明 |
|------|------|------|
| `keyMap` | `Record<string, Parser>` | キーとパーサーのマッピング |
| `options` | `Options` | グローバルオプション（省略可） |

## 戻り値

`[state, setState]`

- `state`: 各キーの現在値を持つオブジェクト
- `setState`: 全部または一部のキーを更新する関数。`Promise<URLSearchParams>` を返す

## 基本例

```tsx
import { useQueryStates, parseAsFloat } from 'nuqs'

const [coordinates, setCoordinates] = useQueryStates(
  {
    lat: parseAsFloat.withDefault(45.18),
    lng: parseAsFloat.withDefault(5.72),
  },
  {
    history: 'push',
  }
)

const { lat, lng } = coordinates

// 一部のキーを更新
await setCoordinates({ lat: 42, lng: 12 })

// 全キーをクリア（管理外のパラメータは維持）
setCoordinates(null)
```

## バッチ処理

同一イベントループ内で複数の `useQueryState` setter を呼んだ場合も自動的にバッチされる:

```tsx
setLat(Math.random() * 180 - 90)
setLng(Math.random() * 360 - 180)
// 2つの更新が1つの history エントリにまとめられる
```

setter は `Promise<URLSearchParams>` を返す。同一ティック内の呼び出しは同じ Promise 参照を返す。

## オプション優先順位

高い順:

1. **Call-level**: `setState({ lat: 42 }, { shallow: false })`
2. **Parser-level**: `parseAsFloat.withOptions({ shallow: false })`
3. **Hook-level**: `useQueryStates({...}, { history: 'push' })`

## URL Key Remapping (`urlKeys`)

コード内の変数名と URL のキー名を分離する:

```tsx
const [{ latitude, longitude }, setCoordinates] = useQueryStates(
  {
    latitude: parseAsFloat.withDefault(45.18),
    longitude: parseAsFloat.withDefault(5.72),
  },
  {
    urlKeys: {
      latitude: 'lat',
      longitude: 'lng',
    },
  }
)
// URL: ?lat=45.18&lng=5.72
// コード: latitude, longitude
```

`UrlKeys` 型ヘルパーで再利用可能な定義:

```tsx
import type { UrlKeys } from 'nuqs'

export const coordinatesParsers = {
  latitude: parseAsFloat.withDefault(45.18),
  longitude: parseAsFloat.withDefault(5.72),
}

export const coordinatesUrlKeys: UrlKeys<typeof coordinatesParsers> = {
  latitude: 'lat',
  longitude: 'lng',
}
```

## 注意事項

- `urlKeys` は v1.20.0 で導入。`UrlKeys` 型ヘルパーは v2.3.0 で導入
- TanStack Router の `validateSearch` との併用時は `urlKeys` 非対応

## 関連

- [useQueryState](./useQueryState.md)
- [オプション](../options/README.md)
