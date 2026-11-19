---
source: https://docs.cloud.google.com/config-connector/docs/reference/annotations
---

# Config Connector annotations

Annotations supported by Config Connector resources: generic annotations for all resources, resource-specific annotations, and annotations managed internally by Config Connector.

## Signature / Usage

Resource-specific annotation example: with `force-destroy` on a `StorageBucket`, Config Connector deletes all objects in the bucket first, then the bucket.

```yaml
metadata:
  annotations:
    cnrm.cloud.google.com/force-destroy: "true"
```

## Options / Props

### Generic annotations (all resources)

| Annotation | Description |
|---|---|
| `cnrm.cloud.google.com/deletion-policy: POLICY` | Can be `"none"` or "abandon". When deleting a Config Connector resource the associated Google Cloud resource is deleted by default. To keep it, specify "abandon". Default value is "none". |
| `cnrm.cloud.google.com/management-conflict-prevention-policy: POLICY` | Can be "none" or "resource". Default value is "none". |
| `cnrm.cloud.google.com/ignore-clusterless: "true"` | Can be `"true"` or `"false"`. Indicates resources which should be skipped when running outside a server environment (for example, they are not exported as Terraform). Default value is `"false"`. |
| `cnrm.cloud.google.com/reconcile-interval-in-seconds: NUMBER` | Must be a non-negative integer. |
| `cnrm.cloud.google.com/backoff-max-delay-in-seconds: NUMBER` | Must be a non-negative integer. Requires Config Connector version 1.160.0 or later. Supported only for resources managed by direct controllers. |

### Annotations for internal usage (never set or edit)

| Annotation | Description |
|---|---|
| `cnrm.cloud.google.com/mutable-but-unreadable-fields` | Added and managed by Config Connector for resources with mutable but unreadable fields (for example, a "password" field in some resource specs). |
| `cnrm.cloud.google.com/observed-secret-versions` | Added and managed by Config Connector for resources with sensitive fields. |
| `cnrm.cloud.google.com/supports-ssa` | Added and managed by Config Connector for resources with server-side apply enabled. |
| `cnrm.cloud.google.com/blueprint` | Added for resources used in KRM blueprints. |

## Notes

- Resource-specific annotations make Config Connector take actions beyond creating or deleting resources; check each resource's reference page for them. Cloud Storage does not let you delete a `StorageBucket` that contains objects, which is why `force-destroy` exists; it permanently deletes the bucket's objects, so try it on a disposable project first.
- Scope-defining annotations (`project-id`, `folder-id`, `organization-id`) are covered in organizing-resources-overview.
- Source: https://docs.cloud.google.com/config-connector/docs/reference/annotations (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-deleting-resources.md](./managing-deleting-resources.md)
- [organizing-resources-overview.md](./organizing-resources-overview.md)
- [resources-reference-overview.md](./resources-reference-overview.md)
