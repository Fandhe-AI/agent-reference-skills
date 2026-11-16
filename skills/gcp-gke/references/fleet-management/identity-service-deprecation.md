---
source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/identity-service
---

# Identity Service for GKE deprecation

Deprecation and shutdown of Identity Service for GKE on GKE clusters running on Google Cloud, with timeline, upgrade blocking and migration to Workforce Identity Federation. The GKE Identity Service in the Connect gateway and in Google Distributed Cloud (software only) is not deprecated.

## Signature / Usage

Disable Identity Service for GKE (needed before upgrading to 1.37 or later), after migrating RBAC bindings and testing:

```bash
gcloud container clusters update CLUSTER_NAME \
    --no-enable-identity-service
```

Migration steps:

1. Set up Workforce Identity Federation for your organization and external IdP.
2. Update RoleBinding and ClusterRoleBinding manifests to the Workforce Identity Federation identifier syntax, programmatically with the `gke-identity-service-migrator` tool (`GoogleCloudPlatform/gke-utilities` repository) or manually by copying each binding's manifest.
3. Apply the updated manifests.
4. Test that users can access the same resources through Workforce Identity Federation.
5. Remove the obsolete RBAC bindings.
6. Disable Identity Service for GKE.

## Options / Props

Timeline:

| Date | Milestone |
|---|---|
| July 1, 2025 | Not supported in Google Cloud organizations created on or after this date |
| July 1, 2026 | Deprecated in version 1.36 and earlier; those versions can use it until the minor version's end of support date. Not supported in 1.37 and later; clusters using it cannot be upgraded to 1.37 or later |

Principal syntax:

| Identity Service for GKE | Workforce Identity Federation |
|---|---|
| `amal@example.com` | `principal://iam.googleapis.com/locations/global/workforcePools/full-time-employees/subject/amal@example.com` |
| `sre-group` | `principalSet://iam.googleapis.com/locations/global/workforcePools/full-time-employees/group/sre-group` |

## Notes

- GKE blocks automatic and manual upgrades to 1.37 or later for clusters using it. Automatic upgrades stay paused until end of standard support (end of extended support on the Extended channel); then GKE upgrades the cluster, and if the service is still enabled, authentication workflows fail.
- Workforce Identity Federation supports multiple protocols, installs no cluster components and integrates with IAM.
- Disabling is disruptive for users who authenticate through it; keep the old bindings until the test step passes and try it on a disposable cluster first.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/identity-service (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gke-identity-service.md](./gke-identity-service.md)
- [connect-gateway.md](./connect-gateway.md)
