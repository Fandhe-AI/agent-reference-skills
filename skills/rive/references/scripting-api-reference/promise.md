# Promise

A value that will be available in the future. Supports `andThen`/`catch`/`finally` callbacks, `await` in async contexts, and cancellation.

## Signature / Usage

```lua
local p = Promise.new(function(resolve, reject, onCancel)
  -- async work; call resolve(value) or reject(err)
end)

p:andThen(function(value) print(value) end)
 :catch(function(err) print('failed', err) end)
 :finally(function() print('done') end)
```

## Options / Props

| Member | Description |
| --- | --- |
| `Promise.new(executor)` | Constructor; executor receives `(resolve, reject, onCancel)` |
| `Promise.resolve(value) -> Promise` | Already-resolved promise (nil if no value) |
| `Promise.reject(error) -> Promise` | Already-rejected promise |
| `Promise.all(promises) -> Promise` | Waits for all; rejects (and cancels the rest) if any fails |
| `andThen(onFulfilled) -> Promise` | Fulfillment callback; its return becomes the next promise's value |
| `catch(onRejected) -> Promise` | Rejection callback; errors may be any Lua value |
| `finally(onFinally) -> Promise` | Runs regardless of outcome |
| `cancel()` | Cancels the promise, firing `onCancel` and propagating through the chain; no-op if already settled |
| `onCancel(hook)` | Registers a cancellation cleanup hook |
| `getStatus() -> string` | `"Pending"`, `"Fulfilled"`, `"Rejected"`, or `"Cancelled"` |

## Related

- [interface-context.md](./interface-context.md)
