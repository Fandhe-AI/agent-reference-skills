---
source: https://developers.cloudflare.com/ai-search/api/instances/workers-binding/, https://developers.cloudflare.com/ai-search/api/search/workers-binding/
---

# Bindings configuration

AI Search provides two Workers bindings: a namespace binding (`ai_search_namespaces`) and an instance binding (`ai_search`).

## Signature / Usage

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "compatibility_date": "2026-03-27",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "my-namespace"
    }
  ],
  "ai_search": [
    {
      "binding": "MY_SEARCH",
      "instance_name": "my-instance",
      "remote": true
    }
  ]
}
```

```toml
compatibility_date = "2026-03-27"

[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "my-namespace"

[[ai_search]]
binding = "MY_SEARCH"
instance_name = "my-instance"
```

## Options / Props

`ai_search_namespaces` entries:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `binding` | string (required) | — | Variable name on `env`. |
| `namespace` | string (required) | — | Namespace to bind. `default` exists for every account; Wrangler creates a missing namespace on deploy. |
| `remote` | boolean | — | `true` for local development with `wrangler dev`. |

`ai_search` entries:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `binding` | string (required) | — | Variable name on `env`. |
| `instance_name` | string (required) | — | Instance in the `default` namespace; must exist at deploy time. |
| `remote` | boolean | — | `true` for local development with `wrangler dev`. |

## Notes

- Namespace binding: get, create, list, delete instances at runtime. Instance binding: bind one instance; methods are called directly on the binding (`env.MY_SEARCH.search()`).
- Local development proxies to the deployed instance; set `remote: true`.
- Source examples use `compatibility_date` `2026-03-27`; the Agents SDK guide states `ai_search_namespaces` needs `2026-03-27` or later.
- Types need `wrangler types` (ambient `AiSearchNamespace` / `AiSearchInstance`).
- Errors thrown by the binding: `AiSearchNotFoundError` (404), `AiSearchInternalError` (5xx), `AiSearchError` (other).
- Binding and Wrangler config mechanics: cloudflare-workers and cloudflare-wrangler skills.

## Related

- [Namespaces](./namespaces.md)
- [Namespace methods](./namespace-methods.md)
- [Instance methods](./instance-methods.md)
