# Vi ユーティリティ

`vi` オブジェクトはモック、スパイ、タイマー、スタブの操作を提供する。

## 関数モック

### vi.fn()

呼び出し追跡付きのモック関数を作成する。

```ts
vi.fn<T extends Procedure>(implementation?: T): MockInstance<T>
```

```ts
const mockFn = vi.fn()
mockFn('hello')
expect(mockFn).toHaveBeenCalledWith('hello')

const greet = vi.fn((name: string) => `Hello, ${name}`)
expect(greet('Alice')).toBe('Hello, Alice')
```

#### モックインスタンスのメソッド

| Method | Description |
|--------|-------------|
| `mockReturnValue(val)` | 毎回 `val` を返す |
| `mockReturnValueOnce(val)` | 次の呼び出しのみ `val` を返す |
| `mockResolvedValue(val)` | `Promise.resolve(val)` を返す |
| `mockResolvedValueOnce(val)` | 次の呼び出しのみ resolved promise を返す |
| `mockRejectedValue(err)` | `Promise.reject(err)` を返す |
| `mockRejectedValueOnce(err)` | 次の呼び出しのみ rejected promise を返す |
| `mockImplementation(fn)` | 実装を差し替え |
| `mockImplementationOnce(fn)` | 次の呼び出しのみ差し替え |
| `mockClear()` | 呼び出し履歴をリセット（実装は保持） |
| `mockReset()` | 履歴 + 実装をリセット（`undefined` を返す） |
| `mockRestore()` | 元の実装を復元（`vi.spyOn` のみ有効） |

```ts
const fn = vi.fn()
  .mockReturnValueOnce('first')
  .mockReturnValue('default')

fn() // 'first'
fn() // 'default'
```

#### 呼び出し情報

```ts
fn.mock.calls       // [[arg1, arg2], [arg1], ...]
fn.mock.results      // [{ type: 'return', value: ... }, ...]
fn.mock.instances    // new 呼び出し時のインスタンス
fn.mock.lastCall     // 最後の呼び出しの引数
```

### vi.isMockFunction()

値がモック関数かどうかを判定する型ガード。

## モジュールモック

### vi.mock()

モジュール全体をモックに置換する。ファイル先頭にホイストされる。

```ts
vi.mock(modulePath: string, factory?: () => unknown): void
```

```ts
// オートモック（全エクスポートが vi.fn() になる）
vi.mock('./utils')

// ファクトリモック
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
}))

// 部分モック
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return {
    ...actual,
    dangerousOp: vi.fn(),
  }
})
```

### vi.doMock()

ホイストされない `vi.mock`。次の動的 import に適用される。

### vi.unmock() / vi.doUnmock()

モックレジストリからモジュールを除去し、元のモジュールを復元する。

### vi.importActual()

モックをバイパスして元のモジュールをインポートする。

```ts
vi.mock('./config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./config')>()
  return { ...actual, debug: true }
})
```

### vi.importMock()

オートモック版のモジュールをインポートする。

### vi.resetModules()

モジュールキャッシュをクリアし、再インポート時に再評価させる。

## オブジェクトスパイ

### vi.spyOn()

既存オブジェクトのメソッドにスパイを設定する。元の実装はデフォルトで保持。

```ts
vi.spyOn<T, K extends keyof T>(object: T, method: K, accessType?: 'get' | 'set'): MockInstance
```

```ts
const spy = vi.spyOn(console, 'warn')
callFn()
expect(spy).toHaveBeenCalledWith(expect.stringContaining('deprecated'))
spy.mockRestore()

// getter/setter
vi.spyOn(obj, 'value', 'get').mockReturnValue(100)
```

## モック管理

| Method | Description |
|--------|-------------|
| `vi.clearAllMocks()` | 全スパイの `.mockClear()` を呼ぶ |
| `vi.resetAllMocks()` | 全スパイの `.mockReset()` を呼ぶ |
| `vi.restoreAllMocks()` | 全スパイの元の実装を復元 |

## 環境・グローバルスタブ

### vi.stubEnv()

環境変数を一時的に変更する。

```ts
vi.stubEnv('NODE_ENV', 'production')
vi.stubEnv('API_URL', 'https://test.example.com')
vi.unstubAllEnvs() // 全復元
```

### vi.stubGlobal()

グローバル変数を一時的に変更する。

```ts
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => ({}) }))
vi.unstubAllGlobals() // 全復元
```

## フェイクタイマー

### vi.useFakeTimers()

`setTimeout`, `setInterval`, `Date` 等をフェイクに置換する。

```ts
vi.useFakeTimers(config?: FakeTimerInstallOpts): void
```

| Method | Description |
|--------|-------------|
| `vi.useFakeTimers()` | フェイクタイマーを有効化 |
| `vi.useRealTimers()` | リアルタイマーに復元 |
| `vi.advanceTimersByTime(ms)` | 指定ミリ秒分タイマーを進める |
| `vi.advanceTimersByTimeAsync(ms)` | 非同期版 |
| `vi.advanceTimersToNextTimer()` | 次のタイマーまで進める |
| `vi.advanceTimersToNextTimerAsync()` | 非同期版 |
| `vi.advanceTimersToNextFrame()` | `requestAnimationFrame` コールバックを進める |
| `vi.runAllTimers()` | 全タイマーを実行（無限ループ防止: 10,000 回制限） |
| `vi.runAllTimersAsync()` | 非同期版 |
| `vi.runOnlyPendingTimers()` | 現在キューにあるタイマーのみ実行 |
| `vi.runOnlyPendingTimersAsync()` | 非同期版 |
| `vi.setSystemTime(date)` | `Date.now()` / `new Date()` を固定値に設定 |
| `vi.getRealSystemTime()` | 実際のシステム時刻を取得 |
| `vi.getMockedSystemTime()` | モック中の Date を取得（未モック時は `null`） |
| `vi.getTimerCount()` | キュー内のタイマー数 |
| `vi.clearAllTimers()` | 全タイマーを実行せずに削除 |
| `vi.isFakeTimers()` | フェイクタイマーが有効かどうか |

```ts
beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

it('fires after delay', () => {
  const fn = vi.fn()
  setTimeout(fn, 1000)
  vi.advanceTimersByTime(1000)
  expect(fn).toHaveBeenCalledOnce()
})

it('mocks current date', () => {
  vi.setSystemTime(new Date('2024-01-01'))
  expect(new Date().getFullYear()).toBe(2024)
})
```

## ユーティリティ

### vi.hoisted()

`vi.mock` ファクトリ内で外部変数を参照するためのホイスト機構。

```ts
const mockFetch = vi.hoisted(() => vi.fn())
vi.mock('./api', () => ({ fetchData: mockFetch }))
mockFetch.mockResolvedValue({ data: [] })
```

### vi.waitFor()

コールバックが成功するまでリトライする。

```ts
await vi.waitFor(() => {
  expect(element).toBeVisible()
}, { timeout: 5000, interval: 100 })
```

### vi.waitUntil()

コールバックが truthy を返すまで待機する。

```ts
const result = await vi.waitUntil(() => fetchStatus() === 'ready')
```

### vi.mocked()

TypeScript 用のモック型ヘルパー。

```ts
vi.mocked(myFn) // MockInstance<typeof myFn> として型推論
vi.mocked(obj, { deep: true }) // ディープモック型
```

### vi.dynamicImportSettled()

全ての動的 import の完了を待つ。

## 関連

- [Test API](./test-api.md)
- [Expect マッチャー](./expect.md)
- [モックパターン](../patterns/mocking.md)
- [非同期テストパターン](../patterns/async.md)
