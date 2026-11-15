---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack
---

# DeployStack solutions: applications

Four DeployStack application solutions: Three Tier App, Storage Event Function App, Serverless Photo Sharing, and Static Hosting With Domain. Each is launched with its Open in Cloud Shell link; each solution page breaks down the Terraform in `./main.tf` and the build files.

## Signature / Usage

Common to every solution page: clicking the link opens a Cloud Shell session and downloads code from GitHub. "You will have to authorize DeployStack to run. No actions will be taken until you do so." Once there, a single command spins up a working copy of the application in your project. The source does not name that command and gives no teardown command.

### Three Tier App

A simple todo application as a vanilla 3 tier application. Backend: Cloud SQL (MySQL) and Cloud Memorystore (Redis). Middleware/API: Golang container on Cloud Run. Front end: Nginx + HTML/JS/CSS container on Cloud Run. Deployment: Cloud Build, Cloud Secret Manager, Artifact Registry.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-three-tier-app&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable services:

```hcl
variable "gcp_service_list" {
    description = "The list of apis necessary for the project"
    type        = list(string)
    default = [
        "compute.googleapis.com",
        "cloudapis.googleapis.com",
        "vpcaccess.googleapis.com",
        "servicenetworking.googleapis.com",
        "cloudbuild.googleapis.com",
        "sql-component.googleapis.com",
        "sqladmin.googleapis.com",
        "storage.googleapis.com",
        "secretmanager.googleapis.com",
        "run.googleapis.com",
        "artifactregistry.googleapis.com",
        "redis.googleapis.com"
    ]
}

resource "google_project_service" "all" {
    for_each                   = toset(var.gcp_service_list)
    project                    = var.project_number
    service                    = each.key
    disable_on_destroy = false
}
```

`./main.tf` - Set permissions (Cloud Build service account):

Adapted (not in the official docs): the official list has `roles/vpaccess.user`, a typo for `roles/vpcaccess.user` (Serverless VPC Access User); a binding with the misspelled role fails, so the corrected role is shown.

```hcl
variable "build_roles_list" {
    description = "The list of roles that build needs for"
    type        = list(string)
    default = [
        "roles/run.developer",
        "roles/vpcaccess.user",
        "roles/iam.serviceAccountUser",
        "roles/run.admin",
        "roles/secretmanager.secretAccessor",
        "roles/artifactregistry.admin",
    ]
}
resource "google_project_iam_member" "allbuild" {
    for_each   = toset(var.build_roles_list)
    project    = var.project_number
    role       = each.key
    member     = "serviceAccount:${local.sabuild}"
    depends_on = [google_project_service.all]
}
```

`./main.tf` - Create artifact for middleware (runs `gcloud builds submit`):

```hcl
resource "null_resource" "cloudbuild_api" {
  provisioner "local-exec" {
    working_dir = "${path.module}/code/middleware"
    command     = "gcloud builds submit . --substitutions=_REGION=${var.region},_BASENAME=${var.basename}"
  }
  depends_on = [
    google_artifact_registry_repository.todo_app,
    google_secret_manager_secret_version.redishost,
    google_secret_manager_secret_version.sqlhost,
    google_project_service.all
  ]
}
```

`./main.tf` - Create artifact for front end:

```hcl
resource "null_resource" "cloudbuild_fe" {
    provisioner "local-exec" {
        working_dir = "${path.module}/code/frontend"
        command     = "gcloud builds submit . --substitutions=_REGION=${var.region},_BASENAME=${var.basename}"
    }
    depends_on = [
        google_artifact_registry_repository.todo_app,
        google_cloud_run_service.api
    ]
}
```

`./code/database/load_schema.sh` - Initialize database schema (makes a temporary Cloud Storage bucket to upload the schema to Cloud SQL):

Adapted (not in the official docs): the official script expands the arguments and the command output unquoted, so a value with spaces or glob characters is split, including in the recursive delete; this version quotes every expansion and stops on the first error.

```bash
set -euo pipefail
PROJECT="$1"
SQLNAME="$2"

SQLSERVICEACCOUNT="$(gcloud sql instances describe "${SQLNAME}" --format="value(serviceAccountEmailAddress)")"
gcloud storage buckets create "gs://${PROJECT}-temp"
gcloud storage cp schema.sql "gs://${PROJECT}-temp/schema.sql"
gcloud storage buckets add-iam-policy-binding "gs://${PROJECT}-temp/" --member="serviceAccount:${SQLSERVICEACCOUNT}" --role=roles/storage.objectViewer
gcloud sql import sql "${SQLNAME}" "gs://${PROJECT}-temp/schema.sql" -q
gcloud storage rm "gs://${PROJECT}-temp" --recursive
```

`./code/middleware/clouldbuild.yaml` - Build API container:

Adapted (not in the official docs): the fetched source runs the build and push steps together in one block; they are shown as the two blocks below.

```yaml
name: 'gcr.io/cloud-builders/docker'
args: [ 'build', '-t', '$_REGION-docker.pkg.dev/$PROJECT_ID/$_BASENAME-app/api', '.' ]
```

Push API container to Artifact Registry:

```yaml
name: 'gcr.io/cloud-builders/docker'
args: ['push', '$_REGION-docker.pkg.dev/$PROJECT_ID/$_BASENAME-app/api']
```

Substitutions:

```yaml
substitutions:
  _REGION: us-central1
  _BASENAME: todo
```

`./code/frontend/clouldbuild.yaml` - Massage code content (injects the randomized Cloud Run API URL into the static JS):

```yaml
name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
entrypoint: bash
args: [ './massage.sh', '$_REGION' ]
```

Build the front end container:

```yaml
name: 'gcr.io/cloud-builders/docker'
args: [ 'build', '-t', '$_REGION-docker.pkg.dev/$PROJECT_ID/$_BASENAME-app/fe', '.' ]
```

Push to Artifact Registry:

```yaml
name: 'gcr.io/cloud-builders/docker'
args: ['push', '$_REGION-docker.pkg.dev/$PROJECT_ID/$_BASENAME-app/fe']
```

Substitutions:

```yaml
substitutions:
  _REGION: us-central1
  _BASENAME: todo
```

`./code/frontend/massage.sh` - Edit JavaScript:

Adapted (not in the official docs): the official script expands the region argument and the command output unquoted; this version quotes them.

```bash
API="$(gcloud run services describe todo-api --region="$1" --format="value(status.url)")"
stripped="${API#https://}"
sed -i"" -e "s/127.0.0.1:9000/${stripped}/" www/js/main.js
```

The remaining Terraform (VPC peering, VPC access connector `10.8.0.0/28`, Redis `REDIS_6_X`, Cloud SQL `MYSQL_5_7`, Artifact Registry repository, secrets `redishost` / `sqlhost`, Cloud Run API and front-end services, and world-readable IAM policies) is not reproduced; see https://github.com/googlecloudplatform/deploystack-three-tier-app.

### Storage Event Function App

An image directory and thumbnail maker. A client application where users upload images (Golang container API and static site on Cloud Run, plus Cloud Storage), an image processor that creates thumbnails (Cloud Functions, Golang), and a deployment pipeline (Cloud Build). Artifact Registry stores the Docker images.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-storage-event-function-app&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable services:

```hcl
variable "gcp_service_list" {
    description = "The list of apis necessary for the project"
    type        = list(string)
    default = [
        "cloudbuild.googleapis.com",
        "storage.googleapis.com",
        "cloudfunctions.googleapis.com",
        "run.googleapis.com",
        "artifactregistry.googleapis.com",
    ]
}

resource "google_project_service" "all" {
    for_each                   = toset(var.gcp_service_list)
    project                    = var.project_number
    service                    = each.key
    disable_dependent_services = false
    disable_on_destroy         = false
}
```

`./main.tf` - Set permissions (Cloud Build service account):

```hcl
variable "build_roles_list" {
    description = "The list of roles that build needs for"
    type        = list(string)
    default = [
        "roles/run.developer",
        "roles/iam.serviceAccountUser",
        "roles/run.admin",
        "roles/cloudfunctions.admin",
        "roles/artifactregistry.admin",
    ]
}

resource "google_project_iam_member" "allbuild" {
    for_each   = toset(var.build_roles_list)
    project    = var.project_number
    role       = each.key
    member     = "serviceAccount:${local.sabuild}"
    depends_on = [google_project_service.all]
}
```

`./main.tf` - Build container for the Cloud Run application:

```hcl
resource "null_resource" "cloudbuild_app" {
    provisioner "local-exec" {
        working_dir = "${path.module}/code/app"
        command     = "gcloud builds submit . --substitutions=_REGION=${var.region},_BASENAME=${var.basename}"
    }

    depends_on = [
        google_artifact_registry_repository.app,
        google_project_service.all
    ]
}
```

`./code/app/cloudbuild.yaml` - Build API Container:

```yaml
- name: "gcr.io/cloud-builders/docker"
  args: [ "build", "-t", "$_REGION-docker.pkg.dev/$PROJECT_ID/$_BASENAME-app/prod", ".", ]
```

Push API container to Artifact Registry:

```yaml
- name: "gcr.io/cloud-builders/docker"
  args: ["push", "$_REGION-docker.pkg.dev/$PROJECT_ID/$_BASENAME-app/prod"]
```

Substitutions:

```yaml
substitutions:
  _REGION: us-central1
  _BASENAME: scaler
```

The remaining Terraform (storage buckets, Artifact Registry repository, Cloud Run service with an `allUsers` `roles/run.invoker` policy, and the Cloud Functions function triggered by `google.storage.object.finalize`) is not reproduced; see https://github.com/googlecloudplatform/deploystack-storage-event-function-app.

### Serverless Photo Sharing

Serverless End-To-End Photo Sharing Application: a scalable photo-sharing application with 11 Google Cloud products, Terraform, and Django. Components: Cloud Run (main server), Cloud SQL (users, posts), Cloud Storage (post media), Cloud Load Balancer (multi-region traffic), Cloud DNS, Cloud Build, Secret Manager, Cloud VPC (private connection from Cloud Run to Cloud SQL), Translation API (translates post captions in another language). The source's Cloud IAM and Compute Engine rows also appear in its component table.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-serverless-e2e-photo-sharing-app&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services:

```hcl
# Step 2: Activate service APIs
resource "google_project_service" "run" {
  service            = "run.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "sql-component" {
  service            = "sql-component.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "sqladmin" {
  service            = "sqladmin.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "compute" {
  service            = "compute.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "cloudbuild" {
  service            = "cloudbuild.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "secretmanager" {
  service            = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "vpcaccess" {
  service            = "vpcaccess.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "servicenetworking" {
  service            = "servicenetworking.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "iam" {
  service            = "iam.googleapis.com"
  disable_on_destroy = false
}
```

`./main.tf` - Create container image (runs `gcloud builds submit`):

```hcl
resource "null_resource" "cloudbuild_api" {
  provisioner "local-exec" {
    working_dir = path.module
    command     = "gcloud builds submit . "
  }

  depends_on = [
    google_container_registry.main
  ]
}
```

The remaining Terraform (private network and VPC peering, VPC access connectors in `us-west1` / `us-central1` / `us-east1`, MySQL 8.0 Cloud SQL instance with random passwords, media bucket, Secret Manager secrets, Container Registry, Cloud Run services in three regions, external load balancer module, IAM bindings) is not reproduced; see https://github.com/googlecloudplatform/deploystack-serverless-e2e-photo-sharing-app.

### Static Hosting With Domain

A simple static website served from a Storage Bucket behind a load balancer with a managed SSL certificate. Components: Cloud Storage, Cloud Load Balancer, Cloud DNS, Cloud Domains (registrar).

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-static-hosting-with-domain&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services:

```hcl
variable "gcp_service_list" {
    description = "The list of apis necessary for the project"
    type        = list(string)
    default = [
        "domains.googleapis.com",
        "storage.googleapis.com",
        "compute.googleapis.com",
        "dns.googleapis.com",
    ]
}

resource "google_project_service" "all" {
    for_each                   = toset(var.gcp_service_list)
    project                    = var.project_number
    service                    = each.key
    disable_dependent_services = false
    disable_on_destroy         = false
}
```

`./main.tf` - Create Storage Bucket (named after the domain, configured as a web server; the `allUsers` binding makes the site public by design):

```hcl
resource "google_storage_bucket" "http_bucket" {
    name     = local.bucket
    project  = var.project_id
    location = var.location
    
    website {
        main_page_suffix = "index.html"
        not_found_page   = "404.html"
    }
}

resource "google_storage_bucket_iam_binding" "policy" {
    bucket = google_storage_bucket.http_bucket.name
    role   = "roles/storage.objectViewer"
    members = [
      "allUsers",
    ]
    depends_on = [google_storage_bucket.http_bucket]
  }

resource "google_storage_bucket_object" "archive" {
    name   = "index.html"
    bucket = google_storage_bucket.http_bucket.name
    source = "code/${var.yesorno}/index.html"
    depends_on = [
        google_project_service.all,
        google_storage_bucket.http_bucket,
    ]
}
```

The breakdown also creates a Cloud DNS managed zone, a managed SSL certificate, an external global IPv4 address, a backend bucket and URL map, HTTP (80) and HTTPS (443) proxies and forwarding rules, and an `A` record (`ttl = 60`). The `./deploystack.go` section queries domain availability and ownership and registers the domain through Cloud Domains (`RegisterDomain` with the requested `YearlyPrice`); that Go code is not reproduced here. See https://github.com/googlecloudplatform/deploystack-static-hosting-with-domain.

## Notes

- Adapted from the official docs: the Three Tier App role list uses `roles/vpcaccess.user` (the official `roles/vpaccess.user` is a typo), and `load_schema.sh` / `massage.sh` are shown only with every variable and command substitution quoted.
- These stacks create billable resources (Cloud Run, Cloud SQL, Memorystore, load balancers, and so on). Static Hosting With Domain also purchases a domain from the registrar at its yearly price. The source gives no teardown / destroy command; none is given here.
- Sample-only, not production: the stacks make Cloud Run services world readable (`allUsers`), grant broad roles (`roles/editor`, `roles/secretmanager.admin`, `roles/artifactregistry.admin`) and hard-code sample credentials in the Three Tier App API service (`todo_user` / `todo_pass`). Review before reusing in a real project.
- Source typos: `roles/vpaccess.user` (corrected above), `clouldbuild.yaml` (file names), "repoistory" (source heading).
- Fixes of conversion damage only: the Three Tier App middleware `clouldbuild.yaml` section was a single run-together block in the fetched twin; it is split here into the build block and the push block. The Cloud Build YAML in that stack is shown as the source has it (no `- ` list markers).
- Only whole code blocks are included; remaining Terraform is summarized with a pointer to the GitHub repository.
- Product details: Cloud Run: `gcp-run` skill; Cloud Storage: `gcp-storage` skill; Terraform / IaC in general: future `gcp-iac` skill.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/three-tier-app (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/storage-event-function-app (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/serverless-e2e-photo-sharing-app (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/static-hosting-with-domain (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploystack-overview.md](./deploystack-overview.md)
- [deploystack-solutions-compute.md](./deploystack-solutions-compute.md)
- [deploystack-solutions-data-ops.md](./deploystack-solutions-data-ops.md)
