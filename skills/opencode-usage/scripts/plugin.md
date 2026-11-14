---
source: https://opencode.ai/docs/plugins/
---

# Plugin

Manage global package plugins with `opencode plugin`.

## Signature / Usage

### Manage

Install, list, check, update, or remove global package plugins.

```sh
opencode plugin add opencode-acme-plugin@1.2.0
opencode plugin list
opencode plugin list --builtin
opencode plugin check
opencode plugin update
opencode plugin update opencode-acme-plugin
opencode plugin remove opencode-acme-plugin@1.2.0
```

### Package specifications

```sh
opencode plugin add @acme/opencode-plugin@latest
opencode plugin add github:acme/opencode-plugin
opencode plugin add git+ssh://git@github.com/acme/opencode-plugin.git#main
opencode plugin add 'github:acme/plugins#main::path:packages/opencode-plugin'
```

### TUI plugin example

Source: https://opencode.ai/docs/cli/commands/

```sh
opencode plugin add @example/opencode-tui
```

### Reload

```sh
touch .opencode/plugins/concise/index.ts
opencode service restart
```

## Notes

- `plugin check` checks server, GUI-only, and TUI-only package plugins for updates. `plugin update` updates every outdated package; pass a configured package target to check or update only that package. Local plugins and exact package revisions are skipped.
- Branches, tags, complete commit hashes, and npm's `::path:` repository-subdirectory selectors are supported. Configure local paths directly; tarball and npm alias targets are not accepted by `plugin add`.
- Installing a plugin runs third-party code; review the package or repository before adding it.
- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- cli.md
- https://opencode.ai/docs/plugins/
