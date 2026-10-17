---
source: https://vite.dev/guide/api-environment#custom-environment-instances
---

# Custom Environment Instances / Backward Compatibility

Runtime providers can supply environments with proper defaults for their runtime; the existing Vite server API stays backward compatible with Vite 5.

## Signature / Usage

```js
import { customEnvironment } from 'vite-environment-provider'

export default {
  build: {
    outDir: '/dist/client',
  },
  environments: {
    ssr: customEnvironment({
      build: {
        outDir: '/dist/ssr',
      },
    }),
  },
}
```

## Notes

- Low level configuration APIs let providers expose environments that may spawn other processes or threads to run modules during dev in a runtime closer to production. Example from the docs: the Cloudflare Vite plugin uses the Environment API to run code in the Cloudflare Workers runtime (`workerd`) during development.
- Backward compatibility: the current Vite server API is not yet deprecated and is backward compatible with Vite 5. `server.moduleGraph` returns a mixed view of the client and ssr module graphs, with backward compatible mixed module nodes from all its methods. The same scheme is used for module nodes passed to `handleHotUpdate`.
- The docs do not recommend switching to the Environment API yet, so that plugins do not need to maintain two versions. Future breaking changes: `this.environment` in hooks, HMR `hotUpdate` hook, move to per-environment APIs, SSR using `ModuleRunner` API, shared plugins during build.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Environments Configuration](./environments-configuration.md)
- [Environment Factories](./environment-factories.md)
- [DevEnvironment class](./dev-environment-class.md)
- [hotUpdate Hook](./hot-update-hook.md)
