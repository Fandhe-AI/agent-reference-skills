---
source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/diagnostics-channel/
---

# Diagnostics Channel

`node:diagnostics_channel` creates named channels to report arbitrary message data for diagnostics. It is a simple pub/sub model designed for low-overhead diagnostics reporting.

## Signature / Usage

```js
import {
	channel,
	hasSubscribers,
	subscribe,
	unsubscribe,
	tracingChannel,
} from "node:diagnostics_channel";

// For publishing messages to a channel, acquire a channel object:
const myChannel = channel("my-channel");

// Any JS value can be published to a channel.
myChannel.publish({ foo: "bar" });

// For receiving messages on a channel, use subscribe:

subscribe("my-channel", (message) => {
	console.log(message);
});
```

Tail Worker integration (messages published to any channel are forwarded to the Tail Worker via `diagnosticsChannelEvents`):

```js
export default {
	async tail(events) {
		for (const event of events) {
			for (const messageData of event.diagnosticsChannelEvents) {
				console.log(
					messageData.timestamp,
					messageData.channel,
					messageData.message,
				);
			}
		}
	},
};
```

`TracingChannel`:

```js
import { tracingChannel } from "node:diagnostics_channel";
import { AsyncLocalStorage } from "node:async_hooks";

const channels = tracingChannel("my-channel");
const requestId = new AsyncLocalStorage();
channels.start.bindStore(requestId);

channels.subscribe({
	start(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle start message
	},
	end(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle end message
	},
	asyncStart(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle asyncStart message
	},
	asyncEnd(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle asyncEnd message
	},
	error(message) {
		console.log(requestId.getStore()); // { requestId: '123' }
		// Handle error message
	},
});

// The subscriber handlers will be invoked while tracing the execution of the async
// function passed into `channel.tracePromise`...
channel.tracePromise(
	async () => {
		// Perform some asynchronous work...
	},
	{ requestId: "123" },
);
```

## Notes

- All `Channel` instances are singletons per Isolate/context (for example, the same entry point). Subscribers are invoked synchronously and in registration order, like `EventTarget` or `EventEmitter`.
- Messages forwarded to a Tail Worker pass through the structured clone algorithm, so only cloneable values are supported.
- Docs inconsistency: the `TracingChannel` example binds `const channels = tracingChannel(...)` but calls `channel.tracePromise(...)` (a different identifier); it is reproduced verbatim from the official page.

## Related

- [Node.js compatibility](./overview.md)
- [AsyncLocalStorage](./asynclocalstorage.md)
