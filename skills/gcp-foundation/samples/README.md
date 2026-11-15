# samples

| Name | Description | Path |
| --- | --- | --- |
| Create a Project and Check Its Billing Link | Create a project under an organization or folder, poll the long-running operation, then verify that billing is enabled | [create-project-and-check-billing.md](./create-project-and-check-billing.md) |
| Grant and Revoke a Role on a Project | Grant a role with a single binding command, or edit the allow policy with read-modify-write and an `etag` | [grant-role-read-modify-write.md](./grant-role-read-modify-write.md) |
| Conditional Role Binding | Grant a role that expires, applies only in working hours, or applies only to resources whose names match a prefix | [conditional-expiring-binding.md](./conditional-expiring-binding.md) |
| Service Account Impersonation | Create a service account, give a caller Service Account Token Creator on it, and use short-lived credentials instead of a key | [service-account-impersonation.md](./service-account-impersonation.md) |
| Application Default Credentials for Local Development | Create local ADC from a user account or by impersonating a service account, and attach a service account for production resources | [local-development-adc.md](./local-development-adc.md) |
| Workload Identity Federation for GitHub Actions | Let a GitHub Actions job obtain short-lived Google Cloud credentials from its OIDC token, with no service account key | [github-actions-workload-identity-federation.md](./github-actions-workload-identity-federation.md) |
| Workforce Identity Federation Sign-In | Configure the IdP redirect URL, share the SSO link, and sign in to gcloud with a login configuration file | [workforce-identity-federation-sign-in.md](./workforce-identity-federation-sign-in.md) |
| IAM Deny Policy | Block a principal from using specific permissions with a deny policy attached to a project, folder, or organization | [deny-policy.md](./deny-policy.md) |
| Organization Policy with Dry Run | Preview an organization policy in dry-run mode, read the audit logs, then enforce it with `gcloud org-policies` | [org-policy-restrict-services-dry-run.md](./org-policy-restrict-services-dry-run.md) |
| Principal Access Boundary | Restrict which resources a set of principals is eligible to access with a PAB policy and binding | [principal-access-boundary.md](./principal-access-boundary.md) |
| Budget Alerts with the Budget API | Create, list, update, and delete an alerts-only budget through `billingbudgets.googleapis.com` | [budget-alerts-api.md](./budget-alerts-api.md) |
| Billing Export to BigQuery | Enable the billing export into a dataset, then analyze cost with SQL | [billing-export-bigquery.md](./billing-export-bigquery.md) |
| Asset Inventory Export | Export a snapshot of assets to a bucket or a BigQuery table, check the operation, and query the result | [asset-inventory-export.md](./asset-inventory-export.md) |
| Asset Inventory Search | Find resources by name, label, or tag, and audit who holds which roles | [asset-inventory-search.md](./asset-inventory-search.md) |
| Enable and Disable APIs | Enable or disable services for a project with `gcloud services` or the Service Usage REST API | [enable-and-disable-apis.md](./enable-and-disable-apis.md) |
| Quota View and Adjust | List quota info, create a quota preference, and track pending adjustments with `gcloud quotas` | [quota-view-and-adjust.md](./quota-view-and-adjust.md) |
