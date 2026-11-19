---
source: https://docs.cloud.google.com/workload-manager/docs/deploy/about-wlm-deployment
---

# About Guided Deployment Automation

The Guided Deployment Automation tool in Workload Manager lets you configure and deploy enterprise applications on Google Cloud. You can also configure a deployment, then generate Terraform and Ansible infrastructure as code (IaC) to export for further customization or for use in an existing deployment pipeline.

## Signature / Usage

How it works:

1. Select a supported application to deploy.
2. Select the configurations specific to your application and complete the deployment configuration in the Google Cloud console.
3. Workload Manager generates the equivalent IaC from the configuration.
4. Deploy directly from the console, or download the generated IaC and deploy manually.

The page has no code. In a VPC Service Controls environment, the deployment is configured with a Cloud Build private pool in this form.

```text
projects/PRIVATEPOOL_PROJECT_ID/locations/REGION/workerPools/PRIVATEPOOL_ID
```

## Options / Props

### Supported workloads

| Workload |
|----------|
| SAP S/4HANA |
| SQL Server |
| Oracle Database |

### Limitations

| Limitation |
|------------|
| Post-deployment modifications directly from the Google Cloud console are not supported. If modifications are expected, export and download the IaC and make subsequent changes with Terraform and Ansible. |

## Notes

- Benefits: end-to-end deployment automation built on Terraform and Ansible using existing Google Cloud products; reduced deployment time by collecting your intent and guiding configuration; built-in recommendations and safeguards.
- The Workload Manager overview page names only SAP S/4HANA and SQL Server as deployable workloads; this page also lists Oracle Database.
- Pricing: Guided Deployment Automation is available at no cost, but you are charged for resources consumed during deployment (such as VMs and persistent disks) and for the necessary APIs or other services. There is no option to estimate the cost of your deployment; contact your Google account team for price information.
- Snippet taken from https://docs.cloud.google.com/workload-manager/docs/deploy/sap/deploy-sap
- Source: https://docs.cloud.google.com/workload-manager/docs/deploy/about-wlm-deployment (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [prerequisites.md](./prerequisites.md)
- [deploy-sap.md](./deploy-sap.md)
- [workload-manager-overview.md](./workload-manager-overview.md)
