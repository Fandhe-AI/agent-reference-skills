<!-- source: https://code.claude.com/docs/en/authentication.md / last verified: 2026-10-16 -->

# Authentication

Log in to Claude Code and configure authentication for individuals, teams, and organizations.

## Signature / Usage

```bash
claude          # opens browser login on first launch
/logout         # log out and re-authenticate
claude setup-token   # generate a long-lived OAuth token for CI
export CLAUDE_CODE_OAUTH_TOKEN=your-token
```

Account types: Claude Pro/Max subscription, Claude for Teams/Enterprise, Claude Console, cloud providers (Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry), Claude apps gateway (corporate SSO).

## Options / Props

| Setting | Type | Description |
| --- | --- | --- |
| `forceLoginMethod` | string | Restrict login to a specific method (e.g. `"gateway"`) |
| `forceLoginOrgUUID` | string | Restrict login to a specific Anthropic organization |
| `forceLoginGatewayUrl` | string | Behaves like `forceLoginMethod: "gateway"`: the session uses only the gateway sign-in (v2.1.261+; v2.1.265+ on a machine that sets only this key) |
| `allowedProviders` | string[] | Limit which API providers a machine may use, e.g. `["anthropic", "bedrock"]`; `"customEndpoint"` allows an LLM gateway/proxy (v2.1.285+) |
| `ANTHROPIC_PROFILE` | env var | Name of an Anthropic profile (ant CLI / WIF) to use; ranks above `/login` |
| `ANTHROPIC_FEDERATION_RULE_ID` + `ANTHROPIC_ORGANIZATION_ID` | env vars | Both set: Workload Identity Federation credentials; rank above `/login` |
| `CLAUDE_CONFIG_DIR` | env var | Separate configuration directory per account (own settings, history, login); also relocates `.credentials.json` and keys the macOS Keychain entry |
| `apiKeyHelper` | string (script path) | Script returning an API key for dynamic/rotating credentials |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | env var | Custom refresh interval for `apiKeyHelper` (default: 5 min or on 401) |
| `CLAUDE_CODE_OAUTH_TOKEN` | env var | Long-lived (1 year) OAuth token from `claude setup-token`, for CI |

## Notes

- Authentication precedence (highest to lowest, 7 steps): (1) cloud provider credentials (`CLAUDE_CODE_USE_BEDROCK` / `_VERTEX` / `_FOUNDRY`) → (2) `ANTHROPIC_AUTH_TOKEN` → (3) `ANTHROPIC_API_KEY` → (4) `apiKeyHelper` → (5) `CLAUDE_CODE_OAUTH_TOKEN` → (6) Anthropic profile and federation credentials → (7) subscription OAuth from `/login`. A signed-in Claude apps gateway session outranks all of these.
- Profile / federation sources (step 6; the credentials the `ant` CLI and Workload Identity Federation use), checked in this order, stopping at the first set: a named profile (`ANTHROPIC_PROFILE`, above `/login` for either auth mode); federation variables (`ANTHROPIC_FEDERATION_RULE_ID` and `ANTHROPIC_ORGANIZATION_ID`, both set; above `/login`); the active profile (the `active_config` file in the Anthropic configuration directory, or a profile named `default`; above `/login` when its auth mode is `oidc_federation`, below a working `/login` credential when `user_oauth`). A profile that `ant auth login` wrote ranks here only when named in `ANTHROPIC_PROFILE`. The Anthropic configuration directory defaults to `~/.config/anthropic` (macOS/Linux) or `%APPDATA%\Anthropic` (Windows). Not read in bare mode, Claude Desktop, or cloud sessions (no `Profile` row in `/status`). While one of these sources is selected, features that need a claude.ai login (claude.ai connectors, `/schedule`) are unavailable.
- Console sign-in without an API key (v2.1.242+): choose the Console account at `/login`; "Sign in with your Console account" `(recommended)` stores the OAuth token as an Anthropic profile and creates no API key, "Create an API key" `(legacy)` creates a Console API key. The choice isn't offered (an API key is created) on cloud providers or Claude Platform on AWS, when any settings file sets `forceLoginOrgUUID` or sets `forceLoginMethod` to `"claudeai"` / `"console"`, or when a managed settings source exists but can't be read. Unset `ANTHROPIC_API_KEY` first. Signing in this way signs you out of any claude.ai login on the machine; `/logout` removes and revokes the credential.
- Restrict which API providers a machine may use: `allowedProviders` in managed settings (v2.1.285+) complements `forceLoginMethod` / `forceLoginOrgUUID` (which govern which account is used with Anthropic). A session on an unlisted provider is refused at startup, and a running session that switches is refused on its next request. List `"customEndpoint"` plus the gateway URL in the managed `env` block to allow an LLM gateway. A list set only in server-managed settings reaches only sessions that fetch them, so it is a convenience, not enforcement.
- Multiple accounts: set `CLAUDE_CONFIG_DIR` per account (e.g. `alias claude-work='CLAUDE_CONFIG_DIR=~/.claude-work claude'`). Separate directories don't keep two keyless Console sign-ins apart, because that kind of sign-in is stored outside the configuration directory.
- Cloud sessions always use subscription credentials; `ANTHROPIC_API_KEY` / `ANTHROPIC_AUTH_TOKEN` set in the cloud environment don't override them. Claude Desktop and cloud sessions don't call `apiKeyHelper` or read those variables.
- `forceLoginMethod`/`forceLoginOrgUUID` enforcement differs by login path (terminal, VS Code, Agent SDK enforce both; `claude setup-token`/`/install-github-app` enforce only `forceLoginMethod`; gateway sign-in is selected by `forceLoginMethod: "gateway"` and doesn't check org UUID). Requires Claude Code v2.1.212+ for full-path enforcement.
- Credentials are stored in the macOS Keychain; when the Keychain rejects the write (e.g. locked in an SSH session) Claude Code falls back to `~/.claude/.credentials.json` (mode `0600`), and a Console login that creates an API key fails until the Keychain is writable. Linux: `~/.claude/.credentials.json` (mode `0600`). Windows: `%USERPROFILE%\.claude\.credentials.json` (inherits user-profile access controls). With `CLAUDE_CONFIG_DIR` set the file lives under that directory and the Keychain entry is keyed to it.
- `claude setup-token`-generated tokens can only make model requests; they can't establish Remote Control sessions or fetch claude.ai connectors.
- `/login` renewal warning appears within 3 days of expiry (v2.1.203+); `/status` shows an `Expired` row (v2.1.210+).

## Related

- [admin-setup](./admin-setup.md)
- [server-managed-settings](./server-managed-settings.md)
- [network-config](./network-config.md)
