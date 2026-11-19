---
source: https://docs.cloud.google.com/infrastructure-manager/docs/configure-service-account
---

# Configure the service account for Infrastructure Manager

Creating, updating or deleting a deployment requires a service account; Infra Manager runs Terraform as that identity. No service account is needed to view deployments. The user needs `roles/iam.serviceAccountUser` on it, and the account needs `roles/config.agent` plus permissions for the resources in the configuration.

## Signature / Usage

### Grant Infra Manager permissions

```bash
   gcloud projects add-iam-policy-binding INFRA_MANAGER_PROJECT_ID \
      --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
      --role="roles/config.agent"
```

### Cross-project: service account in another project

1. Ensure the service account has `roles/config.agent` in the project running Infra Manager.
2. Optional, when using Developer Connect to deploy a configuration: grant `roles/iam.serviceAccountTokenCreator` to the service account.
3. In the project that has the service account, make sure the `iam.disableCrossProjectServiceAccountUsage` organization policy constraint is not enforced (enforced by default).

Adapted (not in the official docs): a trailing `\` is added so the two source lines are one valid shell command.

```bash
gcloud resource-manager org-policies disable-enforce iam.disableCrossProjectServiceAccountUsage \
    --project=SERVICE_ACCOUNT_PROJECT_ID
```

4. Grant `roles/iam.serviceAccountUser` on the project that has the service account to the Infra Manager service agent of the project where you create deployments:

```bash
gcloud projects add-iam-policy-binding SERVICE_ACCOUNT_PROJECT_ID \
   --member="serviceAccount:service-INFRA_MANAGER_PROJECT_NUMBER@gcp-sa-config.iam.gserviceaccount.com" \
   --role="roles/iam.serviceAccountUser"
```

5. Grant `roles/iam.serviceAccountTokenCreator` to the Cloud Build service agent (cross-project set up):

```bash
gcloud projects add-iam-policy-binding SERVICE_ACCOUNT_PROJECT_ID \
    --member="serviceAccount:service-INFRA_MANAGER_PROJECT_NUMBER@gcp-sa-cloudbuild.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountTokenCreator"
```

## Options / Props

| Placeholder | Meaning |
|---|---|
| `INFRA_MANAGER_PROJECT_ID` | Project ID of the project where you create deployments |
| `SERVICE_ACCOUNT_EMAIL` | Email of the service account |
| `SERVICE_ACCOUNT_PROJECT_ID` | Project ID of the project that contains the service account |
| `INFRA_MANAGER_PROJECT_NUMBER` | Project number of the project where you create deployments; forms `service-INFRA_MANAGER_PROJECT_NUMBER@gcp-sa-config.iam.gserviceaccount.com` |

### Who needs what

| Principal | Role / permission |
|---|---|
| User who creates, updates or deletes deployments | `roles/iam.serviceAccountUser` on the service account |
| Deployment service account | `roles/config.agent` |
| Deployment service account, bucket in another project | Read permission on the bucket (same project: already included in `roles/config.agent`) |
| Deployment service account | Permissions for the resources in the configuration (for example `compute.instances.create`) |
| Infra Manager service agent (cross-project) | `roles/iam.serviceAccountUser` in the service account's project |
| Cloud Build service agent (cross-project) | `roles/iam.serviceAccountTokenCreator` |

## Notes

- When updating a deployment, the service account needs permissions for resources in the new configuration and for resources being deleted (for example, a Compute Engine VM absent from the new configuration).
- Granting `roles/iam.serviceAccountUser` / `roles/iam.serviceAccountTokenCreator` at project level lets the grantee act as every service account in that project; the source does not offer a narrower grant here. Prefer binding on the single service account where possible.
- Disabling `iam.disableCrossProjectServiceAccountUsage` relaxes an organization-level protection that is enforced by default; the command limits it to one project. Try it on a disposable project first. Organization Policy in general is in `gcp-foundation`.
- To choose permissions for configuration resources see https://docs.cloud.google.com/iam/docs/choose-predefined-roles.
- Corrected from the official docs: the source shows the `disable-enforce` command as two lines without a continuation (`... iam.disableCrossProjectServiceAccountUsage` / `--project=SERVICE_ACCOUNT_PROJECT_ID`); a `\` was added.
- Source: https://docs.cloud.google.com/infrastructure-manager/docs/configure-service-account (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [deploy-resources.md](./deploy-resources.md)
- [troubleshoot-deployments.md](./troubleshoot-deployments.md)
