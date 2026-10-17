---
source: https://vite.dev/guide/api-environment-runtimes#environment-factories
---

# Environment Factories

Environment factories are implemented by runtime providers (not end users): they return `EnvironmentOptions` with defaults for a target runtime used in both dev and build, and can be built from the exposed `DevEnvironment` primitives.

## Signature / Usage

```ts
function createWorkerdEnvironment(
  userConfig: EnvironmentOptions,
): EnvironmentOptions {
  return mergeConfig(
    {
      resolve: {
        conditions: [/*...*/],
      },
      dev: {
        createEnvironment(name, config) {
          return createWorkerdDevEnvironment(name, config, {
            hot: true,
            transport: customHotChannel(),
          })
        },
      },
      build: {
        createEnvironment(name, config) {
          return createWorkerdBuildEnvironment(name, config)
        },
      },
    },
    userConfig,
  )
}
```

Config file usage:

```js
import { createWorkerdEnvironment } from 'vite-environment-workerd'

export default {
  environments: {
    ssr: createWorkerdEnvironment({
      build: {
        outDir: '/dist/ssr',
      },
    }),
    rsc: createWorkerdEnvironment({
      build: {
        outDir: '/dist/rsc',
      },
    }),
  },
}
```

Frameworks then use the environment with `const ssrEnvironment = server.environments.ssr`.

Creating a new dev environment from the primitives:

```ts
import { DevEnvironment, HotChannel } from 'vite'

function createWorkerdDevEnvironment(
  name: string,
  config: ResolvedConfig,
  context: DevEnvironmentContext
) {
  const connection = /* ... */
  const transport: HotChannel = {
    on: (listener) => { connection.on('message', listener) },
    send: (data) => connection.send(data),
  }

  const workerdDevEnvironment = new DevEnvironment(name, config, {
    options: {
      resolve: { conditions: ['custom'] },
      ...context.options,
    },
    hot: true,
    transport,
  })
  return workerdDevEnvironment
}
```

For an SSR environment in the same Node.js process as the Vite server, `createServerHotChannel` is a ready-made `HotChannel`:

```js
import { createServerHotChannel, DevEnvironment } from 'vite'

new DevEnvironment(name, config, {
  hot: true,
  transport: createServerHotChannel(),
})
```

## Notes

- This page is for runtime providers: authors integrating a JavaScript runtime (Node.js, browser, Cloudflare workerd, Worker thread) with Vite.
- A Vite dev server exposes `client` and `ssr` environments by default. The client environment is a browser environment whose module runner comes from the virtual module `/@vite/client`; the SSR environment runs in the same Node runtime as the Vite server.
- A Vite Module Runner processes code with Vite plugins before running it. Unlike `server.ssrLoadModule`, the runner is decoupled from the server, so authors can implement their own server-runner communication layer. The browser talks via the server WebSocket and HTTP; the Node runner calls functions directly; other environments may connect to workerd or a Worker Thread (as Vitest does).
- By default `HotChannel` transports have `server.fs` restrictions applied. If the transport is not exposed over the network (worker threads, in-process calls), set `skipFsCheck: true` on the `HotChannel` to bypass them.
- To ease runtime-agnostic framework code, implement the most flexible communication level possible (Runnable > Fetchable > raw).
- The `createWorkerd*` names are illustrative examples from the docs, not Vite exports.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [ModuleRunner](./module-runner.md)
- [ModuleRunnerTransport](./module-runner-transport.md)
- [DevEnvironment class](./dev-environment-class.md)
- [RunnableDevEnvironment](./runnable-dev-environment.md)
- [Custom Environment Instances](./custom-environment-instances.md)
