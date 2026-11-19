---
source: https://docs.cloud.google.com/infrastructure-manager/docs/import-resources
---

# Import resources into an Infrastructure Manager deployment

Tutorial: deploy a VPC with the Terraform CLI, create a placeholder Infra Manager deployment, lock it, upload the Terraform state file and configuration, unlock it, and run a preview to confirm state and resources are in sync. You can only import resources that were provisioned using Terraform.

## Signature / Usage

### Grant permissions for the resources in the configuration

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member=serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/compute.networkAdmin
```

### Deploy the VPC with the Terraform CLI

```bash
mkdir vpc_to_import
cd vpc_to_import
cat <<EOF > main.tf
variable "project_id" {
  type = string
}

resource "google_compute_network" "vpc_network" {
  name = "my-custom-mode-network"
  project = var.project_id
}
EOF
```

```bash
terraform init
echo "**************  TERRAFORM APPLY  ******************"
terraform apply -var="project_id=PROJECT_ID" -auto-approve
cd ..
```

### Create a placeholder deployment

```bash
gcloud storage buckets create gs://import-deployment-configuration --project=PROJECT_ID

mkdir placeholder_deployment
cd placeholder_deployment
cat <<EOF > main.tf
EOF

gcloud storage cp main.tf gs://import-deployment-configuration
cd ..
```

Adapted (not in the official docs): `SERVICE_ACCOUNT` is replaced by `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`, the account this tutorial grants roles to and uses in the preview step.

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/us-central1/deployments/import-deployment \
--gcs-source gs://import-deployment-configuration \
--input-values project_id=PROJECT_ID \
--service-account projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### Lock, import state, upload configuration, unlock

Adapted (not in the official docs): `$SIGNED_STATE_UPLOAD_URL` and `${LOCK_ID}` are quoted and `curl` gets `-f` so a failed upload is not treated as success.

```bash
LOCK_ID=$(gcloud infra-manager deployments lock projects/PROJECT_ID/locations/us-central1/deployments/import-deployment --format="get(lockId)")

SIGNED_STATE_UPLOAD_URL=$(gcloud infra-manager deployments import-statefile projects/PROJECT_ID/locations/us-central1/deployments/import-deployment --lock-id "${LOCK_ID}" --format="get(signedUri)")
cd vpc_to_import
curl -sf -X PUT --upload-file terraform.tfstate "${SIGNED_STATE_UPLOAD_URL}"
```

```bash
gcloud storage cp main.tf gs://import-deployment-configuration
```

Adapted (not in the official docs): `${LOCK_ID}` is quoted.

```bash
gcloud infra-manager deployments unlock projects/PROJECT_ID/locations/us-central1/deployments/import-deployment \
--project PROJECT_ID \
--location us-central1 \
--lock-id "${LOCK_ID}"
```

### Preview to confirm no changes

Adapted (not in the official docs): added the missing `\` after `--service-account` so `--location` is part of the command.

```bash
gcloud infra-manager previews create projects/PROJECT_ID/locations/us-central1/previews/IMPORT_DEPLOYMENT_PREVIEW_NAME \
--gcs-source gs://import-deployment-configuration \
--deployment projects/PROJECT_ID/locations/us-central1/deployments/import-deployment \
--service-account projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
--location us-central1
```

```bash
gcloud infra-manager previews describe projects/PROJECT_ID/locations/us-central1/previews/IMPORT_DEPLOYMENT_PREVIEW_NAME
```

Adapted (not in the official docs): `$SIGNED_BIN_PLAN_URL` is quoted and `curl -f` is used.

```bash
SIGNED_BIN_PLAN_URL=$(gcloud infra-manager previews export projects/PROJECT_ID/locations/us-central1/previews/IMPORT_DEPLOYMENT_PREVIEW_NAME --format "get(result.binarySignedUri)")
curl -f -X GET --output tfplan.out "${SIGNED_BIN_PLAN_URL}"
```

```bash
terraform init
```

```bash
terraform show tfplan.out
```

```text
No changes. Your infrastructure matches the configuration.

Terraform has compared your real infrastructure against your configuration and found no differences, so no changes are needed.
```

### Clean up

Adapted (not in the official docs): the source deletes `quickstart-deployment`; this tutorial created `import-deployment`.

```bash
gcloud infra-manager deployments delete projects/PROJECT_ID/locations/us-central1/deployments/import-deployment
```

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | Your project ID. |
| `SERVICE_ACCOUNT_NAME` | Name of the service account. |
| `IMPORT_DEPLOYMENT_PREVIEW_NAME` | Name of the preview. |

## Notes

- Requirements: the Terraform configuration must comply with the Infra Manager constraints, and the resources must have been provisioned with a supported Terraform version. Install a supported Terraform version locally. The tutorial uses `us-central1`; any location where Infra Manager runs works. Billable components: Infrastructure Manager and Virtual Private Cloud.
- Corrected from the official docs: the source preview command is missing the `\` after `--service-account`; `curl` calls use unquoted signed-URL variables without `-f`, and `--lock-id ${LOCK_ID}` is unquoted; the clean-up deletes `quickstart-deployment` instead of `import-deployment`. The `deployments apply` step names `projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT`, a placeholder the page never defines; it was changed to the `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com` account of the IAM binding and the preview step (gcloud 593.0.0 help gives the format `projects/{projectID}/serviceAccounts/{serviceAccount}`).
- The source grants `roles/compute.networkAdmin` on the whole project to the service account (a project-wide grant, broader than the single VPC needs). `terraform apply -auto-approve` applies without confirmation: it is in the source, so use a disposable project.
- When you unlock, if the state file and the Terraform configuration differ, Infra Manager creates or deletes resources to match the state file. Caution from the source: deleting Google Cloud resources can cause unrecoverable data loss; re-deploying the configuration won't restore data.
- Clean up with `gcloud projects delete PROJECT_ID` (destructive; deletes everything in the project and custom project IDs are lost) or delete the VPC and deployment metadata with the `deployments delete` command above. Do this on a disposable project.
- Terraform creates the state file on the file system next to `main.tf`.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/import-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [export-view-preview-results.md](./export-view-preview-results.md)
- [preview-deployment.md](./preview-deployment.md)
