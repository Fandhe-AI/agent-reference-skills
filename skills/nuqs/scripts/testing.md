# Testing

nuqs を使ったコンポーネント・フック・パーサーのテスト設定とコマンド。

## テストアダプターのインポート

```typescript
import { withNuqsTestingAdapter, NuqsTestingAdapter } from 'nuqs/adapters/testing'
```

## フックのテスト（React Testing Library + renderHook）

`renderHook` の `wrapper` に `withNuqsTestingAdapter` を渡す。

```typescript
import { renderHook } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'

const { result } = renderHook(() => useTheHookToTest(), {
  wrapper: withNuqsTestingAdapter({
    searchParams: { count: '42' },
  }),
})
```

## コンポーネントのテスト（Vitest + Testing Library）

`render` の `wrapper` に `withNuqsTestingAdapter` を渡し、URL 更新を `onUrlUpdate` で検証する。

```typescript
import { render } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { vi } from 'vitest'

const onUrlUpdate = vi.fn()

render(<CounterButton />, {
  wrapper: withNuqsTestingAdapter({
    searchParams: '?count=42',
    onUrlUpdate,
  }),
})
```

## クエリ文字列形式での初期パラメーター指定

```typescript
withNuqsTestingAdapter({ searchParams: '?q=hello&limit=10' })
```

## URLSearchParams 形式での初期パラメーター指定

```typescript
withNuqsTestingAdapter({ searchParams: new URLSearchParams('?q=hello&limit=10') })
```

## オブジェクト形式での初期パラメーター指定

```typescript
withNuqsTestingAdapter({ searchParams: { q: 'hello', limit: '10' } })
```

## カスタムパーサーのテスト

パーサーの双射性（parse ↔ serialize の往復整合）を検証するユーティリティを使う。

```typescript
import {
  isParserBijective,
  testParseThenSerialize,
  testSerializeThenParse,
} from 'nuqs/testing'

expect(isParserBijective(parseAsInteger, '42', 42)).toBe(true)
expect(testParseThenSerialize(parseAsInteger, '42')).toBe(true)
expect(testSerializeThenParse(parseAsInteger, 42)).toBe(true)
```

## Jest の ESM 対応設定

`jest.config.ts` に以下を追加する。

```typescript
const config: Config = {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {},
}
```

`package.json` の test スクリプト（Windows は `cross-env` を使う）:

```json
{
  "scripts": {
    "test": "NODE_OPTIONS=\"$NODE_OPTIONS --experimental-vm-modules\" jest"
  }
}
```
