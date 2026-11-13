---
source: https://opencode.ai/docs/build/plugins/effect/
---

# Effect Plugin

Write a server plugin with the Effect-native API, where lifetime is a `Scope`.

```sh
bun add --peer @opencode/plugin effect@4.0.1
```

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

Release resources with a finalizer:

```ts
import { Plugin } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "lifecycle",
  effect: (ctx) =>
    Effect.gen(function* () {
      yield* Effect.logInfo("loaded", { version: ctx.app.version })
      yield* Effect.addFinalizer(() => Effect.logInfo("unloaded"))
    }),
})
```

## Notes

- Effect here is the `effect` npm package (v4), unrelated to React `useEffect`.
- OpenCode provides `effect` and `@opencode/plugin` at runtime; install them as peer/dev dependencies instead of bundling.
- The plugin scope closes on reload or unload, releasing registrations and scoped fibers together.
- For RPC with Effect Schema, see the Effect RPC page of the plugin docs.
