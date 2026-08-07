<!-- source: https://code.claude.com/docs/en/authentication.md / last verified: 2026-08-07 -->

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
| `apiKeyHelper` | string (script path) | Script returning an API key for dynamic/rotating credentials |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | env var | Custom refresh interval for `apiKeyHelper` (default: 5 min or on 401) |
| `CLAUDE_CODE_OAUTH_TOKEN` | env var | Long-lived (1 year) OAuth token from `claude setup-token`, for CI |

## Notes

- Authentication precedence (highest to lowest): cloud provider credentials → `ANTHROPIC_AUTH_TOKEN` → `ANTHROPIC_API_KEY` → `apiKeyHelper` → `CLAUDE_CODE_OAUTH_TOKEN` → subscription OAuth from `/login`. A signed-in Claude apps gateway session outranks all of these.
- `forceLoginMethod`/`forceLoginOrgUUID` enforcement differs by login path (terminal, VS Code, Agent SDK enforce both; `claude setup-token`/`/install-github-app` enforce only `forceLoginMethod`; gateway sign-in is selected by `forceLoginMethod: "gateway"` and doesn't check org UUID). Requires Claude Code v2.1.212+ for full-path enforcement.
- Credentials stored in macOS Keychain, or `~/.claude/.credentials.json` (Linux/Windows, mode 0600).
- `claude setup-token`-generated tokens can only make model requests; they can't establish Remote Control sessions or fetch claude.ai connectors.
- `/login` renewal warning appears within 3 days of expiry (v2.1.203+); `/status` shows an `Expired` row (v2.1.210+).

## Related

- [admin-setup](./admin-setup.md)
- [server-managed-settings](./server-managed-settings.md)
- [network-config](./network-config.md)
