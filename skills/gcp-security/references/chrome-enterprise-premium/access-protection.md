---
source: https://docs.cloud.google.com/chrome-enterprise-premium/docs/access-protection
---

# Chrome Enterprise Premium access protection overview

Based on the BeyondCorp security model, Chrome Enterprise Premium enforces granular access control by user identity and request context. It implements a zero trust model: nobody can access a resource unless they meet all rules and conditions, and controls sit on individual devices and users rather than at the network level. Identity-Aware Proxy (IAP) is its base for HTTPS apps and resources.

## Signature / Usage

### Access level applied through an IAM condition

Access levels are enforced through IAM Conditions on role bindings. Example policy from the secure gateway guide that grants a role only if the request satisfies an access level (`accessPolicies/1234567890/accessLevels/in_us` is a sample access level):

Adapted (not in the official docs): the access-level check uses the `in` operator instead of `.contains(...)`.

```json
{
  "version": 3,
  "bindings": [
    {
      "role": "roles/beyondcorp.sgApplicationUser",
      "members": [
        "group:group@example.com"
      ],
      "condition": {
        "expression": "'accessPolicies/1234567890/accessLevels/in_us' in request.auth.access_levels",
        "title": "Source IP must be in US"
      }
    }
  ],
  "etag": "BwXN8_d-bOM="
}
```

## Options / Props

### Four Google Cloud offerings it builds on

| Offering | Role |
|---|---|
| Identity-Aware Proxy (IAP) | Lets employees reach corporate apps and resources from untrusted networks without a VPN |
| Identity and Access Management (IAM) | Identity management and authorization for Google Cloud |
| Access Context Manager | Rules engine for fine-grained access control |
| Endpoint Verification | Chrome extension that collects user device details |

### Access level attributes

| Attribute | Notes |
|---|---|
| IP subnetworks | |
| Regions | |
| Principals | |
| Device policy | Device-based access levels reference the device inventory created by Endpoint Verification (for example, only encrypted devices) |

## Notes

- Example policies: all employees on a trusted corporate device from the corporate network; Remote Access group members on a trusted device with a secure password and up-to-date patch level from any network; administrators to the Google Cloud console (UI or API) only from the corporate network; developers SSH access to VMs.
- Endpoint Verification is enabled through the Google Admin console and deployed as a Chrome extension to corporate devices; employees can also install it on managed personal devices. It continuously syncs with Google Workspace.
- IAM Conditions are specified in the IAP role bindings of a resource's IAM policy. When a condition exists, the role is granted only if the expression evaluates to true. Access levels can be combined with other conditions, for example restricting to 9am-5pm.
- Chrome Enterprise Premium can also be applied to Google Workspace apps (Workspace overview: https://support.google.com/a/answer/9275380).
- Snippet taken from https://docs.cloud.google.com/chrome-enterprise-premium/docs/security-gateway-private-web-apps
- Corrected from the official docs: the condition used `request.auth.access_levels.contains('...')`. `request.auth.access_levels` is a list of strings, and list membership in IAM Conditions is written `'accessPolicies/.../accessLevels/...' in request.auth.access_levels`, the form used on the other IAP and Chrome Enterprise Premium pages.
- Source: https://docs.cloud.google.com/chrome-enterprise-premium/docs/access-protection (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [security-gateway-private-web-apps.md](./security-gateway-private-web-apps.md)
- [endpoint-verification-overview.md](./endpoint-verification-overview.md)
- [creating-device-access-level.md](./creating-device-access-level.md)
