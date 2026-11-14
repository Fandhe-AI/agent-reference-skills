---
source: https://opencode.ai/docs/cli/commands/#mini
---

# opencode mini

Starts the minimal interactive interface instead of the full-screen TUI.

## Signature / Usage

```bash
$ opencode mini
```

Continue the last session.

```bash
$ opencode mini --continue
```

Start with a model and an initial prompt.

```bash
$ opencode mini --model anthropic/claude-sonnet-5-5 --prompt "Summarize this repository"
```

Continue a specific session.

```bash
$ opencode mini --session ses_4f2a1c
```

View all subcommands and flags.

```bash
$ opencode mini --help
```

## Related

- [Settings (mini group)](./config.md)
- [Overview](./overview.md)
