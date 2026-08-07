# Expect Matchers

## Signature / Usage

`expect(value)` creates an assertion wrapper and chains matchers onto it.
`.not` negates any matcher.

```ts
expect(1 + 1).toBe(2)
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 })
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 })
```

## Equality Matchers

| Matcher | Description |
|---------|-------------|
| `toBe(value)` | Strict equality via `Object.is`. For primitives / reference comparisons |
| `toEqual(value)` | Recursive structural equality. Ignores `undefined` properties |
| `toStrictEqual(value)` | `toEqual` + also checks `undefined` properties, array sparseness, and object type |
| `toMatchObject(subset)` | Checks the object has the given subset of properties |

## Type and Value Matchers

| Matcher | Description |
|---------|-------------|
| `toBeTruthy()` | Truthy value |
| `toBeFalsy()` | Falsy value |
| `toBeNull()` | `null` |
| `toBeUndefined()` | `undefined` |
| `toBeDefined()` | Not `undefined` |
| `toBeNaN()` | `NaN` |
| `toBeTypeOf(type)` | `typeof value === type` (`'string' \| 'number' \| 'boolean' \| 'object' \| 'function' \| 'undefined' \| 'symbol' \| 'bigint'`) |
| `toBeInstanceOf(Class)` | Instance of the given class |

## Number Matchers

| Matcher | Description |
|---------|-------------|
| `toBeGreaterThan(n)` | `value > n` |
| `toBeGreaterThanOrEqual(n)` | `value >= n` |
| `toBeLessThan(n)` | `value < n` |
| `toBeLessThanOrEqual(n)` | `value <= n` |
| `toBeCloseTo(n, precision?)` | Approximate floating-point comparison (default precision: 2 digits) |

## Collection Matchers

| Matcher | Description |
|---------|-------------|
| `toContain(item)` | Array contains item / string contains substring |
| `toContainEqual(item)` | Array contains a structurally equal item (`toEqual` logic) |
| `toHaveLength(n)` | `.length === n` |
| `toHaveProperty(keyPath, value?)` | Checks a property exists (supports dot notation and array paths) |

```ts
expect([1, 2, 3]).toContain(2)
expect([{ id: 1 }, { id: 2 }]).toContainEqual({ id: 1 })
expect({ user: { name: 'Alice' } }).toHaveProperty('user.name', 'Alice')
```

## String Matchers

| Matcher | Description |
|---------|-------------|
| `toMatch(pattern)` | Matches a regex or substring |

```ts
expect('hello world').toMatch(/world/)
expect('hello world').toMatch('world')
```

## Error Matchers

| Matcher | Description |
|---------|-------------|
| `toThrow(error?)` | Function throws an exception (can verify by message/class) |
| `toThrowError(error?)` | Alias for `toThrow` |

```ts
expect(() => JSON.parse('{')).toThrow(SyntaxError)
expect(() => fn()).toThrow('expected message')
expect(() => fn()).toThrow(/pattern/)
```

## Snapshot Matchers

| Matcher | Description |
|---------|-------------|
| `toMatchSnapshot(hint?)` | Compares against the saved snapshot. Creates one on first run |
| `toMatchInlineSnapshot(snapshot?)` | Stores the snapshot inline in the test file |
| `toMatchFileSnapshot(filepath)` | Compares against a snapshot in the given file (async) |
| `toThrowErrorMatchingSnapshot(hint?)` | `toThrow` + `toMatchSnapshot` |
| `toThrowErrorMatchingInlineSnapshot(snapshot?)` | `toThrow` + `toMatchInlineSnapshot` |

```ts
expect({ a: 1 }).toMatchSnapshot()

expect({ a: 1 }).toMatchInlineSnapshot(`
  {
    "a": 1,
  }
`)
```

## Mock and Spy Matchers

| Matcher | Description |
|---------|-------------|
| `toHaveBeenCalled()` | Called one or more times |
| `toHaveBeenCalledTimes(n)` | Called exactly n times |
| `toHaveBeenCalledWith(...args)` | Called with the given arguments (any call) |
| `toHaveBeenCalledExactlyOnceWith(...args)` | Called exactly once with the given arguments |
| `toHaveBeenLastCalledWith(...args)` | Last call was made with the given arguments |
| `toHaveBeenNthCalledWith(n, ...args)` | The nth call (1-indexed) was made with the given arguments |
| `toHaveReturned()` | Returned successfully one or more times |
| `toHaveReturnedTimes(n)` | Returned exactly n times |
| `toHaveReturnedWith(value)` | Returned the given value |
| `toHaveLastReturnedWith(value)` | Last return value matches |
| `toHaveNthReturnedWith(n, value)` | The nth return value matches |

```ts
const fn = vi.fn(() => 42)
fn('hello')
expect(fn).toHaveBeenCalledWith('hello')
expect(fn).toHaveReturnedWith(42)
```

## Async Matchers

| Modifier | Description |
|----------|-------------|
| `resolves` | Unwraps a Promise's resolved value (requires `await`) |
| `rejects` | Unwraps a Promise's rejection reason (requires `await`) |

```ts
await expect(Promise.resolve(42)).resolves.toBe(42)
await expect(Promise.reject(new Error('fail'))).rejects.toThrow('fail')
```

## Assertion Control

| Method | Description |
|--------|-------------|
| `expect.assertions(n)` | Verifies exactly n assertions run in the test |
| `expect.hasAssertions()` | Verifies at least one assertion runs |
| `expect.unreachable(msg?)` | Marks a code path that should not be reached (fails if reached) |

```ts
test('async callback is called', async () => {
  expect.assertions(1)
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

## Soft Assertions

```ts
expect.soft(a).toBe(1)  // test continues even if this fails
expect.soft(b).toBe(2)  // all failures are reported together
```

## poll (retrying assertions)

```ts
await expect.poll(() => fetchStatus()).toBe('ready')
// defaults: interval 50ms, timeout 1000ms
await expect.poll(() => count, { interval: 100, timeout: 5000 }).toBeGreaterThan(10)
```

## Asymmetric Matchers

Usable inside `toEqual` / `toMatchObject`.

| Matcher | Description |
|---------|-------------|
| `expect.anything()` | Any value other than `null` / `undefined` |
| `expect.any(Class)` | Instance of the given class |
| `expect.arrayContaining(items)` | Array containing all the given items |
| `expect.objectContaining(obj)` | Object containing the given properties |
| `expect.stringContaining(str)` | String containing the given substring |
| `expect.stringMatching(pattern)` | String matching the given regex |
| `expect.closeTo(n, precision?)` | Approximate floating-point match |

```ts
expect({ id: 1, name: 'Alice', createdAt: new Date() }).toEqual({
  id: expect.any(Number),
  name: expect.stringContaining('Ali'),
  createdAt: expect.any(Date),
})

expect([1, 2, 3, 4]).toEqual(expect.arrayContaining([1, 3]))
```

## Related

- [Test API](./test-api.md)
- [Vi Utilities](./vi.md)
- [Mocking patterns](../patterns/mocking.md)
