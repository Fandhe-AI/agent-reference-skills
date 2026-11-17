---
source: https://docs.cloud.google.com/chrome-enterprise-premium/docs/security-gateway-private-web-apps
---

# Secure access to private web applications

A Chrome Enterprise Premium secure gateway is a forward proxy that enforces zero trust, context-aware access to private web applications. A client-side browser configuration sends traffic for those apps to the gateway proxy endpoint; the gateway applies the access policy and, if permitted, routes the request to the app (in a Google Cloud VPC network, or in on-premises / other clouds reached over Cloud VPN or Cloud Interconnect). If no access policy is configured, access to the application is denied by default.

## Signature / Usage

### Create a secure gateway

```bash
gcloud beyondcorp security-gateways create SECURITY_GATEWAY_ID \
    --project=PROJECT_ID \
    --location=global \
    --display-name="SECURITY_GATEWAY_DISPLAY_NAME" \
    --service-discovery={}
```

### Grant permissions to the delegating service account

```bash
gcloud beyondcorp security-gateways describe SECURITY_GATEWAY_ID \
    --project=PROJECT_ID \
    --location=global
```

```bash
DELEGATING_SERVICE_ACCOUNT=`gcloud beyondcorp security-gateways describe SECURITY_GATEWAY_ID --project=PROJECT_ID --location=global --format="value(delegatingServiceAccount)"`
```

```bash
gcloud projects add-iam-policy-binding PRIVATE_VPC_PROJECT_ID \
    --role=roles/beyondcorp.upstreamAccess \
    --member=serviceAccount:DELEGATING_SERVICE_ACCOUNT
```

### Firewall rule for apps in Google Cloud

```bash
gcloud compute firewall-rules create FIREWALL_RULE_NAME \
   --project=PRIVATE_VPC_PROJECT_ID \
   --network=NETWORK_NAME \
   --allow=tcp \
   --source-ranges=136.124.16.0/20
```

### Check that Cloud Router advertises the gateway range

```bash
gcloud compute routers list-bgp-routes ROUTER_NAME \
--peer=PEER_NAME \
--region=REGION \
--project=PROJECT_ID \
--route-direction=OUTBOUND \
--address-family=IPV4 \
--destination-range=136.124.16.0/20
```

### Create an application resource

```bash
gcloud beyondcorp security-gateways applications create APPLICATION_ID \
    --project=PROJECT_ID \
    --security-gateway=SECURITY_GATEWAY_ID \
    --location=global \
    --display-name="APP_DISPLAY_NAME" \
    --endpoint-matchers="hostname=HOST_NAME,ports=[443]" \
    --upstreams=network=name="PRIVATE_NETWORK_RESOURCE_NAME"
```

With an egress region (for static routes), add `egressPolicy` to `--upstreams`:

```bash
gcloud beyondcorp security-gateways applications create APPLICATION_ID \
    --project=PROJECT_ID \
    --security-gateway=SECURITY_GATEWAY_ID \
    --location=global \
    --display-name="APP_DISPLAY_NAME" \
    --endpoint-matchers="hostname=HOST_NAME,ports=[443]" \
    --upstreams=network=name="PRIVATE_NETWORK_RESOURCE_NAME",egressPolicy=regions=us-central1
```

### Access policy (gcloud bindings)

Gateway-level Service Discovery binding, then an application-level binding:

```bash
gcloud beyondcorp security-gateways add-iam-policy-binding SECURITY_GATEWAY_ID \
    --project=PROJECT_ID \
    --location=global \
    --role="roles/beyondcorp.serviceDiscoveryUser" \
    --member=MEMBER
```

```bash
gcloud beyondcorp security-gateways applications add-iam-policy-binding APPLICATION_ID \
    --security-gateway=SECURITY_GATEWAY_ID \
    --project=PROJECT_ID \
    --location=global \
    --role="roles/beyondcorp.sgApplicationUser" \
    --member=MEMBER
```

Conditional binding (grants access only if the access level is satisfied):

```bash
gcloud beyondcorp security-gateways applications add-iam-policy-binding APPLICATION_ID \
    --security-gateway=SECURITY_GATEWAY_ID \
    --project=PROJECT_ID \
    --location=global \
    --role="roles/beyondcorp.sgApplicationUser" \
    --member=MEMBER \
    --condition="expression='accessPolicies/1234567890/accessLevels/in_us' in request.auth.access_levels,title=Source IP must be in US"
```

### Require a managed Chrome profile (custom access level condition)

```text
device.chrome.management_state == ChromeManagementState.CHROME_MANAGEMENT_STATE_PROFILE_MANAGED
```

### Chrome extension policy (Admin console)

Force-install the Secure Enterprise Browser extension for all users, ID:

```text
ekajlcmdfcigmdbphhifahdfjbkciflj
```

Policy for extensions:

```json
{
  "securityGateway": {
    "Value": {
      "authentication": {},
      "context": { "resource": "projects/PROJECT_ID/locations/global/securityGateways/SECURITY_GATEWAY_ID" },
      "serviceDiscovery": { "routes": {} }
    }
  }
}
```

### Legacy PAC file setup (gateways without service discovery)

Check whether service discovery is enabled (no output means a legacy setup):

```bash
gcloud beyondcorp security-gateways describe SECURITY_GATEWAY_ID \
    --project=PROJECT_ID \
    --location=global | grep -i "serviceDiscovery"
```

`pac_config.js` (replace `HOST_NAME`):

```javascript
function FindProxyForURL(url, host) {
  const PROXY = "HTTPS via.prod.securegateway.goog:443";
  const sites = ["HOST_NAME"];

  for (const site of sites) {
    if (shExpMatch(url, 'https://' + site + '/*') || shExpMatch(url, '*.' + site + '/*')) {
      return PROXY;
    }
  }
  return 'DIRECT';
}
```

Transition to service discovery:

```bash
gcloud beyondcorp security-gateways update SECURITY_GATEWAY_ID \
--project=PROJECT_ID \
--location=global \
--service-discovery={}
```

## Options / Props

### Required roles

| Role | ID | Purpose |
|---|---|---|
| Cloud BeyondCorp Admin | `roles/beyondcorp.admin` | Set up Chrome Enterprise Premium on the project |
| Access Context Manager Admin | `roles/accesscontextmanager.policyAdmin` | Read and add access levels |
| Service Usage Viewer | `roles/serviceusage.serviceUsageViewer` | Use the Google Cloud console |
| Cloud BeyondCorp upstream access | `roles/beyondcorp.upstreamAccess` | Granted to the gateway's delegating service account on the private VPC project |
| Service discovery user | `roles/beyondcorp.serviceDiscoveryUser` | Per-user, on the gateway |
| Gateway application user | `roles/beyondcorp.sgApplicationUser` | Per-user or group, on the application |

### Prerequisites and required Chrome policies

| Item | Requirement |
|---|---|
| License | Chrome Enterprise Premium license |
| Admin | Google Admin console administrator account; additional Google services without individual control turned on; Google Cloud service turned on for users |
| Project | Billing account assigned; BeyondCorp API enabled |
| Hybrid apps | Cloud VPN or Cloud Interconnect between Google Cloud and the other environment |
| `AuthSchemes` | Must include `basic` (default when unset). In Chrome 157 and later, if `basic` is removed, set `AllHttpAuthSchemesAllowedForProxies` to include the gateway proxy endpoints (for example `via.prod.securegateway.goog:443`) |
| `BasicAuthOverHttpEnabled` | Must be `0` (false) to disallow Basic auth over non-secure HTTP |

### Gateway and network values

| Item | Value |
|---|---|
| Secure gateway ID | Up to 63 characters; lowercase letters, numbers, hyphens; first character a letter, last a letter or number |
| Display name | Up to 63 characters, printable characters |
| Secure gateway IP range | `136.124.16.0/20` (allow ingress TCP; return path from non-Google Cloud networks) |
| IAM propagation | About two minutes after granting a role |
| Dynamic routing | Set the VPC dynamic routing mode to Global; the Cloud Router must explicitly advertise the gateway range to on-premises BGP |
| Static routing | Add static routes for the range on on-premises equipment; Cloud VPN static routes are regional, so use dynamic routing or an egress policy in the VPN / Interconnect region |

### Supported Cloud VPN regions for static routing

| Group | Regions |
|---|---|
| Africa, Asia | `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3` |
| Australia | `australia-southeast2` |
| Europe | `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9` |
| Middle East | `me-central1`, `me-central2`, `me-west1` |
| Americas | `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8` |

## Notes

- Private DNS: the gateway resolves hostnames through the VPC's Cloud DNS. Use Cloud DNS private zones on the VPC, or forwarding zones (https://docs.cloud.google.com/dns/docs/zones/forwarding-zones) for on-premises / other-cloud DNS.
- The application's domain matchers allow wildcards (`*`) in the format `domain:port` (Console), for example `github.com:443`.
- Source inconsistency: the REST policy-editing steps say to add the group to the `roles/beyondcorp.securityGatewayUser` role, while the example policy JSON and the gcloud commands use `roles/beyondcorp.sgApplicationUser`. The gcloud commands are kept as written.
- REST alternative: `getIamPolicy` on the application (or gateway) saves `policy.json`, then `setIamPolicy` writes it back. `setIamPolicy` replaces the whole policy; keep the returned `etag` in the file so concurrent changes by other administrators are rejected instead of overwritten.
- The first command stores the delegating service account's email in the shell variable `DELEGATING_SERVICE_ACCOUNT`; in `--member=serviceAccount:DELEGATING_SERVICE_ACCOUNT` put that email (the value of `$DELEGATING_SERVICE_ACCOUNT`).
- Granting `roles/beyondcorp.upstreamAccess` is on the private VPC project (project level, as the source shows). It is for the gateway's delegating service account only; do not grant it to workloads.
- Firewall rule `--allow=tcp` with source range `136.124.16.0/20` allows all TCP ports from the gateway range; narrow it to the app's ports with the `tcp:PORT` form that the `gcloud compute firewall-rules create` help shows (for example `--allow=tcp:8080`).
- The legacy PAC file must be publicly downloadable and served with `Cache-Control: no-cache` (for example from a Cloud Storage bucket); a public bucket is readable by anyone, so keep only routing rules in it. After transition, remove the PAC URL from the Admin console proxy mode.
- Transition steps: enable service discovery on the gateway, set the gateway-level `roles/beyondcorp.serviceDiscoveryUser` binding, update the extension policy to include `"serviceDiscovery": { "routes": {} }` (the legacy policy omits that block), then remove the PAC file.
- Managed-profile condition requires the Endpoint Verification extension (https://docs.cloud.google.com/endpoint-verification/docs/deploying-with-admin-console); attributes: https://docs.cloud.google.com/access-context-manager/docs/browser-attributes.
- End users get `Access denied` when the authorization policy rejects the browser request. The extension must be installed for traffic to reach the gateway.
- Dropped to fit: Console steps, all REST forms (gateway create, `describe`, application create with `application.json`, the `getIamPolicy` / `setIamPolicy` policy files including the conditional policy, and the legacy / transition calls), `remove-iam-policy-binding` commands, and the second extension-policy JSON for legacy setups (identical to the one above without the `serviceDiscovery` block). See the `gcp-networking` skill for Cloud VPN / Interconnect / Cloud DNS, and the `gcp-foundation` skill for IAM.
- Source: https://docs.cloud.google.com/chrome-enterprise-premium/docs/security-gateway-private-web-apps (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [access-protection.md](./access-protection.md)
- [endpoint-verification-overview.md](./endpoint-verification-overview.md)
