---
source: https://docs.cloud.google.com/sql/docs/postgres/roles-and-permissions
---

# Roles and permissions

How IAM roles and permissions are used with Cloud SQL instances: which roles connecting accounts need for the Auth Proxy, serverless runtimes, Cloud Storage import/export, IAM group authentication, and private access from other Google Cloud services.

## Signature / Usage

An account that connects to a Cloud SQL instance must have the Cloud SQL Client role (`roles/cloudsql.client`), which includes the required connection permissions. To add, view or remove members in the project-level IAM policy (`gcloud beta projects add-iam-policy-binding`, `get-iam-policy`, `remove-iam-policy-binding`), the administrator needs `resourcemanager.projects.getIamPolicy` and `resourcemanager.projects.setIamPolicy`; the connecting account does not.

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/connect-connectors (local Application Default Credentials for a principal that has `roles/cloudsql.client`):

```bash
gcloud auth application-default login
```

## Options / Props

Serverless service accounts (each needs the Cloud SQL Client role):

| Serverless option | Service account suffix |
|-------------------|------------------------|
| App Engine | `@gae-api-prod.google.com.iam.gserviceaccount.com` |
| Cloud Run functions | `@appspot.gserviceaccount.com` |
| Cloud Run | `compute@developer.gserviceaccount.com` |

Roles to manage IAM group authentication:

| Action | Role |
|--------|------|
| Create, view, and manage groups (as listed in the source; see Notes) | `roles/resourcemanager.organizationViewer` |
| View the IAM group membership change log | `roles/logging.viewer` |
| Grant, view, and set IAM permissions at the project level | `roles/resourcemanager.projectIamAdmin` |
| Grant, view, and set IAM permissions at the folder level | `roles/resourcemanager.folderIamAdmin` |

Other role requirements:

| Scenario | Requirement |
|----------|-------------|
| Export data | Cloud SQL Editor `roles/cloudsql.editor` or a custom role with `cloudsql.instances.export` |
| Import/export via Cloud Storage | The Cloud SQL instance's service account needs `storage.objectAdmin` (grant with `gcloud storage buckets add-iam-policy-binding`) |
| Knowledge Catalog metadata | `roles/cloudsql.schemaViewer` or a custom role with `cloudsql.schemas.view` |
| Another Google Cloud service (such as BigQuery) reaching a private instance over the internal path | Identity with `cloudsql.instances.connect`; BigQuery's service account `service-{PROJECT_NUMBER}@gcp-sa-bigqueryconnection.iam.gserviceaccount.com` has `cloudsql.instances.connect` and `cloudsql.instances.get` |

## Notes

- Source inconsistency: the source lists `roles/resourcemanager.organizationViewer` for "Create, view, and manage groups", but that role contains only `resourcemanager.organizations.get` (IAM roles reference). It lets the console read the organization; creating and managing the groups themselves needs group-administration rights in Cloud Identity / Google Workspace (Not from the source: for example a Groups Admin administrator role there).
- These are the default runtime service accounts (the Cloud Run one is `PROJECT_NUMBER-compute@developer.gserviceaccount.com`); granting Cloud SQL Client to a default service account gives it to every workload that uses that account. Prefer a dedicated user-managed service account with only `roles/cloudsql.client` (`gcp-foundation`). The full account form and this least-privilege advice are not stated in the source page.
- If the error `The caller does not have permission Connection matched pg_hba.conf line 20: "local all +cloudsqliamuser cloudsql-iam-user"` appears when a service account connects, add the Cloud SQL Instance User role to the account.
- The source says a Compute Engine instance using the Auth Proxy can use its default Compute Engine service account. A dedicated service account with only the required roles is the least-privilege alternative (`gcp-foundation`).
- The source mentions downloading service account JSON credentials from the Console for scenarios such as Docker containers; keys are a security risk, so prefer attached service accounts or ADC where possible (`gcp-foundation`).
- Private-path traffic from services such as BigQuery can't be restricted with VPC configuration, firewall rules, route policies or cutting peering; control it with an instance flag or by granting or revoking IAM permissions for the identity the service uses.
- Revoking access typically takes about a minute, sometimes longer.
- Best practices: least privilege; avoid giving roles with `setIamPolicy` to people you don't know; assign Cloud SQL Admin to a group or to at least two individuals.
- The source also covers Console steps for add/view/remove of project members; omitted. Roles for CMEK, VPC Service Controls, and GKE Secrets are linked from the source.
- Snippet is borrowed because the source has no code block.
- Cloud SQL is managed PostgreSQL on Google Cloud; IAM and service account fundamentals: `gcp-foundation`.
- Source: https://docs.cloud.google.com/sql/docs/postgres/roles-and-permissions (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/sql/docs/postgres/connect-connectors

## Related

- [iam-roles.md](./iam-roles.md)
- [instance-access-control.md](./instance-access-control.md)
- [iam-authentication.md](./iam-authentication.md)
