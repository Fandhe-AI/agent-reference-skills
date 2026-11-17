---
source: https://docs.cloud.google.com/secure-web-proxy/docs/quotas
---

# Quotas and limits (Secure Web Proxy)

Secure Web Proxy uses quotas (default values, adjustments can typically be requested) and system limits (fixed values that can't be changed).

## Signature / Usage

The source page has no code block. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/url-lists/list (gcloud 593.0.0 help).

```bash
gcloud network-security url-lists list --location=global
```

## Options / Props

### Allocation quotas

| Usage limit | Value |
|-------------|-------|
| Secure Web Proxy instances defined per project per region | 5 |
| URL lists defined per project per region | 10 |
| Policies defined per project per region | 10 |

### Usage limits

| Usage limit | Value |
|-------------|-------|
| Rules per policy | 500 |
| CEL regular expression matchers per policy | 5 |
| Maximum sub-expressions per rule | 5,000 |
| Maximum entries per URL list | 2,500 |
| Regular expression length | 100 characters |
| Maximum matcher length | 2,048 characters |
| Agent Gateways associated per Secure Web Proxy instance | 1 |

### System limits: timeouts

| Timeout type | Default value | Configurable | Description |
|--------------|---------------|--------------|-------------|
| Stream idle timeout (`stream_idle_timeout`) | 5 minutes (300 seconds) | No | Maximum time an established TCP connection or stream can stay idle with no data between client and destination; after five minutes of no data the stream or connection is closed |

## Notes

- Allocation quotas: These don't reset over time; they are released when you release the resource. Per project per region.
- Allocation quotas: View instance quotas on the Network Services API quotas page and policy quotas on the Network Security API quotas page in the Google Cloud console.
- Quotas generally apply per Google Cloud project, and are shared across all applications and IP addresses within a project. When consumption exceeds a quota the system blocks access to the resource and the task fails in most cases.
- Request changes through the Google Cloud console; the Cloud Quotas system also supports quota adjuster automation.
- Source: https://docs.cloud.google.com/secure-web-proxy/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-security/url-lists/list (gcloud 593.0.0 help).

## Related

- [policies-and-rules-overview.md](./policies-and-rules-overview.md)
- [url-list-syntax-reference.md](./url-list-syntax-reference.md)
- [cel-matcher-language-reference.md](./cel-matcher-language-reference.md)
