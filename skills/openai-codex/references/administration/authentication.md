# Authentication

Sign-in methods for ChatGPT web and Codex clients (desktop app, CLI, IDE extension) and how sign-in method determines applicable admin controls and data-handling policy.

## Overview

Codex supports two sign-in methods for local work: **ChatGPT sign-in** (subscription access, browser flow) and **API key** (usage-based access). The desktop app, Codex CLI, and IDE extension support both; Codex cloud requires ChatGPT sign-in.

- ChatGPT sign-in: usage follows ChatGPT workspace permissions, RBAC, and ChatGPT Enterprise retention/residency settings.
- API key: usage follows the API organization's own retention/data-sharing settings and is billed at standard API rates through the Platform account.

## Signature / Usage

```shell
# Codex CLI: browser-based ChatGPT sign-in
codex login

# Codex CLI: API key sign-in
printenv OPENAI_API_KEY | codex login --with-api-key

# Codex CLI: enterprise access token sign-in
printenv CODEX_ACCESS_TOKEN | codex login --with-access-token

# check / clear
codex login status
codex logout
```

## Credential storage

```toml
# file | keyring | auto
cli_auth_credentials_store = "keyring"
```

`file` writes `auth.json` under `CODEX_HOME` (default `~/.codex`); `keyring` uses the OS credential store; `auto` prefers the OS store, falling back to `auth.json`.

## Enforce a login method or workspace

```toml
forced_login_method = "chatgpt" # or "api"
forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
```

Mismatched credentials cause Codex to log the user out and exit. Typically applied via [managed configuration](./managed-configuration.md).

## Headless / device login

Preferred: device code authentication (beta) — enable in ChatGPT security settings or workspace permissions, then `codex login --device-auth`. Fallbacks: copy `~/.codex/auth.json` to the headless machine (via `scp` or a Docker `cp`), or forward the localhost OAuth callback over SSH (`ssh -L 1455:localhost:1455 user@remote`).

## Notes

- API key authentication supports local Codex workflows, but some ChatGPT-workspace/cloud-dependent features are limited or unavailable; some OpenAI-curated plugins requiring OAuth aren't available under API-key auth.
- Codex cloud requires MFA. Social-login (Google/Microsoft/Apple) users aren't required to enable MFA on the ChatGPT account itself but can via the provider; SSO organizations should enforce MFA at the IdP; email/password login requires MFA before Codex cloud access.
- Treat `~/.codex/auth.json` like a password — it contains access tokens; never commit, paste into tickets, or share in chat.
- Enterprise admins can grant the access-token permission for trusted non-interactive automation instead of browser sign-in — see [Access tokens](./access-tokens.md).

## Related

- [Access tokens](./access-tokens.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Managed configuration](./managed-configuration.md)
