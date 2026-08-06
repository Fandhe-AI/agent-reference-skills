# Codex SDK

Programmatic control of local Codex threads from TypeScript or Python, for CI/CD pipelines, custom agents, or embedding Codex in internal tools and applications.

## Signature / Usage

```python
from openai_codex import Codex, Sandbox

with Codex() as codex:
    thread = codex.thread_start(
        model="gpt-5.6-terra",
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
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `npm install @openai/codex-sdk` | package | TypeScript library; server-side use only, requires Node.js 18+. |
| `pip install openai-codex` | package | Python library controlling the local Codex app-server over JSON-RPC; requires Python 3.10+. While in beta, plain `pip install openai-codex` gets the latest beta build. |
| `codex.startThread()` / `codex.resumeThread(threadId)` | TS methods | Start a new thread or resume a past one by ID. |
| `thread.run(prompt)` | TS/Python method | Runs a prompt on a thread; call again to continue the same thread. |
| `Sandbox.read_only` / `.workspace_write` / `.full_access` | Python enum (presets) | Filesystem access for `thread_start(sandbox=...)` or a later `run(...)`/`turn(...)` call; a sandbox passed to `run`/`turn` applies to that turn and later turns on the thread. |
| `AsyncCodex` | Python class | Async variant of `Codex` for applications already running asyncio. |
| `CodexConfig(codex_bin=...)` | Python config | Runs against a specific local Codex executable instead of the SDK's pinned runtime dependency (only needed intentionally). |

## Notes

- Use the Codex SDK for coding-focused Codex threads. If Codex is one specialist inside a broader orchestrated workflow, run Codex CLI as an MCP server and orchestrate it with the Agents SDK instead (see `agents-sdk-mcp-server.md`).
- Omitting `sandbox=` lets app-server use its configured default.
- A separate Codex Security TypeScript SDK exists for repository/change scans with structured security findings — not the same product as this coding-agent SDK.

## Related

- [Use Codex with the Agents SDK](./agents-sdk-mcp-server.md)
- [Non-interactive mode](./non-interactive-mode.md)
