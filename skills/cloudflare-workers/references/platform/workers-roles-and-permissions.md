---
source: https://developers.cloudflare.com/workers/authorization/workers/
---

# Workers roles and permissions

Workers-specific roles and scopes (all Workers vs selected Workers), Routes and Custom Domains permissions, Wrangler command requirements, legacy permission mapping, and Durable Objects access.

## Signature / Usage

Granting Wrangler access with an account-owned API token:

```bash
export CLOUDFLARE_API_TOKEN="<YOUR_API_TOKEN>"
export CLOUDFLARE_ACCOUNT_ID="<YOUR_ACCOUNT_ID>"
```

Snippet taken from https://developers.cloudflare.com/workers/authorization/#use-granular-permissions-with-wrangler.

## Options / Props

Workers roles:

| Role | Access level | Description |
| --- | --- | --- |
| Metadata Read-Only | Read metadata | View Workers metadata, settings, and observability data. Cannot view script source or secret values. |
| Content Read-Only | Read content | View metadata and script source content. Cannot modify. |
| Editor | Edit | Read, update, deploy, rename existing Workers (content, settings, schedules, versions, deployments, observability). Cannot create or delete. |
| Admin | Full manage | Create, read, update, deploy, delete, rename (product scope). Per-Worker Admin applies only to the selected Worker. |

Scopes: Workers product (all current and future Workers) or individual Workers (cannot grant per-Worker access to a Worker that does not exist yet).

Wrangler minimum role:

| Action | Command | Minimum role |
| --- | --- | --- |
| Tail logs | `wrangler tail` | `Metadata Read-Only` for that Worker |
| Deploy existing Worker | `wrangler deploy` | `Editor` for that Worker |
| Change Routes / Custom Domains | `wrangler deploy` | `Editor` plus `Workers Routes Write` per affected zone |
| Create a new Worker | `wrangler deploy` | Product-level `Admin` |
| Upload a version | `wrangler versions upload` | `Editor` |
| Deploy a version | `wrangler versions deploy` | `Editor` |
| Roll back | `wrangler rollback` | `Editor` |
| Manage secrets | `wrangler secret put` / `delete` | `Editor` |

Legacy permissions replacement:

| Legacy permission or role | Replaced by |
| --- | --- |
| Workers Platform (Read-only) | `Content Read-Only` at Developer Platform scope |
| Workers Platform Admin | `Admin` at Developer Platform scope |
| Workers Platform Metadata (Read-Only) | `Metadata Read-Only` at Developer Platform scope |
| Workers CI Read | `Content Read-Only` at Workers product scope |
| Workers CI Edit | `Editor` at Workers product scope |
| Workers Observability Read | `Metadata Read-Only` at Workers product scope |
| Workers Observability Edit / Telemetry Edit | `Editor` at Workers product scope |
| Workers Tail Read | `Metadata Read-Only` at Workers product scope |
| Workers Scripts Read | `Content Read-Only` at Workers product scope |
| Workers Scripts Edit | `Editor` at Workers product scope |

Pages API token roles: Pages Metadata Read, Pages Read, Pages Write.

## Notes

- Routes and Custom Domains: need `Editor` on the Worker and `Workers Routes Write` for every affected zone (API tokens: Zone > Workers Routes > Write). Afterwards, new versions deploy with only `Editor` unless the connection changes.
- Combine product-level `Metadata Read-Only` with per-Worker `Editor` for broad visibility and limited edit access.
- Limitations: product-level Workers roles do not grant access to other Developer Platform products; API tokens lack platform-level permissions; creating a Worker requires Workers Admin; Custom Domains do not support per-Worker roles yet; no deprecation date for legacy permissions.
- Pages: members and User Groups use Developer Platform roles, not Workers roles.
- Also covers https://developers.cloudflare.com/workers/authorization/durable-objects/: Durable Objects have no separate roles. Access follows the implementing Worker's role. `Metadata Read-Only` includes DO metrics, logs, and traces (not stored data); the **Total KV storage** metric is unavailable for KV-backed Durable Objects. Durable Objects Data Studio (SQLite-backed only) needs at least `Editor` on the implementing Worker.

## Related

- [roles-and-permissions.md](./roles-and-permissions.md)
- [get-started-cli.md](./get-started-cli.md)
