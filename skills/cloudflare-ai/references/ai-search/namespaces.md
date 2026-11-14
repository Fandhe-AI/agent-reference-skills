---
source: https://developers.cloudflare.com/ai-search/concepts/namespaces/
---

# Namespaces

Every AI Search instance belongs to a namespace, a logical grouping of instances within an account. An instance name must be unique within its namespace.

## Signature / Usage

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "my-namespace"
    }
  ]
}
```

```toml
[[ai_search_namespaces]]
binding = "AI_SEARCH"
namespace = "my-namespace"
```

```ts
const instance = env.AI_SEARCH.get("my-instance");
const results = await instance.search({
	messages: [{ role: "user", content: "How does caching work?" }],
});
```

Bind individual instances of the `default` namespace with `ai_search`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search": [
    {
      "binding": "PROD_SEARCH",
      "instance_name": "production"
    },
    {
      "binding": "STAGING_SEARCH",
      "instance_name": "staging"
    }
  ]
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@cloudflare/workers-types` | package | — | Minimum version `4.20260304.0` for the namespace binding types. |
| `wrangler` | package | — | Minimum version `4.68.1` for local development support. |

## Notes

- Uses: domain separation (`blog`, `support`, `docs`), tenant isolation, agent isolation.
- A `default` namespace is created automatically for every account.
- The `ai_search_namespaces` binding grants full access to all instances in the namespace (get, list, create, delete). `get()` is synchronous and makes no network call; the instance resolves lazily on the first method call.
- The `ai_search` binding offers `search()`, `chatCompletions()`, `info()`, `stats()`, and `items`, but not `list()`, `create()`, or `delete()`.
- Several namespace bindings can be declared in one Worker; each maps to a different namespace.
- A namespace can expose its own public `/search`, `/chat/completions`, and `/mcp` endpoints; see namespace-public-endpoints.md.
- The binding manages instances inside its namespace only. To create, update, or delete namespaces themselves, use the REST API, Terraform, or Wrangler (see namespaces-rest-api.md, namespaces-terraform.md).
- Terraform: from Cloudflare Terraform provider v5.29.0, use `cloudflare_ai_search_namespace` to create a namespace and set `namespace` on `cloudflare_ai_search_instance`; if omitted the instance is created in `default`. Changing `namespace` on an existing instance replaces it (see instances-terraform.md).
- Source: https://developers.cloudflare.com/ai-search/concepts/namespaces/ (pin 34d908a / fetched 2026-11-14)
- Binding mechanics (`env`, `wrangler.jsonc`) are covered by the cloudflare-workers and cloudflare-wrangler skills.

## Related

- [Bindings configuration](./bindings-configuration.md)
- [Namespace methods](./namespace-methods.md)
- [Namespaces REST API](./namespaces-rest-api.md)
- [Namespaces with Terraform](./namespaces-terraform.md)
- [Instances with Terraform](./instances-terraform.md)
- [Multitenancy](./multitenancy.md)
- [Namespace public endpoints](./namespace-public-endpoints.md)
