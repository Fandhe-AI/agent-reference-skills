---
source: https://developers.cloudflare.com/workers/runtime-apis/messagechannel/
---

# MessageChannel

The MessageChannel API provides a communication channel between different parts of your application. The Workers runtime provides a minimal implementation limited to a single Worker instance.

## Signature / Usage

Adapted (not in the official docs): sender changed from `port2.postMessage` to `port1.postMessage`; see Notes.

```js
const { port1, port2 } = new MessageChannel();

port2.onmessage = (event) => {
	console.log('Received message:', event.data);
};

port1.postMessage('Hello from port1!');
```

## Notes

- Corrected from the official docs: the official example sets `onmessage` on `port2` and also calls `port2.postMessage(...)`, but a message posted on one port is delivered to the other port, so the handler never ran; changed the sender to `port1.postMessage(...)`.
- Any value that can be used with `structuredClone(...)` can be sent over the port.
- You can send messages between parts of your Worker, but not across different Workers.
- Transfer lists are not supported: you cannot transfer ownership of objects like `ArrayBuffer` or `MessagePort` between ports.
- `MessagePort` is not yet serializable: it cannot be sent via `postMessage` or JSRPC calls.
- The `'messageerror'` event is only partially supported. It is triggered if the `'onmessage'` handler throws, but not on serialization/deserialization errors; those are thrown when `postMessage` is called on the sending port.
- The `'close'` event is emitted on both ports when one is closed, but not when the Worker is terminated or a port is garbage collected.

## Related

- [Web standards](./web-standards.md)
