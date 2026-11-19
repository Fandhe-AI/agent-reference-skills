---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/overview
---

# DeployStack overview

DeployStack is a series of prebuilt applications architected to demonstrate common application architectures. Each includes infrastructure Terraform scripts and starter code; when the Terraform scripts run, they build the architecture and deploy the code into that infrastructure, which you can then customize.

## Signature / Usage

Each DeployStack is open-source and always contains these files:

- `./main.tf` - the Terraform script that deploys the architecture
- `./deploystack.json` - a configuration file for the collection script.

These files dictate what information DeployStack requests and what infrastructure is built.

How to run a DeployStack:

1. Follow the "Open in Cloud Shell" link for the stack.
2. When the Cloud Shell terminal loads, DeployStack starts up automatically.
3. Enter the required settings as prompted. These settings are configured in the `deploystack.json` file. The result is an output file named `terraform.tfvars`, which gives Terraform the customized settings used to configure the architecture.
4. Once `terraform.tfvars` is created, the install routine calls Terraform to apply the contents of `main.tf` and `terraform.tfvars`.
5. Upon completion, the architecture is deployed in the designated Google Cloud project.

Snippet taken from https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/cost-sentry (the Open in Cloud Shell link of one stack; the other stacks differ only in the repository name):

```markdown
[![Open in Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.svg)](https://ssh.cloud.google.com/cloudshell/editor?cloudshell_git_repo=https://github.com/googlecloudplatform/deploystack-cost-sentry&shellonly=true&cloudshell_image=gcr.io/ds-artifacts-cloudshell/deploystack_custom_image)
```

### Stacks

| Stack | Description (from the DeployStack index) |
| --- | --- |
| Cost Sentry | A simple set of scripts and configurations that allow you to shut down resources when Google Cloud Billing Budgets are exceeded. |
| ETL Pipeline | An architecture for running batch data processing pipelines using the extract, transform, load method. |
| Load Balanced VMs | A simple infrastructure building script that sets up a cluster of VMs and puts a Load Balancer in front of them to expose publically. |
| NoSQL Client Server | Configures and creates two Compute Engine instances to work with MongoDB. |
| Ops Agent | Creates a virtual machine and installs the Ops Agent for integrating with Monitoring and Logging services. |
| Serverless Photo Sharing | Creates a scalable end-to-end photo-sharing application with 11 Google Cloud products, Terraform, and Django. |
| Single VM | Creates a single VM with a smart default, but also the ability to customize the Virtual Machine. |
| Static Hosting With Domain | A simple static website creator that uses a Storage Bucket, load balancing, and a domain registar to reserve the domain and serve the website. |
| Storage Event Function App | An image gallery and thumbnail maker that uses a Storage Bucket and Functions as a Service. |
| Three Tier App | A simple todo application architected as a vanilla 3 tier application. |

### Source code

All stacks are open source on GitHub:

- DeployStack Core Project: https://github.com/googlecloudplatform/deploystack
- Cost Sentry: https://github.com/googlecloudplatform/deploystack-cost-sentry
- ETL Pipeline: https://github.com/googlecloudplatform/deploystack-etl-pipeline
- Load Balanced Vms: https://github.com/googlecloudplatform/deploystack-load-balanced-vms
- NoSQL Client Server: https://github.com/googlecloudplatform/deploystack-nosql-client-server
- Ops Agent: https://github.com/googlecloudplatform/deploystack-ops-agent
- Single VM: https://github.com/googlecloudplatform/deploystack-single-vm
- Static Hosting with Domain: https://github.com/googlecloudplatform/deploystack-static-hosting-with-domain
- Storage Event Function App: https://github.com/googlecloudplatform/deploystack-storage-event-function-app
- Three Tier App: https://github.com/googlecloudplatform/deploystack-three-tier-app
- Serverless End-To-End Photo Sharing Application: https://github.com/googlecloudplatform/deploystack-serverless-e2e-photo-sharing-app

## Notes

- Running a stack applies Terraform to your project and creates billable resources. The source documents no teardown or destroy command for any stack; none is given here.
- If DeployStack has no app that suits your needs, see the Cloud Architecture Center (https://cloud.google.com/architecture/). The DeployStack library is still growing.
- Terraform / IaC in general is outside this page; see the `gcp-iac` skill. Product details for Cloud Run and Cloud Storage: `gcp-run` and `gcp-storage` skills.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/overview (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack (index of stacks, retrieved 2026-11-14)
- Source (snippet): https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/deploystack/cost-sentry (retrieved 2026-11-14)

## Related

- [deploystack-solutions-compute.md](./deploystack-solutions-compute.md)
- [deploystack-solutions-apps.md](./deploystack-solutions-apps.md)
- [deploystack-solutions-data-ops.md](./deploystack-solutions-data-ops.md)
