---
source: https://docs.cloud.google.com/developer-connect/docs/configure-connectors
---

# Configure account connectors

Create, connect, update and delete Developer Connect account connectors, using either a pre-configured OAuth client or your own custom OAuth client.

## Signature / Usage

### Create with a built-in provider

Adapted (not in the official docs): `PROVIDER` takes the lower-case value from the gcloud 593.0.0 help (`github`, `gitlab`, `bitbucket-cloud`) rather than `GITHUB`, `GITLAB`, `BITBUCKET_CLOUD`.

```bash
gcloud alpha developer-connect account-connectors create my-ac \
    --location=LOCATION \
    --provider-oauth-config-system-id=PROVIDER \
    --provider-oauth-config-scopes=SCOPES \
    --project=PROJECT_ID
```

### Create with a custom OAuth client

First create the connector in the console with **Custom OAuth client** to get the redirect URI, then register your OAuth app with it.

Adapted (not in the official docs): the source's flags `--custom-provider-oauth-config-system-id` and `--custom-provider-oauth-config-scopes` do not exist; the gcloud 593.0.0 help uses `--custom-oauth-config-scm-provider` and `--custom-oauth-config-scopes`. `SCM_PROVIDER` takes the lower-case value from the help. The stray space in `--custom-oauth-config-host-uri= HOST_URI` is removed.

```bash
gcloud alpha developer-connect account-connectors create my-ac \
  --location=LOCATION \
  --project=PROJECT_ID \
  --custom-oauth-config-scm-provider=SCM_PROVIDER \
  --custom-oauth-config-host-uri=HOST_URI \
  --custom-oauth-config-auth-uri=AUTH_URI \
  --custom-oauth-config-token-uri=TOKEN_URI \
  --custom-oauth-config-scopes=SCOPES \
  --custom-oauth-config-client-id=CLIENT_ID \
  --custom-oauth-config-client-secret=SECRET
```

### Connect your account

In the console: **Account connectors** > the connector name > **Connect your account** > sign in to the provider in the OAuth dialog > **Authorize**.

## Options / Props

### Placeholders

| Placeholder | Value |
|-------------|-------|
| `LOCATION` | Region in which you create the connector |
| `PROJECT_ID` | Project ID (not project number) |
| `PROVIDER` | Built-in provider; the help lists `bitbucket-cloud`, `datastax`, `dynatrace`, `github`, `gitlab`, `google`, `new-relic`, `rovo`, `sentry` (the source names `GITHUB`, `GITLAB`, `BITBUCKET_CLOUD`) |
| `SCM_PROVIDER` | Custom provider; the help lists `bitbucket-data-center`, `github-enterprise`, `gitlab-enterprise` (the source names `GITHUB_ENTERPRISE`, `GITLAB_ENTERPRISE`, `BITBUCKET_DATA_CENTER`) |
| `HOST_URI` | URL of your SCM system |
| `AUTH_URI` | GitHub Enterprise `https://<host_name>/login/oauth/authorize`; GitLab Enterprise `https://<host_name>/oauth/authorize`; Bitbucket Data Center `https://<host_name>/rest/oauth2/latest/authorize` |
| `TOKEN_URI` | GitHub Enterprise `https://<host_name>/login/oauth/access_token`; GitLab Enterprise `https://<host_name>/oauth/token`; Bitbucket Data Center `https://<host_name>/rest/oauth2/latest/token` |
| `SCOPES` | Comma-separated provider OAuth scopes |
| `CLIENT_ID` / `SECRET` | Client ID and client secret from the OAuth app on your SCM |

### Console settings

| Setting | Detail |
|---------|--------|
| Redirect URI | `https://developerconnect.google.com/redirect/custom/projects/<project_number>/locations/<location>/accountConnectors/<account_connector_id>`; `<project_number>` is the number, not the ID |
| Enable Developer Connect proxy | With proxy enabled, Developer Connect sends Git commands or HTTP calls (or both) to the provider on your behalf |
| Scopes | Select at least one unless the provider has no scopes; scopes differ by provider |
| Networking | Public internet or private network; a private network needs the CA certificate and a Service Directory service (project, or region, namespace and service name) |
| PKCE | Enable or disable; your OAuth service must support it (the CLI flag `--custom-oauth-config-pkce-disabled` disables it; enabled by default) |

### Required role

| Role | Grant to |
|------|----------|
| `roles/developerconnect.oauthAdmin` (Developer Connect OAuth Admin) | Your user, on the project |

## Notes

- Adapted from the official docs: `PROVIDER` / `SCM_PROVIDER` are written in lower case as the gcloud 593.0.0 help lists them (the source writes `GITHUB`, `GITLAB`, `BITBUCKET_CLOUD`, `GITHUB_ENTERPRISE`, `GITLAB_ENTERPRISE`, `BITBUCKET_DATA_CENTER`).
- Corrected from the official docs: the custom-client command used non-existent `--custom-provider-oauth-config-*` flags, and a space after `--custom-oauth-config-host-uri=`.
- The OAuth client secret is a credential, and the source passes it as a command-line argument: it is visible in shell history and in the process list while the command runs. Do not paste it into shared terminals or logs.
- The OAuth client secret flag help says it is sent as plain text but encrypted and stored in Developer Connect and is not included in output.
- Enabling Developer Connect also enables the Secret Manager API. Optional CMEK can encrypt the authentication secrets Developer Connect creates.
- You can update only the scopes and the proxy setting. If you update the scopes, all existing users of that connector are removed and must re-authorize.
- The source's delete steps (**More** > **Delete**) are followed by a "Click **Edit**" step in the source; deleting a connector is irreversible, so try it on a disposable project first.
- The custom client example commands in the source use the alpha track; the GA `gcloud developer-connect account-connectors create` exists in 593.0.0 with the same flags.
- The source also shows Console steps (mostly omitted).
- Source: https://docs.cloud.google.com/developer-connect/docs/configure-connectors (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [account-connectors.md](./account-connectors.md)
- [overview.md](./overview.md)
