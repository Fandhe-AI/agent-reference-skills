<!-- source: https://platform.claude.com/docs/en/managed-agents/self-hosted/configure / last verified: 2026-11-14 -->

# Single sign-on

Let people and services call a self-hosted Claude Managed Agents server with tokens from your OpenID Connect (OIDC) identity provider. The server maps groups in the token to a role; the server API key keeps working as an administrator credential.

## Signature / Usage

Add an issuer entry under `auth.issuers` in the settings file, restart the server, and send the token as `Authorization: Bearer <token>`:

```yaml
auth:
  issuers:
    - name: okta
      issuer_url: https://login.example.com/oauth2/default
      audiences: [api://cma-server]
      roles:
        - group: cma-admins
          role: admin
        - group: "eng-*"
          role: developer
```

Terminal login: add the registered application to the issuer entry and restart the server:

```yaml
login_client_id: 0oa1b2c3d4e5f6g7h8i9
login_scopes: [openid, cma-server.access]
```

Each developer runs the login from the top of the extracted archive:

```bash
./cma-server-admin login https://cma.example.com
```

## Options / Props

Issuer entry fields used here:

| Field | Description |
|-------|-------------|
| `name` | Labels the issuer in log lines and is recorded as part of each resource's creator. Don't change it once resources exist. |
| `issuer_url` | Must equal the `iss` claim of your tokens |
| `audiences` | Values a token's `aud` claim can carry |
| `roles` | Maps a group to `admin`, `developer`, or `user`; the highest matching role wins |
| `subject_claim` | Set to `oid` for Microsoft Entra ID |
| `groups_claim` | Set to `roles` for Entra ID app roles |
| `login_client_id` | Native application for the terminal login |
| `login_scopes` | Scopes the provider needs to issue a token whose `aud` is in `audiences`; add `offline_access` to have the `ant` CLI renew the token |

What each role can do:

| Role | Agents, skills, sessions, vaults, and memory stores | Environments |
|------|-----------------------------------------------------|--------------|
| `admin`, and the server API key | Sees and changes everything | Creates, changes, and deletes them, and creates their keys |
| `developer` or `user` | Sees and changes only what that caller created | Lists them, reads them, and runs sessions in them |

If sign-in fails:

| Response | Cause | Log line contains |
|----------|-------|-------------------|
| `401`, same as for a wrong API key | The token failed a check; the log line has the reason | `oidc token` |
| `403` | The token's groups match no `roles` entry | `token holds no role` |

Other redirect URIs for the terminal login:

| Provider | Redirect URI to register | Flag developers add to `login` |
|----------|--------------------------|--------------------------------|
| Microsoft Entra ID | `http://localhost/callback` | `-listen localhost:0` |
| One that requires the port in the redirect URI | A URI with a fixed port, such as `http://127.0.0.1:8123/callback` | `-listen 127.0.0.1:8123` |

## Notes

- Register the server in your identity provider as an API with an identifier such as `api://cma-server`, and have clients request tokens for it.
- For every request a token authenticated, the server logs `auth=oidc`, the issuer's `name`, and the caller's subject (`sub=`).
- Microsoft Entra ID: it gives a person a different `sub` per client application, so set `subject_claim: oid`. It omits the `groups` claim for people in many groups, so have Entra ID emit only groups assigned to the application, or assign app roles and set `groups_claim: roles`.
- `developer` and `user` have the same access. Such callers can't see resources created by someone else (including everything created with the server API key before single sign-on was turned on; the response matches an unknown ID) and can't share resources.
- Map `admin` to exact group names. An administrator can start a session that uses any user's vault, so give the role only to groups trusted with every user's MCP tokens.
- Terminal login: register a native ("public") application with no client secret, the authorization code grant with PKCE, and redirect URI `http://127.0.0.1/callback`. The server URL must be `https://`, or `http://` to `localhost`, `127.0.0.1`, or `::1`. The command opens the provider's sign-in page and writes an `ant` CLI profile named `cma-server`; pass `--profile cma-server` to any `ant` command or run `ant profile activate cma-server`. When the token expires, run `login` again. Add `-h` to list the other flags.
- The console on your server signs people in through the terminal-login application; see `./console.md`.
- Distinct from `self_hosted` environments / self-hosted sandboxes (workers; `../environments/self-hosted-sandboxes*.md`): here you host the whole service; with self-hosted sandboxes Anthropic hosts the service and you host only the tool-execution worker. Access to self-hosted Claude Managed Agents is requested through your Anthropic account team.
- Source: https://platform.claude.com/docs/en/managed-agents/self-hosted/configure.md (fetched 2026-11-14).

## Related

- [Overview](./overview.md)
- [Console on your server](./console.md)
- [Data and access](./data-and-access.md)
