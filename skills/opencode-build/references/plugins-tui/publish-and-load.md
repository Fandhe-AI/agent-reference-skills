---
source: https://opencode.ai/docs/build/plugins/cli/#publish-and-load
---

# Publish and load

Expose the TUI plugin through `./tui`; add OpenTUI peers when the plugin renders JSX.

## Signature / Usage

Expose the TUI plugin through `./tui`; add OpenTUI peers when the plugin renders JSX.

```json title="package.json"
{
  "name": "opencode-acme-plugin",
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./tui": "./src/tui.tsx"
  },
  "dependencies": {
    "@opencode/plugin": "latest"
  },
  "peerDependencies": {
    "@opentui/core": ">=0.6.6",
    "@opentui/solid": ">=0.6.6",
    "solid-js": ">=1.9.0"
  }
}
```

Export `./tui` beside a server part or GUI part for automatic loading.

```ts title="src/index.ts"
import { Plugin } from "@opencode/plugin"

export default Plugin.define({
  id: "acme.server",
  setup() {},
})
```

Configure a TUI-only package in `cli.json` so it remains active against remote servers.

```json title="cli.json"
{
  "plugins": ["opencode-acme-plugin"]
}
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [overview.md](./overview.md)
- Server part: https://opencode.ai/docs/build/plugins/server/
- GUI part: https://opencode.ai/docs/build/plugins/gui/
- cli.json: https://opencode.ai/docs/cli/plugins/
