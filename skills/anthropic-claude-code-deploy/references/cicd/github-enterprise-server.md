<!-- source: https://code.claude.com/docs/en/github-enterprise-server.md / last verified: 2026-11-14 -->

# Claude Code with GitHub Enterprise Server

Connect Claude Code to a self-hosted GitHub Enterprise Server (GHES) instance for cloud sessions, Code Review, and plugin marketplaces. Available for Team and Enterprise plans.

## Signature / Usage

```bash
git clone git@github.example.com:platform/api-service.git
cd api-service
claude --cloud "Add retry logic to the payment webhook handler"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Cloud sessions | feature | Supported; an Owner connects the GHES instance once, developers use `claude --cloud` or claude.ai/code as usual |
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
- GitHub App permissions set by the manifest: Contents (read and write), Pull requests (read and write), Issues (read and write), Checks (read and write), Actions (read), Commit statuses (read), Repository hooks (read and write; used for a webhook on a plugin marketplace repository when **Sync automatically** is on), Metadata (read), Organization members (read). Subscribed events: `pull_request`, `issue_comment`, `pull_request_review_comment`, `pull_request_review`, `check_run`, `status`. GitHub applies a manifest only at app creation, so an app created from an earlier manifest keeps its old permissions and events; add missing ones in the app's settings on GHES (each installation's owner must then approve them).
- Manual setup (when the manifest redirect is blocked): choose **Add manually**, create the GitHub App on GHES with the permissions and events above, then enter display name, hostname and optional port, app ID, client ID, client secret, webhook secret, private key (optional custom CA certificate and read replica hostnames). After **Add configuration**, use the connection's **More options** > **Copy webhook URL** and paste it into the app's webhook settings with the same webhook secret.
- Network: Anthropic-hosted sessions need the GHES instance reachable from Anthropic infrastructure. Hosted pre-session flows such as the repository picker run on Anthropic's side even when the session runs in a self-hosted environment, and the SCM connector isn't available, so they can't reach an internally-routable-only GHES host. A self-hosted-environment runner using the Anthropic git proxy needs the same reachability.
- Developer workflow: Claude Code detects the GHES hostname from the git remote; `claude --teleport` pulls a cloud session into the terminal after verifying you're in a checkout of the same GHES repository.
- `/install-github-app` is github.com only; for GitHub Actions on GHES adapt `examples/claude.yml` manually. The GitHub MCP server doesn't work with GHES; use the `gh` CLI after `gh auth login --hostname github.example.com`.
- Marketplace surfaces: CLI/desktop and managed settings (`extraKnownMarketplaces`) clone with the machine's existing git credentials (a machine without credentials registers the marketplace but never installs it; plugins report as not found); claude.ai organization plugin settings use the GitHub App (Owner needs their own GitHub Enterprise account connected at add time and the app installed on the marketplace repository); claude.ai user settings use the submitting user's own connection; cloud sessions are not reliable for GHES-hosted marketplaces. SSH marketplace URLs are rejected unless the host is in `known_hosts` (Claude Code runs git non-interactively), so prefer HTTPS with a credential helper. Allowlist a whole host with `strictKnownMarketplaces` entry `{"source": "hostPattern", "hostPattern": "^github\\.example\\.com$"}`; if `/plugin marketplace add` is blocked by policy, ask your admin to add that entry.
- Troubleshooting: "Marketplace couldn't be added" on claude.ai usually means your own GitHub Enterprise account isn't connected (the Browse tab's "Connect to GitHub" signs in to github.com, not GHES); connect it from the repository picker on claude.ai/code or, as an Owner, from Organization settings > Git providers. If the connection test passes but a second test fails (`Connection test passed, but a second test failed.`), allow all of Anthropic's outbound IP addresses, since the first test can pass while the firewall blocks some of them; `...a second test could not run.` means retry in a few minutes. Re-test via **More options** > **Test connection**. A clone error in `claude --cloud` also means checking that the hostname registered in Claude settings matches the git remote and the app is installed on the repository.
- GitHub Enterprise connections on claude.ai are per-user for marketplaces added from user settings — the admin org-level setup does not cover individual users' marketplace installs; marketplaces added by an Owner in organization plugin settings avoid this per-user requirement.
- Use a full git URL (not `owner/repo` shorthand, which always resolves to github.com) for GHES marketplaces; prefer HTTPS with a credential helper over SSH.
- Source: https://code.claude.com/docs/en/github-enterprise-server.md, fetched 2026-11-14. The Ultrareview note above comes from https://code.claude.com/docs/en/ultrareview.md.

## Related

- [Claude Code GitHub Actions](./github-actions.md)
- [Code Review](./code-review.md)
- [Set up Code Review](./code-review-setup.md)
