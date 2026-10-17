# Bitwarden Secrets Manager

Pull API keys from Bitwarden Secrets Manager at process startup instead of storing them in plaintext in `~/.hermes/.env`. One machine-account access token (`BWS_ACCESS_TOKEN`) replaces per-provider keys.

## Signature / Usage

```bash
hermes secrets bitwarden setup
hermes secrets bitwarden status

# non-interactive
hermes secrets bitwarden setup \
  --access-token "$BWS_ACCESS_TOKEN" \
  --server-url https://vault.bitwarden.eu \
  --project-id <project-uuid>
```

CLI:

| Command | What it does |
|---------|--------------|
| `setup` | Wizard: install binary, prompt for token, pick region and project, test fetch |
| `status` | Config + binary version + token presence/validation |
| `token [--access-token 0.…]` | Rotate the token; validated before `.env` is written |
| `sync` / `sync --apply` | Dry-run / export into current shell |
| `install` / `install --force` | Install or repair the PM-pinned `bws` binary |
| `disable` | `enabled: false`; keeps token and project id |

## Options / Props

```yaml
secrets:
  bitwarden:
    enabled: false
    access_token_env: BWS_ACCESS_TOKEN
    project_id: ""
    server_url: ""
    cache_ttl_seconds: 300
    encrypted_cache:
      enabled: false
      max_stale_seconds: 0
    override_existing: true
    auto_install: true
```

| Name | Default | Description |
|------|---------|-------------|
| enabled | false | Master switch |
| access_token_env | BWS_ACCESS_TOKEN | Env var holding the bootstrap token |
| project_id | "" | Project UUID to sync from |
| server_url | "" | Empty = US Cloud; `https://vault.bitwarden.eu` for EU; own URL for self-hosted (passed as `BWS_SERVER_URL`) |
| cache_ttl_seconds | 300 | Fetch result reuse; 0 disables fresh-cache reuse |
| encrypted_cache.enabled | false | AES-GCM cache at `~/.hermes/cache/bws_cache.enc.json` |
| encrypted_cache.max_stale_seconds | 0 | Max age of encrypted cache usable after network/timeout failures; auth failures never use stale secrets |
| override_existing | true | Bitwarden values overwrite env |
| auto_install | true | Request the PM-pinned `bws` package when absent |

## Notes

- Flow: create a machine account with Read access to a project, create an access token (starts with `0.`, shown once), secret Name = env var name. Hermes runs `bws secret list <project_id>` at startup of `hermes`, gateway, and cron jobs.
- Never blocks startup; failures print a one-line warning with a `→` remediation hint and `.env` credentials remain.
- Hermes refuses to let Bitwarden overwrite the bootstrap token itself. Store the token in `.env`, not `config.yaml`.
- Binary: a `bws` on `PATH` is honored before PM selection; PM verifies SHA-256 from `pm/lock.json` and a mismatch aborts installation.
- Not recommended for single-machine setups, air-gapped environments, or CI/CD with existing secret injection.
- Also usable as the egress proxy credential source (`hermes egress setup --from-bitwarden`).
- Source: user-guide/secrets/bitwarden (v0.22.2 snapshot).

## Related

- [Secrets](./secrets.md)
- [Egress credential-injection proxy (iron-proxy)](./egress-iron-proxy.md)
- [1Password](./secrets-onepassword.md)
