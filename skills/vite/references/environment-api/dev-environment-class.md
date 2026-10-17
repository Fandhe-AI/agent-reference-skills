---
source: https://vite.dev/guide/api-environment-instances#devenvironment-class
---

# DevEnvironment class

During dev, each environment in a Vite server is an instance of `DevEnvironment`, reachable through `server.environments`.

## Signature / Usage

```js
// create the server, or get it from the configureServer hook
const server = await createServer(/* options */)

const clientEnvironment = server.environments.client
clientEnvironment.transformRequest(url)
console.log(server.environments.ssr.moduleGraph)
```

```ts
class DevEnvironment {
  name: string
  hot: NormalizedHotChannel
  moduleGraph: EnvironmentModuleGraph
  plugins: Plugin[]
  pluginContainer: EnvironmentPluginContainer
  config: ResolvedConfig & ResolvedDevEnvironmentOptions

  constructor(
    name: string,
    config: ResolvedConfig,
    context: DevEnvironmentContext,
  )

  async transformRequest(url: string): Promise<TransformResult | null>
  async warmupRequest(url: string): Promise<void>
  async fetchModule(
    id: string,
    importer?: string,
    options?: FetchFunctionOptions,
  ): Promise<FetchResult>
}

interface DevEnvironmentContext {
  hot: boolean
  transport?: HotChannel | WebSocketServer
  options?: EnvironmentOptions
  remoteRunner?: {
    inlineSourceMap?: boolean
  }
  depsOptimizer?: DepsOptimizer
}

interface TransformResult {
  code: string
  map: SourceMap | { mappings: '' } | null
  etag?: string
  deps?: string[]
  dynamicDeps?: string[]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | `string` | Unique identifier for the environment in a Vite server. By default Vite exposes `client` and `ssr`. |
| hot | `NormalizedHotChannel` | Communication channel to send and receive messages from the associated module runner in the target runtime. |
| moduleGraph | `EnvironmentModuleGraph` | Graph of module nodes, with the imported relationship between processed modules and the cached result of the processed code. |
| plugins | `Plugin[]` | Resolved plugins for this environment, including the ones created using the per-environment `create` hook. |
| pluginContainer | `EnvironmentPluginContainer` | Allows to resolve, load, and transform code through the environment plugins pipeline. |
| config | `ResolvedConfig & ResolvedDevEnvironmentOptions` | Resolved config options for this environment. Server-global options are defaults for all environments and can be overridden (resolve conditions, external, optimizedDeps). |
| transformRequest(url) | `Promise<TransformResult \| null>` | Resolves the URL to an id, loads it, and processes the code using the plugins pipeline. The module graph is also updated. |
| warmupRequest(url) | `Promise<void>` | Registers a request to be processed with low priority, to avoid waterfalls. |
| fetchModule(id, importer?, options?) | `Promise<FetchResult>` | Called by the module runner to retrieve information about a module; wraps `transformRequest` in the format the runner understands. Not meant to be called manually. |

## Notes

- `transformRequest(url)` uses the plugin pipeline to resolve `url` to a module `id`, load it (from the file system or a virtual module plugin), then transform it. Imports and metadata are recorded in the environment module graph by creating or updating the module node, and the transform result is stored in the module.
- The docs note the `transformRequest` / `warmupRequest` names may be reviewed before release (for example `environment.processModule(url)` or `environment.loadModule(url)`).
- Plugins can access the current environment through `this.environment`.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Separate Module Graphs](./module-graphs.md)
- [FetchResult](./fetch-result.md)
- [Per-environment Hooks](./per-environment-hooks.md)
- [Environment Factories](./environment-factories.md)
