# Administration

| Name | Description | Path |
|------|-------------|------|
| Admin API Keys | Admin API keys authenticate requests to the Administration API (organization management endpoints). | [admin-api-keys.md](./admin-api-keys.md) |
| Audit Logs | Retrieve recent user actions and configuration changes for the organization via the Administration API. | [audit-logs.md](./audit-logs.md) |
| Invites and Users | Invite a user to an organization by email and manage organization users and their roles. | [invites-and-users.md](./invites-and-users.md) |
| Projects | Projects are workspaces that scope API keys, files, service accounts, rate limits, and spend alerts. | [projects.md](./projects.md) |
| RBAC (Role-Based Access Control) | Role-based access control decides who can do what across an organization and its projects. | [rbac.md](./rbac.md) |
| Spend Limits and Alerts | Two distinct controls track and cap monthly API costs: spend alerts and hard spend limits. | [spend-limits-and-alerts.md](./spend-limits-and-alerts.md) |
| Terraform: Import and Reconcile | Adopt existing OpenAI resources into Terraform state, read resources via data sources, and detect drift. | [terraform-import-and-reconcile.md](./terraform-import-and-reconcile.md) |
| Terraform: Project Controls | Apply model access, hosted-tool, and data-retention controls to an existing project. | [terraform-project-controls.md](./terraform-project-controls.md) |
| Terraform: Projects and Access | Create an OpenAI project and establish least-privilege access controls with roles and groups. | [terraform-projects-and-access.md](./terraform-projects-and-access.md) |
| Terraform Provider | Official OpenAI Terraform provider manages organization resources as infrastructure as code. | [terraform-provider.md](./terraform-provider.md) |
| Terraform: Rate Limits and Spend | Manage an existing project's per-model rate limits and configure monthly spend alerts. | [terraform-rate-limits-and-spend.md](./terraform-rate-limits-and-spend.md) |
| Terraform: Service Accounts | An OpenAI service account is a nonhuman, project-owned identity for API access. | [terraform-service-accounts.md](./terraform-service-accounts.md) |
| Usage and Costs API | Programmatic access to an organization's API activity and spending data for reporting. | [usage-and-costs-api.md](./usage-and-costs-api.md) |
| Workload Identity Federation | Exchange externally issued OIDC identity tokens for short-lived OpenAI access tokens. | [workload-identity-federation.md](./workload-identity-federation.md) |
| WIF: AWS | Use AWS as a Workload Identity Provider via outbound identity federation or Amazon EKS. | [wif-aws.md](./wif-aws.md) |
| WIF: GitHub Actions | Use GitHub Actions as a Workload Identity Provider by exchanging OIDC tokens. | [wif-github-actions.md](./wif-github-actions.md) |
| WIF: Google Cloud | Use Google Cloud as a Workload Identity Provider via the metadata server or GKE. | [wif-google-cloud.md](./wif-google-cloud.md) |
| WIF: Kubernetes | Use a self-managed Kubernetes cluster as a Workload Identity Provider via projected tokens. | [wif-kubernetes.md](./wif-kubernetes.md) |
| WIF: Microsoft Azure | Use Azure as a Workload Identity Provider via managed identity tokens or AKS. | [wif-microsoft-azure.md](./wif-microsoft-azure.md) |
| WIF: Oracle Cloud Infrastructure | Use OCI instance principals as a Workload Identity Provider via identity-domain tokens. | [wif-oracle-cloud.md](./wif-oracle-cloud.md) |
| WIF: SPIFFE | Use SPIFFE JWT-SVIDs as a Workload Identity Provider subject tokens via SPIRE. | [wif-spiffe.md](./wif-spiffe.md) |
| WIF: X.509 Certificates | Exchange a workload's TLS client certificate identity for a short-lived OpenAI access token. | [wif-x509-certificates.md](./wif-x509-certificates.md) |
