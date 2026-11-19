---
source: https://docs.cloud.google.com/infrastructure-manager/docs/state-file
---

# Manage the Terraform state file

Infra Manager keeps a Terraform state file per deployment and revision. To inspect or mutate it (for example to import or remove resources), lock the deployment, download the state file through a signed Cloud Storage URL, change it locally with the Terraform CLI, upload it, and unlock.

## Signature / Usage

### Lock the deployment

```bash
gcloud infra-manager deployments lock DEPLOYMENT_ID --project PROJECT_ID --location LOCATION
```

The output contains a `lock ID` used for upload and unlock. Retrieve it any time:

```bash
gcloud infra-manager deployments export-lock DEPLOYMENT_ID --project PROJECT_ID --location LOCATION
```

### Download the state file

Adapted (not in the official docs): `curl -f` is added and the variable is quoted, so an HTTP error is not written into `terraform.tfstate` and the URL is not word-split.

```bash
SIGNED_STATE_DOWNLOAD_URL=$(gcloud infra-manager deployments export-statefile DEPLOYMENT_ID --project PROJECT_ID --location LOCATION --format="get(signedUri)")

curl -sf -X GET --output terraform.tfstate "${SIGNED_STATE_DOWNLOAD_URL}"
```

### Mutate locally

Keep the `*.tf` files in the same directory as `terraform.tfstate`.

```bash
terraform init
```

If previously initialized:

```bash
terraform init -reconfigure
```

### Upload the state file

```bash
LOCK_ID=$(gcloud infra-manager deployments export-lock DEPLOYMENT_ID --project PROJECT_ID --location LOCATION --format="get(lockId)")
```

Adapted (not in the official docs): `curl -f` added and variables quoted.

```bash
SIGNED_STATE_UPLOAD_URL=$(gcloud infra-manager deployments import-statefile DEPLOYMENT_ID --project PROJECT_ID --location LOCATION --lock-id "${LOCK_ID}" --format="get(signedUri)")

curl -sf -X PUT --upload-file terraform.tfstate "${SIGNED_STATE_UPLOAD_URL}"
```

### Unlock the deployment

```bash
LOCK_ID=$(gcloud infra-manager deployments export-lock DEPLOYMENT_ID --project PROJECT_ID --location LOCATION --format="get(lockId)")
```

Adapted (not in the official docs): `${LOCK_ID}` quoted.

```bash
gcloud infra-manager deployments unlock DEPLOYMENT_ID --project PROJECT_ID --location LOCATION --lock-id "${LOCK_ID}"
```

## Options / Props

### Permissions (included in `roles/config.admin`)

| Permission |
|---|
| `config.deployments.lock` |
| `config.revisions.getState` |
| `config.deployments.updateState` |
| `config.deployments.unlock` |
| `config.deployments.getLock` |
| `config.deployments.getState` |

## Notes

- The deployment must be locked to download the state file; locking prevents other changes while you edit.
- You need a local copy of the matching Terraform configuration (to run `terraform refresh` or `terraform plan` locally) and the Terraform CLI installed.
- If you change configuration files locally, upload them to the Cloud Storage bucket or public Git repository used as the deployment source.
- The signed URLs grant access to state; treat them as credentials and do not share them. Edit state only after reading HashiCorp's state-manipulation guidance; try it on a disposable deployment first.
- Adapted from the official docs: the source used `curl -s -X GET --output terraform.tfstate ${SIGNED_STATE_DOWNLOAD_URL}`, `curl -s -X PUT --upload-file terraform.tfstate ${SIGNED_STATE_UPLOAD_URL}`, `--lock-id ${LOCK_ID}`; `-f` and quoting were added.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/state-file (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deployments-revisions.md](./deployments-revisions.md)
- [update-deployment.md](./update-deployment.md)
- [view-resources.md](./view-resources.md)
