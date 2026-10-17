# Codex App Server

Codex app-server is the interface Codex uses to power rich clients (for example, the Codex VS Code extension). Use it for a deep integration inside your own product: authentication, conversation history, approvals, and streamed agent events. The implementation is open source (`openai/codex`, `codex-rs/app-server`). Codex app-server is the successor to the removed `codex mcp-server`. If you are automating jobs or running Codex in CI, use the Codex SDK instead.

## Signature / Usage

```bash
# default transport: stdio (newline-delimited JSON)
codex app-server

# WebSocket listener (experimental, unsupported)
codex app-server --listen ws://127.0.0.1:4500

# Unix socket listener (default socket, or a custom path)
codex app-server --listen unix://
codex app-server --listen off        # don't expose a local transport

# generate type definitions matching your Codex version
codex app-server generate-ts --out ./schemas
codex app-server generate-json-schema --out ./schemas

# Connect the CLI terminal UI to a remote app-server
codex --remote ws://127.0.0.1:4500
export CODEX_REMOTE_TOKEN="$(cat "$HOME/.codex/app-server-token")"
codex --remote wss://remote-host:4500 --remote-auth-token-env CODEX_REMOTE_TOKEN

# Remote Code Mode host
codex app-server --code-mode-host wss://code-mode.example.com/host
```

Client handshake over the chosen transport (JSON-RPC 2.0 with the `jsonrpc` header omitted):

```json
{ "method": "initialize", "id": 0, "params": {
  "clientInfo": { "name": "codex_vscode", "title": "Codex VS Code Extension", "version": "0.1.0" }
} }
{ "method": "initialized" }
{ "method": "thread/start", "id": 1, "params": { "model": "gpt-6.1-sol" } }
{ "method": "turn/start", "id": 2, "params": {
  "threadId": "thr_123",
  "input": [ { "type": "text", "text": "Summarize this repo." } ]
} }
```

After the handshake: start a thread (`thread/start`), start a turn (`turn/start`), then keep reading notifications from the transport until `turn/completed`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--listen <url>` | CLI flag | `stdio://` (default; JSONL), `ws://IP:PORT` (experimental; one JSON-RPC message per text frame), `unix://` / `unix://PATH` (WebSocket over a Unix socket with the HTTP Upgrade handshake), or `off`. |
| `--code-mode-host` | CLI flag | Outbound connection from app-server to a remote Code Mode host over `wss://` (default is a local host); doesn't change `--listen`; all threads in the process share it. Experimental. |
| `codex --remote <endpoint>` | CLI flag | Attach the CLI terminal UI to an app-server on another machine; accepts `ws://`, `wss://`, `unix://`, `unix://PATH`. Plain WebSockets only for localhost or SSH port-forwarding. |
| `--remote-auth-token-env <VAR>` | CLI flag | Name of the environment variable holding the bearer token (avoid raw tokens on the command line). |
| `--ws-auth capability-token --ws-token-file <abs path>` / `--ws-token-sha256 <HEX>` | server flags | Capability-token WebSocket auth. Prefer `--ws-token-file`; the SHA-256 is only a verifier, clients still need the original token. |
| `--ws-auth signed-bearer-token --ws-shared-secret-file <abs path>` | server flags | Signed bearer token auth; optionally `--ws-issuer`, `--ws-audience`, `--ws-max-clock-skew-seconds`. Clients send `Authorization: Bearer <token>` during the handshake; auth is enforced before `initialize`. |
| `capabilities.experimentalApi` | `initialize` param | `true` opts in to experimental methods/fields; omitted or `false` keeps the stable API (otherwise `<descriptor> requires experimentalApi capability`). |
| `capabilities.optOutNotificationMethods` | `initialize` param | Exact notification method names to suppress for this connection (no wildcards; unknown names ignored; doesn't apply to requests, responses, or errors). |
| `capabilities.requestAttestation` | `initialize` param | Opt in to the server-initiated `attestation/generate` request. |
| `capabilities.mcpServerOpenaiFormElicitation` | `initialize` param | Allow the OpenAI extended-form variant of `mcpServer/elicitation/request`. |
| `clientInfo` | `initialize` param | `name`, `title`, `version`; `name` identifies your client in the OpenAI Compliance Logs Platform (contact OpenAI to be added to the known clients list for enterprise use). |

Core primitives: a thread is a conversation, a turn is one user request plus the agent's work, an item is a single input or output unit within a turn.

Key methods (JSON-RPC):

| Area | Methods |
|------|---------|
| Models and features | `model/list`, `modelProvider/capabilities/read`, `experimentalFeature/list`, `experimentalFeature/enablement/set`, `environment/info` (experimental), `permissionProfile/list`, `collaborationMode/list` |
| Threads | `thread/start`, `thread/resume` (`excludeTurns: true`), `thread/fork` (`lastTurnId`, `ephemeral`), `thread/read`, `thread/list`, `thread/turns/list`, `thread/items/list`, `thread/loaded/list`, `thread/name/set`, `thread/goal/set\|get\|clear`, `thread/metadata/update`, `thread/archive`, `thread/unarchive`, `thread/delete`, `thread/unsubscribe`, `thread/status/changed`, `thread/compact/start`, `thread/shellCommand`, `thread/backgroundTerminals/*` (experimental), `thread/revert`, `thread/inject_items` |
| Turns | `turn/start`, `turn/steer` (`expectedTurnId`), `turn/interrupt` |
| Review | `review/start` (targets `uncommittedChanges`, `baseBranch`, `commit`, `custom`) |
| Execution | `command/exec` (+ `write`, `resize`, `terminate`, `outputDelta`), `process/spawn`, `process/writeStdin`, `process/resizePty`, `process/kill` (experimental, outside the sandbox) |
| Filesystem | `fs/readFile`, `fs/writeFile`, `fs/createDirectory`, `fs/getMetadata`, `fs/readDirectory`, `fs/remove`, `fs/copy`, `fs/watch`, `fs/unwatch`, `fs/changed` (notify) |
| Skills, hooks, plugins, apps | `skills/list`, `skills/extraRoots/set`, `skills/config/write`, `skills/changed`, `hooks/list`, `marketplace/add\|remove\|upgrade`, `plugin/list\|read\|install\|uninstall` (under development), `plugin/skill/read`, `app/installed`, `app/list`, `app/read` |
| MCP and config | `mcpServer/oauth/login`, `mcpServerStatus/list`, `mcpServer/resource/read`, `mcpServer/tool/call`, `config/mcpServer/reload`, `config/read`, `config/value/write`, `config/batchWrite`, `configRequirements/read`, `externalAgentConfig/detect`, `externalAgentConfig/import`, `windowsSandbox/setupStart`, `feedback/upload` |
| Auth | `account/read`, `account/login/start` (`apiKey`, `chatgpt`, `chatgptDeviceCode`, experimental `chatgptAuthTokens`), `account/login/cancel`, `account/logout`, `account/updated`, `account/rateLimits/read\|updated`, `account/usage/read`, `account/sendAddCreditsNudgeEmail`, `account/rateLimitResetCredit/consume`, `account/workspaceMessages/read`, `account/chatgptAuthTokens/refresh` (server request) |

## Notes

- The app-server command and WebSocket transport are experimental and aren't supported for production workloads. `process/*` is an experimental, explicit process-control API (requires `capabilities.experimentalApi = true`, runs outside Codex's sandbox). Some plugin methods are under development; don't call them from production clients yet.
- Health probes: with `--listen ws://IP:PORT` the same listener serves `GET /readyz` (200 once accepting connections) and `GET /healthz` (200 when the request has no `Origin` header; requests with an `Origin` header get 403). Non-loopback WebSocket listeners currently allow unauthenticated connections by default during rollout; configure WebSocket auth before exposing one remotely and put it behind TLS.
- Initialization: each connection sends exactly one `initialize` followed by an `initialized` notification before any other method; early requests return `Not initialized`, repeats return `Already initialized`. The response includes the user agent string plus `platformFamily` and `platformOs`.
- Overload: when ingress queues are full the server returns JSON-RPC error `-32001` (`"Server overloaded; retry later."`); retry with exponential backoff and jitter.
- Message schema: requests carry `method`, `params`, `id`; responses echo `id` with `result` or `error`; notifications omit `id`. Use `model/list` to pick an available model (the examples use `gpt-6.1-sol`, which requires access for the account or workspace); `supportsPersonality` is a deprecated compatibility field and always `false`.
- Threads: `thread/start` accepts `model`, `cwd`, `approvalPolicy`, `sandbox`, `serviceName`, and (beta, with `experimentalApi`) a `permissions` profile id instead of `sandbox` (don't send both; discover with `permissionProfile/list`). New persistent local threads use paginated history by default; load history with `thread/turns/list` / `thread/items/list`. Full-history `thread/resume` / `thread/fork` and `thread/read` with `includeTurns: true` are deprecated for paginated threads and emit `deprecationNotice`. `thread/read` doesn't load the thread or emit `thread/started`; status is `notLoaded`, `idle`, `systemError`, or `active` with `activeFlags`. `thread/unsubscribe` unloads after an inactivity grace period and emits `thread/closed`. `thread/shellCommand` runs outside the sandbox with full access. `thread.sessionId` identifies the live session tree root. Goal objectives are non-empty and at most 4,000 characters. A required MCP server that fails to initialize makes `thread/start` and `thread/resume` fail.
- Turns: `input` items are `text`, `image` (`url`), `localImage` (`path`), and `skill`; per-turn overrides (model, effort, `cwd`, sandbox policy, summary) become defaults for later turns, while `outputSchema` applies only to the current turn. `toolOutput` (nonempty `name`, optional `namespace`, `output`) starts a turn with client-run tool output and requires empty `input`. `turn/steer` needs `expectedTurnId`, fails with no active turn, emits no new `turn/started`, and accepts no turn-level overrides. `sandboxPolicy` types: `dangerFullAccess`, `readOnly` (`access`), `workspaceWrite` (`writableRoots`, `readOnlyAccess`, `networkAccess`), `externalSandbox` (`networkAccess` `restricted` | `enabled`); restricted read access is `{type: "restricted", includePlatformDefaults, readableRoots}` (on macOS `includePlatformDefaults` appends a curated Seatbelt policy).
- Review: `delivery: "inline"` (default) runs on the existing thread, streaming `enteredReviewMode` and `exitedReviewMode` items; `delivery: "detached"` is deprecated (use `thread/fork` then `turn/start`).
- Command execution: `command/exec` runs one `argv` command under the server sandbox without a thread (`timeoutMs`, `tty`, `processId`, `streamStdoutStderr`); empty `command` arrays are rejected.
- Events: `thread/*`, `turn/*` (`turn/started`, `turn/completed` with `completed` | `interrupted` | `failed`, `turn/diff/updated`, `turn/plan/updated`), `hook/started` / `hook/completed` (synchronous hooks only), `model/safetyBuffering/updated`, `model/rerouted`, `model/verification`, `thread/tokenUsage/updated`, `item/started` / `item/completed` (authoritative), and deltas (`item/agentMessage/delta`, `item/plan/delta`, `item/reasoning/*`, `item/commandExecution/outputDelta`; `item/fileChange/outputDelta` is deprecated). Item types: `userMessage`, `functionCallOutput`, `agentMessage` (`phase`), `plan`, `reasoning`, `commandExecution`, `fileChange`, `mcpToolCall`, `dynamicToolCall`, `collabToolCall`, `webSearch`, `imageView`, `enteredReviewMode`, `exitedReviewMode`, `contextCompaction` (the legacy `thread/compacted` notification is deprecated).
- Errors: a failed turn emits `error` with `{ message, codexErrorInfo?, additionalDetails? }` and finishes with `status: "failed"`; `codexErrorInfo` values include `ContextWindowExceeded`, `UsageLimitExceeded`, `HttpConnectionFailed`, `ResponseStreamConnectionFailed`, `ResponseStreamDisconnected`, `ResponseTooManyFailedAttempts`, `BadRequest`, `Unauthorized`, `SandboxError`, `InternalServerError`, `Other` (upstream HTTP status in `httpStatusCode`).
- Approvals: server-initiated requests `item/commandExecution/requestApproval` and `item/fileChange/requestApproval`; decisions `accept`, `acceptForSession`, `decline`, `cancel`, or `{ acceptWithExecpolicyAmendment: { execpolicy_amendment: [...] } }`; `serverRequest/resolved` confirms resolution. A `networkApprovalContext` (`host`, `protocol`) marks managed network access prompts; concurrent network prompts are grouped per host, protocol, and port. `item/permissions/requestApproval` (built-in `request_permissions`) is answered with the granted subset and `scope` `"session"` or `"turn"`. `tool/requestUserInput` carries `autoResolutionMs`. `mcpServer/elicitation/request` uses `mode` `form`, `openai/form`, or `url` and is answered with `accept` (+ `content`), `decline`, or `cancel`. Dynamic tool calls (`dynamicTools`, `item/tool/call`) are experimental. App tool calls with side effects can elicit approval; destructive annotations always trigger approval.
- Skills: invoke with `$<skill-name>` in text plus a `skill` input item (recommended so full instructions are injected). `skills/list` accepts `cwds`, `forceReload`, `perCwdExtraUserRoots` and reads `interface` and `dependencies` from `SKILL.json`; `skills/changed` is an invalidation signal.
- Apps (connectors): `app/installed` returns the committed runtime snapshot (`id`, `runtimeName`, effective `enabled`, `callable`); an app is callable only when configuration enables it and at least one model-visible tool complies with app and tool policies. Plugin summaries carry a `source` union (`local`, `git`, `npm`, `remote`).
- Auth: modes are `apikey`, `chatgpt` (Codex-managed OAuth, browser or `chatgptDeviceCode`), `chatgptAuthTokens` (experimental, host-supplied tokens), and Amazon Bedrock (`credentialSource` `codexManaged` | `awsManaged`; `authMode` `bedrockApiKey`); `account/updated.authMode` can also be `agentIdentity` or `personalAccessToken`. App-server authentication has never been permitted for commercial or hosted services; Sign in with ChatGPT is the recommended path.
- Detect and import external agent config: `externalAgentConfig/detect` (`includeHome`, `cwds`) and `externalAgentConfig/import` (explicit `migrationItems` with `cwd`, `null` for home; types include config, skills, `AGENTS.md`, plugins, MCP server config, subagents, hooks, commands, and sessions; progress via `externalAgentConfig/import/progress` and `/completed`).
- `configRequirements/read` returns the effective admin requirements from `requirements.toml` and/or MDM (`null` when none). `windowsSandbox/setupStart` takes `mode` `elevated` or `unelevated` and later emits `windowsSandbox/setupCompleted`.
- `codex mcp-server` has been removed in favor of app-server; adapt integrations to the JSON-RPC protocol instead of MCP tool calls. External MCP servers are still managed via `codex mcp`.
- This page is condensed; the official page contains full per-method request/response examples.
- Source: https://learn.chatgpt.com/docs/app-server (retrieved 2026-10).

## Related

- [Codex SDK](./codex-sdk.md)
- [Codex MCP server removal](./agents-sdk-mcp-server.md)
- [Agent approvals and security](./agent-approvals-security.md)
- [Sandbox](./sandbox.md)
