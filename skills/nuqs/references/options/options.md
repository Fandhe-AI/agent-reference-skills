# Options

nuqs の URL 更新動作を制御するオプション。フックレベル、パーサーレベル、呼び出しレベルで設定可能。

## Signature / Usage

デフォルト動作:

- クライアントのみ更新（サーバーリクエストなし）— `shallow: true`
- 履歴エントリを置換 — `history: 'replace'`
- スクロールなし — `scroll: false`
- ブラウザ適応スロットル（50ms; Safari 120ms）

```tsx
// パーサーのビルダーパターン
const [state, setState] = useQueryState(
  'foo',
  parseAsString.withOptions({ history: 'push' })
)

// call-level（フック/パーサーのオプションを上書き）
setState('bar', { scroll: true })
```

オプションの優先順位（高い順）:

1. **Call-level**: `setState('value', { history: 'push' })` — 最高優先
2. **Hook/Parser-level**: `parseAsString.withOptions({ ... })`
3. **Adapter defaults**: `<NuqsAdapter defaultOptions={{...}}>` — 最低優先

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `history` | `'replace' \| 'push'` | `'replace'` | `'replace'` は更新を単一の履歴エントリに圧縮、`'push'` は更新ごとに新しい履歴エントリを作成 |
| `shallow` | `boolean` | `true` | `true` はクライアントのみ更新、`false` はサーバーに通知（loader/RSC を再実行） |
| `scroll` | `boolean` | `false` | `true` で更新時にページ上部へスクロール |
| `limitUrlUpdates` | `throttle(ms) \| debounce(ms) \| defaultRateLimit` | ブラウザ適応スロットル（50ms; Safari 120ms; 旧 Safari 320ms） | URL 更新とサーバーリクエストのレート制限。hooks が返す state 自体は常に即座に更新される |
| `clearOnDefault` | `boolean` | `true`（v2.0.0 で `false` → `true` に変更） | `true` は state がデフォルト値と等しい場合にキーを URL から削除、`false` はデフォルト値でもキーを保持 |
| `startTransition` | `React.startTransition` 関数 | — | `shallow: false` 必須。サーバー再レンダリング（RSC）をトランジションでラップしローディング状態を取得 |

### `history`

`'replace'`: 更新を単一の履歴エントリに圧縮（git squash のように）。
`'push'`: 更新ごとに新しい履歴エントリを作成。ブラウザの戻るボタンで状態変更を戻れる。

> **注意**: 戻るボタンの動作を壊すと UX が悪化する。`'push'` はタブ切替やモーダルなどナビゲーション的な体験にのみ使用する。

### `shallow`

`true`: クライアントのみの更新。ネットワークリクエストなし。
`false`: サーバーに通知。SSR フレームワークの loader/RSC を再実行する。

React Router / Remix では `shallow: false` で loader が再実行される。

> **注意**: Remix v2 は EOL となり、`nuqs/adapters/remix` は nuqs@3.0.0 で削除予定。React Router v6 も EOL となり `nuqs/adapters/react-router/v6`（および無指定の `nuqs/adapters/react-router`）は nuqs@3.0.0 で削除予定。React Router v7 / v8 への移行を推奨。

#### React Router での補足: `useOptimisticSearchParams`

React Router の `useSearchParams` は shallow 更新を反映しない。代わりに nuqs が提供する `useOptimisticSearchParams` を使用する:

```tsx
// React Router v8 の場合
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v8'
// React Router v7 の場合
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v7'
// React Router v6 の場合（EOL、nuqs@3.0.0 で削除予定）
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v6'

const searchParams = useOptimisticSearchParams()
// loader 実行を待たずに最新のパラメータを読める（read-only）
```

### `scroll`

`true`: 更新時にページ上部へスクロール。
`false`: スクロール位置を維持。

### `limitUrlUpdates`（URL 更新のレート制限）

hooks が返す state は常に即座に更新される。レート制限されるのは URL の書き換えとサーバーリクエストのみ。

#### Throttle

最初の更新を即座に発行し、以降は一定間隔でバッチ処理:

```tsx
import { throttle } from 'nuqs'

useQueryState('foo', {
  shallow: false,
  limitUrlUpdates: throttle(1000),
})
```

#### Debounce

値の変更が止まるまで URL 更新を遅延。検索入力やスライダーに最適:

```tsx
import { debounce, defaultRateLimit } from 'nuqs'

const [search, setSearch] = useQueryState(
  'q',
  parseAsString.withDefault('').withOptions({ shallow: false })
)

<input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value, {
      limitUrlUpdates: e.target.value === '' ? undefined : debounce(500),
    })
  }
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value) // Enter で即座に反映
    }
  }}
/>
```

#### デフォルトレート制限にリセット

```tsx
import { defaultRateLimit } from 'nuqs'

setState('bar', { limitUrlUpdates: defaultRateLimit })
```

- 50ms 未満の値は無視される
- `+Infinity` で URL 更新を無効化（hooks の state 同期は維持）

### `clearOnDefault`

`true`: state がデフォルト値と等しい場合、キーを URL から削除。
`false`: デフォルト値でもキーを URL に保持。

`===` 参照等価で比較。カスタムパーサーでは `eq` 関数を提供する:

```tsx
const dateParser = createParser({
  parse: (value: string) => new Date(value.slice(0, 10)),
  serialize: (date: Date) => date.toISOString().slice(0, 10),
  eq: (a: Date, b: Date) => a.getTime() === b.getTime(),
})
```

### `startTransition`

`shallow: false` が必須条件。

サーバー再レンダリング（RSC）をトランジションでラップし、ローディング状態を取得:

```tsx
const [isLoading, startTransition] = React.useTransition()
const [query, setQuery] = useQueryState(
  'query',
  parseAsString.withOptions({ startTransition, shallow: false })
)
```

> **注意**: nuqs v1 では `startTransition` を渡すと自動で `shallow: false` になった。v2+ では明示的に設定が必要。

### グローバルデフォルト（`<NuqsAdapter>` v2.5.0+）

```tsx
<NuqsAdapter
  defaultOptions={{
    shallow: false,
    scroll: true,
    clearOnDefault: false,
    limitUrlUpdates: throttle(250),
  }}
>
  {children}
</NuqsAdapter>
```

### `processUrlSearchParams`（v2.6.0+）

パラメータマージ後、URL 更新前に実行されるミドルウェア:

```tsx
<NuqsAdapter
  processUrlSearchParams={(search) => {
    search.sort() // キーをアルファベット順にソート
    return search
  }}
>
  {children}
</NuqsAdapter>
```

## Notes

- `throttleMs` は v2.5.0 で非推奨。`{ throttleMs: 100 }` → `{ limitUrlUpdates: throttle(100) }` に置換

## Related

- [useQueryState](../hooks/useQueryState.md)
- [useQueryStates](../hooks/useQueryStates.md)
