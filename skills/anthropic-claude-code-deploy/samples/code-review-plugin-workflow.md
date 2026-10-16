<!-- source: https://code.claude.com/docs/en/github-actions.md / last verified: 2026-10-16 -->

# Run the code-review plugin with claude-code-action

A GitHub Actions workflow that installs the `code-review` plugin and runs its skill on every pull request, posting findings as inline comments.

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize, ready_for_review, reopened]
jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
      issues: read
      id-token: write
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          plugin_marketplaces: "https://github.com/anthropics/claude-code.git"
          plugins: "code-review@claude-code-plugins"
          prompt: "/code-review:code-review --comment ${{ github.repository }}/pull/${{ github.event.pull_request.number }}"
          claude_args: '--allowedTools "mcp__github_inline_comment__create_inline_comment"'
```

## Notes

- `--comment` makes Claude post its review on the pull request (an inline comment per issue, or one summary comment when none are found); without it nothing is posted and findings appear only in the workflow run log.
- Keep the `claude_args` line even though the skill's `allowed-tools` frontmatter names the same tool: the action starts the MCP server that posts inline comments only when `--allowedTools` in `claude_args` names it.
- On public repositories GitHub withholds secrets from fork pull request runs, so the review runs only on PRs from branches in the same repository. Claude skips draft and closed PRs, PRs it judges not to need review, and PRs that already have a comment from Claude.
- The `plugins` input takes `plugin-name@marketplace-name`, where the marketplace name comes from the marketplace's own manifest rather than its repository URL. For a skill in the repo's own `.claude/skills/`, run `actions/checkout` first and pass `/skill-name` as `prompt`.
- This is self-managed; the managed Code Review GitHub App service is covered in `code-review-automation.md`.
