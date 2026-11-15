---
source: https://docs.cloud.google.com/run/docs/configuring/healthchecks
---

# Configure health checks for services

Cloud Run probes check that instances run correctly and can serve traffic. Three probe types: startup (is the container started and ready), liveness (should the container be restarted), and readiness (should the instance receive traffic). Probes can be HTTP, TCP (startup only) or gRPC.

## Signature / Usage

### Startup probes (gcloud)

TCP:

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --startup-probe tcpSocket.port=CONTAINER_PORT,initialDelaySeconds=DELAY,failureThreshold=THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

HTTP:

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --startup-probe httpGet.path=PATH,httpGet.port=CONTAINER_PORT,initialDelaySeconds=DELAY,failureThreshold=THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

gRPC:

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --startup-probe grpc.port=CONTAINER_PORT,grpc.service=GRPC_SERVICE,initialDelaySeconds=DELAY,failureThreshold=THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

### Startup probe (YAML, HTTP)

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
    spec:
      containers:
      - image: IMAGE_URL
        startupProbe:
          httpGet:
            path: PATH
            port: CONTAINER_PORT
            httpHeaders:
              - name: HEADER_NAME
                value: HEADER_VALUE
          initialDelaySeconds: DELAY
          timeoutSeconds: TIMEOUT
          failureThreshold: THRESHOLD
          periodSeconds: PERIOD
```

### Default TCP startup probe

If you don't explicitly configure a TCP startup probe for a new service, Cloud Run adds a TCP startup probe with these defaults:

```yaml
startupProbe:
          timeoutSeconds: 240
          periodSeconds: 240
          failureThreshold: 1
```

### Liveness probes (gcloud)

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --liveness-probe httpGet.path=PATH,httpGet.port=CONTAINER_PORT,initialDelaySeconds=DELAY,failureThreshold=THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --liveness-probe grpc.port=CONTAINER_PORT,grpc.service=GRPC_SERVICE,initialDelaySeconds=DELAY,failureThreshold=THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

Liveness YAML uses the `livenessProbe` attribute (same fields as `startupProbe` with `httpGet` or `grpc`).

### Readiness probes

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --readiness-probe httpGet.path=PATH,httpGet.port=CONTAINER_PORT,successThreshold=SUCCESS_THRESHOLD,failureThreshold=FAILURE_THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

```bash
gcloud run deploy SERVICE \
    --image=IMAGE_URL \
    --readiness-probe grpc.port=CONTAINER_PORT,grpc.service=GRPC_SERVICE,successThreshold=SUCCESS_THRESHOLD,failureThreshold=FAILURE_THRESHOLD,timeoutSeconds=TIMEOUT,periodSeconds=PERIOD
```

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: SERVICE
spec:
  template:
    metadata:
    spec:
      containers:
      - image: IMAGE_URL
        readinessProbe:
          httpGet:
            path: PATH
            port: CONTAINER_PORT
          successThreshold: SUCCESS_THRESHOLD
          failureThreshold: FAILURE_THRESHOLD
          timeoutSeconds: TIMEOUT
          periodSeconds: PERIOD
```

## Options / Props

| Setting | Startup | Liveness | Readiness |
|---|---|---|---|
| `initialDelaySeconds` | 0 to 600 (1800 for GPU); default 0 | 0 to 600 (1800 for GPU); default 0 | — |
| `periodSeconds` | 1 to 600 (1800 for GPU); default 10 | 1 to 3600; default 10 | 1 to 300; default 10 |
| `timeoutSeconds` | 1 to 600 (1800 for GPU); default 1; cannot exceed `periodSeconds` | 1 to 3600; default 1; cannot exceed `periodSeconds` | 1 to 300; default 1; cannot exceed `periodSeconds` |
| `failureThreshold` | default 3 | default 3 | default 3 (then stops receiving traffic) |
| `successThreshold` | — | — | default 2 (consecutive successes after a failure) |
| HTTP `path` | required | required | default `/` |
| `port` | container port | container port | default: main ingress port |
| Probe types | HTTP, TCP, gRPC | HTTP, gRPC | HTTP, gRPC |

Behavior:

| Probe | Behavior |
|---|---|
| TCP startup | Opens a TCP socket on the port; failure to connect is a failure. If it does not succeed within `failureThreshold` * `periodSeconds` (not above 600 seconds, 1800 for GPU), the container is shut down |
| HTTP startup | HTTP GET to the endpoint; any `2XX` or `3XX` is success, anything else failure; same time cap and shutdown. On success, an HTTP liveness probe starts only if you have configured one. Needs an HTTP/1 endpoint |
| gRPC startup | Requires the gRPC Health Checking protocol; same time cap and shutdown |
| HTTP liveness | Starts after startup succeeds; on failure within `failureThreshold` * `periodSeconds` the container is shut down with `SIGKILL`, remaining requests end with HTTP `503`, and autoscaling starts a new instance |
| gRPC liveness | Starts after any gRPC startup probe succeeds; failure means `SIGKILL` shutdown and a new instance |
| HTTP / gRPC readiness | Starts only after any startup probe succeeds; after failing beyond `failureThreshold`, new requests stop being routed to the instance (it is not shut down); routing resumes after `successThreshold` consecutive successes |

`GRPC_SERVICE` (optional) is used in the `service` field of `grpc.health.v1.HealthCheckRequest` for the `grpc.health.v1.Health.Check` rpc.

## Notes

- Configuring a startup probe disables liveness and readiness checks until startup succeeds. Liveness probes are for unrecoverable instance failures such as deadlocks; when probes fail repeatedly Cloud Run limits restarts to prevent uncontrolled crash loops. A liveness probe can be required via custom organization policy.
- Cloud Run can route traffic to a new instance before the first readiness probe completes, so make passing the startup probe imply readiness; when startup succeeds the container is treated as ready.
- Readiness limitations: with session affinity, Cloud Run keeps sending requests to the same instance even if its readiness check fails. Services whose readiness probe was configured with Cloud Run Admin API v1 before November 2025 need two revisions (one removing the old readiness probe, then one adding it) for readiness to take effect.
- HTTP health check endpoints are externally accessible, like any other exposed endpoint.
- CPU is always allocated when probes run; probes are billed for CPU and memory but have no request-based charge.
- Source inconsistency: the containers page says health checks cannot be configured with the gcloud CLI, while this page shows `--startup-probe`, `--liveness-probe` and `--readiness-probe` flags.
- Any configuration change creates a new revision.
- The source also shows Console and Terraform forms (omitted).
- Source: https://docs.cloud.google.com/run/docs/configuring/healthchecks (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [grpc.md](./grpc.md)
- Containers and start order: https://docs.cloud.google.com/run/docs/configuring/services/containers
- gRPC health check protocol: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
