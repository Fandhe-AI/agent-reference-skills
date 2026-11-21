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

Restore is for going back to a previous version ("To restore or revert to a previous version"). Two separate rules apply:

- Automatic backup: only if the current application configuration has changes since the last version was saved does restoring first create an automatic system version (authored by `system@google.com`) that saves the unsaved work, so you can "revert a revert". Without unsaved changes, no automatic version is created.
- No-op: the source says "If there are no changes to the current application configuration, the restore is a no-op." It does not say what "no changes" is compared with, and it does not say that restoring an older, different version after you saved is a no-op (see Notes).

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

A `runSession` request selects the deployment with `config.deployment` in its JSON body (`POST https://ces.googleapis.com/v1/projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/sessions/SESSION_ID:runSession`):

Adapted (not in the official docs): removed `config.session`, which the `ces` REST request schema does not define (the URL path carries the session), and the trailing comma after the `deployment` field so the body is valid JSON.

```json
{
  "config": {
    "deployment": "projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/deployments/DEPLOYMENT_ID"
  },
  "inputs": [
    {
      "text": "hi"
    }
  ]
}
```

## Notes

- The source's restore paragraph is "If there are changes to the current application configuration since the last version was saved, restoring to a previous version first creates an automatic system version (authored by `system@google.com`) to save any unsaved work. This behavior lets you "revert a revert" if a mistake is made. If there are no changes to the current application configuration, the restore is a no-op." The last sentence is kept as written; the source does not define the comparison it refers to, and the page does not read it as preventing the restore of an older snapshot after saving.
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access (the deployment resource-name pattern and the `runSession` request body).
- Corrected from the official docs: the source's request body sets `"session"` inside `config` and ends the `deployment` line with a trailing comma, which is invalid JSON; `SessionConfig` in the `ces` Discovery document has no `session` field, and the URL path carries the session. Both were removed, as on the API access page.
- Deleting a version requires confirmation; try it in a disposable project first.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/version (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy.md](./deploy.md)
- [api-access.md](./api-access.md)
- [evaluation.md](./evaluation.md)
