# terraform

Setup and basic operations for the official [OpenAI Terraform provider](https://github.com/openai/terraform-provider-openai) (`openai/openai`), which manages organization resources through the Administration API.

## Before you begin

Requires Terraform 1.0+ (1.5+ for `import` blocks) and an Admin API key.

```bash
export OPENAI_ADMIN_KEY="<your-admin-api-key>"
```

The provider reads `OPENAI_ADMIN_KEY` by default. `OPENAI_ORG_ID` / `OPENAI_PROJECT_ID` are optional and only needed to explicitly pin the organization/project instead of resolving it from the key.

## Configure the provider and create a project

```terraform
terraform {
  required_version = ">= 1.0"

  required_providers {
    openai = {
      source  = "openai/openai"
      version = ">= 1.0.0"
    }
  }
}

provider "openai" {}

resource "openai_project" "example" {
  name = "terraform-managed"
}

output "project_id" {
  value = openai_project.example.project_id
}
```

## Initialize, validate, and apply

```bash
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply
```

`terraform init` creates `.terraform.lock.hcl` — commit it so future runs select the same provider version. Run `terraform init -upgrade` to move to the latest version allowed by the constraint.

> **Warning**: Destroying an `openai_project` resource archives the project — archived projects cannot be restored. Destroying an `openai_project_service_account` resource deletes the remote service account.

## Save and inspect a plan before applying

Use a saved plan for review workflows and imports.

```bash
terraform plan -out=tfplan
terraform show tfplan
terraform apply tfplan
```

## Detect drift without applying

```bash
terraform plan -detailed-exitcode
```

Exit code `0` means no changes, `2` means the plan contains changes, `1` means Terraform encountered an error.

## Grant least-privilege project access (role + group)

```terraform
resource "openai_project_role" "application" {
  project_id  = openai_project.example.project_id
  role_name   = "Application API access"
  description = "Permissions approved for this application"
  permissions = ["api.webhooks.read"]
}

resource "openai_group" "application_access" {
  name = "example-application-development-access"
}

resource "openai_project_group_role" "application_access" {
  project_id = openai_project.example.project_id
  group_id   = openai_group.application_access.group_id
  role_id    = openai_project_role.application.role_id
}

resource "openai_group_user" "application_developer" {
  group_id = openai_group.application_access.group_id
  user_id  = "user_123"
}
```

## Create a service account without a default role

```terraform
resource "openai_project_service_account" "application" {
  project_id = "proj_123"
  name       = "example-application-development-service-account"
}

output "service_account_id" {
  value = openai_project_service_account.application.service_account_id
}
```

Service-account API keys are created outside Terraform through the Administration API — see `admin-api.md`'s "Create a project service-account API key" section.

## Manage an existing project rate limit

OpenAI creates rate-limit records for a project; Terraform updates existing records rather than creating new ones. Discover the record ID first:

```terraform
data "openai_project_rate_limits" "current" {
  project_id = "proj_123"
}

output "project_rate_limits" {
  value = data.openai_project_rate_limits.current.rate_limits
}
```

Then manage it:

```terraform
resource "openai_project_rate_limit" "application" {
  project_id                = "proj_123"
  rate_limit_id             = "rl-gpt-3.5-turbo"
  max_requests_per_1_minute = 500
  max_tokens_per_1_minute   = 200000
}
```

## Configure a project spend alert

```terraform
resource "openai_project_spend_alert" "monthly" {
  project_id                          = "proj_123"
  threshold_amount                    = 20000
  currency                            = "USD"
  interval                            = "month"
  notification_channel_type           = "email"
  notification_channel_recipients     = ["platform-alerts@example.com"]
  notification_channel_subject_prefix = "OpenAI project spend"
}
```

`threshold_amount` is in cents (`20000` = USD 200). Spend alerts notify but do not block traffic — configure a hard spend limit separately (see `admin-api.md`) to enforce a cap.

## Restrict model access for a project

```terraform
resource "openai_project_model_permissions" "application" {
  project_id = "proj_123"
  mode       = "allow_list"
  model_ids  = ["gpt-5.4-mini"]
}
```

`mode` is `allow_list` (permit only listed models) or `deny_list` (permit all except listed models).

## Import an existing resource

Import blocks require Terraform 1.5+. Declare the resource with matching configuration, then import:

```terraform
resource "openai_project" "existing" {
  name = "existing-project"
}

import {
  to = openai_project.existing
  id = "proj_123"
}
```

```bash
terraform plan -out=tfplan
terraform show tfplan
terraform apply tfplan
terraform plan
```

The plan after import (and the following plan) should show no changes; if not, adjust the configuration to match the remote resource before applying anything else.

## Notes

- Full argument/import-ID references live in the [provider registry docs](https://registry.terraform.io/providers/openai/openai/latest/docs).
- Removing a resource block from configuration does not always delete the remote object — e.g. removing `openai_project_hosted_tool_permissions` or `openai_project_data_retention` leaves the remote setting untouched, while removing `openai_project_service_account` or role/group/assignment resources deletes them. Review destroy plans carefully.
