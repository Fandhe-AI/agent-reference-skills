---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/util/
---

# util

`node:util` support for `promisify` / `callbackify`, `util.types`, and `util.MIMEType`.

## Signature / Usage

```js
import { promisify } from "node:util";

function foo(args, callback) {
	try {
		callback(null, 1);
	} catch (err) {
		// Errors are emitted to the callback via the first argument.
		callback(err);
	}
}

const promisifiedFoo = promisify(foo);
await promisifiedFoo(args);
```

`callbackify`:

```js
import { callbackify } from 'node:util';

async function foo(args) {
  throw new Error('boom');
}

const callbackifiedFoo = callbackify(foo);

callbackifiedFoo(args, (err, value) => {
  if (err) throw err;
});
```

`util.types`:

```js
import { types } from "node:util";

types.isAnyArrayBuffer(new ArrayBuffer()); // Returns true
types.isAnyArrayBuffer(new SharedArrayBuffer()); // Returns true
types.isArrayBufferView(new Int8Array()); // true
types.isArrayBufferView(Buffer.from("hello world")); // true
types.isArrayBufferView(new DataView(new ArrayBuffer(16))); // true
types.isArrayBufferView(new ArrayBuffer()); // false
function foo() {
	types.isArgumentsObject(arguments); // Returns true
}
types.isAsyncFunction(function foo() {}); // Returns false
types.isAsyncFunction(async function foo() {}); // Returns true
// .. and so on
```

`util.MIMEType`:

```js
import { MIMEType } from "node:util";

const myMIME = new MIMEType("text/javascript;key=value");

console.log(myMIME.type);
// Prints: text

console.log(myMIME.essence);
// Prints: text/javascript

console.log(myMIME.subtype);
// Prints: javascript

console.log(String(myMIME));
// Prints: application/javascript;key=value
```

## Notes

- `promisify` converts a Node.js-style callback function to a Promise-returning function; `callbackify` does the reverse.
- The Workers implementation does not provide `util.types.isExternal()`, `util.types.isProxy()`, `util.types.isKeyObject()`, or `util.type.isWebAssemblyCompiledModule()` (the last is written this way in the source).
- Docs inconsistency: the `MIMEType` example constructs `text/javascript;key=value` but the last comment says `String(myMIME)` prints `application/javascript;key=value`; reproduced verbatim.
- Node.js docs: https://nodejs.org/api/util.html

## Related

- [buffer](./buffer.md)
- [Node.js compatibility](./overview.md)
