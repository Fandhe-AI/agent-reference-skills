---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/load-balance-ingress
---

# Configure Ingress for external Application Load Balancers

Create an external Application Load Balancer by applying a Kubernetes Ingress object: enable the `HttpLoadBalancing` add-on, deploy two Services, route by URL path, test, and reference the Ingress and Service annotations. GKE Ingress is not supported on single-stack IPv6 clusters; use Gateway API there. Requires an existing Autopilot or Standard cluster and the Kubernetes Engine API enabled.

## Signature / Usage

### Enable the `HttpLoadBalancing` add-on

Enabled by default; cannot be disabled in Autopilot clusters.

```bash
gcloud container clusters update CLUSTER_NAME --update-addons=HttpLoadBalancing=ENABLED
```

Replace `CLUSTER_NAME` with the name of your cluster.

### Deployments and Services

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world-deployment-1
spec:
  selector:
    matchLabels:
      greeting: hello
      version: one
  replicas: 3
  template:
    metadata:
      labels:
        greeting: hello
        version: one
    spec:
      containers:
      - name: hello-app-1
        image: "us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0"
        env:
        - name: "PORT"
          value: "50000"
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-world-1
spec:
  type: NodePort
  selector:
    greeting: hello
    version: one
  ports:
  - protocol: TCP
    port: 60000
    targetPort: 50000
```

The second Deployment (`hello-world-deployment-2`, image `hello-app:2.0`, `PORT` `8080`, label `version: two`) and Service (`hello-world-2`, `NodePort`, port 80 to `targetPort` 8080) follow the same shape. Apply each manifest with `kubectl apply -f FILE_NAME`.

### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    # If the class annotation is not specified it defaults to "gce".
    kubernetes.io/ingress.class: "gce"
spec:
  rules:
  - http:
      paths:
      - path: /*
        pathType: ImplementationSpecific
        backend:
          service:
            name: hello-world-1
            port:
              number: 60000
      - path: /v2
        pathType: ImplementationSpecific
        backend:
          service:
            name: hello-world-2
            port:
              number: 80
```

To reserve a global static external IP address, include the `kubernetes.io/ingress.global-static-ip-name` annotation in the Ingress object. The block below shows only the part to add: put the annotation under `metadata.annotations` of the `my-ingress` manifest above, keep its `spec.rules`, and apply the whole manifest (applying the block on its own is rejected because an Ingress needs `spec.rules` or `spec.defaultBackend`).

Adapted (not in the official docs): the source's static IP example contained a stray closing fence inside the YAML; the stray line was removed.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: my-static-address
```

```bash
kubectl apply -f my-ingress.yaml
```

### Test

Wait about five minutes, then read the load balancer IP.

```bash
kubectl get ingress my-ingress --output yaml
```

Adapted (not in the official docs): the second test command used the lowercase placeholder `load-balancer-ip`; replaced with `LOAD_BALANCER_IP_ADDRESS` as in the first command.

```bash
curl LOAD_BALANCER_IP_ADDRESS/
curl LOAD_BALANCER_IP_ADDRESS/v2
```

Replace `LOAD_BALANCER_IP_ADDRESS` with the external IP address of the load balancer. A 404 means wait a few minutes.

## Options / Props

### Ingress annotations

| Annotation | Description |
|---|---|
| `kubernetes.io/ingress.allow-http` | Allow HTTP between client and load balancer; `"true"` (default) or `"false"` |
| `ingress.gcp.kubernetes.io/pre-shared-cert` | Attach certificate resources to the Ingress |
| `kubernetes.io/ingress.global-static-ip-name` | Use a previously created global static external IP address |
| `networking.gke.io/v1beta1.FrontendConfig` | Customize client-facing configuration |
| `networking.gke.io/suppress-firewall-xpn-error` | `"true"` mutes `firewallXPNError` events (GLBC 1.4 and later); default `false` |

### Service annotations related to Ingress

| Annotation | Description |
|---|---|
| `cloud.google.com/app-protocols` | Protocol between load balancer and application: HTTP, HTTPS, HTTP2 |
| `cloud.google.com/backend-config` | Configure the backend service of a Service |
| `cloud.google.com/neg` | Use network endpoint groups |

### URL paths and `pathType`

| Item | Rule |
|---|---|
| Wildcard | Only `*`, must follow `/` and be last: `/*`, `/foo/*`, `/foo/bar/*` valid; `*`, `/foo/bar*`, `/foo/*/bar` invalid |
| Precedence | The more specific pattern wins (`/foo/bar/bat` matches `/foo/bar/*`) |
| `pathType` before 1.21.3-gke.1600 | Only `ImplementationSpecific` |
| `pathType` 1.21.3-gke.1600 or later | `Prefix` and `Exact` also supported |

## Notes

- Ingress class is set only through the `kubernetes.io/ingress.class` annotation, not `spec.ingressClassName`. `gce` is external, `gce-internal` is internal; with neither, an external Application Load Balancer is created.
- Services must be `NodePort` unless you use container-native load balancing (then any type, `ClusterIP` recommended); LoadBalancer Services are not supported as Ingress backends.
- To keep a permanent IP, reserve a global static external IP before creating the Ingress; switching an existing Ingress to a static IP may change the load balancer IP when the forwarding rule is re-created.
- In GKE clusters 1.17 and later container-native load balancing is the default under certain conditions. Adding `cloud.google.com/neg: '{"ingress": true}'` creates a new BackendService and can cause a temporary outage. Do not remove or modify this annotation after applying it; configure third-party controllers or GitOps tools to ignore it.
- Shared VPC: the service project's GKE service account needs IAM permissions in the host project to manage firewall rules; otherwise events such as "Firewall change required by security admin: gcloud compute firewall-rules update ..." appear (allow tcp on source ranges `130.211.0.0/22,35.191.0.0/16`). If you provision firewall rules manually, use `networking.gke.io/suppress-firewall-xpn-error: "true"`.
- The source also shows Console steps and a Cloud Shell guided walkthrough (omitted).
- Corrected from the official docs: the `curl load-balancer-ip/v2` test command and the stray ``` line inside the static IP YAML example.
- Kubernetes Gateway API / Ingress resources on GKE are not an HTTP framework router (`hono`, `fastify`) and not Cloud Load Balancing configured directly (`gcp-networking`, planned).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/load-balance-ingress (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [ingress.md](./ingress.md)
- [service.md](./service.md)
- [about-load-balancing.md](./about-load-balancing.md)
