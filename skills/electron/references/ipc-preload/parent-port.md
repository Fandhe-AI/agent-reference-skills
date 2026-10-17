---
source: https://www.electronjs.org/docs/latest/api/parent-port
---

# parentPort

Interface for communication with the parent process. Process: Utility.

`parentPort` is an EventEmitter. It is not exported from the `'electron'` module; it is only available as a property of the `process` object (`process.parentPort`) in a utility process.

## Signature / Usage

Adapted (not in the official docs): the child reads e.data.message instead of interpolating e.data, so the reply matches the 'hello world!' comment.

```js
// Main process
const child = utilityProcess.fork(path.join(__dirname, 'test.js'))
child.postMessage({ message: 'hello' })
child.on('message', (data) => {
  console.log(data) // hello world!
})

// Child process
process.parentPort.on('message', (e) => {
  process.parentPort.postMessage(`${e.data.message} world!`)
})
```

## Events

| Event | Payload | Description |
| --- | --- | --- |
| `'message'` | `messageEvent` Object: `data` any, `ports` MessagePortMain[] | Emitted when the process receives a message. Messages are queued until a handler is registered. |

## Methods

| Method | Params | Description |
| --- | --- | --- |
| `parentPort.postMessage(message)` | `message` any | Sends a message from the process to its parent. |

## Notes

- The original example interpolates `e.data` directly, which yields `[object Object] world!` because the parent sends `{ message: 'hello' }`; this page uses `e.data.message`.

## Related

- [utilityProcess](./utility-process.md)
- [MessagePortMain](./message-port-main.md)
