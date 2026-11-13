---
source: https://opencode.ai/docs/build/plugins/cli/#sessions
---

# Sessions

Session data exposes list, lookup, hierarchy, cost, status, synchronization, and invalidation.

## Signature / Usage

Session data exposes list, lookup, hierarchy, cost, status, synchronization, and invalidation.

```ts
const sessions = context.data.session.list()
const session = context.data.session.get(sessionID)
const rootID = context.data.session.root(sessionID)
const familyIDs = context.data.session.family(sessionID)
const cost = context.data.session.cost(sessionID)
const status = context.data.session.status(sessionID)
await context.data.session.sync(sessionID)
context.data.session.invalidate(sessionID)
```

Pending inbox items and messages have list, lookup, sync, and invalidate APIs.

```ts
await context.data.session.pending.sync(sessionID)
const pending = context.data.session.pending.list(sessionID)
context.data.session.pending.invalidate(sessionID)

await context.data.session.message.sync(sessionID)
const messages = context.data.session.message.list(sessionID)
const message = context.data.session.message.get(sessionID, messageID)
context.data.session.message.invalidate(sessionID)
```

Permission requests can be read and refreshed for a session.

```ts
await context.data.session.permission.sync(sessionID)
const requests = context.data.session.permission.list(sessionID) ?? []
context.data.session.permission.invalidate(sessionID)
```

Forms can be listed, refreshed, replied to, or cancelled at a location.

```ts
import type { SessionFormCancelInput, SessionFormReplyInput } from "@opencode/client"

async function handleForm(reply: SessionFormReplyInput, cancel: SessionFormCancelInput) {
  const location = context.location
  await context.data.session.form.sync(sessionID, location)
  const forms = context.data.session.form.list(sessionID, location) ?? []
  await context.data.session.form.reply(reply, location)
  await context.data.session.form.cancel(cancel, location)
  context.data.session.form.invalidate(sessionID, location)
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [projects-and-shells.md](./projects-and-shells.md)
- [location-data.md](./location-data.md)
