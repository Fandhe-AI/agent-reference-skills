---
source: https://docs.cloud.google.com/iap/docs/enabling-compute-howto
---

# Enable IAP for Compute Engine

Secure Compute Engine instances behind a load balancer with Identity-Aware Proxy. IAP can be enabled on a backend service (only that backend service is protected) or on a forwarding rule (all instances behind the forwarding rule are protected). IAP uses a Google-managed OAuth client by default, so only users within the organization can access the application.

## Signature / Usage

### Enable IAP on a backend service (gcloud)

Run either the global or the regional command. After enabling, modify the IAP access policy with the role `roles/iap.httpsResourceAccessor`.

```bash
gcloud config set project PROJECT_ID
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME --global --iap=enabled
```

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME --region REGION_NAME --iap=enabled
```

### Enable IAP on a backend service (API)

```bash
cat << EOF > settings.json
{
"iap":
  {
    "enabled":true
  }
}
EOF
```

Adapted (not in the official docs): the source URL has `/PROJECT_ID/REGION/backendServices/...`, which is not a Compute Engine path; the Discovery document uses `projects/{project}/regions/{region}/backendServices/{backendService}` for a regional backend service, so `regions/` is added before `REGION`.

```bash
curl -X PATCH \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d @settings.json \
"https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/backendServices/BACKEND_SERVICE_NAME"
```

### Enable IAP on a forwarding rule (gcloud)

Uses the load balancer authorization policies framework. The policy below applies to clients in the IP range `10.0.0.0/24`.

```bash
cat << EOF > policy.yaml
action: CUSTOM
description: authz policy with Cloud IAP
name: AUTHZ_POLICY_NAME
httpRules:
  - from:
      sources:
      - ipBlocks:
        - prefix: "10.0.0.0"
          length: 24
customProvider:
  cloudIap: {}
target:
  loadBalancingScheme: EXTERNAL_MANAGED
  resources:
  - https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/LOCATION/forwardingRules/FORWARDING_RULE_ID
EOF
```

```bash
gcloud network-security authz-policies import AUTHZ_POLICY_NAME \
--source=policy.yaml \
--location=LOCATION \
--project=PROJECT_ID
```

### Enable IAP on a forwarding rule (API)

Adapted (not in the official docs): the source JSON has a trailing comma after the `resources` array (invalid JSON), and the Discovery document requires `name` in the form `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`; both are fixed.

```bash
cat << EOF > policy.json
{
 "name": "projects/PROJECT_ID/locations/LOCATION/authzPolicies/AUTHZ_POLICY_NAME",
 "target": {
     "loadBalancingScheme": "INTERNAL_MANAGED",
     "resources": [
       "https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/LOCATION/forwardingRules/FORWARDING_RULE_ID"
     ]
 },
 "action": "CUSTOM",
 "httpRules": [
     {
       "from": {
         "sources": {
           "ipBlocks": [
             {
               "prefix": "10.0.0.0",
               "length": 24
             }
           ]
         }
       }
     }
 ],
 "customProvider": {
     "cloudIap": {}
 }
}
EOF
```

Adapted (not in the official docs): the source sends `PATCH` to the `authzPolicies` collection with `\\` line continuations; creating a policy in the Discovery document is `POST v1/{+parent}/authzPolicies` with the `authzPolicyId` query parameter, and the continuations are single backslashes.

```bash
curl -X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-d @policy.json \
"https://networksecurity.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/authzPolicies?authzPolicyId=AUTHZ_POLICY_NAME"
```

## Options / Props

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| Project | Google Cloud project with billing enabled |
| Compute | One or more Compute Engine instances served by a load balancer (external HTTPS or internal HTTP) |
| Domain | A domain name registered to the load balancer address |
| Application code | Verifies that all requests have an identity (see "Getting the user's identity") |

### Permissions to turn IAP on (console)

| Permission | Note |
|------------|------|
| `compute.backendServices.update` | Required |
| `clientauthconfig.clients.create` | Required |
| `clientauthconfig.clients.update` | Required |
| `clientauthconfig.clients.getWithSecret` | Required |

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `PROJECT_ID` | Google Cloud project ID |
| `LOCATION` | Region the resource is in |
| `FORWARDING_RULE_ID` | ID of the forwarding rule resource |
| `AUTHZ_POLICY_NAME` | Name of the authorization policy |

## Notes

- Permissions to turn IAP on (console): These permissions are granted by roles such as Project Editor. At least one protocol in the load balancer frontend configuration must be HTTPS.
- Source inconsistency: this page's console instructions say "The Google-managed OAuth client is not available when enabling IAP using the Google Cloud console" and that you are prompted to configure the OAuth consent screen if it isn't configured, while the Google-managed OAuth client page (`managed-oauth-client.md` in this category) describes turning IAP on from the console (IAP page, **Applications** tab) with the Google-managed client. Check the IAP page in the console before creating custom OAuth credentials; custom credentials are needed for users outside the organization, projects outside an organization, or custom branding (`custom-oauth-configuration.md`). To allow users outside the organization see the custom OAuth page.
- Console flow in the source: grant the **IAP-secured Web App User** role (principals: Google Account, Google Group, service account, Google Workspace domain) and click the IAP toggle; after turning IAP on, all connections to the load balancer require login and only accounts with the role on the project get access. Make sure to add a Google Account you have access to. The source also shows the console steps and `gcloud auth login`; they are omitted here.
- For GKE 1.24 or later, IAP can be configured with the Kubernetes Gateway API instead of `BackendConfig`.
- After enabling IAP on a forwarding rule, apply permissions to resources as described in the IAP authorization policies page.
- Corrected from the official docs: `curl -X PATCH \\` with `"https://networksecurity.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/authzPolicies"` (a `PATCH` on the collection; the Discovery document defines `create` as `POST v1/{+parent}/authzPolicies` with `authzPolicyId`, while `patch` needs the policy name in the path and an `updateMask`), the trailing comma in `],` after the `resources` array, `"name": "AUTHZ_POLICY_NAME"` (the Discovery format is `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`), and the compute path `.../projects/PROJECT_ID/REGION/backendServices/...` were fixed as stated before each block. For a global backend service the Discovery path is `projects/{project}/global/backendServices/{backendService}`.
- Source inconsistency: the forwarding-rule API example uses `"loadBalancingScheme": "INTERNAL_MANAGED"` while the gcloud example uses `loadBalancingScheme: EXTERNAL_MANAGED`. Both are enum values in the Discovery document (`INTERNAL_MANAGED`: regional internal or cross-region internal Application Load Balancing; `EXTERNAL_MANAGED`: global external or regional external Application Load Balancing); use the one that matches the load balancer.
- The full flag list of `gcloud compute backend-services update` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/update) is in the `gcp-compute` skill; load balancer authorization policies (`gcloud network-security authz-policies`) are covered with the load balancers in the `gcp-load-balancing` skill.
- Source: https://docs.cloud.google.com/iap/docs/enabling-compute-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-overview.md](./concepts-overview.md)
- [managing-access.md](./managing-access.md)
- [custom-oauth-configuration.md](./custom-oauth-configuration.md)
- [managed-oauth-client.md](./managed-oauth-client.md)
