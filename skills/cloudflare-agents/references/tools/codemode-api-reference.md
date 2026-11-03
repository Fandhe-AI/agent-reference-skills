---
source: https://developers.cloudflare.com/agents/tools/codemode/api-reference/
---

# Code Mode API reference

Public exports of `@cloudflare/codemode` across its six entry points: runtime, connectors, executors, AI SDK, MCP, TanStack AI, browser, and Vite.

## Signature / Usage

```ts
function createCodemodeRuntime(
	options: CreateCodemodeRuntimeOptions,
): CodemodeRuntimeHandle;

interface CodemodeRuntimeHandle {
	tool(
		options?: CodemodeRuntimeToolOptions,
	): Tool<ProxyToolInput, ProxyToolOutput>;
	execute(input: ProxyToolInput): Promise<ProxyToolOutput>;
	search(query: string): Promise<SearchOutput>;
	describe(target: string): Promise<DescribeOutput>;
	approve(options: CodemodeApproveOptions): Promise<ProxyToolOutput>;
	reject(options: CodemodeRejectOptions): Promise<boolean>;
	rollback(options: CodemodeRollbackOptions): Promise<void>;
	pending(executionId?: string): Promise<PendingAction[]>;
	expirePaused(options?: CodemodeExpireOptions): Promise<string[]>;
	executions(limit?: number): Promise<ExecutionState[]>;
	deleteExecution(id: string): Promise<boolean>;
	pruneExecutions(keep?: number): Promise<number>;
	saveSnippet(name: string, options: SaveSnippetOptions): Promise<Snippet>;
	snippets(): Promise<Snippet[]>;
	deleteSnippet(name: string): Promise<boolean>;
}
```

Executor and connector contracts:

```ts
interface Executor {
	execute(
		code: string,
		providersOrFns:
			| ResolvedProvider[]
			| Record<string, (...args: unknown[]) => Promise<unknown>>,
		options?: ExecuteOptions,
	): Promise<ExecuteResult>;
}

type ConnectorTool = {
	description?: string;
	inputSchema?: JSONSchema7;
	outputSchema?: JSONSchema7;
	requiresApproval?: boolean;
	replay?: "log" | "reexecute";
	execute: (
		args: unknown,
		ctx?: ToolExecuteContext,
	) => Promise<unknown> | unknown;
	revert?: (
		args: unknown,
		result: unknown,
		ctx?: ToolExecuteContext,
	) => Promise<void> | void;
};
```

Wrap an existing MCP server with one `code` tool, or publish an OpenAPI spec as `search` / `execute` tools:

```ts
function codeMcpServer(options: CodeMcpServerOptions): Promise<McpServer>;

function openApiMcpServer(options: OpenApiMcpServerOptions): McpServer;
```

## Options / Props

Entry points:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@cloudflare/codemode` | entry point | — | Runtime, connectors, Workers executor, framework-independent utilities. No AI SDK, TanStack AI, or Zod peer dependency required. |
| `@cloudflare/codemode/ai` | entry point | — | AI SDK tools and connector adapter (`ai`, `zod` peers). |
| `@cloudflare/codemode/mcp` | entry point | — | MCP server wrappers (MCP SDK and Zod peers). |
| `@cloudflare/codemode/tanstack-ai` | entry point | — | TanStack AI tools and adapter (`@tanstack/ai`, `zod` peers). |
| `@cloudflare/codemode/browser` | entry point | — | Browser tool descriptor and iframe executor; plain JSON Schema. |
| `@cloudflare/codemode/vite` | entry point | — | `codemodeVitePlugin()`: appends `export { CodemodeRuntime } from "@cloudflare/codemode"` to the Worker entry (`src/server.ts`, `src/index.ts`, or `src/worker.ts`) unless already exported. |

`CreateCodemodeRuntimeOptions`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ctx` | `DurableObjectState` | Required | Hosts the runtime facet. |
| `connectors` | `CodemodeConnector[]` | Required | Sandbox globals; names unique, `codemode` reserved. |
| `executor` | `Executor` | Required | Sandbox that runs generated code. |
| `name` | string | `"default"` | Durable runtime identity; letters, digits, `_`, `-`, `.`. |
| `maxExecutions` | number | `50` | Terminal records kept when a new run begins; running and paused are not pruned. |
| `transformResult` | `TransformResult` | — | Reshapes a completed result for the model; audit keeps the original. |

`CodemodeRuntimeToolOptions`: `description` replaces the default; `connectorHints` adds a one-line hint per connector.

Handle methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `execute({ code })` | method | — | Runs code directly; result completes, pauses, or errors. |
| `search(query)` / `describe(target)` | method | — | Discovery without running sandbox code. |
| `approve({ executionId })` | method | — | Resumes a paused execution by replay; does not revive non-paused executions. |
| `reject({ seq, executionId })` | method | — | Rejects a pending action and terminates the execution; `false` if no longer pending; no rollback. |
| `rollback({ executionId })` | method | — | Calls `revert` in reverse order; missing connectors and methods without `revert` stay applied; continues after failures. |
| `pending(executionId?)` | method | — | Pending actions (all paused executions without an ID). |
| `expirePaused({ maxAgeMs? })` | method | 24 hours | Terminates stale paused or running executions, returns IDs. |
| `executions(limit?)` / `deleteExecution(id)` / `pruneExecutions(keep?)` | method | keep `50` | Audit records (newest first), delete one (disposes non-terminal resources), prune terminal. |
| `saveSnippet(name, { executionId, description?, inputSchema? })` / `snippets()` / `deleteSnippet(name)` | method | — | Snippets; saving accepts any execution status and replaces the same name. |

Constants: `DEFAULT_MAX_EXECUTIONS` = `50`, `DEFAULT_PAUSED_TTL_MS` = `86400000`, `MAX_DURABLE_VALUE_BYTES` = `1000000` (serialized string length).

Status values: `ExecutionStatus` is `running`, `paused`, `completed`, `error`, `rejected`, `rolled_back`; log entry `state` is `executing`, `applied`, `pending`, `reverted`, `error`. `ToolDecision` kinds: `replay`, `execute`, `pause`.

`DynamicWorkerExecutor` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `loader` | `WorkerLoader` | Required | Worker Loader binding. |
| `timeout` | number | `60000` | Execution timeout in ms. |
| `globalOutbound` | `Fetcher` or `null` | `null` | `null` blocks network access; a `Fetcher` receives all outbound requests. |
| `modules` | `Record<string, string>` | `{}` | Module source by import specifier; reserved `executor.js` ignored. |
| `bindings` | `Record<string, unknown>` | `{}` | Extra bindings injected into each sandbox Worker. |

Other main-entry exports: `CodemodeRuntime` (durable facet, do not construct directly), `ToolDispatcher` (Workers RPC bridge), `runCode()`, `ToolProvider` / `resolveProvider` (excludes tools with `needsApproval` true or a function), `McpConnector` (`createConnection()`, `toolName()` defaulting to `sanitizeToolName`), `OpenApiConnector` (`spec()`, `request()`, `exposeSpec()`), `generateTypesFromJsonSchema`, `jsonSchemaToType`, `sanitizeToolName`, `normalizeCode`, `truncateResponse`, `truncateResult` (default budget 6000 estimated tokens at four characters per token; `maxChars` / `maxTokens`).

Connector hooks: `name()` (required), `instructions()`, `tools()` (required), `tool(name, tool)`, `onPassEnd(executionId, status)` (every pass incl. paused), `disposeExecution(executionId, status)` (terminal only, not on pause). `requiresApproval: true` and `replay: "reexecute"` cannot be combined.

Entry-point utilities:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createCodeTool({ tools, executor, description? })` (`/ai`, `/tanstack-ai`) | function | — | Stateless tool; `{{types}}` placeholder; excludes approval-gated tools. |
| `aiTools`, `generateTypes`, `resolveProvider` (`/ai`) | functions | namespace `codemode` | Provider helpers for AI SDK tools. |
| `ToolSetConnector` / `toolSetConnector(ctx, { name?, instructions?, tools })` (`/ai`) | class / function | name `tools` | Durable adapter; excludes tools without `execute`; `needsApproval` true or function maps to approval. |
| `tanstackTools(tools, name?)`, `generateTypes`, `resolveProvider`, `normalizeProviders`, `DEFAULT_DESCRIPTION` (`/tanstack-ai`) | exports | namespace `codemode` | TanStack AI provider helpers. |
| `codeMcpServer({ server, executor, description? })` (`/mcp`) | function | — | One `code` tool over an existing MCP server; description may contain `{{types}}` and `{{example}}`. |
| `openApiMcpServer({ spec, executor, request, name?, version?, description? })` (`/mcp`) | function | name `openapi`, version `1.0.0` | MCP server with `search` (`codemode.spec()`) and `execute` (`codemode.spec()` + `codemode.request()`); text responses limited to about 6,000 tokens; no placeholders. |
| `createBrowserCodeTool({ tools, executor?, description? })` (`/browser`) | function | default `IframeSandboxExecutor` | Descriptor named `codemode`; excludes approval-gated tools; no runtime schema validation. |
| `IframeSandboxExecutor({ timeout?, csp? })` (`/browser`) | class | timeout `30000`; CSP `default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval';` | Hidden `sandbox="allow-scripts"` iframe with nonce-scoped `postMessage`. |

Sandbox `codemode` global: `search(query)` (ranked, limit 50), `describe(target)` (connector, `connector.method`, or snippet), `step(name, fn)`, `run(name, input?)`.

## Notes

- Custom executors should report failures via `ExecuteResult.error` rather than throwing. Passing a function record instead of `ResolvedProvider[]` is deprecated (creates one provider named `codemode`). `runCode()` throws if `ExecuteResult.error` is set. Executor namespaces must be valid unique JavaScript identifiers that do not shadow executor globals.
- Isolation: `DynamicWorkerExecutor` blocks the network by default; supply `globalOutbound` only with a controlled `Fetcher`. For MCP/OpenAPI server wrappers the host `request` function keeps credentials outside the sandbox.
- `approve`, `reject`, and `rollback` are privileged operations: gate them behind authenticated user authorization in your application.
- Sandbox and replay errors use the `error` output variant and do not throw through the model tool call.
- See [How Code Mode works](./codemode-how-it-works.md) for semantics and the integration pages for end-to-end examples.

## Related

- [Code Mode overview](./codemode-overview.md)
- [How Code Mode works](./codemode-how-it-works.md)
- [Durable runtime](./codemode-durable-runtime.md)
