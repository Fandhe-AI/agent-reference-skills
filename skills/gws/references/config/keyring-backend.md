# Keyring Backend

gws stores encrypted OAuth credentials using an encryption key kept in a keyring. By default (`keyring`) it uses the native OS keyring. In environments where the OS keyring is unavailable, a file-based backend can be used instead.

## Signature / Usage

```sh
GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file
```

## Options / Props

| Value | Behavior |
| --- | --- |
| `keyring` (default; also when unset or empty) | macOS / Windows: native keychain only (Keychain / Credential Manager). Linux: keyring plus `~/.config/gws/.encryption_key` as a synced backup and fallback. |
| `file` | `<config_dir>/.encryption_key` only, on every platform. The keyring is not touched. |

## Notes

- Matching is case-insensitive. Any other value prints `Warning: unknown GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND="...", defaulting to "keyring". Valid values: "keyring", "file".` to stderr and falls back to `keyring`.
- The selected backend is logged to stderr as `Using keyring backend: <name>`.
- macOS / Windows with `keyring`: the key lives only in the native keychain (keyring crate features `apple-native` / `windows-native`). No `.encryption_key` is written, and a legacy `~/.config/gws/.encryption_key` is deleted after a successful keychain read or key generation.
- macOS / Windows keychain errors are fatal: `OS keyring failed: ... Set GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file to use file storage.`
- Linux with `keyring`: `.encryption_key` is kept as a synced backup, and keyring errors fall back to the file. A source comment notes that on Linux the keyring uses a mock store by default without C DBus dependencies, so the file fallback is kept for reliability.
- `file` backend is useful in headless environments or containers (source doc comment: "for Docker/CI/headless").
- The `~/.config/gws/` path can be changed via `GOOGLE_WORKSPACE_CLI_CONFIG_DIR`.
- Changed in v0.22.3: macOS/Windows no longer write the `.encryption_key` fallback file (CHANGELOG 80bd150, closes #623).

## Related

- [env-vars.md](./env-vars.md)
- [ci-headless.md](./ci-headless.md)
