---
source: https://ai-sdk.dev/providers/ai-sdk-harnesses/codex
---

# Codex Harness

The Codex harness adapter connects `HarnessAgent` to the Codex app-server. It runs a bridge inside the sandbox and streams Codex thread events back to the host over a sandbox-exposed WebSocket.

## Signature / Usage

```bash
npm i @ai-sdk/harness @ai-sdk/harness-codex @ai-sdk/sandbox-vercel
```

```ts
import { codex, createCodex } from '@ai-sdk/harness-codex';
```

`codex` is equivalent to `createCodex()` with default configuration.

```ts
import { HarnessAgent } from '@ai-sdk/harness/agent';
import { codex } from '@ai-sdk/harness-codex';
import { createVercelNetworkSandboxSession } from '@ai-sdk/sandbox-vercel';

const agent = new HarnessAgent({
  harness: codex,
  model: 'gpt-5.6-luna',
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

`createCodex()` settings:

| Name | Type | Description |
| --- | --- | --- |
| auth | `'auto' \| 'direct' \| 'ai-gateway'` or env record | Authentication mode or an isolated authentication environment. |
| credentialForwarding | sync or async callback | Customizes each credential immediately before forwarding into a sandbox process; does not restrict which credentials the adapter can discover or read in the host process. |
| codexConfig | record | Additional native Codex configuration passed through as provided; use the snake_case keys from Codex's `config.toml` reference. Adapter-managed values take precedence over conflicting entries. |
| mcpServers | record | MCP server definitions keyed by server name. |
| reasoningEffort | `'low' \| 'medium' \| 'high' \| 'xhigh' \| 'max'` | Reasoning effort. |
| webSearch | boolean | Allow live web search. |
| port | number | Bridge port override. |
| startupTimeoutMs | number | Maximum time to wait for the bridge to start. |
| reconnect | `{ maxElapsedMs, initialDelayMs, maxDelayMs }` | Reconnect timing after the bridge WebSocket drops. Defaults: 30 seconds / 50 ms / 2 seconds; exponential backoff, separate from `startupTimeoutMs`. |
| mintBridgeToken | (sandboxId) => string | Synchronous; returns the bridge authentication token. Default: random 32-byte token. |

Supported credential environment variables: `VERCEL_OIDC_TOKEN`, `AI_GATEWAY_API_KEY`, `AI_GATEWAY_BASE_URL`, `OPENAI_API_KEY`, `CODEX_API_KEY`, `OPENAI_BASE_URL`, `OPENAI_ORGANIZATION`, `OPENAI_PROJECT`.

## Notes

- Stability: harness packages are experimental.
- Auth: `auto` (default) uses AI Gateway credentials when available, then direct OpenAI credentials; `direct` uses OpenAI credentials; `ai-gateway` uses AI Gateway credentials. For OpenAI-compatible endpoints select `direct` and set `OPENAI_BASE_URL`. Without applicable env vars the adapter tries a native subscription from the host unless AI Gateway auth is selected.
- Built-in tool filtering: `activeTools` / `inactiveTools` supported for `bash`, `webSearch`, `apply_patch`, `view_image`. When `bash`, `apply_patch`, and `view_image` are all inactive, Codex environments are disabled; when only `apply_patch` is inactive (with `bash` or `view_image` active), a Codex `PreToolUse` hook denies patch execution and the adapter fails the turn if Codex did not load and trust the hook. Including `webSearch` in `activeTools` does not enable it; set `webSearch: true` on `createCodex()`. (The adapter-capabilities table on the Harness Adapters page lists built-in tool filtering as unsupported for Codex; the page text above describes the filtering behavior as written.)
- Structured output: schema-backed; the JSON Schema is passed via the app-server's `turn/start` `outputSchema` parameter.
- Requires a network sandbox with at least one exposed port.
- Built-ins in `agent.tools`: `bash` and `webSearch` (common names), `apply_patch` (freeform patch string), `view_image` (local image `path`, optional `detail` and `environment_id`). Some file mutations appear as dynamic `fileChange` tool parts.
- Known limitations: no built-in tool approval requests; use `permissionMode: 'allow-all'` (host-executed AI SDK tool approvals still work). When the app-server must cold-resume a thread, Codex provides no raw events for `apply_patch` and `view_image`, so those calls cannot be surfaced for that resumed thread.
- Distance: this is the AI SDK adapter around Codex, not the Codex CLI / config.toml / AGENTS.md reference (see openai-codex) nor the OpenAI API itself (see openai-api-core, openai-agents).

## Related

- [HarnessAgent](./harness-agent.md)
- [Harness tools](./harness-tools.md)
- [Harness adapters](./harness-adapters.md)
