<!-- source: https://code.claude.com/docs/en/github-enterprise-server.md / last verified: 2026-10-16 -->

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
| Contribution metrics | feature | Not supported (requires repositories hosted on github.com); the analytics dashboard still shows usage metrics for work in GHES repositories |
| GitHub Actions | feature | Supported but requires manual workflow setup; `/install-github-app` is github.com only |
| GitHub MCP server | feature | Not supported on GHES; use `gh auth login --hostname github.example.com` instead |
| `extraKnownMarketplaces` | setting | Pre-registers a GHES marketplace so developers get it without manual setup; clones via the machine's existing git credentials |
| `strictKnownMarketplaces` (`hostPattern`) | setting | Allowlists all marketplaces from a GHES host without enumerating each repository |

## Notes

- Admin setup (Owner/Primary Owner role required): open Organization settings > Git providers (`claude.ai/admin-settings/source-control#github-enterprise`), click Connect (or Add instance) and select Set up automatically, enter a display name of up to 20 characters and the GHES hostname (optional CA certificate field for a self-signed or private CA), create the GitHub App via the manifest redirect (or Add manually if redirects are blocked), install the app on repositories, then enable Code Review at `claude.ai/admin-settings/claude-code` (see `code-review-setup.md`).
- The GHES instance must be reachable from Anthropic infrastructure; allowlist Anthropic's outbound IP addresses (https://platform.claude.com/docs/en/api/ip-addresses#outbound-ip-addresses) if behind a firewall. Sessions in a self-hosted environment reach GHES from inside your network; when one can't clone, check the runner's own network path.
- Ultrareview PR mode doesn't support GHES; run `/code-review ultra` without a PR number to review the local branch instead (see `ultrareview.md`).
- Troubleshooting: "Authentication failed while accessing the repository" means your own GitHub Enterprise account isn't connected (connect it from the repository picker on claude.ai/code, then start a new session). "Unable to get organization UUID" means Claude Code couldn't read a claude.ai organization from your credentials; `/login` with an account in your Team or Enterprise organization.
- GitHub Enterprise connections on claude.ai are per-user for marketplaces added from user settings — the admin org-level setup does not cover individual users' marketplace installs; marketplaces added by an Owner in organization plugin settings avoid this per-user requirement.
- Use a full git URL (not `owner/repo` shorthand, which always resolves to github.com) for GHES marketplaces; prefer HTTPS with a credential helper over SSH.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Code Review](./code-review.md)
- [Set up Code Review](./code-review-setup.md)
