# Running an AI Coding Agent in a Box

Create an isolated Upstash Box, run a Claude Code agent task inside it, execute a shell command, and clean up.

```typescript
import { Box, Agent } from "@upstash/box";

const box = await Box.create({
  apiKey: process.env.UPSTASH_BOX_API_KEY!,
  baseUrl: process.env.UPSTASH_BOX_BASE_URL,
  runtime: "node",
  agent: {
    harness: Agent.ClaudeCode,
    model: "anthropic/claude-sonnet-5",
    apiKey: process.env.CLAUDE_KEY!,
  },
});

console.log(`Created box: ${box.id}`);

// Single-shot run — await the result
const run = await box.agent.run({
  prompt: "List all files in the current directory and describe what you see",
});
const output = run.result;
const cost = run.cost;
console.log(output);
console.log(`Tokens: ${cost.inputTokens + cost.outputTokens}`);

// Shell command
console.log("\n\n=== Shell ===");
const shell = await box.exec.command("ls -la");
const shellOutput = shell.result;
console.log(shellOutput);

// Status
const status = await box.getStatus();
console.log(`Status: ${status.status}`);

await box.delete();
console.log("Box deleted.");
```

```env
UPSTASH_BOX_API_KEY=abx_...
CLAUDE_KEY=sk-ant-...
```

## Notes

- `Box.create()` provisions an isolated container with its own filesystem, shell, and network stack; passing `agent` attaches a coding-agent harness (`Agent.ClaudeCode`, `Agent.Codex`, or `Agent.OpenCode`) to the box
- `box.agent.run()` awaits a single completion and returns `{ result, cost, ... }`; use `box.agent.stream()` instead to consume incremental output chunks
- `box.exec.command()` runs a raw shell command inside the box and returns `{ result, exitCode }`
- Always call `box.delete()` when done—idle boxes pause automatically but are not deleted, so unused boxes keep accruing storage until explicitly removed
