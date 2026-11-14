---
source: https://ai-sdk.dev/providers/ai-sdk-harnesses/claude-code
---

# Claude Code Harness

The Claude Code harness adapter connects `HarnessAgent` to Claude Code through `@anthropic-ai/claude-agent-sdk`. It runs a bridge inside the sandbox and streams Claude Code events back to the host over a sandbox-exposed WebSocket.

## Signature / Usage

```bash
npm i @ai-sdk/harness @ai-sdk/harness-claude-code @ai-sdk/sandbox-vercel
```

```ts
import { claudeCode, createClaudeCode } from '@ai-sdk/harness-claude-code';
```

`claudeCode` is equivalent to `createClaudeCode()` with default configuration.

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { claudeCode } from '@ai-sdk/harness-claude-code';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';

const agent = new HarnessAgent({
  harness: claudeCode,
  model: 'claude-sonnet-4-6',
});

const sandboxSession = await createVercelNetworkSandboxSession({
  runtime: 'node24',
  ports: [4000],
  template: await agent.getSandboxTemplate(),
});
const session = await agent.createSession({ sandboxSession });

try {
  const result = await agent.stream({
    session,
    prompt: 'Check the test failures and fix the production code.',
  });

  for await (const part of result.stream) {
    if (part.type === 'text-delta') {
      process.stdout.write(part.text);
    }
  }
} finally {
  await session.destroy();
  await sandboxSession.destroy();
}
```

## Options / Props

`createClaudeCode()` settings:

| Name | Type | Description |
| --- | --- | --- |
| auth | `'auto' \| 'direct' \| 'ai-gateway'` or env record | Authentication mode or an isolated authentication environment. |
| credentialForwarding | sync or async callback | Customizes each credential immediately before it is forwarded into a sandbox process; receives the credential value (real or masked) and the env var name. Does not restrict which credentials the adapter can discover or read in the host process. |
| mcpServers | record | MCP server definitions keyed by server name. |
| strictMcpConfig | boolean | Only use the servers from `mcpServers` and ignore other MCP configuration, such as a project `.mcp.json` or user settings. |
| autoMode | boolean | Requests Claude Code's classifier-based `auto` permission mode for `allow-reads` and `allow-edits`. Defaults to `false`. `allow-all` still uses `bypassPermissions`. See Auto Permission Mode below. |
| toolHints | record by tool name | Claude Code hints for host tools, keyed by tool name. `readOnly: true` marks a tool without side effects, so Claude Code can run its calls in parallel and allows it in plan mode; calls to other host tools run one at a time. `alwaysLoad: true` sends the tool's definition from the first request when Claude Code's tool search is on, instead of deferring it until the model looks it up. |
| maxTurns | number | Maximum internal turns before yielding. |
| skillOverrides | record | Per-skill visibility overrides. Values can be `on`, `name-only`, `user-invocable-only`, or `off`. |
| maxBudgetUsd | number | Maximum estimated spend in USD for each Claude query. When it is exceeded, the query stops and the turn ends with an error. |
| questionTimeoutMs | number | Maximum time in milliseconds Claude waits for an answer to an `AskUserQuestion` question before the question fails. Defaults to the Claude Code default. |
| excludeDynamicSections | boolean | Moves per-session sections (working directory, memory, git status) out of the Claude Code system prompt into the first user message, so the system prompt can be cached across sessions. |
| agentProgressSummaries | boolean | Periodic AI-generated summaries for running sub-agents, available on raw `task_progress` stream parts. |
| forwardSubagentText | boolean | Forwards sub-agent text and thinking messages as raw stream parts, in addition to tool activity forwarded by default. |
| env | record | Environment variables for the Claude Code process; merged over the bridge process environment and take precedence. |
| thinking | `{ type: 'enabled' \| 'disabled' \| 'adaptive'; display?: 'summarized' \| 'omitted' }` | Extended thinking. Defaults to `{ type: 'adaptive', display: 'summarized' }`. |
| port | number | Bridge port override. |
| startupTimeoutMs | number | Maximum time to wait for the bridge to start. |
| turnStartTimeoutMs | number | Maximum time from submitting a turn's start to its first bridge event, defaulting to 120 seconds. If no event arrives, the turn fails and the connection closes. This is not a timeout on the complete turn. |
| hostDisconnectTimeoutMs | number | Aborts a running turn when the host disconnects and no host reconnects within this many milliseconds. A suspended turn is not aborted. When unset, a turn keeps running in the sandbox after its host disconnects, including when the host process is gone for good, until the turn finishes or the sandbox stops. |
| reconnect | `{ maxElapsedMs, initialDelayMs, maxDelayMs }` | Reconnect timing after an established bridge WebSocket drops. Defaults: `maxElapsedMs` 30 seconds, `initialDelayMs` 50 ms, `maxDelayMs` 2 seconds; exponential backoff, separate from `startupTimeoutMs`. Pending turn starts are retried with the same identifier when the bridge supports idempotent starts, so a dropped frame does not leave the turn waiting forever or launch the agent twice. An older bridge that is still waiting for a lost start causes the turn to fail instead of retrying unsafely. A turn submitted while disconnected queues its start for first delivery on reconnection; this first delivery also works with older bridges. |
| onDebug | callback | Callback for bridge connection lifecycle events: `reconnect-attempt`, `reconnected`, and `reconnect-failed`. `reconnect-failed` means the connection is closed for good, so a host that caches idle sessions can detach and reattach before sending the next prompt. The `cause` of a failed reconnect can contain connection details, so avoid logging it as is. |
| mintBridgeToken | (sandboxId) => string | Deprecated and ignored. Passing it logs a warning. The adapter generates a key pair for each bridge, passes only the public key into the sandbox, and keeps the private key in host-side resume state. |

Supported credential environment variables: `VERCEL_OIDC_TOKEN`, `AI_GATEWAY_API_KEY`, `AI_GATEWAY_BASE_URL`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_BASE_URL`.

## Notes

- Stability: harness packages are experimental.
- Setup bootstraps the Claude Code bridge dependencies inside the sandbox when the first session starts. `VERCEL_OIDC_TOKEN` is needed for Vercel Sandbox plus one Claude Code credential variable.
- Auth modes: `auto` (default) uses AI Gateway credentials when available, then direct Anthropic credentials; `direct` uses Anthropic credentials; `ai-gateway` uses AI Gateway credentials. When the sandbox supports additive request transformations, the bridge receives placeholders and the adapter injects credentials into matching outbound requests; otherwise direct credential forwarding. With no applicable env var, the adapter tries a native subscription from the host unless AI Gateway auth is selected. A supplied auth record replaces the host environment for authentication discovery; only recognized variables are forwarded.
- Structured output: schema-backed; the JSON Schema is passed through the Agent SDK's native `outputFormat` option and `structured_output` is returned as JSON text.
- Requires a network sandbox with at least one exposed port (e.g. `@ai-sdk/sandbox-vercel`).
- Built-ins in `agent.tools`: `read`, `write`, `edit`, `bash`, `glob`, `grep`, `webSearch`, plus other Claude Code built-ins that do not fit a common shape. Built-in tool approval requests are supported when `permissionMode` is `allow-reads` or `allow-edits`. With the default `autoMode: false`, a call waiting for approval is kept in the Claude Code session, so an approval answered after a resume runs that same call, even in a new sandbox. Claude Code waits for one approval at a time, so parallel calls that need approval run one after another.
- With `autoMode: false`, file reads in these modes are automatically approved only within the session workdir or an active skill's directory. `allow-edits` automatically approves file changes only within the workdir. Paths outside those directories, including symlink targets, and paths that cannot be resolved require host approval. `allow-all` remains unrestricted. These approval rules are not a filesystem sandbox, and approved shell commands can access paths outside the workdir.
- Source: https://ai-sdk.dev/providers/ai-sdk-harnesses/claude-code (ai@7.0.173)
- Distance: this page is the AI SDK adapter that drives Claude Code, not Claude Code's own settings, CLI, or hooks (see anthropic-claude-code, anthropic-claude-code-extend, anthropic-claude-code-admin) and not the Claude Agent SDK itself (see anthropic-agent-sdk).

### Skill Overrides

Use `skillOverrides` to control how named skills are exposed to Claude Code
without changing shared user-level configuration. Values can be `'on'`,
`'name-only'`, `'user-invocable-only'`, or `'off'`:

```ts
const harness = createClaudeCode({
  skillOverrides: {
    'update-config': 'off',
    'fewer-permission-prompts': 'off',
    'keybindings-help': 'off',
    init: 'off',
  },
});
```

Skills without an override keep their Claude Code defaults, so other bundled
skills such as `code-review`, `simplify`, and `claude-api` remain available
when provided by the installed Claude Code runtime.

### Auto Permission Mode

Opt in to Claude Code's own permission classifier with an adapter setting:

```ts
const agent = new HarnessAgent({
  harness: createClaudeCode({ autoMode: true }),
  permissionMode: 'allow-reads', // or 'allow-edits'
});
```

With `autoMode: true`, both `allow-reads` and `allow-edits` request Claude Code's
`auto` mode instead of their usual deterministic edit, shell, and path approval
rules. The adapter removes its blanket edit/shell ask rules and does not defer
calls before classification, except writes to
write-protected paths (see Write-Protected Paths below), which still require host
approval. Claude Code approves or denies other calls itself;
every non-host tool call it escalates through `canUseTool` becomes a
`tool-approval-request`, including reads that would normally be auto-approved.
Answer these requests using the normal approval-response messages on the same
session. Inactive built-in tool restrictions remain in place. Explicit Claude
Code permission rules can still affect permission handling.

Host-executed tools bypass the classifier through the adapter's
`mcp__harness-tools__*` allowance. Their authorization is still controlled by
`HarnessAgent`'s `toolApproval`. Other MCP servers do not receive this allowance.
The built-in question tool retains its usual host question/answer handling.

The setting defaults to `false` and has no effect with `allow-all` (including
when `permissionMode` is omitted). Auto mode depends on Claude Code's
provider/model eligibility; requesting it does not guarantee that it is active
or that an unavailable mode falls back in a particular way. Observe the actual
mode on raw stream parts:

```ts
for await (const part of result.stream) {
  if (part.type === 'raw') {
    const raw = part.rawValue as {
      type?: string;
      subtype?: string;
      permissionMode?: string;
    };
    if (
      raw.type === 'system' &&
      (raw.subtype === 'init' || raw.subtype === 'status')
    ) {
      console.log('Effective Claude Code permission mode:', raw.permissionMode);
    }
  }
}
```

The adapter forwards only `{ type, subtype, permissionMode }` from `init` and
`status` messages, not the full session metadata. `permissionMode` is omitted
when Claude Code does not report it on a message. These raw parts are
available even when `autoMode` is disabled.

**Note:** Auto-mode escalations wait in the running bridge process, unlike the default deferred built-in approvals stored in Claude Code's transcript. Reconnecting to that same running bridge can answer a pending escalation, but a bridge restart, sandbox replacement, or turn cancellation does not preserve it as a deferred call. Keep the bridge running while waiting for a decision. Classifier decisions are not a security or filesystem sandbox boundary; opt in only if they fit your application's permission policy.

#### Write-Protected Paths

Under `allow-edits`, `Write`, `Edit`, and `NotebookEdit` calls that touch
`.agents/skills`, `.claude`, or `.mcp.json` in the session workdir always
require host approval, including with `autoMode: true`. These paths hold
configuration and skills that can run code or change the agent's behavior in
later sessions. A path matches when it is a protected path, lies inside one, or
is a parent of one. Symlinks are resolved in both directions: writes through an
alias that points into a protected path match, as do writes to targets of
symlinks inside protected directories. While a protected path exists, writes to
hard-linked files also require approval. Reads of protected paths follow the
usual rules, and `allow-all` is unaffected.

### Known Limitations

Claude Code does not allow toggling whether to discover project-level skills
and `AGENTS.md` files individually from project-level configuration and hooks.
Since the adapter disables reading project-level configuration and hooks for
security reasons, it means Claude Code will not discover project-level skills
and `AGENTS.md` instructions natively.

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness tools](./harness-tools.md)
- [Harness adapters](./harness-adapters.md)
