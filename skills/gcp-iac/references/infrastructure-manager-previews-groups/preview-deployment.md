---
source: https://docs.cloud.google.com/infrastructure-manager/docs/preview-deployment
---

# Preview a deployment

A preview describes the actions to actuate a specific Terraform configuration. Before you create or update an Infrastructure Manager deployment, create a preview (it runs `terraform plan`) to verify the resources that are planned to be provisioned. The configuration can be stored in a Cloud Storage bucket or in a Git repository.

## Signature / Usage

### Preview using a configuration in a Cloud Storage bucket

```bash
gcloud infra-manager previews create projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID \
--service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
--gcs-source gs://BUCKET_NAME/OBJECT_NAME \
--input-values=INPUT_1_NAME=VALUE,INPUT_2_NAME=VALUE \
--tf-version-constraint=TERRAFORM_VERSION \
--annotations="ANNOTATION_KEY=ANNOTATION_VALUE" \
--provider-source=SERVICE_MAINTAINED
```

### Preview using a configuration in a Git repository

If you use a private Git repository, first connect your GitHub host and repository using Cloud Build so Infra Manager can access it.

```bash
gcloud infra-manager previews create projects/PROJECT_ID/locations/LOCATION/previews/PREVIEW_ID \
--service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
--git-source-repo="GIT_REPO" \
--git-source-directory="DIRECTORY" \
--git-source-ref="REF" \
--input-values=INPUT_1_NAME=VALUE,INPUT_2_NAME=VALUE \
--tf-version-constraint=TERRAFORM_VERSION \
--annotations="ANNOTATION_KEY=ANNOTATION_VALUE" \
--provider-source=SERVICE_MAINTAINED
```

### Preview an update to an existing deployment

The two commands above have no `--deployment`, so they preview the configuration as a new deployment. To preview an update of an existing deployment against its current state, pass `--deployment` with the deployment's full name.

Snippet taken from https://docs.cloud.google.com/infrastructure-manager/docs/import-resources (retrieved 2026-11-19).

Adapted (not in the official docs): added the missing `\` after `--service-account` so `--location` is part of the command.

```bash
gcloud infra-manager previews create projects/PROJECT_ID/locations/us-central1/previews/IMPORT_DEPLOYMENT_PREVIEW_NAME \
--gcs-source gs://import-deployment-configuration \
--deployment projects/PROJECT_ID/locations/us-central1/deployments/import-deployment \
--service-account projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
--location us-central1
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Project ID where Infrastructure Manager runs. |
| `LOCATION` | Location where Infra Manager runs (see Infrastructure Manager locations). |
| `PREVIEW_ID` | Preview identifier you specify (see "Preview name" constraints in the deployments and revisions page). |
| `SERVICE_ACCOUNT` | Name of the service account used to call Infra Manager. |
| `SERVICE_ACCOUNT_PROJECT_ID` | Project ID of the service account; commonly the same project where Infra Manager runs. |
| `BUCKET_NAME` | Storage bucket where the configuration is stored. |
| `OBJECT_NAME` | Object name of the configuration: a directory or a zip file, not a Terraform file. With object versioning you can specify the generation number. Optional if the bucket is the root path of the configuration. |
| `GIT_REPO` | The Git repository. |
| `DIRECTORY` | Directory that has the Terraform configuration. |
| `REF` | Git reference; optional. Defaults to the repository's default configured branch. |
| `INPUT_1_NAME=VALUE`, `INPUT_2_NAME=VALUE` | Input values of the configuration, for example `project_id=my-project`. Optional if all inputs have defaults. |
| `TERRAFORM_VERSION` | Optional. Terraform version to use. If omitted, the latest supported free tier version of Terraform (`1.5.7`) is used. To preview with a paid version (such as `1.16.5`) you must specify it explicitly. Previews don't incur charges for paid Terraform versions. |
| `ANNOTATION_KEY`, `ANNOTATION_VALUE` | Optional free-form key-value pair. |
| `--deployment` (optional) | Full name of an existing deployment, `projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID`. gcloud help: "Deployment reference for preview." |
| `--provider-source` (optional; REST field `providerConfig.sourceType`) | Determines which Terraform provider for Google Cloud the deployment uses: `SERVICE_MAINTAINED` uses the Infra Manager maintained Terraform provider; omit the flag to use the HashiCorp-maintained Terraform provider |

## Notes

- Required IAM role to create previews: `roles/config.admin`. You also need a service account with the needed permissions, and the configuration must comply with the Infrastructure Manager Terraform constraints (including no sensitive data) and use a supported Terraform version.
- Fields from the deployment (configuration, variables, service account) are automatically merged into the preview unless you specify new values in the preview command.
- `--deployment` maps to the REST field `Preview.deployment` (Discovery document `config.v1`): "Optional. Deployment reference. If specified, the preview will be performed using the provided deployment's current state and use any relevant fields from the deployment unless explicitly specified in the preview create request." The preview-deployment page's two examples do not pass it; the update example is taken from the import-resources page, whose source command lacks the `\` after `--service-account`.
- `--provider-source` is accepted by gcloud 593.0.0 (values `PROVIDER_SOURCE_UNSPECIFIED`, `SERVICE_MAINTAINED`) but is not listed in its help text; the REST field is `providerConfig.sourceType` (Discovery document `config.v1`: `PROVIDER_SOURCE_UNSPECIFIED` "Unspecified source type, default to public sources.", `SERVICE_MAINTAINED` "Service maintained provider source type.").
- Previewing an update shows which resources are planned to be provisioned or deleted and which are not modified.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/preview-deployment (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [export-view-preview-results.md](./export-view-preview-results.md)
- [list-preview.md](./list-preview.md)
- [preview-deployment-deletion.md](./preview-deployment-deletion.md)
- [annotations.md](./annotations.md)
