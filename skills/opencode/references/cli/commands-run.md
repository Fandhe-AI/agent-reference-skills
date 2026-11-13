---
source: https://opencode.ai/docs/cli/commands/#run
---

# opencode run

Sends a message and prints the reply without opening the interactive interface.

## Signature / Usage

Every command accepts `--help` for its full flag list, for example `opencode run --help`. Some server-backed commands accept `--standalone` to run a private server or `--server <url>` to target a specific one; check the command's help for its supported flags.

```bash
$ opencode run "Explain this repository"
```

### CI

In CI, pass a provider API key as a secret and use standalone mode so the private server receives it. For example, this GitHub Actions job reviews the checked-out repository:

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

Choose a model.

```bash
$ opencode run --model anthropic/claude-sonnet-5-5 "Refactor parseToken"
```

Continue the last session.

```bash
$ opencode run --continue "Now handle the expired case"
```

Emit newline-delimited JSON for scripts.

```bash
$ opencode run --format json "List the TODO comments"
```

Attach files to the message.

```bash
$ opencode run --file src/server.ts --file src/client.ts "Review these for bugs"
```

Run with a specific agent.

```bash
$ opencode run --agent build "Fix the failing test"
```

Continue a specific session.

```bash
$ opencode run --session ses_4f2a1c "Check edge cases"
```

Auto-approve permissions that are not explicitly denied.

```bash
$ opencode run --auto "Fix the failing test"
```

Create the session archived so scripted or CI runs stay out of session lists and the inbox. The session still exists: `opencode session list` includes it, and you can open it by ID.

```bash
$ opencode run --archived "Review this diff"
```

View all subcommands and flags.

```bash
$ opencode run --help
```

## Notes

- The job uses the default agent, which can edit files and run shell commands on the runner. For review-only runs, commit an agent that denies every action except reads (see the `reviewer` example in the agents page) and pass it with `--agent`.
- Adapted from the official docs: the GitHub Actions example adds `permissions: contents: read`, `persist-credentials: false`, a commit-SHA pin for `actions/checkout` (v4.4.0), and a version pin for `@opencode/cli`, because the agent can run shell commands with the job's credentials. It runs on pushes to `main` instead of `pull_request` because OpenCode loads project config and `.opencode/plugins/` from the checked-out tree, so pull request code would run with the provider API key.
- `--auto` approves permissions that are not explicitly denied; use it only in disposable or trusted environments.
- OpenCode commands are distinct from Claude Code CLI commands (anthropic-claude-code).

## Related

- [Overview](./overview.md)
- [Commands: mini](./commands-mini.md)
- [Commands: session](./commands-session.md)
