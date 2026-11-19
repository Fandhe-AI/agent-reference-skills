---
source: https://docs.cloud.google.com/docs/terraform/iac-overview
---

# Infrastructure as Code on Google Cloud

Infrastructure as Code (IaC) provisions and manages application infrastructure with configuration files instead of graphical user interfaces or command-line scripts. The page lists the IaC tools that integrate with Google Cloud and when to choose each.

## Signature / Usage

### Generate an execution plan

```bash
terraform plan
```

### IaC tools for Google Cloud

| Tool | Choose it when |
|------|----------------|
| Terraform | You want to configure and manage Google Cloud infrastructure using code; use the Terraform provider for Google Cloud. |
| Infrastructure Manager (Infra Manager) | You want to automate the deployment of your Terraform configuration; it deploys programmatically to Google Cloud instead of a separate Terraform toolchain. |
| Terraform Cloud and Terraform Enterprise | You require full change management with Terraform across your organization (SaaS, or self-hosted for strict security and compliance requirements). |
| Cloud Development Kit for Terraform (CDKTF) | You want to generate infrastructure with a general-purpose programming language instead of HCL. |
| Pulumi | You want to author infrastructure code in TypeScript, Python, Go, C#, Java or YAML using the Google Cloud provider for Pulumi. |
| Config Controller and Config Connector | You want to manage Google Cloud resources through Kubernetes tooling, GitOps tools such as Config Sync, and Kubernetes APIs. |
| Crossplane | You want to manage Google Cloud resources through Kubernetes with custom Kubernetes APIs; it reverses out-of-band changes and recreates deleted resources. |
| Ansible | You want to automate provisioning, configuration management, application deployment, orchestration and other IT processes. |

## Notes

- Benefits listed by the source: reuse one configuration for multiple consistent environments; automate creation and management of cloud resources; review and automatically validate infrastructure changes like application changes; keep an auditable, revertable history of configuration changes; keep a single source of truth.
- Terraform CLI and HCL themselves behave as HashiCorp documents them; this skill covers using them with Google Cloud.
- Config Connector manages Google Cloud resources as Kubernetes objects; the GKE cluster itself and Config Sync are in `gcp-gke`.
- Snippet taken from https://docs.cloud.google.com/docs/terraform/basic-commands (the source page itself has no code block).
- Source: https://docs.cloud.google.com/docs/terraform/iac-overview (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [terraform-overview.md](./terraform-overview.md)
- [basic-commands.md](./basic-commands.md)
- [store-state.md](./store-state.md)
