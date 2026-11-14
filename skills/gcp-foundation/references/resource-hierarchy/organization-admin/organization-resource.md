---
source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-organization
---

# Organization Resource: Setup, Default Roles, Security Baseline, Limits

How an organization resource is obtained and adopted, how to find its ID, the default roles to lock down, the Google Cloud security baseline constraints enforced on new organizations, and Resource Manager API / hierarchy limits.

## Signature / Usage

Find the organization ID:

```bash
gcloud organizations list
```

```bash
GET https://cloudresourcemanager.googleapis.com/v3/organizations:search{query=domain:altostrat.com}
```

Add an Organization Administrator:

```bash
gcloud organizations add-iam-policy-binding ORGANIZATION_ID \
    --member="user:EMAIL_ADDRESS" \
    --role="roles/resourcemanager.organizationAdmin"
```

REST (read-modify-write with the `etag` from `getIamPolicy`):

```console
POST https://cloudresourcemanager.googleapis.com/v3/organizations/ORGANIZATION_ID:getIamPolicy
```

```console
POST https://cloudresourcemanager.googleapis.com/v3/organizations/ORGANIZATION_ID:setIamPolicy
{
  "policy": {
    "bindings": [
      {
        "role": "roles/resourcemanager.organizationAdmin",
        "members": [
          "user:EMAIL_ADDRESS"
        ]
      }
    ],
    "etag": "ETAG_VALUE"
  }
}
```

Check and manage the security baseline policies:

```
gcloud resource-manager org-policies list --organization=ORGANIZATION_ID
```

```
gcloud org-policies delete CONSTRAINT_NAME --organization=ORGANIZATION_ID
```

`CONSTRAINT_NAME` example: `iam.allowedPolicyMemberDomains`.

## Options / Props

Security baseline constraints enforced automatically for organizations created on or after May 3, 2024 (some from February-April 2024):

| Constraint | Purpose |
|-----------|---------|
| `constraints/iam.managed.disableServiceAccountKeyCreation` | No persistent service account keys |
| `constraints/iam.managed.disableServiceAccountKeyUpload` | No uploading external public keys to service accounts |
| `constraints/iam.automaticIamGrantsForDefaultServiceAccounts` | Default service accounts do not get the Editor role at creation |
| `constraints/iam.allowedPolicyMemberDomains` | Limit sharing to your organization / Workspace customer ID |
| `constraints/essentialcontacts.managed.allowedContactDomains` | Essential Contacts limited to selected domains |
| `constraints/compute.managed.restrictProtocolForwardingCreationForTypes` | Protocol forwarding for internal IP addresses only (for some organizations created after August 15, 2024 already applied) |
| `constraints/storage.uniformBucketLevelAccess` | No per-object ACLs on Cloud Storage buckets |

Resource Manager API limits (per API consumer project):

| Limit | Per second | Per minute |
|-------|-----------|-----------|
| v1 list (projects) | 4 | 240 |
| v1 search (organizations) | 10 | 600 |
| v2 list / search (folders) | 10 | 600 |
| v1 read operations (projects); other API read operations (tags etc.) | 10 | 600 |
| v3 list (projects, folders, organizations) | 10 | 600 |
| v3 search | 4 | 240 |
| Write operations (`CreateProject` costs 10 requests per second) | 10 | 600 |
| Creating folders | 0.1 | 6 |
| Moving folders | 0.1 | 6 |

Other limits: a resource can have at most 50 tag key-value pairs; at most 1000 tag keys per organization or project; at most 1000 values per key; folders nest 10 levels and hold 300 direct child folders.

## Notes

- An organization resource is created automatically once a Google Workspace or Cloud Identity account / domain exists (on first console login with accepted terms for new users, or when an existing user creates a project or billing account). Projects created earlier appear under "No organization" and must be migrated. One account maps to exactly one organization and one domain. A standalone organization is also auto-created for Google Account signups.
- On creation, all domain users get Project Creator (`roles/resourcemanager.projectCreator`) and Billing Account Creator (`roles/billing.creator`) at the organization level; with inheritance this lets every domain user create projects anywhere. Grant these roles to specific principals, then remove the domain-wide bindings (Manage resources > organization > Info panel > Permissions > remove).
- The super admin who creates the organization is assigned Organization Administrator by default; delegate it to another user or group for separation of duties. Organization Administrator manages allow / deny policies and sees the hierarchy; it does not include creating folders or projects.
- Do not use super admin accounts for day-to-day management. "This domain is already in use" errors need the Workspace domain-ownership resolution steps.
- Disabling baseline policies weakens the posture: review before deleting. Use `gcloud org-policies delete` (the older `gcloud resource-manager org-policies` surface appears in the official page only for listing).
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-organization
- Source: https://docs.cloud.google.com/resource-manager/docs/secure-by-default-organizations
- Source: https://docs.cloud.google.com/resource-manager/docs/default-access-control
- Source: https://docs.cloud.google.com/resource-manager/docs/limits
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [resource-manager-audit-logging.md](./resource-manager-audit-logging.md)
- [../projects-folders/access-control.md](../projects-folders/access-control.md)
- [../organization-policy/constraints-reference.md](../organization-policy/constraints-reference.md)
