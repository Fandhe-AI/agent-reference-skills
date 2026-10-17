---
source: https://ai-sdk.dev/cookbook/guides/custom-memory-tool
---

# Custom Memory Tool

Give a `ToolLoopAgent` a filesystem-backed `memory` tool (structured actions route) and inject core memory into the instructions before every model call with `prepareCall`.

```ts
import { tool } from 'ai';
import { z } from 'zod';

const memoryInputSchema = z.object({
  command: z
    .enum(['view', 'create', 'update', 'search'])
    .describe(
      'Memory action: view to read, create to write new content, update to change existing content, search to find relevant lines.',
    ),
  path: z
    .string()
    .optional()
    .describe(
      'Memory path under /memories, such as /memories/core.md or /memories/notes.md. Required for view, create, and update.',
    ),
  content: z
    .string()
    .optional()
    .describe('Text to write for create or update commands.'),
  mode: z
    .enum(['append', 'overwrite'])
    .optional()
    .describe(
      'Write mode for update: append adds to existing content, overwrite replaces it. Defaults to overwrite.',
    ),
  query: z
    .string()
    .optional()
    .describe(
      'Search keywords for the search command. Prefer short focused terms.',
    ),
});

const memoryTool = tool({
  description: `Use this tool to read and maintain long-term memory under /memories.

Rules:
- If the user prompt might depend on preferences, history, constraints, or goals, search first, then reply.
- If the prompt is fully self-contained or general knowledge, reply directly.
- Keep searches short and focused (1-4 words).
- Store durable user facts in /memories/core.md and detailed notes in /memories/notes.md.
- Keep memory operations invisible in user-facing replies.`,
  inputSchema: memoryInputSchema,
  execute: async input => {
    try {
      const output = await runMemoryCommand(input);
      return { output };
    } catch (error) {
      return { output: `Memory action failed: ${(error as Error).message}` };
    }
  },
});
```

```ts
import { ToolLoopAgent } from 'ai';

const today = new Date().toISOString().slice(0, 10);

const memoryAgent = new ToolLoopAgent({
  model: 'anthropic/claude-haiku-5.5',
  tools: { memory: memoryTool },
  prepareCall: async settings => {
    // user-defined function fetches the contents of /.memory/core.md on every turn
    const coreMemory = await readCoreMemory();
    return {
      ...settings,
      instructions: `Today's date is ${today}.

Core memory:
${coreMemory}

You can save and recall important information using the memory tool.`,
    };
  },
});

const prompt = 'Remember that my favorite editor is Neovim';

// Record the user message
await appendConversation({
  role: 'user',
  content: prompt,
  timestamp: new Date().toISOString(),
});

// Run the agent (loops automatically on tool calls)
const result = await memoryAgent.generate({ prompt });

// Record the assistant response
await appendConversation({
  role: 'assistant',
  content: result.text,
  timestamp: new Date().toISOString(),
});

console.log(result.text);
```

## Notes

- `runMemoryCommand`, `readCoreMemory` and `appendConversation` are user-defined; the official page's appendix implements them over a `.memory/` directory (`core.md` core memory, `notes.md` archival memory, `conversations.jsonl` recall memory). Add `.memory` to `.gitignore`.
- `prepareCall` runs once per `agent.generate` / `agent.stream` call, not on every step of the tool loop. A `core.md` update made by the model is reflected in the instructions from the next `generate` call; to pick it up mid-call, re-read it in `prepareStep`. Modified from the official page, which describes `prepareCall` as running on each loop iteration.
- The page also shows a bash-backed route (`just-bash` with an AST-based command allowlist guard); it is more flexible but needs careful command validation against prompt injection. The structured-actions route only runs the four predefined actions.
- This is an AI SDK `ToolLoopAgent` pattern. Agent-memory features of other SDKs belong to openai-agents, anthropic-agent-sdk or anthropic-managed-agents; Claude Code memory files belong to anthropic-claude-code.
