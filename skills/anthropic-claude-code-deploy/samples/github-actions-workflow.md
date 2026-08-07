<!-- source: https://code.claude.com/docs/en/github-actions.md / last verified: 2026-08-07 -->

# Respond to @claude mentions in GitHub Actions

Minimal `claude-code-action` workflow that runs Claude in interactive mode whenever someone mentions `@claude` in an issue or PR comment.

```yaml .github/workflows/claude.yml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

## Notes

- `id-token: write` is required for the action's default GitHub App authentication; `actions: read` lets Claude read CI results on PRs.
- `if: contains(github.event.comment.body, '@claude')` keeps runners from starting on unrelated comments; the action also checks the trigger phrase itself before responding.
- Interactive mode (no `prompt` input) waits for `@claude`; setting a `prompt` input switches the action to automation mode, which runs unconditionally subject to write-access and human-actor checks.
- Authenticating with a Claude subscription instead of an API key: replace `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}` with `claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}` (token generated locally with `claude setup-token`).
- Quick setup: run `/install-github-app` from Claude Code to install the GitHub App, add the secret, and open a workflow PR automatically.
