---
source: https://docs.cloud.google.com/service-mesh/docs/service-routing/limitations
---

# Cloud Service Mesh limitations with Envoy

Limitations of Cloud Service Mesh with the Google Cloud APIs, including advanced traffic management and Service Directory. Does not apply to Cloud Service Mesh with the Istio APIs. For quotas and limits see the Cloud Service Mesh quotas and limits page.

## Signature / Usage

Mesh resources are created by importing a YAML specification (snippet from the Envoy HTTP setup guide):

```bash
gcloud network-services meshes import sidecar-mesh \
  --source=mesh.yaml \
  --location=global
```

## Options / Props

### General limitations

| Limitation | Detail |
|------------|--------|
| APIs | The service routing APIs only support Google Cloud APIs. |
| Request protocols | HTTP (HTTP/1.1 or HTTP/2), HTTPS, TCP and gRPC. |
| Envoy stream idle timeout | `stream_idle_timeout` defaults to 5 minutes and is not configurable through Cloud Service Mesh. |
| `TCPRoute` | Advanced traffic management features cannot be used with `TCPRoute`; they are only available for HTTP or gRPC. |
| VPC Network Peering | Supported with the service routing APIs. |
| Protocols | Server-first protocols are not supported. |
| Serverless | Services in Knative or Google Cloud serverless computing cannot be used. |
| Proxies | Any open standard xDS proxy can be used, but Google has tested only Envoy. Use the most recent Envoy version. |
| Console | Hybrid connectivity NEGs cannot be created or deleted in the console; use the Google Cloud CLI. |
| Health status | Because the data plane handles health checks, health check status cannot be retrieved with the console, API or gcloud CLI. |
| `iptables` | Check that `iptables` is set up correctly (see Envoy's HTTP filtering notes). VMs created in the console may lack some `ipv6` modules until restarted, so `iptables.sh` fails; restart the VM and rerun `run.sh`. gcloud-created VMs are not expected to have this problem. |

### Advanced traffic management limitations

- If `BackendService.sessionAffinity` is not NONE and `BackendService.localityLbPolicy` is a policy other than `MAGLEV` or `RING_HASH`, the session affinity settings don't take effect.
- `gcloud import` does not delete top-level fields of a resource such as the backend service or URL map. For example, `circuitBreakers` settings can be updated but not removed that way; delete and recreate the resource without them.

### Service Directory limitations

- Service Directory and Cloud Service Mesh don't guarantee network reachability for clients.
- A backend service can reference only one of: a managed or unmanaged instance group, a network endpoint group, or service bindings.
- Service Directory services can only be used with global backend services with `load-balancing-scheme=INTERNAL_SELF_MANAGED`.
- A Service Directory service referenced by a service binding can be deleted; then applications that use Cloud Service Mesh cannot send traffic to it and requests fail.
- When a Service Directory service is bound to a backend service, no health check can be configured on that backend service.

## Notes

- Snippet taken from https://docs.cloud.google.com/service-mesh/docs/service-routing/set-up-envoy-http-mesh (the source page has no code).
- Deleting a bound Service Directory service breaks traffic; try such changes on disposable resources first.
- Cloud Service Mesh / Traffic Director here covers Compute Engine and proxyless gRPC; GKE-based meshes are in the `gcp-gke` skill.
- Source: https://docs.cloud.google.com/service-mesh/docs/service-routing/limitations (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [limitations-proxyless.md](./limitations-proxyless.md)
- [features.md](./features.md)
- [advanced-traffic-management.md](./advanced-traffic-management.md)
