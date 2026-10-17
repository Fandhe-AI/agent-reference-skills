---
source: https://docs.astral.sh/uv/reference/cli/#uv-auth-login
---

# uv auth login

Login to a service. `uv auth` manages authentication; its subcommands are `login`, `logout`, `token`, and `dir`.

## Signature / Usage

```
uv auth login [OPTIONS] <SERVICE>
```

## Arguments

| Name | Description |
|------|-------------|
| `SERVICE` | The domain or URL of the service to log into |

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `--password` | password | The password to use for the service. Use `-` to read the password from stdin. |
| `--token`, `-t` | token | The token to use for the service. The username will be set to `__token__`. Use `-` to read the token from stdin. |
| `--username`, `-u` | username | The username to use for the service |

## Notes

- Global options (`--allow-insecure-host`, `--cache-dir`, `--color`, `--config-file`, `--directory`, `--help`, `--managed-python`, `--no-managed-python`, `--no-cache`, `--no-config`, `--no-progress`, `--no-python-downloads`, `--offline`, `--project`, `--quiet`, `--system-certs`, `--verbose`) are listed in uv.md under project-commands.
- Credentials are not validated, and only HTTPS Basic authentication is supported; see The auth CLI.
- This stores package-registry credentials, not application authentication; for app auth see better-auth / supabase.

## Related

- [The auth CLI](./auth-cli.md)
- [uv auth logout](./uv-auth-logout.md)
- [uv auth token](./uv-auth-token.md)
- [uv auth dir](./uv-auth-dir.md)
