---
source: https://opencode.ai/docs/build/plugins/server/#integrations
---

# Integrations

Read integrations, inspect active credentials, connect with API key, OAuth or command flows, and manage authentication methods with a transform.

## Signature / Usage

```ts
const integrations = await ctx.integration.list()
const github = await ctx.integration.get({ integrationID: "github" })
const connection = await ctx.integration.connection.active("github")
const credential = connection ? await ctx.integration.connection.resolve(connection) : undefined
```

Connect integrations with an API key.

```ts
await ctx.integration.connect.key({
  integrationID: "github",
  key: process.env.GITHUB_TOKEN!,
})
```

Start, inspect, complete, or cancel an OAuth connection attempt.

```ts
const attempt = await ctx.integration.oauth.connect({ integrationID: "github", methodID: "oauth" })
const status = await ctx.integration.oauth.status({ integrationID: "github", attemptID: attempt.data.attemptID })
await ctx.integration.oauth.complete({ integrationID: "github", attemptID: attempt.data.attemptID, code })
await ctx.integration.oauth.cancel({ integrationID: "github", attemptID: attempt.data.attemptID })
```

Command-based connections expose the same start, status, and cancel flow.

```ts
const attempt = await ctx.integration.command.connect({ integrationID: "acme", methodID: "cli" })
const status = await ctx.integration.command.status({ integrationID: "acme", attemptID: attempt.data.attemptID })
await ctx.integration.command.cancel({ integrationID: "acme", attemptID: attempt.data.attemptID })
```

Register a transform to inspect integrations and manage their authentication methods.

```ts
await ctx.integration.transform((editor) => {
  const integrations = editor.list()
  const acme = editor.get("acme")

  editor.update("acme", (integration) => {
    integration.name = "Acme"
  })
  editor.method.update({
    integrationID: "acme",
    method: { id: "cli", type: "command", label: "Sign in with Acme CLI", command: ["acme", "login"] },
  })

  const methods = editor.method.list("acme")
  const legacy = methods.find((method) => method.type === "command" && method.id === "legacy")
  if (legacy) editor.method.remove("acme", legacy)
  editor.remove("legacy")
})
```

Reload integrations after external state used by a transform changes.

```ts
await ctx.integration.reload()
```

### Reference

Schemas: [`Integration.Info`](https://opencode.ai/docs/api/#schema-Integration.Info), [`Integration.Method`](https://opencode.ai/docs/api/#schema-Integration.Method), [`Connection.Info`](https://opencode.ai/docs/api/#schema-Connection.Info), [`Form.Answer`](https://opencode.ai/docs/api/#schema-Form.Answer)

```ts
interface IntegrationContext {
  list(input?: IntegrationListInput, requestOptions?: RequestOptions): Promise<IntegrationListOutput>
  get(input: IntegrationGetInput, requestOptions?: RequestOptions): Promise<IntegrationGetOutput>
  connect: {
    key(input: IntegrationConnectKeyInput, requestOptions?: RequestOptions): Promise<void>
  }
  oauth: {
    connect(
      input: IntegrationOauthConnectInput,
      requestOptions?: RequestOptions,
    ): Promise<IntegrationOauthConnectOutput>
    status(input: IntegrationOauthStatusInput, requestOptions?: RequestOptions): Promise<IntegrationOauthStatusOutput>
    complete(input: IntegrationOauthCompleteInput, requestOptions?: RequestOptions): Promise<void>
    cancel(input: IntegrationOauthCancelInput, requestOptions?: RequestOptions): Promise<void>
  }
  command: {
    connect(
      input: IntegrationCommandConnectInput,
      requestOptions?: RequestOptions,
    ): Promise<IntegrationCommandConnectOutput>
    status(
      input: IntegrationCommandStatusInput,
      requestOptions?: RequestOptions,
    ): Promise<IntegrationCommandStatusOutput>
    cancel(input: IntegrationCommandCancelInput, requestOptions?: RequestOptions): Promise<void>
  }
  transform(callback: (editor: IntegrationEditor) => void): Promise<Registration>
  reload(): Promise<void>
  connection: {
    active(integrationID: string): Promise<ConnectionInfo | undefined>
    resolve(connection: ConnectionInfo): Promise<CredentialValue | undefined>
  }
}

interface IntegrationEditor {
  list(): readonly IntegrationRef[]
  get(id: string): IntegrationRef | undefined
  update(id: string, update: (integration: IntegrationRef) => void): void
  remove(id: string): void
  method: {
    list(integrationID: string): readonly IntegrationMethod[]
    update(input: IntegrationMethodRegistration): void
    remove(integrationID: string, method: IntegrationMethod): void
  }
}
```

## Notes

- Authentication methods belong to integrations; V1 `auth` hooks migrate to `ctx.integration.transform(...)` and the integration APIs.
- Read API keys from the environment or a secret store (as `process.env.GITHUB_TOKEN` in the example); do not hardcode them.
- The `command` connection method runs a local command (for example `["acme", "login"]`); only register commands you trust.

## Related

- [Credentials](./credentials.md)
- [Providers](./providers.md)
- [Migrate plugins from V1](./migrate-v1.md)
