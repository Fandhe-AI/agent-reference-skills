<!-- source: https://code.claude.com/docs/en/quickstart.md / last verified: 2026-08-07 -->

# Quickstart

Walk through installing Claude Code, logging in, starting a session, and making a first code change.

## Signature / Usage

```bash
claude --version        # confirm install
claude                  # start interactive session, prompts login on first use
claude "task"           # run a one-time task
claude -p "query"       # run one-off query, then exit
claude -c                # continue most recent conversation in current directory
claude -r                # resume a previous conversation
```

## Options / Props

| Session command | What it does |
|------------------|--------------|
| `/clear` | Clear conversation history |
| `/help` | Show available commands |
| `/exit` or Ctrl+D twice | Exit Claude Code |

## Notes

- Steps: install → log in (`/login` to switch accounts) → start session in a project directory → ask questions → make a code change → use git conversationally → fix bugs/add features → try common workflows.
- Whether Claude asks before changing files depends on permission mode; `Shift+Tab` cycles `default` (asks every time) → `acceptEdits` → `plan`. Some accounts also have `auto` mode.
- Type `/` to see all commands and skills; Tab for command completion; `↑` for history.

## Related

- [Overview](./overview.md)
- [How Claude Code works](./how-claude-code-works.md)
- [Best practices](./best-practices.md)
- [Common workflows](./common-workflows.md)
- [Extend Claude Code](./features-overview.md)
