---
source: https://docs.astral.sh/uv/reference/cli/#uv-auth-token
---

# uv auth token

Show the authentication token for a service.

## Signature / Usage

```
uv auth token [OPTIONS] <SERVICE>
```

## Arguments

| Name | Description |
|------|-------------|
| `SERVICE` | The domain or URL of the service to lookup |

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `--username`, `-u` | username | The username to lookup |

## Notes

- Global options are listed in uv.md under project-commands.
- If a username was used to log in, it must be provided as well (`uv auth token --username foo example.com`).
- This prints a stored secret to stdout; avoid piping it into logs.
- This manages package-registry credentials, not application authentication; for app auth see better-auth / supabase.

## Related

- [The auth CLI](./auth-cli.md)
- [uv auth login](./uv-auth-login.md)
