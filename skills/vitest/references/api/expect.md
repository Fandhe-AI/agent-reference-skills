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

## Additional Matchers (docs at tag v5.0.5)

Value matchers:

| Matcher | Type | Description |
|---------|------|-------------|
| `toBeNullable()` | `() => Awaitable<void>` | Asserts if something is nullable (`null` or `undefined`) |
| `toBeOneOf(sample)` | `(sample: Array<any> \| Set<any>) => any` | Asserts the value matches any of the values in the array or set (compared with `toEqual` deep equality). Providing a `Set` is experimental. Also usable as asymmetric matcher: `expect.toBeOneOf([expect.any(String), undefined])` |
| `toSatisfy(predicate)` | `(predicate: (value: any) => boolean) => Awaitable<void>` | Asserts a value satisfies a certain predicate |

Spy ordering and promise matchers (a spy function must be passed to `expect`; an unresolved promise counts as not resolved):

| Matcher | Type | Description |
|---------|------|-------------|
| `toHaveBeenCalledBefore(mock, failIfNoFirstInvocation?)` | `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => Awaitable<void>` | A `Mock` was called before another `Mock` |
| `toHaveBeenCalledAfter(mock, failIfNoFirstInvocation?)` | same | A `Mock` was called after another `Mock` |
| `toHaveResolved()` | `() => Awaitable<void>` | Function successfully resolved a value at least once (did not reject) |
| `toHaveResolvedTimes(n)` | `(amount: number) => Awaitable<void>` | Resolved an exact amount of times |
| `toHaveResolvedWith(value)` | `(returnValue: any) => Awaitable<void>` | Resolved a certain value at least once (`toEqual` equality) |
| `toHaveLastResolvedWith(value)` | `(returnValue: any) => Awaitable<void>` | Resolved a certain value on the last invocation |
| `toHaveNthResolvedWith(n, value)` | `(time: number, returnValue: any) => Awaitable<void>` | Resolved a certain value on a specific invocation (count starts at 1) |
| `toHaveBeenExhausted()` (5.0.0) | `() => void` | Every behavior registered on a `vi.when` chain has been consumed. Requires a `When` chain returned by `vi.when`; a chain with no registered behaviors is never exhausted |

Chai-style spy assertions (4.1.0; sinon-chai conventions, `expect(spy).to.have.been.called`). Property assertions are accessed without parentheses:

| Assertion | Type | Equivalent to |
|-----------|------|---------------|
| `called` | property | `toHaveBeenCalled()` |
| `callCount(n)` | `(count: number) => void` | `toHaveBeenCalledTimes(n)` |
| `calledWith(...args)` | `(...args: any[]) => void` | `toHaveBeenCalledWith(...args)` |
| `calledOnce` | property | `toHaveBeenCalledOnce()` |
| `calledOnceWith(...args)` | `(...args: any[]) => void` | `toHaveBeenCalledExactlyOnceWith(...args)` |
| `calledTwice` / `calledThrice` | property | `toHaveBeenCalledTimes(2)` / `(3)` |
| `lastCalledWith(...args)` | `(...args: any[]) => void` | `toHaveBeenLastCalledWith(...args)` |
| `nthCalledWith(n, ...args)` | `(n: number, ...args: any[]) => void` | `toHaveBeenNthCalledWith(n, ...args)` |
| `returned(value)` / `returnedWith(value)` | `(value: any) => void` | `toHaveReturnedWith(value)` |
| `returnedTimes(n)` | `(count: number) => void` | `toHaveReturnedTimes(n)` |
| `lastReturnedWith(value)` | `(value: any) => void` | `toHaveLastReturnedWith(value)` |
| `nthReturnedWith(n, value)` | `(n: number, value: any) => void` | `toHaveNthReturnedWith(n, value)` |
| `calledBefore(mock, failIfNoFirstInvocation?)` / `calledAfter(...)` | `(mock: MockInstance, failIfNoFirstInvocation?: boolean) => void` | `toHaveBeenCalledBefore` / `toHaveBeenCalledAfter` |

Static `expect` helpers:

| Method | Type | Description |
|--------|------|-------------|
| `expect.fail(message?)` | `(message?: string) => never` | Explicitly forces a test failure with an optional custom message |
| `expect.schemaMatching(schema)` | `(expected: StandardSchemaV1) => any` | Asymmetric matcher: true if the value matches the schema (Standard Schema v1, e.g. Zod / Valibot / ArkType). `expect.not` negates it |
| `expect.extend(matchers)` | `(matchers: MatchersObject) => void` | Adds custom matchers (also usable as asymmetric matchers); Jest-compatible. Call in `setupFiles` to apply to every test. TypeScript: augment `Matchers<R, T>` |
| `expect.addEqualityTesters(testers)` | `(tester: Array<Tester>) => void` | Defines custom testers used by matchers to test if two objects are equal; Jest-compatible |

```ts
expect.extend({
  toBeFoo(received) {
    const { isNot } = this
    return {
      message: () => `expected ${received} is${isNot ? ' not' : ''} foo`,
      pass: received === 'foo',
    }
  },
})

expect('foo').toBeFoo()
expect({ foo: 'foo' }).toEqual({ foo: expect.toBeFoo() })
```

`toMatchAriaSnapshot()` / `toMatchAriaInlineSnapshot(snapshot?)` (experimental, 4.1.4) capture the accessibility tree of a DOM element; they belong to browser mode — see the browser-mode category of this skill.

## Notes

Vitest 5 changes (source: Migrating to Vitest 5.0, vitest.dev/guide/migration; docs at tag `v5.0.5`):

- `expect.poll`: if the callback or assertion does not settle within `timeout`, the poll now fails (rejects). The callback receives an `AbortSignal` that is aborted when the timeout elapses, and `timeout` applies to the whole polling operation including a pending callback and async matcher. Raise `timeout` for polls that need more time. `.resolves` / `.rejects` and `toThrow` are not supported with `expect.poll`.
- Unawaited `resolves`, `rejects`, and `toMatchFileSnapshot` assertions now fail the test instead of logging a warning.
- `toThrow("")`: the empty string is now a plain substring and matches any error message. To assert an empty message use `/^$/`.
- `toHaveTextContent` (browser mode) now requires an exact match and no longer accepts a RegExp; partial / regex matching moved to the new `toMatchTextContent`.
- Assertion types take two parameters: `Assertion<R, T>` (return type, received type), e.g. `Assertion<string>` becomes `Assertion<void, string>`, and async assertions use `Promise<void>`. Custom matcher declarations should augment `Matchers<R, T>`; Vitest no longer reads the global `jest.Matchers` interface.

## Related

- [Test API](./test-api.md)
- [Vi Utilities](./vi.md)
- [Mocking patterns](../patterns/mocking.md)
