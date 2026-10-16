---
source: https://docs.astral.sh/uv/reference/settings/#configuration
---

# Settings: indexes and network

Index, network, TLS, and publishing settings from the Configuration section of the settings reference. They apply in `[tool.uv]` of `pyproject.toml` or at the top level of `uv.toml`.

## Signature / Usage

```toml
# pyproject.toml
[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu130"
```

```toml
# uv.toml
system-certs = true
http-proxy = "http://proxy.example.com"
no-proxy = ["localhost", "127.0.0.1"]
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `allow-insecure-host` | `list[str]` | `[]` | Allow insecure connections to a host (hostname, host-port pair, or URL). WARNING: hosts in this list are not verified against the system's certificate store; bypasses SSL verification and could expose you to MITM attacks. |
| `check-url` | `str` | `None` | Check an index URL for existing files to skip duplicate uploads (`uv publish`). Allows retrying a partially failed publish. The index must provide SHA-256, SHA-384, or SHA-512 hashes. PyPI accepts the same file uploaded twice even without it; most other indexes error. |
| `concurrent-downloads` | `int` | `50` | Maximum number of in-flight concurrent downloads at any given time. |
| `extra-index-url` | `list[str]` | `[]` | Extra package index URLs, in addition to `--index-url`; take priority over `index_url` or the `default = true` index. Earlier values take priority. **Deprecated: use `index` instead.** |
| `find-links` | `list[str]` | `[]` | Locations to search for candidate distributions in addition to registry indexes. A path must be a directory of wheels or source distributions at the top level; a URL must contain a flat list of links to package files. |
| `http-proxy` | `str` | `None` | The URL of the HTTP proxy to use. |
| `https-proxy` | `str` | `None` | The URL of the HTTPS proxy to use. |
| `index` | `dict` | `"[]"` | The package indexes to use when resolving dependencies (PEP 503 or local directory). Defined order = priority; higher than `index_url` / `extra_index_url`. Only the first index containing a package is considered unless an alternative `index-strategy` is specified. `explicit = true`: used only for dependencies that select it via `[tool.uv.sources]`. `default = true`: moved to lowest priority and disables the PyPI default index. |
| `index-strategy` | `"first-index" \| "unsafe-first-match" \| "unsafe-best-match"` | `"first-index"` | Strategy for multiple index URLs. `first-index` (default) only uses results from the first index that returns a match, preventing "dependency confusion" attacks. `unsafe-first-match`: search all indexes, exhausting the first before the next. `unsafe-best-match`: search all indexes, preferring the best version found. |
| `index-url` | `str` | `"https://pypi.org/simple"` | The URL of the Python package index. Lower priority than `extra_index_url` or `index`. **Deprecated: use `index` instead.** |
| `keyring-provider` | `str` | `"disabled"` | Attempt to use `keyring` for authentication for index URLs. At present only `subprocess` is supported (uses the `keyring` CLI). |
| `native-tls` | `bool` | `false` | Load TLS certificates from the platform's native store instead of bundled Mozilla roots. **Deprecated: use `system-certs` instead.** |
| `no-index` | `bool` | `false` | Ignore all registry indexes (e.g., PyPI), relying on direct URL dependencies and those from `--find-links`. |
| `no-proxy` | `list[str]` | `None` | A list of hosts to exclude from proxying. |
| `offline` | `bool` | `false` | Disable network access, relying only on locally cached data and locally available files. |
| `publish-url` | `str` | `"https://upload.pypi.org/legacy/"` | The URL for publishing packages to the Python package index. |
| `system-certs` | `bool` | `false` | Load TLS certificates from the platform's native certificate store instead of the bundled Mozilla root certificates. |
| `trusted-publishing` | `str` | `automatic` | Configure trusted publishing. By default uv checks for trusted publishing in a supported environment (GitHub Actions and GitLab CI/CD) but ignores it if it is not configured. |

Examples from the reference:

```toml
[tool.uv]
allow-insecure-host = ["localhost:8080"]
check-url = "https://test.pypi.org/simple"
concurrent-downloads = 4
extra-index-url = ["https://download.pytorch.org/whl/cpu"]
find-links = ["https://download.pytorch.org/whl/torch_stable.html"]
index-strategy = "unsafe-best-match"
index-url = "https://test.pypi.org/simple"
keyring-provider = "subprocess"
no-index = true
offline = true
publish-url = "https://test.pypi.org/legacy/"
trusted-publishing = "always"
```

```toml
[[tool.uv.index]]
name = "pytorch"
url = "https://download.pytorch.org/whl/cu130"
explicit = true

[tool.uv.sources]
torch = { index = "pytorch" }
```

## Notes

- `index`, `index-url`, and `extra-index-url` configure package-registry indexes. `keyring-provider` and index credentials are registry authentication, not application authentication (see better-auth, supabase).
- `extra-index-url`, `index-url`, and `native-tls` are deprecated (replacements: `index`, `index`, `system-certs`).

## Related

- [Settings: resolver](./settings-resolver.md)
- [Settings: build and install](./settings-build-install.md)
- [Settings: pip (a-l)](./settings-pip-a-l.md)
- [Environment variables (UV_A-UV_M)](./environment-variables-uv-a-m.md)
