---
source: https://developers.cloudflare.com/kv/glossary/
---

# Glossary

Definitions of terms used across Workers KV documentation.

## Signature / Usage

| Term | Definition |
| --- | --- |
| cacheTtl | CacheTtl is a parameter that defines the length of time in seconds that a KV result is cached in the global network location it is accessed from. |
| KV namespace | A KV namespace is a key-value database replicated to Cloudflare’s global network. A KV namespace must require a binding and an id. |
| metadata | A metadata is a serializable value you append to each KV entry. |

```js
await env.NAMESPACE.get(key, { cacheTtl: 60 });
await env.NAMESPACE.put(key, value, { metadata: { a: 1 } });
```

## Related

- [api-read.md](./api-read.md)
- [kv-namespaces.md](./kv-namespaces.md)
