# Remote Config

Remote config mode replaces `config.yaml` with the config plane: each profile's config is the document the plane resolves for this agent instance and profile, layered from global, tenant, group, owner and agent settings, with the profile's own settings last.

## Signature / Usage

Select the backend in the environment, `~/.hermes/.env`, or the managed `/etc/hermes/.env` (which wins). A value in `config.yaml` cannot select the backend. Secret-shaped keys accept only a `${VAR}` reference:

```bash
hermes config set model.api_key '${OPENROUTER_API_KEY}'
```

## Options / Props

| Variable | Meaning |
|---|---|
| `HERMES_CONFIG_BACKEND=remote` | Use the config plane instead of `config.yaml` (default `file`) |
| `HERMES_CONFIG_INSTANCE_ID` | This agent's id in the plane (required; Hermes Cloud sets it, on-prem the operator sets it when registering the agent) |
| `HERMES_CONFIG_REMOTE_URL` | The plane's base URL (default `https://config-config.nousresearch.com`) |

Authentication: Hermes Cloud uses the Nous access token in the profile's `auth.json`; on-prem uses an OAuth2 client-credentials token configured with `GATEWAY_RELAY_IDP_TOKEN_URL`, `GATEWAY_RELAY_IDP_CLIENT_ID`, `GATEWAY_RELAY_IDP_CLIENT_SECRET` and optionally `GATEWAY_RELAY_IDP_SCOPE`.

## Notes

- Intended for fleet deployments (for example Hermes Cloud); a single machine with one user should keep `config.yaml`. Administrators can lock keys at an upper level; the agent cannot change a locked key.
- These values (and `HERMES_PORTAL_BASE_URL`, `NOUS_PORTAL_BASE_URL`, `HERMES_SHARED_AUTH_DIR`) must come from `auth.json`, a `.env` file or the process environment. If a `secrets:` source supplies any of them, Hermes refuses to start (a multi-profile process refuses to serve that profile).
- A process started for another profile (`hermes -p <name>` worker, cron or bot child) keeps the parent's `HERMES_CONFIG_*` deployment but does not inherit the plane credential: on-prem, put `GATEWAY_RELAY_IDP_*` in the managed `/etc/hermes/.env` or each profile's `.env`, otherwise the process exits with an error.
- Startup fails closed: every Hermes process fetches its config when it loads `.env`; if the plane is unreachable after about 30 seconds of retries or refuses the agent, the process exits (no local file, no defaults). A running process keeps its in-memory config if the plane becomes unreachable.
- No local `config.yaml` is read or written and there is no local cache. Processes poll every 5 minutes.
- Writes (`hermes config set`, `/model`, dashboard) send only changed keys, guarded against concurrent edits (re-read and re-apply on conflict). Removing a key removes it from the profile level only; an upper-level value still applies and Hermes warns.
- Locked keys are refused with the locking level named (including TUI and desktop settings); saving a whole document omits locked keys and prints a note.
- `secrets:` comes from the plane like any other key. Schema migrations run in memory and are not written back; steps that also tidy local files (for example removing a retired section from `SOUL.md`, clearing old `.env` values) do not run. Setting a value that such a migration rewrites (for example `compression.threshold_tokens: 256000` on an older stored schema) is refused. Unknown keys in the fetched document are ignored with a warning.
- `/etc/hermes/config.yaml` (managed scope) is ignored in remote mode; Hermes warns at startup and `hermes doctor` flags it. The managed `/etc/hermes/.env` still applies.
- Refused in remote mode: `hermes config edit` (use `hermes config set`), profile clone / rename / distribution install, `hermes backup`, `hermes import`, snapshot restore, `hermes gateway --config <file>`. `hermes doctor` reports the plane URL, profile, profile-level version, lock count and last fetch time.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/remote-config (pinned to v0.23.1)

## Related

- [Managed Scope](./managed-scope.md)
- [Configuration](./configuration.md)
- Config Backend Seam (architecture category, `config-backend.md`)
