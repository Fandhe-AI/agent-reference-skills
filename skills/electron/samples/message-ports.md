---
source: https://www.electronjs.org/docs/latest/tutorial/message-ports
---

# MessagePorts: Transfer a Port and Stream Replies

Create a `MessageChannel` in the renderer, transfer one port to the main process with `ipcRenderer.postMessage`, and use it for a reply stream.

```js
// renderer.js (Renderer Process)
// MessagePorts are created in pairs. A connected pair of message ports is
// called a channel.
const channel = new MessageChannel()

// The only difference between port1 and port2 is in how you use them. Messages
// sent to port1 will be received by port2 and vice-versa.
const port1 = channel.port1
const port2 = channel.port2

// It's OK to send a message on the channel before the other end has registered
// a listener. Messages will be queued until a listener is registered.
port2.postMessage({ answer: 42 })

// Here we send the other end of the channel, port1, to the main process. It's
// also possible to send MessagePorts to other frames, or to Web Workers, etc.
ipcRenderer.postMessage('port', null, [port1])
```

```js
// main.js (Main Process)
// In the main process, we receive the port.
ipcMain.on('port', (event) => {
  // When we receive a MessagePort in the main process, it becomes a
  // MessagePortMain.
  const port = event.ports[0]

  // MessagePortMain uses the Node.js-style events API, rather than the
  // web-style events API. So .on('message', ...) instead of .onmessage = ...
  port.on('message', (event) => {
    // data is { answer: 42 }
    const data = event.data
  })

  // MessagePortMain queues messages until the .start() method has been called.
  port.start()
})
```

Reply stream (one request, many responses):

```js
// renderer.js (Renderer Process)
const makeStreamingRequest = (element, callback) => {
  // MessageChannels are lightweight--it's cheap to create a new one for each
  // request.
  const { port1, port2 } = new MessageChannel()

  // We send one end of the port to the main process ...
  ipcRenderer.postMessage('give-me-a-stream', { element, count: 10 }, [port2])

  // ... and we hang on to the other end. The main process will send messages
  // to its end of the port, and close it when it's finished.
  port1.onmessage = (event) => {
    callback(event.data)
  }
  port1.onclose = () => {
    console.log('stream ended')
  }
}

makeStreamingRequest(42, (data) => {
  console.log('got response data:', data)
})
// We will see "got response data: 42" 10 times.
```

```js
// main.js (Main Process)
ipcMain.on('give-me-a-stream', (event, msg) => {
  // The renderer has sent us a MessagePort that it wants us to send our
  // response over.
  const [replyPort] = event.ports

  // Here we send the messages synchronously, but we could just as easily store
  // the port somewhere and send messages asynchronously.
  for (let i = 0; i < msg.count; i++) {
    replyPort.postMessage(msg.element)
  }

  // We close the port when we're done to indicate to the other end that we
  // won't be sending any more messages. This isn't strictly necessary--if we
  // didn't explicitly close the port, it would eventually be garbage
  // collected, which would also trigger the 'close' event in the renderer.
  replyPort.close()
})
```

## Notes

- The main process has no `MessagePort` / `MessageChannel`; it uses `MessagePortMain` and `MessageChannelMain`, which use the Node.js-style `.on('message')` events API and need `.start()`.
- Only the `postMessage` methods (`ipcRenderer.postMessage`, `WebContents.postMessage`) can transfer ports; `send` and `invoke` cannot.
- Electron adds a `close` event on ports, emitted when the other end closes (or is garbage-collected).
- The official page also shows renderer-to-renderer channels, a hidden-window worker, and sending a port to the main world of a context-isolated page; see the source URL.
