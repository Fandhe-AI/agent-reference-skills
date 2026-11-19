---
source: https://docs.cloud.google.com/docs/terraform/basic-commands
---

# Basic Terraform commands

How to apply a Terraform configuration in a Google Cloud project from Cloud Shell: set the project, prepare a root-module directory, then init, plan, apply, format, validate and destroy.

## Signature / Usage

### Prepare Cloud Shell

```bash
export GOOGLE_CLOUD_PROJECT=PROJECT_ID
```

Environment variables are overridden by explicit values in the Terraform configuration file.

### Prepare the directory

Each Terraform configuration needs its own directory (a root module); Terraform reads all `.tf` files in that directory together, so `variables.tf` and `outputs.tf` sit next to `main.tf`. The filename must have the `.tf` extension.

```bash
mkdir DIRECTORY && cd DIRECTORY && touch main.tf
```

Initialize Terraform (once per directory):

```bash
terraform init
```

To use the latest Google provider version:

```bash
terraform init -upgrade
```

### Apply the changes

```bash
terraform plan
```

```bash
terraform apply
```

Enter `yes` at the prompt and wait for "Apply complete!".

### Reformat and validate

```bash
terraform fmt
```

```bash
terraform validate
```

### Delete changes

```bash
terraform destroy
```

Enter `yes` at the prompt.

## Options / Props

| Command | Purpose |
|---------|---------|
| `terraform init` | Initialize the directory; once per directory. `-upgrade` uses the latest provider version. |
| `terraform plan` | Show what will be created or updated. |
| `terraform apply` | Apply the configuration; prompts for `yes`. |
| `terraform fmt` | Reformat in the standard style. |
| `terraform validate` | Check that the configuration is valid. |
| `terraform destroy` | Remove resources previously applied; prompts for `yes`. |

## Notes

- `terraform destroy` removes the resources previously applied with the configuration; try it on a disposable project first.
- The source also says to check the results in the Google Cloud console (omitted).
- Terraform samples typically assume the required APIs are enabled in the project.
- With `export GOOGLE_CLOUD_PROJECT`, most resources infer `project_id`. Some resources, such as `project_iam_*`, cannot; some samples use the `data "google_project"` data source, which you can replace with the project ID string or a variable (sample: `sql_instance_iam_condition` in `terraform-google-modules/terraform-docs-samples`).
- Terraform CLI and HCL themselves behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Source: https://docs.cloud.google.com/docs/terraform/basic-commands (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

- Corrected from the official docs: the source says "Each Terraform configuration file must have its own directory (also called a root module)". A root module is a directory, and Terraform loads every `.tf` file in it as one configuration; the page therefore says each configuration (root module) needs its own directory, not each file.
## Related

- [install-configure-terraform.md](./install-configure-terraform.md)
- [create-vm-instance.md](./create-vm-instance.md)
- [store-state.md](./store-state.md)
