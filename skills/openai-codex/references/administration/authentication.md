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
# file | keyring | auto | ephemeral
cli_auth_credentials_store = "keyring"
```

`file` writes `auth.json` under `CODEX_HOME` (default `~/.codex`); `keyring` uses the OS credential store and fails if it is unavailable; `auto` prefers the OS store, falling back to `auth.json`; `ephemeral` keeps credentials in memory for the current process only.

## Enforce a login method or workspace

```toml
forced_login_method = "chatgpt" # or "api"
forced_chatgpt_workspace_id = "00000000-0000-0000-0000-000000000000"
```

Mismatched credentials cause Codex to log the user out and exit. Typically applied via [managed configuration](./managed-configuration.md).

## Headless / device login

Preferred: device code authentication (beta) — enable in ChatGPT security settings or workspace permissions, then `codex login --device-auth`. Fallbacks: copy `~/.codex/auth.json` to the headless machine (via `scp` or a Docker `cp`), or forward the localhost OAuth callback over SSH (`ssh -L 1455:localhost:1455 user@remote`).

## Additional details

- Gateways and Bedrock: for a local client using an organization-provided model gateway choose "Sign in with ChatGPT through a gateway" or "API/provider credentials" (connect-to-a-gateway.md); direct Bedrock access uses the Amazon Bedrock authentication options (see config/amazon-bedrock.md).
- Sign-in surfaces: desktop app and IDE extension use **Continue to sign in** / **Sign in with ChatGPT** on the signed-out screen; the CLI uses `codex login`. API key: desktop app **Sign in another way**; IDE extension **Use API Key**; CLI `printenv OPENAI_API_KEY | codex login --with-api-key`. API key usage is billed at standard API rates instead of included ChatGPT plan credits; use API keys for programmatic CLI workflows such as CI/CD and don't expose Codex execution in untrusted or public environments. API keys and Codex access tokens don't enable Local computer access with Work Cloud.
- Check or sign out: `codex login status`, `codex logout` (rejected when the process selects workload identity). Direct `codex login` runs write a dedicated `codex-login.log` under your log directory.
- Login caching: the CLI and extension share cached login details (in plaintext `~/.codex/auth.json` or the OS credential store); logging out from either requires signing in again; ChatGPT sessions refresh tokens automatically before they expire.
- Custom CA bundles: set `CODEX_CA_CERTIFICATE` to a PEM bundle before logging in (`export CODEX_CA_CERTIFICATE=/path/to/corporate-root-ca.pem; codex login`); falls back to `SSL_CERT_FILE`; applies to login, normal HTTPS requests, and secure WebSocket connections.
- Fallback: authenticate locally and copy your auth cache: run `codex login` on a machine with a browser, confirm `~/.codex/auth.json` exists, and copy it to the same path on the headless machine (e.g. `ssh user@remote 'mkdir -p ~/.codex'` then `scp ~/.codex/auth.json user@remote:~/.codex/auth.json`, or `ssh user@remote 'mkdir -p ~/.codex && cat > ~/.codex/auth.json' < ~/.codex/auth.json`, or `docker cp ~/.codex/auth.json MY_CONTAINER:"$CONTAINER_HOME/.codex/auth.json"`). Doesn't apply if your OS stores credentials in a credential store instead of `auth.json`. For trusted CI/CD runners see "Maintain Codex account auth in CI/CD (advanced)"; API keys remain the recommended default for automation.
- Fallback: forward the localhost callback over SSH (default `localhost:1455`): `ssh -L 1455:localhost:1455 user@remote`, then run `codex login` in that SSH session and follow the printed address on your local machine. Headless login is needed when you run the CLI remotely or local networking blocks the localhost callback.
- Device code authentication (beta): enable it in ChatGPT security settings (personal) or workspace permissions (workspace admin), then choose **Sign in with Device Code** in the login UI or run `codex login --device-auth`, open the link, and enter the one-time code.
- Alternative model providers: with `requires_openai_auth = true` Codex uses OpenAI authentication (sign in with ChatGPT or an API key; useful through an LLM proxy server) and ignores `env_key`; `env_key = "<ENV_VARIABLE_NAME>"` uses a provider-specific key from that environment variable; with neither set Codex assumes the provider needs no authentication (useful for local models).
- Codex cloud MFA: if your account supports more than one login method and one is email and password, you must set up MFA before accessing Codex even if you sign in another way.
- Mismatched forced login method or workspace restrictions make Codex log the user out and exit; the same can be supplied through legacy managed configuration, and admin-enforced login restrictions are in managed-configuration.md ("Manage authentication locally"). Admins can enforce `cli_auth_credentials_store` and `chatgpt_base_url` through local authentication requirements users can't override.

## Notes

- API key authentication supports local Codex workflows, but some ChatGPT-workspace/cloud-dependent features are limited or unavailable; some OpenAI-curated plugins requiring OAuth aren't available under API-key auth.
- Codex cloud requires MFA. Social-login (Google/Microsoft/Apple) users aren't required to enable MFA on the ChatGPT account itself but can via the provider; SSO organizations should enforce MFA at the IdP; email/password login requires MFA before Codex cloud access.
- Treat `~/.codex/auth.json` like a password — it contains access tokens; never commit, paste into tickets, or share in chat.
- Set `CODEX_CA_CERTIFICATE` to a PEM bundle for corporate proxies or private root CAs (falls back to `SSL_CERT_FILE`). When workload identity is selected, `codex login` and `codex logout` are rejected. Admins can also enforce `cli_auth_credentials_store` and `chatgpt_base_url` through local authentication requirements that users cannot override.
- Enterprise admins can grant the access-token permission for trusted non-interactive automation instead of browser sign-in — see [Access tokens](./access-tokens.md).

## Related

- [Access tokens](./access-tokens.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Managed configuration](./managed-configuration.md)
