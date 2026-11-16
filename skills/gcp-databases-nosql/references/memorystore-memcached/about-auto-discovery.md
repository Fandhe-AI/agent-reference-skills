---
source: https://docs.cloud.google.com/memorystore/docs/memcached/about-auto-discovery
---

# About the Auto Discovery service

The Auto Discovery service lets clients automatically adapt to node IP addresses being added or removed when you scale a Memcached instance. Without it you must manage the node IP list in the client manually.

## Signature / Usage

### Query the discovery endpoint

```text
config get cluster
```

## Options / Props

The discovery endpoint is a dedicated, unchanging IP address per instance that returns:

| Field | Description | Datatype | Example |
|---|---|---|---|
| Configuration version ID | Increments for each node list change | Integer | `9` |
| Node List | Current nodes and their IP addresses | String | `node1-ip\|node1-ip\|node1-port node2-ip\|node2-ip\|node2-port` |

Client support: use a client with auto discovery (Golang `google/gomemcache` fork) or add auto discovery logic to your client.

## Notes

- Use the discovery endpoint only for discovery, not for `get`, `set`, or `delete`.
- The service is eventually consistent (delays on the order of seconds after scaling). The same client can see two different responses (the higher Configuration version ID is newer); two clients can see different responses with no way to tell which is latest, and the instance can return cache misses until consistent.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/memcached/use-auto-discovery (the overview page has no code).
- Source: https://docs.cloud.google.com/memorystore/docs/memcached/about-auto-discovery (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-auto-discovery.md](./use-auto-discovery.md)
- [scale-instances.md](./scale-instances.md)
- [best-practices.md](./best-practices.md)
