---
source: https://opencode.ai/docs/build/plugins/gui/#servers
---

# Server

`Server` contributes a list of server connections, such as servers your plugin starts on other machines.

## Signature / Usage

```ts
import { Server } from "@opencode/plugin/gui"

ctx.add(
  Server,
  (): Server => ({
    ready: loaded(),
    entries: machines().map((machine) => ({
      id: machine.id,
      name: machine.name,
      label: "Acme",
      state: machine.url ? "ready" : "starting",
      http: machine.url ? { url: machine.url } : undefined,
    })),
  }),
)
```

- Startup waits for every source to be `ready`. A ready source's entries are its complete inventory.
- `order` sorts the sources in ascending order.
- Each entry's key is `<plugin id>:<id>`. `label` is a short badge beside its `name`.
- `auth` means the server waits for the user to sign in, and `incompatible` that it runs a version this app does not
  support.
- `listed: false` keeps the entry out of the app's server list. Settings still shows it.
- `http` is the endpoint, once the server is `ready`.
- `reconnect` resolves a dropped endpoint again, `connect` prepares a server that is not ready, and `remove` runs before
  the entry is removed.
- `row` renders the server's settings row, and `cover` covers the routed session while the server is not ready.
- A `row` receives the host's status `Indicator`, the latest `health()` check, and the row's `server.row` menu `Items`.
  Its `remove()` runs the entry's `remove`, then closes the server's tabs.

#### Reference

```ts
interface Server {
  ready: boolean
  order?: number
  entries: ServerEntry[]
}

interface ServerEntry {
  id: string
  name: string
  label?: string
  state: "stopped" | "starting" | "auth" | "ready" | "failed" | "incompatible"
  listed?: boolean
  http?: { url: string; password?: string }
  reconnect?(signal: AbortSignal): Promise<{ url: string; password?: string }>
  connect?(): Promise<boolean>
  remove?(): Promise<void>
  row?(row: ServerRow): JSX.Element
  cover?(input: { tab: string }): JSX.Element
}

interface ServerRow {
  key: string
  health(): ServerHealth | undefined
  Indicator(props: { health?: ServerHealth; connecting?: boolean; auth?: boolean }): JSX.Element
  remove(): Promise<void>
  Items(): JSX.Element
}

interface ServerHealth {
  healthy: boolean
  version?: string
  incompatible?: boolean
  checking?: boolean
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Servers and server events](./servers-events.md)
- [Menu items](./menu-item.md)
