---
source: https://docs.cloud.google.com/app-lifecycle-manager/create-tenants
---

# Create tenant projects and resources

Set up one producer project and one tenant project per tenant, create a tenant resource, associate units with it, and provision or upgrade units with the `tenant_project_id` and `tenant_project_number` variables. Isolating tenants in separate projects separates resources, IAM policies, quotas and network configurations, making it less likely that a breach or misconfiguration affects other tenants.

## Signature / Usage

### Set up producer and tenant projects with gcloud

1. Create your producer project and a tenant project for each tenant:

```bash
gcloud projects create \
    PRODUCER_PROJECT_ID \
    --name="SaaS producer project"
gcloud projects create \
    TENANT_PROJECT_ID \
    --name="SaaS tenant A project"
```

2. Enable billing for your tenant and producer projects:

```bash
gcloud billing projects link \
    PRODUCER_PROJECT_ID \
    --billing-account=BILLING_ACCOUNT_ID
gcloud billing projects link \
    TENANT_PROJECT_ID \
    --billing-account=BILLING_ACCOUNT_ID
```

3. Enable the APIs required by App Lifecycle Manager in your tenant projects:

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

4. Grant the actuation service account the necessary IAM roles for each tenant project (run for each role):

```bash
gcloud projects add-iam-policy-binding \
    TENANT_PROJECT_ID \
    --member='serviceAccount:SERVICE_ACCOUNT_ID@PRODUCER_PROJECT_ID.iam.gserviceaccount.com' \
    --role=ROLE
```

### Create a tenant and associate a unit (gcloud)

```bash
gcloud app-lifecycle-manager tenants create my-tenant \
    --location=us-central1 --saas=my-saas
```

```bash
gcloud app-lifecycle-manager units create my-unit \
    --location=us-central1 --unit-kind=my-unit-kind \
    --tenant=my-tenant --management-mode=user --labels=env=prod
```

### Provision or re-provision a unit (Console path in the source)

1. Units > create a unit for your unit kind > Provision (or select the unit > Upgrade).
2. Select the Release (for an upgrade, the release created with the updated Terraform configuration).
3. Under Actuation service account, select the service account you granted roles to in the tenant project.
4. Under Other input variables, click Add tenant project variables and select your tenant project to populate `tenant_project_id` and `tenant_project_number`; optionally add other input variables.
5. Click Provision (or Upgrade). App Lifecycle Manager triggers Infrastructure Manager with the actuation service account, which provisions or updates the Terraform resources inside the tenant project.

## Options / Props

| Item | Description |
|------|-------------|
| `PRODUCER_PROJECT_ID`, `TENANT_PROJECT_ID` | Producer and tenant project IDs. |
| `BILLING_ACCOUNT_ID` | Billing account to associate with the projects. |
| `SERVICE_ACCOUNT_ID` | ID of the actuation service account. |
| `ROLE` | IAM role to grant (for example `roles/compute.admin`). |
| Tenant name | Name for the tenant resource. |
| Consumer resource | Optional consumer resource with consumer-defined settings for integration. |
| SaaS offering | Offering to associate the tenant with (cannot be changed after the tenant is created, gcloud help). |
| Region | Region where tenant metadata is stored. |
| Labels | Optional key-value labels. |

### Roles to enable APIs

| Role / permission | Purpose |
|-------------------|---------|
| `serviceusage.services.enable` | Permission needed to enable APIs; held by the Owner role (`roles/owner`) or the Service Usage Admin role (`roles/serviceusage.serviceUsageAdmin`). |

## Notes

- Before you begin: create a Terraform configuration, an Artifact Registry repository and an artifact (blueprint) in the producer project; enable the APIs; verify the required service accounts and IAM roles in the producer project, including the user-created service account and the roles on the `service-PROJECT_NUMBER@gcp-sa-saasservicemgmt.iam.gserviceaccount.com` service agent.
- Warning: the actuation service account creates, modifies and deletes resources in the tenant project; upgrading a unit re-applies the Terraform with the new release. Grant only the roles the resources need (least privilege; the source's `roles/compute.admin` is an example), and try upgrades on a disposable project first. A grant on the tenant project is a project-level grant; the source offers no resource-level alternative.
- If provisioning fails, verify that the required APIs are enabled and permissions are correct.
- The tenant association "primarily serves as an organizational tag". The source describes only the Console for tenant creation and unit association.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/tenants/create (gcloud 593.0.0 help), for the tenant create command.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/app-lifecycle-manager/units/create (gcloud 593.0.0 help), for the `units create --tenant` command.
- The source also shows Console steps for project setup, tenant creation and unit association.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/create-tenants (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [tenants.md](./tenants.md)
- [service-accounts.md](./service-accounts.md)
- [variables.md](./variables.md)
- [deploy-saas-offering.md](./deploy-saas-offering.md)
