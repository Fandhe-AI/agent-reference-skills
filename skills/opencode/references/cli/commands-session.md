---
source: https://opencode.ai/docs/cli/commands/#session
---

# opencode session

Manages sessions.

## Signature / Usage

```bash
$ opencode session list
```

Limit the list and print JSON.

```bash
$ opencode session list --max-count 20 --format json
```

Delete a session and its child sessions.

```bash
$ opencode session delete ses_9c1b08
```

Export session data as JSON.

```bash
$ opencode session export ses_4f2a1c
```

Redact sensitive transcript and file data when exporting.

```bash
$ opencode session export ses_4f2a1c --sanitize
```

Import session data from a JSON file or URL.

```bash
$ opencode session import session.json
```

Import into a specific directory.

```bash
$ opencode session import session.json --directory ~/code/project
```

View all subcommands and flags.

```bash
$ opencode session --help
```

## Notes

- `session delete` also deletes child sessions.
- Import session data only from files or URLs you trust.

## Related

- [Commands: run](./commands-run.md)
- [TUI](./tui.md)
