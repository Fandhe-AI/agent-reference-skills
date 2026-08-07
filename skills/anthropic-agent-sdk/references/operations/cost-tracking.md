<!-- source: https://code.claude.com/docs/en/agent-sdk/cost-tracking / last verified: 2026-08-07 -->

# Track cost and usage

Learn how to track token usage, estimate costs, and configure prompt caching with the Claude Agent SDK.

The Claude Agent SDK provides detailed token usage information for each interaction with Claude. This guide explains how to track usage and understand cost reporting, especially with parallel tool uses and multi-step conversations. For complete API documentation, see `../api-reference/typescript.md` and `../api-reference/python.md`.

`total_cost_usd`/`costUSD` fields are client-side estimates, not authoritative billing data. The SDK computes them locally from a price table bundled at build time, so they can drift from actual billing when pricing changes, the installed SDK doesn't recognize a model, or billing rules apply the client cannot model. Use these fields for development insight and approximate budgeting only; for authoritative billing use the Usage and Cost API or the Claude Console Usage page. Do not bill end users or trigger financial decisions from these fields.

## Understand token usage

TypeScript and Python expose the same usage data with different field names:

- **TypeScript**: per-step token breakdowns on each assistant message (`message.message.id`, `message.message.usage`), per-model cost via `modelUsage` on the result message, and a cumulative total on the result message.
- **Python**: per-step token breakdowns on each assistant message (`message.usage`, `message.message_id`), per-model cost via `model_usage` on the result message, and the accumulated total (`total_cost_usd` and `usage` dict) on the result message.

Scoping concepts:

- **`query()` call**: one invocation of `query()`. Can involve multiple steps (Claude responds, uses tools, gets results, responds again). Produces one result message at the end.
- **Step**: a single request/response cycle within a `query()` call, producing assistant messages with token usage.
- **Session**: a series of `query()` calls linked by a session ID via `resume`. Each `query()` call within a session reports its own cost independently.

Each step's assistant messages share the same message ID when Claude uses multiple tools in one turn; deduplicate by ID before summing tokens. The result message provides the cumulative estimate (`total_cost_usd`) when the `query()` call completes — use this alone if per-step detail isn't needed.

## Get the total cost of a query

The result message (`SDKResultMessage` in TypeScript, `ResultMessage` in Python — see `../api-reference/typescript.md`, `../api-reference/python.md`) marks the end of the agent loop for a `query()` call and includes `total_cost_usd`, the cumulative estimated cost across all steps in that call, for both success and error results. Multiple `query()` calls in a session each report only their own cost.

Three result-level fields differ in what they count when the agent spawns subagents. Use `modelUsage`/`model_usage` for whole-tree token accounting; `usage` undercounts as soon as nesting occurs.

| Field | Subagent activity |
|---|---|
| `usage` | Excluded — counts only the top-level agent loop |
| `total_cost_usd` | Included — counts subagent requests alongside the top-level loop |
| `modelUsage` / `model_usage` | Included, broken down by model |

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

try {
  for await (const message of query({ prompt: "Summarize this project" })) {
    if (message.type === "result") {
      console.log(`Total cost: $${message.total_cost_usd}`);
    }
  }
} catch (error) {
  console.error(`Session ended with an error: ${error}`);
}
```

```python
from claude_agent_sdk import query, ResultMessage
import asyncio

async def main():
    try:
        async for message in query(prompt="Summarize this project"):
            if isinstance(message, ResultMessage):
                print(f"Total cost: ${message.total_cost_usd or 0}")
    except Exception as error:
        print(f"Session ended with an error: {error}")

asyncio.run(main())
```

A single-shot `query()` throws/raises after yielding an error result; connection or process failures yield no result message.

## Track per-step and per-model usage

### Track per-step usage

Each assistant message's nested `BetaMessage` (`message.message` in TypeScript) has an `id` and `usage` object. Parallel tool calls produce multiple assistant messages sharing the same `id` and identical `usage` — always deduplicate by ID to avoid inflated totals.

```typescript
import { query } from "@anthropic-ai/claude-agent-sdk";

const seenIds = new Set<string>();
let totalInputTokens = 0;
let totalOutputTokens = 0;

for await (const message of query({ prompt: "Summarize this project" })) {
  if (message.type === "assistant") {
    const msgId = message.message.id;
    if (!seenIds.has(msgId)) {
      seenIds.add(msgId);
      totalInputTokens += message.message.usage.input_tokens;
      totalOutputTokens += message.message.usage.output_tokens;
    }
  }
}
```

Python equivalents: `AssistantMessage.usage` and `AssistantMessage.message_id`.

### Break down usage per model

The result message includes `modelUsage` (TypeScript) / `model_usage` (Python), a map of model name to per-model token counts and cost — useful when running multiple models (e.g. Haiku for subagents, Opus for the main agent).

```typescript
for await (const message of query({ prompt: "Summarize this project" })) {
  if (message.type !== "result") continue;
  for (const [modelName, usage] of Object.entries(message.modelUsage)) {
    console.log(`${modelName}: $${usage.costUSD.toFixed(4)}`);
    console.log(`  Input tokens: ${usage.inputTokens}`);
    console.log(`  Output tokens: ${usage.outputTokens}`);
    console.log(`  Cache read: ${usage.cacheReadInputTokens}`);
    console.log(`  Cache creation: ${usage.cacheCreationInputTokens}`);
  }
}
```

## Accumulate costs across multiple calls

Each `query()` call returns its own `total_cost_usd`; the SDK provides no session-level total, so accumulate it yourself across multiple calls (e.g. a multi-turn session or across users):

```typescript
let totalSpend = 0;
const prompts = [
  "Read the files in src/ and summarize the architecture",
  "List all exported functions in src/auth.ts",
];

for (const prompt of prompts) {
  try {
    for await (const message of query({ prompt })) {
      if (message.type === "result") {
        totalSpend += message.total_cost_usd;
      }
    }
  } catch (error) {
    console.error(`Call failed: ${error}`);
  }
}
console.log(`Total spend: $${totalSpend.toFixed(4)}`);
```

## Handle errors, caching, and token discrepancies

### Resolve output token discrepancies

Messages with the same ID may occasionally report different `output_tokens`. Use the highest value (the final message in a group is typically accurate); prefer the result message's `total_cost_usd` over summing per-step values yourself; report persistent inconsistencies at the Claude Code GitHub repository.

### Track costs on failed conversations

Both success and error result messages include `usage` and `total_cost_usd`. A failed conversation still consumed tokens up to the point of failure — always read cost data from the result message regardless of `subtype`.

### Track cache tokens

The Agent SDK automatically uses prompt caching to reduce costs on repeated content; no configuration is needed. The usage object includes:

- `cache_creation_input_tokens`: tokens used to create new cache entries (charged at a higher rate than standard input tokens).
- `cache_read_input_tokens`: tokens read from existing cache entries (charged at a reduced rate).

Track these separately from `input_tokens` to understand caching savings. In TypeScript these are typed on the `Usage` object; in Python they appear as keys in `ResultMessage.usage` (e.g. `message.usage.get("cache_read_input_tokens", 0)`).

### Extend the prompt cache TTL to one hour

Cache entries written by the SDK use a 5-minute TTL by default when authenticating with an API key or running on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry. If your workload runs many short sessions against the same system prompt/context with gaps longer than 5 minutes, the cache expires between sessions and each new session pays full input price.

Set the `ENABLE_PROMPT_CACHING_1H` environment variable to request a 1-hour TTL on cache writes:

```python
from claude_agent_sdk import ClaudeAgentOptions, query
import asyncio

async def main():
    options = ClaudeAgentOptions(
        env={
            "CLAUDE_CODE_USE_BEDROCK": "1",
            "ENABLE_PROMPT_CACHING_1H": "1",
        },
    )
    async for message in query(prompt="Summarize this project", options=options):
        print(message)

asyncio.run(main())
```

1-hour TTL cache writes are billed at a higher rate than 5-minute writes — enabling this trades higher write cost for more cache reads. Claude subscription users already receive 1-hour TTL automatically and do not need to set this variable.

## Notes

- `total_cost_usd` / `costUSD` are estimates only — see the warning at the top of this page before using them for billing.

## Related

- [Observability](./observability.md)
