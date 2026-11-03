# agent-class

| Name | Description | Path |
| --- | --- | --- |
| Agent class overview | Agent base class, lifecycle, core properties, API maps, SQL, routing URL | [overview.md](./overview.md) |
| Internals | Layers DurableObject > Server > Agent, static options, destroy | [internals.md](./internals.md) |
| State | initialState, setState, validateStateChange, onStateChanged | [state.md](./state.md) |
| Routing | routeAgentRequest, getAgentByName, props, buildAgentPath | [routing.md](./routing.md) |
| WebSockets | onConnect/onMessage/broadcast, readonly connections, protocol frames | [websockets.md](./websockets.md) |
| Callable methods | @callable decorator, typed stubs, streaming | [callable-methods.md](./callable-methods.md) |
| Schedule tasks | schedule, scheduleEvery, keepAliveWhile | [schedule-tasks.md](./schedule-tasks.md) |
| Queue tasks | FIFO queue, queue/dequeue/getQueue | [queue-tasks.md](./queue-tasks.md) |
| Retries | this.retry, RetryOptions, backoff defaults | [retries.md](./retries.md) |
| Durable execution | runFiber, startFiber, stash, onFiberRecovered | [durable-execution.md](./durable-execution.md) |
| Sub-agents | subAgent, abort/delete, routing, parent identity | [sub-agents.md](./sub-agents.md) |
| Agents as tools | agentTool, runAgentTool, detached runs, progress | [agent-tools.md](./agent-tools.md) |
| Run Workflows | AgentWorkflow, runWorkflow, workflow management | [run-workflows.md](./run-workflows.md) |
| Email | onEmail, replyToEmail, routeAgentEmail, send_email | [email.md](./email.md) |
| Webhooks | Webhook routing, signature verification, patterns | [webhooks.md](./webhooks.md) |
| Push notifications | Web Push from an Agent with VAPID | [push-notifications.md](./push-notifications.md) |
| Voice | withVoice, withVoiceInput, useVoiceAgent, telephony | [voice.md](./voice.md) |
| Chat SDK and Slack | createChatSdkState, ChatSdkStateAgent, Slack channel | [chat-sdk.md](./chat-sdk.md) |
| Client SDK | useAgent, AgentClient, agentFetch | [client-sdk.md](./client-sdk.md) |
| Chat agents | AIChatAgent, useAgentChat, tools, recovery | [chat-agents.md](./chat-agents.md) |
| Chat agents: advanced | Data parts, resumable streaming, providers, prepareStep, middleware, structured output, ToolLoopAgent | [chat-agents-advanced.md](./chat-agents-advanced.md) |
| Autonomous responses | saveMessages, submitMessages, waitUntilStable | [autonomous-responses.md](./autonomous-responses.md) |
