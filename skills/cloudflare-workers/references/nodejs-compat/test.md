---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/
---

# test

`node:test` is partially supported: the `MockTracker` API for tracking and managing mock objects.

## Signature / Usage

```js
import { mock } from 'node:test';

const fn = mock.fn();
fn(1,2,3);  // does nothing... but

console.log(fn.mock.callCount());  // Records how many times it was called
console.log(fn.mock.calls[0].arguments);  // Records the arguments that were passed each call
```

## Notes

- The Workers `MockTracker` does not include the Node.js mock timers API (`MockTimers`).
- Full API: https://nodejs.org/docs/latest/api/test.html#class-mocktracker

## Related

- [assert](./assert.md)
