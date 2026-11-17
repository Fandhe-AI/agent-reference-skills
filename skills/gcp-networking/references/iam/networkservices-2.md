---
source: https://docs.cloud.google.com/iam/docs/roles-permissions/networkservices
---

# Network Services IAM roles and permissions (part 2/2)

## Signature / Usage

Predefined roles of `networkservices` (role ID, description, included permissions) and, for each permission, the roles that contain it.

### Example: inspect a role that contains these permissions

Generated example (not in the official docs) describing the first predefined role listed in the table below:

```bash
gcloud iam roles describe roles/compute.networkAdmin
```

### Permissions and the roles that contain them (continued)

| Permission | Roles |
|---|---|
| `networkservices.serviceLbPolicies.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+9 service agent roles) |
| `networkservices.serviceLbPolicies.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `networkservices.swpSecurityExtensions.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+4 service agent roles) |
| `networkservices.swpSecurityExtensions.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+4 service agent roles) |
| `networkservices.swpSecurityExtensions.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/networkservices.serviceExtensionsAdmin`, `roles/networkservices.serviceExtensionsViewer` (+7 service agent roles) |
| `networkservices.swpSecurityExtensions.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/networkservices.serviceExtensionsAdmin`, `roles/networkservices.serviceExtensionsViewer` (+7 service agent roles) |
| `networkservices.swpSecurityExtensions.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+4 service agent roles) |
| `networkservices.tcpRoutes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `networkservices.tcpRoutes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `networkservices.tcpRoutes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+8 service agent roles) |
| `networkservices.tcpRoutes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+8 service agent roles) |
| `networkservices.tcpRoutes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+5 service agent roles) |
| `networkservices.tlsRoutes.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `networkservices.tlsRoutes.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `networkservices.tlsRoutes.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser` (+9 service agent roles) |
| `networkservices.tlsRoutes.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/wiz.cloudInventoryViewer` (+9 service agent roles) |
| `networkservices.tlsRoutes.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin` (+6 service agent roles) |
| `networkservices.wasmPlugins.create` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+5 service agent roles) |
| `networkservices.wasmPlugins.delete` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+5 service agent roles) |
| `networkservices.wasmPlugins.get` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/networkservices.serviceExtensionsAdmin`, `roles/networkservices.serviceExtensionsViewer` (+8 service agent roles) |
| `networkservices.wasmPlugins.list` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/reader`, `roles/viewer`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/compute.networkViewer`, `roles/iam.securityAdmin`, `roles/iam.securityReviewer`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/networkservices.viewer`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/iam.securityAuditor`, `roles/iam.supportUser`, `roles/networkservices.serviceExtensionsAdmin`, `roles/networkservices.serviceExtensionsViewer`, `roles/wiz.cloudInventoryViewer` (+8 service agent roles) |
| `networkservices.wasmPlugins.update` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+5 service agent roles) |
| `networkservices.wasmPlugins.use` | `roles/admin`, `roles/owner`, `roles/writer`, `roles/editor`, `roles/compute.networkAdmin`, `roles/compute.networkUser`, `roles/networkservices.admin`, `roles/networkservices.editor`, `roles/iam.infrastructureAdmin`, `roles/iam.networkAdmin`, `roles/networkservices.serviceExtensionsAdmin` (+6 service agent roles) |

## Notes

- Roles and permissions of the `networkservices` service from the IAM roles and permissions reference (retrieved 2026-11-14); role names, descriptions and permission lists are verbatim, regrouped per role. The `service.resource.*` group headings of the official page are omitted from the per-role lists and counts, because they are collapsible headings, not permissions.
- The permissions table lists role IDs only (role names and links are on the official page) and gives service agent roles as a count; service agent roles must not be granted to principals other than service agents.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/networkservices (CC BY 4.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
