---
source: https://opencode.ai/docs/build/plugins/effect/#api
---

# API

The context exposes the Effect client for the connected OpenCode server plus plugin-only transforms, hooks, storage,
reloads, and options.

## Signature / Usage

### Agent

Read all agents or fetch one by ID. Client responses include the resolved location and schema data.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const agent = ctx.agent
    const agents = yield* agent.list().pipe(Effect.orDie)
    const build = yield* agent.get({ agentID: Agent.ID.make("build") }).pipe(Effect.orDie)
    yield* Effect.logInfo("agents", { count: agents.data.length, build: build.data.name })
  }),
```

Transform or reload agents.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const agent = ctx.agent
    yield* agent.transform((editor) => {
      editor.default("build")
      editor.update("build", (item) => (item.description = "Builds features and fixes bugs"))
      editor.remove("legacy")
    })
    yield* agent.reload()
  }),
```

Schema: [`Agent.Info`](https://opencode.ai/docs/api/#schema-Agent.Info).

```ts
interface AgentEditor {
  list(): readonly Types.DeepMutable<Agent.Info>[]
  get(id: string): Types.DeepMutable<Agent.Info> | undefined
  default(id: string | undefined): void
  update(id: string, update: (agent: Types.DeepMutable<Agent.Info>) => void): void
  remove(id: string): void
}

interface AgentDomain extends AgentApi<unknown> {
  readonly transform: Transform<AgentEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Providers

Read available providers or inspect one provider's metadata by ID.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const provider = ctx.provider
    const providers = yield* provider.list().pipe(Effect.orDie)
    const anthropic = yield* provider.get({ providerID: Provider.ID.make("anthropic") }).pipe(Effect.orDie)
    yield* Effect.logInfo("providers", {
      providers: providers.data.length,
      anthropic: anthropic.data.name,
    })
  }),
```

Provider transforms edit provider settings and source definitions. Editor reads include inactive providers and expose
immutable definitions; `models.update` edits an owned copy of a source model.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    yield* ctx.provider.transform((editor) => {
      editor.update("anthropic", (provider) => {
        provider.headers = { ...provider.headers, "x-company": "engineering" }
      })
      editor.models.update("anthropic", "claude-sonnet-5-5", (model) => (model.name = "Team Sonnet"))
      editor.models.remove("anthropic", "legacy-model")
      editor.remove("legacy-provider")
    })
  }),
```

Replace a source inventory with `models.set`, then reload after its captured definitions change.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const provider = ctx.provider
    const source = { models: yield* loadModels() }
    yield* provider.transform((editor) => editor.models.set("acme", source.models))
    source.models = yield* loadModels()
    yield* provider.reload()
  }),
```

For account-specific discovery, pass the connection used to load the inventory as `sourceConnection`. OpenCode excludes
that provider while another connection is selected, until your plugin publishes its refreshed inventory.

```ts
const connection = yield* ctx.integration.connection.active("acme")
if (!connection) return
const inventory = yield* loadInventory(connection)
yield* ctx.provider.transform((editor) => {
  editor.add({ info: inventory.provider, models: inventory.models, sourceConnection: connection })
})
```

Schemas: [`Provider.Info`](https://opencode.ai/docs/api/#schema-Provider.Info), [`Model.Info`](https://opencode.ai/docs/api/#schema-Model.Info).

```ts
interface ProviderRecord {
  readonly provider: Provider.Info
  readonly models: ReadonlyMap<string, Model.Info>
  readonly sourceConnection?: ConnectionInfo
}

interface ProviderEditor {
  list(): readonly ProviderRecord[]
  get(providerID: string): ProviderRecord | undefined
  add(input: { info: Provider.Info; models: readonly Model.Info[]; sourceConnection?: ConnectionInfo }): void
  update(providerID: string, update: (provider: Types.DeepMutable<Provider.Info>) => void): void
  remove(providerID: string): void
  readonly models: {
    set(providerID: string, models: readonly Model.Info[]): void
    update(providerID: string, modelID: string, update: (model: Types.DeepMutable<Model.Info>) => void): void
    remove(providerID: string, modelID: string): void
  }
}

interface ProviderDomain extends ProviderApi<unknown> {
  readonly transform: Transform<ProviderEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Models

Read available models and the default selection.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const model = ctx.model
    const models = yield* model.list().pipe(Effect.orDie)
    const selected = yield* model.default().pipe(Effect.orDie)
    yield* Effect.logInfo("models", { count: models.data.length, selected: selected.data?.name })
  }),
```

Model transforms edit the entire active-provider candidate collection. Disabled candidates remain editable until all
transforms finish; `update` can add a model only under an available provider.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    yield* ctx.model.transform((editor) => {
      editor.list("anthropic").forEach((model) => {
        editor.update(model.providerID, model.id, (draft) => {
          draft.enabled = draft.capabilities.tools
        })
      })
      editor.default.set("anthropic", "claude-sonnet-5-5")
      editor.remove("anthropic", "legacy-model")
    })
  }),
```

Callbacks edit raw model overrides. Provider defaults are merged once when OpenCode commits the result; unchanged reads
reuse that result. `editor.provider` reads immutable source definitions, including inactive templates, rather than
model-transform output.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const model = ctx.model
    yield* model.transform((editor) => {
      const source = editor.provider.get("anthropic")?.models.get("claude-sonnet-5-5")
      if (!source) return
      editor.update("anthropic", source.id, (draft) => {
        draft.limit.context = Math.min(draft.limit.context, source.limit.context)
      })
    })
    yield* model.reload()
  }),
```

Schema: [`Model.Info`](https://opencode.ai/docs/api/#schema-Model.Info).

```ts
interface ModelEditor {
  list(providerID?: string): readonly Types.DeepMutable<Model.Info>[]
  get(providerID: string, modelID: string): Types.DeepMutable<Model.Info> | undefined
  update(providerID: string, modelID: string, update: (model: Types.DeepMutable<Model.Info>) => void): void
  remove(providerID: string, modelID: string): void
  readonly default: {
    get(): { providerID: string; modelID: string } | undefined
    set(providerID: string, modelID: string): void
  }
  readonly provider: {
    list(): readonly ProviderRecord[]
    get(providerID: string): ProviderRecord | undefined
  }
}

interface ModelDomain extends ModelApi<unknown> {
  readonly transform: Transform<ModelEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Commands

Read commands available at the current location.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const command = ctx.command
    const commands = yield* command.list().pipe(Effect.orDie)
    yield* Effect.logInfo("commands", { names: commands.data.map((item) => item.name) })
  }),
```

The current command transform is add-only. An executor receives the session, prompt attachments, and delivery mode.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const command = ctx.command
    const session = ctx.session
    yield* command.transform((editor) => {
      editor.add({
        name: "security-review",
        description: "Review changes for security issues",
        execute: (input) =>
          session.prompt({
            ...input.prompt,
            sessionID: input.sessionID,
            text: `Review these changes for security issues.\n\n${input.prompt.text}`,
            delivery: input.delivery,
          }).pipe(Effect.asVoid),
      })
    })
    yield* command.reload()
  }),
```

Schemas: [`Command.Info`](https://opencode.ai/docs/api/#schema-Command.Info),
[`Session.Inbox.Delivery`](https://opencode.ai/docs/api/#schema-Session.Inbox.Delivery).

```ts
interface CommandInvocation {
  readonly sessionID: Session.ID
  readonly prompt: PromptInput.Prompt
  readonly delivery: SessionInbox.Delivery
}

interface CommandDefinition {
  readonly name: string
  readonly description?: string
  readonly execute: (input: CommandInvocation) => Effect.Effect<void, unknown>
}

interface CommandEditor {
  add(definition: CommandDefinition): void
}

interface CommandDomain extends Pick<CommandApi<unknown>, "list"> {
  readonly transform: Transform<CommandEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Integrations

Read integrations and resolve the active credential when one exists.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const integration = ctx.integration
    const integrations = yield* integration.list().pipe(Effect.orDie)
    const github = yield* integration.get({ integrationID: Integration.ID.make("github") }).pipe(Effect.orDie)
    const connection = yield* integration.connection.active("github")
    const credential = connection ? yield* integration.connection.resolve(connection).pipe(Effect.orDie) : undefined
    yield* Effect.logInfo("integration", {
      count: integrations.data.length,
      github: github.data.name,
      credential: credential?.type,
    })
  }),
```

Connect with a key or drive an OAuth attempt through the connected API.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const integration = ctx.integration
    const token = yield* Config.Redacted("GITHUB_TOKEN").pipe(Effect.orDie)
    yield* integration.connect
      .key({ integrationID: Integration.ID.make("github"), key: Redacted.value(token) })
      .pipe(Effect.orDie)

    const attempt = yield* integration.oauth
      .connect({
        integrationID: Integration.ID.make("acme"),
        methodID: Integration.MethodID.make("oauth"),
      })
      .pipe(Effect.orDie)
    const status = yield* integration.oauth
      .status({
        integrationID: Integration.ID.make("acme"),
        attemptID: attempt.data.attemptID,
      })
      .pipe(Effect.orDie)
    yield* Effect.logInfo("OAuth status", { status: status.data })
  }),
```

Transform integrations and authentication methods. OAuth method callbacks are Effects and may acquire scoped
resources.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const integration = ctx.integration
    yield* integration.transform((editor) => {
      editor.update("acme", (item) => (item.name = "Acme"))
      editor.method.update({
        integrationID: "acme",
        method: { id: "device", type: "oauth", label: "Sign in with Acme" },
        authorize: () =>
          Effect.succeed({
            mode: "code",
            url: "https://acme.example/device",
            instructions: "Enter the displayed code",
            callback: (code) => exchangeCode(code),
          }),
      })
    })
    yield* integration.reload()
  }),
```

Schemas: [`Integration.Info`](https://opencode.ai/docs/api/#schema-Integration.Info), [`Integration.Method`](https://opencode.ai/docs/api/#schema-Integration.Method),
[`Connection.Info`](https://opencode.ai/docs/api/#schema-Connection.Info), [`Form.Answer`](https://opencode.ai/docs/api/#schema-Form.Answer).

```ts
type IntegrationOAuthAuthorization = {
  readonly url: string
  readonly instructions: string
  readonly expiresAt?: number
} & (
  | { readonly mode: "auto"; readonly callback: Effect.Effect<Credential.OAuth, unknown> }
  | { readonly mode: "code"; readonly callback: (code: string) => Effect.Effect<Credential.OAuth, unknown> }
)

type IntegrationOAuthMethodRegistration = {
  readonly integrationID: string
  readonly method: IntegrationOAuthMethod
  readonly authorize: (answer: Form.Answer) => Effect.Effect<IntegrationOAuthAuthorization, unknown, Scope.Scope>
  readonly refresh?: (credential: Credential.OAuth) => Effect.Effect<Credential.OAuth, unknown>
  readonly label?: (credential: Credential.OAuth) => string | undefined
}

interface IntegrationEditor {
  list(): readonly IntegrationRef[]
  get(id: string): IntegrationRef | undefined
  update(id: string, update: (integration: IntegrationRef) => void): void
  remove(id: string): void
  readonly method: {
    list(integrationID: string): readonly IntegrationMethod[]
    update(input: IntegrationMethodRegistration): void
    remove(integrationID: string, method: IntegrationMethod): void
  }
}

interface IntegrationDomain extends Omit<IntegrationApi<unknown>, "wellknown"> {
  readonly transform: Transform<IntegrationEditor>
  readonly reload: () => Effect.Effect<void>
  readonly connection: {
    readonly active: (integrationID: string) => Effect.Effect<ConnectionInfo | undefined>
    readonly resolve: (connection: ConnectionInfo) => Effect.Effect<Credential.Value | undefined, unknown>
  }
}
```

### MCP

List MCP servers and their current connection state.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const mcp = ctx.mcp
    const servers = yield* mcp.list().pipe(Effect.orDie)
    yield* Effect.logInfo("MCP servers", { count: servers.data.length })
  }),
```

Plugins manage MCP servers only through transforms. Use `editor.set` to add or replace a server, `editor.update` to
change its configuration, and `editor.remove` to remove it. Inspect configuration with `editor.list` and `editor.get`.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const mcp = ctx.mcp
    yield* mcp.transform((editor) => {
      const servers = editor.list()
      const docs = editor.get("docs")
      editor.set("docs", { type: "remote", url: "https://mcp.example.com" })
      editor.update("docs", (server) => (server.disabled = false))
      editor.remove("legacy")
    })
  }),
```

Set `disabled: true` in a transform to disable a server and disconnect it, or `disabled: false` to enable it and allow
OpenCode to connect. OpenCode reconciles server lifecycle from the transformed configuration.

Call `reload()` after external state used by a transform changes to reapply transforms and reconcile the servers.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const mcp = ctx.mcp
    yield* mcp.reload()
  }),
```

Schemas: [`Mcp.Server`](https://opencode.ai/docs/api/#schema-Mcp.Server), [`Mcp.LocalConfigEncoded`](https://opencode.ai/docs/api/#schema-Mcp.LocalConfigEncoded),
[`Mcp.RemoteConfigEncoded`](https://opencode.ai/docs/api/#schema-Mcp.RemoteConfigEncoded).

```ts
interface MCPEditor {
  list(): readonly [string, Types.DeepMutable<Mcp.ServerConfig>][]
  get(name: string): Types.DeepMutable<Mcp.ServerConfig> | undefined
  set(name: string, config: Mcp.ServerConfig): void
  update(name: string, update: (config: Types.DeepMutable<Mcp.ServerConfig>) => void): void
  remove(name: string): void
}

interface MCPDomain extends Pick<McpApi<unknown>, "list"> {
  readonly transform: Transform<MCPEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Plugins

List active, failed, and resolved plugins at the current location.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const plugin = ctx.plugin
    const plugins = yield* plugin.list().pipe(Effect.orDie)
    yield* Effect.forEach(plugins.data, (item) => Effect.logInfo("plugin", item), { discard: true })
  }),
```

Filter the schema values in an Effect pipeline when only active plugins matter.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const plugin = ctx.plugin
    const active = yield* plugin.list().pipe(
      Effect.orDie,
      Effect.map((result) => result.data.filter((item) => item.state.status === "active")),
    )
    yield* Effect.logInfo("active plugin count", { count: active.length })
  }),
```

Schemas: [`Plugin.Info`](https://opencode.ai/docs/api/#schema-Plugin.Info), [`Plugin.Source`](https://opencode.ai/docs/api/#schema-Plugin.Source).

```ts
interface PluginApi<E = never> {
  readonly list: PluginListOperation<E>
}

interface Context {
  readonly plugin: PluginApi<unknown>
}
```

### References

Read references available at the current location.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const reference = ctx.reference
    const references = yield* reference.list().pipe(Effect.orDie)
    yield* Effect.logInfo("references", { count: references.data.length })
  }),
```

Add or remove local and Git references, then reload after external state changes. `get(name)` returns the current configured
source, or `undefined` when the name is absent.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const reference = ctx.reference
    yield* reference.transform((editor) => {
      editor.add("handbook", { type: "local", path: "/workspace/docs/handbook" })
      editor.add("standards", { type: "git", repository: "https://github.com/acme/standards", branch: "main" })
      const handbook = editor.get("handbook")
      editor.remove("legacy")
    })
    yield* reference.reload()
  }),
```

Schemas: [`Reference.Info`](https://opencode.ai/docs/api/#schema-Reference.Info), [`Reference.LocalSource`](https://opencode.ai/docs/api/#schema-Reference.LocalSource),
[`Reference.GitSource`](https://opencode.ai/docs/api/#schema-Reference.GitSource).

```ts
interface ReferenceEditor {
  add(name: string, source: ReferenceLocalSource | ReferenceGitSource): void
  remove(name: string): void
  list(): readonly (readonly [string, ReferenceLocalSource | ReferenceGitSource])[]
  get(name: string): ReferenceLocalSource | ReferenceGitSource | undefined
}

interface ReferenceDomain extends ReferenceApi<unknown> {
  readonly transform: Transform<ReferenceEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Sessions

Create or read a session, then select the agent and model used by later work.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const session = ctx.session
    const created = yield* session.create({ title: "Review" }).pipe(Effect.orDie)
    const current = yield* session.get({ sessionID: created.id }).pipe(Effect.orDie)
    yield* session.switchAgent({ sessionID: current.id, agent: Agent.ID.make("build") }).pipe(Effect.orDie)
    yield* session
      .switchModel({
        sessionID: current.id,
        model: { providerID: Provider.ID.make("anthropic"), id: Model.ID.make("claude-sonnet-5-5") },
      })
      .pipe(Effect.orDie)
  }),
```

Send prompts, transient generation requests, commands, or synthetic messages.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const session = ctx.session
    const created = yield* session.create({ title: "Automation" }).pipe(Effect.orDie)
    yield* session.prompt({ sessionID: created.id, text: "Review the current changes" }).pipe(Effect.orDie)
    const summary = yield* session
      .generate({ sessionID: created.id, prompt: "Summarize this project" })
      .pipe(Effect.orDie)
    yield* session.command({ sessionID: created.id, name: "review", text: "--staged" }).pipe(Effect.orDie)
    yield* session
      .synthetic({ sessionID: created.id, text: `Summary generated: ${summary.text}`, resume: false })
      .pipe(Effect.orDie)
  }),
```

List sessions a page at a time. To get the next page, pass `cursor.next` back as `cursor`. The cursor remembers your
filters, so you don't need to repeat them.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const page = yield* ctx.session.list({ directory: ctx.location.directory, limit: 20 }).pipe(Effect.orDie)
    const next = page.cursor.next
      ? yield* ctx.session.list({ cursor: page.cursor.next, limit: 20 }).pipe(Effect.orDie)
      : undefined
  }),
```

Remove a temporary session with `remove`. Removal stops active execution and recursively deletes child sessions.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const created = yield* ctx.session.create({ title: "Temporary worker" }).pipe(Effect.orDie)
    yield* ctx.session.remove({ sessionID: created.id }).pipe(Effect.orDie)
  }),
```

Request compaction with `compact`. It returns the admitted inbox item, not a completed summary; compaction runs at
the next step boundary by default. Pass `delivery: "queue"` to preserve queue order instead.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const created = yield* ctx.session.create({ title: "Review" }).pipe(Effect.orDie)
    const compaction = yield* ctx.session.compact({ sessionID: created.id }).pipe(Effect.orDie)
  }),
```

Attach, list, or remove keyed session instruction entries with `instructions.entry`. Entries render as
`<context key="...">` blocks in the session's instructions, and updates or removals are announced at the next step
boundary without queuing a message turn.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const created = yield* ctx.session.create({ title: "Review" }).pipe(Effect.orDie)
    yield* ctx.session.instructions.entry
      .put({ sessionID: created.id, key: "deploy-target", value: "production" })
      .pipe(Effect.orDie)
    const entries = yield* ctx.session.instructions.entry.list({ sessionID: created.id }).pipe(Effect.orDie)
    yield* ctx.session.instructions.entry.remove({ sessionID: created.id, key: "deploy-target" }).pipe(Effect.orDie)
  }),
```

Schemas: [`Session.Info`](https://opencode.ai/docs/api/#schema-Session.Info), [`Model.Ref`](https://opencode.ai/docs/api/#schema-Model.Ref),
[`Session.Inbox.User`](https://opencode.ai/docs/api/#schema-Session.Inbox.User),
[`Session.Inbox.Synthetic`](https://opencode.ai/docs/api/#schema-Session.Inbox.Synthetic),
[`InstructionEntry.Info`](https://opencode.ai/docs/api/#schema-InstructionEntry.Info).

```ts
type SessionDomain = Pick<
  SessionApi<unknown>,
  | "list"
  | "create"
  | "get"
  | "remove"
  | "switchAgent"
  | "switchModel"
  | "prompt"
  | "generate"
  | "command"
  | "compact"
  | "synthetic"
  | "interrupt"
  | "update"
  | "move"
  | "wait"
  | "context"
  | "instructions"
>
```

### Skills

Read skills at the current location.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const skill = ctx.skill
    const skills = yield* skill.list().pipe(Effect.orDie)
    yield* Effect.logInfo("skills", { ids: skills.data.map((item) => item.id) })
  }),
```

Transform and reload skills. Use the re-exported Effect schema constructors for branded values. `get(id)` returns the
current editor entry, or `undefined` when the skill is absent.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const skill = ctx.skill
    yield* skill.transform((editor) => {
      editor.add(Skill.Info.make({
        id: Skill.ID.make("review"),
        name: Skill.Name.make("Review"),
        description: "Review the current changes",
        path: Skill.Info.fields.path.make("/workspace/.opencode/skills/review/SKILL.md"),
        content: "Review the current changes for correctness and missing tests.",
      }))
      const review = editor.get("review")
      editor.update("review", (item) => (item.autoinvoke = true))
      editor.remove("legacy")
    })
    yield* skill.reload()
  }),
```

Schema: [`Skill.Info`](https://opencode.ai/docs/api/#schema-Skill.Info).

```ts
interface SkillEditor {
  list(): readonly Types.DeepMutable<Skill.Info>[]
  get(id: string): Types.DeepMutable<Skill.Info> | undefined
  add(skill: Skill.Info): void
  update(id: string, update: (skill: Types.DeepMutable<Skill.Info>) => void): void
  remove(id: string): void
}

interface SkillDomain extends SkillApi<unknown> {
  readonly transform: Transform<SkillEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Storage

Store, read, and remove durable JSON values scoped to the plugin ID.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const storage = ctx.storage
    yield* storage.set("settings", { strict: true })
    const settings = yield* storage.get("settings")
    yield* Effect.logInfo("settings", { settings })
    yield* storage.remove("settings")
  }),
```

Scan keys by prefix with cursor pagination.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const storage = ctx.storage
    const first = yield* storage.scan({ prefix: "cache/", limit: 100 })
    const second = first.next
      ? yield* storage.scan({ prefix: "cache/", after: first.next, limit: 100 })
      : { entries: [] }
    yield* Effect.logInfo("cache entries", { count: first.entries.length + second.entries.length })
  }),
```

Storage accepts Effect's JSON type and returns Effects directly.

```ts
interface StorageDomain {
  readonly get: (key: string) => Effect.Effect<Schema.Json | undefined>
  readonly set: (key: string, value: Schema.Json) => Effect.Effect<void>
  readonly remove: (key: string) => Effect.Effect<void>
  readonly scan: (options: StorageScanOptions) => Effect.Effect<StorageScanResult>
}
```

### Tools

Register typed tools with Effect `Schema`. The executor receives decoded input and returns an Effect containing typed
output, display content, or metadata.

The editor supports `add`, `update`, and `remove`. The transform callback is synchronous: it must not return an Effect or Promise. Load
external data before registering or reloading. OpenCode replays active transforms in registration order on a fresh
editor; for the same effective tool name, a later valid registration overrides an earlier one.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const tool = ctx.tool
    yield* tool.transform((editor) => {
      editor.namespace({
        name: "acme",
        description: "Customer account tools",
      })
      editor.add({
        name: "greeting",
        description: "Create a greeting",
        input: Schema.Struct({ name: Schema.String }),
        output: Schema.Struct({ greeting: Schema.String }),
        options: { namespace: "acme", codemode: true },
        execute: ({ name }, context) =>
          Effect.gen(function* () {
            yield* context.progress({ status: "greeting" })
            return { output: { greeting: `Hello ${name}!` } }
          }),
      })
    })
  }),
```

Call `yield* ctx.tool.reload()` after changing source data captured by the callback. Reload replays active transforms
without changing their order; it does not rerun the plugin effect.

Effect tools accept the same [freeform input declaration](https://opencode.ai/docs/build/plugins/server/#freeform-tool-input) as
Promise tools. If the model does not advertise that format, the tool keeps its normal object input.

Tools have an `id` containing their effective name, and `get()` returns `undefined` when that ID is not present. Use
`update` and `remove` with the effective tool name, including its namespace (`acme_greeting` above). Dots in
namespaces and unsupported characters in tool names become `_`. Missing names are ignored; creating a tool requires
`add` with a complete definition. Updates preserve the name and namespace. Assign new schemas or options to replace
them rather than mutating nested values. Invalid updates are logged and leave the previous definition intact.

```ts
yield* ctx.tool.transform((editor) => {
  editor.update("acme_greeting", (tool) => {
    tool.description = "Greet the user by name"
  })
  editor.remove("acme_obsolete")
})
```

Updates and removals replay in order with additions, including after MCP catalog refreshes.

`transform` returns a scoped registration. Run `yield* registration.dispose` to remove its transform and rebuild
from the remaining transforms, revealing any earlier definition it overrode. Disposal is idempotent, and closing
the plugin scope also disposes its registrations.

Each model request captures a tool snapshot. Reload and disposal affect future snapshots, not the definitions or
executors already captured by an existing request. Executors that close over mutable plugin data still observe
that data; capture a value inside the transform when it must remain tied to that definition.

Schemas: [`Tool.Content`](https://opencode.ai/docs/api/#schema-Tool.Content), [`Tool.TextContent`](https://opencode.ai/docs/api/#schema-Tool.TextContent),
[`Tool.FileContent`](https://opencode.ai/docs/api/#schema-Tool.FileContent).

```ts
interface ToolEditor {
  list(): readonly (Tool.Info & { readonly id: string })[]
  get(id: string): (Tool.Info & { readonly id: string }) | undefined
  namespace(namespace: { name: string; description: string }): void
  add<Input extends Tool.ValueSchema<any>, Output extends Tool.ValueSchema<any> | undefined>(
    tool: Tool.Info<Input, Output>,
  ): void
  update(id: string, update: (tool: Types.Mutable<Tool.Info>) => void): void
  remove(id: string): void
}

interface ToolDomain {
  readonly list: () => Effect.Effect<readonly (Tool.Info & { readonly id: string })[]>
  readonly transform: Transform<ToolEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### VCS

Read repository information, working-copy status, or file diffs.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const vcs = ctx.vcs
    const info = yield* vcs.get().pipe(Effect.orDie)
    const branches = yield* vcs.branch.list({ search: "feature", limit: 10 }).pipe(Effect.orDie)
    const changes = yield* vcs.status().pipe(Effect.orDie)
    const diff = yield* vcs.diff({ mode: "working", context: 3 }).pipe(Effect.orDie)
    yield* Effect.logInfo("vcs", { branch: info.data.branch.current, files: changes.data.length })
  }),
```

Register a location-scoped provider through a scoped transform. Providers matching the detected repository type are
selected automatically; use `editor.default.set` to select a different provider.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const vcs = ctx.vcs
    yield* vcs.transform((editor) => {
      editor.add({
        id: "custom",
        name: "Custom VCS",
        info: () => Effect.succeed({ branch: { current: "feature", default: "main" } }),
        branches: (input) => readBranches(input),
        status: (scope) => readStatus(scope.worktree),
        diff: (input) => readDiff(input),
      })
      editor.default.set("custom")
    })
  }),
```

Provider callbacks receive the current location, working-copy root, canonical project root, and optional repository
store. Diff callbacks also receive the selected mode, requested context, and output byte budget. Repository discovery
continues to use OpenCode's built-in Git and Mercurial detectors.

Providers can optionally implement `init(scope)` to create a repository in `scope.worktree`. Initialization selects
the provider by ID (Git by default), not by the detected repository type. Register a provider with `init` even when
the location has no repository yet; OpenCode checks that the directory exists and has no repository before calling
it, then rediscovers the project. New repository formats still need discovery support beyond this callback.

Schemas: [`Vcs.Info`](https://opencode.ai/docs/api/#schema-Vcs.Info), [`Vcs.FileStatus`](https://opencode.ai/docs/api/#schema-Vcs.FileStatus),
[`FileDiff.Info`](https://opencode.ai/docs/api/#schema-FileDiff.Info).

```ts
interface VcsEditor {
  add(definition: VcsDefinition): void
  readonly default: {
    get(): string | undefined
    set(selection: string): void
  }
}

interface VcsDomain extends Omit<VcsApi<unknown>, "init"> {
  readonly transform: Transform<VcsEditor>
  readonly reload: () => Effect.Effect<void>
}

interface VcsDefinition {
  readonly init?: (scope: VcsScope) => Effect.Effect<void, unknown>
  // Existing info, branches, status, and diff callbacks are required.
}
```

### Websearch

List providers or run a query through the selected provider.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const websearch = ctx.websearch
    const providers = yield* websearch.providers().pipe(Effect.orDie)
    const results = yield* websearch
      .query({ query: "OpenCode plugins", providerID: WebSearch.ID.make("internal") })
      .pipe(Effect.orDie)
    yield* Effect.logInfo("websearch", { providers: providers.data.length, results: results.data.results.length })
  }),
```

Register an Effect executor and select the default provider. Set the default to `false` to disable websearch.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const websearch = ctx.websearch
    yield* websearch.transform((editor) => {
      editor.add({
        id: "internal",
        name: "Internal search",
        execute: ({ query }) => searchInternal(query),
      })
      editor.default.set("internal")
    })
    yield* websearch.reload()
  }),
```

Schemas: [`WebSearch.Provider`](https://opencode.ai/docs/api/#schema-WebSearch.Provider),
[`WebSearch.Result`](https://opencode.ai/docs/api/#schema-WebSearch.Result).

```ts
interface WebSearchDefinition {
  readonly id: string
  readonly name: string
  readonly execute: (input: WebSearch.ProviderInput) => Effect.Effect<readonly WebSearch.Result[], unknown>
}

interface WebSearchEditor {
  add(definition: WebSearchDefinition): void
  readonly default: {
    get(): string | false | undefined
    set(selection: string | false): void
  }
}

interface WebSearchDomain extends WebsearchApi<unknown> {
  readonly transform: Transform<WebSearchEditor>
  readonly reload: () => Effect.Effect<void>
}
```

### Events

The public server event subscription is an Effect `Stream`. Fork its consumer in the plugin scope for automatic
interruption.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const event = ctx.event
    yield* event.subscribe().pipe(
      Stream.tap((item) => Effect.logDebug("OpenCode event", { type: item.type })),
      Stream.runDrain,
      Effect.forkScoped,
    )
  }),
```

Pass `types` to receive only the event types you need. The stream is typed to match, so no type guard is needed.

```ts
effect: (ctx) =>
  Effect.gen(function* () {
    const event = ctx.event
    yield* event.subscribe({ types: ["config.updated"] }).pipe(
      Stream.runForEach(() => Effect.logInfo("configuration changed")),
      Effect.forkScoped,
    )
  }),
```

Schema: [`V2EventEncoded`](https://opencode.ai/docs/api/#schema-V2EventEncoded).

```ts
type EventType = Exclude<OpenCodeEvent["type"], "server.connected">

interface EventDomain {
  readonly subscribe: <Type extends EventType = EventType>(input?: {
    readonly types?: ReadonlyArray<Type>
  }) => Stream.Stream<Extract<OpenCodeEvent, { type: Type }>, unknown>
}
```

## Notes

- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect` or similar hooks.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).
- MCP here is the server-side plugin domain that manages MCP server registrations; the protocol spec itself is
  covered by `mcp-spec`, and Claude Code/Codex MCP host configuration is covered by their own skills.
- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).

## Related

- [overview.md](./overview.md)
- [lifecycle.md](./lifecycle.md)
- [transforms.md](./transforms.md)
- [hooks.md](./hooks.md)
