---
source: https://docs.cloud.google.com/config-connector/docs/concepts/managing-conflicts
---

# Managing conflicts with multiple Config Connector resources

Describes how Config Connector handles conflicts when the same Google Cloud resource is managed by more than one Config Connector resource, using namespace-scoped leases and the conflict prevention annotation.

## Signature / Usage

Manifest for the default `ComputeNetwork` with conflict prevention set to `none` (the default):

```yaml
apiVersion: compute.cnrm.cloud.google.com/v1beta1
kind: ComputeNetwork
metadata:
 annotations:
   cnrm.cloud.google.com/management-conflict-prevention-policy: "none"
   cnrm.cloud.google.com/project-id: "PROJECT-ID"
   cnrm.cloud.google.com/deletion-policy: "abandon"
 name: default
spec:
 description: Default network for the project
```

## Options / Props

| Annotation / label | Values | Description |
|--------------------|--------|-------------|
| `cnrm.cloud.google.com/management-conflict-prevention-policy` | `resource`, `none` (default `none`) | `resource`: conflicts are prevented at the resource level by saving lease labels into the resource. `none`: conflicts are not prevented. |
| `cnrm-lease-holder-id` (label) | unique ID per namespace | Generated per namespace that manages a resource with conflict prevention enabled. The namespace-to-ID mapping is in the `namespace-id` ConfigMap in the `cnrm-system` namespace. |
| `cnrm-lease-expiration` (label) | Unix epoch time | Lease expiration. |

| Lease rule | Value |
|------------|-------|
| Config Connector may update the lease labels if | `cnrm-lease-holder-id` matches the namespace's ID, or is empty or missing, or `cnrm-lease-expiration` is in the past |
| Initial expiration | 40 minutes in the future |
| Extension | by 40 minutes when less than 20 minutes remain |
| Failure status | `kubectl describe` shows Status `ManagementConflict` |

## Notes

- Config Connector manages or acquires resources by mapping the Kubernetes resource name, the container annotation and, if applicable, the region or location. A resource created without an annotation is created in the project that shares the resource's namespace.
- Two Config Connector resources in different namespaces managing the same Google Cloud resource is possible but not recommended; Config Connector manages the resource only if it obtains a lease and conflict prevention is enabled.
- Limitations: conflict prevention does not work for resources that do not support labels (even after changing `none` to `resource`); with `resourceID` you can create multiple resources with the same Google Cloud name in the same namespace, and these conflicts cannot be managed.
- The example sets `deletion-policy: "abandon"`, so deleting the Kubernetes object leaves the Google Cloud network in place.
- Source: https://docs.cloud.google.com/config-connector/docs/concepts/managing-conflicts (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-fields-externally.md](./managing-fields-externally.md)
- [reconciliation.md](./reconciliation.md)
