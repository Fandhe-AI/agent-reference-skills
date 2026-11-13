---
source: https://opencode.ai/docs/build/plugins/gui/#servers-and-server-events
---

# Servers and server events

`ctx.servers.get(id)` returns a live `ServerRef`; `data.on` reacts to its events.

## Signature / Usage

`ctx.servers.get(id)` returns a live `ServerRef`. The desktop app's own server, which runs your plugin, has the id
`"sidecar"`. React to its events with `data.on`:

```ts
import { onCleanup } from "solid-js"
import { createKeyed } from "@opencode/plugin/gui"

createKeyed(
  () => ctx.servers.get("sidecar")?.data,
  (data) => onCleanup(data.on("session.created", (event) => console.log(event))),
)
```

- `id` is the host key: `"sidecar"`, an http URL, or `<plugin id>:<id>` for a [contributed server](./server.md).
- `data` is the server's synced data, such as sessions and projects, and `on(type, handler)` for its events. It is
  reactive.
- `builtin` is `true` for the app's own server.
- `compatible` is `true` when the server's version works with this app, and `connected` while its event connection is
  up.
- `password` is the HTTP basic password the user configured, if any.
- Read `client`, `data`, and `url` from the live `ServerRef` each time: a restarted server gets a new client under the
  same id.
- `ctx.servers.list()` returns the ids of the servers the app lists.

#### Reference

```ts
interface Servers {
  list(): string[]
  get(id: string): ServerRef | undefined
}

interface ServerRef {
  id: string
  name: string
  url: string
  password?: string
  client: OpenCodeClient
  data: Data
  local: boolean
  builtin: boolean
  compatible: boolean
  connected: boolean
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Server](./server.md)
- [Reactive primitives](./reactive-primitives.md)
- [Usage data](./usage-data.md)
