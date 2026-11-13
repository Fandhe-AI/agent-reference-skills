---
source: https://opencode.ai/docs/build/plugins/effect/#publish
---

# Publish

A package plugin uses the same default export as a local Effect plugin. Export the Effect implementation from the main
entrypoint and declare `effect` as a `peerDependency`. Under `devDependencies`, pin the version `@opencode/plugin` uses
so development installs only one copy.

## Signature / Usage

```json title="package.json"
{
  "name": "opencode-acme-effect-plugin",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "dependencies": {
    "@opencode/plugin": "latest"
  },
  "peerDependencies": {
    "effect": "^4.0.1"
  },
  "devDependencies": {
    "effect": "4.0.1"
  }
}
```

OpenCode redirects imports of `effect`, exported `effect/*` subpaths, and `@opencode/plugin` (including imports from
dependencies in the plugin's `node_modules`) to the host's runtime instances so fibers, loggers, and `Schema` parsers
share one runtime copy.

- Do not bundle `effect` into the published plugin artifact. If you build with a bundler, mark `effect` and `effect/*`
  external.
- Plugins and their `node_modules` dependencies always execute against the host OpenCode release's `effect` instance.
  Use `effect` APIs and module paths compatible with the OpenCode release you target; dependencies built on another
  `effect` major (such as Effect 3) also receive the host's `effect` and are not supported.
- Only public `effect` subpaths are provided. A plugin that imports one of Effect's private `internal` modules fails to
  load with an error naming the path.
- The compiled OpenCode binary does not include the Scalar and Swagger UI assets used by Effect's HTTP API docs pages;
  serving those pages from a plugin shows a notice instead.

The package entrypoint exports `Plugin.define` with an `effect` function.

```ts title="src/index.ts"
import { Plugin } from "@opencode/plugin/effect"
import { Effect } from "effect"

export default Plugin.define({
  id: "acme.published",
  effect: (ctx) =>
    Effect.gen(function* () {
      const storage = ctx.storage
      yield* storage.set("installed", true)
    }),
})
```

Use versions compatible with the OpenCode release you target and test the installed package rather than only a
workspace-linked copy.

```sh
bun pm pack
bun add ./opencode-acme-effect-plugin-1.0.0.tgz
```

## Notes

- `"latest"` in the example is not pinned; pin `@opencode/plugin` to the version you build and test against.
- Effect here is the `effect` npm package (v4), unrelated to React's `useEffect` or similar hooks; the host redirects
  `effect` / `effect/*` / `@opencode/plugin` imports to its own runtime instance, so a published plugin must target an
  `effect` major compatible with the host.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [overview.md](./overview.md)
- [hooks.md](./hooks.md)
- [rpc.md](./rpc.md)
