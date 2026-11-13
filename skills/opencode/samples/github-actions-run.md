---
source: https://opencode.ai/docs/cli/commands/#run
---

# GitHub Actions with opencode run

Review the checked-out repository on every pull request using `opencode run` in standalone mode.

```yaml
name: OpenCode review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install --global @opencode/cli
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

- Pass the provider API key as a secret and use `--standalone` so the private server receives it.
- `--archived` sessions still exist: `opencode session list` includes them and they open by ID.
- The agent runs with the runner's authority (shell, files, network); restrict it with `permissions` rules and pin the action to a commit SHA and the CLI to a version in production workflows.
