---
source: https://docs.cloud.google.com/sdk/docs/proxy-settings
---

# Proxy settings

If you are behind a corporate proxy or firewall, the gcloud CLI might not reach the internet with its default settings.

## Signature / Usage

### Installing behind a proxy

Interactive installers download components from the internet, which may fail behind a proxy or firewall. Use a self-contained versioned archive instead. All previous versions are also in the downloads archive: https://console.cloud.google.com/storage/browser/cloud-sdk-release.

### Proxy configuration

The gcloud CLI respects the `http_proxy`, `https_proxy`, and `no_proxy` environment variables (plain HTTP proxy, HTTPS proxy, and domains not to proxy). Configure gcloud proxy properties only to use a different proxy. If gcloud proxy settings are set they override existing proxy configuration, including ignoring `no_proxy`.

After installation, set the proxy type, address, and port with `gcloud config`:

```bash
gcloud config set proxy/type [PROXY_TYPE]

gcloud config set proxy/address [PROXY_IP_ADDRESS]

gcloud config set proxy/port [PROXY_PORT]
```

For an authenticated proxy:

```bash
gcloud config set proxy/username [USERNAME]

gcloud config set proxy/password [PASSWORD]
```

The official page recommends environment variables so that the gcloud CLI does not store the proxy credentials in its configuration or logs. Typing a literal password on an `export` line still records it in your shell history, so read secret values without echoing them (see the Adapted block below).

Adapted (not in the official docs): `export NAME [VALUE]` is not valid shell syntax; `export NAME=VALUE` is required to set a variable.

```bash
export CLOUDSDK_PROXY_USERNAME=[USERNAME]

export CLOUDSDK_PROXY_PASSWORD=[PASSWORD]
```

Adapted (not in the official docs): read the password without echoing it so that the value is not written to the shell history (Bash).

```bash
read -r -s -p "Proxy password: " CLOUDSDK_PROXY_PASSWORD && export CLOUDSDK_PROXY_PASSWORD
```

If you get SSL handshake errors, your proxy is likely a man-in-the-middle proxy using a custom CA; point to the CA file:

```bash
gcloud config set core/custom_ca_certs_file [PATH_TO_CUSTOM_CA]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `proxy/type` | string | `http`, `http_no_tunnel`, `socks4`, `socks5` |
| `proxy/address` | string | Hostname or IP address where the proxy can be reached. |
| `proxy/port` | integer | Port the proxy runs on (for example `8080`). |
| `proxy/username` | string | Proxy username (env var `CLOUDSDK_PROXY_USERNAME`). |
| `proxy/password` | string | Proxy password (env var `CLOUDSDK_PROXY_PASSWORD`). |
| `core/custom_ca_certs_file` | path | Custom CA file for man-in-the-middle proxies. |

## Notes

- Adapted from the official docs: environment variables keep the credentials out of the gcloud configuration and logs, but a password typed on an `export` line is saved in the shell history; the page adds a `read -r -s` example that avoids this.
- Corrected from the official docs: the page prints `export CLOUDSDK_PROXY_USERNAME [USERNAME]` and `export CLOUDSDK_PROXY_PASSWORD [PASSWORD]`, which lack the `=` that `export` needs; the fence above uses `export NAME=VALUE`.
- If you see warnings or errors about `https_proxy`, you may have written `https_proxy=https://...` instead of `https_proxy=http://...`. The gcloud CLI only supports HTTP proxies; earlier versions silently ignored the difference and always contacted the proxy via HTTP.
- For a full description of related properties, run `gcloud topic configurations` or `gcloud config set` and look for **proxy** under Available properties.
- Source: https://docs.cloud.google.com/sdk/docs/proxy-settings (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloads-versioned-archives.md](./downloads-versioned-archives.md)
- [install-sdk.md](./install-sdk.md)
