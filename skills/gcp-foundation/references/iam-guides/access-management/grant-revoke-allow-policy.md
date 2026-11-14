---
source: https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access
---

# Granting, Changing, and Revoking Access (Projects, Folders, Organizations, Service Accounts, Other Resources)

View and modify allow policies with `add-iam-policy-binding` shortcuts or the read-modify-write pattern.

## Signature / Usage

View current access:

```bash
gcloud RESOURCE_TYPE get-iam-policy RESOURCE_ID --format=FORMAT > PATH
```

```bash
gcloud projects get-iam-policy my-project --format=json > ~/policy.json
```

REST:

```text
POST https://cloudresourcemanager.googleapis.com/API_VERSION/RESOURCE_TYPE/RESOURCE_ID:getIamPolicy
```

```json
{
  "options": {
    "requestedPolicyVersion": POLICY_VERSION
  }
}
```

Grant or revoke a single role:

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME \
    --condition=CONDITION
```

```bash
gcloud RESOURCE_TYPE remove-iam-policy-binding RESOURCE_ID \
    --member=PRINCIPAL --role=ROLE_NAME
```

Service accounts as the resource:

```bash
gcloud iam service-accounts get-iam-policy SA_ID --format=FORMAT > PATH
gcloud iam service-accounts add-iam-policy-binding my-service-account@my-project.iam.gserviceaccount.com \
    --member=user:my-user@example.com --role=roles/iam.serviceAccountUser
gcloud iam service-accounts remove-iam-policy-binding my-service-account@my-project.iam.gserviceaccount.com \
    --member=user:my-user@example.com --role=roles/iam.serviceAccountUser
gcloud iam service-accounts set-iam-policy my-service-account@my-project.iam.gserviceaccount.com PATH
```

```text
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_ID:getIamPolicy
POST https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts/SA_ID:setIamPolicy
```

Role binding format used when editing a policy:

```json
{
  "role": "ROLE_NAME",
  "members": [
    "PRINCIPAL_1",
    "PRINCIPAL_2",
    ...
    "PRINCIPAL_N"
  ],
  "conditions:" {
    CONDITIONS
  }
}
```

Add a principal to an existing binding:

```json
{
  "role": "roles/iam.securityReviewer",
  "members": [
    "user:kai@example.com",
    "user:raha@example.com"
  ]
}
```

Add a new binding:

```json
{
  "role": "roles/compute.storageAdmin",
  "members": [
    "user:raha@example.com"
  ]
}
```

Write the modified policy back:

```bash
gcloud RESOURCE_TYPE set-iam-policy RESOURCE_ID PATH
```

```bash
gcloud projects set-iam-policy my-project ~/policy.json
```

```text
POST https://cloudresourcemanager.googleapis.com/API_VERSION/RESOURCE_TYPE/RESOURCE_ID:setIamPolicy
```

```json
{
  "policy": POLICY
}
```

For resources other than projects/folders/organizations/service accounts, find the `add-iam-policy-binding` command in the gcloud reference for that resource (for example `gcloud compute instances add-iam-policy-binding`).

## Options / Props

| Item | Detail |
|---|---|
| `RESOURCE_TYPE` | `projects`, `resource-manager folders`, or `organizations` |
| `API_VERSION` | `v1` for projects and organizations; `v2` for folders |
| `PRINCIPAL` | `PRINCIPAL_TYPE:ID`, for example `user:my-user@example.com` or a `principalSet://iam.googleapis.com/locations/global/workforcePools/...` identifier; `user` domains must be Workspace or Cloud Identity domains |
| `ROLE_NAME` | `roles/SERVICE.IDENTIFIER`, `projects/PROJECT_ID/roles/IDENTIFIER`, or `organizations/ORG_ID/roles/IDENTIFIER` |
| `CONDITION` | Condition for the binding, or `None` |
| `POLICY_VERSION` | Request version 3 |
| Roles to manage projects | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`); folders: `roles/resourcemanager.folderAdmin`; organizations: `roles/resourcemanager.organizationAdmin`; almost everything: Security Admin (`roles/iam.securityAdmin`) |
| Permissions | `resourcemanager.{projects,folders,organizations}.{getIamPolicy,setIamPolicy}`; for other resources `SERVICE.RESOURCE_TYPE.{get,getIamPolicy,setIamPolicy}` (for example `compute.instances.*`) |
| Service account admin | Service Account Admin (`roles/iam.serviceAccountAdmin`): `iam.serviceAccounts.{get,list,getIamPolicy,setIamPolicy}` |

## Notes

- Always use read-modify-write; `setIamPolicy` permanently overwrites the policy. Keep the `etag` so concurrent changes are not lost. Store the returned policy (not the sent one) if you keep policies in version control. Role bindings with no principals are an error.
- To grant Owner (`roles/owner`) to a user outside your organization, or on a project without an organization, you must use the console (not gcloud). This is a high-risk grant; avoid it.
- Granting access is a sensitive action and may require reauthentication.
- `get-iam-policy` does not show inherited roles; use the console or effective-policy views in Cloud Asset Inventory.
- Email aliases and secondary domains resolve to the primary email/domain in the policy; granting to an alias reveals the primary email.
- If `iam.allowedPolicyMemberDomains` is enforced, newly created groups may fail with `failedPrecondition`; retry after 24 hours.
- Changes usually take effect within 2 minutes, sometimes 7 minutes or more.
- Granting roles on a service account can allow principals to impersonate it; see service account roles guidance.
- Revoking project-level roles: enable change risk recommendations to get warnings for important roles. The console cannot edit inherited roles; edit them where they were granted.
- Source: https://docs.cloud.google.com/iam/docs/granting-changing-revoking-access
- Source: https://docs.cloud.google.com/iam/docs/manage-access-service-accounts
- Source: https://docs.cloud.google.com/iam/docs/manage-access-other-resources
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [conditional-role-bindings.md](./conditional-role-bindings.md)
- [iam-concepts-and-console-grant.md](./iam-concepts-and-console-grant.md)
- gcp-cli (gcloud in general)
