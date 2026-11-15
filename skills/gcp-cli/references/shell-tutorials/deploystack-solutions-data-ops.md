---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack
---

# DeployStack solutions: cost control and data pipeline

Two DeployStack solutions: Cost Sentry (shuts down resources when a Google Cloud Billing Budget is exceeded) and ETL Pipeline (batch ETL with Cloud Storage, Dataflow, BigQuery, and Cloud Composer).

## Signature / Usage

Common to both solution pages: clicking the link opens a Cloud Shell session and downloads code from GitHub. "You will have to authorize DeployStack to run. No actions will be taken until you do so." Once there, a single command spins up a working copy of the application in your project. The source does not name that command and gives no teardown command.

### Cost Sentry

Scripts and configurations that shut down resources when Billing Budgets are exceeded. Components: Pub/Sub (queue), Billing Budgets (cost controls), Cloud Functions (event handling), Compute Engine (VMs), Cloud Run (serverless). It sets up a budget, a messaging queue, and a Cloud Function, then spins up a sample VM and a container-backed service managed by the system.

Warning from the source: by default Cost Sentry will only shut down resources that it sets up. This is to prevent accidental shut downs of your resources, so you can try it safely without affecting existing infrastructure.

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-cost-sentry&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services:

```hcl
variable "gcp_service_list" {
        description = "The list of apis necessary for the project"
        type        = list(string)
        default = [
            "cloudresourcemanager.googleapis.com",
            "cloudbilling.googleapis.com",
            "billingbudgets.googleapis.com",
            "cloudbuild.googleapis.com",
            "compute.googleapis.com",
            "cloudfunctions.googleapis.com",
            "storage.googleapis.com",
            "run.googleapis.com"
        ]
}

resource "google_project_service" "all" {
    for_each           = toset(var.gcp_service_list)
    project            = var.project_number
    service            = each.key
    disable_on_destroy = false
}
```

`./main.tf` - Create a budget (runs `gcloud beta billing budgets create`):

Adapted (not in the official docs): Terraform interpolates the variables into the shell command before the shell parses it; the values are passed through `environment` and quoted in the shell instead.

```hcl
provisioner "local-exec" {
    environment = {
      BASENAME        = var.basename
      BILLING_ACCOUNT = var.billing_account
      BUDGET_AMOUNT   = var.budgetamount
      PROJECT_ID      = var.project_id
    }
    command = <<-EOT
    gcloud beta billing budgets create --display-name "$BASENAME-budget" \
    --billing-account "$BILLING_ACCOUNT" --budget-amount "$BUDGET_AMOUNT" \
    --all-updates-rule-pubsub-topic="projects/$PROJECT_ID/topics/$BASENAME-billing-channel"
    EOT
}
```

`./main.tf` - Set permissions (roles for the Cloud Function service account):

```hcl
variable "build_roles_list" {
        description = "The list of roles that fucntions needs for"
        type        = list(string)
        default = [
            "roles/run.admin",
            "roles/compute.instanceAdmin",
            "roles/iam.serviceAccountUser"
        ]
}

resource "google_project_iam_member" "allbuild" {
    for_each   = toset(var.build_roles_list)
    project    = var.project_number
    role       = each.key
    member     = "serviceAccount:${google_service_account.functions_accounts.email}"
    depends_on = [google_project_service.all,google_service_account.functions_accounts]
}
```

The breakdown also creates: the Pub/Sub topic `${var.basename}-billing-channel`, a sample Cloud Run service (image `us-docker.pkg.dev/cloudrun/container/hello`), a sample Compute Engine VM (`n1-standard-1`), the Cloud Function service account, a function bucket, and the Cloud Function (runtime `go116`, entry point `LimitUsage`, triggered by `google.pubsub.topic.publish`). Those blocks are not reproduced; see https://github.com/googlecloudplatform/deploystack-cost-sentry.

### ETL Pipeline

An architecture for batch data processing pipelines using extract, transform, load. Components: Cloud Storage (landing source data), Dataflow (transformations), BigQuery (destination), Cloud Composer environment (orchestration).

Launch (Open in Cloud Shell):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-etl-pipeline&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

`./main.tf` - Enable Services (IAM, Storage, Dataflow, BigQuery, Composer, Compute):

```hcl
variable "gcp_service_list" {
  description = "The list of apis necessary for the project"
  type        = list(string)
  default = [
    "dataflow.googleapis.com",
    "compute.googleapis.com",
    "composer.googleapis.com",
    "storage.googleapis.com",
    "bigquery.googleapis.com",
    "iam.googleapis.com"
  ]
}

resource "google_project_service" "all" {
  for_each           = toset(var.gcp_service_list)
  project            = var.project_number
  service            = each.key
  disable_on_destroy = false
}
```

`./main.tf` - Assign roles (to the `etlpipeline` service account; also grants the Cloud Composer v2 API Service Agent Extension role to the Cloud Composer Service Agent, required for Composer 2 environments):

Adapted (not in the official docs): the fetched source renders this block without indentation and with escaped brackets; indentation and plain `[` / `]` are restored.

```hcl
variable "build_roles_list" {
  description = "The list of roles that Composer and Dataflow needs"
  type        = list(string)
  default = [
    "roles/composer.worker",
    "roles/dataflow.admin",
    "roles/dataflow.worker",
    "roles/bigquery.admin",
    "roles/storage.objectAdmin",
    "roles/dataflow.serviceAgent",
    "roles/composer.ServiceAgentV2Ext"
  ]
}

resource "google_project_iam_member" "allbuild" {
  project    = var.project_id
  for_each   = toset(var.build_roles_list)
  role       = each.key
  member     = "serviceAccount:${google_service_account.etl.email}"
  depends_on = [google_project_service.all,google_service_account.etl]
}

resource "google_project_iam_member" "composerAgent" {
  project    = var.project_id
  role       = "roles/composer.ServiceAgentV2Ext"
  member     = "serviceAccount:service-${var.project_number}@cloudcomposer-accounts.iam.gserviceaccount.com"
  depends_on = [google_project_service.all]
}
```

The breakdown also creates: the `etlpipeline` service account, a Composer environment (`composer-2.0.12-airflow-2.2.3`), the BigQuery dataset `average_weather` and table `average_weather`, a Cloud Storage bucket holding `inputFile.txt`, `jsonSchema.json` and `transformCSVtoJSON.js`, and the DAG file `dags/composer-dataflow-dag.py`. Those blocks are not reproduced; see https://github.com/googlecloudplatform/deploystack-etl-pipeline.

## Notes

- Adapted from the official docs: the budget `local-exec` provisioner interpolated `${var.basename}`, `${var.billing_account}`, `${var.budgetamount}` and `${var.project_id}` directly into the shell command; it passes them through `environment` and quotes them in the shell.
- Both stacks create billable resources. Cloud Composer environments in particular run continuously; ETL Pipeline grants broad roles (`roles/bigquery.admin`, `roles/dataflow.admin`, `roles/storage.objectAdmin`). The source gives no teardown / destroy command; none is given here. For Cost Sentry, deactivating resources is performed by its Cloud Function, not by a command in the page.
- Conversion fix only: in the fetched twin of the ETL Pipeline page, the `build_roles_list` block had lost its indentation and carried `\[` / `\]` escapes; it is restored as a normal HCL block. The source typo "fucntions" (Cost Sentry) is kept verbatim.
- Only whole code blocks are included; remaining Terraform is summarized with a pointer to the GitHub repository.
- The Cloud Run and Cloud Storage components here: see the `gcp-run` and `gcp-storage` skills for product details; Terraform / IaC in general: future `gcp-iac` skill.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/cost-sentry (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/etl-pipeline (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploystack-overview.md](./deploystack-overview.md)
- [deploystack-solutions-compute.md](./deploystack-solutions-compute.md)
- [deploystack-solutions-apps.md](./deploystack-solutions-apps.md)
