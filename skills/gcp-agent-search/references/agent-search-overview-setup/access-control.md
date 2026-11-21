---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/access-control
---

# Access control with IAM

IAM roles and permissions that control Discovery Engine API access for Agent Search (formerly Vertex AI Search) resources: four predefined roles (Admin, Editor, User, Viewer), the older basic roles, and custom roles. Broader roles include the narrower ones.

## Signature / Usage

### Grant a role to a service account

Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (the twin for this page has no code block); `ROLE` is the role to grant, for example one of the predefined roles listed in Notes:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

## Notes

- Predefined roles (from the source role table): Discovery Engine Admin (`roles/discoveryengine.admin`) "Grants full access to all discoveryengine resources."; Discovery Engine Editor (`roles/discoveryengine.editor`) "Grants read and write access to all discovery engine resources."; Discovery Engine User (`roles/discoveryengine.user`) "Grants user-level access to Discovery Engine resources."; Discovery Engine Viewer (`roles/discoveryengine.viewer`) "Grants read access to all discovery engine resources."
- The source says: "The roles specific to Agent Search provide only Agent Search permissions, except for the following Google Cloud permissions, which are needed for general Google Cloud usage:" and lists `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.list` and `serviceusage.services.get`.
- Permissions outside `discoveryengine.*` that the source role table lists for each role (the table is the full list; these are not limited to the four permissions above):
  - Discovery Engine Admin (`roles/discoveryengine.admin`): `cloudaicompanion.*` permissions on settings, setting bindings, code repository indexes, repository groups and operations (for example `cloudaicompanion.loggingSettings.*`, `cloudaicompanion.repositoryGroups.setIamPolicy`), plus `cloudaicompanion.instances.queryEffectiveSetting` and `cloudaicompanion.instances.queryEffectiveSettingBindings`; `cloudnotifications.activities.list`; `cloudtrace.insights.*`, `cloudtrace.stats.get`, `cloudtrace.tasks.*`, `cloudtrace.traceScopes.*`, `cloudtrace.traces.get`, `cloudtrace.traces.list`; `consumerprocurement.entitlements.*`; `logging.*` get and list permissions (for example `logging.logEntries.list`, `logging.sinks.list`, `logging.views.getIamPolicy`) and `logging.queries.usePrivate`; `monitoring.*` get and list permissions (for example `monitoring.alertPolicies.list`, `monitoring.dashboards.get`, `monitoring.timeSeries.list`) and `monitoring.alerts.*`; `observability.scopes.get` and `observability.traceScopes.*`; `opsconfigmonitoring.resourceMetadata.list`; `resourcemanager.projects.get`, `resourcemanager.projects.list`; `stackdriver.projects.get`, `stackdriver.resourceMetadata.list`.
  - Discovery Engine Editor (`roles/discoveryengine.editor`): `resourcemanager.projects.get`, `resourcemanager.projects.list`.
  - Discovery Engine User (`roles/discoveryengine.user`): `businessaicode.*`; `cloudaicompanion.companions.*`, `cloudaicompanion.entitlements.get`, `cloudaicompanion.instances.*`, `cloudaicompanion.licenses.selfAssign`, `cloudaicompanion.operations.get`, `cloudaicompanion.topics.create`; `geminicloudassist.agents.invoke`; `monitoring.timeSeries.list`; `resourcemanager.projects.get`, `resourcemanager.projects.list`; `serviceusage.*` permissions including `serviceusage.services.get`, `serviceusage.services.list`, `serviceusage.services.use`, `serviceusage.quotas.get` and `serviceusage.groups.*`.
  - Discovery Engine Viewer (`roles/discoveryengine.viewer`): `resourcemanager.projects.get`, `resourcemanager.projects.list`.
- Source inconsistency: the sentence quoted above names four general permissions, while the same page's role table lists the additional permissions above (and lists `serviceusage.services.get` / `serviceusage.services.list` only for the User role). Both are kept as written; check the exact permissions of a role in the table or in the IAM roles reference before granting it.
- Monitoring: the source notes "To create an app and view its monitoring data, you might need permissions that are not included in the predefined Discovery Engine roles. For example, the `monitoring.timeSeries.list` permission is required. To get this permission, consider asking your project administrator to grant you the Monitoring Viewer (`roles/monitoring.viewer`) role in addition to one of the roles listed below." The role table lists `monitoring.timeSeries.list` for the Admin and User roles, so Monitoring Viewer is needed only when the role a principal already holds lacks the monitoring permissions it needs (for example Editor or Viewer, whose table rows list no `monitoring.*` permission).
- Role hierarchy: the Editor role includes all permissions of the Viewer role plus its own; the Admin role includes all permissions of the Editor role plus its own.
- Basic roles (Owner, Editor, Viewer) provide access across Google Cloud rather than only Agent Search; the Agent Search roles also include the permissions outside `discoveryengine.*` listed per role above. `roles/discoveryengine.admin` grants full access to all discoveryengine resources and includes the Cloud Trace, Logging, Monitoring and Gemini for Google Cloud (`cloudaicompanion`) permissions listed above; grant it only where full control is needed.
- Principals can be individuals, groups or service accounts; you can grant multiple roles to one principal and change them at any time if you have the permissions to do so.
- The source table lists every permission of each predefined role (several hundred for Admin); they are not repeated here. The complete per-role permission lists are in the source and in the machine-generated IAM reference for `discoveryengine` (https://docs.cloud.google.com/iam/docs/roles-permissions/discoveryengine).
- You can get and set IAM allow policies and roles in the Google Cloud console ("Manage access to projects, folders, and organizations").
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/access-control (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [before-you-begin.md](./before-you-begin.md)
- [authentication.md](./authentication.md)
