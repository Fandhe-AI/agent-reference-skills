# Self-host Codex configuration for your team

Distribute Codex configuration to the CLI and desktop app from an HTTPS server you operate, for teams that don't sign in to Codex with ChatGPT.

## Signature / Usage

Point Codex at the server in the system `requirements.toml` (`/etc/codex/requirements.toml` on Linux and macOS, `%ProgramData%\OpenAI\Codex\requirements.toml` on Windows; on macOS also via managed preferences):

```toml
[config_server]
base_url = "https://codex-config.example.com/team"
```

Optional OAuth (authorization code flow with PKCE) in the same file:

```toml
[config_server.oauth]
authorization_url = "https://login.example.com/oauth/authorize"
token_url = "https://login.example.com/oauth/token"
client_id = "codex-policy"
redirect_port = 43127
```

Codex fetches the bundle with:

```text
GET https://codex-config.example.com/team/codex/config/bundle
```

Respond `200 OK` with a JSON bundle:

```json
{
  "config_toml": {
    "enterprise_managed": [
      {
        "id": "search-default",
        "name": "Default web search",
        "contents": "web_search = 'disabled'"
      }
    ]
  },
  "requirements_toml": {
    "enterprise_managed": [
      {
        "id": "search-policy",
        "name": "Allowed web search modes",
        "contents": "allowed_web_search_modes = ['disabled']"
      }
    ]
  }
}
```

## Options / Props

| Field | Description |
| --- | --- |
| `config_server.base_url` | Base URL of the HTTPS configuration server |
| `config_server.oauth.authorization_url` / `token_url` / `client_id` | OAuth endpoints and client for servers that require sign-in |
| `config_server.oauth.redirect_port` | Loopback callback port (redirect URI `http://127.0.0.1:43127/callback` in the example); may be omitted if the provider accepts any loopback port |
| `config_toml.enterprise_managed[]` | Defaults; `contents` is `config.toml` text |
| `requirements_toml.enterprise_managed[]` | Enforced requirements; `contents` is `requirements.toml` text |

Each array entry has three string fields: `id`, `name` (display name), `contents`. Use an empty array for a category you don't need.

## Notes

- Recommended path: sign in with ChatGPT and use managed configuration in **Agent security** instead of running a server.
- By default Codex fetches without credentials. With OAuth, Codex sends the access token in the `Authorization` header; the server must verify it.
- Only local administrator-controlled requirements can select the server.
- The desktop app can't prompt for sign-in to the server; run `codex login` in a terminal on the same computer, then reopen the app. If required settings can't load, startup pauses.
- Verify: run `codex`, then `/debug-config`. Defaults appear under **Config layer stack** (e.g. `enterprise-managed (Default web search, search-default) (enabled)`); requirements appear under **Requirements** with their source. Codex may start with cached settings and refresh in the background.
- Source: https://learn.chatgpt.com/docs/enterprise/configuration-server (retrieved 2026-11-14).

## Related

- [Managed configuration](./managed-configuration.md)
- [Agent security](./agent-security.md)
