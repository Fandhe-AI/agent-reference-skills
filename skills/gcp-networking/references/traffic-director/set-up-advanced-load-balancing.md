---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-advanced-load-balancing
---

# Set up advanced load balancing

Set up service load balancing policies for Cloud Service Mesh backend services: auto capacity drain, the spray-to-region and waterfall-by-zone algorithms, preferred backends and the failover health threshold. For users with an intermediate understanding of Cloud Service Mesh and load balancing. Supports Google Cloud APIs only, not Istio APIs.

## Signature / Usage

### Before you begin

```bash
gcloud components update
```

Create a backend service (or choose an existing one):

```bash
gcloud compute backend-services create hello-world-backend-service \
    --global \
    --protocol=HTTP \
    --health-checks hello-world-health-check \
    --load-balancing-scheme=INTERNAL_SELF_MANAGED
```

### Create a service load balancing policy from YAML

Adapted (not in the official docs): `${project-id}` in the YAML is not expanded by anything, so it is the upper-case placeholder `PROJECT_ID`.

```yaml
name: projects/PROJECT_ID/locations/global/serviceLbPolicies/hello-world-lb-policy
autoCapacityDrain:
  enable: True
```

```bash
gcloud network-services service-lb-policies import hello-world-lb-policy \
   --source=hello-world-lb-policy.yaml \
   --location=global
```

Associate the policy with a backend service:

```bash
gcloud compute backend-services update hello-world-backend-service \
  --service-lb-policy hello-world-lb-policy \
  --global
```

Or when creating the backend service:

```bash
gcloud compute backend-services create hello-world-backend-service \
    --global \
    --protocol=HTTP \
    --health-checks hello-world-health-check \
    --load-balancing-scheme=INTERNAL_SELF_MANAGED \
    --service-lb-policy hello-world-lb-policy
```

### Spray-to-region (spreads traffic to all zones in a region)

Adapted (not in the official docs): `${project-id}` in the YAML is not expanded by anything, so it is the upper-case placeholder `PROJECT_ID`.

```yaml
name: projects/PROJECT_ID/locations/global/serviceLbPolicies/hello-world-lb-policy
loadBalancingAlgorithm: SPRAY_TO_REGION
```

```bash
gcloud network-services service-lb-policies create hello-world-lb-policy \
    --load-balancing-algorithm=SPRAY_TO_REGION \
    --location=global
```

### Waterfall-by-zone (local zone first, then spill to other zones)

Adapted (not in the official docs): `${project-id}` in the YAML is not expanded by anything, so it is the upper-case placeholder `PROJECT_ID`.

```yaml
name: projects/PROJECT_ID/locations/global/serviceLbPolicies/hello-world-lb-policy
loadBalancingAlgorithm: WATERFALL_BY_ZONE
```

```bash
gcloud network-services service-lb-policies create hello-world-lb-policy \
    --load-balancing-algorithm=WATERFALL_BY_ZONE \
    --location=global
```

### Preferred backends

Backend service fragment (elisions are in the source):

```text
name: projects/${project-id}/locations/global/backendServices/hello-world-service
...
backends:
...
  preference: PREFERRED
```

```text
gcloud compute backend-services add-backend BACKEND_SERVICE_NAME \
      [...]
      --preference=PREFERRED \
      --global
```

```text
gcloud compute backend-services update-backend BACKEND_SERVICE_NAME \
      [...]
      --preference=PREFERRED
```

### Auto capacity drain

Drains a backend automatically based on its health.

```bash
gcloud network-services service-lb-policies create capacity-drain-policy \
    --auto-capacity-drain \
    --location=global
```

### Customize failover behavior

Replace `VALUE` with a value between 1 and 99 (default 50 for proxyless gRPC, 70 for Envoy).

Adapted (not in the official docs): the source fragment starts with a bare path line instead of `name:`; the `name:` key and `PROJECT_ID` are added so the YAML parses.

```yaml
name: projects/PROJECT_ID/locations/global/serviceLbPolicies/hello-world-lb-policy
failoverConfig:
  failoverHealthThreshold: VALUE
```

```bash
gcloud network-services service-lb-policies create failover-health-threshold--policy \
   --failover-health-threshold=VALUE \
   --location=global
```

## Options / Props

| Setting | Values / default |
|---------|------------------|
| `loadBalancingAlgorithm` | `SPRAY_TO_REGION`, `WATERFALL_BY_ZONE` |
| `autoCapacityDrain.enable` | `True` enables automatic draining based on health |
| `failoverConfig.failoverHealthThreshold` | 1 to 99; default 50 (proxyless gRPC), 70 (Envoy) |
| Backend `preference` | `PREFERRED`, `DEFAULT` |

## Notes

- Corrected from the official docs: `name: projects/${project-id}/locations/global/serviceLbPolicies/hello-world-lb-policy` in the policy YAML examples was changed to `PROJECT_ID`; the failover fragment started with the bare line `projects/${project-id}/locations/global/serviceLbPolicies/hello-world-lb-policy` without a `name:` key. The preferred-backends fragments keep the source's `${project-id}`, `...` and `[...]` elisions as `text`.
- The source's second preferred-backends example (`MIG1` / `MIG2` / `MIG3`) is an unparseable outline and is not reproduced; set `preference` on each backend with `add-backend` / `update-backend`.
- These instructions cover only the backend service; the deployment also needs a health check, firewall rules and backends. Associating a policy changes traffic distribution; try it on a disposable backend service first.
- The full `gcloud compute backend-services` flag list is in the `gcp-compute` skill; see https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/create.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-advanced-load-balancing (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [advanced-traffic-management.md](./advanced-traffic-management.md)
- [features.md](./features.md)
- [limitations.md](./limitations.md)
