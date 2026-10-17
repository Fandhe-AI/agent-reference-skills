---
source: https://vite.dev/guide/api-environment-instances#separate-module-graphs
---

# Separate Module Graphs (EnvironmentModuleNode)

Each environment has an isolated module graph with the same signature, so generic algorithms can crawl or query it independent of the environment.

## Signature / Usage

```ts
class EnvironmentModuleNode {
  environment: string

  url: string
  id: string | null = null
  file: string | null = null

  type: 'js' | 'css'

  importers = new Set<EnvironmentModuleNode>()
  importedModules = new Set<EnvironmentModuleNode>()
  importedBindings: Map<string, Set<string>> | null = null

  info?: ModuleInfo
  meta?: Record<string, any>
  transformResult: TransformResult | null = null

  acceptedHmrDeps = new Set<EnvironmentModuleNode>()
  acceptedHmrExports: Set<string> | null = null
  isSelfAccepting?: boolean
  lastHMRTimestamp = 0
  lastInvalidationTimestamp = 0
}
```

`environment.moduleGraph` is an `EnvironmentModuleGraph`:

```ts
export class EnvironmentModuleGraph {
  environment: string

  urlToModuleMap = new Map<string, EnvironmentModuleNode>()
  idToModuleMap = new Map<string, EnvironmentModuleNode>()
  etagToModuleMap = new Map<string, EnvironmentModuleNode>()
  fileToModulesMap = new Map<string, Set<EnvironmentModuleNode>>()

  constructor(
    environment: string,
    resolveId: (url: string) => Promise<PartialResolvedId | null>,
  )

  async getModuleByUrl(
    rawUrl: string,
  ): Promise<EnvironmentModuleNode | undefined>

  getModuleById(id: string): EnvironmentModuleNode | undefined

  getModulesByFile(file: string): Set<EnvironmentModuleNode> | undefined

  onFileChange(file: string): void

  onFileDelete(file: string): void

  invalidateModule(
    mod: EnvironmentModuleNode,
    seen: Set<EnvironmentModuleNode> = new Set(),
    timestamp: number = monotonicDateNow(),
    isHmr: boolean = false,
  ): void

  invalidateAll(): void

  async ensureEntryFromUrl(
    rawUrl: string,
    setIsSelfAccepting = true,
  ): Promise<EnvironmentModuleNode>

  createFileOnlyEntry(file: string): EnvironmentModuleNode

  async resolveUrl(url: string): Promise<ResolvedUrl>

  updateModuleTransformResult(
    mod: EnvironmentModuleNode,
    result: TransformResult | null,
  ): void

  getModuleByEtag(etag: string): EnvironmentModuleNode | undefined
}
```

## Notes

- `hotUpdate` is the example use: when a file changes, each environment's module graph is used to discover affected modules and perform HMR for each environment independently.
- Modules may be registered in the graph without yet being processed (`transformResult` is `null`). `importers` and `importedModules` are updated after the module is processed.
- Vite v5 had a mixed Client and SSR module graph with prefixed properties such as `clientImportedModules` / `ssrImportedModules` (and `importedModules` as the union), and `transformResult` / `ssrTransformResult`. A backward compatibility layer lets the ecosystem migrate from the deprecated `server.moduleGraph`.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [DevEnvironment class](./dev-environment-class.md)
- [hotUpdate Hook](./hot-update-hook.md)
- [FetchResult](./fetch-result.md)
