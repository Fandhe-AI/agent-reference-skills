---
source: https://docs.cloud.google.com/iam/docs/attach-service-accounts
---

# Attaching Service Accounts, Built-in Identities, and Deployment Pipeline Practices

How to attach a user-managed service account to a resource (including across projects), resources with built-in identities, and best practices for service accounts in deployment pipelines.

## Signature / Usage

Required role to attach: Service Account User (`roles/iam.serviceAccountUser`) on the service account (contains `iam.serviceAccounts.actAs`). Enable the IAM and Resource Manager APIs.

### Same project

Grant roles to the service account as to any principal, then create the resource with the service account attached. In most cases the attached account cannot be changed after creation; Compute Engine instances are the exception.

### Different project

1. Enable cross-project attachment in the project that contains the service account (organization policy below).
2. Identify the project, the resource type, and the owning service; find the service agent email (Dataflow, Managed Service for Apache Spark, and GKE also depend on Compute Engine, so find both service agents).
3. Grant Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) on the service account to the service agents:

```bash
gcloud iam service-accounts add-iam-policy-binding \
    SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --member=serviceAccount:SERVICE_AGENT_EMAIL \
    --role=roles/iam.serviceAccountTokenCreator
```

REST (read-modify-write):

```
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/USER_SA_NAME@PROJECT_ID.iam.gserviceaccount.com:getIamPolicy
```

```
{
  "requestedPolicyVersion": 3
}
```

Modified policy:

```json
{
  "version": 1,
  "etag": "BwWl3KCTUMY=",
  "bindings": [
    {
      "role": "roles/iam.serviceAccountTokenCreator",
      "members": [
        "serviceAccount:SERVICE_AGENT_EMAIL"
      ]
    },
    {
      "role": "roles/iam.serviceAccountUser",
      "members": [
        "serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com"
      ]
    }
  ]
}
```

```
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com:setIamPolicy
```

### Organization policy for cross-project use

```text
iam.disableCrossProjectServiceAccountUsage          (boolean; must NOT be enforced in the project containing the service accounts)
iam.restrictCrossProjectServiceAccountLienRemoval   (boolean; recommended enforced)
```

### Built-in resource identities

Some resources (for example Parameter Manager parameters) have built-in identities and can be granted roles through the resource's principal identifier, e.g. a parameter granted `roles/secretmanager.secretAccessor` to read Secret Manager secrets. Sets of such resources share identifiers by type or ancestor.

### Pipeline log correlation

```text
X-Goog-Request-Reason: <pipeline run id>        (HTTP header)
Terraform provider: request_reason set to the CI/CD run
Custom User-Agent embedding the pipeline run ID
```

## Options / Props

### Resources that accept an attached service account

AI Platform Prediction (model versions) and Training (jobs), App Engine standard and flexible (versions), Managed Service for Apache Airflow (environments), Cloud Run functions, Cloud Run (services), Cloud Scheduler (jobs), Cloud Source Repositories, Compute Engine (instances, instance templates), Managed Service for Apache Spark (clusters), GKE (clusters, node pools), Notebooks (instances), Pub/Sub (subscriptions).

### Deployment pipeline best practices

| Threat | Practice |
|--------|----------|
| Spoofing | Avoid attaching service accounts to CI/CD VMs (or attach only a minimal one, e.g. Cloud Logging); one dedicated service account per pipeline with the pipeline name in the email; use Workload Identity Federation (GitHub Actions, GitLab OIDC tokens); VPC Service Controls ingress rules or access levels against leaked credentials. |
| Tampering | Do not let pipelines manage allow/deny policies, organization policy constraints, or VPC Service Controls; if unavoidable, grant only for specific resources. |
| Non-repudiation | Correlate pipeline logs with Cloud Audit Logs (request reason header, User-Agent, log operation IDs); align retention of Data Access audit logs, Admin Activity logs, and pipeline logs (custom retention or sink). |
| Information disclosure | Grant access to specific resources, create-only roles such as Storage Object Creator (`roles/storage.objectCreator`), IaC only for less-confidential resources; VPC Service Controls perimeter. |
| Privilege escalation | Control who can change the repo, pipeline config, infrastructure, and inputs (packages, images); avoid `*.setIamPolicy` and Editor/Owner for pipelines; constrain with deny policies and IAM Conditions on granted roles; never print credentials in logs (no tokens in args or environment variables; mask tokens). |

## Notes

- Using the `iam.serviceAccounts.actAs` permission to attach a service account produces an audit log with the attaching principal and the attached service account.
- After enabling cross-project attachment, do not reverse it: IAM adds a project lien with origin `iam.googleapis.com/cross-project-service-accounts` that prevents project deletion; do not remove it, do not enforce `iam.disableCrossProjectServiceAccountUsage`, do not unenforce `iam.restrictCrossProjectServiceAccountLienRemoval`. Resources may stop working if reversed. `iam.disableCrossProjectServiceAccountUsage` is enforced by default and configurable only at project level.
- If `iam.restrictCrossProjectServiceAccountLienRemoval` is not enforced, a principal with `resourcemanager.projects.updateLiens` on the project can remove the lien; when enforced, the permission is needed at organization level.
- A resource's built-in identity cannot authenticate customer-managed workloads such as Compute Engine VM code; use the standard authentication methods.
- By default IAM ignores geolocation, source IP, and origin project; stolen credentials work from anywhere. IP restrictions are weak for SaaS-based pipelines.
- Pipelines generally cannot use a developer's identity because authorship is not tamper-proof or the identities cannot be mapped.
- Source: https://docs.cloud.google.com/iam/docs/attach-service-accounts (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/built-in-resource-identities (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/iam/docs/best-practices-for-using-service-accounts-in-deployment-pipelines (retrieved 2026-11-14; CC BY 4.0)

## Related

- [service-account-best-practices.md](./service-account-best-practices.md)
- [workload-identity-federation-best-practices.md](../federation-credentials/workload-identity-federation-best-practices.md)
- Other skill: gcp-security (VPC Service Controls)
