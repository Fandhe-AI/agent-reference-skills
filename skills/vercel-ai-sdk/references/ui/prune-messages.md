---
source: https://ai-sdk.dev/docs/reference/ai-sdk-ui/prune-messages
---

# pruneMessages

Prunes or filters an array of `ModelMessage` objects: reduces context (saves tokens), removes intermediate reasoning, or trims tool calls and empty messages before sending to an LLM.

## Signature / Usage

```ts
import { pruneMessages } from 'ai';

const pruned = pruneMessages({
  messages,
  reasoning: 'all', // Remove all reasoning parts
  toolCalls: 'before-last-message', // Remove tool calls except those in the last message
});
```

Import: `import { pruneMessages } from "ai"`. Returns `ModelMessage[]`.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| messages | `ModelMessage[]` | — | An array of ModelMessage objects to prune. |
| reasoning | `'all' \| 'before-last-message' \| 'none'` | `"none"` | How to remove reasoning content from assistant messages. |
| toolCalls | `'all' \| 'before-last-message' \| \`before-last-${number}-messages\` \| 'none' \| Array<{ type: 'all' \| 'before-last-message' \| \`before-last-${number}-messages\`; tools?: string[] }>` | `[]` | How to prune tool call/results/approval content. A strategy string or an array for per-tool control. Empty array is equivalent to "none". |
| emptyMessages | `'keep' \| 'remove'` | `"remove"` | Whether to keep or remove messages whose content is empty after pruning. |

## Notes

- `reasoning`: `'all'` removes all reasoning parts, `'before-last-message'` keeps reasoning in the last message, `'none'` retains all.
- `toolCalls` prunes tool-call, tool-result, and tool-approval chunks from assistant/tool messages. `'before-last-N-messages'` prunes except in the last N messages. Per-tool example: `[{ type: 'before-last-message', tools: ['search', 'calculator'] }]` prunes only those tools.
- Typically used before sending a context window to an LLM, especially after a series of tool calls and approvals. Implementation: `packages/ai/src/generate-text/prune-messages.ts` in `vercel/ai`.

## Related

- [ModelMessage](../core/model-message.md)
- [convertToModelMessages](./convert-to-model-messages.md)
