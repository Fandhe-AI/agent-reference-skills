---
source: https://ai-sdk.dev/docs/ai-sdk-core/runtime-and-tool-context
---

# Runtime and Tool Context

Context passes server-side state (tenant info, feature flags, session data, request IDs, API credentials) through a generation or agent loop without putting it into the prompt. Shared runtime state (`runtimeContext`) is separate from per-tool state (`toolsContext`).

## Signature / Usage

```ts
const result = await generateText({
  model: __MODEL__,
  prompt: 'Help the user plan their trip.',
  runtimeContext: {
    tenantId: 'tenant_123',
    plan: 'enterprise',
    requestId: 'req_abc',
  },
  prepareStep: async ({ runtimeContext }) => {
    if (runtimeContext.plan === 'enterprise') {
      return { temperature: 0.2 };
    }

    return {};
  },
});
```

Per-tool context via `contextSchema` and `toolsContext`:

```ts
const weatherTool = tool({
  description: 'Get the weather in a location',
  inputSchema: z.object({ location: z.string() }),
  contextSchema: z.object({
    weatherApiKey: z.string(),
    defaultUnit: z.enum(['celsius', 'fahrenheit']),
  }),
  execute: async ({ location }, { context }) => {
    return fetchWeather({
      location,
      apiKey: context.weatherApiKey,
      unit: context.defaultUnit,
    });
  },
});

const result = await generateText({
  model: __MODEL__,
  tools: { weather: weatherTool },
  toolsContext: {
    weather: {
      weatherApiKey: process.env.WEATHER_API_KEY!,
      defaultUnit: 'fahrenheit',
    },
  },
  prompt: 'What is the weather in San Francisco?',
});
```

## Options / Props

Context types:

| Name | Defined in | Read in | Use for |
| --- | --- | --- | --- |
| `runtimeContext` | `generateText` / `streamText` calls; `ToolLoopAgent` settings or `prepareCall` | `prepareStep`, lifecycle callbacks, step results, telemetry | Shared generation or agent state |
| `toolsContext` | same as above | `prepareStep`, approval callbacks, tool context resolution, tool description functions | Map of per-tool context values keyed by tool name |
| tool `context` | each tool's `toolsContext` entry, validated by its `contextSchema` | tool description functions, tool `execute`, `needsApproval`, tool input lifecycle callbacks | Values needed by one tool |
| `toolContext` | derived from one tool's context | tool approval callbacks and tool execution events | Event/callback name for one tool's context |
| `telemetry.includeRuntimeContext` | generation call or `ToolLoopAgent` settings | telemetry filtering | Top-level `runtimeContext` properties to include in telemetry |
| `telemetry.includeToolsContext` | generation call or `ToolLoopAgent` settings | telemetry filtering | Top-level tool context properties to include in telemetry |

Where context is available:

| Location | `runtimeContext` | `toolsContext` | Tool `context` / `toolContext` |
| --- | --- | --- | --- |
| `prepareStep` | Read and update | Read and update | Not directly |
| Tool description functions | Not passed directly | Not passed directly | Read one tool's validated `context` |
| Tool `execute` | Not passed directly | Not passed directly | Read one tool's validated `context` |
| Tool approval | Read in generic and per-tool callbacks | Read in generic callbacks | Read as `toolContext` in per-tool callbacks |
| Tool execution events | Not included | Not included | Read as `toolContext` |
| Step results and finish callbacks | Read final or per-step state | Read final or per-step state | Available through per-tool entries in `toolsContext` |
| Telemetry | Filtered by `telemetry.includeRuntimeContext` | Filtered by `telemetry.includeToolsContext` | Filtered by `telemetry.includeToolsContext` |

Telemetry filtering example (`ToolLoopAgent`):

```ts
const agent = new ToolLoopAgent({
  model: __MODEL__,
  tools: { customerLookup },
  runtimeContext: { requestId: 'req_abc', tenantId: 'tenant_123', userId: 'user_123' },
  telemetry: {
    includeRuntimeContext: { requestId: true },
    includeToolsContext: { customerLookup: { region: true } },
  },
  toolsContext: {
    customerLookup: { apiKey: process.env.CUSTOMER_API_KEY!, region: 'us' },
  },
});
```

## Notes

- `runtimeContext` is not added to the model prompt automatically. `prepareStep` can return a new `runtimeContext`; it affects the current and all subsequent steps.
- When at least one tool declares `contextSchema`, `toolsContext` is required for the tools that need context. A tool receives only its own context. Treat tool context as immutable inside tools; update it via `prepareStep` returning `toolsContext`.
- For `ToolLoopAgent`, set context in the constructor; for per-invocation context use `callOptionsSchema` and `prepareCall`.
- Telemetry filtering is shallow (top-level properties marked `true`); if omitted, nothing is sent. It only affects telemetry integrations, not execution, lifecycle callbacks, or results. Use it to reduce telemetry exposure, not as a general security boundary.
- Choosing: `runtimeContext` for whole-loop state; `toolsContext` + `contextSchema` for per-tool values (API keys, scoped clients); prompt messages for what the model should reason about.

## Related

- [Tool Calling](./tools-and-tool-calling.md)
- [tool](./tool.md)
- [Lifecycle Callbacks](../core/lifecycle-callbacks.md)
- [Telemetry](../operations/telemetry.md)
- [Configuring Call Options](../agents/configuring-call-options.md)
