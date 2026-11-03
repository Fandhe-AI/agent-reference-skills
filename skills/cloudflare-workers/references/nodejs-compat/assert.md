---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/assert/
---

# assert

`node:assert` provides assertions useful when building tests.

## Signature / Usage

```js
import { strictEqual, deepStrictEqual, ok, doesNotReject } from "node:assert";

strictEqual(1, 1); // ok!
strictEqual(1, "1"); // fails! throws AssertionError

deepStrictEqual({ a: { b: 1 } }, { a: { b: 1 } }); // ok!
deepStrictEqual({ a: { b: 1 } }, { a: { b: 2 } }); // fails! throws AssertionError

ok(true); // ok!
ok(false); // fails! throws AssertionError

await doesNotReject(async () => {}); // ok!
await doesNotReject(async () => {
	throw new Error("boom");
}); // fails! throws AssertionError
```

## Notes

- In the Workers implementation of `assert`, all assertions run in Node.js strict assertion mode. Non-strict methods behave like their strict counterparts; for example, `deepEqual()` behaves like `deepStrictEqual()`.
- Compatibility date `2026-08-04` or later enables `nodejs_compat` by default; earlier dates need the `nodejs_compat` flag (see overview).
- Node.js docs: https://nodejs.org/docs/latest/api/assert.html

## Related

- [Node.js compatibility](./overview.md)
- [test](./test.md)
