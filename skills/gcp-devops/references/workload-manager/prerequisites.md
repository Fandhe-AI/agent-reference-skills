---
source: https://docs.cloud.google.com/workload-manager/docs/deploy/prerequisites
---

# Prerequisites for Guided Deployment Automation

Requirements for using the Guided Deployment Automation tool in Workload Manager. You must also meet the prerequisites specific to the application (SAP S/4HANA, SQL Server, or Oracle Database).

## Signature / Usage

For a VPC Service Controls environment, the deployment needs a Cloud Build private worker pool, referenced in this form.

```text
projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID
```

## Options / Props

### Prerequisites

| Prerequisite | Description |
|--------------|-------------|
| Google Cloud billing account | A Google Cloud account that is part of your organization with active billing. |
| Google Cloud project | A project in which to deploy the application, linked to the billing account. |
| Enable APIs | Workload Manager API, Infrastructure Manager API, and Cloud Resource Manager API. Workload Manager automatically enables additional required APIs during deployment if they're not enabled. |
| Grant IAM roles to Workload Manager service account | The Workload Manager service agent needs the required roles before you can deploy. |
| Grant IAM roles to a user-managed service account | Create a service account and grant all the required roles for deploying your application. |
| IAM roles and permissions | Users who deploy must have the required roles and permissions, including permissions to create the necessary service accounts during deployment. |
| Cloud Build private pool | Optional. If your organization enforces VPC Service Controls perimeter settings for protecting Workload Manager resources and data, set up a Cloud Build private worker pool. |
| Quotas | Sufficient resource quota in your project to deploy the workload. |

### Workload Manager service account (service agent)

| Service account | Required roles |
|-----------------|----------------|
| `Service-PROJECT_ID@gcp-sa-workloadmanager.iam.gserviceaccount.com` (as written in the source) | Cloud Infrastructure Manager Admin (`roles/config.admin`), Logs Viewer (`roles/logging.viewer`), Service Account User (`roles/iam.serviceAccountUser`), Workload Manager Service Agent (`roles/workloadmanager.serviceAgent`) |

### Enable the Workload Manager API

| Action | Permission required | Example role |
|--------|---------------------|--------------|
| Enable Workload Manager API | `serviceusage.services.enable` | `roles/editor`, `roles/serviceusage.serviceUsageAdmin` |

### Deployment roles

| Role | Deployment task |
|------|-----------------|
| Workload Manager Deployment Admin (Beta) | Create, modify, deploy, and view deployments. |
| Workload Manager Deployment Viewer (Beta) | View deployments. |

## Notes

- When you create a deployment, Workload Manager prompts you to grant the required roles to the service agent if they are not already granted; if you can't grant them, ask an administrator to do so before creating the deployment.
- The user-managed service account is attached to the deployment and used to call other APIs and services to create the resources the deployment requires. You can attach an existing service account or create one when configuring the deployment; Workload Manager prompts you to grant missing roles.
- Enabling the Workload Manager API is a one-time task per project; after an administrator enables it, other users can access Workload Manager. Apply the principle of least privilege when granting roles.
- Private pool requirements: if your organization enforces VPC Service Controls compliance, you must use a Cloud Build private worker pool (not the default Cloud Build worker pool). Private pools are hosted in a Google-owned VPC network called the service producer network; set up a private connection between it and the VPC network that contains your resources first. To download the Terraform configuration, the private pool must have public internet calls enabled.
- The Cloud Build private worker pool, the Workload Manager service account, and the Cloud Storage bucket that Workload Manager uses for deployment must be in the same VPC Service Controls service perimeter.
- The evaluation service-agent page writes this address as `service-PROJECT_NUMBER@gcp-sa-workloadmanager.iam.gserviceaccount.com`; this page writes `PROJECT_ID`. The source is kept as written.
- Corrected from the official docs: the source writes the Enable Workload Manager API example role as `roles/service.Usage.Admin`; that role ID does not exist in the IAM role reference, and the Service Usage Admin role is `roles/serviceusage.serviceUsageAdmin`.
- Quotas: supported applications often consume a large portion of resources, so you might hit quota issues. View quota values and usage, and request a higher quota if needed.
- Private pools are covered by this skill's Cloud Build pages; VPC Service Controls by `gcp-security`; IAM service agents by `gcp-foundation`.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/deploy/sap/deploy-sap
- Source: https://docs.cloud.google.com/workload-manager/docs/deploy/prerequisites (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deployment-overview.md](./deployment-overview.md)
- [deploy-sap.md](./deploy-sap.md)
- [service-accounts.md](./service-accounts.md)
