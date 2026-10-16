# Mocking Requests

Because Vitest runs in Node, web APIs are not available and network requests need something that mimics network behavior. Mock Service Worker (MSW) is recommended: it mocks `http`, `WebSocket` and `GraphQL` requests and is framework agnostic.

## Signature / Usage

MSW intercepts the requests your tests make, so application code does not change. In the browser it uses the Service Worker API; in Node.js and Vitest it uses the `@mswjs/interceptors` library. Use it in a setup file (`setupFiles`).

HTTP setup:

```js
import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

const posts = [
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body',
  },
  // ...
]

export const restHandlers = [
  http.get('https://rest-endpoint.example/path/to/posts', () => {
    return HttpResponse.json(posts)
  }),
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers())
```

GraphQL setup (handlers differ; server lifecycle is identical):

```js
import { graphql, HttpResponse } from 'msw'

const graphqlHandlers = [
  graphql.query('ListPosts', () => {
    return HttpResponse.json({
      data: { posts },
    })
  }),
]

const server = setupServer(...graphqlHandlers)
```

WebSocket setup (handlers differ; server lifecycle is identical):

```js
import { ws } from 'msw'

const chat = ws.link('wss://chat.example.com')

const wsHandlers = [
  chat.addEventListener('connection', ({ client }) => {
    client.addEventListener('message', (event) => {
      console.log('Received message from client:', event.data)
      // Echo the received message back to the client
      client.send(`Server received: ${event.data}`)
    })
  }),
]

const server = setupServer(...wsHandlers)
```

## Notes

- Source: https://vitest.dev/guide/mocking/requests (docs at tag `v5.0.5`).
- `onUnhandledRequest: 'error'` makes the server throw whenever a request has no corresponding handler.
- The GraphQL and WebSocket snippets above abbreviate the shared imports (`afterAll`, `afterEach`, `beforeAll`, `setupServer`) and the `beforeAll` / `afterAll` / `afterEach` lifecycle lines from the HTTP setup; the official page repeats them in full.
- MSW can also handle cookies, query parameters and mock error responses; see the MSW documentation (https://mswjs.io/docs).

## Related

- [Mocking Patterns](./mocking.md)
- [Mocking Globals](./mocking-globals.md)
