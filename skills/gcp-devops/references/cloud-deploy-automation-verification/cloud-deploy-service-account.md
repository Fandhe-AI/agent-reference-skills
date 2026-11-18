---
source: https://docs.cloud.google.com/deploy/docs/cloud-deploy-service-account
---

# Cloud Deploy service accounts

Cloud Deploy uses three kinds of service accounts: the Cloud Deploy service agent (interacts with your project), the execution service account (runs render and deploy operations in Cloud Build, a dedicated account is the best practice over the default Compute Engine one), and the automation service account (performs automations).

## Signature / Usage

Grant the `roles/clouddeploy.jobRunner` role to the default execution service account if it does not have it. The command grants it at project level.

Adapted (not in the official docs): the `--member` value is quoted so the command substitution is not word-split.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:$(gcloud projects describe PROJECT_ID \
    --format="value(projectNumber)")-compute@developer.gserviceaccount.com" \
    --role="roles/clouddeploy.jobRunner"
```

## Options / Props

### Service accounts

| Account | Purpose | Address / default |
|---------|---------|-------------------|
| Cloud Deploy service agent | Interacts with Cloud Build, Pub/Sub and Cloud Audit Logs. Cannot be replaced by another account, but you can edit its permissions (for example for a service account or private Cloud Build worker pool outside the project). | `service-<project-number>@gcp-sa-clouddeploy.iam.gserviceaccount.com` |
| Execution service account | Executes render and deploy operations in Cloud Build; needs read / write on the Cloud Storage bucket and access to deployment targets. | Default: `[project-number]-compute@developer.gserviceaccount.com` (default Compute Engine service account); alternate set per target in the target configuration. |
| Automation service account | Performs automations. | Default execution service account, a non-default execution service account, or another account. |

### Target properties that change the execution service account

| Property |
|----------|
| `executionConfigs.privatePool.serviceAccount` |
| `executionConfigs.defaultPool.serviceAccount` |

### Required permissions

| Who | Needs |
|-----|-------|
| Any service account set for the execution properties | `Cloud Deploy Runner` role (`roles/clouddeploy.jobRunner`) in the Cloud Deploy project. This role includes all permissions the render service account needs. |
| Deploy service account | Permissions to deploy to the target cluster and access to the Cloud Storage bucket. |
| Runtime-specific (GKE) | For example Container Developer and Service Account User roles. |
| Runtime-specific (Cloud Run) | For example Cloud Run Developer and Service Account User roles. Custom targets may need their own permissions. |
| Caller that creates a release | `roles/clouddeploy.releaser` role, plus `iam.serviceAccounts.actAs` on the service account that renders manifests (for example `roles/iam.serviceAccountUser`). |
| Caller that promotes a release or creates a rollout | `iam.serviceAccounts.actAs` on the service account that deploys to targets (for example `roles/iam.serviceAccountUser`). |
| Automation service account | Permission to run the automated operations. |

### Using a service account from a different project

| Step | Detail |
|------|--------|
| 1 | In the project that owns the service account, enable the cross-project service account organization policy. |
| 2 | Grant the Cloud Deploy service agent (`service-<project-number>@gcp-sa-clouddeploy.iam.gserviceaccount.com`, where `project-number` is the project with your target) `iam.serviceAccounts.actAs` on the service account, or grant `roles/iam.serviceAccountUser` in the service account's project on each such service account. |
| 3 | Grant the Cloud Build service agent (`service-<project-number>@gcp-sa-cloudbuild.iam.gserviceaccount.com`) the `roles/iam.serviceAccountTokenCreator` role, granted in the service account's project and for each such service account configured in a target's execution environment. |
| 4 | Grant the caller of `gcloud deploy releases create` and `gcloud deploy rollouts create` `iam.serviceAccounts.actAs` on the service account, or `roles/iam.serviceAccountUser`. |

## Notes

- The default Compute Engine service account is used by many products and may have broad permissions; the source's best practice is to change the execution environment so Cloud Deploy runs as a different service account. The command above grants a role to the default account only to make the default work.
- Create alternate service accounts when you do not use the default: possibly several, for example dedicated accounts for restricted targets such as production, or one set per delivery pipeline, each with the roles needed to render and deploy. For GKE the account can be restricted to one namespace (https://docs.cloud.google.com/deploy/docs/securing/sa-by-namespace).
- If the service agent is removed, re-add it in IAM with the Cloud Deploy Service Agent role (the console path is in the source; select Include Google-provided role grants to see it).
- With a custom Cloud Storage bucket the bucket can be anywhere; it need not be in the delivery pipeline's region.
- Service agents and IAM concepts are in `gcp-foundation`.
- Adapted from the official docs: the original `--member=serviceAccount:$(gcloud projects describe PROJECT_ID --format="value(projectNumber)")-compute@developer.gserviceaccount.com` was unquoted.
- Corrected from the official docs: the "Required permissions" list writes `iam.serviceAccount.actAs` (singular) for the caller of release / rollout creation; the IAM permission name is `iam.serviceAccounts.actAs`, as the same source's cross-project steps write it.
- Corrected from the official docs: the source names the `clouddeploy.releaser` role without its `roles/` prefix; the role ID is `roles/clouddeploy.releaser`.
- Source: https://docs.cloud.google.com/deploy/docs/cloud-deploy-service-account (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [execution-environment.md](./execution-environment.md)
- [automation-resource.md](./automation-resource.md)
- [integrating-ci.md](./integrating-ci.md)
