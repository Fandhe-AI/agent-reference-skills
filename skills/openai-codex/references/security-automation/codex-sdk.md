# Codex SDK

Programmatic control of local Codex threads from TypeScript or Python, for CI/CD pipelines, custom agents, embedding Codex in internal tools and workflows, or integrating Codex within your own application.

## Signature / Usage

```python
from openai_codex import Codex, Sandbox

with Codex() as codex:
    thread = codex.thread_start(
        model="gpt-6.1-sol",
        sandbox=Sandbox.workspace_write,
    )
    result = thread.run("Make a plan to diagnose and fix the CI failures")
    print(result.final_response)
```

```ts
import { Codex } from "@openai/codex-sdk";

const codex = new Codex();
const thread = codex.startThread();
const result = await thread.run(
  "Make a plan to diagnose and fix the CI failures"
);

console.log(result.finalResponse);

// running the same thread
const result1 = await thread.run("Implement the plan");

// resuming a past thread
const threadId = "<thread-id>";
const thread2 = codex.resumeThread(threadId);
const result2 = await thread2.run("Pick up where you left off");
```

```ts
// Configuration overrides
const codex = new Codex({
  config: { default_permissions: "audit" },
  configOverrides: [
    'permissions.audit.filesystem={":root"="read","/path/to/project/.env"="deny"}',
  ],
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `npm install @openai/codex-sdk` | package | TypeScript library; server-side use only, requires Node.js 18 or later. |
| `pip install openai-codex` | package | Python library controlling the local Codex app-server over JSON-RPC; requires Python 3.10 or later. Stable release; `pip install --pre openai-codex` opts in to newer prerelease builds. |
| `codex.startThread()` / `codex.resumeThread(threadId)` | TS methods | Start a new thread or resume a past one by ID. |
| `thread.run(prompt)` | TS/Python method | Runs a prompt on a thread; call again to continue the same thread. |
| `config` / `configOverrides` | TS constructor options | `config` sets structured Codex configuration; `configOverrides` passes raw TOML strings as separate `--config` arguments for keys that can't be expressed as dotted paths. |
| `Sandbox.read_only` / `.workspace_write` / `.full_access` | Python enum (presets) | Read files without writes / read plus write inside the workspace and configured writable roots / no filesystem restrictions. For `thread_start(sandbox=...)` or a later `run(...)`/`turn(...)` call; a sandbox passed to `run`/`turn` applies to that turn and later turns on the thread. |
| `AsyncCodex` | Python class | Async variant of `Codex` (`async with AsyncCodex() as codex`) for applications already running asyncio. |
| `CodexConfig(codex_bin=...)` | Python config | Runs against a specific local Codex executable instead of the SDK's pinned runtime dependency (only needed intentionally). |

## Notes

- Use the SDK to automate coding tasks, including jobs in CI. Use the Codex app server to build custom clients that handle authentication, conversation history, approvals, and streamed agent events (see app-server.md).
- The `codex mcp-server` command and standalone `codex-mcp-server` binary have been removed; use the Codex app server for existing integrations (see agents-sdk-mcp-server.md for the migration page).
- The Python example uses GPT-6.1 Sol, which must be available to your signed-in account; otherwise omit `model` to use your configured default.
- Omitting `sandbox=` lets app-server use its configured default. Published SDK builds include a pinned Codex CLI runtime dependency and use it automatically.
- TypeScript raw `configOverrides` take precedence over structured `config`; the SDK applies managed settings such as `baseUrl` and thread-specific options afterward, so they take precedence over both. These overrides don't change your Codex configuration files.
- A separate Codex Security TypeScript SDK (beta access) exists for repository/change scans with structured security findings and coverage — not the same product as this coding-agent SDK.

## Related

- [Codex app server](./app-server.md)
- [Codex MCP server removal](./agents-sdk-mcp-server.md)
- [Non-interactive mode](./non-interactive-mode.md)
