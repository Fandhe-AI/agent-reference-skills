# MCP Events and Tasks (mcp-toolkit)

`@upstash/mcp-toolkit` builds MCP server features on Upstash Redis and QStash: long-running tools (MCP Tasks) and event subscriptions with signed webhooks (MCP Events).

## Signature / Usage

```bash
npm install @upstash/mcp-toolkit @modelcontextprotocol/server zod
```

```ts
import { McpTasks } from "@upstash/mcp-toolkit/tasks";
import { QStashDispatcher, RedisTaskStore } from "@upstash/mcp-toolkit/upstash";

const tasks = new McpTasks({
  store: new RedisTaskStore(),
  dispatcher: new QStashDispatcher({
    url: `${process.env.APP_URL}/api/execute`,
  }),
  principal: () => "local",
});

// registerTask(...) and the MCP handler as above, then one more endpoint.
// QStash delivers each task here: serve POST /api/execute with it.
export const execute: (request: Request) => Promise<Response> =
  tasks.createExecuteHandler();
```

```ts
import { events } from "./events";

export const POST = events.createDeliveryHandler();
```

## Options / Props

| Item | Description |
| --- | --- |
| `McpTasks` | Turns a slow tool into a task; `registerTask`, `attach(server)`, `createExecuteHandler()`; tools `task_status` / `task_cancel`, `tasks/get` / `tasks/cancel` |
| In-memory (default) | `MemoryTaskStore` + `InProcessDispatcher`; no retries, not for serverless or multiple instances |
| `QStashDispatcher` | Redis record + QStash delivery; QStash redelivers, the whole task starts over on throw |
| `WorkflowDispatcher` | Same endpoint; each step runs in its own invocation, no overall time limit, only the failed step reruns, supports `task.elicit` |
| `McpEvents` | `store`, `delivery`, `principal` required (plus `secretKey` unless `MCP_EVENTS_SECRET_KEY` is set); optional `maxSubscriptions` (8), `allowInsecureCallbacks` |
| `events.registerEvent(name, config)` | `description`, `payload`, `authorize` required; returns `{ name, emit }` |
| `RedisSubscriptionStore` / `QStashDelivery` | Subscriptions in Redis; each delivery via QStash, retried 3 times with QStash backoff |

Environment: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `QSTASH_URL`, `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY`, `APP_URL`, and for events `MCP_EVENTS_SECRET_KEY`.

## Notes

- The execute endpoint answers 200 when the task ran, 500 when the handler threw (QStash retries), and 489 with `Upstash-NonRetryable-Error` for a bad signature or body; it refuses to run without signing keys
- With QStash, the task is marked `failed` only after QStash stops retrying (default 5 retries, 6 attempts); the failed message stays in the QStash DLQ; free tier and the local dev server allow at most 5 retries
- MCP Events is a draft; as of October 2026 ChatGPT is the only widely used host that subscribes to it. The delivery endpoint verifies the QStash signature, signs the envelope with the subscriber's `whsec_` secret and POSTs it to the host; callback URLs must be public `https`; subscriptions last 7 days by default (30 max)
- Host responses: 2xx delivered, 410 deletes the subscription, 413 or redirect drops the event, anything else is retried by QStash
- Not supported yet for tasks: asking the user with `QStashDispatcher`, URL elicitation, `tasks/list`, `tasks/result`
- Local development: run the QStash dev server (local-development.md) and set `QSTASH_URL=http://127.0.0.1:8080`
- Distinct from the MCP protocol specification and from MCP host configuration, which belong to the mcp-spec and anthropic-claude-code-extend skills
- Source: https://upstash.com/docs/qstash/sdks/ts/mcp-tasks (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/qstash/sdks/ts/mcp-events (fetched 2026-11-14; no version pin on the site)

## Related

- [receiver.md](./receiver.md)
- [retry.md](./retry.md)
- [dlq.md](./dlq.md)
- [local-development.md](./local-development.md)
