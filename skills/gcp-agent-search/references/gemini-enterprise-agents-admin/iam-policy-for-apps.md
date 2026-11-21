---
source: https://docs.cloud.google.com/gemini/enterprise/docs/iam-policy-for-apps
---

# Manage app-level IAM policies for Gemini Enterprise apps

A Gemini Enterprise (formerly Agentspace) admin can use the API to manage fine-grained access control for individual apps. App-level IAM restricts users to specific apps within the same Google Cloud project, aligning permissions with organizational needs and data silos. In the API an app is an engine, so `getIamPolicy` and `setIamPolicy` are called on the engine resource (`v1`).

## Signature / Usage

### Get the app IAM policy

Fetch the existing policy first to avoid overwriting current permissions, and copy the `etag` value from the response.

Adapted (not in the official docs): the request adds the query parameter `options.requestedPolicyVersion=3` (`engines.getIamPolicy` in the `discoveryengine` `v1` Discovery document: "Requests for policies with any conditional role bindings must specify version 3."), so that bindings with a `condition` are returned in a form that can be written back. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X GET \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID:getIamPolicy?options.requestedPolicyVersion=3" )
```

### Update the app IAM policy

`setIamPolicy` replaces the whole policy. The source says "The `setIamPolicy` method replaces the existing policy. To avoid removing existing permissions, your request must include all the policy bindings you want to retain, in addition to any new or modified bindings." Edit the policy that `getIamPolicy` returned: keep every existing entry in `bindings` (with its `members` and any `condition`) and the returned `etag`; if the policy has any binding with a `condition`, also keep `"version": 3`. Add the new members to the `roles/discoveryengine.agentspaceUser` binding that has no `condition` (or to the binding whose `condition` is the one you intend for them); if no such binding exists, add a new binding. Do not add members to a binding of the same role that has a different `condition`, because that condition would then apply to them:

Adapted (not in the official docs): the binding is shown as a fragment to merge into the retrieved policy instead of inside the request, and the Workload Identity Federation members include `projects/PROJECT_NUMBER/`, which the principal identifier format for workload identity pools requires.

```json
{
  "role": "roles/discoveryengine.agentspaceUser",
  "members": [
    "user:USER_EMAIL",
    "group:GROUP_EMAIL",
    "principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ID",
    "principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.NAME/VALUE"
  ]
}
```

Save the edited policy as `{"policy": EDITED_POLICY}` in `policy.json` and send it:

Adapted (not in the official docs): the request body is read from `policy.json` (the full edited policy) instead of an inline body that contains only the new binding. Also, the access token is read into `TOKEN` first (nothing is sent if `gcloud` fails or prints nothing) and passed with `-H @<(printf ...)`, so it is not in curl's arguments. `--fail-with-body` makes an HTTP 4xx/5xx response exit non-zero. `set +a` turns off `set -a` (allexport) inherited from your shell, so values assigned in the subshell are not exported to `curl` and the other commands. `-q` comes first so that curl does not read `.curlrc`, whose `trace` option could write the request headers to a file. The whole command runs in a subshell that starts with `set +x`, so shell tracing (`set -x`) does not print the token, and `TOKEN` does not stay in your shell. `unset` at its start also drops an `export` of the variables it sets in your shell, so their new values are not put in the environment of `curl` and the other commands it runs.

```bash
( set +x; set +a; unset TOKEN; TOKEN=$(gcloud auth print-access-token) && [ -n "$TOKEN" ] &&
curl -q --fail-with-body -X POST \
-H @<(printf 'Authorization: Bearer %s\n' "$TOKEN") \
-H "Content-Type: application/json" \
-d @policy.json \
"https://ENDPOINT_LOCATION-discoveryengine.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/collections/default_collection/engines/APP_ID:setIamPolicy" )
```

### Transition a user from project-level to app-level access

1. If not already done, in the Google Cloud console, on the **IAM** page, grant the user the Gemini Enterprise Restricted User (`roles/discoveryengine.agentspaceRestrictedUser`) role at the project level.
2. Use `setIamPolicy` to grant the user the Gemini Enterprise User role (`roles/discoveryengine.agentspaceUser`) on each app they need.
3. Before removing anything, confirm the grants: on the **IAM** page, check that the user has the Restricted User role at the project level, and for each app run the `getIamPolicy` request above and check that the user (or a group they belong to) is in the `members` of the `roles/discoveryengine.agentspaceUser` binding and that any `condition` on that binding covers the user. Opening an app at this point does not prove the app-level grant, because the project-level role still gives access.
4. On the **IAM** page, remove the Gemini Enterprise User (`roles/discoveryengine.agentspaceUser`) role from the user's project-level permissions. Also look for a project-level binding of that role that reaches the user another way, for example through a group (changing a group's binding affects all its members).
5. Wait for the change to propagate (IAM changes can take several minutes, see Notes). Then, signed in as the user, check both that each app they need opens and that an app outside their grants does not. If it still opens, the access can come from that app's own policy (for example a grant to a group the user is in; check its `getIamPolicy`) or from a project-level role, which "take[s] precedence over app-level policies" (for example through a group). Check both before changing anything, and check the effect on the other members before you change a shared group or project grant.

## Options / Props

| Placeholder | Description |
|---|---|
| `PROJECT_ID` | The ID of your project. |
| `ENDPOINT_LOCATION` | The multi-region for the API request: `us` (US multi-region), `eu` (EU multi-region) or `global` (Global location). For the `global` host form, see Notes. |
| `LOCATION` | The multi-region of your data store: `global`, `us` or `eu`. |
| `APP_ID` | The ID of the app that you want to configure. |
| `ETAG` | The `etag` value returned by `getIamPolicy`; it changes with each policy update, so fetch a new one before updating again. |
| `USER_EMAIL`, `GROUP_EMAIL` | One or more user or group email addresses; `principal` and `principalSet` are also valid member types for Workload Identity Federation. Avoid extra spaces before or after the address. |
| `PROJECT_NUMBER` | The number of the project that owns the workload identity pool (added; see Notes). |
| `POOL_ID` | The ID of your workload identity pool. |
| `SUBJECT_ID` | The subject identifier for a specific identity. |
| `NAME`, `VALUE` | The name and the value of an attribute. |

## Notes

- Before you begin: confirm that you have the Gemini Enterprise Admin (`roles/discoveryengine.agentspaceAdmin`) role, and that all Gemini Enterprise users have a valid license and are granted the Gemini Enterprise Restricted User (`roles/discoveryengine.agentspaceRestrictedUser`) role at the project level. That role doesn't grant access to any app on its own; you then grant Gemini Enterprise User (`roles/discoveryengine.agentspaceUser`) on individual apps with `setIamPolicy`. A custom project-level role used instead must include `discoveryengine.locations.buildAuthorizationUrl`, `discoveryengine.dataStores.get`, `discoveryengine.collections.get`, and `discoveryengine.devToolsConfigs.get`; omitting `discoveryengine.devToolsConfigs.get` causes a `403 PERMISSION_DENIED` error in Cloud Audit Logs when the web app checks `devToolsConfig`.
- Project-level IAM permissions take precedence over app-level policies: a user with the Gemini Enterprise User role at the project level can access all apps in that project regardless of app-level permissions. To restrict a user to specific apps, replace the project-level Gemini Enterprise User role with the Restricted User role and grant Gemini Enterprise User on each app (in the order of the steps under "Transition a user from project-level to app-level access": grant and confirm first, remove the project-level role last).
- Users with app-level IAM permissions can access and use only that specific app; these are user-level permissions and do not include admin capabilities. Before you begin, all Gemini Enterprise users must have a valid license and the Restricted User role at the project level.
- The app-level grant is done through the API; the Google Cloud console does not support it (the project-level changes use the console).
- Key term: in Gemini Enterprise, app and engine are used interchangeably in APIs; a Gemini Enterprise engine is a generic search engine whose `app_type` field is `APP_TYPE_INTRANET`.
- `setIamPolicy` replaces the existing policy: the request must include all bindings you want to retain, in addition to new or modified ones. To revoke access, remove principals from the `members` array. Changes are subject to IAM propagation delay (it can take several minutes).
- Corrected from the official docs: the update example sent `-d '{"policy": {"etag": "ETAG", "bindings": [{"role": "roles/discoveryengine.agentspaceUser", "members": [...]}]}}'`, a policy with only the new binding; sent as written it removes every other binding on the app. The page shows the binding as a fragment to merge and sends the full edited policy from `policy.json`. `ETAG` is the `etag` of the retrieved policy, which detects concurrent changes; it does not keep the other bindings.
- Corrected from the official docs: the get example requests `.../engines/APP_ID:getIamPolicy` without a policy version. The `discoveryengine` `v1` Discovery document says for `options.requestedPolicyVersion`: "Requests for policies with any conditional role bindings must specify version 3."; the request adds `?options.requestedPolicyVersion=3`, and a policy with conditional bindings is written back with `"version": 3` and the returned `etag`.
- Corrected from the official docs: the members were `principal://iam.googleapis.com/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ID` and `principalSet://iam.googleapis.com/locations/global/workloadIdentityPools/POOL_ID/attribute.NAME/VALUE`; the IAM principal identifier formats are `principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT_ATTRIBUTE_VALUE` and `principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE` (https://docs.cloud.google.com/iam/docs/principal-identifiers; details in `gcp-foundation`).
- Member forms: the source's `principal` / `principalSet` members use `workloadIdentityPools` (Workload Identity Federation), whereas the share-agents page uses `workforcePools` for Workforce Identity Federation principals. The source's example result for `setIamPolicy` uses `roles/discoveryengine.user` rather than `roles/discoveryengine.agentspaceUser`; the example output blocks are omitted here.
- To delete an app that has an IAM policy, remove users from the policy first (see the best practices for deleting an app with an IAM policy on the delete-app page); try deletion in a disposable project first.
- For granular, resource-level access controls across both apps and data stores, see https://docs.cloud.google.com/gemini/enterprise/docs/iam-policy-for-apps-and-data-stores.
- This page covers Gemini Enterprise app-level IAM; general IAM concepts are in `gcp-foundation`.
- Source inconsistency (global host): for `ENDPOINT_LOCATION` = `global`, the Gemini Enterprise pages on app IAM policies and ADK / A2A agent registration show example commands with `https://global-discoveryengine.googleapis.com/...`, while the streamAssist page says "If your app resides in the `global` location, omit the location prefix from the hostname (`discoveryengine.googleapis.com`)." The `discoveryengine` `v1` / `v1beta` / `v1alpha` Discovery documents give the `rootUrl` `https://discoveryengine.googleapis.com/`. Both forms are kept as written. `ENDPOINT_LOCATION` (or the `LOCATION` prefix of the host) sets only the hostname; the `locations/...` segment of the resource path is a separate value.
- Adapted from the official docs: the source's transition steps remove the project-level role first ("Find the user and remove the Gemini Enterprise User (`roles/discoveryengine.agentspaceUser`) role from their project-level permissions."), then grant the Restricted User role and the app-level role. The steps here grant and confirm the new roles first and remove the project-level role last, so a failed `setIamPolicy` call does not cut the user off; until then the project-level role still opens every app (project-level permissions take precedence). After the removal, the steps check access to both an allowed app and an app outside the grants.
- Corrected from the official docs: the source's `-H "Authorization: Bearer $(gcloud auth print-access-token)"` puts the token in curl's process arguments; the examples read it into `TOKEN` and pass it as a header file (`man curl` 8.7.1, `-H`: "This option can take an argument in @filename style" ... "Added in 7.55.0."; `printf` is a shell builtin, `<(...)` needs bash or zsh). `--fail-with-body` (curl 7.76.0 or later) is added so that an HTTP 4xx/5xx response exits non-zero. The command runs in a subshell that starts with `set +x`, so `set -x` tracing does not print the token, and `TOKEN` does not stay in the calling shell. `unset` at its start also drops an `export` of the variables it sets in the calling shell, so their values are not put in the environment of `curl` and the other commands.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/iam-policy-for-apps (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: every `curl` call starts with `-q`, because the curl manual says for `-q, --disable` "If used as the first parameter on the command line, the curlrc config file is not read or used." (`man curl`, curl 8.7.1); without it, a `trace` or `trace-ascii` line in `.curlrc` writes the request headers, including the token or API key, to a file (checked with curl 8.7.1 against a local 127.0.0.1 server).
- Adapted from the official docs: the subshell starts with `set +a` because it inherits `set -a` from the calling shell. With it on, in bash "Each variable or function that is created or modified is given the export attribute and marked for export to the environment of subsequent commands." (`man bash`, GNU bash 5.3.9), and in zsh "All parameters subsequently defined are automatically exported." (`ALL_EXPORT`, `man zshoptions`, zsh 5.9), so `TOKEN`, `API_KEY` or `BODY` would reach the environment of `curl` and `jq`.

## Related

- [share-custom-agents.md](./share-custom-agents.md)
- [register-and-manage-an-adk-agent.md](./register-and-manage-an-adk-agent.md)
