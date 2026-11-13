---
source: https://opencode.ai/docs/build/plugins/effect/#lifecycle
---

# Lifecycle

The `effect` runs when the plugin loads. Its scope closes when the plugin reloads or unloads, so registrations,
scoped fibers, and finalizers are released together.

## Signature / Usage

```ts
import { Plugin } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "lifecycle",
  effect: (ctx) =>
    Effect.gen(function* () {
      yield* Effect.logInfo("loaded", { version: ctx.app.version })
      yield* Effect.addFinalizer(() => Effect.logInfo("unloaded"))
    }),
})
```

Use scoped fibers for background work. The plugin scope interrupts the fiber during cleanup.

Adapted (not in the official docs): the official example passes `storage.set("heartbeat", { time: Date.now() })` directly, so `Date.now()` runs once when the effect is built; `Effect.suspend` reads the time on every repetition.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const storage = ctx.storage
    yield* Effect.repeat(
      Effect.suspend(() => storage.set("heartbeat", { time: Date.now() })),
      { schedule: Schedule.spaced("1 minute") },
    ).pipe(Effect.forkScoped)
  }),
```

### Context

The context exposes the Effect client for the connected OpenCode server plus plugin-only transforms, hooks, storage,
reloads, and options. It does not expose OpenCode's private Core services.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const plugins = ctx.plugin
    const active = yield* plugins.list().pipe(Effect.orDie)
    yield* Effect.logInfo("active plugins", { count: active.data.length })
  }),
```

The plugin definition and complete context are declared as follows.

```ts
interface Context {
  readonly app: App
  readonly location: Location.Info
  readonly options: PluginOptions
  readonly agent: AgentDomain
  readonly aisdk: AISDKDomain
  readonly command: CommandDomain
  readonly event: EventDomain
  readonly experimental: {
    readonly terminal: Pick<ExperimentalApi<unknown>["persistentPty"], "read">
    readonly generate: GenerateApi<unknown>
  }
  readonly integration: IntegrationDomain
  readonly mcp: MCPDomain
  readonly model: ModelDomain
  /** @deprecated Use `experimental.generate.text`. */
  readonly generate: Pick<ExperimentalGenerateApi<unknown>, "text">
  readonly permission: PermissionDomain
  readonly plugin: Pick<PluginApi<unknown>, "list">
  readonly provider: ProviderDomain
  readonly reference: ReferenceDomain
  readonly rpc: RpcDomain
  readonly session: SessionDomain
  readonly shell: ShellDomain
  readonly skill: SkillDomain
  readonly storage: StorageDomain
  readonly tool: ToolDomain
  readonly vcs: VcsDomain
  readonly websearch: WebSearchDomain
  readonly worktree: WorktreeDomain
}

interface Plugin<R = Scope.Scope> {
  readonly id: string
  readonly effect: (context: Context) => Effect.Effect<void, never, R>
}
```

### Options

Pass options with the object form in `opencode.json(c)`.

```jsonc title="opencode.jsonc"
{
  "plugins": [
    {
      "package": "./plugins/company-effect",
      "options": { "strict": true },
    },
  ],
}
```

Read options from `ctx.options`. Narrow unknown values before use.

```ts title="plugins/company-effect/index.ts"
import { Plugin } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "company",
  effect: (ctx) =>
    Effect.gen(function* () {
      const strict = ctx.options.strict === true
      yield* Effect.logInfo("company plugin configured", { strict })
    }),
})
```

## Notes

- Adapted from the official docs: the heartbeat example wraps `storage.set` in `Effect.suspend`, so each repetition stores the current time instead of the time the effect was built.
- The heartbeat example: `Effect.repeat` ends on the first failure, and a failed `forkScoped` fiber reports to no one, so add `Effect.retry` or `Effect.catch` inside the loop if it must keep running. The snippet omits `import { Schedule } from "effect"`.
- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect` or similar hooks.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [overview.md](./overview.md)
- [transforms.md](./transforms.md)
- [api.md](./api.md)
