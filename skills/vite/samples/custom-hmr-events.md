---
source: https://vite.dev/guide/api-plugin#client-server-communication
---

# Custom HMR Events

Send custom events between a plugin on the dev server and client code with `server.ws` and `import.meta.hot`.

```js
// vite.config.js — server side
export default defineConfig({
  plugins: [
    {
      // ...
      configureServer(server) {
        server.ws.on('connection', () => {
          server.ws.send('my:greetings', { msg: 'hello' })
        })
        server.ws.on('my:from-client', (data, client) => {
          console.log('Message from client:', data.msg) // Hey!
          // reply only to the client (if needed)
          client.send('my:ack', { msg: 'Hi! I got your message!' })
        })
      },
    },
  ],
})
```

```ts
// client side
if (import.meta.hot) {
  import.meta.hot.on('my:greetings', (data) => {
    console.log(data.msg) // hello
  })
  import.meta.hot.send('my:from-client', { msg: 'Hey!' })
}
```

```ts
// events.d.ts
import 'vite/types/customEvent.d.ts'

declare module 'vite/types/customEvent.d.ts' {
  interface CustomEventMap {
    'custom:foo': { msg: string }
    // 'event-key': payload
  }
}
```

## Notes

- Always prefix event names to avoid collisions with other plugins.
- `hot.send` buffers data if called before the connection is established.
- Include the `.d.ts` extension in the `import` and `declare module` specifiers, otherwise TypeScript may not find the file to extend.
- Guard HMR API usage with `if (import.meta.hot)` so it is tree-shaken in production.
