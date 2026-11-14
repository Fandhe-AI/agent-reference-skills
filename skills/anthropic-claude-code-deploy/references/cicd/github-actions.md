<!-- source: https://code.claude.com/docs/en/github-actions.md / last verified: 2026-11-14 -->

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
| `claude_code_oauth_token` | input | OAuth token for a Claude subscription (Pro, Max, Ultra, Team, and Enterprise plans), generated with `claude setup-token` |
| `anthropic_federation_rule_id` / `anthropic_organization_id` | input | Workload identity federation: federation rule ID (`fdrl_...`) and your Anthropic organization ID |
| `anthropic_service_account_id` / `anthropic_workspace_id` | input | Workload identity federation, both optional: service account ID (`svac_...`, optional since the federation rule already targets a service account) and workspace ID (`wrkspc_...`, optional when the rule targets a single workspace) |
| `github_token` | input | Token for GitHub operations; when omitted, authenticates as the Claude GitHub App |
| `plugin_marketplaces` / `plugins` | input | Newline-separated marketplace URLs / plugin names to install before execution |
| `settings` | input | Claude Code settings, as JSON string or path to a settings JSON file |
| `trigger_phrase` | input | Trigger phrase Claude responds to. Default: `@claude` |
| `allowed_non_write_users` | input | Users without write access who may trigger Claude on issue and pull request events; requires your own `github_token` |
| `allowed_bots` | input | Bot actors allowed to trigger Claude (bots are rejected by default); also needed when a scheduled run is attributed to a bot, usually the user who last changed the workflow's `cron` |
| `use_bedrock` / `use_vertex` / `use_foundry` | input | Route inference through Amazon Bedrock / Google Cloud's Agent Platform / Microsoft Foundry instead of the Claude API |

## Notes

- Setup: quick setup via `/install-github-app` (installs GitHub App, adds secret, opens a workflow PR) or manual setup (install app, add `ANTHROPIC_API_KEY`/`CLAUDE_CODE_OAUTH_TOKEN` secret, copy `examples/claude.yml`).
- Quick setup prerequisites: install the GitHub CLI and authenticate with `gh auth login` (Claude Code warns if it's missing). `/install-github-app` works only with github.com repositories; if the git remote is on gitlab.com or bitbucket.org it prints a notice and exits. Pressing Esc stops setup after the step in progress and the closing message lists what already happened (such as a pushed branch or saved secret). After installing the GitHub App, **Skip for now** stops with only the app installed; run `/install-github-app` again later to finish.
- From v2.1.229, the quick-setup review workflow posts each review on the pull request (an inline comment per issue, or one summary comment when none); before v2.1.229 it wrote only to the workflow run log. To update an older workflow, run `/install-github-app` again and select "Update workflow file with latest version".
- Review workflow using the code-review plugin: `plugin_marketplaces: "https://github.com/anthropics/claude-plugins-official.git"`, `plugins: "code-review@claude-plugins-official"` (the `plugins` input takes `plugin-name@marketplace-name`, where the marketplace name comes from the marketplace's own manifest rather than its repository URL; earlier versions of this page used `claude-code.git` / `code-review@claude-code-plugins`), `prompt: "/code-review:code-review --comment <repo>/pull/<n>"`, and `claude_args: '--allowedTools "mcp__github_inline_comment__create_inline_comment"'`. Keep `claude_args`: the MCP server that posts inline comments starts only when `--allowedTools` there names it. Without `--comment`, nothing is posted. Claude skips draft and closed pull requests, ones it judges not to need review, and ones that already have a Claude comment.
- Upgrade from beta: change `@beta` to `@v1`, remove `mode`, replace `direct_prompt` with `prompt`, move `max_turns` / `model` into `claude_args`, and turn `custom_instructions` into `--append-system-prompt`.
- Used together with Code Review: with the default `@claude` trigger phrase in interactive mode, an `@claude review` comment also starts the Action; set `trigger_phrase` to a different phrase to keep the two apart.
- Interactive mode (no `prompt`) waits for the trigger phrase (`@claude` by default) in an issue or PR comment, a PR review, or the body or title of a newly opened issue; automation mode (`prompt` set) runs without waiting for a mention, subject to write-access and human-actor checks on the triggering actor. Automation-mode results appear in the workflow run log unless the prompt directs Claude to post and it has a tool that can.
- Who can trigger runs: on issue and pull request events the triggering user needs write access (events no user authors, such as `schedule`, skip this check; use `allowed_non_write_users` plus your own `github_token` for exceptions). On every event a bot actor is rejected unless listed in `allowed_bots`; scheduled runs are attributed to a repository user, usually the one who last changed the `cron` line.
- Plain-text `prompt` in automation mode gives Claude no shell or GitHub API access until you grant tools with `--allowedTools` in `claude_args` or a `permissions.allow` rule in the `settings` input; a skill invocation can use the tools its `allowed-tools` frontmatter grants. Scheduled workflows run only from the default branch, and in public repositories the schedule is disabled after 60 days without repository activity. Example `claude_args` from the official daily-report workflow (`schedule` / `cron: "0 9 * * *"`): `--model claude-opus-5-5` and `--allowedTools "mcp__github__list_commits,mcp__github__list_issues"`.
- Running a skill: for a skill in the repository's `.claude/skills/`, run `actions/checkout` first and pass `/skill-name` as `prompt`; for a plugin skill, install the plugin with `plugin_marketplaces` / `plugins` and pass `/plugin-name:skill-name`. On public repositories GitHub withholds secrets from fork pull request runs, so the review workflow runs only on same-repository branches.
- Organization-wide rollout: install the app once at org level, store the secret as an org-level Actions secret, and add the workflow (or a reusable workflow) to each repository; prefer an API key over an OAuth token for a shared secret, or use workload identity federation (`anthropic_federation_rule_id`, `anthropic_organization_id`, etc.) to avoid a stored secret entirely.
- GitHub doesn't trigger workflows on commits made with the default `GITHUB_TOKEN`; omit `github_token` or use a custom app token if you need CI to run on Claude's commits.
- The Claude GitHub App's permission set is shared across the Claude Code GitHub Action, Code Review, and web auto-fix; a narrower custom GitHub App (Contents, Issues, Pull requests only) covers just the Claude Code GitHub Action (Code Review and web auto-fix still need the official app). Installing the app accepts its full set: Actions (read and write), Administration (read), Checks (read and write), Contents (read and write), Dependabot alerts (read), Discussions (read and write), Issues (read and write), Members (read), Merge queues (read), Metadata (read), Pull requests (read and write), Repository creation (read and write), Repository hooks (read and write), Statuses (read), Workflows (read and write). When the app later requests a new permission, GitHub asks the account or organization owner to approve it and the installation keeps its old permissions until then.
- Uninstall: delete the workflows that use `anthropics/claude-code-action` (quick setup creates `claude.yml` and, if selected, `claude-code-review.yml`); delete the `ANTHROPIC_API_KEY` / `CLAUDE_CODE_OAUTH_TOKEN` secret (repository and organization level; the credential itself stays valid, so also delete the key in the Claude Console to retire it); uninstall the Claude GitHub App only if no other Claude feature (Code Review, web auto-fix) uses it. With a cloud provider, also delete `AWS_ROLE_TO_ASSUME`, the `GCP_*` / `AZURE_*` secrets, and any custom GitHub App with its `APP_ID` / `APP_PRIVATE_KEY` secrets.
- Quick setup secret handling: if Claude Code already has an API key it reuses it and offers to keep an existing repository `ANTHROPIC_API_KEY` secret; otherwise choose between a long-lived subscription token (saved as `CLAUDE_CODE_OAUTH_TOKEN`) and a pasted API key (saved as `ANTHROPIC_API_KEY`). To update a review workflow generated earlier, you can alternatively add the `--comment` argument and the `claude_args` line to the checked-in file yourself.
- Troubleshooting: confirm the comment contains `@claude` as a complete word (not `/claude` or `@claude-bot`) and the commenter has write access; if CI doesn't run on Claude's commits, remove `github_token: ${{ secrets.GITHUB_TOKEN }}` (so it authenticates as the Claude GitHub App) or pass a custom app token, and check your CI triggers include the events Claude's pushes produce. `claude_args` accepts any CLI argument (`--max-turns`, `--model`, `--mcp-config`, `--allowedTools` / `--allowed-tools`, `--debug`); without `--model` the Action uses the Claude Code default model.
- Manage costs with `--max-turns`, workflow-level timeouts, and GitHub's concurrency controls; runs consume both GitHub Actions minutes and API tokens (or subscription usage with an OAuth token).
- Source: https://code.claude.com/docs/en/github-actions.md, fetched 2026-11-14.

## Related

- [Use Claude Code GitHub Actions with cloud providers](./github-actions-cloud-providers.md)
- [Claude Code with GitHub Enterprise Server](./github-enterprise-server.md)
- [Code Review](./code-review.md)
