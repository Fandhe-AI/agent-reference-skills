---
source: https://opencode.ai/docs/build/plugins/server/#worktrees
---

# Worktrees

Register a local worktree strategy and run project-based worktree operations from a plugin.

## Signature / Usage

Register a local worktree strategy using the normal plugin lifecycle. The implementation module in this example owns option validation and the backend's `create`, `remove`, and `list` operations.

```ts title="plugins/worktrees/index.ts"
import { Plugin } from "@opencode/plugin"
import { makeStrategy } from "./strategy"

export default Plugin.define({
  id: "company.worktrees",
  async setup(ctx) {
    const strategy = makeStrategy(ctx.options)
    await ctx.worktree.transform((editor) => {
      editor.add(strategy)
    })
  },
})
```

Load the plugin through `plugins` and configure the common destination separately:

```jsonc title="opencode.jsonc"
{
  "worktree": { "directory": "../worktrees" },
  "plugins": [{ "package": "./plugins/worktrees", "options": {} }],
}
```

- Adding a strategy selects it automatically. The last active registration wins; no strategy-selection config is needed.
- Disposing its registration or unloading the plugin restores the previous implementation, ultimately the bundled Git strategy.
- `reload()` replays transforms after captured inputs change; it does not rerun plugin setup.
- Creation failures do not retry through Git. Existing worktrees retain their recorded owner even when the default changes.
- Strategies manage local directories. Remote workspace provisioning is not part of this interface.

### Operations

The plugin context exposes the same project-based worktree operations as the client. Every operation requires a `projectID`. `list` reads only saved inventory, including known checkouts of the same project; it does not load configuration, start plugins, or discover filesystem changes.

```ts
const projectID = ctx.location.project.id
const created = await ctx.worktree.create({ projectID, name: "task" })
const inventory = await ctx.worktree.list({ projectID })
await ctx.worktree.refresh({ projectID })
await ctx.worktree.remove({ projectID, directory: created.directory, force: false })
```

Create loads configuration and plugins from the project's saved `canonical` directory and uses their selected strategy. It accepts an optional parent `directory`, source `from`, starting `branch`, and `name`. The source defaults to the canonical checkout, and a `from` override must belong to that project. Choosing a source does not change the configuration root. A supplied starting ref must be supported by the selected strategy; Rift's native snapshot operation, for example, has no ref-selection option.

Create and refresh wait for the canonical checkout's plugins to activate. Calls made during that checkout's plugin setup see registrations made so far and do not wait for their own activation.

Remove loads the canonical configuration and activates its plugins, then uses the worktree's recorded strategy rather than the currently selected default. An unavailable recorded owner produces an error. The worktree's destination can be elsewhere:

```ts
await ctx.worktree.remove({
  directory: "/worktrees/task",
  projectID,
  force: false,
})
```

Missing owners fail removal rather than falling back to Git. A strategy can throw `new Worktree.OperationError({ message: "Uncommitted changes", forceRequired: true })`, importing `Worktree` from `@opencode/plugin`, to request force confirmation without depending on Core or Git errors.

Refresh loads canonical configuration and asks all available strategies to find worktrees across known checkout roots. It combines results, preserves recorded ownership, and prunes missing directories. A failed discovery source is logged while other sources continue. Existing directories remain saved even if no available strategy reports them. Observe `worktree.updated` and call `list` again to read changed inventory.

```ts
await ctx.worktree.refresh({ projectID })
```

### Reference

Implementations receive a suggested destination after naming and collision handling. Return the actual directory from `create`; it may differ when a backend requires its own layout. OpenCode resolves the returned path and uses it for inventory, startup commands, and the API result. The returned directory must exist.

Strategies choosing another destination handle naming collisions there. OpenCode still creates the suggested parent directory before calling the strategy. `list` must report only directories the strategy owns, plus any repository roots.

```ts
interface WorktreeDefinition {
  readonly id: string
  create(
    input: { sourceDirectory: string; directory: string; branch?: string },
    context: { signal: AbortSignal },
  ): Promise<{ directory: string }>
  remove(input: { directory: string; force: boolean }, context: { signal: AbortSignal }): Promise<void>
  list(
    sourceDirectory: string,
    context: { signal: AbortSignal },
  ): Promise<readonly { directory: string; type: "root" | "worktree" }[]>
}

interface WorktreeEditor {
  add(definition: WorktreeDefinition): void
}

interface WorktreeDomain extends WorktreeApi {
  transform(callback: (editor: WorktreeEditor) => void): Promise<Registration>
  reload(): Promise<void>
}
```

Promise callbacks must cooperate with `signal` cancellation. Effect callbacks return Effects and use Effect interruption instead. Registrations remain scoped to the plugin runtime; project operations use the canonical checkout's registry. Core configuration adapters feed directory settings into that registry.

## Notes

- The examples call `ctx.worktree.remove` with `force: false`. Review uncommitted changes before passing `force: true`.
- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect`.

## Related

- [VCS](./vcs.md)
- [Lifecycle](./lifecycle.md)
