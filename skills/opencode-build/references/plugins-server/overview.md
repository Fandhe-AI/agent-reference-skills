---
source: https://opencode.ai/docs/build/plugins/
---

# Overview

Plugins modify OpenCode's behavior and add new features. A plugin is one package with a server part, a TUI part, a GUI part, or any combination.

## Signature / Usage

```ts title=".opencode/plugins/example/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "example",
  async setup(ctx) {
    await ctx.storage.set("loaded", true)
  },
})
```

### Parts

Each part is an export of the package. Every part's SDK comes from the one `@opencode/plugin` dependency.

```json title="package.json"
{
  "name": "opencode-acme-plugin",
  "version": "1.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./tui": "./src/tui.tsx",
    "./gui-experimental": "./dist/gui-experimental.cjs",
    "./rpc": "./src/rpc.ts"
  },
  "files": ["src", "dist"],
  "dependencies": {
    "@opencode/plugin": "latest"
  }
}
```

- **Server** (`.` or `./server`) runs in the OpenCode server with `@opencode/plugin`. It adds tools, hooks, integrations, commands, and agents. See [Server](https://opencode.ai/docs/build/plugins/server/), or [Effect plugins](https://opencode.ai/docs/build/plugins/effect/) for the Effect API.
- **TUI** (`./tui`) runs in the terminal UI with `@opencode/plugin/tui`. See [TUI](https://opencode.ai/docs/build/plugins/cli/).
- **GUI** (`./gui-experimental`) runs its `setup` in every OpenCode Desktop window and its `main` in the desktop app's main process, with `@opencode/plugin/gui`. See [GUI](https://opencode.ai/docs/build/plugins/gui/).
- **RPC** (`./rpc`) is a typed contract that the server part implements and the other parts and clients call. See [RPC](./rpc.md).

The plugin's `id` comes from its server part's `Plugin.define`. A package with a GUI part and no server part takes its package name (or a local directory's name) as its `id`. A TUI part declares its own `id`; a GUI part declares none and takes the plugin's.

### Load

Plugins under `.opencode/plugins/` load automatically, like the local example above. To load published packages or plugin directories from other locations, add them to `plugins` in `opencode.json(c)`:

```jsonc title="opencode.jsonc"
{
  "$schema": "https://opencode.ai/config.json",
  "plugins": [
    "opencode-acme-plugin",
    "opencode-acme-plugin@1.2.0",
    "@acme/opencode-plugin",
    "./plugins/local",
    "../shared/plugin",
    "/absolute/path/plugin",
    "file:///home/me/plugins/local",
    {
      "package": "@acme/opencode-plugin",
      "options": {
        "agent": "reviewer",
        "strict": true,
      },
    },
  ],
}
```

- One entry loads every part. The TUI loads the TUI parts of the plugins its server loads, and OpenCode Desktop loads the GUI parts of the plugins in your global `opencode.json(c)`.
- A package with only a TUI part goes in [`cli.json`](https://opencode.ai/docs/cli/plugins/) instead.
- A local plugin directory with a `package.json` `name` and `exports` loads its parts through them, like the published package. Without them, it uses file names at its root: `server` (else `index`), `tui`, and `rpc` with a `.ts`, `.tsx`, or `.js` extension, and `gui-experimental.cjs` (or `.js`).
- See [Configure plugins](https://opencode.ai/docs/plugins/) for more loading and configuration options.

### Publish

A published plugin is an npm package with the `package.json` above. Its parts use the same default exports as a local plugin.

```bash
npm publish
```

- Export `./rpc` when other plugins and clients should import your [RPC contract](./rpc.md) without loading your implementation.
- Build the GUI bundle before you publish, and include it through `files`. See [Build the bundle](https://opencode.ai/docs/build/plugins/gui/#build-the-bundle).
- Use versions compatible with the OpenCode release you target, and test the installed package, not only a workspace-linked copy. Publish a compatible plugin update when you adopt a newer API contract.

## Notes

- Migrating an existing OpenCode 1 plugin? See [Migrate plugins from V1](./migrate-v1.md).
- OpenCode plugins are distinct from Claude Code hooks and plugins (anthropic-claude-code-extend).
- `npm publish` publishes to the public registry; run it only for a package you intend to release.

## Related

- [Lifecycle](./lifecycle.md)
- [RPC](./rpc.md)
- [Migrate plugins from V1](./migrate-v1.md)
- [Server (official)](https://opencode.ai/docs/build/plugins/server/)
- [TUI (official)](https://opencode.ai/docs/build/plugins/cli/)
- [GUI (official)](https://opencode.ai/docs/build/plugins/gui/)
