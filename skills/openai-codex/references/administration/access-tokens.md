# Access tokens

Create and manage Codex access tokens — ChatGPT workspace credentials scoped to Codex permissions — for programmatic, non-interactive Codex workflows.

## Overview

Codex access tokens authenticate trusted non-interactive local workflows (Codex CLI, app-server-based automation) with a ChatGPT workspace identity. Currently supported for ChatGPT Business and Enterprise workspaces. Created at [Access tokens](https://chatgpt.com/admin/access-tokens); tied to the creating user and their workspace.

Use a Workspace Agent access token (not a Codex access token) to trigger published ChatGPT workspace agents via the Workspace Agents API.

## Signature / Usage

```bash
export CODEX_ACCESS_TOKEN="<access-token>"
codex exec --json "review this repository and summarize the top risks"
```

Persistent local login:

```bash
printf '%s' "$CODEX_ACCESS_TOKEN" | codex login --with-access-token
codex exec "summarize the last release diff"
```

## Enable, expire, create, rotate

1. **Enable creation**: Workspace Settings > Permissions & roles > Access tokens > **Allow users to create access tokens**. Also enable **Allow members to use Codex Local** if the workflow needs desktop app / CLI / IDE extension access.
2. **Set expiration limit**: Workspace Settings > Permissions & roles > Codex Local > **Access token expiration limit** (applies to new tokens only).
3. **Create**: [Access tokens](https://chatgpt.com/admin/access-tokens) > Create > name it (e.g. `release-ci`) > choose expiration (prefer finite, e.g. 7/30/60/90 days; shortest is 1 day) > copy immediately (not retrievable later).
4. **Rotate**: create replacement > update secret in runner/scheduler > smoke test > revoke old token.

## Permission model

| Capability | Owners/admins | Member with token permission | Member without |
|------------|----------------|-------------------------------|-----------------|
| Open Access tokens page | Yes | Yes | No |
| Create access tokens | Yes (own identity) | Yes (own identity) | No |
| List access tokens | Workspace-wide | Only own | No |
| Revoke from Access tokens page | Any workspace token | Only own | No page access |
| Grant/remove access token permission | Yes | No | No |

## Notes

- The access token permission controls token creation only — it doesn't grant desktop app / CLI / IDE extension access, and doesn't change seat type, workspace role, or local permission profile.
- Main risks: leaked secrets, untrusted CI runners exposing tokens, shared identities, stale long-lived credentials, using the wrong credential type (use Platform API keys for general API calls, Workspace Agent tokens to trigger agents).
- `codex app-server` can use the same `CODEX_ACCESS_TOKEN` credential for OpenAI requests, but that is separate from client-to-app-server transport authentication (see App server docs for the remote WebSocket bearer/capability token).

## Related

- [Authentication](./authentication.md)
- [Admin rollout guide](./admin-rollout-guide.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Governance](./governance.md)
