---
source: https://docs.cloud.google.com/app-hub/docs/set-up-app-hub
---

# Choose your application setup model

Define an application management boundary that decides which resources you can discover and register as services and workloads. A management project is the central point for APIs, access control, billing and quotas. Choose a single-project (Preview), folder-level, or host-project (legacy) model according to your resource hierarchy and the Application-centric Google Cloud features you need.

## Signature / Usage

### Attach a service project to a host project (legacy model)

Snippet taken from https://docs.cloud.google.com/app-hub/docs/set-up-app-hub-host-project (the setup model page has no code block).

```bash
gcloud apphub service-projects add SERVICE_PROJECT_ID \
    --project=HOST_PROJECT_ID
```

## Options / Props

### Compare setup models

| Feature | Single-project boundary (Preview) | Folder-level boundary | Host project (Legacy) |
|---|---|---|---|
| Recommendation | New users or small organizations where all application components reside in a single project. | Large organizations with multiple projects in a single folder, aligning application management with the organizational structure. | Supported model for existing users to manage components from multiple projects that aren't contained in a single folder. |
| Boundary extent | A single Google Cloud project | All descendant projects within a folder | A manually managed set of service projects (multiple-project boundary) |
| Management | App Hub discovers supported resources within the project automatically. | Projects within the folder are automatically added to the boundary. | You must manually attach service projects to the host project. |
| Primary use case | Small applications, initial adoption, or teams managing resources within a single project. | Alignment by business unit, environment, or team. | Components spread across projects that don't share a common folder. |
| Application-centric Google Cloud feature support | Limited support | Full support | Limited support |
| Setup complexity | Low: requires a single project. | Medium: requires a folder structure. | High: requires manual linking of all projects. |
| Setup guide | Set up a single project (https://docs.cloud.google.com/app-hub/docs/set-up-app-hub-single-project) | set-up-app-hub-folder.md | set-up-app-hub-host-project.md |

### Feature support by boundary type

| Boundary type | App Hub project type | Product support |
|---|---|---|
| Single project (Preview) | Host project | App Hub; Application Monitoring |
| Single project (Preview) | Management project | App Hub; Application Design Center; Application Monitoring; Security Command Center |
| Folder level | Management project | App Hub; Agent Registry; Application Design Center; Application Monitoring; Cloud Hub; Cost Explorer; Gemini Cloud Assist; other Application-centric Google Cloud products |
| Multiple projects | Host project | App Hub; Application Monitoring |

## Notes

- Permissions are inherited: IAM roles and permissions for applications are granted on the management project, and standard IAM inheritance rules from the resource hierarchy apply.
- The management project centralizes application metadata such as owners, criticality and environment.
- A boundary on a parent folder (for example F1) lets applications include resources from projects directly within it and from projects in nested folders (F2). A boundary on a nested folder (F2) only covers projects within F2; to include a project from the parent folder you must move that project into F2.
- The source also shows figures of the two folder layouts; they are omitted.
- Source: https://docs.cloud.google.com/app-hub/docs/set-up-app-hub (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-app-hub-folder.md](./set-up-app-hub-folder.md)
- [set-up-app-hub-host-project.md](./set-up-app-hub-host-project.md)
- [key-concepts.md](./key-concepts.md)
- [best-practices.md](./best-practices.md)
