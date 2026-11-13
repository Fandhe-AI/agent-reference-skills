---
source: https://opencode.ai/docs/build/plugins/
---

# Package, Load, and Publish a Plugin

Lay out a plugin package with server, TUI, GUI, and RPC parts, load it from config, and publish it.

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

```bash
npm publish
```

## Notes

- Include only the parts you need; every part's SDK comes from the single `@opencode/plugin` dependency.
- One `plugins` entry loads every part. A TUI-only package goes in `cli.json` instead.
- Build the GUI bundle before publishing and ship it through `files`.
- Test the installed package, not only a workspace-linked copy. `npm publish` publishes publicly; confirm the package name and contents first.
