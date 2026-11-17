---
source: https://docs.cloud.google.com/iap/docs/enabling-kubernetes-howto
---

# Enabling IAP for GKE

Secure GKE workloads served by an HTTPS load balancer with Identity-Aware Proxy through Ingress. IAP is configured by adding an `iap` block to a `BackendConfig` and associating it with a Service port. GKE clusters on version 1.24 or later can configure IAP with the Kubernetes Gateway API instead (do not configure `BackendConfig` in that case).

## Signature / Usage

### Add an `iap` block to the BackendConfig

You need the `compute.backendServices.update` permission. Use `cloud.google.com/v1` for GKE 1.16.8-gke.3 and higher and `cloud.google.com/v1beta1` for earlier versions.

```yaml
apiVersion: cloud.google.com/v1
kind: BackendConfig
metadata:
  name: CONFIG_DEFAULT
  namespace: my-namespace
spec:
  iap:
    enabled: true
```

### Associate Service ports with the BackendConfig

Associating Service ports triggers turning on IAP. One way is to make all ports of the Service default to the BackendConfig with this annotation on the Service:

```yaml
metadata:
  annotations:
    cloud.google.com/backend-config: '{"default": "CONFIG_DEFAULT"}'
```

### Verify the BackendConfig

```bash
kubectl get event
```

### Verify that the backend service exists

```bash
gcloud compute backend-services list
```

## Options / Props

### Prerequisites

| Requirement | Detail |
|-------------|--------|
| Project | Google Cloud project with billing enabled |
| Cluster | GKE workloads served by an HTTPS load balancer, created automatically with an Ingress object |
| Domain | A domain name registered to the load balancer address |
| Application code | Verifies that all requests have an identity |

### BackendConfig notes

| Item | Behavior |
|------|----------|
| `iap.enabled` | Must be specified |
| Missing `iap` block | Existing IAP settings on the backend service are inherited |
| IAP and Cloud CDN | Can't both be enabled in one BackendConfig |
| Turning IAP off | Set `enabled` to `false`; deleting the `iap` block leaves the settings in place, so IAP stays on |
| Event message `no BackendConfig for service port exists` | The port is associated but the BackendConfig resource wasn't found (not created, wrong namespace, or misspelled annotation) |

## Notes

- BackendConfig is supported from Kubernetes version 1.10.5-gke.3; it is a custom resource definition from the `kubernetes/ingress-gce` repository and holds Cloud Load Balancing configuration per backend service.
- IAP adds the `gcp-iap-mode=AUTHENTICATING` query parameter to the redirected request after OAuth authentication; check the ingress load balancer routing configuration so redirected requests reach the correct backend service.
- An `Add firewall rule` warning on the IAP page for NEG-based backends can appear even when the correct firewall rule exists; the source says it is informational and can be ignored.
- IAP uses a Google-managed OAuth client; only users within the organization can access the application. For external users see the custom OAuth page.
- Grant the **IAP-secured Web App User** role (Google Account, Google Group, service account, or Google Workspace domain principals) and make sure to add a Google Account you have access to. The source also shows the Console steps; they are omitted here. If the OAuth consent screen is not configured you are prompted to do so.
- On GKE, users who can reach the application-serving port of the VM can bypass IAP authentication; see the IAP concepts page for your responsibilities.
- GKE-side Ingress, Gateway API and BackendConfig details are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/iap/docs/enabling-kubernetes-howto (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-overview.md](./concepts-overview.md)
- [custom-oauth-configuration.md](./custom-oauth-configuration.md)
- [managing-access.md](./managing-access.md)
