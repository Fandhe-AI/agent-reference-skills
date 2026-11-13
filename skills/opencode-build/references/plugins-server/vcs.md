---
source: https://opencode.ai/docs/build/plugins/server/#vcs
---

# VCS

Read repository information, working-copy status, or file diffs, and register a VCS provider with a transform.

## Signature / Usage

```ts
const info = await ctx.vcs.get()
const branches = await ctx.vcs.branch.list({ search: "feature", limit: 10 })
const changes = await ctx.vcs.status()
const diff = await ctx.vcs.diff({ mode: "working", context: 3 })
```

Register a location-scoped VCS provider with a transform. A provider matching the detected repository type is selected automatically; use `editor.default.set` to select a different provider.

```ts
await ctx.vcs.transform((editor) => {
  editor.add({
    id: "custom",
    name: "Custom VCS",
    info: async () => ({ branch: { current: "feature", default: "main" } }),
    branches: async (input, { signal }) => readBranches(input, signal),
    status: async (scope, { signal }) => readStatus(scope.worktree, signal),
    diff: async (input, { signal }) => readDiff(input, signal),
  })
  editor.default.set("custom")
})
```

Provider callbacks receive the current location, working-copy root, canonical project root, and optional repository store. Diff callbacks also receive the selected mode, requested context, and output byte budget. Repository discovery continues to use OpenCode's built-in Git and Mercurial detectors.

Providers can optionally implement `init(scope, { signal })` to create a repository in `scope.worktree`. Initialization selects the provider by ID (Git by default), not by the detected repository type. Register a provider with `init` even when the location has no repository yet; OpenCode checks that the directory exists and has no repository before calling it, then rediscovers the project. New repository formats still need discovery support beyond this callback.

### Reference

Schemas: [`Vcs.Info`](https://opencode.ai/docs/api/#schema-Vcs.Info), [`Vcs.FileStatus`](https://opencode.ai/docs/api/#schema-Vcs.FileStatus), [`FileDiff.Info`](https://opencode.ai/docs/api/#schema-FileDiff.Info)

```ts
interface VcsContext {
  get(input?: VcsGetInput, requestOptions?: RequestOptions): Promise<VcsGetOutput>
  branch: {
    list(input?: VcsBranchListInput, requestOptions?: RequestOptions): Promise<VcsBranchListOutput>
  }
  status(input?: VcsStatusInput, requestOptions?: RequestOptions): Promise<VcsStatusOutput>
  diff(input: VcsDiffInput, requestOptions?: RequestOptions): Promise<VcsDiffOutput>
  transform(callback: (editor: VcsEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface VcsEditor {
  add(definition: VcsDefinition): void
  default: {
    get(): string | undefined
    set(providerID: string): void
  }
}

interface VcsDefinition {
  init?(scope: VcsScope, context: { signal: AbortSignal }): Promise<void>
  // Existing info, branches, status, and diff callbacks are required.
}
```

## Related

- [Worktrees](./worktrees.md)
- [Transforms](./transforms.md)
