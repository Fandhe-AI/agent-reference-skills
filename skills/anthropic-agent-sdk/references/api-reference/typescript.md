<!-- source: https://code.claude.com/docs/en/agent-sdk/typescript / last verified: 2026-10-16 -->

# Agent SDK reference - TypeScript

Complete API reference for the TypeScript Agent SDK: functions, types, and interfaces.

## Installation

```bash
npm install @anthropic-ai/claude-agent-sdk
```

The SDK bundles a native Claude Code binary for your platform as an optional dependency; most installs need no separate Claude Code install. The SDK version tracks the bundled Claude Code version (e.g. SDK v0.3.191 bundles Claude Code v2.1.191). If your package manager skips optional dependencies, set `pathToClaudeCodeExecutable` (see `Options` below) to a separately installed `claude` binary.

### Import the `/core` entry when you bundle the Agent SDK

If your application bundles the Agent SDK together with its own dependencies, import from `@anthropic-ai/claude-agent-sdk/core` instead of the package root. The `/core` entry requires TypeScript Agent SDK v0.3.282 or later, and its types require TypeScript 5.0 or later.

`/core` exports the same `query()`, `startup()`, `tool()`, `createSdkMcpServer()`, and `resolveSettings()` as the root entry, along with the functions that rename, tag, and delete sessions, `AbortError`, the runtime constants, and every type. It adds no names of its own. It leaves out some root exports, including `prewarm()`, the `InMemorySessionStore` class, and the helpers that list, read, fork, import, and summarize sessions; use the root entry if you need one of them.

The root entry inlines its own copies of `zod` and `@modelcontextprotocol/sdk`. The `/core` entry imports them from your `node_modules` at the ranges the SDK's `peerDependencies` declare. Import from either the root or `/core` in a given process, not both: they are separate bundles, and loading both gives you two copies of the SDK's classes and state.

### Compile to a single executable

When compiling with `bun build --compile`, the SDK cannot resolve the bundled CLI binary at runtime. Embed the platform binary as a file asset and extract it at startup:

```typescript
import binPath from "@anthropic-ai/claude-agent-sdk-darwin-arm64/claude" with { type: "file" };
import { extractFromBunfs } from "@anthropic-ai/claude-agent-sdk/extract";
import { query } from "@anthropic-ai/claude-agent-sdk";

const cliPath = extractFromBunfs(binPath);

for await (const message of query({
  prompt: "Hello",
  options: { pathToClaudeCodeExecutable: cliPath },
})) {
  console.log(message);
}
```

## Functions

### `query()`

The primary function for interacting with Claude Code. Creates an async generator that streams messages as they arrive.

```typescript
function query({
  prompt,
  options
}: {
  prompt: string | AsyncIterable<SDKUserMessage>;
  options?: Options;
}): Query;
```

| Parameter | Description |
|---|---|
| `prompt` | The input prompt as a string or async iterable for streaming mode |
| `options` | Optional configuration object |

Returns a `Query` object (see below) that extends `AsyncGenerator<SDKMessage, void>` with additional methods.

### `startup()`

Pre-warms the CLI subprocess by spawning it and completing the initialize handshake before a prompt is available.

```typescript
function startup(params?: {
  options?: Options;
  initializeTimeoutMs?: number;
}): Promise<WarmQuery>;
```

`options` is the same configuration object as `query()`. `initializeTimeoutMs` is the maximum time to wait for subprocess initialization, defaulting to 60000ms. Resolves once the subprocess has spawned and completed initialization.

```typescript
import { startup } from "@anthropic-ai/claude-agent-sdk";

// Pay startup cost upfront
const warm = await startup({ options: { maxTurns: 3 } });

// Later, when a prompt is ready, this is immediate
for await (const message of warm.query("What files are here?")) {
  console.log(message);
}
```

### `prewarm()`

*Alpha.* Starts a Claude Code process as a spare before you know which session it will serve, so you can bind it to a session later with `claim()` (see `SpareProcess`). Use it in an application that boots before the user picks a folder. Requires TypeScript Agent SDK v0.3.282 or later.

```typescript
function prewarm(params?: {
  options?: Options;
  initializeTimeoutMs?: number;
}): Promise<SpareProcess>;
```

`prewarm()` completes the same initialize handshake as `startup()`, with the process waiting in `options.cwd` when you set it and otherwise in a private temporary directory under your Claude Code config directory. The session's working directory, its `SessionStart` hooks, its stdio MCP servers, and its CLAUDE.md and git context wait for the claim. A spare holds roughly 230 to 260 MB of memory while it waits. `prewarm()` throws if `options` sets `resume`, `continue`, or `forkSession`. Everything a claim can't set, such as `mcpServers`, `hooks`, `canUseTool`, `settingSources`, `systemPrompt`, and `plugins`, is fixed for the life of the spare.

```typescript
import { prewarm } from "@anthropic-ai/claude-agent-sdk";

// On application boot, before the session's folder is known
const spare = await prewarm({ options: { maxTurns: 3 } });

// Later, when the user starts a session in a folder
const claimedQuery = spare.claim({
  prompt: "What files are here?",
  options: { cwd: "/path/to/project" },
});
```

### `tool()`

Creates a type-safe MCP tool definition for use with SDK MCP servers.

```typescript
function tool<Schema extends AnyZodRawShape>(
  name: string,
  description: string,
  inputSchema: Schema,
  handler: (args: InferShape<Schema>, extra: unknown) => Promise<CallToolResult>,
  extras?: { annotations?: ToolAnnotations; searchHint?: string; alwaysLoad?: boolean }
): SdkMcpToolDefinition<Schema>;
```

`inputSchema` is a Zod schema for the tool's input parameters (supports Zod 3 and Zod 4).

```typescript
import { tool } from "@anthropic-ai/claude-agent-sdk";
import { z } from "zod";

const searchTool = tool(
  "search",
  "Search the web",
  { query: z.string() },
  async ({ query }) => {
    return { content: [{ type: "text", text: `Results for: ${query}` }] };
  },
  { annotations: { readOnlyHint: true, openWorldHint: true } }
);
```

### `createSdkMcpServer()`

Creates an MCP server instance that runs in the same process as your application.

```typescript
function createSdkMcpServer(options: {
  name: string;
  version?: string;
  instructions?: string;
  tools?: Array<SdkMcpToolDefinition<any>>;
  alwaysLoad?: boolean;
  timeout?: number;
}): McpSdkServerConfigWithInstance;
```

`options.timeout`: per-server tool-call timeout in ms, used instead of `MCP_TOOL_TIMEOUT`; a whole number >= 1000, other values ignored. Requires TypeScript Agent SDK v0.3.248+.

### `listSessions()`

Discovers and lists past sessions with light metadata.

```typescript
function listSessions(options?: ListSessionsOptions): Promise<SDKSessionInfo[]>;
```

`options.dir` — directory to list sessions for (omit for all projects). `options.limit` — maximum sessions to return. `options.offset` — number of sessions to skip from the start of the sorted result set, for pagination. `options.includeWorktrees` — include sessions from all git worktree paths (default `true`; only applies when reading from the local filesystem). `options.includeProgrammatic` — include SDK/daemon-originated sessions, default `true` for SDK consumers. `options.sessionStore` — list from a `SessionStore` instead of the local filesystem (alpha).

```typescript
import { listSessions } from "@anthropic-ai/claude-agent-sdk";

const sessions = await listSessions({ dir: "/path/to/project", limit: 10 });
for (const session of sessions) {
  console.log(`${session.summary} (${session.sessionId})`);
}
```

### `getSessionMessages()`

Reads user and assistant messages from a past session transcript.

```typescript
function getSessionMessages(
  sessionId: string,
  options?: GetSessionMessagesOptions
): Promise<SessionMessage[]>;
```

`options.dir` — project directory to find the session. `options.limit` / `options.offset` — pagination over messages.

### `getSessionInfo()`

Reads metadata for a single session by ID without scanning the full project directory.

```typescript
function getSessionInfo(
  sessionId: string,
  options?: GetSessionInfoOptions
): Promise<SDKSessionInfo | undefined>;
```

### `renameSession()`

Renames a session by appending a custom-title entry.

```typescript
function renameSession(
  sessionId: string,
  title: string,
  options?: SessionMutationOptions
): Promise<void>;
```

### `tagSession()`

Tags a session. Pass `null` to clear the tag.

```typescript
function tagSession(
  sessionId: string,
  tag: string | null,
  options?: SessionMutationOptions
): Promise<void>;
```

### `resolveSettings()`

Resolves the effective Claude Code settings for a given directory using the same merge engine as the CLI, without spawning the Claude CLI. Alpha — API may change before stabilization.

```typescript
function resolveSettings(
  options?: ResolveSettingsOptions
): Promise<ResolvedSettings>;
```

```typescript
import { resolveSettings } from "@anthropic-ai/claude-agent-sdk";

const { effective, provenance } = await resolveSettings({
  cwd: "/path/to/project",
  settingSources: ["user", "project", "local"],
});

console.log(`Cleanup period: ${effective.cleanupPeriodDays} days`);
console.log(`Set by: ${provenance.cleanupPeriodDays?.source}`);
```

## Types

### `Options`

Configuration object for `query()`. Contains callbacks and other non-serializable fields.

```typescript
export declare type Options = {
    abortController?: AbortController;
    additionalDirectories?: string[];
    agent?: string;
    agents?: Record<string, AgentDefinition>;
    allowedTools?: string[];
    canUseTool?: CanUseTool;
    continue?: boolean;
    cwd?: string;
    disallowedTools?: string[];
    toolAliases?: Record<string, string>;
    tools?: string[] | { type: 'preset'; preset: 'claude_code' };
    env?: { [envVar: string]: string | undefined };
    executable?: 'bun' | 'deno' | 'node';
    executableArgs?: string[];
    extraArgs?: Record<string, string | null>;
    fallbackModel?: string;
    enableFileCheckpointing?: boolean;
    toolConfig?: ToolConfig;
    forkSession?: boolean;
    betas?: SdkBeta[];
    hooks?: Partial<Record<HookEvent, HookCallbackMatcher[]>>;
    onElicitation?: OnElicitation;
    onUserDialog?: OnUserDialog;
    supportedDialogKinds?: string[];
    persistSession?: boolean;
    sessionStore?: SessionStore;
    sessionStoreFlush?: SessionStoreFlush;
    loadTimeoutMs?: number;
    includeHookEvents?: boolean;
    includePartialMessages?: boolean;
    forwardSubagentText?: boolean;
    thinking?: ThinkingConfig;
    effort?: EffortLevel;
    maxThinkingTokens?: number; // deprecated, use thinking
    maxTurns?: number;
    maxBudgetUsd?: number;
    taskBudget?: { total: number };
    mcpServers?: Record<string, McpServerConfig>;
    model?: string;
    outputFormat?: OutputFormat;
    pathToClaudeCodeExecutable?: string;
    permissionMode?: PermissionMode;
    planModeInstructions?: string;
    allowDangerouslySkipPermissions?: boolean;
    permissionPromptToolName?: string;
    permissionPrompts?: 'host' | 'none';
    plugins?: SdkPluginConfig[];
    projectConfigRoot?: string;
    verbatimPrompts?: boolean;
    promptSuggestions?: boolean;
    agentProgressSummaries?: boolean;
    resume?: string;
    sessionId?: string;
    resumeSessionAt?: string;
    resumeDropsTurn?: string;
    sandbox?: SandboxSettings;
    settings?: string | Settings;
    managedSettings?: Settings;
    settingSources?: SettingSource[];
    skills?: string[] | 'all';
    debug?: boolean;
    debugFile?: string;
    stderr?: (data: string) => void;
    strictMcpConfig?: boolean;
    systemPrompt?: string | string[] | {
        type: 'preset';
        preset: 'claude_code';
        append?: string;
        excludeDynamicSections?: boolean;
    };
    title?: string;
    spawnClaudeCodeProcess?: (options: SpawnOptions) => SpawnedProcess;
};
```

Selected fields (see the source JSDoc for the full description of each — this table covers the ones most commonly configured):

| Property | Type | Description |
|---|---|---|
| `abortController` | `AbortController` | Cancels the query and cleans up resources when aborted |
| `additionalDirectories` | `string[]` | Absolute paths Claude can access beyond `cwd` |
| `agent` | `string` | Agent name for the main thread — applies that agent's system prompt, tool restrictions, and model to the main conversation. Equivalent to `--agent`. Must be defined in `agents` or in settings |
| `agents` | `Record<string, AgentDefinition>` | Programmatically defined subagents invokable via the Agent tool |
| `allowedTools` | `string[]` | Tools auto-approved without prompting. Passing `'Skill'` here is deprecated — use `skills` instead |
| `canUseTool` | `CanUseTool` | Custom permission handler, called before each tool execution |
| `continue` | `boolean` | Continue the most recent conversation in the current directory. Mutually exclusive with `resume` |
| `cwd` | `string` | Current working directory; defaults to `process.cwd()` |
| `disallowedTools` | `string[]` | Tools removed from the model's context entirely |
| `toolAliases` | `Record<string, string>` | Redirects a built-in tool name (e.g. `Bash`) to another tool name (e.g. an MCP tool) before name resolution. Single-hop only — no chained/cyclic resolution. Complementary to, not a replacement for, `disallowedTools` |
| `tools` | `string[] \| { type: 'preset'; preset: 'claude_code' }` | Base set of available built-in tools. `[]` disables all built-in tools |
| `env` | `{ [envVar: string]: string \| undefined }` | Replaces (does not merge with) the subprocess environment; spread `process.env` to keep inherited variables. `CLAUDE_AGENT_SDK_CLIENT_APP` identifies your app/library in the User-Agent header |
| `executable` | `'bun' \| 'deno' \| 'node'` | JS runtime for executing Claude Code; auto-detected if omitted |
| `fallbackModel` | `string` | Comma-separated fallback model(s) if the primary is overloaded/unavailable; retried at the start of each user turn |
| `enableFileCheckpointing` | `boolean` | Enable file change tracking so files can be rewound via `Query.rewindFiles()` |
| `forkSession` | `boolean` | With `resume`, fork to a new session ID instead of continuing the original |
| `betas` | `SdkBeta[]` | Beta features to enable (see `SdkBeta` below; `context-1m-2025-08-07` is retired for Sonnet 4.5 / Sonnet 4) |
| `hooks` | `Partial<Record<HookEvent, HookCallbackMatcher[]>>` | Hook callbacks for responding to lifecycle events |
| `persistSession` | `boolean` | When `false`, disables session persistence to disk (default `true`) |
| `sessionStore` | `SessionStore` | Mirrors session transcripts to an external store via dual-write (alpha). Cannot combine with `persistSession: false` |
| `includeHookEvents` | `boolean` | Emit `hook_started`/`hook_progress`/`hook_response` system messages for all hook events (default `false`; `SessionStart`/`Setup` are always emitted) |
| `includePartialMessages` | `boolean` | Emit `SDKPartialAssistantMessage` events during streaming |
| `thinking` | `ThinkingConfig` | `{ type: 'adaptive' }` (default where supported), `{ type: 'enabled', budgetTokens }`, or `{ type: 'disabled' }`. Takes precedence over deprecated `maxThinkingTokens` |
| `effort` | `EffortLevel` | `'low' \| 'medium' \| 'high'` (default) `\| 'xhigh' \| 'max'` |
| `maxTurns` | `number` | Maximum agentic turns before the query stops |
| `maxBudgetUsd` | `number` | Stops the query with `error_max_budget_usd` if exceeded |
| `taskBudget` | `{ total: number }` | API-side token budget; sent as `output_config.task_budget` with `task-budgets-2026-03-13` beta header (alpha) |
| `mcpServers` | `Record<string, McpServerConfig>` | MCP server configurations keyed by server name |
| `model` | `string` | Claude model to use, e.g. `'claude-sonnet-5'` |
| `outputFormat` | `OutputFormat` | Structured-output schema configuration |
| `permissionMode` | `PermissionMode` | `'default' \| 'acceptEdits' \| 'bypassPermissions' \| 'plan' \| 'dontAsk' \| 'auto'`. If omitted, the session can start in auto mode |
| `allowDangerouslySkipPermissions` | `boolean` | Required alongside `permissionMode: 'bypassPermissions'` |
| `permissionPrompts` | `'host' \| 'none'` | Default `'host'`. Who answers permission prompts: `'host'` routes them to your `canUseTool` callback or the `permissionPromptToolName` tool, and `'none'` denies the calls that would have prompted. Requires Claude Code v2.1.259 or later |
| `verbatimPrompts` | `boolean` | Default `false`. Deliver every prompt as written: the SDK sends each user message with `client_composed: true`, so Claude Code doesn't expand `@path` / `@server:resource` mentions and doesn't run text starting with `/` as a command. Requires TypeScript Agent SDK v0.3.280+ and Claude Code v2.1.248+ |
| `projectConfigRoot` | `string` | Absolute path of the trusted checkout that `cwd` is a worktree of. Claude Code reads project settings, `.mcp.json`, and the project's `.claude/` commands, agents, skills, workflows, routines, and output styles from this directory instead of `cwd`, and sets `CLAUDE_PROJECT_DIR` to it. `CLAUDE.md` files and `.claude/rules/` still load from `cwd`. Requires Claude Code v2.1.275 or later |
| `outputStyle` | — | Not an `Options` field. Set `outputStyle` in the inline `settings` object or a settings file instead |
| `plugins` | `SdkPluginConfig[]` | Local plugins, e.g. `[{ type: 'local', path: './my-plugin' }]` |
| `resume` | `string` | Session ID to resume |
| `sessionId` | `string` | Specific UUID to use for a new session; can't combine with `continue`/`resume` unless `forkSession` is also set |
| `sandbox` | `SandboxSettings` | Configure sandbox behavior programmatically. See `SandboxSettings` below |
| `settings` | `string \| Settings` | Inline settings object or path to a settings JSON file, loaded into the highest-priority "flag settings" layer. Equivalent to `--settings` |
| `settingSources` | `SettingSource[]` | Which filesystem settings to load (`'user' \| 'project' \| 'local'`). Omit for CLI defaults (all); pass `[]` to disable. Must include `'project'` to load `CLAUDE.md` |
| `skills` | `string[] \| 'all'` | Skills enabled for the main session — omitted is not "off," it's "CLI defaults." `'all'` enables every discovered skill. Unlisted skills are hidden from the model's listing and the Skill tool but remain readable via Read/Bash — do not store secrets in skill files |
| `strictMcpConfig` | `boolean` | Use only MCP servers passed via `mcpServers` (and agent-declared servers), ignoring project `.mcp.json`, user settings, plugins, and on-disk agent frontmatter MCP |
| `systemPrompt` | `string \| string[] \| { type: 'preset'; preset: 'claude_code'; append?; excludeDynamicSections? }` | Custom prompt, cache-boundary-marked block array, or Claude Code's preset (optionally appended to, or with dynamic per-user sections excluded for cross-user prompt-cache hits) |
| `spawnClaudeCodeProcess` | `(options: SpawnOptions) => SpawnedProcess` | Custom process-spawn function, e.g. to run Claude Code in a VM/container/remote environment |

#### Handle slow or stalled API responses

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const result = query({
  prompt: "Analyze this code",
  options: {
    env: {
      ...process.env,
      API_TIMEOUT_MS: "120000",
      CLAUDE_CODE_MAX_RETRIES: "2",
      CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS: "120000",
    },
  },
});
```

- `API_TIMEOUT_MS`: per-request timeout, default `600000`ms.
- `CLAUDE_CODE_MAX_RETRIES`: max API retries, default `10`, capped at `15`.
- `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`: stall watchdog for subagents, default `600000`ms.
- `CLAUDE_ENABLE_STREAM_WATCHDOG`: enables/disables the response body stream watchdog (enabled by default).

### `Query` object

Interface returned by `query()`.

```typescript
interface Query extends AsyncGenerator<SDKMessage, void> {
  interrupt(): Promise<SDKControlInterruptResponse | undefined>;
  rewindFiles(userMessageId: string, options?: { dryRun?: boolean }): Promise<RewindFilesResult>;
  setPermissionMode(mode: PermissionMode): Promise<void>;
  setModel(model?: string): Promise<void>;
  setMaxThinkingTokens(maxThinkingTokens: number | null): Promise<void>;
  applyFlagSettings(settings: {
    [K in keyof Settings]?: K extends 'effortLevel'
      ? 'low' | 'medium' | 'high' | 'xhigh' | 'max' | null
      : Settings[K] | null;
  }): Promise<void>;
  updateSettings(
    source: 'localSettings' | 'userSettings',
    settings: Record<string, unknown>,
  ): Promise<void>;
  initializationResult(): Promise<SDKControlInitializeResponse>;
  reinitialize(): Promise<SDKControlInitializeResponse>;
  supportedCommands(): Promise<SlashCommand[]>;
  supportedModels(): Promise<ModelInfo[]>;
  supportedAgents(): Promise<AgentInfo[]>;
  mcpServerStatus(): Promise<McpServerStatus[]>;
  getContextUsage(opts?: {
    detail?: 'summary' | 'full';
  }): Promise<SDKControlGetContextUsageResponse>;
  readFile(
    path: string,
    options?: { maxBytes?: number; encoding?: 'utf-8' | 'base64' }
  ): Promise<SDKControlReadFileResponse | null>;
  reloadPlugins(options?: {
    holdOnCacheImpact?: boolean;
  }): Promise<SDKControlReloadPluginsResponse>;
  reloadSkills(): Promise<SDKControlReloadSkillsResponse>;
  reloadOutputStyles(): Promise<SDKControlReloadOutputStylesResponse>;
  accountInfo(): Promise<AccountInfo>;
  reconnectMcpServer(serverName: string): Promise<void>;
  toggleMcpServer(serverName: string, enabled: boolean): Promise<void>;
  setMcpServers(servers: Record<string, McpServerConfig>): Promise<McpSetServersResult>;
  readMcpResource(serverName: string, uri: string): Promise<SDKControlMcpReadResourceResponse>;
  streamInput(stream: AsyncIterable<SDKUserMessage>): Promise<void>;
  stopTask(taskId: string): Promise<void>;
  close(): void;
}
```

| Method | Description |
|---|---|
| `interrupt()` | Interrupts the query (streaming input mode only) |
| `rewindFiles()` | Restores files to their state at the specified user message (requires `enableFileCheckpointing: true`) |
| `setPermissionMode()` | Changes permission mode (streaming input mode only) |
| `setModel()` | Changes the model (streaming input mode only) |
| `applyFlagSettings()` | Merges settings into the flag-settings layer at runtime (streaming input mode only) |
| `updateSettings(source, settings)` | Writes one allowlisted key to a settings file so it persists: `"localSettings"` accepts `outputStyle` (merged into `.claude/settings.local.json`); `"userSettings"` accepts `effortLevel` (saved under `modelSettings` in user settings; passing `max` writes nothing because `max` is session-only; requires SDK v0.3.277+). Requires TypeScript SDK v0.3.257+. Rejects on any other key, over a remote transport, or when `settingSources` exclude the source |
| `readFile(path, options?)` | Reads a file from the session's filesystem (path resolved against `cwd`); `maxBytes` default 1 MB, ceiling 10 MB; `encoding: 'base64'` for binary. Resolves `SDKControlReadFileResponse`, or `null` on permission denial, missing file, or transport error. Requires TypeScript SDK v0.2.121+ |
| `reloadPlugins(options?)` | Reloads plugins from disk mid-session; resolves `SDKControlReloadPluginsResponse`. Requires v0.2.85+; `holdOnCacheImpact` requires v0.3.268+ |
| `reloadSkills()` | Reloads skills from disk mid-session; resolves `SDKControlReloadSkillsResponse`. Requires v0.3.163+ |
| `reloadOutputStyles()` | Re-reads output styles from disk; resolves `SDKControlReloadOutputStylesResponse`. Requires v0.3.261+ |
| `toggleMcpServer(serverName, enabled)` | Enables or disables an MCP server; disabling disconnects it and removes its tools. For a stdio/SSE/HTTP server added mid-session with `setMcpServers()`, removing its tools requires Claude Code v2.1.285+; for an in-process server from `createSdkMcpServer()`, v2.1.286+ |
| `readMcpResource(serverName, uri)` | *Alpha.* Reads one MCP Apps `ui://` resource from a connected MCP server; resolves `SDKControlMcpReadResourceResponse`. Requires TypeScript Agent SDK v0.3.280+ |
| `initializationResult()` | Returns the full initialization result |
| `reinitialize()` | Re-sends the initialize control request |
| `supportedCommands()` | Available slash commands |
| `supportedModels()` | Available models |
| `supportedAgents()` | Available subagents |
| `mcpServerStatus()` | Status of connected MCP servers |
| `getContextUsage()` | Context window usage breakdown |
| `accountInfo()` | Account information |
| `close()` | Closes and terminates the underlying process |

#### `applyFlagSettings()`

Changes settings on a running session without restarting the query.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const q = query({ prompt: messageStream });

// Override the model for the rest of the session
await q.applyFlagSettings({ model: "claude-opus-4-6" });

// Later: clear the override and fall back to lower-precedence settings
await q.applyFlagSettings({ model: null });
```

Settings applied on the next turn: `effortLevel`, `ultracode`, `permissions`, `hooks`, `skillOverrides`, `fastMode`, `agent`. Settings applied during the current turn: `model`. Settings with no mid-session effect: system prompt options (resolved once at startup).

### `WarmQuery`

Handle returned by `startup()`. The subprocess is already spawned and initialized.

```typescript
interface WarmQuery extends AsyncDisposable {
  query(prompt: string | AsyncIterable<SDKUserMessage>): Query;
  close(): void;
}
```

`query(prompt)` sends a prompt to the pre-warmed subprocess; `close()` closes it without sending a prompt. `WarmQuery` implements `AsyncDisposable`, usable with `await using`:

```typescript
await using (const warm = await startup()) {
  for await (const message of warm.query("What files are here?")) {
    console.log(message);
  }
}
```

### `SpareProcess`

*Alpha.* Handle returned by `prewarm()`: a started Claude Code process that isn't bound to a session yet and can be claimed once. Requires TypeScript Agent SDK v0.3.282 or later.

```typescript
interface SpareProcess extends AsyncDisposable {
  claim(params: {
    prompt: string | AsyncIterable<SDKUserMessage>;
    options: ClaimOptions;
  }): Query;
  readonly claimed: Promise<{ cwd: string; sessionId: string; parkedMs?: number; sdkMcpSettled: boolean }>;
  readonly exited: Promise<void>;
  close(): void;
}
```

- `claim({ prompt, options })` binds the spare to a session in `options.cwd` (required) and sends its first message; returns a `Query` synchronously. Can only be called once. A claim can also set `additionalDirectories`, `model`, `permissionMode`, `maxThinkingTokens`, a flag-settings overlay in `settings`, `appendSystemPrompt`, `title`, `agents`, and per-session tokens in `env`.
- `claimed` resolves once Claude Code accepts the claim. It rejects when Claude Code refuses the claim, when the process exited or was closed first, and, with a message starting with `option_not_applied`, when the session runs without the `model` or `maxThinkingTokens` you asked for.
- `exited` settles when the process exits, claimed or not. `close()` terminates the process; before a claim it discards the spare and rejects `claimed`.
- After a refusal (e.g. a folder that doesn't exist, or project settings that set `env`, `agent`, or `model`), a prompt that `claim()` already sent gets an error result whose text starts with `not_claimed`, and the returned query then throws. After any rejection other than `option_not_applied`, your prompt hasn't run, so start the session with `query()` instead.

### `SDKControlInitializeResponse`

Return type of `initializationResult()`.

```typescript
type SDKControlInitializeResponse = {
  commands: SlashCommand[];
  agents: AgentInfo[];
  output_style: string;
  available_output_styles: string[];
  models: ModelInfo[];
  account: AccountInfo;
  fast_mode_state?: "off" | "cooldown" | "on";
  fast_mode_disabled_reason?: FastModeDisabledReason;
};
```

### `SDKControlInterruptResponse`

The interrupt receipt from `interrupt()`.

```typescript
type SDKControlInterruptResponse = {
  still_queued: string[];
  cancelled?: string[];
};
```

### `AgentDefinition`

Definition for a custom subagent invokable via the Agent tool.

```typescript
export declare type AgentDefinition = {
    description: string;
    tools?: string[]; // if omitted, inherits all tools from parent. 'Skill' here is deprecated — use `skills`
    disallowedTools?: string[]; // supports mcp__server, mcp__server__*, mcp__*
    prompt: string;
    model?: string; // alias or full model ID; omitted/'inherit' uses the main model
    mcpServers?: AgentMcpServerSpec[];
    criticalSystemReminder_EXPERIMENTAL?: string;
    skills?: string[];
    initialPrompt?: string; // auto-submitted as first user turn when this agent is the main thread agent
    maxTurns?: number;
    autoCompactWindow?: number; // 100000 to 1000000; lowers the auto-compact window when run as a subagent (TS SDK v0.3.296+)
    background?: boolean;
    omitClaudeMd?: boolean; // leave user/project/local CLAUDE.md out of initial context; managed policy files still load; ignored for the main thread agent (TS SDK v0.3.271+)
    memory?: 'user' | 'project' | 'local';
    effort?: ('low' | 'medium' | 'high' | 'xhigh' | 'max') | number;
    permissionMode?: PermissionMode;
};
```

### `AgentInfo`

Information about an available subagent that can be invoked via the Agent tool.

```typescript
export declare type AgentInfo = {
    name: string;
    description: string;
    model?: string; // if omitted, inherits the parent's model
};
```

### `CanUseTool`

Permission callback invoked before each tool execution when the permission flow falls through to a prompt.

```typescript
export declare type CanUseTool = (toolName: string, input: Record<string, unknown>, options: {
    signal: AbortSignal;
    suggestions?: PermissionUpdate[];
    blockedPath?: string;
    decisionReason?: string;
    title?: string;
    displayName?: string;
    description?: string;
    toolUseID: string;
    agentID?: string;
    requestId: string;
    matchedAskRule?: { source: string; toolName: string; ruleContent?: string };
}) => Promise<PermissionResult | null>;
```

Return `null` only after already sending the `control_response` out-of-band (e.g. a signed HTTP POST echoing `requestId`) — the SDK then skips its own transport write. Fail-closed: an accidental `null` otherwise leaves the tool blocked indefinitely (permission prompts have no park deadline).

### `PermissionMode`

```typescript
export declare type PermissionMode = 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan' | 'dontAsk' | 'auto';
```

`'default'` prompts for dangerous operations; `'acceptEdits'` auto-accepts file edits; `'bypassPermissions'` bypasses all permission checks (requires `allowDangerouslySkipPermissions`); `'plan'` explores without executing tools; `'dontAsk'` denies anything not pre-approved instead of prompting; `'auto'` uses a model classifier to approve/deny.

### `PermissionResult`

```typescript
export declare type PermissionResult = {
    behavior: 'allow';
    updatedInput?: Record<string, unknown>;
    updatedPermissions?: PermissionUpdate[];
    toolUseID?: string;
    decisionClassification?: PermissionDecisionClassification;
} | {
    behavior: 'deny';
    message: string;
    interrupt?: boolean;
    toolUseID?: string;
    decisionClassification?: PermissionDecisionClassification;
};
```

### `PermissionUpdate`

```typescript
export declare type PermissionUpdate = {
    type: 'addRules'; rules: PermissionRuleValue[]; behavior: PermissionBehavior; destination: PermissionUpdateDestination;
} | {
    type: 'replaceRules'; rules: PermissionRuleValue[]; behavior: PermissionBehavior; destination: PermissionUpdateDestination;
} | {
    type: 'removeRules'; rules: PermissionRuleValue[]; behavior: PermissionBehavior; destination: PermissionUpdateDestination;
} | {
    type: 'setMode'; mode: PermissionMode; destination: PermissionUpdateDestination;
} | {
    type: 'addDirectories'; directories: string[]; destination: PermissionUpdateDestination;
} | {
    type: 'removeDirectories'; directories: string[]; destination: PermissionUpdateDestination;
};
```

### `PermissionRuleValue`

```typescript
export declare type PermissionRuleValue = {
    toolName: string;
    ruleContent?: string;
};
```

### `ElicitationRequest`

Elicitation request from an MCP server, asking the SDK consumer for user input.

```typescript
export declare type ElicitationRequest = {
    serverName: string;
    message: string;
    mode?: 'form' | 'url';
    url?: string;
    elicitationId?: string;
    requestedSchema?: Record<string, unknown>;
    title?: string;
    displayName?: string;
    description?: string;
};
```

### `ElicitationResult`

Re-exported from the MCP SDK: `export declare type ElicitationResult = ElicitResult;`

### `HookCallbackMatcher`

```typescript
export declare interface HookCallbackMatcher {
    matcher?: string;
    hooks: HookCallback[];
    timeout?: number; // seconds, applies to all hooks in this matcher
}
```

### `HookEvent`

```typescript
export declare type HookEvent = 'PreToolUse' | 'PostToolUse' | 'PostToolUseFailure' | 'PostToolBatch' | 'Notification' | 'UserPromptSubmit' | 'UserPromptExpansion' | 'SessionStart' | 'SessionEnd' | 'Stop' | 'StopFailure' | 'SubagentStart' | 'SubagentStop' | 'PreCompact' | 'PostCompact' | 'PermissionRequest' | 'PermissionDenied' | 'Setup' | 'TeammateIdle' | 'TaskCreated' | 'TaskCompleted' | 'Elicitation' | 'ElicitationResult' | 'ConfigChange' | 'WorktreeCreate' | 'WorktreeRemove' | 'InstructionsLoaded' | 'CwdChanged' | 'FileChanged' | 'DirectoryAdded' | 'MessageDisplay';
```

### `ListSessionsOptions`

```typescript
export declare type ListSessionsOptions = {
    dir?: string; // project directory; when provided also covers git worktrees. Omit for all projects
    limit?: number;
    offset?: number; // default 0, for pagination
    includeWorktrees?: boolean; // default true; local filesystem only
    includeProgrammatic?: boolean; // default true; include SDK/daemon-originated sessions
    sessionStore?: SessionStore; // list from a store instead of local filesystem (@alpha)
};
```

### `McpServerConfig` and variants

```typescript
export declare type McpServerConfig = McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfigWithInstance;

export declare type McpStdioServerConfig = {
    type?: 'stdio';
    command: string;
    args?: string[];
    env?: Record<string, string>;
    timeout?: number; // ms; overrides MCP_TOOL_TIMEOUT for this server; values < 1000 ignored
    alwaysLoad?: boolean; // include tools in prompt always, skip tool-search deferral; also blocks startup until connected (capped at 5s)
};

export declare type McpSSEServerConfig = {
    type: 'sse';
    url: string;
    headers?: Record<string, string>;
    tools?: McpServerToolPolicy[];
    timeout?: number;
    alwaysLoad?: boolean;
};

export declare type McpHttpServerConfig = {
    type: 'http';
    url: string;
    headers?: Record<string, string>;
    tools?: McpServerToolPolicy[];
    timeout?: number;
    alwaysLoad?: boolean;
};

export declare type McpSdkServerConfig = {
    type: 'sdk';
    name: string;
};
```

### `ModelUsage`

Per-model cost/token breakdown on the result message (see `../operations/cost-tracking.md`).

```typescript
export declare type ModelUsage = {
    inputTokens: number;
    outputTokens: number;
    cacheReadInputTokens: number;
    cacheCreationInputTokens: number;
    webSearchRequests: number;
    costUSD: number;
    contextWindow: number;
    maxOutputTokens: number;
    canonicalModel?: string; // canonical model id used for pricing lookup, e.g. 'claude-opus-4-7'
    provider?: string; // 'firstParty' | 'bedrock' | 'vertex' | 'foundry' | 'anthropicAws' | 'anthropicGoogleCloud' | 'mantle' | 'gateway'
};
```

### `ModelInfo`

```typescript
export declare type ModelInfo = {
    value: string; // model identifier for API calls
    resolvedModel?: string; // canonical wire model id this row's value resolves to, e.g. 'sonnet' -> 'claude-sonnet-5'
    displayName: string;
    description: string;
    supportsEffort?: boolean;
    supportedEffortLevels?: ('low' | 'medium' | 'high' | 'xhigh' | 'max')[];
    supportsAdaptiveThinking?: boolean;
    supportsFastMode?: boolean;
    supportsAutoMode?: boolean;
};
```

### `AccountInfo`

```typescript
export declare type AccountInfo = {
    email?: string;
    organization?: string;
    subscriptionType?: string;
    tokenSource?: string;
    apiKeySource?: string;
    apiProvider?: 'firstParty' | 'bedrock' | 'vertex' | 'foundry' | 'anthropicAws' | 'anthropicGoogleCloud' | 'mantle' | 'gateway';
};
```

`apiProvider` is `'gateway'` when the CLI is authenticated against an enterprise gateway; Anthropic OAuth login only applies when `'firstParty'`.

### `SdkMcpToolDefinition`

Return type of `tool()` (see the `tool()` signature above); `createSdkMcpServer()` takes `tools?: Array<SdkMcpToolDefinition<any>>`. The official page has no standalone declaration of this type.

### `GetSessionMessagesOptions` and `SessionMessage`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `options.dir` | `string` | `undefined` | Project directory to find the session in. When omitted, searches all projects |
| `options.limit` | `number` | `undefined` | Maximum number of messages to return |
| `options.offset` | `number` | `undefined` | Number of messages to skip from the start |

| `SessionMessage` property | Type | Description |
|---|---|---|
| `type` | `"user" \| "assistant"` | Message role |
| `uuid` | `string` | Unique message identifier |
| `session_id` | `string` | Session this message belongs to |
| `message` | `unknown` | Raw message payload from the transcript |
| `parent_tool_use_id` | `string \| null` | For subagent messages, the `tool_use_id` of the `Agent` or `Skill` tool call that started the subagent. `null` for main-session messages and older sessions |
| `parent_agent_id` | `string \| null` | For messages from a nested subagent, the `agentId` of the subagent that spawned it. `null` for main-session messages, top-level subagents, and older sessions. Requires Claude Code v2.1.202 or later |

`GetSessionInfoOptions`: `options.dir` (`string`, project directory path; when omitted, searches all project directories).

### `ToolConfig`

```typescript
type ToolConfig = {
  askUserQuestion?: {
    previewFormat?: "markdown" | "html";
  };
};
```

`askUserQuestion.previewFormat` opts into the `preview` field on `AskUserQuestion` options and sets its content format. When unset, Claude does not emit previews.

### `SdkPluginConfig`

```typescript
type SdkPluginConfig = {
  type: "local";
  path: string;
  skipMcpDiscovery?: boolean;
};
```

`type` must be `'local'` (only local plugins currently supported). `path` is an absolute or relative path to the plugin directory. When `skipMcpDiscovery` is `true`, the SDK loads skills, hooks, agents, and commands from the plugin but does not read its `.mcp.json` or manifest `mcpServers`.

### `SdkBeta`

```typescript
type SdkBeta = "context-1m-2025-08-07";
```

On the Claude API, the `context-1m-2025-08-07` beta is retired for Claude Sonnet 4.5 and Claude Sonnet 4. If you still pass it with either model, requests that exceed the standard 200K-token context window return an error, so remove it from `betas`.

### `SlashCommand`

```typescript
type SlashCommand = {
  name: string;
  description: string;
  argumentHint: string;
  aliases?: string[];
  builtin?: boolean;
};
```

`builtin` is `true` when the command is Claude Code's own and typing `/name` runs it. Requires Agent SDK v0.3.277 or later.

### `Usage`

Token usage statistics. This is the `BetaUsage` type from `@anthropic-ai/sdk`.

```typescript
type Usage = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number | null;
  cache_read_input_tokens: number | null;
  cache_creation: {
    ephemeral_5m_input_tokens: number;
    ephemeral_1h_input_tokens: number;
  } | null;
  server_tool_use: BetaServerToolUsage | null;
  service_tier: "standard" | "priority" | "batch" | null;
  speed: "standard" | "fast" | null;
  inference_geo: string | null;
  iterations: BetaIterationsUsage | null;
  output_tokens_details: BetaOutputTokensDetails | null;
  fallback_credit: BetaFallbackCreditUsage | null;
};
```

`output_tokens_details` currently carries `thinking_tokens: number` and requires TypeScript SDK v0.3.228 or later. `output_tokens` stays the authoritative total. Whether `Usage` carries `fallback_credit` depends on your installed `@anthropic-ai/sdk`, which added it in 0.115.0. `NonNullableUsage` is `Usage` with every nullable field made non-nullable except `fallback_credit`.

### `CallToolResult`

MCP tool result type (from `@modelcontextprotocol/sdk/types.js`).

```typescript
type CallToolResult = {
  content: Array<{
    type: "text" | "image" | "audio" | "resource" | "resource_link";
    // Additional fields vary by type
  }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};
```

### `ThinkingConfig`

Controls Claude's thinking/reasoning behavior. Takes precedence over the deprecated `maxThinkingTokens`.

```typescript
type ThinkingDisplay = "summarized" | "omitted";

type ThinkingConfig =
  | { type: "adaptive"; display?: ThinkingDisplay } // The model determines when and how much to reason (Opus 4.6+)
  | { type: "enabled"; budgetTokens?: number; display?: ThinkingDisplay } // Fixed thinking token budget
  | { type: "disabled" }; // No extended thinking
```

`display` defaults to `"omitted"` on Claude Opus 4.7+, so set `"summarized"` to receive thinking text; Claude Code does not forward `display` to some providers (e.g. Amazon Bedrock, Google Cloud Agent Platform), where Opus 4.7+ returns empty `thinking` blocks regardless.

### `SpawnedProcess` and `SpawnOptions`

Used with the `spawnClaudeCodeProcess` option. `ChildProcess` already satisfies `SpawnedProcess`.

```typescript
interface SpawnedProcess {
  stdin: Writable;
  stdout: Readable;
  readonly killed: boolean;
  readonly exitCode: number | null;
  kill(signal: NodeJS.Signals): boolean;
  on(event: "exit", listener: (code: number | null, signal: NodeJS.Signals | null) => void): void;
  on(event: "error", listener: (error: Error) => void): void;
  once(event: "exit", listener: (code: number | null, signal: NodeJS.Signals | null) => void): void;
  once(event: "error", listener: (error: Error) => void): void;
  off(event: "exit", listener: (code: number | null, signal: NodeJS.Signals | null) => void): void;
  off(event: "error", listener: (error: Error) => void): void;
}

interface SpawnOptions {
  command: string;
  args: string[];
  cwd?: string;
  env: Record<string, string | undefined>;
  signal: AbortSignal;
}
```

The `signal` does not fire the instant `Options.abortController` aborts. The SDK first closes the process's stdin and waits about two seconds so the CLI can shut down cleanly, then aborts this signal.

### `McpSetServersResult`

```typescript
type McpSetServersResult = {
  added: string[];
  removed: string[];
  errors: Record<string, string>;
};
```

`added` lists the servers added or replaced, whether or not they connected; a server that failed to connect appears in both `added` and `errors`.

### `McpServerStatus`

```typescript
type McpServerStatus = {
  name: string;
  status: "connected" | "failed" | "needs-auth" | "pending" | "disabled";
  serverInfo?: {
    name: string;
    version: string;
  };
  error?: string;
  config?: McpServerStatusConfig;
  scope?: string;
  source?: string;
  tools?: {
    name: string;
    description?: string;
    annotations?: {
      readOnly?: boolean;
      destructive?: boolean;
      openWorld?: boolean;
    };
    _meta?: Record<string, unknown>;
  }[];
};
```

`source` requires Agent SDK v0.3.274 or later. `McpServerStatusConfig` is the union `McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfig | McpClaudeAIProxyServerConfig`.

### `RewindFilesResult`

```typescript
type RewindFilesResult = {
  canRewind: boolean;
  error?: string;
  filesChanged?: string[];
  insertions?: number;
  deletions?: number;
  skippedLinks?: number;
};
```

`skippedLinks` counts tracked paths the rewind refused to restore or delete for link safety. Requires Claude Code v2.1.216 or later. A preview call with `rewindFiles(userMessageId, { dryRun: true })` never sets it.

## Message Types

### `SDKMessage`

Union type of all possible messages returned by the query.

```typescript
type SDKMessage =
  | SDKAssistantMessage
  | SDKUserMessage
  | SDKUserMessageReplay
  | SDKResultMessage
  | SDKSystemMessage
  | SDKPartialAssistantMessage
  | SDKCompactBoundaryMessage
  | SDKStatusMessage
  | SDKLocalCommandOutputMessage
  | SDKHookStartedMessage
  | SDKHookProgressMessage
  | SDKHookResponseMessage
  | SDKPluginInstallMessage
  | SDKToolProgressMessage
  | SDKAuthStatusMessage
  | SDKTaskNotificationMessage
  | SDKTaskStartedMessage
  | SDKTaskProgressMessage
  | SDKTaskUpdatedMessage
  | SDKBackgroundTasksChangedMessage
  | SDKThinkingTokensMessage
  | SDKSessionStateChangedMessage
  | SDKWorkerShuttingDownMessage
  | SDKCommandsChangedMessage
  | SDKNotificationMessage
  | SDKFilesPersistedEvent
  | SDKToolUseSummaryMessage
  | SDKMemoryRecallMessage
  | SDKRateLimitEvent
  | SDKElicitationCompleteMessage
  | SDKPermissionDeniedMessage
  | SDKPromptSuggestionMessage
  | SDKAPIRetryMessage
  | SDKMirrorErrorMessage
  | SDKInformationalMessage
  | SDKConversationResetMessage;
```

### `SDKUserMessage`

```typescript
type SDKUserMessage = {
  type: "user";
  uuid?: UUID;
  session_id?: string;
  agent_id?: string;
  message: MessageParam; // From Anthropic SDK
  pasted_content?: MessageParam["content"][];
  parent_tool_use_id: string | null;
  isSynthetic?: boolean;
  shouldQuery?: boolean;
  client_composed?: true;
  tool_use_result?: unknown;
  priority?: "now" | "next" | "later";
  origin?: SDKMessageOrigin;
  inline_pastes?: string[];
};
```

- `shouldQuery: false` appends the message to the transcript without triggering an assistant turn.
- `client_composed: true` delivers the message text as written (no `@path` expansion, no `/` command execution). Requires TypeScript Agent SDK v0.3.280 or later and Claude Code v2.1.248 or later.
- `priority`: `'next'` (or unset) is read in the same turn after running tool calls finish; `'later'` is held until the turn ends and sent as a new turn; `'now'` interrupts the turn (with `origin: { kind: "human" }` on Claude Code v2.1.286 or later, movable background work moves to the background instead).
- `pasted_content` requires Agent SDK v0.3.277 or later; `inline_pastes` requires TypeScript Agent SDK v0.3.280 or later.

### `SDKResultMessage`

Final result message.

```typescript
type SDKResultMessage =
  | {
      type: "result";
      subtype: "success";
      uuid: UUID;
      session_id: string;
      duration_ms: number;
      duration_api_ms: number;
      is_error: boolean;
      api_error_status?: number | null;
      num_turns: number;
      result: string;
      stop_reason: string | null;
      ttft_ms?: number;
      ttft_stream_ms?: number;
      user_message_uuid?: string;
      user_message_uuids?: string[];
      resume_reason?: string;
      local_command?: string;
      request_sent_wall_ms?: number;
      first_content_frame_ms?: number;
      total_cost_usd: number;
      usage: NonNullableUsage;
      modelUsage: { [modelName: string]: ModelUsage };
      permission_denials: SDKPermissionDenial[];
      queued_turn_count?: number;
      structured_output?: unknown;
      deferred_tool_use?: { id: string; name: string; input: Record<string, unknown> };
      terminal_reason?: TerminalReason;
      result_index?: number;
      fast_mode_state?: FastModeState;
      fast_mode_disabled_reason?: FastModeDisabledReason;
      origin?: SDKMessageOrigin;
      // plus first_stream_post_* / first_text_post_* timing fields (cloud sessions only)
    }
  | {
      type: "result";
      subtype:
        | "error_max_turns"
        | "error_during_execution"
        | "error_max_budget_usd"
        | "error_max_structured_output_retries";
      uuid: UUID;
      session_id: string;
      duration_ms: number;
      duration_api_ms: number;
      is_error: boolean;
      num_turns: number;
      stop_reason: string | null;
      total_cost_usd: number;
      usage: NonNullableUsage;
      modelUsage: { [modelName: string]: ModelUsage };
      permission_denials: SDKPermissionDenial[];
      queued_turn_count?: number;
      errors: string[];
      startup_failure_reason?: SDKStartupFailureReason;
      user_message_uuid?: string;
      user_message_uuids?: string[];
      resume_reason?: string;
      terminal_reason?: TerminalReason;
      result_index?: number;
      fast_mode_state?: FastModeState;
      fast_mode_disabled_reason?: FastModeDisabledReason;
      origin?: SDKMessageOrigin;
    };
```

- `usage`: main agent loop only (excludes subagent and auxiliary calls). Prefer `modelUsage` for token/cost accounting; in streaming-input sessions `modelUsage` is cumulative across turns, so read the latest result rather than summing.
- `total_cost_usd`: cumulative estimated cost in USD covering the same calls as `modelUsage`. An estimate, not a billing statement.
- `terminal_reason`: one of `"completed"`, `"max_turns"`, `"tool_deferred"`, `"aborted_streaming"`, `"aborted_tools"`, `"hook_stopped"`, `"stop_hook_prevented"`, `"background_requested"`, `"blocking_limit"`, `"rapid_refill_breaker"`, `"prompt_too_long"`, `"image_error"`, `"model_error"`, `"api_error"`, `"malformed_tool_use_exhausted"`, `"budget_exhausted"`, `"structured_output_retry_exhausted"`, `"tool_deferred_unavailable"`, or `"turn_setup_failed"`.
- `fast_mode_state`: one of `"on"`, `"off"`, or `"cooldown"`.
- `result_index` and `local_command` require Agent SDK v0.3.268 or later; `queued_turn_count` requires v0.3.242 or later; `first_content_frame_ms` requires v0.3.260 or later.
- When a `PreToolUse` hook returns `permissionDecision: "defer"`, the result has `stop_reason: "tool_deferred"` and `deferred_tool_use` carries the pending tool's `id`, `name`, and `input`.
- `origin` forwards the `SDKMessageOrigin` of the triggering user message; synthetic follow-up turns (e.g. a finished background task) carry `origin: { kind: "task-notification" }`.

### `SDKSystemMessage`

System initialization message.

```typescript
type SDKSystemMessage = {
  type: "system";
  subtype: "init";
  uuid: UUID;
  session_id: string;
  agents?: string[];
  apiKeySource: ApiKeySource;
  betas?: string[];
  claude_code_version: string;
  cwd: string;
  tools: string[];
  mcp_servers: {
    name: string;
    status: string;
    source?: string;
  }[];
  model: string;
  permissionMode: PermissionMode;
  slash_commands: string[];
  terminal_slash_commands?: string[];
  output_style: string;
  skills: string[];
  plugins: { name: string; path: string }[];
  plugin_errors?: {
    plugin: string;
    type: string;
    message: string;
    path?: string;
  }[];
  fast_mode_state?: FastModeState;
  fast_mode_disabled_reason?: FastModeDisabledReason;
  effort?: "low" | "medium" | "high" | "xhigh" | "max" | null;
  capabilities?: string[];
};
```

`capabilities` names protocol behaviors the CLI implements (open set; ignore unknown values). Requires Claude Code v2.1.205 or later. `plugin_errors` requires Agent SDK v0.3.283 or later.

`effort` is set only on the init message sent to Remote Control clients and is omitted from the init message your application reads (Agent SDK v0.3.234+).

### `SDKHookStartedMessage`, `SDKHookProgressMessage`, `SDKHookResponseMessage`

```typescript
type SDKHookStartedMessage = {
  type: "system";
  subtype: "hook_started";
  hook_id: string;
  hook_name: string;
  hook_event: string;
  uuid: UUID;
  session_id: string;
};

type SDKHookProgressMessage = {
  type: "system";
  subtype: "hook_progress";
  hook_id: string;
  hook_name: string;
  hook_event: string;
  stdout: string;
  stderr: string;
  output: string;
  uuid: UUID;
  session_id: string;
};

type SDKHookResponseMessage = {
  type: "system";
  subtype: "hook_response";
  hook_id: string;
  hook_name: string;
  hook_event: string;
  output: string;
  stdout: string;
  stderr: string;
  exit_code?: number;
  outcome: "success" | "error" | "cancelled";
  uuid: UUID;
  session_id: string;
};
```

### `SDKTaskProgressMessage`

Emitted periodically while a subagent or background task is running.

```typescript
type SDKTaskProgressMessage = {
  type: "system";
  subtype: "task_progress";
  task_id: string;
  run_id?: string;
  tool_use_id?: string;
  description: string;
  subagent_type?: string;
  usage: {
    total_tokens: number;
    tool_uses: number;
    duration_ms: number;
  };
  last_tool_name?: string;
  summary?: string;
  uuid: UUID;
  session_id: string;
};
```

`summary` is populated for subagent tasks only when `agentProgressSummaries` is enabled.

## Sandbox Configuration

### `SandboxSettings`

```typescript
type SandboxSettings = {
  enabled?: boolean;
  failIfUnavailable?: boolean;
  autoAllowBashIfSandboxed?: boolean;
  excludedCommands?: string[];
  allowUnsandboxedCommands?: boolean;
  network?: SandboxNetworkConfig;
  filesystem?: SandboxFilesystemConfig;
  ignoreViolations?: Record<string, string[]>;
  enableWeakerNestedSandbox?: boolean;
  ripgrep?: { command: string; args?: string[] };
};
```

| Property | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Enable sandbox mode for command execution |
| `failIfUnavailable` | `boolean` | `true` | Stop at startup if `enabled` is `true` but the sandbox can't start. Set `false` to fall back to unsandboxed execution with a warning on stderr |
| `autoAllowBashIfSandboxed` | `boolean` | `true` | Auto-approve Bash commands when sandbox is enabled |
| `excludedCommands` | `string[]` | `[]` | Commands that bypass sandbox restrictions, such as `['docker *']`. These run unsandboxed automatically without model involvement (no `canUseTool` fallback) |
| `allowUnsandboxedCommands` | `boolean` | `true` | Allow the model to request running commands outside the sandbox via `dangerouslyDisableSandbox`, which falls back to the permissions system |
| `network` | `SandboxNetworkConfig` | `undefined` | Network-specific sandbox configuration |
| `filesystem` | `SandboxFilesystemConfig` | `undefined` | Filesystem read/write restrictions |
| `ignoreViolations` | `Record<string, string[]>` | `undefined` | Map of command substrings, or `*` for every command, to substrings of the violation text to ignore |
| `enableWeakerNestedSandbox` | `boolean` | `false` | Enable a weaker nested sandbox for compatibility |
| `ripgrep` | `{ command: string; args?: string[] }` | `undefined` | Custom ripgrep binary configuration |

When `enabled` is `true` and the sandbox can't start, `query()` reports a `result` message with `subtype: "error_during_execution"` and the reason in `errors`; for a single-message `query()` call the SDK throws after yielding that result.

### `SandboxNetworkConfig`

```typescript
type SandboxNetworkConfig = {
  allowedDomains?: string[];
  deniedDomains?: string[];
  strictAllowlist?: boolean;
  allowManagedDomainsOnly?: boolean;
  allowLocalBinding?: boolean;
  allowUnixSockets?: string[];
  allowAllUnixSockets?: boolean;
  httpProxyPort?: number;
  socksProxyPort?: number;
};
```

Applies to sandboxed Bash commands only; does not restrict the WebFetch tool. `deniedDomains` takes precedence over `allowedDomains`. `strictAllowlist` requires Claude Code v2.1.219 or later and is honored only from user, managed, or CLI `--settings` settings. `allowUnixSockets` can grant access to system services that reach outside the sandbox (e.g. `/var/run/docker.sock`). The built-in sandbox proxy enforces the allowlist by requested hostname and does not terminate or inspect TLS, so domain fronting can potentially bypass it. `allowManagedDomainsOnly` is managed-settings only: setting it in `sandbox.network` has no effect; from the SDK, pass it through the `managedSettings` option.

### `SandboxFilesystemConfig`

```typescript
type SandboxFilesystemConfig = {
  allowWrite?: string[];
  denyWrite?: string[];
  denyRead?: string[];
};
```

## Notes

- Source: Functions through SDKControlInterruptResponse were transcribed from the first fetch of https://code.claude.com/docs/en/agent-sdk/typescript. Type blocks that existed before 2026-10-16 were originally taken from the `sdk.d.ts` of `@anthropic-ai/claude-agent-sdk@0.3.223` (unpkg); `Options`, `Query` and `AgentDefinition` fields carrying version annotations (e.g. v0.3.248+, v0.3.280+, v0.3.296+) were updated from the official page, so `0.3.223` does not describe them.
- `SDKResultMessage` omits the nine `first_stream_post_*` / `first_text_post_*` timing fields of the official block (cloud sessions only). `SdkMcpToolDefinition` has no section on the official page; its entry here is only a pointer to `tool()` / `createSdkMcpServer()`.
- Types added on 2026-10-16 (SdkMcpToolDefinition, GetSessionMessagesOptions, SessionMessage, ToolConfig, SdkPluginConfig, SdkBeta, SlashCommand, Usage, CallToolResult, ThinkingConfig, SpawnedProcess, SpawnOptions, McpSetServersResult, McpServerStatus, RewindFilesResult, SDKMessage, SDKUserMessage, SDKResultMessage, SDKSystemMessage, SDKHook*Message, SDKTaskProgressMessage, SandboxSettings, SandboxNetworkConfig, SandboxFilesystemConfig) were transcribed from the Markdown twin of https://code.claude.com/docs/en/agent-sdk/typescript (fetched 2026-10-16), distinguishing them from the earlier sources above.
- Not transcribed: SDKControlGetContextUsageResponse (official page section `SDKControlGetContextUsageResponse`) and ResolvedSettings (`resolveSettings()` return type) are documented on the official page but omitted here; FastModeDisabledReason has no type declaration on the page (only the reason-code table under SDKResultMessage).
- SDKControlReadFileResponse, SDKControlReloadPluginsResponse, SDKControlReloadSkillsResponse, SDKControlReloadOutputStylesResponse and SDKControlMcpReadResourceResponse are listed by name only; their fields are not documented here.
- `ToolAnnotations` is re-exported from `@modelcontextprotocol/sdk/types.js`, not redeclared in this SDK; see the MCP SDK's own types for its shape (matches the Python SDK's `ToolAnnotations` fields documented in `./python.md`).
- `startup_failure_reason` on the `error_during_execution` result (Agent SDK v0.3.274+) names why Claude Code refused to start (`SDKStartupFailureReason`). Newer values: `org_config_required_unavailable` (the organization's policies and managed settings are required before start and couldn't be loaded, e.g. network failure or Anthropic server error) and `org_config_refused` (Anthropic refused to provide them for this sign-in, e.g. expired or revoked sign-in, or the organization doesn't allow Claude Code for this account); both require Agent SDK v0.3.293+. Set `CLAUDE_CODE_STARTUP_FAILURE_RESULTS=1` in `env` to receive this result for every reason value.
- `outputStyle` is not an `Options` field; set it in the inline `settings` object or a settings file (or persist it with `Query.updateSettings('localSettings', ...)`).

## Related

- [Python SDK reference](./python.md)
- [Cost Tracking](../operations/cost-tracking.md)
- [Hosting the Agent SDK](../operations/hosting.md)
- [Troubleshooting](../operations/troubleshooting.md)
