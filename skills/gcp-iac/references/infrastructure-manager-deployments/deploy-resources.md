---
source: https://docs.cloud.google.com/infrastructure-manager/docs/deploy-resources
---

# Deploy infrastructure using Infrastructure Manager

Create a deployment with `gcloud infra-manager deployments apply` from a Cloud Storage bucket, a Git repository or a local directory (the Console supports Cloud Storage and Git). You can deploy to multiple projects and locations; the service account needs permissions for each.

## Signature / Usage

### Before you begin

- Enable Infra Manager; you need `roles/config.admin` to create deployments; prepare a service account (see configure-service-account.md).
- The configuration must meet the constraints (no sensitive data, no backend block).
- Check quotas; creating and updating deployments time out after two hours, previews after one hour. Split larger configurations into multiple deployments.
- A private Git repository needs the Git host and repository connected to Cloud Build (GitHub, GitHub Enterprise, GitLab, GitLab Enterprise) or the Developer Connect Git proxy.

### From a Cloud Storage bucket

Adapted (not in the official docs): a `\` is added after `--annotations="ANNOTATION_KEY=ANNOTATION_VALUE"` so the last line `--provider-source=SERVICE_MAINTAINED` is part of the same command.

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

Adapted (not in the official docs): a `\` is added after `--annotations="ANNOTATION_KEY=ANNOTATION_VALUE"` so the last line `--provider-source=SERVICE_MAINTAINED` is part of the same command.

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

In Cloud Shell, upload the configuration to Cloud Shell first.

Adapted (not in the official docs): a `\` is added after `--annotations="ANNOTATION_KEY=ANNOTATION_VALUE"` so the last line `--provider-source=SERVICE_MAINTAINED` is part of the same command.

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
| `PROJECT_ID` | Project ID where Infra Manager runs |
| `LOCATION` | Location where Infra Manager runs (see the locations page) |
| `DEPLOYMENT_ID` | User-specified deployment identifier (see deployments-revisions.md) |
| `SERVICE_ACCOUNT_PROJECT_ID` | Project ID of the service account; commonly the same project |
| `SERVICE_ACCOUNT` | Service account used to call Infra Manager |
| `BUCKET_NAME`, `OBJECT_NAME` | Bucket and object of the configuration. The object can be a directory or a zip file, not a Terraform file; with object versioning you can give the generation number. `OBJECT_NAME` is optional if the bucket root is the configuration root. |
| `GIT_REPO`, `DIRECTORY`, `REF` | Repository, directory with the configuration, and optional Git reference (default branch if omitted) |
| `LOCAL_DIRECTORY` | Local directory storing the configuration |
| `QUOTA_VALIDATION` (optional) | `ENABLED` computes quota validation and shows insufficient quotas; `ENFORCED` fails the deployment when quota is insufficient; undefined = disabled (default). Applies to limited resources. |
| `INPUT_1_NAME`, `INPUT_2_NAME` | Input values, including ones with no default (for example `project_id=my-project`); optional if all have defaults |
| `TERRAFORM_VERSION` (optional) | Terraform version; default is the latest supported free tier version (`1.5.7`); a paid version such as `1.16.5` must be specified |
| `ANNOTATION_KEY`, `ANNOTATION_VALUE` (optional) | Free-form key-value pair attached to the deployment |
| `--provider-source` (optional; REST field `providerConfig.sourceType`) | Determines which Terraform provider for Google Cloud the deployment uses: `SERVICE_MAINTAINED` uses the Infra Manager maintained Terraform provider; omit the flag to use the HashiCorp-maintained Terraform provider |

### Console advanced details

| Field | Format |
|---|---|
| Worker pool | `projects/{project}/locations/{location}/workerPools/{workerPoolId}` |
| Artifacts Cloud Storage bucket | `gs://{bucket}/{folder}` |

## Notes

- `--provider-source` is accepted by gcloud 593.0.0 (values `PROVIDER_SOURCE_UNSPECIFIED`, `SERVICE_MAINTAINED`) but is not listed in its help text; the REST field is `providerConfig.sourceType` (Discovery document `config.v1`: `PROVIDER_SOURCE_UNSPECIFIED` "Unspecified source type, default to public sources.", `SERVICE_MAINTAINED` "Service maintained provider source type.").
- A multi-region location (such as `us`) requires identical private worker pools pre-created in all member regions.
- Console steps (Deployment details, Terraform details, Advanced details pages) are not reproduced here.
- Terraform CLI and HCL behave as HashiCorp documents them; this skill covers using them with Google Cloud. Cloud Build private pools and triggers are in `gcp-devops`.
- Corrected from the official docs: the source commands end with `--annotations="ANNOTATION_KEY=ANNOTATION_VALUE"` followed by a separate line `--provider-source=SERVICE_MAINTAINED` without a `\` continuation, so the shell would run that line as a separate command; a `\` was added after `--annotations`.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/deploy-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-service-account.md](./configure-service-account.md)
- [upload-terraform-configuration.md](./upload-terraform-configuration.md)
- [update-deployment.md](./update-deployment.md)
- [automate-git.md](./automate-git.md)
- [delete-deployments.md](./delete-deployments.md)
