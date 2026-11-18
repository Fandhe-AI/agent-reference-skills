---
source: https://docs.cloud.google.com/app-lifecycle-manager/service-accounts
---

# App Lifecycle Manager service accounts

App Lifecycle Manager separates a Google-managed service agent, user-managed actuation service accounts, and an optional artifact creation service account across Google Cloud projects. Grant each the IAM roles it needs and follow the principle of least privilege.

## Signature / Usage

### Google-managed service account (service agent) format

```text
service-PROJECT_NUMBER@gcp-sa-saasservicemgmt.iam.gserviceaccount.com
```

`PROJECT_NUMBER` is your project number.

### Actuation service account input variable

When you create a unit with the gcloud CLI, provide the actuation service account as an input variable: name `actuation_sa`, type `String`, value the email address, for example:

```text
my-actuation-sa@my-identifier.iam.gserviceaccount.com
```

## Options / Props

### Service accounts

| Account | Managed by | Purpose |
|---------|------------|---------|
| App Lifecycle Manager service account | Google | Created automatically; interacts with other Google Cloud services during unit provisioning. |
| Actuation service account | User | Runs your Terraform through Infrastructure Manager when provisioning or updating units; creates, modifies and deletes the resources in the configuration. Create it in the producer project or the tenant project; multiple allowed; dedicated per tenant recommended. |
| Artifact creation service account (optional) | User | Builds and uploads Terraform configurations packaged as OCI artifacts to Artifact Registry; often a Cloud Build service account. Not needed if you build and push manually (for example `docker build` and `docker push`) with your own credentials or a service account with Artifact Registry permissions. |

### Minimum roles for the actuation service account

| Role | Description |
|------|-------------|
| `roles/iam.serviceAccountTokenCreator` | Generate tokens for authentication. |
| `roles/config.admin` | Full control over Infrastructure Manager resources. |
| `roles/storage.admin` | Full control of Cloud Storage. |

It also needs permissions for the resources your Terraform manages, for example `roles/container.admin` (GKE clusters), `roles/compute.admin` (Compute Engine instances) or `roles/cloudsql.admin` (Cloud SQL instances).

### Typical roles for a Cloud Build artifact creation service account

| Role | Description |
|------|-------------|
| `roles/artifactregistry.writer` | Push artifacts to Artifact Registry. |
| `roles/artifactregistry.repoAdmin` | Manage the Artifact Registry repository. |
| `roles/storage.admin` | Manage the Cloud Storage buckets. |
| `roles/developerconnect.admin` | Use Developer Connect. |
| `roles/developerconnect.readTokenAccessor` | Get a Developer Connect read token. |
| `roles/logging.logWriter` | Write logs. |
| `roles/cloudbuild.builds.builder` | Execute builds if you deploy your Terraform configuration using Developer Connect. |

Any other permissions your build process needs (for example access to source repositories).

## Notes

- Caution from the source: careful management of these accounts is crucial to security and function; grant only the necessary permissions to each. Consult each Google Cloud product's documentation to determine the permissions your Terraform needs; the roles above (`roles/storage.admin`, `roles/compute.admin`, and so on) are broad examples.
- The actuation service account can delete resources defined in your Terraform; a dedicated account per tenant (unit) limits the impact of mistakes and security breaches.
- The source says the Google-managed account "is automatically created after you create your first SaaS offering resource" in one place and "when you create your first App Lifecycle Manager resource" in another; the flags quickstart says it is created when you enable the API. Service agents are Google-managed; do not attach this service agent to your own workloads.
- IAM roles for App Lifecycle Manager itself are on the access control page (`app-lifecycle-manager/access-control`); general service accounts and service agents are in the `gcp-foundation` skill.
- Source: https://docs.cloud.google.com/app-lifecycle-manager/service-accounts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [tenants.md](./tenants.md)
- [create-tenants.md](./create-tenants.md)
- [variables.md](./variables.md)
- [flags-quickstart.md](./flags-quickstart.md)
