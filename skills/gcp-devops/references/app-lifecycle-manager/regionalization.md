---
source: https://docs.cloud.google.com/app-lifecycle-manager/regionalization
---

# App Lifecycle Manager regionalization

Regionalization controls where a SaaS offering deploys units, replicates metadata and runs rollouts. The regions you select when creating the offering are its available regions and the single source of truth for supported regions.

## Signature / Usage

### Declare available regions

```bash
gcloud app-lifecycle-manager saas create SAAS_OFFERING_NAME --location=global --locations=name=REGION_1 --locations=name=REGION_2
```

## Options / Props

### Example configuration

Deploy in `us-central1` and `europe-west4`, with Artifact Registry and Developer Connect in `us-east1`.

| Resource | Region setting |
|----------|----------------|
| SaaS offering available regions | `['us-central1', 'europe-west4']` |
| Artifact Registry repository region | `us-east1` |
| Developer Connect instance region | `us-east1` |
| Unit kind and release resources | Managed (created and updated) across `global`, `us-central1` and `europe-west4` |
| Units | Can be created in `us-central1` or `europe-west4` |

### Rules

| Topic | Rule |
|-------|------|
| Replicated resources | SaaS offering (`Saas`), unit kind (`UnitKind`), release (`Release`). |
| Adding locations | Resources are replicated to the newly added locations. |
| Locations with old copies | The content is updated. |
| `global` as a region | Generally not recommended for deployment targets; App Lifecycle Manager uses `global` to propagate regional rollouts. Regional rollouts cannot run in `global`; units are not propagated to `global`. |
| Rollout locations | Determined by the top-level regions of the offering's available regions; rollouts read the list from the offering. |
| Artifact Registry and Developer Connect regions | Can be any valid Google Cloud region (need not be in the offering's regions), but the repository's region must match the Developer Connect instance's region. |
| Units | Can only be created in regions specified in the offering. |

## Notes

- Replication is automated only when you use the Google Cloud console. It is not automated when you create or update App Lifecycle Manager resources with the gcloud CLI; use the console to sync create or update operations across regions.
- Because the Artifact Registry repository and Developer Connect instance live in a single (possibly different) region, offering, release and unit kind resources must exist in all regions defined in the offering.
- Snippet taken from https://docs.cloud.google.com/app-lifecycle-manager/create-saas-offering (the `saas create` command).
- Supported regions are listed on the App Lifecycle Manager locations page (https://docs.cloud.google.com/app-lifecycle-manager/locations). Consider latency, compliance and data residency when choosing regions.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/regionalization (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-saas-offering.md](./create-saas-offering.md)
- [rollout-strategies.md](./rollout-strategies.md)
- [overview.md](./overview.md)
