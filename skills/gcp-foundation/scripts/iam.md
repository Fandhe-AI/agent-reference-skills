---
source: https://docs.cloud.google.com/sdk/gcloud/reference/iam
---

# IAM Roles, Policies and Service Accounts

Copy-paste gcloud commands for allow policies, custom roles, service accounts and their keys, deny policies, and Principal Access Boundary policies.

## Signature / Usage

### Read and modify an allow policy

```bash
gcloud projects get-iam-policy my-project --format=json > ~/policy.json
```

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME \
    --condition=CONDITION
```

```bash
gcloud RESOURCE_TYPE remove-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME
```

```bash
gcloud projects set-iam-policy my-project ~/policy.json
```

`set-iam-policy` writes the whole file back (read-modify-write); keep the `etag` from `get-iam-policy`.

### Grant a role on a project to a service account

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
  --role="ROLE_NAME"
```

### Manage the policy of a service account (as the resource)

```bash
gcloud iam service-accounts get-iam-policy SA_ID --format=FORMAT > PATH
```

```bash
gcloud iam service-accounts add-iam-policy-binding my-service-account@my-project.iam.gserviceaccount.com \
    --member=user:my-user@example.com --role=roles/iam.serviceAccountUser
```

```bash
gcloud iam service-accounts remove-iam-policy-binding my-service-account@my-project.iam.gserviceaccount.com \
    --member=user:my-user@example.com --role=roles/iam.serviceAccountUser
```

```bash
gcloud iam service-accounts set-iam-policy my-service-account@my-project.iam.gserviceaccount.com PATH
```

### Create, list and edit service accounts

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
  --description="DESCRIPTION" \
  --display-name="DISPLAY_NAME"
```

```bash
gcloud iam service-accounts list --project=PROJECT_ID
```

```bash
gcloud iam service-accounts update \
    SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --project=PROJECT_ID \
    --description="UPDATED_SA_DESCRIPTION" \
    --display-name="UPDATED_DISPLAY_NAME"
```

### Disable, enable, delete and undelete a service account

```bash
gcloud iam service-accounts disable SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud iam service-accounts enable SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud iam service-accounts delete \
    SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud beta iam service-accounts undelete ACCOUNT_ID
```

`ACCOUNT_ID` is the numeric ID; undelete works only within 30 days.

### Manage service account keys

```bash
gcloud iam service-accounts keys create KEY_FILE \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud iam service-accounts keys list \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud iam service-accounts keys disable KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --project=PROJECT_ID
```

```bash
gcloud iam service-accounts keys enable KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com \
    --project=PROJECT_ID
```

```bash
gcloud iam service-accounts keys delete KEY_ID \
    --iam-account=SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### Custom roles

```bash
gcloud iam list-testable-permissions FULL_RESOURCE_NAME \
    --filter="customRolesSupportLevel!=NOT_SUPPORTED"
```

```bash
gcloud iam roles describe roles/iam.roleViewer
```

```bash
gcloud iam roles create ROLE_ID --project=PROJECT_ID \
    --file=YAML_FILE_PATH
```

```bash
gcloud iam roles create myCompanyAdmin --project=my-project \
    --title="My Company Admin" --description="My custom role description." \
    --permissions="iam.roles.get,iam.roles.list" --stage=ALPHA
```

```bash
gcloud iam roles update myCompanyAdmin --organization=123456789012 \
    --add-permissions="storage.buckets.get,storage.buckets.list"
```

```bash
gcloud iam roles list --project=PROJECT_ID
```

```bash
gcloud iam roles delete ROLE_ID --project=PROJECT_ID
```

```bash
gcloud iam roles undelete ROLE_ID --project=PROJECT_ID
```

### Deny policies

```bash
gcloud iam policies create my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --policy-file=policy.json
```

```bash
gcloud iam policies list \
    --attachment-point=ATTACHMENT_POINT \
    --kind=denypolicies \
    --format=json
```

```bash
gcloud iam policies get my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --format=json \
    > ./policy.json
```

```bash
gcloud iam policies update my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies \
    --policy-file=policy.json
```

```bash
gcloud iam policies delete my-deny-policy \
    --attachment-point=cloudresourcemanager.googleapis.com/projects/my-project \
    --kind=denypolicies
```

### Principal Access Boundary policies

```bash
gcloud iam principal-access-boundary-policies create PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --display-name=DISPLAY_NAME --details-rules=FILE_PATH.json \
    --details-enforcement-version=ENFORCEMENT_VERSION
```

```bash
gcloud iam principal-access-boundary-policies list --organization=ORG_ID \
    --location=global  --format=FORMAT
```

```bash
gcloud iam principal-access-boundary-policies describe PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --format=FORMAT
```

```bash
gcloud iam principal-access-boundary-policies search-policy-bindings PAB_POLICY_ID \
    --organization=ORG_ID --location=global \
    --format=FORMAT
```

### Lint a condition (alpha)

```bash
gcloud alpha iam policies lint-condition --condition-from-file="condition.json"
```

## Options / Props

| Flag | Used with | Meaning |
| --- | --- | --- |
| `--member` / `--role` | `add-iam-policy-binding`, `remove-iam-policy-binding` | Principal and role of the binding |
| `--condition` | `add-iam-policy-binding` | IAM Condition for the binding |
| `--iam-account` | `service-accounts keys ...` | Service account email that owns the key |
| `--attachment-point` | `iam policies ...` | Resource the deny policy attaches to |
| `--kind` | `iam policies ...` | `denypolicies` for deny policies |
| `--stage` | `iam roles create` / `update` | Launch stage of a custom role (for example `ALPHA`, `DISABLED`) |

## Notes

- Warning: use a disposable project or test environment for `remove-iam-policy-binding`, `set-iam-policy`, `service-accounts delete`, `keys delete`, `roles delete` and `iam policies delete`; always name the exact resource and never omit the target.
- A deleted service account can be undeleted only within 30 days and only if no account with the same name exists.
- Service account keys are a security risk; prefer impersonation or Workload Identity Federation. Key creation can be blocked by organization policy.
- Custom roles cannot be defined at folder level; define them on the organization or project.
- Source: https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-create (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/keys-create-delete (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/creating-custom-roles (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/deny-access (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/principal-access-boundary-policies-view (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/linting-policies (retrieved 2026-11-14)

## Related

- [grant-revoke-allow-policy.md](../references/iam-guides/access-management/grant-revoke-allow-policy.md)
- [service-accounts-create-manage.md](../references/iam-guides/service-account-lifecycle/service-accounts-create-manage.md)
- [service-account-key-lifecycle.md](../references/iam-guides/service-account-credentials/service-account-key-lifecycle.md)
- [choosing-and-creating-roles.md](../references/iam-guides/roles/choosing-and-creating-roles.md)
- [deny-policies.md](../references/iam-guides/access-policies/deny-policies.md)
- [principal-access-boundary-policies.md](../references/iam-guides/principal-access-boundary/principal-access-boundary-policies.md)
- [lint-conditions.md](../references/iam-guides/policy-guardrails/lint-conditions.md)
