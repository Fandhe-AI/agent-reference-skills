<!-- source: https://code.claude.com/docs/en/agent-sdk/typescript / last verified: 2026-11-14 -->

# Agent SDK reference - TypeScript

Complete API reference for the TypeScript Agent SDK: functions, types, and interfaces.

## Installation

```bash
npm install @anthropic-ai/claude-agent-sdk
```

The SDK bundles a native Claude Code binary for your platform as an optional dependency; most installs need no separate Claude Code install. The SDK version tracks the bundled Claude Code version (e.g. SDK v0.3.191 bundles Claude Code v2.1.191). If your package manager skips optional dependencies, set `pathToClaudeCodeExecutable` (see `Options` below) to a separately installed `claude` binary; without it the SDK throws `Native CLI binary for <platform>-<arch> not found`. If your package manager doesn't apply npm's `libc` field (Yarn 1.x), Linux installs get both the glibc and musl platform packages; on v0.2.141 or later the SDK still launches the correct variant, and you can delete the non-matching package (e.g. `rm -rf node_modules/@anthropic-ai/claude-agent-sdk-linux-x64-musl` for glibc on x64) to reclaim space.

### Import the `/core` entry when you bundle the Agent SDK

If your application bundles the Agent SDK together with its own dependencies, import from `@anthropic-ai/claude-agent-sdk/core` instead of the package root. The `/core` entry requires TypeScript Agent SDK v0.3.282 or later, and its types require TypeScript 5.0 or later.

`/core` exports the same `query()`, `startup()`, `prewarm()`, `tool()`, `createSdkMcpServer()`, and `resolveSettings()` as the root entry, along with the functions that rename, tag, and delete sessions, `AbortError`, the runtime constants, and every type. Importing the alpha `prewarm()` from `/core` requires Agent SDK v0.3.314 or later. It leaves out some root exports, including the `InMemorySessionStore` class and the helpers that list, read, fork, import, and summarize sessions; use the root entry if you need one of them.

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

`extractFromBunfs()` requires v0.3.144 or later. It copies the embedded binary to a per-user temp directory and returns the real path; outside a compiled executable it returns the input path unchanged. Each executable embeds one platform's binary: match the platform package in the import to your `--target`, install the non-matching platform package to cross-compile (e.g. `npm install @anthropic-ai/claude-agent-sdk-linux-x64 --force`), and on Windows use the `claude.exe` subpath (e.g. `@anthropic-ai/claude-agent-sdk-win32-x64/claude.exe`).

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

`options` is the same configuration object as `query()`. `initializeTimeoutMs` is the maximum time to wait for subprocess initialization, defaulting to 60000ms; if initialization doesn't complete in time the promise rejects with a timeout error. Resolves once the subprocess has spawned and completed initialization. Slow `SessionStart` / `Setup` command hooks get extra time only when `initializeTimeoutMs` is unset: time they spend running doesn't count toward the 60-second default, up to 10 minutes in total (11 minutes at most); any value you set, including `60000`, is the limit even while a hook runs (requires TypeScript Agent SDK v0.3.304 or later). Of the `hook_progress` messages a `SessionStart` / `Setup` hook emits before the handshake completes you get only the newest; it, the `hook_started` message, and anything else emitted before the handshake are held until you call `.query()` on the `WarmQuery` and iterate the result. If you don't know the session's working directory yet, use `prewarm()`.

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

`prewarm()` completes the same initialize handshake as `startup()`, with the process waiting in `options.cwd` when you set it and otherwise in a private temporary directory under your Claude Code config directory. The session's working directory, its `SessionStart` hooks, its stdio MCP servers, and its CLAUDE.md and git context wait for the claim. A spare holds roughly 230 to 260 MB of memory while it waits. `prewarm()` rejects if `options` sets `resume`, `continue`, or `forkSession`. Everything a claim can't set, such as `mcpServers`, `hooks`, `canUseTool`, `settingSources`, and `plugins`, keeps its value from `prewarm()` for the life of the spare; keep a separate spare per set of values. `prewarm()` counts time spent in `Setup` hooks toward `initializeTimeoutMs` even when you leave it unset, so set a longer value for slow `Setup` hooks. If `spawnClaudeCodeProcess` runs Claude Code on another machine or in a container, pass an `options.cwd` that exists there, because the default temporary directory is created on your machine.

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

`inputSchema` is a Zod schema for the tool's input parameters (supports Zod 3 and Zod 4). `extras.annotations` provides MCP behavioral hints (`ToolAnnotations`, from `@modelcontextprotocol/sdk/types.js`; all fields optional, clients should not rely on them for security decisions). `extras.searchHint` is a one-line capability phrase shown in the deferred-tool list when tool search is active. `extras.alwaysLoad: true` keeps this tool's full schema in the initial prompt instead of deferring it.

| `ToolAnnotations` field | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Human-readable title |
| `readOnlyHint` | `boolean` | `false` | The tool does not modify its environment |
| `destructiveHint` | `boolean` | `true` | The tool may perform destructive updates. Set it to `true` explicitly on any tool you mark `always_ask`, or the auto mode classifier can approve that tool's calls in place of `canUseTool`: Claude Code treats an unset value as `false` for `always_ask` calls |
| `idempotentHint` | `boolean` | `false` | Repeated calls with the same arguments have no additional effect (only meaningful when `readOnlyHint` is `false`) |
| `openWorldHint` | `boolean` | `true` | The tool interacts with external entities (e.g. web search); `false` for a closed domain (e.g. a memory tool) |

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

`SDKSessionInfo` properties: `sessionId` (UUID), `summary` (display title: custom title, most recent prompt, auto-generated summary, or first prompt), `lastModified` (ms since epoch), `fileSize?` (bytes, local JSONL storage only), `customTitle?` (custom title from `--name`, `/rename`, a hook's `sessionTitle` output, or `renameSession()`; otherwise the AI-generated title if any), `firstPrompt?`, `gitBranch?` (at the end of the session), `cwd?`, `tag?` (see `tagSession()`), `createdAt?` (ms since epoch, from the first entry's timestamp). Results are sorted by `lastModified` descending.

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

`options.dir` — project directory to find the session (omit to search all projects). `options.limit` / `options.offset` — pagination over messages. `options.includeSystemMessages` — default `false`; when `true`, also return system messages such as compact boundaries alongside user and assistant messages (`SessionMessage.type` is then `"user" | "assistant" | "system"`).

### `getSessionInfo()`

Reads metadata for a single session by ID without scanning the full project directory.

```typescript
function getSessionInfo(
  sessionId: string,
  options?: GetSessionInfoOptions
): Promise<SDKSessionInfo | undefined>;
```

### `renameSession()`

Renames a session by appending a custom-title entry. Repeated calls are safe; the most recent title wins. `title` must be non-empty after trimming whitespace; `options.dir` is the project directory (omit to search all).

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

### `forkSession()`

Copies a session's transcript into a new session so you can take the conversation in another direction while the original stays unchanged. Pass `upToMessageId` to branch from an earlier point.

```typescript
function forkSession(
  sessionId: string,
  options?: ForkSessionOptions
): Promise<ForkSessionResult>;
```

`options.dir` — project directory (omit to search all). `options.upToMessageId` — copy the transcript up to and including the message with this `uuid` (a value from `getSessionMessages()`, or a `uuid` you set on a streamed `SDKUserMessage`); omit to copy the whole transcript. `options.title` — title for the fork (default: derived from the original followed by `(fork)`). Returns `{ sessionId }`, the new session's UUID; pass it as `resume` to continue the fork. The fork doesn't include the original's file checkpoints, so you can't rewind it to a checkpoint captured before the fork. Throws when `sessionId` is not a UUID, the session can't be found or has no messages, or `upToMessageId` matches no message in the transcript.

### `resolveSettings()`

Resolves the effective Claude Code settings for a given directory using the same merge engine as the CLI, without spawning the Claude CLI. Alpha — API may change before stabilization.

The snapshot differs from a live `query()` session: it reads MDM sources (macOS plist, Windows HKLM/HKCU) but doesn't execute the admin-configured `policyHelper`; it doesn't fetch server-managed settings (pass them as `options.serverManagedSettings`); and it returns `permissions.defaultMode` as-is from every tier, including `'auto'` / `'bypassPermissions'` values from project and local settings that a live session ignores.

```typescript
function resolveSettings(
  options?: ResolveSettingsOptions
): Promise<ResolvedSettings>;
```

All `options` fields are optional: `cwd` (default `process.cwd()`), `settingSources` (default all; `[]` skips user/project/local, endpoint-managed policy always loads), `managedSettings` (policy-tier `Settings` from the host; same rules as `Options.managedSettings` except no `policyHelper` is executed), `serverManagedSettings` (payload from `/api/claude_code/settings`; non-restrictive keys pass through unfiltered). `ResolvedSettings`: `effective` (`Settings`, merged in precedence order), `provenance` (`Partial<Record<keyof Settings, ProvenanceEntry>>`, which source supplied each top-level key), `sources` (`Array<{ source, settings, path?, policyOrigin? }>`, lowest to highest precedence).

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
        type: 'custom';
        prompt: string | string[];
        snapshot?: boolean;
    } | {
        type: 'preset';
        preset: 'claude_code';
        append?: string;
        excludeDynamicSections?: boolean;
        snapshot?: boolean;
    };
    title?: string;
    spawnClaudeCodeProcess?: (options: SpawnOptions) => SpawnedProcess;
};
```

Selected fields (see the source JSDoc for the full description of each — this table covers the ones most commonly configured):

| Property | Type | Description |
|---|---|---|
| `abortController` | `AbortController` | Cancels the query and cleans up resources when aborted |
| `additionalDirectories` | `string[]` | Additional directories Claude can access beyond `cwd`. Each entry is passed to Claude Code as `--add-dir`, so with the `project` setting source it also loads the directory's skills, commands, and subagents |
| `agentProgressSummaries` | `boolean` | Default `false`. Generate one-line progress summaries for foreground and background subagents, forwarded on `task_progress` events via `summary` |
| `agent` | `string` | Agent name for the main thread — applies that agent's system prompt, tool restrictions, and model to the main conversation. Equivalent to `--agent`. Must be defined in `agents` or in settings |
| `agents` | `Record<string, AgentDefinition>` | Programmatically defined subagents invokable via the Agent tool |
| `allowedTools` | `string[]` | Tools auto-approved without prompting, apart from reads from network paths. Does not restrict Claude to only these tools; naming a task-tracking tool here also opts the session in; other unlisted tools fall through to `permissionMode` and `canUseTool`. Use `disallowedTools` to block tools. Passing `'Skill'` here is deprecated — use `skills` instead |
| `canUseTool` | `CanUseTool` | Custom permission handler, invoked only when the permission flow falls through to a prompt; not invoked for calls auto-approved by `allowedTools`, allow rules, or `permissionMode`. An allow rule doesn't pre-approve the actions no mode auto-approves |
| `continue` | `boolean` | Continue the most recent conversation in the current directory. Mutually exclusive with `resume` |
| `cwd` | `string` | Current working directory; defaults to `process.cwd()` |
| `disallowedTools` | `string[]` | Tools to deny. A bare name such as `"Bash"` removes the tool from Claude's context; a scoped rule such as `"Bash(rm *)"` leaves the tool available and denies matching calls in every permission mode, including `bypassPermissions` |
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
| `forwardSubagentText` | `boolean` | Default `false`. Forward subagent text and thinking blocks as assistant and user messages with `parent_tool_use_id` set, so consumers can render a nested transcript; otherwise a foreground subagent's text and thinking blocks are omitted |
| `includeHookEvents` | `boolean` | Emit `hook_started`/`hook_progress`/`hook_response` system messages for all hook events (default `false`; `SessionStart`/`Setup` are always emitted). Events such as `Notification`, `SessionEnd`, `PreCompact`, and `PostCompact` never produce `hook_started`; they still emit `hook_progress` for a command hook that runs over a second and produces output, and `hook_response` only when a background hook finishes |
| `includePartialMessages` | `boolean` | Emit `SDKPartialAssistantMessage` events during streaming |
| `thinking` | `ThinkingConfig` | `{ type: 'adaptive' }` (default where supported), `{ type: 'enabled', budgetTokens }`, or `{ type: 'disabled' }`. Takes precedence over deprecated `maxThinkingTokens` |
| `effort` | `EffortLevel` | `'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max'`; default `undefined`. Controls how much effort Claude puts into its response; works with adaptive thinking to guide thinking depth |
| `maxTurns` | `number` | Maximum agentic turns before the query stops |
| `maxBudgetUsd` | `number` | Stops the query with `error_max_budget_usd` if exceeded |
| `taskBudget` | `{ total: number }` | *Alpha.* API-side task budget in tokens; the model is told its remaining budget so it can pace tool use and wrap up before the limit |
| `managedSettings` | `Settings` | Policy-tier settings your host supplies to the spawned session. On machines with admin-deployed managed settings Claude Code ignores these unless the admin's highest-priority managed source sets `parentSettingsBehavior: 'merge'`, and never merges them while a `policyHelper` supplies managed settings; merged values pass a restrictive-only filter |
| `onElicitation` | `(request: ElicitationRequest, options: { signal: AbortSignal }) => Promise<ElicitationResult>` | Handles MCP elicitation requests when no hook does; unhandled requests are declined automatically |
| `planModeInstructions` | `string` | With `permissionMode: 'plan'`, replaces the default plan-mode workflow body (the CLI still wraps it with the read-only preamble and ExitPlanMode footer) |
| `promptSuggestions` | `boolean` | Default `false`. After a turn, emit a `prompt_suggestion` message with a predicted next user prompt (none for some turns, e.g. near the usage limit) |
| `resumeSessionAt` | `string` | Resume the session at a specific message UUID |
| `resumeDropsTurn` | `string` | With `resumeSessionAt`: the prompt UUID of the turn the truncating resume intends to discard. Claude Code refuses the resume when the discarded range contains anything not attributable to that turn. Requires Claude Code v2.1.223 or later |
| `loadTimeoutMs` | `number` | *Alpha.* Default `60000`. Timeout for each `sessionStore.load()` / `listSubkeys()` call during resume materialization; ignored without `sessionStore` |
| `sessionStoreFlush` | `'batched' \| 'eager'` | *Alpha.* Default `'batched'`. Flush mode for `sessionStore` |
| `title` | `string` | Display title for the session; a resumed session's persisted title takes precedence (use `renameSession()`) |
| `mcpServers` | `Record<string, McpServerConfig>` | MCP server configurations keyed by server name |
| `model` | `string` | Claude model to use, e.g. `'claude-sonnet-5'` |
| `outputFormat` | `OutputFormat` | Structured-output schema configuration |
| `permissionMode` | `PermissionMode` | `'default' \| 'acceptEdits' \| 'bypassPermissions' \| 'plan' \| 'dontAsk' \| 'auto'`. If omitted and nothing else (such as `permissions.defaultMode`) sets a mode, the session starts in `default` |
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
| `skills` | `string[] \| 'all'` | Skills enabled for the main session — omitted is not "off," it's "CLI defaults." `'all'` enables every discovered skill. Pass exact names only: on v0.3.221+ malformed and wildcard-form names are rejected before Claude Code starts. The SDK adds the Skill tool to `allowedTools` automatically (include `'Skill'` in `tools` if you pass it). Unlisted skills are hidden from the model's listing and the Skill tool but remain readable via Read/Bash — do not store secrets in skill files |
| `strictMcpConfig` | `boolean` | Use only MCP servers passed via `mcpServers` (and agent-declared servers), ignoring project `.mcp.json`, user settings, plugins, claude.ai connectors, and on-disk agent frontmatter MCP |
| `systemPrompt` | `string \| string[] \| { type: 'custom'; prompt; snapshot? } \| { type: 'preset'; preset: 'claude_code'; append?; excludeDynamicSections?; snapshot? }` | Default `undefined` (minimal prompt). Custom prompt, array with the exported `SYSTEM_PROMPT_DYNAMIC_BOUNDARY` constant between the static and per-request parts (caches the static part), or Claude Code's preset (optionally appended to, or with `excludeDynamicSections: true` moving per-session context into the first user message for cross-machine cache reuse). `snapshot: false` rebuilds the prompt on every request instead of reusing the prompt recorded on the session's first request. The `{ type: 'custom' }` form and `snapshot` require TypeScript Agent SDK v0.3.257 or later |
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

- `API_TIMEOUT_MS`: how long each request attempt can wait for response headers, default `600000`ms; doesn't limit a streaming response after headers arrive. Applies to the main loop and all subagents.
- `CLAUDE_CODE_MAX_RETRIES`: max API retries, default `10`, capped at `15`; each retry gets its own `API_TIMEOUT_MS` window. For unattended runs, `CLAUDE_CODE_RETRY_WATCHDOG=1` retries transient capacity errors indefinitely and, on Claude Code v2.1.199 or later, raises the default for other transient errors to `300` and removes the cap.
- `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`: stall watchdog for subagents; the timer resets on each stream event. With the stream watchdog on, the default is `CLAUDE_STREAM_IDLE_TIMEOUT_MS` plus 5 minutes (`600000` unless you raise that variable); with it off, `600000`. Before v2.1.257 it was always `600000`. On a stall Claude Code aborts the subagent and reports it to the parent (a background subagent is also marked failed with any partial result).
- `CLAUDE_ENABLE_STREAM_WATCHDOG` with `CLAUDE_STREAM_IDLE_TIMEOUT_MS`: stream watchdog that aborts the request when headers arrived but the body stops streaming. On by default for all providers; set `CLAUDE_ENABLE_STREAM_WATCHDOG=0` to disable. `CLAUDE_STREAM_IDLE_TIMEOUT_MS` defaults to `300000` and is clamped to that minimum. With `includePartialMessages`, a gateway's keep-alive pings arrive as `ping` stream events; read them as liveness (before v2.1.257 they stopped 5 minutes after the last real event).

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
    addPlugins?: SdkPluginConfig[];
  }): Promise<SDKControlReloadPluginsResponse>;
  reloadSkills(): Promise<SDKControlReloadSkillsResponse>;
  reloadOutputStyles(): Promise<SDKControlReloadOutputStylesResponse>;
  seedReadState(path: string, mtime: number): Promise<void>;
  accountInfo(): Promise<AccountInfo>;
  reconnectMcpServer(serverName: string): Promise<void>;
  toggleMcpServer(serverName: string, enabled: boolean): Promise<void>;
  setMcpServers(servers: Record<string, McpServerConfig>): Promise<McpSetServersResult>;
  setMcpPermissionModeOverride(
    serverName: string,
    mode: 'default' | 'auto' | null
  ): Promise<{ warning?: string }>;
  readMcpResource(serverName: string, uri: string): Promise<SDKControlMcpReadResourceResponse>;
  streamInput(stream: AsyncIterable<SDKUserMessage>): Promise<void>;
  stopTask(taskId: string): Promise<void>;
  backgroundTasks(toolUseId?: string): Promise<boolean>;
  close(): void;
}
```

| Method | Description |
|---|---|
| `interrupt()` | Interrupts the query (streaming input mode only). When the CLI advertises `interrupt_receipt_v1` in `SDKSystemMessage.capabilities`, resolves with an `SDKControlInterruptResponse` listing the messages pending at the interrupt; resolves `undefined` on CLIs before v2.1.205 |
| `rewindFiles()` | Restores files to their state at the specified user message (requires `enableFileCheckpointing: true`) |
| `setPermissionMode()` | Changes permission mode (streaming input mode only) |
| `setModel()` | Changes the model (streaming input mode only). `undefined` or `"default"` resets to Claude Code's default model; a session in `auto` mode changes to `default` mode if the new model doesn't support auto mode |
| `setMaxThinkingTokens()` | *Deprecated:* use `thinking`. `null` restores the `thinking` / `maxThinkingTokens` option the session started with |
| `applyFlagSettings()` | Merges settings into the flag-settings layer at runtime (streaming input mode only) |
| `updateSettings(source, settings)` | Writes one allowlisted key to a settings file so it persists: `"localSettings"` accepts `outputStyle` (merged into `.claude/settings.local.json`); `"userSettings"` accepts `effortLevel` (saved under `modelSettings` in user settings; passing `max` writes nothing because `max` is session-only; requires SDK v0.3.277+). Requires TypeScript SDK v0.3.257+. Rejects on any other key, over a remote transport, or when `settingSources` exclude the source |
| `readFile(path, options?)` | Reads a file from the session's filesystem (path resolved against `cwd`); `maxBytes` default 1 MB, ceiling 10 MB; `encoding: 'base64'` for binary. Resolves `SDKControlReadFileResponse`, or `null` on permission denial, missing file, or transport error. Requires TypeScript SDK v0.2.121+ |
| `reloadPlugins(options?)` | Reloads plugins from disk mid-session; resolves `SDKControlReloadPluginsResponse` (commands, agents, plugins, `mcpServers`, `error_count`, plus `held` / `cache_impact` with `holdOnCacheImpact`). Requires v0.2.85+; `holdOnCacheImpact` requires v0.3.268+ (an older `claude` executable ignores it and applies the reload); `addPlugins` (absolute-path `SdkPluginConfig` entries; the folders stay part of the session) requires Agent SDK v0.3.301+ and Claude Code v2.1.301+. If it rejects, none of the `addPlugins` folders are added: relative or malformed entry, `disableSideloadFlags` in managed settings, or the sandbox couldn't be rebuilt |
| `seedReadState(path, mtime)` | Marks a file as already read so a later Edit doesn't fail with `File has not been read yet`; `mtime` is the file's modification time at the earlier read in whole ms (e.g. `Math.floor(stat.mtimeMs)`); skipped if the file changed since. Resolves whether or not it was marked. Requires TypeScript SDK v0.2.83+ |
| `setMcpPermissionModeOverride(serverName, mode)` | Overrides the permission mode for one MCP server's tools with a stricter mode (`'default'` = Manual-mode evaluation, `'auto'` = auto mode classifier, rejected when the classifier is unavailable) or clears it with `null`. Only takes effect while the session is in `bypassPermissions` or `auto`. Resolves `{ warning }` when no server by that name is known yet (override is stored and applied once it connects). Streaming input mode only. Requires TypeScript SDK v0.3.187+ |
| `backgroundTasks(toolUseId?)` | Moves the running Bash commands and subagents the turn is waiting on to the background (like Ctrl+B); pass a `toolUseId` to background only that call. Resolves `true` if a task was backgrounded or `toolUseId` was omitted, `false` if `toolUseId` matched no foreground task; rejects if background tasks are disabled (e.g. `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`). Emits `SDKTaskNotificationMessage` when the task finishes. Requires TypeScript SDK v0.2.139+ |
| `reloadSkills()` | Reloads skills from disk mid-session; resolves `SDKControlReloadSkillsResponse`. Requires v0.3.163+ |
| `reloadOutputStyles()` | Re-reads output styles from disk; resolves `SDKControlReloadOutputStylesResponse`. Requires v0.3.261+ |
| `toggleMcpServer(serverName, enabled)` | Enables or disables an MCP server; disabling disconnects it and removes its tools. For a stdio/SSE/HTTP server added mid-session with `setMcpServers()`, removing its tools requires Claude Code v2.1.285+; for an in-process server from `createSdkMcpServer()`, v2.1.286+ |
| `readMcpResource(serverName, uri)` | *Alpha.* Reads one MCP Apps `ui://` resource from a connected MCP server; resolves `SDKControlMcpReadResourceResponse`. Requires TypeScript Agent SDK v0.3.280+ |
| `initializationResult()` | Returns the full initialization result |
| `reinitialize()` | Re-sends the `initialize` control request and returns a fresh result instead of the cached one; use after a transport gap so pending permission requests reach `canUseTool` again (make the callback idempotent per request ID). Requires Claude Code v2.1.195+ |
| `reconnectMcpServer(serverName)` | Reconnects an MCP server by name; if the name also matches a settings-file entry (`.mcp.json`, `~/.claude.json`), the server configured via `mcpServers` / `setMcpServers()` wins (Claude Code v2.1.257+) |
| `setMcpServers(servers)` | Replaces the MCP servers this method manages (servers added through it and in-process SDK servers); resolves `McpSetServersResult` |
| `supportedCommands()` | Available slash commands |
| `supportedModels()` | Available models |
| `supportedAgents()` | Available subagents |
| `mcpServerStatus()` | Status of connected MCP servers |
| `getContextUsage(opts?)` | Context window usage breakdown by category, skill, and tool (`SDKControlGetContextUsageResponse`). `detail: 'full'` (default) counts each category with token-counting API requests that don't appear in the message stream (not billed on the Anthropic API); `detail: 'summary'` uses the last response's usage and local estimates with no extra requests. `detail` requires Agent SDK v0.3.257+ |
| `accountInfo()` | Account information |
| `close()` | Closes and terminates the underlying process |

#### `applyFlagSettings()`

Changes settings on a running session without restarting the query.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const q = query({ prompt: messageStream });

// Override the model for the rest of the session
await q.applyFlagSettings({ model: "claude-opus-4-6" });

// Later: clear the override; the model resets to Claude Code's default
await q.applyFlagSettings({ model: null });
```

Settings applied on the next turn: `ultracode`, `permissions`, `hooks`, `skillOverrides`, `fastMode`, `agent` (switching `agent` also applies that agent's model override and hooks on the next turn; its system prompt applies on the next turn, or after compaction in a session that reuses a recorded system prompt). Settings applied during the current turn: `model` (the response already generating finishes on the old model; the next model call uses the new one; subagents keep their own model; before v2.1.212 a mid-turn switch waited for the next turn). `effortLevel` applies from Claude Code's next call to the model (on the next turn when changing effort keeps the prompt cache, e.g. Claude Opus 5.5). Settings with no mid-session effect: system prompt options (resolved once at startup).

`effortLevel` also accepts `"ultracode"` (requests `xhigh` with ultracode on), but the TypeScript declaration omits that value: pass `{ ultracode: true, effortLevel: "xhigh" }`, or the `ultracode` key alone to turn ultracode on at the current effort level (requires Claude Code v2.1.203+; accepted only by `applyFlagSettings()`; before v2.1.284 the `ultracode` key alone also set `xhigh`). Successive calls shallow-merge top-level keys, so a second `{ permissions: {...} }` replaces the whole `permissions` object. Pass `null` to clear a key (`undefined` has no effect): most keys fall back to the `settings` option, then lower-precedence sources; a cleared `model` resets to Claude Code's default model even if a settings file sets `model`. `effortLevel: null` returns to the model's default effort, `agent: null` runs the main thread with no agent from the next turn, and `ultracode: null` turns ultracode off (the effort level is kept).

### `WarmQuery`

Handle returned by `startup()`. The subprocess is already spawned and initialized.

```typescript
interface WarmQuery extends AsyncDisposable {
  query(prompt: string | AsyncIterable<SDKUserMessage>): Query;
  close(): void;
}
```

`query(prompt)` sends a prompt to the pre-warmed subprocess and returns a `Query` (can only be called once per `WarmQuery`); `close()` closes it without sending a prompt. `WarmQuery` implements `AsyncDisposable`, so it can be used with `await using` for automatic cleanup.

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
  hooks_applied?: boolean;
  sdk_mcp_manifests_parked?: Record<
    string,
    | "parked"
    | "already_connected"
    | "protocol_version_mismatch"
    | "malformed"
    | "not_honoured"
  >;
  claude_code_version?: string;
};
```

`hooks_applied` (v0.3.238+) reports whether Claude Code registered the `hooks` the `initialize` request carried; omitted when the request carried none. `true` for a session's first initialize and for a repeated initialize over the CLI's stdin (the new hooks replace the earlier ones); `false` for a repeated initialize sent to a remote session. `sdk_mcp_manifests_parked` is for in-process SDK MCP servers; your application doesn't set or read it. `claude_code_version` is the Claude Code version running the session's turns (same as the init message); requires Agent SDK v0.3.296+ (if `undefined` with `pathToClaudeCodeExecutable`, point it at v2.1.296+). The response always reports `fast_mode_state`, with `fast_mode_disabled_reason` alongside it when something blocks fast mode (Claude Code v2.1.219+). The control-response wrapper also carries `pending_permission_requests` (always present on success, empty when none; Claude Code v2.1.268+); the SDK dispatches each entry to `canUseTool`, so handle repeated request IDs idempotently.

### `SDKControlInterruptResponse`

The interrupt receipt from `interrupt()` (Claude Code v2.1.205+; earlier CLIs make `interrupt()` resolve `undefined`).

```typescript
type SDKControlInterruptResponse = {
  still_queued: string[];
  cancelled?: string[];
};
```

`still_queued` lists the UUIDs of user messages pending at the interrupt (queued, or already taken off the queue for the next turn); unless you cancel them they are processed after the interrupt, so resending one delivers it twice. Only messages enqueued with a UUID and main-thread messages are listed, and the list can include UUIDs your client never sent (e.g. scheduled-task triggers): ignore unknown ones. A client driving the control protocol directly can set `cancel_queued: true` on the `interrupt` request (capability `interrupt_cancel_queued_v1`, Claude Code v2.1.219+); those messages are then listed under `cancelled`, `still_queued` is empty, and none run. `interrupt()` never sends `cancel_queued`, so its receipts carry no `cancelled`. The receipt arrives before the interrupted turn's `SDKResultMessage`.

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

`tools`, if omitted, inherits every tool available to subagents (preload skills with `skills`, not `'Skill'`). `model` accepts an alias (`'fable'`, `'opus'`, `'sonnet'`, `'haiku'`, `'inherit'`) or a full model ID; `'inherit'` uses the model of the agent that spawned this one, and when omitted Claude Code follows the subagent model order. `autoCompactWindow` lowers the auto-compact window to a token count from `100000` to `1000000` (TypeScript Agent SDK v0.3.296+). `omitClaudeMd` requires v0.3.271+.

### `AgentMcpServerSpec`

```typescript
type AgentMcpServerSpec = string | Record<string, McpServerConfigForProcessTransport>;
```

A server name (referencing the parent's `mcpServers`) or an inline record mapping server names to configs; `McpServerConfigForProcessTransport` is `McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfig`.

### `AgentInfo`

Information about an available subagent that can be invoked via the Agent tool.

```typescript
export declare type AgentInfo = {
    name: string;
    description: string;
    model?: string; // if omitted, inherits the parent's model
};
```

`model` is an alias or model ID, or `'inherit'` for the parent's model; when `undefined`, Claude Code picks the model in the subagent model order.

### `CanUseTool`

Permission callback invoked before each tool execution when the permission flow falls through to a prompt.

```typescript
export declare type CanUseTool = (toolName: string, input: Record<string, unknown>, options: {
    signal: AbortSignal;
    suggestions?: PermissionUpdate[];
    blockedPath?: string;
    mcpServer?: { name: string; source: string };
    decisionReason?: string;
    title?: string;
    displayName?: string;
    description?: string;
    defaultToNo?: boolean;
    suppressAlwaysAllowRule?: boolean;
    toolUseID: string;
    agentID?: string;
    requestId: string;
    matchedAskRule?: { source: string; toolName: string; ruleContent?: string };
}) => Promise<PermissionResult | null>;
```

Return `null` only after already sending the `control_response` out-of-band (e.g. a signed HTTP POST echoing `requestId`) — the SDK then skips its own transport write. Fail-closed: an accidental `null` otherwise leaves the tool blocked indefinitely (permission prompts have no park deadline). `requestId` and the `null` return require Claude Code v2.1.199 or later.

- `suggestions`: suggested permission updates; Bash prompts include one with the `localSettings` destination, so returning it in `updatedPermissions` writes the rule to `.claude/settings.local.json` and persists.
- `mcpServer`: for an `mcp__*` tool, the serving server's `McpServerProvenance` (`name`, `source`); absent for other tools. Requires Agent SDK v0.3.274+.
- `defaultToNo`: when `true`, a stray keystroke must not approve: open your prompt on its decline option and offer no one-key approve shortcut. Requires v0.3.268+.
- `suppressAlwaysAllowRule`: when `true`, don't offer a persistent always-allow choice. Requires v0.3.268+.
- `requestId`: the `control_request` envelope's `request_id`; an out-of-band `control_response` must echo it.
- `title`, `displayName`, `description`, and `matchedAskRule` are kept from the earlier `sdk.d.ts`-based declaration; the current official `CanUseTool` declaration and option table don't list them.

### `PermissionMode`

```typescript
export declare type PermissionMode = 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan' | 'dontAsk' | 'auto';
```

`'default'` is standard permission behavior; `'acceptEdits'` auto-accepts file edits; `'bypassPermissions'` bypasses permission checks, though explicit ask rules still prompt (requires `allowDangerouslySkipPermissions`, at startup or later via `setPermissionMode()`); `'plan'` explores and plans; `'dontAsk'` denies anything not pre-approved instead of prompting; `'auto'` has a model classifier review actions such as shell commands and network requests.

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

`decisionClassification` is kept from the earlier `sdk.d.ts`-based declaration; the current official `PermissionResult` doesn't list it. An `allow` result with more than 4,096 items in `updatedPermissions` (each update, and each entry in its `rules` / `directories` list, counts as one) is treated as invalid and the tool call is denied.

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

### `PermissionBehavior` and `PermissionUpdateDestination`

```typescript
type PermissionBehavior = "allow" | "deny" | "ask";

type PermissionUpdateDestination =
  | "userSettings" // Global user settings
  | "projectSettings" // Per-directory project settings
  | "localSettings" // Local project settings
  | "session" // Current session only
  | "cliArg"; // CLI argument
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
    timeout?: number; // Timeout in seconds for all hooks in this matcher
    onFailure?: "continue" | "block"; // "block" blocks the action when a callback fails
}
```

`onFailure: "block"` blocks the action when a callback fails; the Hooks guide section "Block the action when a callback fails" says what it covers.

### `HookEvent`

```typescript
export declare type HookEvent = 'PreToolUse' | 'PostToolUse' | 'PostToolUseFailure' | 'PostToolBatch' | 'Notification' | 'UserPromptSubmit' | 'UserPromptExpansion' | 'SessionStart' | 'SessionEnd' | 'Stop' | 'StopFailure' | 'SubagentStart' | 'SubagentStop' | 'PreCompact' | 'PostCompact' | 'PreModelSwitch' | 'PostModelSwitch' | 'PermissionRequest' | 'PermissionDenied' | 'Setup' | 'TeammateIdle' | 'TaskCreated' | 'TaskCompleted' | 'Elicitation' | 'ElicitationResult' | 'ConfigChange' | 'WorktreeCreate' | 'WorktreeRemove' | 'InstructionsLoaded' | 'CwdChanged' | 'FileChanged' | 'DirectoryAdded' | 'MessageDisplay';
```

`'PreModelSwitch'` and `'PostModelSwitch'` have matching `PreModelSwitchHookInput` / `PostModelSwitchHookInput` types on the official page.

### `HookCallback`

```typescript
type HookCallback = (
  input: HookInput, // Union of all hook input types
  toolUseID: string | undefined,
  options: { signal: AbortSignal }
) => Promise<HookJSONOutput>;
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

type McpSdkServerConfigWithInstance = {
  type: "sdk";
  name: string;
  timeout?: number;
  tools?: McpServerToolPolicy[];
  instance: McpServer;
};

type McpServerToolPolicy = {
  name: string;
  permission_policy?: "always_allow" | "always_ask" | "always_deny";
  org_max_permission?: "allow" | "ask" | "blocked";
};

type McpClaudeAIProxyServerConfig = {
  type: "claudeai-proxy";
  url: string;
  id: string;
};
```

The `timeout` / `alwaysLoad` / `tools` fields on the stdio / SSE / HTTP configs are kept from the earlier `sdk.d.ts`-based declaration; the current official page declares only `type`, `command` / `url`, `args`, `env`, `headers` for them, and documents `tools` policy entries only on the in-process (`sdk`) config.

`McpSdkServerConfigWithInstance` is what `createSdkMcpServer()` returns plus an optional `tools` list of `McpServerToolPolicy` entries that you add (v0.3.301+ and Claude Code v2.1.301+; an older executable ignores the list, so `always_ask` / `always_deny` aren't enforced). Spread the returned config under `mcpServers` and put `tools` beside it; the function's own `tools` option takes tool definitions, not policy entries. To change a policy mid-session pass the server's config with a new `tools` value to `setMcpServers()` (entries replace, an empty list clears, no `tools` key keeps the current policies) and include your other in-process servers, or the call disconnects them.

`McpServerToolPolicy`: `name` is the bare tool name passed to `tool()` (no `mcp__<server>__` prefix). `permission_policy`: `always_ask` requires approval for each call even if `allowedTools` or an allow rule covers it (goes to `canUseTool` / `permissionPromptToolName`, unless settled first; denied in `dontAsk` mode); `always_deny` denies the tool in every mode including `bypassPermissions` (a mod in a plugin you load can still approve it; likewise a mod can approve an `always_ask` call first); `always_allow` is ignored on an in-process server (use `allowedTools`). `org_max_permission` is an admin ceiling, ignored on an in-process server. With neither `canUseTool` nor `permissionPromptToolName`, or `permissionPrompts: 'none'`, an unsettled `always_ask` call is denied unless a `PermissionRequest` hook allows it.

An `always_ask` call can be approved before reaching `canUseTool`: in `auto` mode the classifier can allow it (set `destructiveHint: true` on the tool to force it to your callback); in `plan` mode while auto mode is available, `readOnlyHint: true` tools go to the classifier (add `destructiveHint: true` alongside, or set `useAutoModeDuringPlan` to `false` to turn the classifier off during planning); in `bypassPermissions` it is approved without your callback when `CLAUDE_CODE_REMOTE` is `true` (cloud sessions), and reaches the callback elsewhere. Set `destructiveHint` explicitly, since `always_ask` reads an unset value as `false`.

### `ModelUsage`

Per-model cost/token breakdown on the result message (see `../operations/cost-tracking.md`).

```typescript
export declare type ModelUsage = {
    inputTokens: number;
    outputTokens: number;
    thinkingTokens?: number;
    cacheReadInputTokens: number;
    cacheCreationInputTokens: number;
    webSearchRequests: number;
    costUSD: number;
    contextWindow: number;
    maxOutputTokens: number;
    canonicalModel?: string; // canonical model id used for pricing lookup, e.g. 'claude-opus-4-7'
    provider?: string; // 'firstParty' | 'bedrock' | 'vertex' | 'foundry' | 'anthropicAws' | 'anthropicGoogleCloud' | 'mantle' | 'gateway'
    costBasis?: 'list' | 'managed' | 'unknown';
};
```

`thinkingTokens` counts thinking tokens this model generated; `outputTokens` already includes them, so don't add the two (requires Agent SDK v0.3.257+; absent until a turn runs on a version that records it, so a resumed session reports a partial count). `canonicalModel` / `provider` require Claude Code v2.1.218+. `costBasis` names the price table that priced the model's latest request: `list`, `managed` (a `modelPricing` table), or `unknown` (Claude Code v2.1.246+).

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

`apiProvider` is `'gateway'` when the CLI is authenticated against an enterprise gateway; Anthropic OAuth login only applies when `'firstParty'`. The current official `AccountInfo` declaration doesn't list `apiProvider` (kept from the earlier `sdk.d.ts`-based declaration).

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

On the Claude API, the `context-1m-2025-08-07` beta is retired for Claude Sonnet 4.5 and Claude Sonnet 4. If you still pass it with either model, requests that exceed the standard 200K-token context window return an error, so remove it from `betas`. To run a session with a 1M-token context window, set `model` to a model that runs with the 1M window by default, such as `claude-sonnet-5-5` or `claude-opus-5-5`; for a model that reaches 1M only through its `[1m]` variant, append the suffix to the model ID, as in `claude-opus-4-6[1m]`.

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
  | { type: "disabled" }; // Turn thinking off where the model and provider allow it
```

On Claude Opus 4.7 and later the API default for `display` is `"omitted"`, so set `"summarized"` to receive thinking text. On providers such as Amazon Bedrock and Google Cloud's Agent Platform, Claude Code doesn't pass `display` for earlier models it recognizes (Opus 4.6, Sonnet 4.6, Haiku 4.5, and earlier), which use their default. For `disabled`, see "where you can't turn thinking off" in the model config docs.

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

`added` lists the servers added or replaced, whether or not they connected; a server that failed to connect appears in both `added` and `errors` (before Claude Code v2.1.257 a server whose connection attempt threw was reported only under `errors`). The promise resolves after newly added stdio, HTTP, and SSE servers connect or fail. Outside a cloud session: servers the call doesn't name that an earlier `setMcpServers()` added, and in-process SDK servers, are disconnected and listed in `removed` (stdio / HTTP / SSE servers from `mcpServers`, settings files, and plugins keep running); naming a server again with an identical config keeps its connection (in neither `added` nor `removed`), a changed config reconnects it (listed in `added`); for an in-process server, passing a `tools` policy list, even an empty one, replaces its policies; naming a built-in CLI server reports it in `errors`. A server sharing a name with an installation-scope one (e.g. `.mcp.json`) uses your server's tools (before Claude Code v2.1.305 reloading plugins could disconnect it). An `errors` value starting `Blocked by enterprise` means policy refused the server: `Blocked by enterprise policy (allowedMcpServers/deniedMcpServers)` (not in `added`) or `Blocked by enterprise managed policy` (in `added`, with a `failed` row in `mcpServerStatus()`).

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

`source` (requires Agent SDK v0.3.274+) is where the server's definition came from, with the same values as `McpServerProvenance.source` (`{ name: string; source: string }`, carried as `mcp_server` on the `PreToolUse` / `PostToolUse` / `PostToolUseFailure` / `PermissionRequest` / `PermissionDenied` hook inputs and as `mcpServer` in `CanUseTool` options): `sdk` (in-process server your application registered; no configured server ever reports it), `plugin`, or a configuration scope (`user`, `project`, `local`, `dynamic`, `managed`, `enterprise`, `claudeai`, `agent`). The set is open: treat unknown values as configured, never as `sdk`, base trust decisions on `source` rather than `name`, and escape `name` before display for any non-`sdk` source. `tools[]._meta` carries only the `ui` object and `ui/resourceUri` string a server declared (requires v0.3.280+; sent only when init `capabilities` includes `mcp_tool_ui_meta_v1`); when a tool's `ui.resourceUri` fails Claude Code's checks (must start with `ui://`, `visibility` only `"model"` / `"app"`, at most 4,096 characters serialized) you receive at most a `ui` holding only `visibility`. `McpServerStatusConfig` is the union `McpStdioServerConfig | McpSSEServerConfig | McpHttpServerConfig | McpSdkServerConfig | McpClaudeAIProxyServerConfig`.

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
  | SDKControlRequestProgressMessage
  | SDKModelRefusalFallbackMessage
  | SDKModelRefusalNoFallbackMessage
  | SDKMirrorErrorMessage
  | SDKInformationalMessage
  | SDKConversationResetMessage;
```

Three union members have `type: "system"`; tell them apart by `subtype`: `SDKControlRequestProgressMessage` (`"control_request_progress"`: progress on a long-running control request your client sent; `request_id` matches it, `status` is `"started"` or `"api_retry"`; v0.3.203+), `SDKModelRefusalFallbackMessage` (`"model_refusal_fallback"`: the model ended the stream with a refusal and the turn is retried on a fallback model; carries `original_model` and `fallback_model`; v0.3.170+), `SDKModelRefusalNoFallbackMessage` (`"model_refusal_no_fallback"`: refusal and no retry, e.g. no fallback model configured; carries `original_model`; v0.3.193+).

### `SDKAssistantMessage`

```typescript
type SDKAssistantMessage = {
  type: "assistant";
  uuid: UUID;
  session_id: string;
  message: BetaMessage; // From Anthropic SDK
  parent_tool_use_id: string | null;
  error?: SDKAssistantMessageError;
  aborted?: true;
  agent_id?: string;
  timestamp?: string;
  context_usage?: SDKContextUsage;
  usage_report?: SDKUsageReport;
  user_message_uuid?: string;
  user_message_uuids?: string[];
  resume_reason?: string;
};
```

- `SDKAssistantMessageError` is one of `'authentication_failed'`, `'oauth_org_not_allowed'`, `'account_on_hold'`, `'billing_error'`, `'rate_limit'`, `'overloaded'` (a 529 capacity error, vs `'rate_limit'` = 429 against your quota), `'invalid_request'`, `'model_not_found'`, `'server_error'`, `'max_output_tokens'`, `'cloud_credential_error'` (no usable AWS or Google Cloud credentials on the machine running Claude Code, so no request reached the provider; TypeScript SDK v0.3.267+), or `'unknown'`.
- `aborted` is `true` when an interrupt or abort truncated the message before the stream completed (no `stop_reason`; content may end mid-word); v0.3.214+.
- `agent_id` identifies the producing subagent (equals the `task_id` on that subagent's task events, unchanged on resume; absent on main-thread messages; for a nested subagent it names the nested one); v0.3.292+. Match a subagent's messages to its task events on `agent_id`, not `parent_tool_use_id` vs `tool_use_id` (a resume call's task events carry the new call's `tool_use_id`).
- `timestamp` is the ISO 8601 time the content finished generating (display only; one API turn can produce several assistant messages sharing a `message.id`).
- `context_usage` (`SDKContextUsage`, v0.3.232+) and `usage_report` (`SDKUsageReport`, v0.3.273+, only for claude.ai-credential sessions with a known plan type or the `user:profile` scope and not on usage-based billing) are structured copies of the `/context` and `/usage` reports, attached to the assistant message that delivers the result of sending those commands as prompts; fall back to the text in `message.content` when absent.

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
      time_to_request_ms?: number;
      user_message_uuid?: string;
      user_message_uuids?: string[];
      resume_reason?: string;
      local_command?: string;
      request_sent_wall_ms?: number;
      first_content_frame_ms?: number;
      first_stream_post_ms?: number;
      first_stream_post_ack_ms?: number;
      first_stream_post_queue_wait_ms?: number;
      first_stream_post_queued_behind?: "durable_post" | "ephemeral_post" | "retry_backoff" | "hold" | "none";
      first_stream_post_wall_ms?: number;
      first_text_post_ms?: number;
      first_text_post_queue_wait_ms?: number;
      first_text_post_queued_behind?: "durable_post" | "ephemeral_post" | "retry_backoff" | "hold" | "none";
      first_text_post_wall_ms?: number;
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
- `result_index` and `local_command` require Agent SDK v0.3.268 or later; `queued_turn_count` requires v0.3.242 or later; `first_content_frame_ms` requires v0.3.260 or later. `time_to_request_ms` (success arm only) is the time from turn start until the API request is sent (Claude Code v2.1.162+). `first_stream_post_ms` / `first_stream_post_ack_ms` / `first_stream_post_wall_ms` are recorded only in sessions streamed to claude.ai (e.g. cloud sessions); results `query()` yields don't carry them (v0.3.260+).
- `fast_mode_disabled_reason` (Claude Code v2.1.219+) is absent when nothing blocks fast mode; codes: `free`, `preference`, `extra_usage_disabled`, `network_error`, `unknown`, `not_first_party`, `disabled_by_env`, `model_not_allowed`, `sdk_opt_in_required` (pass `fastMode: true` in `settings` or via `applyFlagSettings()`), `pending`. During the cooldown after a fast mode rate limit, `fast_mode_state` is `"cooldown"` with no reason code. The same pair appears on `SDKSystemMessage` and `SDKControlInitializeResponse`.
- `user_message_uuid` echoes the `uuid` you set on the `SDKUserMessage` the turn answered (nothing is echoed if you set none; with merged messages it names only the last); `user_message_uuids` (v0.3.259+, at most 64 entries, always contains `user_message_uuid`) lists every message answered in the turn. Both are also set on the turn's first reply frames. `resume_reason` (v0.3.268+; a short lowercase token such as `interrupted_turn`) marks a turn that continues one a restart interrupted under `CLAUDE_CODE_RESUME_INTERRUPTED_TURN`. `queued_turn_count` counts messages you sent with `origin: { kind: "human" }` still queued (`0` does not rule out a following turn; absent after a crash or fatal startup error).
- `startup_failure_reason` (v0.3.274+) is set on the `error_during_execution` result written before exit on a known startup failure (zeroed totals; message in `errors`). Without `CLAUDE_CODE_STARTUP_FAILURE_RESULTS=1` in `env` the result is written only for: a resume that can't return the session to its worktree (`worktree_unverified` / `worktree_resume_refused`), a refused `continue` of a conversation a background session holds (`session_held_by_background`), a start refused because `failIfUnavailable` is on and the sandbox can't start (`sandbox_required_unavailable`), and a start refused because `~/.claude.json` isn't valid JSON (`config_file_invalid`). Values of `SDKStartupFailureReason`: `org_pin_api_key_conflict`, `provider_not_allowed` (Claude Code v2.1.285+), `org_verify_failed`, `org_pin_mismatch`, `managed_settings_invalid`, `remote_settings_required_unavailable`, `gateway_signin_required`, `gateway_access_denied`, `proxy_invalid`, `temp_dir_unusable`, `cwd_unavailable`, `shell_tool_missing`, `session_held_by_background`, `worktree_resume_refused`, `worktree_unverified`, `cli_version_too_old`, `bypass_root`, `org_config_required_unavailable` and `org_config_refused` (v0.3.293+), `sandbox_required_unavailable` (v0.3.314+; `errors` ends with `Set sandbox.failIfUnavailable=false to allow unsandboxed execution.`), `config_file_invalid` (TypeScript SDK v0.3.318+ and Claude Code v2.1.318+; Claude Code leaves the file unchanged, so a retry fails until it is repaired).
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

`capabilities` names protocol behaviors the CLI implements so you can feature-detect instead of comparing `claude_code_version` (open set; ignore unknown values). Requires Claude Code v2.1.205 or later. Known values: `interrupt_receipt_v1` (`interrupt()` resolves with a receipt), `interrupt_cancel_queued_v1` (the `interrupt` request honors `cancel_queued: true`; v2.1.219+), `sdk_mcp_manifests` and `sdk_mcp_tools_list_changed` (in-process SDK MCP server manifests / `tools/list_changed` re-listing; advertised from v2.1.286), `mcp_read_resource_v1` (`readMcpResource()` available), `mcp_tool_ui_meta_v1` (`_meta` sent on `mcpServerStatus()` tools). `plugin_errors` requires Agent SDK v0.3.283 or later; it lists plugins that failed to load or loaded without a part (entry fields `plugin`, `type` from an open set such as `path-not-found` / `manifest-validation-error`, `message`, and `path` only when the directory or archive itself failed, in which case `plugin` is a positional tag such as `inline[0]`). `terminal_slash_commands` (v0.3.229+) names `slash_commands` entries bound to the local terminal, such as `exit`; `mcp_servers[].source` requires v0.3.274+.

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

`summary` is populated for subagent tasks only when `agentProgressSummaries` is enabled; for a backgrounded MCP tool call it carries the MCP server's latest reported progress regardless of that option.

### `SDKToolProgressMessage`

Emitted periodically while a tool is executing.

```typescript
type SDKToolProgressMessage = {
  type: "tool_progress";
  tool_use_id: string;
  tool_name: string;
  parent_tool_use_id: string | null;
  elapsed_time_seconds: number;
  task_id?: string;
  heartbeat?: boolean;
  subagent_type?: string;
  subagent_retry?: {
    agent_id: string;
    attempt: number;
    max_retries: number;
    retry_delay_ms: number;
    error_status: number | null;
    error_category: string;
  };
  uuid: UUID;
  session_id: string;
};
```

While a tool call runs in the main conversation, a `tool_progress` message with `heartbeat: true` is emitted every 30 seconds (none for tool calls inside a subagent; before v2.1.257 none for a foreground Agent tool call either). On non-heartbeat messages for the Agent tool, `subagent_type` names the running subagent type and `subagent_retry` is present, one message per attempt, while that subagent waits out an API error backoff. `heartbeat`, `subagent_type`, and `subagent_retry` require v0.3.214+. Track a retry indicator by `parent_tool_use_id` (unique per subagent; `tool_use_id` is shared by parallel subagents) and clear it when a later `tool_progress` for that id arrives with neither `subagent_retry` nor `heartbeat: true`, or when the tool result arrives. `error_category` values: `rate_limit`, `overloaded`, `authentication_failed`, `server_error`, `cloud_credential_error`, `unknown` (treat unknown values as `unknown`).

### `SDKTaskStartedMessage`

Emitted when a task begins.

```typescript
type SDKTaskStartedMessage = {
  type: "system";
  subtype: "task_started";
  task_id: string;
  run_id?: string;
  tool_use_id?: string;
  description: string;
  task_type?: string;
  is_backgrounded?: boolean;
  spawn_depth?: number;
  parent_task_id?: string;
  ambient?: boolean;
  uuid: UUID;
  session_id: string;
};
```

`task_type` names the kind of task: `"local_bash"` (Bash commands and Monitor watches), `"local_agent"` (subagents), `"mcp_task"` (background MCP tool calls), or `"remote_agent"`. `run_id` (v0.3.292+) identifies one run of the task: a resumed subagent keeps its `task_id` but gets a new `run_id`, shared by that run's `task_started` / `task_progress` / `task_updated` / `task_notification` messages, its `background_tasks_changed` entry, and the `runId` on the origin of the user message that delivers its notification; fall back to `task_id` when `run_id` is absent. `ambient` (v0.3.247+) is `true` for tasks outside the session's work (including live-update watchers): exclude them from activity indicators. `is_backgrounded` (`"local_agent"` / `"local_bash"`) and `spawn_depth` (`"local_agent"` only; main-thread subagent = `1`) require v0.3.238+; a resumed subagent always reports `is_backgrounded: true`, and a later move to the background arrives as `task_updated`. `parent_task_id` (v0.3.292+; set on subagent, Bash, and Monitor tasks) is the `task_id` of the subagent that launched this task; absent for main-thread, teammate, or workflow-launched tasks.

### `SDKTaskNotificationMessage`

Notification when a background task completes, fails, or is stopped. Background tasks include `run_in_background` Bash commands, Monitor watches, and background subagents.

```typescript
type SDKTaskNotificationMessage = {
  type: "system";
  subtype: "task_notification";
  task_id: string;
  run_id?: string;
  tool_use_id?: string;
  status: "completed" | "failed" | "stopped";
  reason?: "worker_restart";
  output_file: string;
  summary: string;
  ambient?: boolean;
  usage?: {
    total_tokens: number;
    tool_uses: number;
    duration_ms: number;
  };
  resource_links?: SDKMcpResourceLink[];
  uuid: UUID;
  session_id: string;
};
```

`reason` (v0.3.273+) is set only in sessions connected through claude.ai (cloud and Remote Control); `worker_restart` means the process running the task restarted, with status `"stopped"`. For a long MCP tool call moved to the background, the `tool_result` holds a placeholder and the real result arrives here (match on `tool_use_id`); on `completed`, `resource_links` lists returned files (`SDKMcpResourceLink`: `uri`, `name`, `title?`, `description?`, `mimeType?`, `size?`, `annotations?`; max 50 links / 64 KiB; v0.3.257+). Detect a task-notification turn with `origin.kind === "task-notification"` on the `SDKUserMessage` / `SDKResultMessage`, not by the notice text.

### `SDKTaskUpdatedMessage`

```typescript
type SDKTaskUpdatedMessage = {
  type: "system";
  subtype: "task_updated";
  task_id: string;
  run_id?: string;
  patch: {
    status?: "pending" | "running" | "completed" | "failed" | "killed";
    description?: string;
    end_time?: number;
    total_paused_ms?: number;
    error?: string;
    is_backgrounded?: boolean;
  };
  uuid: UUID;
  session_id: string;
};
```

Emitted when a background task's state changes; merge `patch` into a local map keyed by `task_id` (`end_time` is epoch ms).

### Tool Input / Output Types (selected)

Exported from `@anthropic-ai/claude-agent-sdk/sdk-tools`; `ToolInputSchemas` / `ToolOutputSchemas` are the unions of every built-in tool's types. `StructuredOutput` has no fixed type here (its schema comes from `outputFormat`). The `Agent` tool's earlier name `Task` is still accepted as an alias (the init message's `tools` array still lists it as `Task`).

```typescript
type AgentInput = {
  description: string;
  prompt: string;
  subagent_type?: string;
  model?: "sonnet" | "opus" | "haiku" | "fable";
  effort?: "low" | "medium" | "high" | "xhigh" | "max";
  run_in_background?: boolean;
  name?: string;
  team_name?: string; // Deprecated; ignored
  mode?: "acceptEdits" | "auto" | "bypassPermissions" | "default" | "dontAsk" | "plan"; // Deprecated; ignored. The subagent inheritance rules decide a subagent's permission mode
  isolation?: "worktree" | "remote";
};

type BashInput = {
  command: string;
  timeout?: number; // milliseconds. Foreground: capped at 600000 by default, higher values are clamped. With run_in_background (Claude Code v2.1.285 or later): the background time limit, 1800000 when omitted, capped at 7200000 unless raised
  description?: string;
  run_in_background?: boolean;
  dangerouslyDisableSandbox?: boolean;
};

type MonitorInput = {
  description: string;
  timeout_ms: number;
  command?: string;
  ws?: {
    url: string;
    protocols?: string[];
  };
};

type PushNotificationInput = {
  message: string;
  status: "proactive";
};
```

- `AgentInput.mode` is deprecated and ignored on Claude Code v2.1.212+. `AgentOutput` is discriminated on `status`: `"completed"` (with `agentId`, `content`, `totalToolUseCount`, `totalDurationMs`, `totalTokens`, `usage`, `prompt`, optional `resolvedModel` v2.1.174+, `modelsUsed` v2.1.212+, `toolStats`, `worktreePath` / `worktreeBranch`), `"async_launched"` (background; `outputFile`, `canReadOutputFile?`), or `"remote_launched"` (`taskId`, `sessionUrl`, `outputFile`). `usage` and `totalTokens` come from the subagent's final API request only.
- `MonitorInput`: provide exactly one of `command` (one event per stdout line; same permission rules as Bash) or `ws` (one event per text frame; Claude Code v2.1.195+). `timeout_ms` defaults to 300000, accepts up to 3600000, effective deadline at most 1800000 (30 minutes); the exported type marks it required although a call omitting it validates. `MonitorOutput` is `{ taskId: string; timeoutMs: number; persistent?: boolean }`; stop early with `TaskStop`.
- `PushNotificationInput`: sends a proactive push notification; keep `message` under 200 characters. Delivery runs through Anthropic-hosted infrastructure, unavailable from Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry. `PushNotificationOutput` is `{ message: string; pushSent?: boolean; localSent?: boolean; disabledReason?: "config_off" | "user_present" | "no_transport"; sentAt?: string }`.
- `BashOutput` adds `timedOutAfterMs` and `backgroundCwdHint` (v2.1.210+), `backgroundEndsWithFinalResponse` (v2.1.227+), and `gitOperation` (`commit` / `push` / `branch` / `pr`; `gitOperation.commit.branch` v0.3.227+, the `reopened` PR action v0.3.234+).
- `TaskOutput` was removed in Claude Code v2.1.277 together with `TaskOutputInput` (Claude reads a background task's output file with `Read`); a `disallowedTools` entry or deny rule naming it is ignored without a warning. The experimental `REPL` tool was removed in v2.1.275.

```typescript
type FileReadOutput =
  | {
      type: "text";
      file: {
        filePath: string;
        content: string;
        numLines: number;
        startLine: number;
        totalLines: number;
        /** True when a whole-file read was auto-paginated because it exceeded the token cap (the content is a partial first page). */
        truncatedByTokenCap?: boolean;
      };
    }
  | {
      type: "image";
      file: {
        base64: string;
        type: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
        originalSize: number;
        dimensions?: {
          originalWidth?: number;
          originalHeight?: number;
          displayWidth?: number;
          displayHeight?: number;
        };
      };
    }
  | {
      type: "notebook";
      file: {
        filePath: string;
        cells: unknown[];
      };
    }
  | {
      type: "pdf";
      file: {
        filePath: string;
        base64: string;
        originalSize: number;
      };
    }
  | {
      type: "parts";
      file: {
        filePath: string;
        originalSize: number;
        count: number;
        outputDir: string;
      };
      /** Document page number of the first extracted page; labels the page images in the tool_result content. */
      firstPage?: number;
      /** In-process only: the page-image bytes are delivered as image blocks in the tool_result content and aren't retained on the emitted tool_use_result, so this key is absent there. */
      pages?: {
        base64: string;
        mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
        error?: string;
      }[];
    }
  | {
      type: "file_unchanged";
      file: {
        filePath: string;
      };
      /** Set when the dedup matched a startup-seeded entry (CLAUDE.md / nested memory) rather than a prior Read tool_result. */
      source?: "seeded";
    };
```

`FileReadOutput` (the `Read` tool's output) is discriminated on `type`.

### `BUILTIN_TOOL_NAMES` and `LEGACY_TOOL_NAME_ALIASES`

Alpha constants (Agent SDK v0.3.301+) for checking tool names your users enter, spelled as in permission rules, hook matchers, and the `tools` / `disallowedTools` options. Import from `@anthropic-ai/claude-agent-sdk` or `/core`.

```typescript
const BUILTIN_TOOL_NAMES: readonly ["Agent", /* ...more names... */ "Write"];
const LEGACY_TOOL_NAME_ALIASES: Readonly<Record<string, string>>;
```

`BUILTIN_TOOL_NAMES` lists built-in tool names alphabetically (no MCP tools; some built-ins are left out, so a deny list built from it doesn't cover everything: use `disallowedTools: ["*"]` to deny every tool). `LEGACY_TOOL_NAME_ALIASES` maps earlier names to current ones (`Task` to `Agent`; `KillShell` and `KillBash` to `TaskStop`). Confirm a name with `BUILTIN_TOOL_NAMES` membership or `Object.hasOwn(LEGACY_TOOL_NAME_ALIASES, name)`. Membership doesn't mean the session has the tool (`TodoWrite` is listed but disabled by default); read the `tools` array of the init message instead, mapping its `Task` through the aliases.

### `AbortError`

`class AbortError extends Error {}` — the only error class in the SDK's typed API; other failures (Claude Code process exits or fails to launch) reject the iteration with errors that carry no SDK class, so match them by message (see Troubleshooting).

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
  allowNestedUserNamespaces?: boolean;
  ripgrep?: { command: string; args?: string[] };
};
```

| Property | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Enable sandbox mode for command execution |
| `failIfUnavailable` | `boolean` | `true` | Stop at startup if `enabled` is `true` but the sandbox can't start. Set `false` to fall back to unsandboxed execution with a warning on stderr |
| `autoAllowBashIfSandboxed` | `boolean` | `true` | Auto-approve Bash commands when sandbox is enabled |
| `excludedCommands` | `string[]` | `[]` | Commands that bypass sandbox restrictions, such as `['docker *']`. These run unsandboxed automatically without model involvement (no `canUseTool` fallback); `sandbox.excludedCommands` in the settings reference covers when an entry applies |
| `allowUnsandboxedCommands` | `boolean` | `true` | Allow the model to request running commands outside the sandbox via `dangerouslyDisableSandbox`, which falls back to the permissions system |
| `network` | `SandboxNetworkConfig` | `undefined` | Network-specific sandbox configuration |
| `filesystem` | `SandboxFilesystemConfig` | `undefined` | Filesystem read/write restrictions |
| `ignoreViolations` | `Record<string, string[]>` | `undefined` | Violations to leave out of the sandbox's violation report. Each key matches part of a command, or `*` for every command; each value lists text to match in a violation line: `{ "*": ['/etc/hosts'] }` hides violations that mention `/etc/hosts` |
| `enableWeakerNestedSandbox` | `boolean` | `false` | Enable a weaker nested sandbox for compatibility |
| `allowNestedUserNamespaces` | `boolean` | `false` | Let sandboxed commands on Linux and WSL2 create user namespaces. Read `sandbox.allowNestedUserNamespaces` in the settings reference first: it turns off a security boundary. Requires Claude Code v2.1.305 or later |
| `ripgrep` | `{ command: string; args?: string[] }` | `undefined` | Custom ripgrep binary configuration |

When `enabled` is `true` and the sandbox can't start, `query()` reports a `result` message with `subtype: "error_during_execution"` and the reason in `errors` (with `startup_failure_reason: "sandbox_required_unavailable"`, Agent SDK v0.3.314+); for a single-message `query()` call the SDK throws after yielding that result, so wrap the loop in a try block to continue past it. The sandbox depends on platform support and, on Linux, tools like `bubblewrap` and `socat`. Set `failIfUnavailable: false` to run unsandboxed instead.

`allowUnixSockets` can grant access to system services that reach outside the sandbox (allowing `/var/run/docker.sock` effectively grants full host access via the Docker API). With `allowUnsandboxedCommands` on, a model request with `dangerouslyDisableSandbox: true` falls back to the permissions system (your `canUseTool` runs); combined with `permissionMode: 'bypassPermissions'` the model can run commands outside the sandbox without prompts, apart from the actions no mode auto-approves. `ripgrep` is a custom ripgrep binary for sandbox environments.

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

Applies to sandboxed Bash commands only; does not restrict the WebFetch tool. `deniedDomains` takes precedence over `allowedDomains`. `strictAllowlist` (default `false`) denies sandboxed commands access to hosts outside the network allowlist instead of prompting, is enforced for sandboxed commands only (in-process tools such as WebFetch aren't gated), requires Claude Code v2.1.219 or later, and is honored only from user, managed, or CLI `--settings` settings (project settings are ignored). `allowUnixSockets` can grant access to system services that reach outside the sandbox (e.g. `/var/run/docker.sock`). The built-in sandbox proxy enforces the allowlist by requested hostname and does not terminate or inspect TLS, so domain fronting can potentially bypass it. `allowManagedDomainsOnly` is managed-settings only: setting it in `sandbox.network` has no effect; from the SDK, pass it through the `managedSettings` option.

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
- `SdkMcpToolDefinition` has no section on the official page; its entry here is only a pointer to `tool()` / `createSdkMcpServer()`.
- Reconciled against the official page on 2026-11-14 (SDK 0.3.325): the `/core` entry now exports `prewarm()` (v0.3.314+); these fields are in the page's earlier `sdk.d.ts` 0.3.223-based blocks but absent from the current official declarations, and are kept unverified (the twin never says they were removed): `title` / `displayName` / `description` / `matchedAskRule` (`CanUseTool` options), `decisionClassification` (`PermissionResult`), `timeout` / `alwaysLoad` / `tools` on the stdio / SSE / HTTP configs, `AccountInfo.apiProvider`, `Options.onUserDialog` / `supportedDialogKinds`, and the `ListSessionsOptions` fields `offset` / `includeProgrammatic`. `Options.permissionMode` no longer says a session can start in auto mode: the official page says it starts in `default` unless something else sets a mode. The `ModelUsage.provider` comment keeps the earlier `anthropicGoogleCloud` value, which the current page's prose (`firstParty`, `bedrock`, `vertex`, `foundry`, `anthropicAws`, `mantle`, `gateway`) omits.
- Source: https://code.claude.com/docs/en/agent-sdk/typescript (Markdown twin, fetched 2026-11-14, SDK 0.3.325).
- Not covered here (documented on the official page): the hook input types (`PreToolUseHookInput` etc.), `HookJSONOutput`, `SDKControlGetContextUsageResponse` field-by-field, `SDKContextUsage` / `SDKUsageReport` fields, the `SDKMessageOrigin` peer fields, and the remaining built-in tool input/output types (Edit, Write, Glob, Grep, `Cron*`, Workflow, `Task*`, etc.).
- Types added on 2026-10-16 (SdkMcpToolDefinition, GetSessionMessagesOptions, SessionMessage, ToolConfig, SdkPluginConfig, SdkBeta, SlashCommand, Usage, CallToolResult, ThinkingConfig, SpawnedProcess, SpawnOptions, McpSetServersResult, McpServerStatus, RewindFilesResult, SDKMessage, SDKUserMessage, SDKResultMessage, SDKSystemMessage, SDKHook*Message, SDKTaskProgressMessage, SandboxSettings, SandboxNetworkConfig, SandboxFilesystemConfig) were transcribed from the Markdown twin of https://code.claude.com/docs/en/agent-sdk/typescript (fetched 2026-10-16), distinguishing them from the earlier sources above.
- FastModeDisabledReason has no type declaration on the page (only the reason-code table under SDKResultMessage, summarized in the `SDKResultMessage` bullets above).
- SDKControlReadFileResponse, SDKControlReloadPluginsResponse, SDKControlReloadSkillsResponse, SDKControlReloadOutputStylesResponse and SDKControlMcpReadResourceResponse are listed by name only; their fields are not documented here.
- `ToolAnnotations` is re-exported from `@modelcontextprotocol/sdk/types.js`, not redeclared in this SDK; see the MCP SDK's own types for its shape (matches the Python SDK's `ToolAnnotations` fields documented in `./python.md`).
- `startup_failure_reason` on the `error_during_execution` result (Agent SDK v0.3.274+) names why Claude Code refused to start (`SDKStartupFailureReason`); the full value list and which failures carry a result without `CLAUDE_CODE_STARTUP_FAILURE_RESULTS=1` are in the `SDKResultMessage` bullets. `org_config_required_unavailable`: the organization's policies and managed settings are required before start and couldn't be loaded (e.g. network failure or Anthropic server error). `org_config_refused`: Anthropic refused to provide them for this sign-in (e.g. expired or revoked sign-in, or the organization doesn't allow Claude Code for this account).
- `outputStyle` is not an `Options` field; set it in the inline `settings` object or a settings file (or persist it with `Query.updateSettings('localSettings', ...)`).

## Related

- [Python SDK reference](./python.md)
- [Cost Tracking](../operations/cost-tracking.md)
- [Hosting the Agent SDK](../operations/hosting.md)
- [Troubleshooting](../operations/troubleshooting.md)
