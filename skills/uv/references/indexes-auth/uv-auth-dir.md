---
source: https://docs.astral.sh/uv/reference/cli/#uv-auth-dir
---

# uv auth dir

Show the path to the uv credentials directory.

## Signature / Usage

```
uv auth dir [OPTIONS]
```

## Notes

- By default, credentials are stored in the uv data directory at `$XDG_DATA_HOME/uv/credentials` or `$HOME/.local/share/uv/credentials` on Unix and `%APPDATA%\uv\data\credentials` on Windows.
- The credentials directory may be overridden with `$UV_CREDENTIALS_DIR`.
- Credentials are only stored in this directory when the plaintext backend is used, as opposed to the native backend, which uses the system keyring.
- This command has no command-specific options; global options are listed in uv.md under project-commands.

## Related

- [The auth CLI](./auth-cli.md)
- [HTTP credentials](./http-credentials.md)
