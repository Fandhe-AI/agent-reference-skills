---
source: https://docs.cloud.google.com/secure-source-manager/docs/grant-iam-roles
---

# Grant and revoke Secure Source Manager IAM roles

Secure Source Manager instances and repositories have their own IAM roles. The first time you grant instance roles in a project you must use the gcloud CLI or the REST API; repository roles can also be granted in the web interface. Users need an instance role before they can be granted repository roles.

## Signature / Usage

### Grant or revoke an instance role (gcloud)

```bash
gcloud source-manager instances add-iam-policy-binding INSTANCE_ID \
    --project=PROJECT_ID \
    --region=REGION \
    --member=PRINCIPAL \
    --role=ROLE_NAME
```

```bash
gcloud source-manager instances remove-iam-policy-binding INSTANCE_ID \
    --project=PROJECT_ID \
    --region=REGION \
    --member=PRINCIPAL \
    --role=ROLE_NAME
```

### Workforce Identity Federation principal

```bash
gcloud source-manager instances add-iam-policy-binding my-instance \
    --project=my-project \
    --region=us-central1 \
    --member=principal://iam.googleapis.com/locations/global/workforcePools/my-pool/subject/user@example.com \
    --role=roles/securesourcemanager.instanceAccessor
```

### Instance roles through the API (read-modify-write)

Adapted (not in the official docs): the URL is quoted and `options.requestedPolicyVersion=3` is added to the `getIamPolicy` request.

```bash
curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://securesourcemanager.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/instances/INSTANCE_ID:getIamPolicy?options.requestedPolicyVersion=3" > /tmp/instance.json
```

Edit the saved policy and keep its `etag` so concurrent changes are not overwritten.

Adapted (not in the official docs): role names corrected to `roles/securesourcemanager.instanceManager` (the source wrote `roles/resourcemanager.instanceManager`).

```json
{
"policy": {
    "etag": "BwUjHYKJUiQ=",
    "bindings": [
    {
        "role": "roles/securesourcemanager.instanceOwner",
        "members": [
            "user:user1@gmail.com"
        ]
    },
    {
        "role": "roles/securesourcemanager.instanceManager",
        "members": [
            "user:user2@gmail.com",
            "user:user3@gmail.com",
            "serviceAccount:my-other-app@appspot.gserviceaccount.com"
        ]
    }
    ]
}
}
```

```bash
curl \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://securesourcemanager.googleapis.com/v1/projects/PROJECT_ID/locations/REGION/instances/INSTANCE_ID:setIamPolicy \
    -d @/tmp/instance.json
```

### Repository roles through the API (read-modify-write)

Adapted (not in the official docs): the URL is quoted and `options.requestedPolicyVersion=3` is added.

```bash
curl \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    "https://securesourcemanager.googleapis.com/v1/projects/REPOSITORY_PROJECT/locations/REGION/repositories/REPOSITORY_ID:getIamPolicy?options.requestedPolicyVersion=3" > /tmp/repository.json
```

Adapted (not in the official docs): role name corrected to `roles/securesourcemanager.repoWriter` (the source wrote `roles/resourcemanager.repoWriter`).

```json
{
"policy": {
    "etag": "BwUjHYKJUiQ=",
    "bindings": [
    {
        "role": "roles/securesourcemanager.repoAdmin",
        "members": [
            "user:email1@gmail.com"
        ]
    },
    {
        "role": "roles/securesourcemanager.repoWriter",
        "members": [
            "user:email2@gmail.com",
            "group:group1@gmail.com",
            "serviceAccount:my-other-app@appspot.gserviceaccount.com"
        ]
    }
    ]
}
}
```

```bash
curl \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://securesourcemanager.googleapis.com/v1/projects/REPOSITORY_PROJECT/locations/REGION/repositories/REPOSITORY_ID:setIamPolicy \
    -d @/tmp/repository.json
```

## Options / Props

### Required roles to change IAM

| To grant | Role | On |
|----------|------|----|
| Instance roles | `roles/securesourcemanager.instanceOwner` | The instance |
| Repository roles | `roles/securesourcemanager.repoAdmin` | The repository |

### Placeholders

| Name | Meaning |
|------|---------|
| `PRINCIPAL` | `PRINCIPAL-TYPE:ID`, for example `user:my-user@example.com`. A `user` domain must be a Google Workspace or Cloud Identity domain unless Workforce Identity Federation is used. |
| `ROLE_NAME` | `roles/securesourcemanager.IDENTIFIER`, for example `roles/securesourcemanager.instanceOwner`. |
| `PROJECT_ID` | Project ID or project number of the instance. |
| `REGION` | Region of the instance or repository. |

## Notes

- Instance bindings made with gcloud or the API are instance-level and do not appear in the project-level console IAM page. After a role has been granted once, it becomes selectable in the console for project-level grants.
- `getIamPolicy` returns the policy object itself, while `setIamPolicy` takes it under a top-level `policy` field (as in the examples); replace the example `etag` with the value returned for your resource and keep the existing bindings you want to retain.
- Setting a new allow policy permanently overwrites the existing one: always read, modify, then write, and keep the `etag` (removing it overwrites everyone else's changes). Nothing takes effect until `setIamPolicy` is called.
- Repository roles can be granted to users and service accounts in the web interface (repository **Permissions** tab, **Add users**); granting them to groups requires the API.
- Corrected from the official docs: the policy examples used `roles/resourcemanager.instanceManager` and `roles/resourcemanager.repoWriter`; Secure Source Manager roles are `roles/securesourcemanager.*`.
- Adapted from the official docs: `getIamPolicy` requests did not ask for policy version 3 and had unquoted URLs. The source's role-binding template with `...PRINCIPAL_N` and the `etag`-only output are not reproduced.
- Service accounts, IAM and Workforce Identity Federation are covered by `gcp-foundation`.
- Source: https://docs.cloud.google.com/secure-source-manager/docs/grant-iam-roles (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instance.md](./create-instance.md)
- [create-repository.md](./create-repository.md)
- [csr-ssm-permission-mapping.md](./csr-ssm-permission-mapping.md)
