---
source: https://docs.cloud.google.com/gemini/enterprise/docs/iam-policy-for-apps
---

# Manage app-level IAM policies for Gemini Enterprise apps

A Gemini Enterprise (formerly Agentspace) admin can use the API to manage fine-grained access control for individual apps. App-level IAM restricts users to specific apps within the same Google Cloud project, aligning permissions with organizational needs and data silos. In the API an app is an engine, so `getIamPolicy` and `setIamPolicy` are called on the engine resource (`v1`).

## Signature / Usage

### Get the app IAM policy

Fetch the existing policy first to avoid overwriting current permissions, and copy the `etag` value from the response.

```bash
curl -X GET \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID:getIamPolicy"
```

### Update the app IAM policy

Before you send this request, build the `policy` body from the full policy that `getIamPolicy` returned: keep every existing entry in `bindings` (with its `members` and any `condition`) and the returned `etag`, and add the new members to the `roles/discoveryengine.agentspaceUser` binding (or add that binding if it is missing). The example below shows only the binding being added; the source says "The `setIamPolicy` method replaces the existing policy. To avoid removing existing permissions, your request must include all the policy bindings you want to retain, in addition to any new or modified bindings."

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
-d '{
      "policy": {
         "etag": "ETAG",
         "bindings": [
          {
            "role": "roles/discoveryengine.agentspaceUser",
            "members": [
              "user:USER_EMAIL",
              "group:GROUP_EMAIL",
              "principal://iam.googleapis.com/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ID",
              "principalSet://iam.googleapis.com/locations/global/workloadIdentityPools/POOL_ID/attribute.NAME/VALUE"
            ]
          }
        ]
      }
    }' \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID:setIamPolicy"
```

### Transition a user from project-level to app-level access

1. In the Google Cloud console, on the **IAM** page, remove the Gemini Enterprise User (`roles/discoveryengine.agentspaceUser`) role from the user's project-level permissions.
2. If not already done, grant the user the Gemini Enterprise Restricted User (`roles/discoveryengine.agentspaceRestrictedUser`) role at the project level.
3. Use `setIamPolicy` to grant the user the Gemini Enterprise User role (`roles/discoveryengine.agentspaceUser`) on each app they need.

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | The ID of your project. |
| `ENDPOINT_LOCATION` | The multi-region for the API request: `us` (US multi-region), `eu` (EU multi-region) or `global` (Global location). For the `global` host form, see Notes. |
| `LOCATION` | The multi-region of your data store: `global`, `us` or `eu`. |
| `APP_ID` | The ID of the app that you want to configure. |
| `ETAG` | The `etag` value returned by `getIamPolicy`; it changes with each policy update, so fetch a new one before updating again. |
| `USER_EMAIL`, `GROUP_EMAIL` | One or more user or group email addresses; `principal` and `principalSet` are also valid member types for Workload Identity Federation. Avoid extra spaces before or after the address. |
| `POOL_ID` | The ID of your workload identity pool. |
| `SUBJECT_ID` | The subject identifier for a specific identity. |
| `NAME`, `VALUE` | The name and the value of an attribute. |

## Notes

- Before you begin: confirm that you have the Gemini Enterprise Admin (`roles/discoveryengine.agentspaceAdmin`) role, and that all Gemini Enterprise users have a valid license and are granted the Gemini Enterprise Restricted User (`roles/discoveryengine.agentspaceRestrictedUser`) role at the project level. That role doesn't grant access to any app on its own; you then grant Gemini Enterprise User (`roles/discoveryengine.agentspaceUser`) on individual apps with `setIamPolicy`. A custom project-level role used instead must include `discoveryengine.locations.buildAuthorizationUrl`, `discoveryengine.dataStores.get`, `discoveryengine.collections.get`, and `discoveryengine.devToolsConfigs.get`; omitting `discoveryengine.devToolsConfigs.get` causes a `403 PERMISSION_DENIED` error in Cloud Audit Logs when the web app checks `devToolsConfig`.
- Project-level IAM permissions take precedence over app-level policies: a user with the Gemini Enterprise User role at the project level can access all apps in that project regardless of app-level permissions. To restrict a user to specific apps, replace the project-level Gemini Enterprise User role with the Restricted User role and grant Gemini Enterprise User on each app.
- Users with app-level IAM permissions can access and use only that specific app; these are user-level permissions and do not include admin capabilities. Before you begin, all Gemini Enterprise users must have a valid license and the Restricted User role at the project level.
- The app-level grant is done through the API; the Google Cloud console does not support it (the project-level changes use the console).
- Key term: in Gemini Enterprise, app and engine are used interchangeably in APIs; a Gemini Enterprise engine is a generic search engine whose `app_type` field is `APP_TYPE_INTRANET`.
- `setIamPolicy` replaces the existing policy: the request must include all bindings you want to retain, in addition to new or modified ones. To revoke access, remove principals from the `members` array. Changes are subject to IAM propagation delay (it can take several minutes).
- Warning: sending the update example as written (only the `roles/discoveryengine.agentspaceUser` binding plus `etag`) removes every other binding on the app, so every other principal loses the access those bindings gave. Send the full policy from `getIamPolicy` with your members added; the `etag` only detects concurrent changes and does not preserve bindings.
- Member forms: the source's `principal` / `principalSet` members use `workloadIdentityPools` (Workload Identity Federation), whereas the share-agents page uses `workforcePools` for Workforce Identity Federation principals. The source's example result for `setIamPolicy` uses `roles/discoveryengine.user` rather than `roles/discoveryengine.agentspaceUser`; the example output blocks are omitted here.
- To delete an app that has an IAM policy, remove users from the policy first (see the best practices for deleting an app with an IAM policy on the delete-app page); try deletion in a disposable project first.
- For granular, resource-level access controls across both apps and data stores, see https://docs.cloud.google.com/gemini/enterprise/docs/iam-policy-for-apps-and-data-stores.
- This page covers Gemini Enterprise app-level IAM; general IAM concepts are in `gcp-foundation`.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/iam-policy-for-apps (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [share-custom-agents.md](./share-custom-agents.md)
- [register-and-manage-an-adk-agent.md](./register-and-manage-an-adk-agent.md)
