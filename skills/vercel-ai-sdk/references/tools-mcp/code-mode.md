---
source: https://ai-sdk.dev/docs/ai-sdk-core/code-mode
---

# Code Mode

Code mode lets a model write JavaScript or TypeScript that calls your AI SDK tools. The generated code runs in an isolated QuickJS sandbox and returns a JSON-serializable result. Provided by the `@ai-sdk/code-mode` package.

## Signature / Usage

```bash
pnpm add ai @ai-sdk/code-mode zod
```

```ts
import {
  DIRECT_TOOL_CALL,
  experimental_codeModeTool as codeModeTool,
} from '@ai-sdk/code-mode';
import { generateText, isStepCount, tool } from 'ai';
import { z } from 'zod';

const getInventory = tool({
  description: 'Get available inventory for a product.',
  inputSchema: z.object({ productId: z.string() }),
  outputSchema: z.object({ productId: z.string(), availableUnits: z.number() }),
  execute: async ({ productId }) => ({ productId, availableUnits: 42 }),
});

const getDemand = tool({
  description: 'Get requested units for a product.',
  inputSchema: z.object({ productId: z.string() }),
  outputSchema: z.object({ productId: z.string(), requestedUnits: z.number() }),
  execute: async ({ productId }) => ({ productId, requestedUnits: 31 }),
});

const tools = {
  code_mode: codeModeTool({
    executionPolicy: {
      timeoutMs: 30_000,
    },
  }),
  getInventory,
  getDemand,
} as const;

const result = await generateText({
  model: __MODEL__,
  tools,
  experimental_toolCallers: {
    getInventory: ['code_mode'],
    getDemand: ['code_mode'],
  },
  stopWhen: isStepCount(10),
  prompt: 'Compare inventory and demand for product sku_123.',
});
```

Keys of `experimental_toolCallers` are the governed tools; values are allowed callers. Include `DIRECT_TOOL_CALL` to keep a tool directly callable too (`getInventory: ['code_mode', DIRECT_TOOL_CALL]`). Tools without an entry keep direct tool-calling behavior.

Example program the model might generate (each tool is on the global `tools` object; non-identifier names use bracket notation):

```ts
const [inventory, demand] = await Promise.all([
  tools.getInventory({ productId: 'sku_123' }),
  tools.getDemand({ productId: 'sku_123' }),
]);

return {
  sufficient: inventory.availableUnits >= demand.requestedUnits,
  remaining: inventory.availableUnits - demand.requestedUnits,
};
```

Direct execution without a model:

```ts
import { experimental_runCodeMode as runCodeMode } from '@ai-sdk/code-mode';

const result = await runCodeMode({
  js: `
    const inventory = await tools.getInventory({ productId: 'sku_123' });
    return { productId: inventory.productId, available: inventory.availableUnits > 0 };
  `,
  tools: { getInventory },
});
```

## Options / Props

`codeModeTool({ ... })`:

| Name | Type | Description |
| --- | --- | --- |
| toolDiscovery | `'conversation'` | Keeps the provider-visible `code_mode` tool definition stable and supplies the current host-tool catalog (TypeScript signatures and call examples) in a user message; a changed tool set adds a new catalog replacing earlier ones. Can improve prompt-cache reuse (provider dependent). |
| executionPolicy | object | Overrides execution limits (below). |

`executionPolicy` limits: `timeoutMs` (total execution time), `memoryLimitBytes` (QuickJS memory), `maxStackSizeBytes`, `maxSourceBytes`, `maxResultBytes`, `maxConsoleOutputBytes`, `maxToolInputBytes`, `maxToolOutputBytes`, `maxBridgeRequests` (total tool calls), `maxInFlightBridgeRequests` (concurrent tool calls).

```ts
import { experimental_setMaxWorkers as setMaxWorkers } from '@ai-sdk/code-mode';

setMaxWorkers(4); // process-wide cap on concurrent workers
```

## Notes

- Experimental: APIs may change. Requires Node.js 22 or newer; not available in browser or edge runtimes.
- Generated programs support JavaScript and type-stripped TypeScript (no type checking), top-level `await` / `return`, `Promise.all`, `JSON.parse` / `JSON.stringify`, `console.log` / `info` / `debug` / `error`. Tool calls are async and must be awaited; returning with detached calls fails the invocation. Inputs/outputs cross the sandbox boundary as JSON.
- Tool approval is not integrated: do not expose approval-requiring tools to code mode; a nested tool that requires approval is rejected rather than executed.
- Without an explicit `setMaxWorkers` cap, code mode chooses one from available memory, up to 32 workers.
- Each invocation gets a fresh QuickJS context without `process` / `require` / `module`, host file system, `fetch`, WebCrypto, performance APIs, `eval`, or dynamic `Function`. Treat the sandbox as defense in depth: tools run in the host application and every capability of a provided tool is available to generated code; enforce authorization and validate inputs inside each tool. Tool input schemas are validated before `execute`; abort signals and tool execution context are forwarded.
- With `toolSearch()` + `deferLoading: true`, use `toolDiscovery: 'conversation'` to keep the tool-definition cache.

## Related

- [Tool Search](./tool-search-guide.md)
- [toolSearch](./tool-search.md)
- [Tool Calling](./tools-and-tool-calling.md)
