---
source: https://opencode.ai/docs/cli/commands/#run
---

# GitHub Actions with opencode run

Review the default branch on every push using `opencode run` in standalone mode.

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

Emit newline-delimited JSON for scripts:

```bash
$ opencode run --format json "List the TODO comments"
```

Create the session archived so CI runs stay out of session lists:

```bash
$ opencode run --archived "Review this diff"
```

## Notes

- The job uses the default agent, which can edit files and run shell commands on the runner. For review-only runs, commit an agent that denies every action except reads (see the `reviewer` example in the agents page) and pass it with `--agent`.
- Adapted from the official docs: the GitHub Actions example adds `permissions: contents: read`, `persist-credentials: false`, a commit-SHA pin for `actions/checkout` (v4.4.0), and a version pin for `@opencode/cli`, because the agent can run shell commands with the job's credentials. It runs on pushes to `main` instead of `pull_request` because OpenCode loads project config and `.opencode/plugins/` from the checked-out tree, so pull request code would run with the provider API key.
- Pass the provider API key as a secret and use `--standalone` so the private server receives it.
- `--archived` sessions still exist: `opencode session list` includes them and they open by ID.
- The agent runs with the runner's authority (shell, files, network); restrict it with OpenCode `permissions` rules as well.
