---
source: https://docs.cloud.google.com/sdk/docs/proxy-settings
---

# Use gcloud Behind a Corporate Proxy

Point gcloud at an HTTP proxy with `proxy/*` properties, keep proxy credentials in environment variables, and trust a custom CA.

## Signature / Usage

### Use the standard proxy environment variables first

gcloud respects `http_proxy`, `https_proxy`, and `no_proxy`. Set gcloud proxy properties only when you need a different proxy; they override the environment, including `no_proxy`.

### Set the proxy type, address, and port

```bash
gcloud config set proxy/type http
gcloud config set proxy/address 1.234.56.78
gcloud config set proxy/port 8080
```

### Add credentials for an authenticated proxy

Passing the credentials as environment variables keeps them out of the gcloud configuration file and logs. A password typed literally on an `export` line is still saved in the shell history, so read it without echoing (second block).

Adapted (not in the official docs): the official sample prints `export CLOUDSDK_PROXY_USERNAME [USERNAME]`, which is not valid shell syntax; `export NAME=VALUE` is used instead.

```bash
export CLOUDSDK_PROXY_USERNAME=[USERNAME]
export CLOUDSDK_PROXY_PASSWORD=[PASSWORD]
```

Adapted (not in the official docs): read the password without echoing it so that the value is not written to the shell history (Bash).

```bash
read -r -s -p "Proxy password: " CLOUDSDK_PROXY_PASSWORD && export CLOUDSDK_PROXY_PASSWORD
```

### Trust a man-in-the-middle proxy CA

If you see SSL handshake errors, point gcloud at the proxy's CA file:

```bash
gcloud config set core/custom_ca_certs_file [PATH_TO_CUSTOM_CA]
```

## Options / Props

| Property | Values | Description |
| --- | --- | --- |
| `proxy/type` | `http`, `http_no_tunnel`, `socks4`, `socks5` | Proxy type |
| `proxy/address` | host or IP | Where the proxy can be reached |
| `proxy/port` | integer | Port the proxy runs on |
| `proxy/username`, `proxy/password` | string | Env vars `CLOUDSDK_PROXY_USERNAME`, `CLOUDSDK_PROXY_PASSWORD` |
| `core/custom_ca_certs_file` | path | Custom CA file |

## Notes

- gcloud supports only HTTP proxies: write `https_proxy=http://...`, not `https://...`.
- Replace the bracketed placeholders (`[USERNAME]`, `[PASSWORD]`, `[PATH_TO_CUSTOM_CA]`) with real values and drop the brackets.
- The commands above set values in the active configuration; use a named configuration if only one environment needs the proxy.
- For installing behind a firewall, use the versioned archive described on the proxy page instead of the interactive installer.
- `1.234.56.78` and `8080` are the example values from the `gcloud config set` help.
- Source: https://docs.cloud.google.com/sdk/docs/proxy-settings (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/config/set (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)

## Related

- [proxy-settings.md](../references/install-setup/proxy-settings.md)
- [downloads-versioned-archives.md](../references/install-setup/downloads-versioned-archives.md)
- [configurations.md](../references/config-auth/configurations.md)
