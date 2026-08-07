# Async Testing & Fake Timers Patterns

## async/await Tests

```ts
test('fetches data', async () => {
  const data = await fetchData()
  expect(data).toEqual({ id: 1, name: 'Alice' })
})
```

## Promise resolves / rejects

```ts
test('resolves', async () => {
  await expect(fetchData()).resolves.toEqual({ id: 1 })
})

test('rejects', async () => {
  await expect(fetchBadData()).rejects.toThrow('not found')
})
```

## Catching Missed Callback Assertions with expect.assertions()

Guarantees that assertions inside an async callback are actually executed.

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

## Fake Timers: Basic Pattern

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

## Fake Timers: setInterval

```ts
test('interval fires repeatedly', () => {
  const fn = vi.fn()
  setInterval(fn, 1000)

  vi.advanceTimersByTime(3000)
  expect(fn).toHaveBeenCalledTimes(3)
})
```

## Fake Timers: Running All Pending Timers

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

## Fake Timers: Advancing to the Next Timer Only

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

## Fake Timers: Mocking the Current Date

```ts
test('mocks current date', () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-01-15T10:00:00Z'))

  expect(new Date().toISOString()).toBe('2024-01-15T10:00:00.000Z')
  expect(Date.now()).toBe(new Date('2024-01-15T10:00:00Z').getTime())

  vi.useRealTimers()
})
```

## Fake Timers: Async Timers

Use the async variant when the callback inside `setTimeout` performs async work.

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

## vi.waitFor(): Retry Pattern

Repeatedly runs the callback until it succeeds.

```ts
test('eventually becomes ready', async () => {
  startProcess()

  await vi.waitFor(() => {
    expect(getStatus()).toBe('ready')
  }, { timeout: 5000, interval: 100 })
})
```

Combined with fake timers, it retries while automatically advancing timers.

## vi.waitUntil(): Waiting for a Condition

```ts
test('waits for condition', async () => {
  const result = await vi.waitUntil(
    () => checkCondition() ? { data: 'ready' } : undefined,
    { timeout: 3000 }
  )
  expect(result.data).toBe('ready')
})
```

## expect.poll(): Polling Assertions

```ts
test('polling assertion', async () => {
  startAsyncProcess()

  await expect.poll(() => getStatus(), {
    interval: 100,
    timeout: 5000,
  }).toBe('complete')
})
```

## Related

- [Vi utilities](../api/vi.md)
- [Expect matchers](../api/expect.md)
- [Mocking patterns](./mocking.md)
