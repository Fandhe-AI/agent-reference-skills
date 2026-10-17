---
source: https://docs.astral.sh/uv/reference/cli/#uv-auth-logout
---

# uv auth logout

Logout of a service.

## Signature / Usage

```
uv auth logout [OPTIONS] <SERVICE>
```

## Arguments

| Name | Description |
|------|-------------|
| `SERVICE` | The domain or URL of the service to logout from |

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `--username`, `-u` | username | The username to logout |

## Notes

- Global options are listed in uv.md under project-commands.
- Credentials are only removed from local storage, not invalidated with the remote server.
- This manages package-registry credentials, not application authentication; for app auth see better-auth / supabase.

## Related

- [The auth CLI](./auth-cli.md)
- [uv auth login](./uv-auth-login.md)
