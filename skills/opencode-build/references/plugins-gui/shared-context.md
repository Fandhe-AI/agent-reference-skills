---
source: https://opencode.ai/docs/build/plugins/gui/#shared-context
---

# Shared context

Both setups receive the plugin's options, a client for the OpenCode server, and app metadata, like the server and TUI parts.

## Signature / Usage

### Options

`ctx.options` holds the `options` from the plugin's `opencode.json(c)` entry: the same values the server part gets.

```jsonc title="opencode.jsonc"
{
  "plugins": [{ "package": "opencode-acme-plugin", "options": { "team": "core" } }],
}
```

```ts
setup(ctx) {
  const team = ctx.options.team
}
```

- Changing the options reloads the plugin.

### Server client

`ctx.client` is the OpenCode client of the server that runs the plugin: the desktop app's own server. Use it to call
your server part through its [RPC](https://opencode.ai/docs/build/plugins/rpc/).

```ts
import { Command } from "@opencode/plugin/gui"
import { Acme } from "./rpc"

ctx.add(Command, () => ({
  id: "search",
  title: ctx.t("command.search"),
  run: async () => {
    const result = await ctx.client.rpc(Acme).search({ query: "todo" })
    console.log(result)
  },
}))
```

- Read `ctx.client` where you call it. It changes after that server restarts.
- While the server is unreachable, every call rejects.

### App metadata

`ctx.app` describes the running app.

```ts
if (!ctx.app.packaged) console.log(`Acme on ${ctx.app.name} ${ctx.app.version} (${ctx.app.channel})`)
```

- `name` is `"opencode"`, as in a server plugin's `ctx.app.name`.
- `platform` is `"desktop"` in the Electron app and in `main`, and `"web"` in a browser tab.
- `packaged` is `true` when the desktop app runs packaged. It is always `false` on the web.
- Server plugins get `name`, `version`, and `channel`; TUI plugins get `version` and `channel`.

#### Reference

```ts
interface App {
  name: string
  version: string
  channel: "local" | "dev" | "beta" | "prod"
  platform: "web" | "desktop"
  packaged: boolean
}
```

## Notes

- OpenCode GUI plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Define the GUI plugin](./define-plugin.md)
- [Main context](./main-context.md)
