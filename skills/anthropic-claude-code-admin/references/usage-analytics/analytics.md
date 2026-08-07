<!-- source: https://code.claude.com/docs/en/analytics.md / last verified: 2026-08-07 -->

# Track team usage with analytics

View Claude Code usage metrics, track adoption, and measure engineering velocity in the analytics dashboard.

## Signature / Usage

```text
Team/Enterprise dashboard: https://claude.ai/analytics/claude-code
Console (API) dashboard:   https://platform.claude.com/claude-code
```

Enable contribution metrics: install the Claude GitHub app (`github.com/apps/claude`) → enable Claude Code analytics at `claude.ai/admin-settings/claude-code` → enable GitHub analytics toggle → authenticate with GitHub and select organizations.

## Options / Props

| Metric | Description |
| --- | --- |
| PRs with CC | Merged PRs containing at least one Claude Code-assisted line |
| Lines of code with CC | Effective lines (>3 chars, non-trivial) written with Claude Code assistance |
| Suggestion accept rate | % of Edit/Write/NotebookEdit suggestions accepted |
| Leaderboard | Top 10 contributors by PR or line volume, with CSV export of all users |

## Notes

- Team/Enterprise dashboard requires Owner/Admin role; contribution metrics require Owner role plus a GitHub admin installing the app, and are unavailable with Zero Data Retention enabled.
- Attribution matches PR diff lines against Claude Code session output within a window of 21 days before to 2 days after merge; excludes lock files, generated code, build directories, and lines over 1000 characters.
- Console (API customers) dashboard shows usage/spend metrics only; contribution metrics with GitHub integration are not available there.
- On Enterprise, the Claude Enterprise Analytics API (`read:analytics` scope) returns per-user engagement/usage/cost reports across Claude surfaces, not just Claude Code.
- The organization-wide Claude Code Analytics API is out of scope for this skill; see `anthropic-admin-platform` for the cross-organization Admin/Analytics API surface.

## Related

- [monitoring-usage](./monitoring-usage.md)
- [costs](./costs.md)
