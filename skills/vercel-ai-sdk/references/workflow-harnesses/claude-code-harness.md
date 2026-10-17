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
| maxTurns | number | Maximum internal turns before yielding. |
| agentProgressSummaries | boolean | Periodic AI-generated summaries for running sub-agents, available on raw `task_progress` stream parts. |
| forwardSubagentText | boolean | Forwards sub-agent text and thinking messages as raw stream parts, in addition to tool activity forwarded by default. |
| env | record | Environment variables for the Claude Code process; merged over the bridge process environment and take precedence. |
| thinking | `{ type: 'enabled' \| 'disabled' \| 'adaptive'; display?: 'summarized' \| 'omitted' }` | Extended thinking. Defaults to `{ type: 'adaptive', display: 'summarized' }`. |
| port | number | Bridge port override. |
| startupTimeoutMs | number | Maximum time to wait for the bridge to start. |
| reconnect | `{ maxElapsedMs, initialDelayMs, maxDelayMs }` | Reconnect timing after an established bridge WebSocket drops. Defaults: `maxElapsedMs` 30 seconds, `initialDelayMs` 50 ms, `maxDelayMs` 2 seconds; exponential backoff, separate from `startupTimeoutMs`. |
| mintBridgeToken | (sandboxId) => string | Synchronous; returns the bridge authentication token. Default: random 32-byte token. Custom implementations must return a suitably secret token. |

Supported credential environment variables: `VERCEL_OIDC_TOKEN`, `AI_GATEWAY_API_KEY`, `AI_GATEWAY_BASE_URL`, `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_BASE_URL`.

## Notes

- Stability: harness packages are experimental.
- Setup bootstraps the Claude Code bridge dependencies inside the sandbox when the first session starts. `VERCEL_OIDC_TOKEN` is needed for Vercel Sandbox plus one Claude Code credential variable.
- Auth modes: `auto` (default) uses AI Gateway credentials when available, then direct Anthropic credentials; `direct` uses Anthropic credentials; `ai-gateway` uses AI Gateway credentials. When the sandbox supports additive request transformations, the bridge receives placeholders and the adapter injects credentials into matching outbound requests; otherwise direct credential forwarding. With no applicable env var, the adapter tries a native subscription from the host unless AI Gateway auth is selected. A supplied auth record replaces the host environment for authentication discovery; only recognized variables are forwarded.
- Structured output: schema-backed; the JSON Schema is passed through the Agent SDK's native `outputFormat` option and `structured_output` is returned as JSON text.
- Requires a network sandbox with at least one exposed port (e.g. `@ai-sdk/sandbox-vercel`).
- Built-ins in `agent.tools`: `read`, `write`, `edit`, `bash`, `glob`, `grep`, `webSearch`, plus other Claude Code built-ins that do not fit a common shape. Built-in tool approval requests are supported when `permissionMode` is `allow-reads` or `allow-edits`.
- Distance: this page is the AI SDK adapter that drives Claude Code, not Claude Code's own settings, CLI, or hooks (see anthropic-claude-code, anthropic-claude-code-extend, anthropic-claude-code-admin) and not the Claude Agent SDK itself (see anthropic-agent-sdk).

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness tools](./harness-tools.md)
- [Harness adapters](./harness-adapters.md)
