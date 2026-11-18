---
source: https://docs.cloud.google.com/app-hub/docs/set-up-app-hub-folder
---

# Set up an app-enabled folder

An app-enabled folder establishes a folder-level boundary: it contains a management project, supports all Application-centric Google Cloud features (Application Design Center, Cloud Hub, Gemini Cloud Assist) and lets you register resources from its projects and subfolders as services and workloads. The folder is configured and managed with Resource Manager.

## Signature / Usage

### List discovered services within the boundary

Snippet taken from https://docs.cloud.google.com/app-hub/docs/register-resources (the folder setup page has no code block; the Resource Manager instructions it points to are not in this page).

```bash
gcloud apphub discovered-services list \
  --project=PROJECT_ID \
  --location=REGION \
  --filter=FILTER_EXPRESSION
```

## Options / Props

### Folder lifecycle operations (Resource Manager)

| Operation | Effect on App Hub |
|---|---|
| Create a project / folder in the app-enabled folder | Infrastructure resources of all descendant projects and folders become available to group into an application. |
| Move a project or folder out of the app-enabled folder | The application continues to exist in the folder, but the registration status of its services and workloads from that project or folder changes to `detached`. |
| Disable application management | Folder is no longer an app-enabled folder. |

## Notes

- Before configuring, make sure you have the required roles described in the Resource Manager page "manage applications in a folder" (https://docs.cloud.google.com/resource-manager/docs/manage-applications). Follow its instructions to set up the folder and to disable application management.
- Understand the resource hierarchy of the folder before moving or deleting projects: creating, moving or shutting down (deleting) projects and folders controls which resources are available to group into an application, and moving a project or folder out detaches its registered components. Try these operations on a disposable folder first.
- After setting up an application on an app-enabled folder you can use natural language prompts via Gemini Cloud Assist to retrieve information about the application.
- Source: https://docs.cloud.google.com/app-hub/docs/set-up-app-hub-folder (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-app-hub.md](./set-up-app-hub.md)
- [register-resources.md](./register-resources.md)
- [key-concepts.md](./key-concepts.md)
