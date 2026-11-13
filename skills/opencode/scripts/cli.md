---
source: https://opencode.ai/docs/cli/commands/
---

# CLI

The `opencode` run / mini / session / models / stats / api / debug / upgrade / uninstall / reload commands.

## Signature / Usage

Every command accepts `--help` for its full flag list, for example `opencode run --help`. Some server-backed commands accept `--standalone` to run a private server or `--server <url>` to target a specific one; check the command's help for its supported flags.

### Open the TUI

Source: https://opencode.ai/docs/cli/

```bash
opencode
```

```bash
opencode ~/code/my-project
```

### run

```bash
opencode run "Explain this repository"
```

Choose a model.

```bash
opencode run --model anthropic/claude-sonnet-5-5 "Refactor parseToken"
```

Continue the last session.

```bash
opencode run --continue "Now handle the expired case"
```

Emit newline-delimited JSON for scripts.

```bash
opencode run --format json "List the TODO comments"
```

Attach files to the message.

```bash
opencode run --file src/server.ts --file src/client.ts "Review these for bugs"
```

Run with a specific agent.

```bash
opencode run --agent build "Fix the failing test"
```

Continue a specific session.

```bash
opencode run --session ses_4f2a1c "Check edge cases"
```

Auto-approve permissions that are not explicitly denied.

```bash
opencode run --auto "Fix the failing test"
```

Create the session archived so scripted or CI runs stay out of session lists and the inbox.

```bash
opencode run --archived "Review this diff"
```

Use a model variant.

Snippet taken from https://opencode.ai/docs/models/.

```bash
opencode run --model openai/gpt-6.1-sol#high "Review this migration plan"
```

### run in CI (GitHub Actions)

Adapted (not in the official docs): the workflow runs on pushes to the default branch instead of `pull_request`, adds read-only `permissions`, pins `actions/checkout` to the v4.4.0 commit SHA with `persist-credentials: false`, and pins `@opencode/cli` to 2.3.0.

```yaml
name: OpenCode review
on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4.4.0
        with:
          persist-credentials: false
      - run: npm install --global @opencode/cli@2.3.0
      - run: opencode run --standalone --model anthropic/claude-sonnet-5-5 "Review this repository for correctness and summarize any issues."
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

### mini

```bash
opencode mini
```

```bash
opencode mini --continue
```

```bash
opencode mini --model anthropic/claude-sonnet-5-5 --prompt "Summarize this repository"
```

```bash
opencode mini --session ses_4f2a1c
```

### session

```bash
opencode session list
```

```bash
opencode session list --max-count 20 --format json
```

Delete a session and its child sessions.

```bash
opencode session delete ses_9c1b08
```

Export session data as JSON.

```bash
opencode session export ses_4f2a1c
```

Redact sensitive transcript and file data when exporting.

```bash
opencode session export ses_4f2a1c --sanitize
```

Import session data from a JSON file or URL.

```bash
opencode session import session.json
```

```bash
opencode session import session.json --directory ~/code/project
```

### models

```bash
opencode models
```

### stats

```bash
opencode stats
opencode stats --days 7
opencode stats --models
opencode stats --cost
opencode stats --json
opencode stats --project .
```

### api

```bash
opencode api GET /api/session
```

```bash
opencode api session.list --param limit=10
```

```bash
opencode api session.create --data '{"title": "New session"}'
```

```bash
opencode api GET /api/session -H "accept: application/json"
```

Snippet taken from https://opencode.ai/docs/compaction/.

```bash
opencode api post /api/session/ses_example/compact --data '{}'
```

### reload

Reloads configuration without restarting the server.

```bash
opencode reload
```

### debug

```bash
opencode debug agents
```

List configuration sources.

```bash
opencode debug config
```

Show global paths, or print a single path.

```bash
opencode debug paths
opencode debug paths db
```

Print a path for use with other tools (Source: https://opencode.ai/docs/cli/).

```bash
sqlite3 "$(opencode debug paths db)"
```

The optional selector accepts `db`, `home`, `data`, `config`, `cache`, `state`, `tmp`, `bin`, `log`, or `repos`.

### upgrade

Upgrades OpenCode to the latest or a specific version. Alias: `update`.

```bash
opencode upgrade
```

```bash
opencode upgrade 2.0.21 --method bun
```

### uninstall

> **Warning**: Stops background services and removes the global cache directory, then uninstalls OpenCode. Session data, configuration, and state are not removed. Preview first with `--dry-run`.

```bash
opencode uninstall --dry-run
```

```bash
opencode uninstall
```

## Notes

- The job uses the default agent, which can edit files and run shell commands on the runner. For review-only runs, commit an agent that denies every action except reads (see the `reviewer` example in the agents page) and pass it with `--agent`.
- Adapted from the official docs: the GitHub Actions example adds `permissions: contents: read`, `persist-credentials: false`, a commit-SHA pin for `actions/checkout` (v4.4.0), and a version pin for `@opencode/cli`, because the agent can run shell commands with the job's credentials. It runs on pushes to `main` instead of `pull_request` because OpenCode loads project config and `.opencode/plugins/` from the checked-out tree, so pull request code would run with the provider API key.
- Shell prompt prefixes (`$ `) in the official examples are omitted so the blocks are copy-pasteable.
- `opencode uninstall` also accepts `--force` (`-f`) to skip confirmation for noninteractive removal (flag description only; no official command line shown).
- Package-manager installations are removed with the detected package manager. Curl installations print the final command to remove the executable manually.
- `opencode run --auto` approves permissions that are not explicitly denied; run it only in a disposable or sandboxed workspace.
- OpenCode CLI commands are distinct from Claude Code CLI (anthropic-claude-code) and Codex CLI (openai-codex).

## Related

- [install.md](./install.md)
- [server.md](./server.md)
- [auth.md](./auth.md)
