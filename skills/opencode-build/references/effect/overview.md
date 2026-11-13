---
source: https://opencode.ai/docs/build/plugins/effect/
---

# Effect plugin API

`@opencode/plugin/effect` is the Effect-native version of the OpenCode plugin API. Its context operations return
Effects or Streams, callbacks return Effects, and plugin lifetime is represented by `Scope`.

## Signature / Usage

OpenCode provides `effect` (including exported `effect/*` subpaths) and `@opencode/plugin` at runtime when loading
plugins and their `node_modules` dependencies. Install them as peer/dev dependencies for local type-checking and testing
rather than bundling them into your plugin.

```sh
bun add --peer @opencode/plugin effect@4.0.1
```

Export an Effect plugin from `.opencode/plugins/` to load it automatically.

```ts title=".opencode/plugins/concise/index.ts"
import { Plugin } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "example",
  effect: (ctx) =>
    Effect.gen(function* () {
      const storage = ctx.storage
      yield* storage.set("loaded", true)
    }),
})
```

Published packages and plugin directories outside `.opencode/plugins/` use the same `plugins` configuration as other server
plugins.

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "opencode-acme-effect-plugin",
    "opencode-acme-effect-plugin@1.2.0",
    "@acme/opencode-effect-plugin",
    "./plugins/local-effect",
    {
      "package": "@acme/opencode-effect-plugin",
      "options": { "agent": "reviewer", "strict": true },
    },
  ],
}
```

See [Configure plugins](https://opencode.ai/docs/plugins/) for enablement, package resolution, and configuration precedence.

```ts title="plugins/local-effect/index.ts"
import { Plugin } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "local-effect",
  effect: (ctx) =>
    Effect.gen(function* () {
      yield* Effect.logInfo("Effect plugin loaded", { version: ctx.app.version })
    }),
})
```

## Notes

- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect` or similar hooks.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [lifecycle.md](./lifecycle.md)
- [transforms.md](./transforms.md)
- [api.md](./api.md)
- [hooks.md](./hooks.md)
- [publish.md](./publish.md)
- [rpc.md](./rpc.md)
- [client.md](./client.md)
- [sdk.md](./sdk.md)
