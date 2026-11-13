---
source: https://opencode.ai/docs/cli/commands/#uninstall
---

# opencode uninstall

Stops background services, removes the global cache, and uninstalls OpenCode. Session data, configuration, and state are not removed.

## Signature / Usage

```bash
$ opencode uninstall
```

Preview what would be removed.

```bash
$ opencode uninstall --dry-run
```

View all subcommands and flags.

```bash
$ opencode uninstall --help
```

## Notes

- Removal is destructive to the installation; preview with `--dry-run` first.

## Related

- [Overview](./overview.md)
- [Commands: upgrade](./commands-upgrade.md)
