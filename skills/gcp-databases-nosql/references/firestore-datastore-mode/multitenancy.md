---
source: https://docs.cloud.google.com/datastore/docs/concepts/multitenancy
---

# Multitenancy

Datastore mode supports multitenancy by providing namespaces: separate data partitions per tenant within a single project, with a single logical structure for kinds and a single set of index definitions.

## Signature / Usage

### Partition IDs per tenant

```text
Partition ID: project:"my_project_id"/namespace:"Joe"
Partition ID: project:"my_project_id"/namespace:"Alice"
Partition ID: project:"my_project_id"/namespace:"Charlie"
```

### Shared logical structure of a kind

```yaml
kind: Task
properties:
 - "done", Boolean
 - "created", DateTime
 - "description", String, excluded from index
```

## Options / Props

| Concept | Rule |
|---|---|
| Partition ID | Project ID + namespace ID. An entity belongs to a single partition; queries are scoped to a single partition |
| Namespace assignment | Specified at entity creation; cannot be changed afterwards |
| Default namespace | Used when none is specified; it has no string identifier |
| Parent / ancestors | An entity and all its ancestors belong to one namespace; a child is always in its parent's namespace |

## Notes

- Namespaces are not a security mechanism: a user with access to one partition in a project has access to all partitions in the project. They only organize entities within a project.
- To be multitenant, an application must treat a kind identically in every namespace. If indexing differs per namespace (for example `description` excluded from indexes in one namespace and included in another), the application is not multitenant.
- Namespace statistics are shown on the Datastore Dashboard page of the Google Cloud console. Namespaces can be listed programmatically with namespace queries (https://docs.cloud.google.com/datastore/docs/concepts/metadataqueries#namespace_queries).
- Within a tenant, group data by kinds, and organize highly related data with entity groups.
- Source: https://docs.cloud.google.com/datastore/docs/concepts/multitenancy (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [indexes.md](./indexes.md)
- [limits.md](./limits.md)
