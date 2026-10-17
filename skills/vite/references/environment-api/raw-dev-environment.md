---
source: https://vite.dev/guide/api-environment-frameworks#raw-devenvironment
---

# raw DevEnvironment

When an environment implements neither `RunnableDevEnvironment` nor `FetchableDevEnvironment`, communication must be set up manually, via a virtual module or via `hot.send`.

## Signature / Usage

Same runtime as user modules (no Node.js-specific APIs): use a virtual module.

```ts
// code using the Vite's APIs
import { createServer } from 'vite'

const server = await createServer({
  plugins: [
    // a plugin that handles `virtual:entrypoint`
    {
      name: 'virtual-module',
      /* plugin implementation */
    },
  ],
})
const ssrEnvironment = server.environments.ssr
const input = {}

// use exposed functions by each environment factories that runs the code
// check for each environment factories what they provide
if (ssrEnvironment instanceof CustomDevEnvironment) {
  ssrEnvironment.runEntrypoint('virtual:entrypoint')
} else {
  throw new Error(`Unsupported runtime for ${ssrEnvironment.name}`)
}

// -------------------------------------
// virtual:entrypoint
const { createHandler } = await import('./entrypoint.js')
// `input` is embedded by the virtual-module plugin
const input = /* embedded by plugin */ {}
const handler = createHandler(input)
const response = handler(new Request('http://example.com/'))

// -------------------------------------
// ./entrypoint.js
export function createHandler(input) {
  return function handler(req) {
    return new Response('hello')
  }
}
```

Calling `transformIndexHtml` on the user module through a virtual module plugin:

```ts
function vitePluginVirtualIndexHtml(): Plugin {
  let server: ViteDevServer | undefined
  return {
    name: vitePluginVirtualIndexHtml.name,
    configureServer(server_) {
      server = server_
    },
    resolveId(source) {
      return source === 'virtual:index-html' ? '\0' + source : undefined
    },
    async load(id) {
      if (id === '\0' + 'virtual:index-html') {
        let html: string
        if (server) {
          this.addWatchFile('index.html')
          html = fs.readFileSync('index.html', 'utf-8')
          html = await server.transformIndexHtml('/', html)
        } else {
          html = fs.readFileSync('dist/client/index.html', 'utf-8')
        }
        return `export default ${JSON.stringify(html)}`
      }
      return
    },
  }
}
```

If the code requires Node.js APIs, communicate with `hot.send` from the user modules:

```ts
// code using the Vite's APIs
import { createServer } from 'vite'

const server = await createServer({
  plugins: [
    // a plugin that handles `virtual:entrypoint`
    {
      name: 'virtual-module',
      /* plugin implementation */
    },
  ],
})
const ssrEnvironment = server.environments.ssr
const input = {}

// use exposed functions by each environment factories that runs the code
// check for each environment factories what they provide
if (ssrEnvironment instanceof RunnableDevEnvironment) {
  await ssrEnvironment.runner.import('virtual:entrypoint')
} else if (ssrEnvironment instanceof CustomDevEnvironment) {
  ssrEnvironment.runEntrypoint('virtual:entrypoint')
} else {
  throw new Error(`Unsupported runtime for ${ssrEnvironment.name}`)
}

const req = new Request('http://example.com/')

const uniqueId = 'a-unique-id'
const response = await new Promise((resolve) => {
  const onResponse = (data) => {
    data = deserialize(data)
    if (data.uniqueId === uniqueId) {
      ssrEnvironment.hot.off('response', onResponse)
      resolve(data.res)
    }
  }
  // register the listener before sending the request
  ssrEnvironment.hot.on('response', onResponse)
  ssrEnvironment.hot.send('request', serialize({ req, uniqueId }))
})

// -------------------------------------
// virtual:entrypoint
const { createHandler } = await import('./entrypoint.js')
// `input` is embedded by the virtual-module plugin
const input = /* embedded by plugin */ {}
const handler = createHandler(input)

import.meta.hot.on('request', (data) => {
  const { req, uniqueId } = deserialize(data)
  const res = handler(req)
  import.meta.hot.send('response', serialize({ res: res, uniqueId }))
})

const response = handler(new Request('http://example.com/'))

// -------------------------------------
// ./entrypoint.js
export function createHandler(input) {
  return function handler(req) {
    return new Response('hello')
  }
}
```

## Notes

- The virtual-module approach removes the need to access the value from code using Vite's APIs.
- The `hot.send` approach may not work the same way after the build process.
- `CustomDevEnvironment` and `runEntrypoint` in the examples are placeholders for what a given environment factory exposes; check what each environment factory provides. `serialize` / `deserialize` are likewise illustrative helpers.
- Upstream snippet registers the 'response' listener after `hot.send`; adjusted here to register before sending and remove it (`hot.off`) after the matching response.
- Upstream snippet references the host-side `input` from inside `virtual:entrypoint`; modules do not share lexical scope, so the value must be embedded by the virtual-module plugin (or passed via the environment's init/communication channel).
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [RunnableDevEnvironment](./runnable-dev-environment.md)
- [FetchableDevEnvironment](./fetchable-dev-environment.md)
- [Environment Factories](./environment-factories.md)
- [Application-Plugin Communication](./application-plugin-communication.md)
