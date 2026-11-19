---
source: https://docs.cloud.google.com/infrastructure-manager/docs/automate-git
---

# Automate deployments from Git with Cloud Build triggers

Connect Cloud Build triggers to Infra Manager so that a pull request creates a deployment preview and a merged commit creates or updates the deployment. The `im_cloudbuild_workspace` Terraform module creates the repository connection and both triggers.

## Signature / Usage

Caution from the source: Infra Manager does not perform data migration or ensure service continuity. If a revision deletes or replaces a database, managing data migration is your responsibility. Creating a revision can cause unrecoverable data loss, and re-applying the previous revision will not restore the data.

### Add the module to `main.tf` in your Git repository

```hcl
module "im-workspace" {
 source = "terraform-google-modules/bootstrap/google//modules/im_cloudbuild_workspace"
 version = "~> 7.0"

 project_id = "PROJECT_ID"
 deployment_id = "DEPLOYMENT_ID"
 im_deployment_repo_uri = "GIT_REPO"
 im_deployment_ref = "REF"

 github_app_installation_id = "GIT_APP_ID"
 github_personal_access_token = "TOKEN"
}
```

### Create or update the deployment that contains the module

Adapted (not in the official docs): a space after the first trailing `\` is removed so the line continuation works.

```bash
gcloud infra-manager deployments apply projects/PROJECT_ID/locations/LOCATION/deployments/DEPLOYMENT_ID \
   --service-account projects/SERVICE_ACCOUNT_PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT \
   --git-source-repo=GIT_REPO \
   --git-source-directory=DIRECTORY \
   --git-source-ref=REF
```

## Options / Props

### Module inputs

| Input | Description |
|---|---|
| `project_id` | Project ID where Infrastructure Manager runs |
| `deployment_id` | Deployment identifier you specify |
| `im_deployment_repo_uri` | URI of the Git repository |
| `im_deployment_ref` | Git reference; optional, default branch if omitted |
| `github_app_installation_id` | Installation ID of the Cloud Build GitHub app used for pull and push request triggers |
| `github_personal_access_token` | Personal access token for the GitHub repository; if provided, creates a secret within Secret Manager |

### Resources created by the module

| Resource |
|---|
| A Cloud Build repository connection |
| A trigger invoked when a pull request is created: Infra Manager creates a preview deployment |
| A trigger invoked when a pull request is merged: Infra Manager creates or updates the deployment |

## Notes

- Prerequisites: Infra Manager enabled, `roles/config.admin`, a service account with the needed permissions, an existing Git repository with the Terraform configuration. Recommended: branch protection on the repository.
- Steps before the module: install the Cloud Build GitHub App on your account or organization, then create a GitHub personal access token with no expiration date and the permissions `repo` and `read:user` (add `read:org` if the app is installed in an organization). An existing token stored in a secret from a previous connection can be reused.
- The personal access token is a long-lived credential; the source does not give a narrower alternative. `"TOKEN"` is a placeholder: never commit a real token to HCL or version control. Module behavior is documented in the module README (https://github.com/terraform-google-modules/terraform-google-bootstrap/tree/v7.2.0/modules/im_cloudbuild_workspace; the source links the `master` branch, and v7.2.0 is the latest release matching the example's `version = "~> 7.0"`).
- To verify the connection, open a pull request and view the validation results in GitHub.
- Revisions might delete or replace provisioned resources; try the flow on a disposable project first.
- Adapted from the official docs: the first `gcloud` line ended with `\ ` (backslash plus trailing space), which breaks the continuation; the space was removed. The source tags the module block as `terraform`; it is shown as `hcl`.
- Cloud Build triggers are in `gcp-devops`; Secret Manager is in `gcp-security`.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/automate-git (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-resources.md](./deploy-resources.md)
- [update-deployment.md](./update-deployment.md)
- [configure-service-account.md](./configure-service-account.md)
