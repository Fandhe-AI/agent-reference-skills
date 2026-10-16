# Cancellable Test Resources

Use the test context `signal` (since 3.2.0) so resources such as `fetch`, child processes, streams, and polling loops are released when Vitest cancels a test.

## Signature / Usage

```ts
import { test } from 'vitest'

test('stop request when test times out', async ({ signal }) => {
  await fetch('/heavy-resource', { signal })
}, 2000)
```

If the request has not completed within 2 seconds, `fetch` rejects with `AbortError` instead of the test hanging.

## Forwarding the signal

```ts
async function pollUntilReady(url: string, signal: AbortSignal) {
  while (!signal.aborted) {
    const res = await fetch(url, { signal })
    if (res.ok) {
      return
    }
    await new Promise(r => setTimeout(r, 200))
  }
  signal.throwIfAborted()
}

test('worker becomes ready', async ({ signal }) => {
  await pollUntilReady('http://localhost:4000/health', signal)
}, 5000)
```

## Notes

- Vitest cancels a test when it exceeds its `timeout`, when another test fails under `--bail`, or on Ctrl+C in the terminal; `signal` fires in all of those cases.
- Other APIs that accept an `AbortSignal`: `fetch`; `addEventListener` (with `{ signal }` removes the listener on abort); `ReadableStream.pipeTo`; Node.js `fs.readFile`, `child_process.spawn`, `setTimeout` / `setInterval`; any custom code that calls `signal.throwIfAborted()` or listens for `'abort'`.

## Related

- [Test API](../api/test-api.md)
- [Async patterns](../patterns/async.md)
