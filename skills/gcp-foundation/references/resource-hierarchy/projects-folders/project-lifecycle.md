---
source: https://docs.cloud.google.com/resource-manager/docs/project-liens
---

# Project Liens and Project Deletion Troubleshooting

Protect projects from accidental deletion with liens, and resolve the common blockers that make project deletion fail.

## Signature / Usage

Place a lien (Preview; alpha command):

```bash
gcloud alpha resource-manager liens create \
    --project=PROJECT_ID \
    --restrictions=resourcemanager.projects.delete \
    --reason=LIEN_REASON \
    --origin=LIEN_ORIGIN
```

List liens:

```bash
gcloud alpha resource-manager liens list
```

```text
NAME                                                  ORIGIN            REASON
p1061081023732-l3d8032b3-ea2c-4683-ad48-5ca23ddd00e7  user@example.com  testing
```

Remove a lien (destructive protection removal; confirm intent first):

```bash
gcloud alpha resource-manager liens delete LIEN_NAME
```

Deletion blocked by Cloud Endpoints (delete the Endpoints services first):

```bash
@cloudshell:~ ($project)$ gcloud projects delete $project
Your project will be deleted.

Do you want to continue (Y/n)?  Y

ERROR: (gcloud.projects.delete) FAILED_PRECONDITION: active child resource
- '@type':type.googleapis.com/google.rpc.PreconditionFailure
 violations:
 - description: active child resource
   subject: services/$service
- '@type':type.googleapis.com/google.rpc.ResourceInfo
 resourceName: projects/$project
 resourceType: PROJECT
```

Deletion blocked by an app-management "management project":

```text
ERROR: (gcloud.projects.delete) FAILED_PRECONDITION: Deletion is not allowed
because this project is the management project for the folder it resides in.
```

```bash
gcloud resource-manager capabilities update folders/FOLDER_ID/capabilities/app-management --no-enable
```

Orphaned state (alpha; flags may change):

```bash
gcloud alpha apphub boundary update --project=PROJECT_ID --location=global --crm-node=''
```

## Options / Props

| Item | Value |
|------|-------|
| Role to modify liens | Project lien modifier `roles/resourcemanager.lienModifier` on projects |
| Permissions | `resourcemanager.projects.updateLiens`; listing needs `resourcemanager.projects.get` |
| `--restrictions` | `resourcemanager.projects.delete` |
| `--origin` | Required; defaults to the user's email if omitted |

## Notes

- A lien blocks deletion until an Organization Administrator or Project Owner removes it. Google Cloud also places liens automatically, for example when a service account from one project is attached to a resource in another project (IAM places a lien on the service-account-owning project), and for shared VPC host / service project attachments (detach service projects and disable shared VPC first).
- Disabling application management on a folder automatically deletes its management project.
- Cloud Endpoints are child resources of the project and block deletion.
- Source: https://docs.cloud.google.com/resource-manager/docs/project-liens
- Source: https://docs.cloud.google.com/resource-manager/docs/troubleshooting-project-deletion
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [projects.md](./projects.md)
- [../organization-policy/service-account-constraints.md](../organization-policy/service-account-constraints.md)
