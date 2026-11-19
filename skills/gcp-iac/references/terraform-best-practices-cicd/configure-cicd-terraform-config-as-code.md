---
source: https://docs.cloud.google.com/secure-source-manager/docs/configure-cicd-terraform-config-as-code
---

# Manage Infrastructure as Code with Terraform, Cloud Build and Secure Source Manager (GitOps)

Tutorial: store Terraform configuration in a Secure Source Manager repository where branches `dev` and `prod` represent environments (VPC networks `dev` and `prod` in one Google Cloud project). A push to `dev` or `prod` triggers Cloud Build to run `terraform init`, `plan` and `apply`; a push to any other branch runs `terraform plan` for all environments and applies nothing. State is stored in a Cloud Storage bucket. Billable components: Cloud Build, Cloud Storage, Compute Engine.

## Signature / Usage

### Enable APIs and set up the repository

```bash
gcloud services enable cloudbuild.googleapis.com compute.googleapis.com securesourcemanager.googleapis.com
```

```bash
git config --global credential.'https://*.*.sourcemanager.dev'.helper gcloud.sh
```

```bash
git clone https://github.com/GoogleCloudPlatform/solutions-terraform-cloudbuild-gitops.git
```

Adapted (not in the official docs): `cd ~/solutions-terraform-cloudbuild-gitops` is added so `git remote add` runs inside the clone.

```bash
cd ~/solutions-terraform-cloudbuild-gitops
git remote add google HTTPS_REPO_URL
```

```bash
git checkout dev
```

```bash
git push -u google --all
```

Create an empty Secure Source Manager repository first (do not initialize it), repeat the `dev` checkout and push for the `prod` branch, and re-authenticate later with `gcloud auth login`.

### Build configuration (`cloudbuild.yaml`, in the `dev` branch)

```yaml
# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


steps:
- id: 'clone repository'
  name: 'gcr.io/cloud-builders/git'
  args:
  - clone
  - '${_REPO_URL}'
  - .
- id: 'branch name'
  name: gcr.io/cloud-builders/git
  entrypoint: 'sh'
  args:
  - '-c'
  - |
      branch=$(basename "$_REF")
      git checkout ${branch}
      echo "***********************"
      git branch --show-current
      echo "***********************"

- id: 'tf init'
  name: 'hashicorp/terraform:1.0.0'
  entrypoint: 'sh'
  args:
  - '-c'
  - |
   branch=$(basename "$_REF")
      if [ -d "environments/${branch}/" ]; then
        cd environments/${branch}
        terraform init
      else
        for dir in environments/*/
        do
          cd ${dir}
          env=${dir%*/}
          env=${env#*/}
          echo ""
          echo "*************** TERRAFORM INIT ******************"
          echo "******* At environment: ${env} ********"
          echo "*************************************************"
          terraform init || exit 1
          cd ../../
        done
      fi

- id: 'tf plan'
  name: 'hashicorp/terraform:1.0.0'
  entrypoint: 'sh'
  args:
  - '-c'
  - |
      branch=$(basename "$_REF")
      if [ -d "environments/${branch}/" ]; then
        cd environments/${branch}
        terraform plan
      else
        for dir in environments/*/
        do
          cd ${dir}
          env=${dir%*/}
          env=${env#*/}
          echo ""
          echo "*************** TERRAFOM PLAN ******************"
          echo "******* At environment: ${env} ********"
          echo "*************************************************"
          terraform plan || exit 1
          cd ../../
        done
      fi

- id: 'tf apply'
  name: 'hashicorp/terraform:1.0.0'
  entrypoint: 'sh'
  args:
  - '-c'
  - |
      branch=$(basename "$_REF")
      if [ -d "environments/${branch}/" ]; then
        cd environments/${branch}
        terraform apply -auto-approve
      else
        echo "***************************** SKIPPING APPLYING *******************************"
        echo "Branch '${branch}' does not represent an official environment."
        echo "*******************************************************************************"
      fi
```

### Remote state in Cloud Storage (`backend.tf`)

```hcl
terraform {
  backend "gcs" {
    bucket = "PROJECT_ID-tfstate"
    prefix = "env/dev"
  }
}
```

Adapted (not in the official docs): `${PROJECT_ID}` is quoted.

```bash
PROJECT_ID=$(gcloud config get-value project)
gcloud storage buckets create "gs://${PROJECT_ID}-tfstate"
```

Adapted (not in the official docs): `${PROJECT_ID}` is quoted.

```bash
gcloud storage buckets update "gs://${PROJECT_ID}-tfstate" --versioning
```

Adapted (not in the official docs): `${PROJECT_ID}` is quoted.

```bash
sed -i "s/PROJECT_ID/${PROJECT_ID}/g" environments/*/terraform.tfvars
sed -i "s/PROJECT_ID/${PROJECT_ID}/g" environments/*/backend.tf
```

On OS X or macOS you might need `sed -i ""` instead of `sed -i`.

### Grant the Cloud Build service account access

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member serviceAccount:CLOUDBUILD_SA --role roles/editor
```

### Promote changes

```bash
git checkout -b bug-fix
```

```bash
git add --all
git commit -m "Fix typo."
git push google -u bug-fix
```

Open a pull request into `dev` (this triggers the apply for `dev`), test, then a pull request from `dev` into `prod`.

## Options / Props

### Trigger settings (Cloud Build console)

| Setting | Value |
|---------|-------|
| Name | `trigger-on-push` |
| Region | Region of the trigger; must match the region of the private pool if the build config specifies one; `global` uses the region from the build config (private pool region, or the global default pool) |
| Event | Webhook event |
| Webhook URL | New secret generated by Cloud Build, or an existing Secret Manager secret and version |
| Configuration | Type Cloud Build configuration file (YAML or JSON), Location Inline |
| Substitution `_REPO_URL` | `$(body.repository.clone_url)` |
| Substitution `_REF` | `$(body.ref)` |

### Repository layout

| Path | Purpose |
|------|---------|
| `environments/` | One subfolder per environment (`dev`, `prod`), each with its own Terraform configuration |
| `modules/` | Inline Terraform modules shared across environments |
| `cloudbuild.yaml` | Build steps; conditional on the branch |

## Notes

- Destructive/automatic: `terraform apply -auto-approve` runs on every push to `dev` or `prod`. Try the tutorial in a disposable project. To clean up, delete the project; the source cautions that "Everything in the project is deleted."
- Broad grant: the source grants `roles/editor` (project editor) to the Cloud Build service account "for simplicity"; for production use least-privileged access. The source also notes the Cloud Build default service account is changing and recommends a user-specified service account.
- Public access: the tutorial's `dev` and `prod` environments create a VM with an external IP and a firewall rule `*-allow-http`, which you then open over plain `http://`. Use a disposable project.
- Webhook URL contains `key=` and `secret=` values: move the `?key=...` portion out of the Target URL and into the Sensitive Query String field. If using an existing secret you may need to grant Secret Manager Secret Accessor to the Cloud Build service agent `service-PROJECT_NUMBER@gcp-sa-cloudbuild.iam.gserviceaccount.com`. Hook IDs: lower case letters, numbers or dashes, start with a letter, cannot be changed.
- Private pool: external IPs must be assigned so the pool can reach the public internet.
- Enabling Object Versioning increases storage costs; mitigate with Object Lifecycle Management to delete earlier state versions.
- Cloud Build substitutions: user-defined substitutions "must begin with an underscore (`_`) and use only uppercase-letters and numbers (respecting the regular expression `_[A-Z0-9_]+`)", and `$$` includes a literal `$` in the build config.
- Corrected from the official docs: the source runs `git remote add google HTTPS_REPO_URL` right after `git clone` without entering the clone, while later steps of the same page run `cd ~/solutions-terraform-cloudbuild-gitops`; the page adds that `cd` before `git remote add`.
- Source: https://docs.cloud.google.com/build/docs/configuring-builds/substitute-variable-values (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source also shows Console steps (trigger, webhook, pull requests) and the sample output of the build logs; only the CLI and YAML forms are kept.
- Terraform version pinned by the build steps: `hashicorp/terraform:1.0.0`. Secure Source Manager and Cloud Build are in `gcp-devops`.
- Terraform CLI and HCL themselves behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Corrected from the official docs: the source expands `${PROJECT_ID}` / `$PROJECT_ID` unquoted in the bucket and `sed` commands; they are quoted so an empty value (no default project set) does not change the arguments.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/configure-cicd-terraform-config-as-code (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [operations.md](./operations.md)
- [version-control.md](./version-control.md)
- [security.md](./security.md)
