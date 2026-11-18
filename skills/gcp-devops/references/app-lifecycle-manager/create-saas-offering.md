---
source: https://docs.cloud.google.com/app-lifecycle-manager/create-saas-offering
---

# Create a SaaS offering

A SaaS offering lets you deploy and manage the infrastructure and application needed for a SaaS application. After creating it, you model and package the deployable units, then provision and deploy them. The regions you select are where App Lifecycle Manager provisions resources and deploys the application; end users access the offering from those regions.

## Signature / Usage

### Create with gcloud

```bash
gcloud app-lifecycle-manager saas create SAAS_OFFERING_NAME --location=global --locations=name=REGION_1 --locations=name=REGION_2
```

Repeat `--locations=name=REGION` for each region to host deployments.

### Example from the gcloud help

```bash
gcloud app-lifecycle-manager saas create my-saas \
    --location=us-central1 --locations=name=us-central1 \
    --locations=name=europe-west1 --labels=env=prod
```

## Options / Props

| Name | Description |
|------|-------------|
| `SAAS_OFFERING_NAME` | A name for the SaaS offering. |
| `--location` | Location ID of the SaaS offering resource (the source uses `global`). |
| `--locations=name=REGION` | Required. Regions where the offering's deployments are hosted; repeat the flag per region. See App Lifecycle Manager locations for available regions. |
| `--labels` | Optional. Keys start with a lowercase character and contain only hyphens, underscores, lowercase characters and numbers; values contain only hyphens, underscores, lowercase characters and numbers. |
| `--application-template`, `--application-template-revision` | Optional (gcloud help). Application Design Center composite template to import; specify only in source regions, leave unspecified in replica regions. Deleting the reference does not delete imported resources. |

## Notes

- Before you begin: enable App Lifecycle Manager, identify the resources and SaaS application to deploy (blueprints), and set up the required service accounts.
- Resource replication across the offering's regions is automated only when you use the Google Cloud console; it is not automated when you create or update resources with the gcloud CLI (see regionalization).
- The Console flow (App Lifecycle Manager > SaaS offering > Create: name, regions, optional labels) is omitted here.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/saas/create (gcloud 593.0.0 help), used for the second gcloud block.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/create-saas-offering (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [model-saas-offering.md](./model-saas-offering.md)
- [regionalization.md](./regionalization.md)
- [service-accounts.md](./service-accounts.md)
- [overview.md](./overview.md)
