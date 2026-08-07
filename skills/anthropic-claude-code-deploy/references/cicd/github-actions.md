<!-- source: https://code.claude.com/docs/en/github-actions.md / last verified: 2026-08-07 -->

# Claude Code GitHub Actions

Run Claude Code in GitHub Actions workflows to respond to `@claude` mentions, automate tasks, and turn issues into pull requests, via the `claude-code-action` workflow integration.

## Signature / Usage

```yaml
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

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `prompt` | input | Instructions for Claude, plain text or a skill invocation; when omitted, Claude waits for `@claude` (interactive mode) |
| `claude_args` | input | CLI arguments passed to Claude Code, e.g. `--max-turns 5 --model claude-sonnet-5 --mcp-config /path/to/config.json` |
| `anthropic_api_key` | input | Claude API key; required unless using `claude_code_oauth_token` or workload identity federation |
| `claude_code_oauth_token` | input | OAuth token for a Claude subscription, generated with `claude setup-token` |
| `github_token` | input | Token for GitHub operations; when omitted, authenticates as the Claude GitHub App |
| `plugin_marketplaces` / `plugins` | input | Newline-separated marketplace URLs / plugin names to install before execution |
| `settings` | input | Claude Code settings, as JSON string or path to a settings JSON file |
| `trigger_phrase` | input | Trigger phrase Claude responds to. Default: `@claude` |
| `use_bedrock` / `use_vertex` / `use_foundry` | input | Route inference through Amazon Bedrock / Google Cloud's Agent Platform / Microsoft Foundry instead of the Claude API |

## Notes

- Setup: quick setup via `/install-github-app` (installs GitHub App, adds secret, opens a workflow PR) or manual setup (install app, add `ANTHROPIC_API_KEY`/`CLAUDE_CODE_OAUTH_TOKEN` secret, copy `examples/claude.yml`).
- Interactive mode (no `prompt`) waits for `@claude`; automation mode (`prompt` set) runs unconditionally, subject to write-access and human-actor checks on the triggering actor.
- Organization-wide rollout: install the app once at org level, store the secret as an org-level Actions secret, and add the workflow (or a reusable workflow) to each repository; prefer an API key over an OAuth token for a shared secret, or use workload identity federation (`anthropic_federation_rule_id`, `anthropic_organization_id`, etc.) to avoid a stored secret entirely.
- GitHub doesn't trigger workflows on commits made with the default `GITHUB_TOKEN`; omit `github_token` or use a custom app token if you need CI to run on Claude's commits.
- The Claude GitHub App's permission set is shared across the Claude Code GitHub Action, Code Review, and web auto-fix; a narrower custom GitHub App (Contents, Issues, Pull requests only) covers just the Claude Code GitHub Action.
- Manage costs with `--max-turns`, workflow-level timeouts, and GitHub's concurrency controls; runs consume both GitHub Actions minutes and API tokens (or subscription usage with an OAuth token).

## Related

- [Use Claude Code GitHub Actions with cloud providers](./github-actions-cloud-providers.md)
- [Claude Code with GitHub Enterprise Server](./github-enterprise-server.md)
- [Code Review](./code-review.md)
