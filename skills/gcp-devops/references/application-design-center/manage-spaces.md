---
source: https://docs.cloud.google.com/application-design-center/docs/manage-spaces
---

# Manage spaces

Spaces are isolated areas where teams create templates and deploy applications without affecting other groups. Administrators create and manage spaces across regions, assign them to teams and grant role-based permissions. Templates and applications stay in their space unless an administrator publishes templates to a shared catalog.

## Signature / Usage

### List spaces in a region

The source itself describes space tasks only through the console; the gcloud command below comes from the gcloud help (see Notes).

```bash
gcloud design-center spaces list --project=my-project \
    --location=us-central1
```

## Options / Props

### Required roles

| Task | Required roles |
|---|---|
| Select, view and manage spaces across regional management boundaries | Application Design Center Admin (`roles/designcenter.admin`) |
| Perform initial setup or create new spaces | Application Design Center Admin (`roles/designcenter.admin`) |
| Manage space user permissions and assign IAM roles | Application Design Center Admin (`roles/designcenter.admin`) |

Roles are granted on the app-enabled folder or the management project.

### Spaces created by setup

| Space | Description |
|---|---|
| Initial space | A named space |
| Default space per region | One in each region where App Design Center is available |
| Global space | A space in a global region |

## Notes

- Each supported region in an application management boundary has a single space. You can create templates, components and application drafts in each space; a deployed application stays managed from its originating space, but the underlying resources can be provisioned in any supported region.
- You cannot share a catalog between spaces in the same application management boundary. A catalog can only be shared with a destination space in the same region as the source space but in a different application management boundary. To create that boundary, complete the initial setup on another app-enabled folder or project.
- Space users: add each user or group as a principal and assign roles (console: Manage permissions > Add principal). For example, give `roles/designcenter.admin` to a principal who creates and assigns spaces, manages catalogs and designs templates.
- The "Manage regions" summary table only includes regions you have previously opened.
- The source shows only console steps for region selection, new boundaries and user permissions; they are omitted here.
- Source: https://docs.cloud.google.com/application-design-center/docs/manage-spaces (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/list (gcloud 593.0.0 help).

## Related

- [setup.md](./setup.md)
- [manage-catalogs.md](./manage-catalogs.md)
- [design-application-templates.md](./design-application-templates.md)
