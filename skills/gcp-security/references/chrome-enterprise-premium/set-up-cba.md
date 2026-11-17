---
source: https://docs.cloud.google.com/access-context-manager/docs/set-up-cba
---

# Quickstart: Set up certificate-based access

Context-Aware Access with mTLS, also known as certificate-based access (CBA), is set up in three parts: create a CBA access level, enforce it on resources, and enable CBA in client applications. Deploy the Endpoint Verification Chrome extension and helper app on all devices that need access (CBA for workload or web applications does not require Endpoint Verification).

## Signature / Usage

### Create a CBA access level

Step 1 creates a CBA access level (https://docs.cloud.google.com/access-context-manager/docs/create-cba-access-levels) that requires certificates. Example from the web applications CBA guide (custom access level; the YAML file contains the `certIsPkiAttested(...)` or `certificateBindingState(...)` expression):

```bash
gcloud access-context-manager levels create ACCESS_LEVEL_NAME \
    --title=TITLE \
    --custom-level-spec=FILE \
    --description=DESCRIPTION \
    --policy=POLICY_NAME
```

## Options / Props

### Ways to enforce the CBA access level

| Target | Method | Detail page |
|---|---|---|
| VPC Service Controls-supported services | Create a perimeter with the CBA access level, then add services | Enable certificate-based access with VPC Service Controls (https://docs.cloud.google.com/access-context-manager/docs/enable-cba-vpcsc) |
| All Google Cloud services including the console | Bind the access level to a user group | Enable certificate-based access with user groups (https://docs.cloud.google.com/access-context-manager/docs/enable-cba-user-groups) |
| VMs | Restrict access to the VM | Enable certificate-based access for VMs (https://docs.cloud.google.com/access-context-manager/docs/enable-cba-vms) |
| Web applications | See the web applications page | [enable-cba-web-apps.md](./enable-cba-web-apps.md) |
| All Google Cloud services from workloads | Workload Identity Federation | Configure certificate-based access for Workload Identity Federation (https://docs.cloud.google.com/access-context-manager/docs/configure-cba-for-workloads) |

## Notes

- After CBA is enforced, Context-Aware Access denies access to resources without client certificates. This is disruptive: clients must send certificates to Google APIs through an mTLS connection (enable CBA in a CBA-compatible client, https://docs.cloud.google.com/access-context-manager/docs/enable-cba-client-apps). Try it on a disposable resource or a limited group first.
- Deploying Endpoint Verification for CBA: https://docs.cloud.google.com/chrome-enterprise-premium/docs/deploy-cba-endpoint-verification.
- Snippet taken from https://docs.cloud.google.com/access-context-manager/docs/enable-cba-web-apps
- Source: https://docs.cloud.google.com/access-context-manager/docs/set-up-cba (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [securing-resources-with-certificate-based-access.md](./securing-resources-with-certificate-based-access.md)
- [enable-cba-web-apps.md](./enable-cba-web-apps.md)
- [endpoint-verification-overview.md](./endpoint-verification-overview.md)
