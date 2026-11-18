---
source: https://docs.cloud.google.com/secret-manager/docs/choosing-replication
---

# Choose a secret replication policy

A replication policy sets where a secret's payload data is stored. Configure each secret with automatic or user-managed replication at creation; the locations in the policy can't be updated. Replication is synchronous and Secret Manager provides strong consistency: data is available across all configured replicas immediately when a secret is created or updated.

## Signature / Usage

### Automatic (the default in the gcloud CLI and the web UI)

```bash
gcloud secrets create my-secret
```

### User managed

```bash
gcloud secrets create my-secret --data-file=/tmp/secret \
    --replication-policy=user-managed --locations=us-central1
```

## Options / Props

| Policy | Where payload is stored | Billing | Resource location organization policy |
|---|---|---|---|
| Automatic | Replicated without restriction across multiple regions globally; Google Cloud manages distribution. Recommended for most users. | Considered stored in a single location. | Secret can only be created if resource creation in `global` is allowed. |
| User managed | A user-configured set of locations; any number of supported locations (see [locations.md](./locations.md)). | Each location is a separate location. | Secret can only be created if resource creation is allowed in all selected locations. |

## Notes

- With user-managed replication to multiple regions, if one or more regions have an outage the create or update action fails and Secret Manager returns an error; this keeps data consistent.
- Replication policy is immutable after creation (the REST `replication` field is "Optional. Immutable").
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/create (gcloud 593.0.0 help); the source has no code.
- Source: https://docs.cloud.google.com/secret-manager/docs/choosing-replication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [locations.md](./locations.md)
- [creating-and-accessing-secrets.md](./creating-and-accessing-secrets.md)
- [global-regionalized-service-comparison.md](./global-regionalized-service-comparison.md)
