---
source: https://opencode.ai/docs/build/plugins/gui/#usage-data
---

# Usage data

A session's token, cost and plan figures are read from its server's reactive data store.

## Signature / Usage

A session's token, cost and plan figures are in its server's data, the same reactive store the app reads for the
header's "28k · $0.28". Read them there rather than from opencode's database.

```ts
import { lastAssistantWithUsage } from "@opencode/client/solid"

const data = session.server.data
const info = () => data.session.get(session.id)

const tokens = () => info()?.tokens // this session's tokens by kind
const cost = () => data.session.cost(session.id) // USD, with subagent sessions
const step = () => lastAssistantWithUsage(data.session.message.list(session.id), info()?.revert?.messageID)
const limits = () => (session.location ? data.location.usage.limits(session.location) : undefined)
```

- `step()` is the assistant step whose tokens fill the context window now, as the app's context ring uses. Compare its
  `tokens` with the model's `limit.context` from `data.location.model.list`.
- `limits()` holds the OpenCode Console budgets and Go plan allowance once `data.location.usage.sync(location)` has
  loaded them. It is `null` when the server reports none.

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Servers and server events](./servers-events.md)
- [Sessions and the session screen](./sessions-screen.md)
