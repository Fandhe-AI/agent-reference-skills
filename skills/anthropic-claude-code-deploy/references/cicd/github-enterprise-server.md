<!-- source: https://code.claude.com/docs/en/github-enterprise-server.md / last verified: 2026-08-07 -->

# Claude Code with GitHub Enterprise Server

Connect Claude Code to a self-hosted GitHub Enterprise Server (GHES) instance for web sessions, Code Review, and plugin marketplaces. Available for Team and Enterprise plans.

## Signature / Usage

```bash
git clone git@github.example.com:platform/api-service.git
cd api-service
claude --cloud "Add retry logic to the payment webhook handler"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Claude Code on the web | feature | Supported; an Owner connects the GHES instance once, developers use `claude --cloud` or claude.ai/code as usual |
| Code Review | feature | Supported, same automated PR reviews as github.com |
| Claude Security | feature | Supported in public beta for Enterprise plans |
| Teleport sessions | feature | Supported via `--teleport` |
| Plugin marketplaces | feature | Supported; credential requirements differ by surface |
| Contribution metrics | feature | Supported via webhooks to the analytics dashboard |
| GitHub Actions | feature | Supported but requires manual workflow setup; `/install-github-app` is github.com only |
| GitHub MCP server | feature | Not supported on GHES; use `gh auth login --hostname github.example.com` instead |
| `extraKnownMarketplaces` | setting | Pre-registers a GHES marketplace so developers get it without manual setup; clones via the machine's existing git credentials |
| `strictKnownMarketplaces` (`hostPattern`) | setting | Allowlists all marketplaces from a GHES host without enumerating each repository |

## Notes

- Admin setup (Owner/Primary Owner role required): connect the instance from `claude.ai/admin-settings/claude-code`, create the GitHub App via the guided manifest redirect (or manual setup if redirects are blocked), install the app on repositories, then enable Code Review/Claude Security/contribution metrics.
- The GHES instance must be reachable from Anthropic infrastructure; allowlist the Anthropic API IP addresses if behind a firewall.
- GitHub Enterprise connections on claude.ai are per-user for marketplaces added from user settings — the admin org-level setup does not cover individual users' marketplace installs; marketplaces added by an Owner in organization plugin settings avoid this per-user requirement.
- Use a full git URL (not `owner/repo` shorthand, which always resolves to github.com) for GHES marketplaces; prefer HTTPS with a credential helper over SSH.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Code Review](./code-review.md)
