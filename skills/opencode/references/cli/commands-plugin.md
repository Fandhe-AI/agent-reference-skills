---
source: https://opencode.ai/docs/cli/commands/#plugin
---

# opencode plugin

Manages plugins.

## Signature / Usage

```bash
$ opencode plugin list
```

Include built-in server plugins.

```bash
$ opencode plugin list --builtin
```

Install a plugin and add it to the global configuration.

```bash
$ opencode plugin add @example/opencode-tui
```

Check package plugins for updates.

```bash
$ opencode plugin check
```

Update package plugins.

```bash
$ opencode plugin update
```

Remove a plugin from global configuration.

```bash
$ opencode plugin remove @example/opencode-tui
```

View all subcommands and flags.

```bash
$ opencode plugin --help
```

## Notes

- OpenCode plugins are distinct from Claude Code plugins (anthropic-claude-code-extend).

## Related

- [Plugins](./plugins.md)
- [Commands: mcp](./commands-mcp.md)
