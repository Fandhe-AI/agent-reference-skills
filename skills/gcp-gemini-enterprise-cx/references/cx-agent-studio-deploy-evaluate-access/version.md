---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/version
---

# Agent application versions

Versions save the state of an agent application as immutable snapshots in time. Use them to preserve completed work, save progress before major changes, or roll back to a previous state. The **Versions** pane also lists a detailed change history of the agent application.

## Signature / Usage

### The Versions pane

Open it by clicking **Versions** on the right side of the builder page. It records all changes to the agent application, with a timestamp, the action type (create, update, or delete), the name of the modified resource, and the email address of the user who made the change. Selecting a change shows a diff of the configuration before and after the modification. After a version is created, changes recorded between it and the previously created version are grouped underneath it.

### Track changes to the draft version

Changes apply immediately to the working draft version. To inspect uncommitted changes, open the agent builder, click **Versions**, and select a modification to see the updated fields and a diff of the resource configuration.

### Create, view, delete, restore

- Create: **Versions** pane, **+ Create version**, enter a name and optional description, **Create**. A new version is only created if there are changes to the agent application configuration.
- View: overflow menu on the version row, **View**.
- Delete: overflow menu on the version row, **Delete**, then confirm.
- Restore: overflow menu on the version row, **Restore**, then confirm.

If the current configuration has changes since the last version was saved, restoring first creates an automatic system version (authored by `system@google.com`) to save the unsaved work, so you can "revert a revert". If there are no changes to the current configuration, the restore is a no-op.

### Versions and deployments

When you deploy a version, CX Agent Studio creates a deployment from the immutable snapshot captured when that version was created. The snapshot stores:

- Basic application settings and metadata, including the application name.
- All configured agents and instructions.
- All associated tools, examples, guardrails, and toolsets.

Snapshots capture application design and configuration resources, but don't include deployments or evaluation runs. Changes to the draft (for example renaming the application or editing agent instructions) don't alter a deployed version. A version attached to a deployment displays a **Live** badge in the **Versions** pane.

A deployment is addressed by this resource name:

```text
projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/deployments/DEPLOYMENT_ID
```

## Notes

- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access (the deployment resource-name pattern).
- Deleting a version requires confirmation; try it in a disposable project first.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/version (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy.md](./deploy.md)
- [api-access.md](./api-access.md)
- [evaluation.md](./evaluation.md)
