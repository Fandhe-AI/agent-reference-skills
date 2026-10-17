---
source: https://vite.dev/guide/api-environment-plugins#application-plugin-communication
---

# Application-Plugin Communication

`environment.hot` lets plugins communicate with application-side code for a given environment; the equivalent of client-server communication, but for environments other than the client.

## Signature / Usage

Plugin side:

```js
configureServer(server) {
  server.environments.ssr.hot.on('my:greetings', (data, client) => {
    // do something with the data,
    // and optionally send a response to that application instance
    client.send('my:foo:reply', `Hello from server! You said: ${data}`)
  })

  // broadcast a message to all application instances
  server.environments.ssr.hot.send('my:foo', 'Hello from server!')
}
```

## Notes

- Only available for environments that support HMR.
- Multiple application instances may run in the same environment (for example each browser tab is a separate instance with its own server connection).
- A new connection emits `vite:client:connect` on the environment's `hot` instance; closing it emits `vite:client:disconnect`. Each handler receives a `NormalizedHotChannelClient` as the second argument: an object with a `send` method to message that specific application instance. The reference is always the same for the same connection, so it can be kept to track the connection.
- The application side is the same as the Client-server Communication feature: use `import.meta.hot` to send messages to the plugin.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [hotUpdate Hook](./hot-update-hook.md)
- [DevEnvironment class](./dev-environment-class.md)
- [ModuleRunnerTransport](./module-runner-transport.md)
