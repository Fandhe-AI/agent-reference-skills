---
source: https://docs.cloud.google.com/application-design-center/docs/import-terraform
---

# Import Terraform into an application template

Preview. Import an existing multi-product Google Cloud Terraform root module into an application template as is, without splitting it into component modules or publishing it to a catalog first. The imported template can be versioned as immutable revisions, previewed and deployed with Infrastructure Manager, or exported to Cloud Storage. This differs from importing single-product Terraform modules as catalog components.

## Signature / Usage

### 1. Create the application template

```bash
gcloud design-center spaces application-templates create APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --display-name=DISPLAY_NAME
```

### 2. Import the Terraform configuration (pick one source)

From a Cloud Storage bucket:

```bash
gcloud design-center spaces application-templates ingest-iac APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --gcs-uri=GCS_URI \
    --raw-terraform-import-enabled
```

From a Developer Connect repository:

```bash
gcloud design-center spaces application-templates ingest-iac APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --developer-connect-repo-uri=DEVELOPER_CONNECT_REPO_URI \
    --developer-connect-branch=DEVELOPER_CONNECT_BRANCH \
    --developer-connect-dir=DEVELOPER_CONNECT_DIR \
    --raw-terraform-import-enabled
```

From a public Git repository:

```bash
gcloud design-center spaces application-templates ingest-iac APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --git-source-repo=GIT_SOURCE_REPO \
    --git-source-ref-tag=GIT_SOURCE_REF_TAG \
    --git-source-dir=GIT_SOURCE_DIR \
    --raw-terraform-import-enabled
```

From a local YAML or JSON file containing an `IaCModule` payload:

```bash
gcloud design-center spaces application-templates ingest-iac APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --iac-module-from-file=IAC_MODULE_FILE \
    --raw-terraform-import-enabled
```

### 3. Snapshot an immutable revision

```bash
gcloud design-center spaces application-templates snapshot APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE
```

### 4. Create an application draft from the revision

```bash
gcloud design-center spaces applications create APPLICATION \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --source-application-template-revision=SOURCE_APPLICATION_TEMPLATE_REVISION \
    --deployment-project=DEPLOYMENT_PROJECT \
    --deployment-region=DEPLOYMENT_REGION \
    --app-parameters=APP_PARAMETERS \
    --scope-type=SCOPE_TYPE
```

### 5. Export Terraform to Cloud Storage

From an application template draft:

```bash
gcloud design-center spaces application-templates export APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
```

From a template revision:

```bash
gcloud design-center spaces application-templates revisions export REVISION \
    --application-template=APPLICATION_TEMPLATE \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
```

From an application (includes `zz_adc_inputs.auto.tfvars.json` with your configured application parameters):

```bash
gcloud design-center spaces applications export APPLICATION \
    --project=PROJECT \
    --location=LOCATION \
    --space=SPACE \
    --artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
```

## Options / Props

### Required roles

| Task | Required roles |
|---|---|
| Create, import, snapshot and export application templates and revisions | Application Design Center Admin (`roles/designcenter.admin`) or Application Design Center User (`roles/designcenter.user`) |
| Create, deploy and export applications | Application Admin (`roles/designcenter.applicationAdmin`) or Application Editor (`roles/designcenter.applicationEditor`) |

### Import source placeholders

| Name | Description |
|---|---|
| `GCS_URI` | `gs://BUCKET_NAME/FOLDER_PATH` |
| `DEVELOPER_CONNECT_REPO_URI` | `projects/PROJECT/locations/LOCATION/connections/CONNECTION/gitRepositoryLinks/REPO_LINK` |
| `DEVELOPER_CONNECT_BRANCH` | Branch name; alternatively use `--developer-connect-ref-tag` or `--developer-connect-commit-sha` |
| `DEVELOPER_CONNECT_DIR` / `GIT_SOURCE_DIR` | Directory path in the repository |
| `GIT_SOURCE_REPO` | HTTPS URL of the public Git repository |
| `GIT_SOURCE_REF_TAG` | Git reference or tag |
| `IAC_MODULE_FILE` | Path to a local YAML or JSON file containing your Terraform files |
| `SCOPE_TYPE` | `regional` or `global` |
| `APP_PARAMETERS` | Optional. Key-value pairs such as `key=KEY,value=VALUE`, or the path to a YAML or JSON file |
| `ARTIFACT_LOCATION_GCS_URI` | `gs://BUCKET_NAME/EXPORT_FOLDER` |

## Notes

- Supported Terraform sources: a Cloud Storage bucket, a Developer Connect repository, a public Git repository, or a local YAML or JSON file (the root module `.tf` files plus supporting files such as `.json`).
- A revision can be deployed directly (create an application, preview for an assessment report, deploy; no catalog needed) or reused by publishing it to a catalog and adding it as a component of a composite template.
- Previews and deployments use Infrastructure Manager (the `gcp-iac` skill covers Infrastructure Manager and Terraform in general).
- Exported Terraform is meant for running with your own CI/CD tools or keeping in version control.
- Source: https://docs.cloud.google.com/application-design-center/docs/import-terraform (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-applications.md](./deploy-applications.md)
- [manage-catalogs.md](./manage-catalogs.md)
- [design-application-templates.md](./design-application-templates.md)
