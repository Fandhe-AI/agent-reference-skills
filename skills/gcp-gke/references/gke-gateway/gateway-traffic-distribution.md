---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources
---

# Gateway traffic distribution, session affinity and autoscaling policies

Backend-selection Policies for GKE Gateway: custom-metrics backend selection and traffic-based autoscaling with GCPBackendPolicy, and endpoint-level routing and session affinity with GCPTrafficDistributionPolicy (recommended over GCPBackendPolicy session affinity).

## Signature / Usage

### Custom-metrics backend selection (GKE 1.33+)

Save as `my-backend-policy.yaml`, then `kubectl apply -f my-backend-policy.yaml`.

```yaml
kind: GCPBackendPolicy
apiVersion: networking.gke.io/v1
metadata:
  name: my-backend-policy
  namespace: team-awesome
spec:
  # Attach to the super-service Service.
  targetRef:
    kind: Service
    name: super-service
  default:
    backends:
    # Configuration for all locations.
    - location: "*"
      # Use the rate balancing mode for the load balancer.
      balancingMode: RATE
      # Maximum number of requests per second for each endpoint.
      maxRatePerEndpoint: 9000
    # Configuration for us-central1-a
    - location: us-central1-a
      # maxRatePerEndpoint: 9000 inherited from the * configuration.
      # Use the custom metrics balancing mode for the load balancer.
      balancingMode: CUSTOM_METRICS
      # Configure the custom metrics for the load balancer to use.
      customMetrics:
      - name: gpu-load
        maxUtilizationPercent: 100 # value ranges from 0 to 100 and maps to the floating point range [0.0, 1.0]
        dryRun: false
```

### Endpoint-level routing with GCPTrafficDistributionPolicy

```yaml
apiVersion: networking.gke.io/v1
kind: GCPTrafficDistributionPolicy
metadata:
  name: echoserver-v2
  namespace: team1
spec:
  targetRefs:
  # Attach to the echoserver-v2 Service in the cluster.
  - kind: Service
    group: ""
    name: echoserver-v2
  default:
    # Use custom metrics to distribute traffic across endpoints.
    localityLbAlgorithm: WEIGHTED_ROUND_ROBIN
    # Configure metrics from an ORCA load report to use for traffic
    # distribution.
    customMetrics:
    - name: orca.named_metrics.bescm11
      dryRun: false
    - name: orca.named_metrics.bescm12
      dryRun: true
```

Adapted (not in the official docs): the `targetRefs` list item was indented inconsistently (`-   group` followed by a 4-space `kind`), which is invalid YAML; indentation fixed.

```yaml
apiVersion: networking.gke.io/v1
kind: GCPTrafficDistributionPolicy
metadata:
  name: ring-hash-policy
  namespace: default
spec:
  default:
    localityLbAlgorithm: RING_HASH
    # Defaults to 1024. Larger ring sizes result in more granular
    # load distributions. Supported range is 1 to 2048.
    minimumHashRingSize: 1024
  targetRefs:
  - group: ""
    kind: Service
    name: my-cache-heavy-service
```

### Session affinity with GCPTrafficDistributionPolicy (recommended)

Save a manifest as `policy.yaml` and run `kubectl apply -f policy.yaml`.

```yaml
apiVersion: networking.gke.io/v1
kind: GCPTrafficDistributionPolicy
metadata:
  name: strong-cookie-affinity-policy
  namespace: default
spec:
  default:
    sessionAffinity:
      type: STRONG_COOKIE_AFFINITY
      cookie:
        name: "GKE_STATEFUL_SESSION"
        path: "/"
        ttl: "24h"
  targetRefs:
  - group: ""
    kind: Service
    name: my-stateful-service
```

```yaml
apiVersion: networking.gke.io/v1
kind: GCPTrafficDistributionPolicy
metadata:
  name: header-affinity-policy
  namespace: default
spec:
  default:
    sessionAffinity:
      type: HEADER_FIELD
      httpHeaderName: "X-User-Group-ID"
    localityLbAlgorithm: MAGLEV
  targetRefs:
  - group: ""
    kind: Service
    name: SERVICE_NAME
```

Replace `SERVICE_NAME` with the target Service. Other types change `type` and its fields as listed in the Session affinity types table below: remove `httpHeaderName` (it belongs to `HEADER_FIELD` only); `CLIENT_IP` takes no extra fields; `HTTP_COOKIE` requires `cookie.name`; `GENERATED_COOKIE` accepts only `cookie.ttl`. `HTTP_COOKIE`, `GENERATED_COOKIE`, `HEADER_FIELD` and `CLIENT_IP` all require `localityLbAlgorithm: MAGLEV` or `RING_HASH`; only `STRONG_COOKIE_AFFINITY` accepts any algorithm.

```bash
kubectl describe gcptrafficdistributionpolicy POLICY_NAME
```

### Session affinity with GCPBackendPolicy (existing configurations)

```yaml
apiVersion: networking.gke.io/v1
kind: GCPBackendPolicy
metadata:
  name: my-backend-policy
  namespace: lb-service-namespace
spec:
  default:
    # On a best-effort basis, send requests from a specific client IP address
    # to the same backend. This field also sets the load balancer locality
    # policy to MAGLEV. For more information, see
    # https://docs.cloud.google.com/load-balancing/docs/backend-service#lb-locality-policy
    sessionAffinity:
      type: CLIENT_IP
  targetRef:
    group: ""
    kind: Service
    name: lb-service
```

### Traffic-based autoscaling for a single-cluster Gateway (GKE 1.31.1-gke.2008000+)

```yaml
apiVersion: networking.gke.io/v1
kind: GCPBackendPolicy
metadata:
  name: store
spec:
  default:
    maxRatePerEndpoint: 10
  targetRef:
    group: ""
    kind: Service
    name: store
```

## Options / Props

### Limits

| Setting | Value |
| --- | --- |
| `minimumHashRingSize` | Default 1024; range 1 to 2048 |
| `customMetrics[].maxUtilization` | Range [0, 100] |
| `GENERATED_COOKIE` ttl | Up to two weeks (`336h`); cookie `GCLB` (global external) or `GCILB` (regional); path `/` |

### Session affinity types (GCPTrafficDistributionPolicy)

| Type | Minimum GKE version | Notes |
| --- | --- | --- |
| `STRONG_COOKIE_AFFINITY` | 1.36.3-gke.1767000 | Requires `cookie.name`; optional `cookie.path`, `cookie.ttl`; any `localityLbAlgorithm` (default `ROUND_ROBIN`). |
| `HTTP_COOKIE` | 1.35.2-gke.1269001 | Requires `cookie.name`; `localityLbAlgorithm` must be `MAGLEV` or `RING_HASH`. |
| `GENERATED_COOKIE` | 1.35.2-gke.1269001 | Only `cookie.ttl` configurable; requires `MAGLEV` or `RING_HASH`. |
| `HEADER_FIELD` | 1.35.2-gke.1269001 | Requires `MAGLEV` or `RING_HASH`. |
| `CLIENT_IP` | 1.35.2-gke.1269001 | Best effort; requires `MAGLEV` or `RING_HASH`. |
| `NONE` | — | Disables session affinity. |

## Notes

- GCPBackendPolicy session affinity sets `localityLbPolicy` to `MAGLEV` silently on the managed backend service (not visible in gcloud, the UI or Terraform); removing it reverts to `ROUND_ROBIN`. If both policies target one Service, GCPTrafficDistributionPolicy wins. Weighted traffic splitting takes precedence over session affinity.
- Custom metrics in GCPTrafficDistributionPolicy apply only to `WEIGHTED_ROUND_ROBIN` and are not inherited from `backends[].customMetrics[]` of GCPBackendPolicy. The source prose names the field `maxUtilization` while the example uses `maxUtilizationPercent`; both are kept as written.
- Adapted from the official docs: the ring-hash example's `targetRefs` entry was written as `-   group: ""` followed by `    kind: Service`, which does not parse as one mapping; it is normalized to `- group: ""`.
- The source also shows the HEADER_FIELD / HTTP_COOKIE / GENERATED_COOKIE / CLIENT_IP and GCPBackendPolicy GENERATED_COOKIE (`cookieTtlSec: 50`) variants, omitted for size. For the Policy Types API reference see https://googlecloudplatform.github.io/gke-gateway-api/.
- GCPTrafficDistributionPolicy session affinity is for single-cluster Gateways only; it is not compatible with InferencePool and not supported for the classic Application Load Balancer. The common requirements and the other Policies are in `configure-gateway-resources.md`.
- These are Kubernetes Gateway API resources on GKE, not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-load-balancing`).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-gateway-resources.md](./configure-gateway-resources.md)
- [gateway-api.md](./gateway-api.md)
