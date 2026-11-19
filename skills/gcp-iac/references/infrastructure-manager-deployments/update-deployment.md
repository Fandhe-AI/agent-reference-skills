---
source: https://docs.cloud.google.com/infrastructure-manager/docs/update-deployment
---

# Update a deployment

Updating a deployment means applying a configuration with the same deployment name, which creates a new revision. Use it to return infrastructure to the chosen state or to implement infrastructure changes.

## Signature / Usage

Caution from the source: Infra Manager does not perform data migration or ensure service continuity. If the revision deletes or replaces a database, you manage the data migration. Creating a revision can cause unrecoverable data loss; re-applying the previous revision won't restore the data. Take any needed steps for data migration or service continuity first, and consider previewing the update.

### From a Cloud Storage bucket

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
--service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
--gcs-source gs://BUCKET_NAME/OBJECT_NAME \
--quota-validation=QUOTA_VALIDATION \
--input-values=INPUT_1_NAME=VALUE,INPUT_2_NAME=VALUE \
--tf-version-constraint=TERRAFORM_VERSION \
--annotations="ANNOTATION_KEY=ANNOTATION_VALUE" \
--provider-source=SERVICE_MAINTAINED
```

### From a Git repository

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
--service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
--git-source-repo="GIT_REPO" \
--git-source-directory="DIRECTORY" \
--git-source-ref="REF" \
--quota-validation=QUOTA_VALIDATION \
--input-values=INPUT_1_NAME=VALUE,INPUT_2_NAME=VALUE \
--tf-version-constraint=TERRAFORM_VERSION \
--annotations="ANNOTATION_KEY=ANNOTATION_VALUE" \
--provider-source=SERVICE_MAINTAINED
```

### From a local directory

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
--service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
--local-source="LOCAL_DIRECTORY" \
--quota-validation=QUOTA_VALIDATION \
--input-values=INPUT_1_NAME=VALUE,INPUT_2_NAME=VALUE \
--tf-version-constraint=TERRAFORM_VERSION \
--annotations="ANNOTATION_KEY=ANNOTATION_VALUE" \
--provider-source=SERVICE_MAINTAINED
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID`, `LOCATION`, `DEPLOYMENT_ID` | Project, location and identifier of the existing deployment |
| `SERVICE_ACCOUNT_PROJECT_ID`, `SERVICE_ACCOUNT` | Service account used to call Infra Manager |
| `BUCKET_NAME`, `OBJECT_NAME` | Configuration in Cloud Storage (directory or zip, not a Terraform file; generation number allowed with versioning) |
| `GIT_REPO`, `DIRECTORY`, `REF` | Git source; `REF` optional (default branch) |
| `LOCAL_DIRECTORY` | Local source directory |
| `QUOTA_VALIDATION` (optional) | `ENABLED` or `ENFORCED`; undefined = disabled (default) |
| `TERRAFORM_VERSION` (optional) | If omitted, Infra Manager uses the Terraform version of the existing deployment, or defaults to the latest supported free tier version (`1.5.7`); upgrading to a paid version (such as `1.16.5`) requires specifying it |
| `ANNOTATION_KEY`, `ANNOTATION_VALUE` (optional) | Free-form key-value pair |
| `--provider-source` (optional; REST field `providerConfig.sourceType`) | Determines which Terraform provider for Google Cloud the deployment uses: `SERVICE_MAINTAINED` uses the Infra Manager maintained Terraform provider; omit the flag to use the HashiCorp-maintained Terraform provider |

## Notes

- Prerequisites: Infra Manager enabled, `roles/config.admin`, a service account with permissions, the deployment identified, a configuration meeting the constraints (no sensitive data), quotas checked.
- The service account needs permissions for resources in the configuration used for the revision, and in both configurations if they differ.
- In the Console you can change Terraform version, service account, source, input values, labels and annotations, worker pools and the artifact bucket, but not **Deployment ID** or **Location**.
- A private Git repository needs the host and repository connected to Cloud Build (GitHub, GitHub Enterprise, GitLab, GitLab Enterprise) or the Developer Connect Git proxy.
- `--provider-source` is accepted by gcloud 593.0.0 (values `PROVIDER_SOURCE_UNSPECIFIED`, `SERVICE_MAINTAINED`) but is not listed in its help text; the REST field is `providerConfig.sourceType` (Discovery document `config.v1`: `PROVIDER_SOURCE_UNSPECIFIED` "Unspecified source type, default to public sources.", `SERVICE_MAINTAINED` "Service maintained provider source type.").
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/update-deployment (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-resources.md](./deploy-resources.md)
- [deployments-revisions.md](./deployments-revisions.md)
- [view-deployments.md](./view-deployments.md)
- [delete-deployments.md](./delete-deployments.md)
