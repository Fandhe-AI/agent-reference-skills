---
source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects
---

# Creating and Managing Projects

Create projects with the console, gcloud, or `projects.create()`; naming rules, tags at creation, service-account creation, and project count quotas.

## Signature / Usage

```bash
gcloud projects create PROJECT_ID
```

With a parent (only one of the two flags):

```bash
gcloud projects create PROJECT_ID --organization=ORGANIZATION_ID
```

```bash
gcloud projects create PROJECT_ID --folder=FOLDER_ID
```

REST create (does not link billing; use `projects.updateBillingInfo` for that):

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

Response (long-running operation):

```restructuredtext
{
    "name": "operations/pc.123456789",
}
```

Poll the operation:

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

### Tags at creation (Preview)

Requires the Tag User role.

```bash
gcloud projects create PROJECT_ID --organization=ORGANIZATION_ID --tags=KEY_VALUE_PAIRS
```

`KEY_VALUE_PAIRS` example: `123/environment=production, 456/create=testresource` (`123` / `456` are the IDs of the organization or folder defining the tag keys).

```restructuredtext
  POST https://cloudresourcemanager.googleapis.com/v3/projects/
  Authorization: *************
  Content-Type: application/json

  {
    "projectId": "our-project-456",
    "name": "my project",
    "parent": "organizations/123",
    "tags": {
      "key": "123/environment"
      "value": "production"
    },
"tags": {
      "key": "123/costCenter"
      "value": "marketing"
  }
}
```

## Options / Props

| Identifier | Rules |
|-----------|-------|
| Project name | 4-30 characters; letters, numbers, single quotes, hyphens, spaces, exclamation points; must end with a letter or digit; not used by Google APIs; editable; need not be unique |
| Project ID | Globally unique; 6-30 characters; lowercase letters, digits, hyphens; must start with a letter; cannot end with a hyphen; never previously used (including deleted projects); no restricted strings such as `google`, `ssl` (avoid `undefined`, `null`); permanent after creation |
| Project number | Auto-generated, read-only |

Environment badges in the console project picker (tag key `environment`): Prod = Prod / prod / Production / production; Dev = Dev / dev / Development / development; Test = Test / test / Testing / testing / QA / qa / Quality assurance / quality assurance; Staging = Staging / staging / Stage / stage. The most specific tag wins; viewing badges needs the Tag Viewer role (`roles/resourcemanager.tagViewer`) at organization or folder level.

## Notes

- Permission needed: `resourcemanager.projects.create` (for example Project Creator `roles/resourcemanager.projectCreator`, granted by default to the whole domain of a new organization and to free trial users). The console billing-account picker needs Billing Account User (`roles/billing.user`).
- Do not put sensitive information (PII, security data) in project names or IDs; the ID appears in many resource names.
- Service accounts can create projects but only inside an organization and must specify the parent.
- The official tag REST sample is not valid JSON as written (duplicate `tags` key, missing commas); treat it as a shape illustration only.
- Quota: creating outside an organization uses the user's quota; inside an organization, both user and organization quotas are checked (either with remaining quota is sufficient). Soft-deleted projects count until fully deleted after 30 days. Request an increase on Quotas & System Limits: filter Metric `cloudresourcemanager.googleapis.com/projects_count`, select Cloud Resource Manager API, Edit quota. Without an organization use the Request Project Quota Increase form.
- Source: https://docs.cloud.google.com/resource-manager/docs/creating-managing-projects
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [resource-hierarchy.md](./resource-hierarchy.md)
- [project-lifecycle.md](./project-lifecycle.md)
- [moving-projects.md](./moving-projects.md)
- gcp-cli (gcloud projects)
