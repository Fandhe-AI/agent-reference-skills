# runtime

| Name | Description | Path |
|------|-------------|------|
| Runtime overview | Lifecycle, routing, capabilities, and observability on a Durable Object | [overview.md](./overview.md) |
| Capabilities | Attach features with lifecycle.use(); stable and experimental list | [capabilities.md](./capabilities.md) |
| Lifecycle | agents/lifecycle: startup, dispatch, SQLite, teardown | [lifecycle.md](./lifecycle.md) |
| Jobs and alarms | Durable job queue, retries, heartbeat, memory-limit protection | [job-queue.md](./job-queue.md) |
| Lifecycle API | Every export of agents/lifecycle | [lifecycle-api.md](./lifecycle-api.md) |
| getCurrentAgent() | Read the current object, request, and connection | [get-current-agent.md](./get-current-agent.md) |
| Routing | routeAgentRequest(), URL shape, naming agents | [routing.md](./routing.md) |
| Routing options | prefix, cors, placement, props, retries, hooks | [routing-options.md](./routing-options.md) |
| Routing authentication | onBeforeConnect / onBeforeRequest checks | [routing-authentication.md](./routing-authentication.md) |
| Custom routing | Own URLs, server-chosen object, RPC | [custom-routing.md](./custom-routing.md) |
| HTTP and SSE | onRequest() handling and Server-Sent Events | [http-sse.md](./http-sse.md) |
| WebSockets | Hibernating connections, callables, tags, readonly | [websockets.md](./websockets.md) |
| State | One validated value synced to clients | [state.md](./state.md) |
| Scheduler | Delayed, dated, cron, and interval callbacks | [scheduler.md](./scheduler.md) |
| MCPClientManager | Connect to MCP servers, OAuth, elicitation | [mcp-client-manager.md](./mcp-client-manager.md) |
| Streams | Durable replayable chunk log (experimental) | [streams.md](./streams.md) |
| Sessions | Tree-shaped conversation store (experimental) | [sessions.md](./sessions.md) |
| Build a capability | Write your own LifecycleCapability | [build-a-capability.md](./build-a-capability.md) |
| Tracing | Workers traces for model calls, tools, approvals | [tracing.md](./tracing.md) |
| Diagnostics channels | Structured events and channel reference | [diagnostics-channels.md](./diagnostics-channels.md) |
