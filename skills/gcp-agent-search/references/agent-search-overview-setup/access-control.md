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
- The Agent Search roles provide only Agent Search permissions, except for these Google Cloud permissions needed for general Google Cloud usage: `resourcemanager.projects.get`, `resourcemanager.projects.list`, `serviceusage.services.list`, `serviceusage.services.get`.
- To create an app and view its monitoring data you might need permissions not included in the predefined roles, for example `monitoring.timeSeries.list`; ask the project administrator to grant Monitoring Viewer (`roles/monitoring.viewer`) in addition to one of the roles above. (The Discovery Engine User role lists `monitoring.timeSeries.list` among its permissions in the source table.)
- Role hierarchy: the Editor role includes all permissions of the Viewer role plus its own; the Admin role includes all permissions of the Editor role plus its own.
- Basic roles (Owner, Editor, Viewer) provide access across Google Cloud rather than only Agent Search; the Agent Search roles provide only Agent Search permissions plus the four general permissions listed above in Notes. `roles/discoveryengine.admin` grants full access to all discoveryengine resources (and the source lists many additional permissions for it, for example `cloudaicompanion.*`, `cloudtrace.*`, `logging.*` and `monitoring.*` read permissions); grant it only where full control is needed.
- Principals can be individuals, groups or service accounts; you can grant multiple roles to one principal and change them at any time if you have the permissions to do so.
- The source table lists every permission of each predefined role (several hundred for Admin); they are not repeated here. The complete per-role permission lists are in the source and in the machine-generated IAM reference for `discoveryengine` (https://docs.cloud.google.com/iam/docs/roles-permissions/discoveryengine).
- You can get and set IAM allow policies and roles in the Google Cloud console ("Manage access to projects, folders, and organizations").
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/access-control (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [before-you-begin.md](./before-you-begin.md)
- [authentication.md](./authentication.md)
