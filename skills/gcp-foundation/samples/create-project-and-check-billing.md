---
source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects
---

# Create a Project and Check Its Billing Link

Create a project under an organization or folder, poll the long-running operation, then verify that billing is enabled.

## Signature / Usage

### Create the project (gcloud)

```bash
gcloud projects create PROJECT_ID --organization=ORGANIZATION_ID
```

Under a folder instead (only one of the two parent flags):

```bash
gcloud projects create PROJECT_ID --folder=FOLDER_ID
```

### Create the project (REST)

`projects.create` does not link billing; billing is handled separately.

```restructuredtext
POST https://cloudresourcemanager.googleapis.com/v3/projects/
Authorization: *************
Content-Type: application/json

{
    "projectId": "our-project-123",
    "name": "my project",
    "labels": {
      "mylabel": "prod"
    }
}
```

The response is a long-running operation:

```restructuredtext
{
    "name": "operations/pc.123456789"
}
```

Poll it until `done` is `true`:

```restructuredtext
GET https://cloudresourcemanager.googleapis.com/v3/operations/pc.123456789
Authorization: *************
Content-Type: application/json
```

```restructuredtext
{
    "name": "operations/pc.123456789",
    "done": true,
    "response": {
        "@type": "type.googleapis.com/google.cloudresourcemanager.v3.Project",
        "projectNumber": "464036093014",
        "projectId": "our-project-123",
        "lifecycleState": "ACTIVE",
        "name": "my project",
        "labels": {
        "mylabel": "prod"
        },
    "createTime": "2016-01-07T21:59:43.314Z"
    }
}
```

### Verify billing is enabled

```text
gcloud beta billing projects describe PROJECT_ID
```

Billing is enabled when both `billingAccountName` is set and `billingEnabled: true`:

```text
  billingAccountName: billingAccounts/0X0X0X-0X0X0X-0X0X0X
  billingEnabled: true
  name: projects/my-project/billingInfo
  projectId: my-project
```

A blank name means no billing account is linked:

```text
  billingAccountName: ''
  billingEnabled: false
  name: projects/my-project/billingInfo
  projectId: my-project
```

Check the billing account itself (`open: true` means active):

```text
gcloud beta billing accounts describe ACCOUNT_ID
```

## Options / Props

| Identifier | Rules |
|-----------|-------|
| Project ID | Globally unique; 6-30 characters; lowercase letters, digits, hyphens; must start with a letter; cannot end with a hyphen; permanent |
| Project name | 4-30 characters; editable; need not be unique |
| Project number | Auto-generated, read-only |

## Notes

- Creating needs `resourcemanager.projects.create` (for example `roles/resourcemanager.projectCreator`). Linking billing needs permissions on both the project and the billing account (for example Billing Account User on the account).
- Do not put sensitive information in project names or IDs; the ID appears in many resource names.
- Linking is done in the console (Billing > My projects > Actions > Change billing) or with `projects.updateBillingInfo`; this reference carries no gcloud link command, so none is shown here.
- Use a throwaway project when experimenting; deleted project IDs can never be reused.
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/billing/docs/how-to/verify-billing-enabled (retrieved 2026-11-14)

## Related

- [projects.md](../references/resource-hierarchy/projects-folders/projects.md)
- [project-billing-link.md](../references/billing/accounts/project-billing-link.md)
- [moving-projects.md](../references/resource-hierarchy/projects-folders/moving-projects.md)
