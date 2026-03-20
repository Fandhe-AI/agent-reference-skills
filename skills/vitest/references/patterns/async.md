# 非同期テスト・フェイクタイマーパターン

## async/await テスト

```ts
test('fetches data', async () => {
  const data = await fetchData()
  expect(data).toEqual({ id: 1, name: 'Alice' })
})
```

## Promise の resolves / rejects

```ts
test('resolves', async () => {
  await expect(fetchData()).resolves.toEqual({ id: 1 })
})

test('rejects', async () => {
  await expect(fetchBadData()).rejects.toThrow('not found')
})
```

## expect.assertions() でコールバック漏れを検出

非同期コールバック内のアサーションが確実に実行されることを保証する。

```ts
test('callback is called', async () => {
  expect.assertions(1)

  await new Promise<void>((resolve) => {
    emitter.on('data', (value) => {
      expect(value).toBe('expected')
      resolve()
    })
    emitter.emit('data', 'expected')
  })
})
```

## フェイクタイマー: 基本パターン

```ts
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

test('debounce fires after delay', () => {
  const callback = vi.fn()
  const debounced = debounce(callback, 300)

  debounced()
  expect(callback).not.toHaveBeenCalled()

  vi.advanceTimersByTime(300)
  expect(callback).toHaveBeenCalledOnce()
})
```

## フェイクタイマー: setInterval

```ts
test('interval fires repeatedly', () => {
  const fn = vi.fn()
  setInterval(fn, 1000)

  vi.advanceTimersByTime(3000)
  expect(fn).toHaveBeenCalledTimes(3)
})
```

## フェイクタイマー: 全タイマー実行

```ts
test('runs all pending timers', () => {
  const fn1 = vi.fn()
  const fn2 = vi.fn()

  setTimeout(fn1, 100)
  setTimeout(fn2, 200)

  vi.runAllTimers()
  expect(fn1).toHaveBeenCalled()
  expect(fn2).toHaveBeenCalled()
})
```

## フェイクタイマー: 次のタイマーだけ進める

```ts
test('step through timers', () => {
  const fn1 = vi.fn()
  const fn2 = vi.fn()

  setTimeout(fn1, 100)
  setTimeout(fn2, 200)

  vi.advanceTimersToNextTimer()
  expect(fn1).toHaveBeenCalled()
  expect(fn2).not.toHaveBeenCalled()

  vi.advanceTimersToNextTimer()
  expect(fn2).toHaveBeenCalled()
})
```

## フェイクタイマー: 日付のモック

```ts
test('mocks current date', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-01-15T10:00:00Z'))

  expect(new Date().toISOString()).toBe('2024-01-15T10:00:00.000Z')
  expect(Date.now()).toBe(new Date('2024-01-15T10:00:00Z').getTime())

  vi.useRealTimers()
})
```

## フェイクタイマー: 非同期タイマー

`setTimeout` 内で async 処理がある場合は async 版を使う。

```ts
test('async timer', async () => {
  const fn = vi.fn()

  setTimeout(async () => {
    await someAsyncOp()
    fn()
  }, 1000)

  await vi.advanceTimersByTimeAsync(1000)
  expect(fn).toHaveBeenCalled()
})
```

## vi.waitFor(): リトライパターン

コールバックが成功するまで繰り返し実行する。

```ts
test('eventually becomes ready', async () => {
  startProcess()

  await vi.waitFor(() => {
    expect(getStatus()).toBe('ready')
  }, { timeout: 5000, interval: 100 })
})
```

フェイクタイマーと組み合わせると、タイマーを自動的に進めながらリトライする。

## vi.waitUntil(): 条件待ち

```ts
test('waits for condition', async () => {
  const result = await vi.waitUntil(
    () => checkCondition() ? { data: 'ready' } : undefined,
    { timeout: 3000 }
  )
  expect(result.data).toBe('ready')
})
```

## expect.poll(): ポーリングアサーション

```ts
test('polling assertion', async () => {
  startAsyncProcess()

  await expect.poll(() => getStatus(), {
    interval: 100,
    timeout: 5000,
  }).toBe('complete')
})
```

## 関連

- [Vi ユーティリティ](../api/vi.md)
- [Expect マッチャー](../api/expect.md)
- [モックパターン](./mocking.md)
