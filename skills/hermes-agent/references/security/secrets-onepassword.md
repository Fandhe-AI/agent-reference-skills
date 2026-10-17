# 1Password

Resolve provider API keys from 1Password at process startup via the official `op` CLI, referencing items as `op://vault/item/field` instead of storing plaintext in `~/.hermes/.env`.

## Signature / Usage

```bash
op whoami
hermes secrets onepassword setup
hermes secrets onepassword set OPENAI_API_KEY    "op://Private/OpenAI/api key"
hermes secrets onepassword set ANTHROPIC_API_KEY "op://Private/Anthropic/credential"
hermes secrets onepassword sync     # dry-run
hermes secrets onepassword status
```

CLI (`op` and `1password` are aliases for `onepassword`):

| Command | What it does |
|---------|--------------|
| `setup` | Verify `op`, set account / token env var, enable (`--account`, `--token-env`, `--token`, `--binary-path`) |
| `status` | Config, binary, auth, references |
| `token` | Rotate service-account token; validated with `op whoami` then stored in `.env` |
| `set ENV_VAR "op://…"` | Map env var to a reference |
| `remove ENV_VAR` | Drop a mapping |
| `sync` / `sync --apply` | Dry-run / export into current shell |
| `disable` | `enabled: false`; keeps mappings |

## Options / Props

```yaml
secrets:
  onepassword:
    enabled: false
    env:
      OPENAI_API_KEY: "op://Private/OpenAI/api key"
    account: ""
    service_account_token_env: OP_SERVICE_ACCOUNT_TOKEN
    binary_path: ""
    cache_ttl_seconds: 300
    override_existing: true
```

| Name | Default | Description |
|------|---------|-------------|
| enabled | false | Master switch; false means `op` is never invoked |
| env | {} | Env-var name to `op://` reference; invalid entries skipped with a warning |
| account | "" | Passed as `op read --account`; empty uses default account |
| service_account_token_env | OP_SERVICE_ACCOUNT_TOKEN | Env var the token is read from; exported to `op` as `OP_SERVICE_ACCOUNT_TOKEN`. Unset to use a desktop session |
| binary_path | "" | Absolute path to `op`, used verbatim (PATH not consulted) |
| cache_ttl_seconds | 300 | In-process and on-disk reuse; 0 disables both layers |
| override_existing | true | Resolved values overwrite env; when false, those references are skipped before `op` runs |

## Notes

- Auth: service account (headless, recommended for servers/CI) or interactive/desktop session (`op signin`; `OP_SESSION_*` passed through and part of the cache key). Hermes never authenticates for you or downloads `op`.
- The service-account token must be in `os.environ` of every resolving process (cron, subprocesses, launchd, Docker). Options in precedence order: `~/.hermes/.env` (via `setup --token`), `~/.hermes/.op.env` (gitignored, loaded after `.env`, never overrides an existing token; `chmod 600`), or systemd `EnvironmentFile=-/home/youruser/.hermes/.op.env`. Tokens only in an interactive shell are not inherited by cron or fresh subprocesses.
- Never blocks startup; failures print a one-line warning with a `→` remediation hint. Empty field values are never applied.
- Cache: `<hermes_home>/cache/op_cache.json` (0600, atomic), values only, invalidated when token/account/`OP_SESSION_*`/references change, not written on per-reference errors.
- Security: the `op` child gets a minimal allowlisted env (auth/session vars, `PATH`, `HOME`, `OP_CONFIG_DIR`, `XDG_CONFIG_HOME`); set `OP_CONFIG_DIR` when `~/.config` is not writable. References must start with `op://` and are passed after `--`. Hermes refuses to overwrite the token env var itself.
- Source: user-guide/secrets/onepassword (v0.22.2 snapshot).

## Related

- [Secrets](./secrets.md)
- [Bitwarden Secrets Manager](./secrets-bitwarden.md)
- [Command Helper Secret Source](./secrets-command.md)
