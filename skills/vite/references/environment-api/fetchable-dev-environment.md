---
source: https://vite.dev/guide/api-environment-frameworks#fetchabledevenvironment
---

# FetchableDevEnvironment

A `DevEnvironment` that communicates with its runtime via the Fetch API interface, through the standardized `handleRequest` / `dispatchFetch` pair.

## Signature / Usage

```ts
import {
  createServer,
  createFetchableDevEnvironment,
  isFetchableDevEnvironment,
} from 'vite'

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  environments: {
    custom: {
      dev: {
        createEnvironment(name, config) {
          return createFetchableDevEnvironment(name, config, {
            handleRequest(request: Request): Promise<Response> | Response {
              // handle Request and return a Response
            },
          })
        },
      },
    },
  },
})

// Any consumer of the environment API can now call `dispatchFetch`
if (isFetchableDevEnvironment(server.environments.custom)) {
  const response: Response = await server.environments.custom.dispatchFetch(
    new Request('http://example.com/request-to-handle'),
  )
}
```

## Notes

- Since `RunnableDevEnvironment` is only possible in a limited set of runtimes, the docs recommend `FetchableDevEnvironment` instead.
- A common reason to use it: a framework supporting a runtime that cannot run Vite directly (e.g. Cloudflare Workers). Standardizing on the Fetch API gives one request-handling path across runtimes: dev middleware forwards each browser request as a `Request` and sends the returned `Response` back, mirroring production.
- Vite validates `dispatchFetch` input and output: the request must be an instance of the global `Request` class and the response an instance of the global `Response` class, otherwise Vite throws a `TypeError`.
- Although implemented as a class, `FetchableDevEnvironment` is considered an implementation detail by the Vite team and might change at any moment. The docs ask for feedback on the `FetchableDevEnvironment` proposal.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [RunnableDevEnvironment](./runnable-dev-environment.md)
- [raw DevEnvironment](./raw-dev-environment.md)
- [Environment Factories](./environment-factories.md)
