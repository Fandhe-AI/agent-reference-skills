---
source: https://docs.cloud.google.com/load-balancing/docs/enabling-connection-draining
---

# Connection draining

Connection draining gives in-progress requests time to complete when a VM is removed from an instance group or an endpoint is removed from a zonal-scope NEG (zonal NEG or hybrid connectivity NEG). It does not apply when a whole backend group is removed from a backend service.

## Signature / Usage

### gcloud

Global or cross-region load balancer:

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --global \
    --connection-draining-timeout=CONNECTION_TIMEOUT_SECS
```

Regional load balancer:

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --region=REGION \
    --connection-draining-timeout=CONNECTION_TIMEOUT_SECS
```

### API

Adapted (not in the official docs): the request URLs name the backend service (`/BACKEND_SERVICE`) and the regional path uses `regions/` instead of `region/`, as in the Compute Engine REST `backendServices.patch` and `regionBackendServices.patch` paths.

Regional load balancer (for a global load balancer, send the same body to `PATCH https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE`):

```text
PATCH https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/backendServices/BACKEND_SERVICE

{
   "name": "BACKEND_SERVICE",
   "connectionDraining": {
     "drainingTimeoutSec": CONNECTION_TIMEOUT_SECS
   }
}
```

## Options / Props

| Name | Description |
|---|---|
| `BACKEND_SERVICE` | Backend service to update |
| `REGION` | Region of the backend service, if regional |
| `PROJECT_ID` | Project ID containing the load balancer or Cloud Service Mesh deployment |
| `CONNECTION_TIMEOUT_SECS` | 0 - 3600 seconds, inclusive; `0` disables draining; applies to all backends of the backend service |

| Load balancer | Behavior |
|---|---|
| Application Load Balancers | Existing requests complete within the timeout; afterwards all traffic stops |
| Proxy Network Load Balancers | Existing TCP connections keep working during the period; afterwards they remain active and the proxy closes them within 10 minutes (default idle timeout) |
| Passthrough Network Load Balancers | Packets of existing connections still reach the VM; after the timeout the connection tracking entry is removed and later packets go to another backend, which may send a TCP `RST`. Passthrough load balancers can't send `RST` or `FIN` themselves |

## Notes

- Draining applies when you: remove a VM or endpoint from a backend group; remove an instance from a managed instance group via `resize()`, `deleteInstances()`, `recreateInstances()` or `abandonInstances()`; remove a Dynamic NIC from an instance group backend VM; autoscaling deletes an instance; or the Managed Instance Group Updater updates the group.
- Behavior while draining (no new connections are sent to the removed VM or endpoint):
- Available for backend services of external and internal Application Load Balancers, external and internal proxy Network Load Balancers, global external passthrough, backend service-based regional external passthrough and internal passthrough Network Load Balancers (TCP, UDP and other protocols), and Cloud Service Mesh.
- Termination can take up to 60 seconds after the timeout passes.
- If several backend services share a group, the largest timeout wins (100 s and 200 s gives 200 s); MIG instance deletions are delayed by at least that long.
- Timeout `0` or unset: existing connections end as quickly as possible. With connection pooling, requests on pooled connections may still reach draining VMs and fail when they are deleted.
- Classic Application and classic proxy Network Load Balancers always use global backend services, even in Standard Tier with backends in one region.
- `gcloud compute backend-services edit` also works. The source also shows Console steps. Full flags are in the `gcp-compute` skill: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/update . Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`) or Vercel (`vercel`).
- Corrected from the official docs: the source writes the request URLs as `.../global/backendServices` and `.../region/REGION/backendServices`, without the backend service name; the Compute Engine Discovery document (`compute.v1`) defines `backendServices.patch` as `projects/{project}/global/backendServices/{backendService}` and `regionBackendServices.patch` as `projects/{project}/regions/{region}/backendServices/{backendService}`.
- Source: https://docs.cloud.google.com/load-balancing/docs/enabling-connection-draining (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [backend-service.md](./backend-service.md)
