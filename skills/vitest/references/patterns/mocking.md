# モックパターン

## 基本: vi.fn() でモック関数を作成

```ts
const handler = vi.fn()
handler('event')
expect(handler).toHaveBeenCalledWith('event')
expect(handler).toHaveBeenCalledTimes(1)
```

## 戻り値の設定

```ts
const fetchUser = vi.fn()
  .mockResolvedValueOnce({ id: 1, name: 'Alice' })
  .mockResolvedValueOnce({ id: 2, name: 'Bob' })
  .mockRejectedValue(new Error('not found'))

await fetchUser() // { id: 1, name: 'Alice' }
await fetchUser() // { id: 2, name: 'Bob' }
await fetchUser() // throws 'not found'
```

## モジュールモック: vi.mock()

### オートモック

```ts
vi.mock('./user-service')
// 全エクスポートが vi.fn() になる
import { getUser } from './user-service'
```

### ファクトリモック

```ts
vi.mock('./api', () => ({
  fetchData: vi.fn().mockResolvedValue([]),
  API_URL: 'https://test.example.com',
}))
```

### 部分モック（importOriginal）

一部のエクスポートだけをモックし、残りは本物を使う。

```ts
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return {
    ...actual,
    dangerousOp: vi.fn().mockReturnValue('safe'),
  }
})
```

### vi.hoisted() と組み合わせ

`vi.mock` ファクトリはホイストされるため、外部変数を直接参照できない。
`vi.hoisted()` を使ってホイストレベルで変数を定義する。

```ts
const mockFetch = vi.hoisted(() => vi.fn())

vi.mock('./api', () => ({
  fetchData: mockFetch,
}))

// テスト内で mockFetch を設定
mockFetch.mockResolvedValue({ data: [] })
```

### デフォルトエクスポートのモック

```ts
vi.mock('./config', () => ({
  default: { apiUrl: 'https://test.example.com' },
}))
```

## オブジェクトスパイ: vi.spyOn()

元の実装を保持しつつ呼び出しを追跡する。

```ts
const spy = vi.spyOn(console, 'warn')
doSomething()
expect(spy).toHaveBeenCalledWith(expect.stringContaining('deprecated'))
spy.mockRestore()
```

### 実装の差し替え

```ts
const spy = vi.spyOn(fs, 'readFileSync').mockReturnValue('mocked content')
// テスト後に復元
spy.mockRestore()
```

### getter/setter のスパイ

```ts
const obj = {
  get value() { return 42 },
  set value(v) { /* ... */ },
}

vi.spyOn(obj, 'value', 'get').mockReturnValue(100)
expect(obj.value).toBe(100)
```

## グローバル・環境変数のスタブ

```ts
// グローバル変数
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: [] }),
}))

// 環境変数
vi.stubEnv('NODE_ENV', 'test')
vi.stubEnv('API_KEY', 'test-key')

// afterEach で復元
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})
```

## モックのクリーンアップ

```ts
// beforeEach パターン
beforeEach(() => {
  vi.clearAllMocks()   // 履歴クリア（実装保持）
})

// または config で自動化
// vitest.config.ts: clearMocks: true / resetMocks: true / restoreMocks: true
```

| Config Option | Effect |
|---------------|--------|
| `clearMocks: true` | 各テスト前に `vi.clearAllMocks()` |
| `resetMocks: true` | 各テスト前に `vi.resetAllMocks()` |
| `restoreMocks: true` | 各テスト前に `vi.restoreAllMocks()` |

## 関連

- [Vi ユーティリティ](../api/vi.md)
- [Expect マッチャー](../api/expect.md)
- [非同期テストパターン](./async.md)
