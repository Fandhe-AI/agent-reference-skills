---
source: https://developers.cloudflare.com/workers/authorization/
---

# Roles and permissions

How Developer Platform roles and scopes apply across platform, product, and resource levels, and how to use granular permissions with Wrangler and API tokens.

## Signature / Usage

Authenticate Wrangler with an account-owned API token to use granular permissions:

```bash
export CLOUDFLARE_API_TOKEN="<YOUR_API_TOKEN>"
export CLOUDFLARE_ACCOUNT_ID="<YOUR_ACCOUNT_ID>"
```

## Options / Props

Scopes:

| Level | Scope | Use when |
| --- | --- | --- |
| Platform | All products on an account | Grant access across Workers, R2, D1, KV, Durable Objects, Queues, Workers AI, Vectorize, Hyperdrive, etc. |
| Product | All resources in one product | Grant access to all Workers, all R2 buckets, or all D1 databases |
| Resource | One resource inside a product | Grant access to a specific Worker or R2 bucket |

Roles:

| Role | What it allows |
| --- | --- |
| Metadata Read-Only | View resource lists, settings, metrics, logs, and traces. Cannot view product content such as code, data, or stored objects. |
| Content Read-Only | Metadata Read-Only plus read product content such as Worker code, D1 rows, R2 objects. Cannot make changes. |
| Editor | Content Read-Only plus update product content and settings. Cannot create or delete resources. |
| Admin | Full control, including creating and deleting resources. |

Wrangler commands and required access:

| What you want to do | Example command | Required access |
| --- | --- | --- |
| Deploy an existing Worker | `wrangler deploy` | `Editor` scoped to that Worker, or at Workers product scope |
| Create a new Worker | `wrangler deploy` for a new Worker | `Admin` at the Workers product scope |
| Tail logs for one Worker | `wrangler tail` | `Metadata Read-Only` for that Worker or product |
| List KV namespaces | `wrangler kv namespace list` | Developer Platform `Metadata Read-Only` at a scope that includes KV |
| Create a KV namespace | `wrangler kv namespace create` | Developer Platform `Admin` at a scope that includes KV |
| Change Routes or Custom Domains during deployment | `wrangler deploy` | `Editor` for the Worker, plus `Workers Routes Write` for every affected zone |

Common access patterns:

| Use case | Scope | Role |
| --- | --- | --- |
| View settings, logs, metrics across all products | Platform | Metadata Read-Only |
| Read Worker code without modifying | Workers product | Content Read-Only |
| Deploy any existing Worker, no other products | Workers product | Editor |
| Change Routes or Custom Domains | Workers product and each affected zone | Editor and `Workers Routes Write` |
| Rename an existing Worker | Individual Worker or Workers product | Editor |
| Create or delete Workers | Workers product | Admin |
| Automated deployments from CI/CD or agents | API token with Workers product | Editor |
| Automated deployments to one specific Worker | API token with individual Worker | Editor |

## Notes

- Members and User Groups inherit permissions on dashboard/API sign-in; API tokens get only the product/resource permissions chosen at creation and do not support platform-level permissions (select product-level permissions per product).
- `wrangler login` OAuth does not support granular authorization; use an account-owned API token.
- Deploying a Worker with bindings requires only `Editor` on the Worker, not on the bound resources (needed only to access those resources directly).
- Create a User Group when several people need the same access.

## Related

- [workers-roles-and-permissions.md](./workers-roles-and-permissions.md)
- [get-started-cli.md](./get-started-cli.md)
