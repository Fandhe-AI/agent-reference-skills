---
source: https://docs.cloud.google.com/infrastructure-manager/docs/overview
---

# Infrastructure Manager overview

Infrastructure Manager (Infra Manager) is a managed service that automates deployment and management of Google Cloud infrastructure from Terraform configurations (also called blueprints). It runs Terraform in an ephemeral Cloud Build environment and keeps logs, configuration, resource lists and state for every revision. It does not deploy applications onto your resources.

## Signature / Usage

### Enable the API (first step before any deployment)

```bash
gcloud services enable config.googleapis.com
```

### What happens when you create a deployment

1. Infra Manager validates the request (for example, that the Terraform configuration location is given).
2. It creates a Cloud Build job using a container image owned and maintained by Google Cloud. The job:
   1. Downloads the Terraform module from the storage bucket or Git repository.
   2. Runs `terraform init`.
   3. Runs `terraform validate`.
   4. Runs `terraform apply` (or `terraform destroy` when you delete a deployment).
   5. Streams Cloud Build logs into a storage bucket created by Infra Manager.
   6. Retries `terraform init` or `terraform apply` a limited number of times in certain scenarios, such as intermittent network outages.
3. It creates a Cloud Storage bucket and stores metadata about the deployment.

## Options / Props

### Per revision, Infra Manager stores

| Item |
|---|
| Logs |
| The configuration used for the revision |
| The list of Google Cloud resources created by the revision |
| The state file created as part of each deployment and revision |

### Where the Terraform configuration can live

| Source | Notes |
|---|---|
| Cloud Storage bucket | Use Object Versioning to version configurations. |
| Git repository | Public or private. |
| Local directory | gcloud CLI only. |

## Notes

- Input values: Terraform input variables are called *input values*. Provide them when you create, update or preview a deployment to reuse one configuration across environments. You can supply values for required variables without defaults or override defaults.
- Runtime environment: an ephemeral Cloud Build environment, discarded after Terraform commands run. Its operating system, software and other configuration are internal implementation details and can change at any time. You choose the supported Terraform version per deployment.
- Don't include personal or sensitive information in Terraform configuration values.
- For application deployment the source points to App Lifecycle Manager, Cloud Build, Cloud Deploy or third-party tools. Cloud Build and Cloud Deploy are in `gcp-devops`.
- Terraform CLI and HCL behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/infrastructure-manager/docs/enable-service (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/deploy-resources (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0); the "Public or private" and "gcloud CLI only" cells come from that page.

## Related

- [enable-service.md](./enable-service.md)
- [infra-manager-terraform.md](./infra-manager-terraform.md)
- [deployments-revisions.md](./deployments-revisions.md)
- [deploy-resources.md](./deploy-resources.md)
