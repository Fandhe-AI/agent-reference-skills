---
source: https://docs.cloud.google.com/iap/docs/managing-access
---

# Manage access to IAP-secured resources

Manage individual or group access to Identity-Aware Proxy (IAP) secured resources at the resource level, with the console, the IAP API (IAM `getIamPolicy` / `setIamPolicy` per resource), IAM deny policies and public-access principals. Project-level and higher access is managed on the IAM page; principals listed at the project level apply to all IAP-secured resources in the project.

## Signature / Usage

### Call the IAM API for an IAP resource

Build a URL path to the resource. This example gets the IAM policy for an App Engine app service version.

```text
https://iap.googleapis.com/v1/projects/PROJECT_NUMBER/iap_web/
appengine-APP_ID/services/SERVICE_ID/versions/VERSION_ID:getIamPolicy
```

### IAM deny policy for IAP permissions

Deny `getSettings` to a principal at an organization and its descendants by listing every granular permission:

Adapted (not in the official docs): the source JSON has a trailing comma after the last `deniedPermissions` item (invalid JSON); it is removed.

```json
{
  "name": "policies/cloudresourcemanager.googleapis.com%2Forganizations%2F253519172624/denypolicies/testpolicyid",
  "uid": "06ccd2eb-d2a5-5dd1-a746-eaf4c6g3f816",
  "kind": "DenyPolicy",
  "displayName": "Only project admins can delete projects.",
  "etag": "MTc1MTkzMjY0MjUyMTExODMxMDQ=",
  "createTime": "2021-09-07T23:15:35.258319Z",
  "updateTime": "2021-09-07T23:15:35.258319Z",
  "rules": [
    {
      "denyRule": {
        "deniedPrincipals": [
          "principalSet://goog/public:all"
        ],
        "deniedPermissions": [
          "iap.googleapis.com/iap.organizations.getSettings",
          "iap.googleapis.com/iap.folders.getSettings",
          "iap.googleapis.com/iap.projects.getSettings",
          "iap.googleapis.com/iap.web.getSettings",
          "iap.googleapis.com/iap.webTypes.getSettings",
          "iap.googleapis.com/iap.webServices.getSettings",
          "iap.googleapis.com/iap.webServicesVersions.getSettings"
        ]
      }
    }
  ]
}
```

The same with the single wildcard permission `*.getSettings`:

Adapted (not in the official docs): the trailing comma after the last `deniedPermissions` item is removed.

```json
{
  "name": "policies/cloudresourcemanager.googleapis.com%2Forganizations%2F253519172624/denypolicies/testpolicyid",
  "uid": "06ccd2eb-d2a5-5dd1-a746-eaf4c6g3f816",
  "kind": "DenyPolicy",
  "displayName": "Only project admins can delete projects.",
  "etag": "MTc1MTkzMjY0MjUyMTExODMxMDQ=",
  "createTime": "2021-09-07T23:15:35.258319Z",
  "updateTime": "2021-09-07T23:15:35.258319Z",
  "rules": [
    {
      "denyRule": {
        "deniedPrincipals": [
          "principalSet://goog/public:all"
        ],
        "deniedPermissions": [
          "iap.googleapis.com/*.getSettings"
        ]
      }
    }
  ]
}
```

## Options / Props

### Permissions to turn IAP on and off

| App type | Permission required |
|----------|---------------------|
| App Engine | `appengine.applications.update` |
| Compute Engine, Google Kubernetes Engine, or Cloud Run | `compute.backendServices.update` |

### IAP roles

| Role | Includes permission(s) | Description |
|------|------------------------|-------------|
| IAP-Secured Web App User (`roles/iap.httpsResourceAccessor`) | `iap.webServiceVersions.accessViaIAP` | Grants access to App Engine and Compute Engine resources |
| IAP-Secured Tunnel User (`roles/iap.tunnelResourceAccessor`) | `iap.tunnelInstances.accessViaIAP`, `iap.tunnelDestGroups.accessViaIAP` | Grants access to VM instances secured by IAP |
| IAP Policy Admin (`roles/iap.admin`) | `iap.web.getIamPolicy`, `iap.web.setIamPolicy`, `iap.webTypes.getIamPolicy`, `iap.webTypes.setIamPolicy`, `iap.webServices.getIamPolicy`, `iap.webServices.setIamPolicy`, `iap.webServiceVersions.getIamPolicy`, `iap.webServiceVersions.setIamPolicy`, `iap.tunnel.getIamPolicy`, `iap.tunnel.setIamPolicy`, `iap.tunnelZones.getIamPolicy`, `iap.tunnelZones.setIamPolicy`, `iap.tunnelInstances.getIamPolicy`, `iap.tunnelInstances.setIamPolicy` | Grants IAP administrative rights to manage IAP access policies of resources |

### Permissions to call the IAM API

| Resource type | Path (after `projects/PROJECT_NUMBER/`) | Permissions |
|---------------|-------------------------------------------|-------------|
| Every IAP-secured web app in the project (**All Web Services**) | `iap_web` | `iap.web.getIamPolicy`, `iap.web.setIamPolicy` |
| Every backend service in the project (**Backend Service**) | Global: `iap_web/compute`; regional: `iap_web/compute-REGION_NAME` | `iap.webTypes.getIamPolicy`, `iap.webTypes.setIamPolicy` |
| Every forwarding rule in the project | Global: `iap_web/forwarding_rule`; regional: `iap_web/forwarding_rule-REGION_NAME` | `iap.webTypes.getIamPolicy`, `iap.webTypes.setIamPolicy` |
| A region for every Cloud Run service in the project | `iap_web/cloud_run-REGION_NAME` | `iap.webTypes.getIamPolicy`, `iap.webTypes.setIamPolicy` |
| A Cloud Run service (all Cloud Run services are regional) | `iap_web/cloud_run-REGION_NAME/services/SERVICE_NAME` | `iap.webServices.getIamPolicy`, `iap.webServices.setIamPolicy` |
| An App Engine app (**App Engine app** checkbox) | `iap_web/appengine-APP_ID` | `iap.webTypes.getIamPolicy`, `iap.webTypes.setIamPolicy` |
| A Compute Engine backend service (ID or name) | Global: `iap_web/compute/services/BACKEND_SERVICE_ID or BACKEND_SERVICE_NAME`; regional: `iap_web/compute-REGION_NAME/services/BACKEND_SERVICE_ID or BACKEND_SERVICE_NAME` | `iap.webServices.getIamPolicy`, `iap.webServices.setIamPolicy` |
| A Compute Engine forwarding rule (ID or name) | Global: `iap_web/forwarding_rule/services/FORWARDING_RULE_ID or FORWARDING_RULE_NAME`; regional: `iap_web/forwarding_rule-REGION_NAME/services/FORWARDING_RULE_ID or FORWARDING_RULE_NAME` | `iap.webServices.getIamPolicy`, `iap.webServices.setIamPolicy` |
| An App Engine app service | `iap_web/appengine-APP_ID/services/APP_SERVICE_ID` | `iap.webServices.getIamPolicy`, `iap.webServices.setIamPolicy` |
| An App Engine service version (Compute Engine doesn't support versioning) | `iap_web/appengine-APP_ID/services/APP_SERVICE_ID/versions/VERSION_ID` | `iap.webServiceVersions.getIamPolicy`, `iap.webServiceVersions.setIamPolicy` |
| Every IAP-secured VM instance in the project (**All Tunnel Resources**) | `iap_tunnel` | `iap.tunnel.getIamPolicy`, `iap.tunnel.setIamPolicy` |
| A zone with at least one VM instance, for example `us-central1-c` | `iap_tunnel/zones/ZONE_NAME` | `iap.tunnelZones.getIamPolicy`, `iap.tunnelZones.setIamPolicy` |
| An individual VM instance | `iap_tunnel/zones/ZONE_NAME/instances/INSTANCE_ID or INSTANCE_NAME` | `iap.tunnelInstances.getIamPolicy`, `iap.tunnelInstances.setIamPolicy` |
| A region with at least one destination group, for example `us-central1` | `iap_tunnel/locations/REGION_NAME` | `iap.tunnelLocations.getIamPolicy`, `iap.tunnelLocations.setIamPolicy` |
| An individual destination group | `iap_tunnel/locations/REGION_NAME/destGroups/GROUP_NAME` | `iap.tunnelDestGroups.getIamPolicy`, `iap.tunnelDestGroups.setIamPolicy` |

### Simpler deny-policy permissions

| Admin action | Permission in deny policy |
|--------------|---------------------------|
| Deny specific IAP permissions on all IAP resource types | `*.updateSettings`, `*.getSettings`, `*.setIamPolicy`, `*.getIamPolicy` |
| Deny all IAP permissions at a specific resource type | `iap.organizations.*`, `iap.folders.*`, `iap.projects.*`, `iap.web.*`, `iap.webTypes.*`, `iap.webServices.*`, `iap.webServicesVersions.*` |

## Notes

- Permissions to turn IAP on and off: Roles such as Project Editor, App Engine Admin and Compute Network Admin grant these, but not the permissions to modify access policies. Turning IAP on with the console might also require `clientauthconfig.clients.create`, `clientauthconfig.clients.update` and `clientauthconfig.clients.getWithSecret` (granted by Project Editor).
- IAP roles: Console role choices: **Owner** (same access as IAP Policy Admin; use IAP Policy Admin instead, it only modifies policies and doesn't grant access to the app), **IAP Policy Admin**, **IAP-Secured Web App User**, **Security Reviewer** (view and audit IAP policies). A user granted **IAP Policy Admin** at the **All Web Services** level only has permissions to IAP policies. **All Web Services** secures all resources in the project; **Backend Services** secures all backend services.
- Permissions to call the IAM API: `iap.webServiceVersions.accessViaIAP` grants user access to an app; for SSH and RDP administrative access users need `iap.tunnelInstances.accessViaIAP`. Each IAP resource has its own `getIamPolicy` and `setIamPolicy` permission. All paths start with `https://iap.googleapis.com/v1/projects/PROJECT_NUMBER/`.
- IAM permissions granted at a level apply to all levels underneath; project-level and higher access is managed on the IAM admin page but displayed on the IAP admin page.
- Deny policies: deny policies can include all IAP permissions (see "Permissions supported in deny policies", search `iap.googleapis.com`), but their effectiveness is tied to the deny policy attachment point. Some IAP permissions are effective only at their own resource level and not on descendants (for example `iap.organizations.getSettings`), so list all relevant granular permissions to deny at an attachment point and its descendants. All permissions under FQDN `iap.googleapis.com` and the resource types `iap.organizations`, `iap.folders`, `iap.projects`, `iap.web`, `iap.webTypes`, `iap.webServices`, `iap.webServicesVersions` are granular permissions.
- The deny examples use `principalSet://goog/public:all` (every principal), so they would block `getSettings` for everyone including administrators; they are illustrative and should be tried on a disposable resource first. The `displayName` text is copied unchanged from the source.
- Public access: grant a role to `allAuthenticatedUsers` (anyone authenticated with a Google account or service account) or `allUsers` (anyone on the internet, authenticated or not; the signed header has no `sub` or `email` claim). Both allow everything for the granted role and are for deliberately public resources only. With public access granted, IAP won't generate Cloud Audit Logs for the request. Bindings that grant public access can't have a condition; for example, a policy allowing anyone when the request path starts with `/public/` is invalid.
- Console steps (add or remove access from the **Info panel** of the IAP page) are in the source and omitted here.
- When reading and writing a policy through the API, keep the `etag` from `getIamPolicy` in the `setIamPolicy` body, and request policy version 3 if the policy has conditional bindings.
- Corrected from the official docs: trailing commas after the last `deniedPermissions` entry in both JSON deny policy examples were removed (the source examples are not valid JSON).
- Source: https://docs.cloud.google.com/iap/docs/managing-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-overview.md](./concepts-overview.md)
- [cloud-iap-context-aware-access-howto.md](./cloud-iap-context-aware-access-howto.md)
- [enabling-app-engine.md](./enabling-app-engine.md)
- [enabling-compute-howto.md](./enabling-compute-howto.md)
