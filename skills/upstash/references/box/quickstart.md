# Quickstart

Upstash Box gives AI agents a computer: a secure, isolated cloud container with an AI Agent built-in, with full filesystem, shell, git, and runtime access.

## Signature / Usage

```bash
npm install @upstash/box
# or: yarn add / pnpm add / bun install @upstash/box
pip install upstash-box
```

```bash
# .env
UPSTASH_BOX_API_KEY=box_xxxxxxxxxxxxxxxxxxxxxxxx
```

```typescript
import { Agent, Box } from "@upstash/box"

const box = await Box.create({
  runtime: "node",
  agent: {
    harness: Agent.ClaudeCode,
    model: "anthropic/claude-opus-4-6",
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
})

// execute OS-level commands
await box.exec.command("node --version")

// run agent
await box.agent.run({
  prompt: "create an index.txt saying 'hello world'",
})
```

```python
import os
from upstash_box import Box, Agent

box = Box.create(
    runtime="node",
    agent={
        "harness": Agent.CLAUDE_CODE,
        "model": "anthropic/claude-opus-4-6",
        "api_key": os.environ["ANTHROPIC_API_KEY"],
    },
)

box.exec.command("node --version")
box.agent.run(prompt="create an index.txt saying 'hello world'")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `runtime` | `string` | Runtime image, e.g. `"node"`, `"python"`. Debian (glibc) by default; append `-alpine` (e.g. `"node-alpine"`) for smaller Alpine images |
| `agent.harness` | `Agent.ClaudeCode \| Agent.Codex \| Agent.OpenCode` | Built-in agent harness |
| `agent.model` | `string` | Provider-prefixed model id, e.g. `"anthropic/claude-opus-4-6"` |
| `agent.apiKey` | `string` | API key for the agent's provider |
| `keepAlive` | `boolean` | Keeps the box on between sessions and can run an `initCommand` at startup |

## Notes

- Python SDK ships both a synchronous `Box` and an asynchronous `AsyncBox` (`await AsyncBox.create(...)`)
- A box is usable standalone (shell/git/filesystem) even without configuring an `agent`
- Direct SSH shell access is available: `ssh <box-id>@us-east-1.box.upstash.com`, using the Box API key as the SSH password
- Core use cases: agent servers (one box per user with durable state), multi-agent orchestration (fan out to parallel boxes), parallel testing/model comparison

## Related

- [Agent](./agent.md)
- [Filesystem](./filesystem.md)
- [Git](./git.md)
- [Snapshots](./snapshots.md)
