---
source: https://docs.cloud.google.com/memorystore/docs/memcached/supported-versions
---

# Supported versions

Memorystore for Memcached supports Memcached 1.5.16 and 1.6.15. The default version is 1.5.16. One patch version is supported per major OSS version and is kept up to date during maintenance; critical security patches are rolled out outside the regular maintenance period.

## Signature / Usage

### Select a version at creation

```bash
gcloud memcache instances create myinstance --node-count=3 --node-cpu=2 --node-memory=2GB --region=us-central1 --zones=us-central1-a,us-central1-b,us-central1-c --memcached-version=1.6.15
```

## Options / Props

### Current versions

| Memcached version | Last update |
|---|---|
| 1.5.16 | March 26, 2020 |
| 1.6.15 | September 19, 2023 |

### Memcached 1.6.15 features

| Feature | Supported in Memorystore |
|---|---|
| Meta protocol | Yes |
| Batching of response syscalls | Yes |
| Disable watch commands | Yes |
| XXH3 hash algorithm | Yes |
| Watch connevents | Yes |
| Warm Cache Restart | No |
| Extstore | No |
| TLS | No |

## Notes

- TLS (available in OSS Memcached 1.5.13 and later) is not supported by Memorystore for Memcached.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/create-manage-instances (the versions page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/supported-versions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-memcached-configurations.md](./supported-memcached-configurations.md)
- [about-maintenance.md](./about-maintenance.md)
- [instance-node-properties.md](./instance-node-properties.md)
