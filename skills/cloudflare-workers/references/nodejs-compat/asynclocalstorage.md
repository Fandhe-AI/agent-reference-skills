---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/asynclocalstorage/
---

# AsyncLocalStorage

Workers implements a subset of Node.js `AsyncLocalStorage` (and `AsyncResource`) for in-memory stores that remain coherent through asynchronous operations.

## Signature / Usage

```js
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();
```

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

export default {
  async fetch(req) {
    return asyncLocalStorage.run(idSeq++, () => {
      // Simulate some async activity...
      await scheduler.wait(1000);
      return new Response(asyncLocalStorage.getStore());
    });
  }
};
```

Multiple `AsyncLocalStorage` instances can be used concurrently:

```js
import { AsyncLocalStorage } from 'node:async_hooks';

const als1 = new AsyncLocalStorage();
const als2 = new AsyncLocalStorage();

export default {
  async fetch(req) {
    return als1.run(123, () => {
      return als2.run(321, () => {
        // Simulate some async activity...
        await scheduler.wait(1000);
        return new Response(`${als1.getStore()}-${als2.getStore()}`);
      });
    });
  }
};
```

When a `Promise` rejects and the rejection is unhandled, the async context propagates to the `'unhandledrejection'` event handler:

```js
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();
let idSeq = 0;

addEventListener("unhandledrejection", (event) => {
	console.log(asyncLocalStorage.getStore(), "unhandled rejection!");
});

export default {
	async fetch(req) {
		return asyncLocalStorage.run(idSeq++, () => {
			// Cause an unhandled rejection!
			throw new Error("boom");
		});
	},
};
```

`AsyncLocalStorage.bind()` and `AsyncLocalStorage.snapshot()`:

```js
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage();

function foo() {
	console.log(als.getStore());
}
function bar() {
	console.log(als.getStore());
}

const oneFoo = als.run(123, () => AsyncLocalStorage.bind(foo));
oneFoo(); // prints 123

const snapshot = als.run("abc", () => AsyncLocalStorage.snapshot());
snapshot(foo); // prints 'abc'
snapshot(bar); // prints 'abc'
```

```js
import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage();

class MyResource {
	#runInAsyncScope = AsyncLocalStorage.snapshot();

	doSomething() {
		this.#runInAsyncScope(() => {
			return als.getStore();
		});
	}
}

const myResource = als.run(123, () => new MyResource());
console.log(myResource.doSomething()); // prints 123
```

## Options / Props

Constructor: `new AsyncLocalStorage()` returns a new `AsyncLocalStorage` instance.

| Name | Type | Description |
|------|------|-------------|
| `getStore()` | any | Returns the current store. Outside an async context initialized by `asyncLocalStorage.run()`, returns `undefined`. |
| `run(store: any, callback: function, ...args: arguments)` | any | Runs a function synchronously within a context and returns its return value. The store is not accessible outside the callback but is accessible to async operations created within it. The optional `args` are passed to the callback. If the callback throws, `run()` throws too. |
| `exit(callback: function, ...args: arguments)` | any | Runs a function synchronously outside of a context and returns its return value. Equivalent to `run()` with `store` set to `undefined`. |
| `AsyncLocalStorage.bind(fn)` (static) | function | Captures the async context current when `bind()` is called and returns a function that enters that context before calling the passed function. |
| `AsyncLocalStorage.snapshot()` (static) | function | Captures the async context current when `snapshot()` is called and returns a function that enters that context before calling a given function. |

## AsyncResource

`AsyncResource` is provided solely for backwards compatibility with Node.js; `AsyncLocalStorage.snapshot()` and `AsyncLocalStorage.bind()` are the better approach.

```js
import { AsyncResource, AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage();

class MyResource extends AsyncResource {
	constructor() {
		// The type string is required by Node.js but unused in Workers.
		super("MyResource");
	}

	doSomething() {
		this.runInAsyncScope(() => {
			return als.getStore();
		});
	}
}

const myResource = als.run(123, () => new MyResource());
console.log(myResource.doSomething()); // prints 123
```

| Name | Type | Description |
|------|------|-------------|
| `new AsyncResource(type: string, options: AsyncResourceOptions)` | AsyncResource | Constructor arguments are required in Node.js but are not used in Workers. |
| `AsyncResource.bind(fn: function, type: string, thisArg: any)` | | Binds the given function to the current async context. |
| `asyncResource.bind(fn: function, thisArg: any)` | | Binds the function to the async context associated with this `AsyncResource`. |
| `asyncResource.runInAsyncScope(fn: function, thisArg: any, ...args: arguments)` | | Calls the function with the given arguments in the async context associated with this `AsyncResource`. |

## Notes

- Intentionally omits `asyncLocalStorage.enterWith()` and `asyncLocalStorage.disable()`.
- The full `async_hooks` API is not implemented.
- An `AsyncResource` cannot be created with an explicitly identified trigger context; a new `AsyncResource` is always bound to the async context in which it was created.
- Thenables (non-Promise objects with a `then()` method) are not fully supported; use `AsyncLocalStorage.snapshot()` to capture the context instead.
- The upstream examples use `await` inside non-async arrow callbacks (the first three `fetch` examples), which would be a syntax error as written; they are reproduced verbatim from the official page.
- Enabling only this API: set the `nodejs_als` compatibility flag (see overview).

## Related

- [Node.js compatibility](./overview.md)
- [diagnostics-channel](./diagnostics-channel.md)
