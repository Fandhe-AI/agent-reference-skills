---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources
---

# Configure Gateway resources using Policies

Customize the load balancer that GKE creates for a Gateway by attaching Policies (GCPGatewayPolicy, HealthCheckPolicy, GCPBackendPolicy, GCPTrafficDistributionPolicy) to Gateways, Services or ServiceImports. The controller reconfigures the load balancer without recreating the Gateway, Route or Service. Requirements: VPC-native cluster, `HttpLoadBalancing` add-on, proxy-only subnet for regional or cross-region GatewayClasses, Istio 1.15.2+ / 1.14.5+ / 1.13.9+ if used, and in Shared VPC the `Compute Network User` role for the service project's GKE service account in the host project.

## Signature / Usage

### Global access for a regional internal Gateway (GKE 1.24+)

```yaml
apiVersion: networking.gke.io/v1
kind: GCPGatewayPolicy
metadata:
  name: my-gateway-policy
  namespace: default
spec:
  default:
    # Enable global access for the regional internal Application Load Balancer.
    allowGlobalAccess: true
  targetRef:
    group: gateway.networking.k8s.io
    kind: Gateway
    name: my-gateway
```

### Health check (GKE 1.24+)

All fields of a HealthCheckPolicy attached to a Service. Variants for ServiceImport use `group: net.gke.io` / `kind: ServiceImport`, InferencePool uses `group: inference.networking.k8s.io` / `kind: InferencePool`, multi-cluster InferencePool uses `group: networking.gke.io` / `kind: GCPInferencePoolImport`.

```yaml
# Health check configuration for the load balancer. For more information
# about these fields, see https://docs.cloud.google.com/compute/docs/reference/rest/v1/healthChecks.
apiVersion: networking.gke.io/v1
kind: HealthCheckPolicy
metadata:
  name: lb-healthcheck
  namespace: lb-service-namespace
spec:
  default:
    checkIntervalSec: INTERVAL  # The default value is 15 seconds.
    timeoutSec: TIMEOUT
    healthyThreshold: HEALTHY_THRESHOLD
    unhealthyThreshold: UNHEALTHY_THRESHOLD
    logConfig:
      enabled: true
    config:
      type: PROTOCOL
      httpHealthCheck:
        portSpecification: PORT_SPECIFICATION
        port: PORT
        host: HOST
        requestPath: REQUEST_PATH
        response: RESPONSE
        proxyHeader: PROXY_HEADER
      httpsHealthCheck:
        portSpecification: PORT_SPECIFICATION
        port: PORT
        host: HOST
        requestPath: REQUEST_PATH
        response: RESPONSE
        proxyHeader: PROXY_HEADER
      grpcHealthCheck:
        grpcServiceName: GRPC_SERVICE_NAME
        portSpecification: PORT_SPECIFICATION
        port: PORT
      http2HealthCheck:
        portSpecification: PORT_SPECIFICATION
        port: PORT
        host: HOST
        requestPath: REQUEST_PATH
        response: RESPONSE
        proxyHeader: PROXY_HEADER
      tcpHealthCheck:
        portSpecification: PORT_SPECIFICATION
        port: PORT
        portName: PORT_NAME
        request: REQUEST
        response: RESPONSE
        proxyHeader: PROXY_HEADER
  # Attach to a Service in the cluster.
  targetRef:
    group: ""
    kind: Service
    name: lb-service
```

### Cloud Armor backend security policy (GKE 1.24+)

Create the Cloud Armor backend security policy first (a regional policy for a regional Gateway).

```yaml
apiVersion: networking.gke.io/v1
kind: GCPBackendPolicy
metadata:
  name: my-backend-policy
  namespace: lb-service-namespace
spec:
  default:
    # Apply a Cloud Armor security policy.
    securityPolicy: example-security-policy
  # Attach to a Service in the cluster.
  targetRef:
    group: ""
    kind: Service
    name: lb-service
```

### IAP

IAP is not applied by default; configure it in a GCPBackendPolicy. Get the OAuth client ID and secret, enable IAP for GKE (no BackendConfig needed), then save as `backend-policy.yaml`. Replace `CLIENT_SECRET` with the OAuth client secret, `CLIENT_ID` with the OAuth client ID and `SERVICE_NAME` with the target Service.

```yaml
apiVersion: networking.gke.io/v1
kind: GCPBackendPolicy
metadata:
  name: backend-policy
spec:
  default:
    # IAP OAuth2 settings. For more information about these fields,
    # see https://docs.cloud.google.com/iap/docs/reference/rest/v1/IapSettings#oauth2.
    iap:
      enabled: true
      oauth2ClientSecret:
        name: CLIENT_SECRET
      clientID: CLIENT_ID
  # Attach to a Service in the cluster.
  targetRef:
    group: ""
    kind: Service
    name: SERVICE_NAME
```

```bash
kubectl apply -f backend-policy.yaml
kubectl get gcpbackendpolicy
kubectl describe gcpbackendpolicy
```

### HTTP access logging (GKE 1.24+)

```yaml
apiVersion: networking.gke.io/v1
kind: GCPBackendPolicy
metadata:
  name: my-backend-policy
  namespace: lb-service-namespace
spec:
  default:
    # Access logging configuration for the load balancer.
    logging:
      enabled: true
      # Log 50% of the requests. The value must be an integer between 0 and
      # 1000000. To get the proportion of requests to log, GKE
      # divides this value by 1000000.
      sampleRate: 500000
      # Log specific optional fields.
      optionalMode: CUSTOM
      optionalFields:
      - tls.cipher
      - orcaLoadReport.cpu_utilization
  targetRef:
    group: ""
    kind: Service
    name: lb-service
```

## Options / Props

### Restrictions and limitations

| Policy | Restriction |
| --- | --- |
| GCPGatewayPolicy | Attaches only to a `gateway.networking.k8s.io` Gateway; must be in the same namespace as the Gateway. |
| All policies | Hierarchical policies are not supported with GKE Gateway. |
| GCPBackendPolicy | No `HEADER_FIELD` or `HTTP_COOKIE` session affinity; use GCPTrafficDistributionPolicy. |
| GCPBackendPolicy / HealthCheckPolicy (single-cluster) | Must refer to a Service or InferencePool. |
| GCPBackendPolicy / HealthCheckPolicy (multi-cluster) | Must refer to a ServiceImport or GCPInferencePoolImport. |
| GCPBackendPolicy | One per protocol (`HTTP` or `TCP`) per target; `spec.protocol: TCP` (TLSRoute backends) can only target Service and ServiceImport; the oldest policy wins and newer ones are not attached. |
| GCPBackendPolicy / HealthCheckPolicy | Must be in the same namespace as the target; each targets a single resource. |
| GCPTrafficDistributionPolicy | Session affinity is single-cluster Gateways only; not compatible with InferencePool; not supported for the classic Application Load Balancer. |
| TLSRoute (TLS passthrough) | BackendTLSPolicy, SSL policies, Cloud Armor security policies, IAP and CORS filters are not supported. |

TCP GCPBackendPolicy (for TLSRoute) supports only these `spec.default` fields: `timeoutSec`, `connectionDraining`, `logging.enabled`, `logging.sampleRate`, `sessionAffinity.type` (`CLIENT_IP` or `NONE`), `capacityScalerPercent`, `balancingMode: CONNECTION`, `maxConnectionsPerEndpoint`. For a ServiceImport target, the last three can be set in `spec.default.scopes` (selectors such as `gke.io/cluster-name`, `gke.io/zone`, `gke.io/region`). Other fields, or an HTTP policy using `balancingMode: CONNECTION` or `maxConnectionsPerEndpoint`, are rejected on creation.

### HealthCheckPolicy placeholders

| Name | Description |
| --- | --- |
| `INTERVAL` | Check interval in seconds; default 15 with no HealthCheckPolicy, 5 when a HealthCheckPolicy omits `checkIntervalSec`. |
| `TIMEOUT` | Probe timeout in seconds; must be less than or equal to `INTERVAL`. |
| `HEALTHY_THRESHOLD` / `UNHEALTHY_THRESHOLD` | Consecutive successes or failures to change state; default 2. |
| `PROTOCOL` | Required; health check type (`http`, `https`, `grpc`, `http2`, `tcp`). |
| `PORT_SPECIFICATION` | `USE_FIXED_PORT`, `USE_NAMED_PORT` or `USE_SERVING_PORT` (default when `port` is unset). |
| `PORT` | Port number only; default 80. Use a `containerPort` of the serving Pods. |
| `HOST` | Host header (RFC 1123 hostname, no numeric IPs); defaults to the health check IP address. |
| `REQUEST_PATH` | Defaults to `/`. |
| `REQUEST` / `RESPONSE` | ASCII only; empty request and response means an established connection is healthy. |
| `PROXY_HEADER` | `NONE` (default) or `PROXY_V1`. |
| `GRPC_SERVICE_NAME` | Optional; omit for all Services. |

### Other limits

| Setting | Value |
| --- | --- |
| `timeoutSec` default | 30 seconds |
| `connectionDraining.drainingTimeoutSec` | 0 to 3600; default 0 (disabled) |
| Access logging default | Enabled, `sampleRate` 1,000,000 (all requests), no optional fields |
| `logging.sampleRate` | 0 to 1,000,000 (divided by 1,000,000); with `enabled: true` omitted `sampleRate` sets `enabled` to false |

## Notes

- Health checks: GKE Gateway does not infer path, port or protocol from readiness or liveness probes. Probes require HTTP 200; redirects (301/302) or 401/403 mark the backend unhealthy ("No healthy upstream"). Custom request headers cannot be configured, so allow unauthenticated access on the health check path for Google Cloud health check IP ranges. The Service must also be referenced by an HTTPRoute or TLSRoute. Default health check type follows the backend protocol (`HTTP` / `kubernetes.io/h2c` gives HTTP, `HTTPS` gives HTTPS, `HTTP2` gives HTTP2). For TLSRoute use `TCP` or `SSL`; a HealthCheckPolicy applies to all routes using the Service, so use separate Services per route.
- Adding global access to an existing internal Gateway recreates the forwarding rule and causes up to 15 minutes of unavailability; do it in a maintenance window. Changing the region of an existing regional multi-cluster Gateway deletes the load balancer in the old region and recreates it in the new region (destructive; try on a disposable Gateway first). If no region is set, the config cluster's region is used.
- The source's `logging` field list says `enable: true`; the manifest key is `enabled`. `optionalFields` are supported only when `spec.protocol` is `HTTP`.
- Do not reuse one backend Service across Gateways of incompatible GatewayClasses (global vs regional, internal vs external, managed vs classic); create a distinct Service per Gateway.
- Troubleshooting: check `Conditions` (`True` / `Attached`) with `kubectl describe gcptrafficdistributionpolicy`, and the Gateway `Programmed` condition. A second GCPBackendPolicy on the same target shows `Conflicted` ("conflicted with GCPBackendPolicy ... of higher precedence"); merge into one policy. "The given security policy does not exist" on a regional Gateway means a regional Cloud Armor policy is missing.
- The IAP example refers to the OAuth client secret by Kubernetes Secret name; do not put real secret values in manifests. The source shows sample `kubectl describe` output, omitted here.
- The source repeats each example for ServiceImport (multi-cluster), InferencePool and GCPInferencePoolImport targets; only the Service form is kept except where noted. The source's multi-cluster InferencePool connection-draining example is malformed (not a fenced block, flattened indentation) and is omitted.
- These are Kubernetes Gateway API resources on GKE, not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (planned `gcp-networking`).
- This page covers the first half of the source; custom-metrics backend selection, GCPTrafficDistributionPolicy routing, session affinity and traffic-based autoscaling are in `gateway-traffic-distribution.md`.
- Omitted for size: the multi-cluster region example (`GCPGatewayPolicy` with `spec.default.region: us-central1`, GKE 1.30.3-gke.1225000+), the SSL policy example (see `gateway-security.md`), and the backend service timeout (`timeoutSec`, default 30) and connection draining (`connectionDraining.drainingTimeoutSec`) `GCPBackendPolicy` examples.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gateway-api.md](./gateway-api.md)
- [gateway-security.md](./gateway-security.md)
- [gateway-traffic-distribution.md](./gateway-traffic-distribution.md)
