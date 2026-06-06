# Keyring Backend

gws stores encrypted OAuth credentials using a keyring. By default it uses the native OS keyring. In environments where the OS keyring is unavailable, a file-based backend can be used instead.

## Configuration

```sh
GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file
```

When set to `file`, the encryption key is stored at:

```
~/.config/gws/.encryption_key
```

## Notes

- Default (no variable set): OS keyring (e.g. macOS Keychain, GNOME Keyring, Windows Credential Manager).
- `file` backend is useful in headless environments or containers where no OS keyring daemon is available.
- Only `file` is a documented alternative value; other backend values are not confirmed by official documentation.
- The `~/.config/gws/` path can be changed via `GOOGLE_WORKSPACE_CLI_CONFIG_DIR`.

## Related

- [env-vars.md](./env-vars.md)
- [ci-headless.md](./ci-headless.md)
