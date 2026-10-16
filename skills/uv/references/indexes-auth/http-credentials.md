---
source: https://docs.astral.sh/uv/concepts/authentication/http/
---

# HTTP credentials

uv supports credentials over HTTP when querying package registries.

## Signature / Usage

Authentication can come from the following sources, in order of precedence:

1. The URL, e.g., `https://<user>:<password>@<hostname>/...`
2. A netrc configuration file
3. The uv credentials store
4. A keyring provider (off by default)

Authentication may be used for hosts specified in the following contexts: `[index]`, `index-url`, `extra-index-url`, `find-links`, `package @ https://...`.

```toml
[tool.uv]
keyring-provider = "subprocess"
```

## netrc files

`.netrc` files are a long-standing plain text format for storing credentials. Reading credentials from `.netrc` files is always enabled. The target file path is loaded from the `NETRC` environment variable if defined, falling back to `~/.netrc`.

## The uv credentials store

uv can read and write credentials from a store using the `uv auth` commands. Credentials are stored in a plaintext file in uv's state directory, e.g., `~/.local/share/uv/credentials/credentials.toml` on Unix. This file is currently not intended to be edited manually.

A secure, system native storage mechanism is in preview (experimental). When enabled, uv uses the secret storage native to the OS: Keychain Services on macOS, Windows Credential Manager on Windows, the DBus-based Secret Service API on Linux. uv only searches the native store for credentials it has added; it does not retrieve credentials persisted by other applications. Set `UV_PREVIEW_FEATURES=native-auth` to use it.

## Keyring providers

A keyring provider is a concept from `pip` allowing retrieval of credentials from an interface matching the `keyring` Python package. The "subprocess" keyring provider invokes the `keyring` command to fetch credentials. uv does not support additional keyring provider types at this time.

Set `--keyring-provider subprocess`, `UV_KEYRING_PROVIDER=subprocess`, or `tool.uv.keyring-provider = "subprocess"` to use the provider.

## Persistence of credentials

If authentication is found for a single index URL or net location (scheme, host, and port), it is cached for the duration of the command and used for other queries to that index or net location. Authentication is not cached across invocations of uv.

When using `uv add`, uv does not persist index credentials to `pyproject.toml` or `uv.lock`. However, uv does persist credentials for direct URLs, i.e., `package @ https://username:password:example.com/foo.whl`, as there is not currently a way to otherwise provide those credentials.

## Notes

- If credentials were attached to an index URL during `uv add`, uv may fail to fetch dependencies from indexes which require authentication on subsequent operations; see Index authentication.
- Differences from `pip` are described in the pip compatibility guide (registry authentication section).

## Related

- [Index authentication](./index-authentication.md)
- [The auth CLI](./auth-cli.md)
- [Authentication](./authentication.md)
