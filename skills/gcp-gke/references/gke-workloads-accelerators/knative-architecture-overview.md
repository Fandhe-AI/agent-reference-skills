---
source: https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/architecture-overview
---

# Knative serving architecture overview

Architectural overview of Knative serving on GKE and what changes in a cluster when you enable it: installed components, resource usage, how a Service creates its child resources, and the request path.

## Signature / Usage

### Inspect the installed components

Knative serving components live in the `knative-serving` namespace; Cloud Service Mesh components live in `istio-system` by default. The page itself has no commands; the following command is taken from https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/install/on-gcp (the verification step) and prints the release label of the installed version.

```bash
kubectl get all -n knative-serving -o 'go-template={{index .metadata.labels "serving.knative.dev/release"}}'
```

### What happens when a Knative serving Service is created

1. The Service object defines a configuration, an immutable revision, and a route for traffic allocation.
2. The route object creates a VirtualService, which configures Ingress Gateway and Cluster Local Gateway to route traffic to the right revision.
3. The revision object creates a Kubernetes Service object and a Deployment object.
4. Network configuration connects Activator, Autoscaler, and load balancers.

### Request path

1. Traffic arrives through the Ingress Gateway (from outside the cluster) or the Cluster Local Gateway (within the cluster).
2. The VirtualService routes to the correct revision.
3. The Kubernetes Service decides by pod availability. With no pods, Activator queues the request and pushes a metric to Autoscaler, Autoscaler scales the Deployment, the Deployment creates pods, and Activator retries to the queue proxy sidecar. With pods available, the Service sends the request to the queue proxy sidecar.
4. The queue proxy sidecar enforces request queue parameters (single or multi-threaded requests); if it has more requests than it can handle, Autoscaler creates more pods.
5. The queue proxy sidecar sends traffic to the user container.

## Options / Props

### Components in `knative-serving`

| Component | Role |
| --- | --- |
| Activator | Data plane. Queues requests when pods are scaled to zero or overloaded, sends metrics to Autoscaler, forwards queued requests to the revision. |
| Autoscaler | Aggregates metrics from Activator and the queue proxy sidecar, calculates observed concurrency and adjusts the deployment size. Control plane when pods exist; data plane when scaled to zero. |
| Controller | Control plane. Creates and updates child resources of Autoscaler and Service objects. |
| Metrics Collector | Collects metrics from Knative serving components and forwards them to Cloud Monitoring. |
| Webhook | Control plane. Sets defaults, rejects invalid objects, validates and mutates API calls against Knative serving resources. |

### Components from Cloud Service Mesh in `istio-system`

| Component | Role |
| --- | --- |
| Cluster Local Gateway | Data plane load balancer for service-to-service traffic inside the cluster; no external domain registered. |
| Istio Ingress Gateway | Data plane load balancer for incoming traffic from outside the cluster (including external or internal networks). |
| Istiod | Control plane. Configures both gateways to handle HTTP requests at the correct endpoints. |

### Cluster resource usage

| Item | Usage |
| --- | --- |
| Initial installation | About 1.5 vCPU and 1 GB memory; independent of node count. |
| One Activator | Up to 1000 milliCPU and 600 MiB RAM. |
| Additional Activator (when one cannot cope) | Reserves 300 milliCPU and 60 MiB RAM. |
| Queue proxy sidecar (one per pod) | Reserves 25 milliCPU, no memory reservation; no CPU or memory limits. |

### Custom resources

| CRD | Meaning |
| --- | --- |
| Service | Top-level resource managing the whole workload lifecycle; ensures a route, a configuration, and a new revision per update. |
| Revision | Immutable point-in-time snapshot of code and configuration. |
| Configuration | Current settings for the latest revision and history of past revisions; modifying it creates a new revision. |
| Route | HTTP endpoint associated with one or more revisions. |

## Notes

- Knative serving components are updated automatically with GKE control plane updates.
- Knative serving routes traffic through Cloud Service Mesh (formerly Anthos Service Mesh). This is Knative serving on GKE, distinct from Cloud Run (`gcp-run`), which is a separate fully managed product.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/install/on-gcp (the source page has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/enterprise/knative-serving/docs/architecture-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [knative-resource-model.md](./knative-resource-model.md)
- [knative-install-on-gcp.md](./knative-install-on-gcp.md)
