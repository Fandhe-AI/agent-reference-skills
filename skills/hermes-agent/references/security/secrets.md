# Secrets

Hermes can pull API keys from external secret managers at process startup instead of storing them in `~/.hermes/.env`. Only the secret manager's bootstrap token lives in `.env`.

## Signature / Usage

```yaml
secrets:
  sources: [bitwarden]     # optional explicit ordering
  bitwarden:
    enabled: true
    project_id: "..."
  preserve_existing: [FEISHU_APP_SECRET, TELEGRAM_BOT_TOKEN]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| secrets.sources | list | Optional explicit ordering of enabled sources |
| secrets.preserve_existing | list of env var names | Existing `.env` / shell value always wins, even against a source with `override_existing: true` |
| secrets.profile_alias | bool (default true) | Under a named profile, vault secret `FOO_<PROFILE>` (`*_API_KEY`, `*_TOKEN`, `*_SECRET`, `*_KEY`, `*_PASSWORD` suffixes only) also hydrates `FOO` |

Supported sources: Bitwarden Secrets Manager (`bws`), 1Password (`op://` via `op` CLI), Command helper (any CLI printing `KEY=VALUE`).

## Notes

- Precedence per env var: (1) `.env` / shell wins unless the source sets `override_existing: true` (Bitwarden defaults to true); (2) mapped sources (`env:` map) beat bulk sources; (3) first source wins, later claims are skipped with a startup warning.
- `override_existing` never overwrites a var another source already claimed, and no source can overwrite another's bootstrap token (e.g. `BWS_ACCESS_TOKEN`).
- Injected credentials are labelled with their origin (e.g. `(from Bitwarden)`) in setup flows and `hermes model`.
- A var the vault supplies under its canonical name always beats a profile alias. `preserve_existing` and aliasing live in the orchestrator, so they apply to bundled and plugin sources.
- Child processes (terminal commands, `execute_code`, `no_agent` cron scripts) run with a sanitized env; only `terminal.env_passthrough` (or a skill's `required_environment_variables`) is forwarded, using the owning profile's value. Provider credentials cannot be declared.
- Custom backends: subclass `agent.secret_sources.base.SecretSource` (`fetch(cfg, home_path) -> FetchResult`) and register with `ctx.register_secret_source(MySource())` in the plugin's `register(ctx)`. Bundled set is closed (Bitwarden, 1Password); others belong in plugin repos.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/secrets (pinned to v0.22.2)

## Related

- [Bitwarden Secrets Manager](./secrets-bitwarden.md)
- [1Password](./secrets-onepassword.md)
- [Command Helper Secret Source](./secrets-command.md)
- [Security](./security.md)
