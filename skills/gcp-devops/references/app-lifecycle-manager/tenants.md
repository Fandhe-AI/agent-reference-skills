---
source: https://docs.cloud.google.com/app-lifecycle-manager/tenants
---

# Tenants and tenant projects

An App Lifecycle Manager tenant resource represents a logical customer of your SaaS offering and is mainly an organizational tool for grouping the units that belong to that tenant. For multi-tenant offerings, provision each tenant's resources into a separate Google Cloud project.

## Signature / Usage

### Enable APIs in a tenant project

The necessary APIs must be enabled in the tenant project, otherwise provisioning fails. The set below is the one the source's tenant guide enables.

```bash
gcloud services enable \
    saasservicemgmt.googleapis.com \
    artifactregistry.googleapis.com \
    config.googleapis.com \
    developerconnect.googleapis.com \
    cloudbuild.googleapis.com \
    storage.googleapis.com \
    --project=TENANT_PROJECT_ID
```

### Automate tenant set-up with a provisional unit kind

A provisional unit kind contains a Terraform configuration that:

- Creates a new Google Cloud project for the tenant.
- Enables the necessary APIs within that project.
- Creates a dedicated actuation service account (in the producer project or the tenant project).
- Grants the necessary IAM permissions to service accounts within the tenant project.
- Sets up networking, logging or other baseline infrastructure.

It should define Terraform `output` variables `tenant_project_id`, `tenant_project_number` and the `actuation_sa` email, and receive `tenant_project_id` and `tenant_project_number` as `input` variables. Configure the application unit kind to depend on it and map the outputs to the application unit's inputs.

## Options / Props

| Project | Description |
|---------|-------------|
| Producer project | Where the SaaS offering is configured; only one is needed per SaaS application. |
| Tenant project | Holds the App Lifecycle Manager resources for one tenant; one project per tenant is recommended. |

## Notes

- You create both the producer and tenant projects, before associating them in App Lifecycle Manager. Separate projects let you set IAM policies or network peering per tenant and track cost per tenant.
- Set up a separate actuation service account for each tenant; it needs permissions in the tenant project to create and manage the Terraform resources. APIs must be enabled for all resource types the Terraform configuration uses in the tenant project.
- With the dependency in place, App Lifecycle Manager verifies the tenant infrastructure unit is provisioned (project created, permissions set) before the application unit is provisioned.
- Snippet taken from https://docs.cloud.google.com/app-lifecycle-manager/create-tenants (the source page has no code).
- Source: https://docs.cloud.google.com/app-lifecycle-manager/tenants (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-tenants.md](./create-tenants.md)
- [variables.md](./variables.md)
- [service-accounts.md](./service-accounts.md)
