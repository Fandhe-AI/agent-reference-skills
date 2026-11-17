---
source: https://docs.cloud.google.com/service-directory/docs/key-terms
---

# Key terms (Service Directory)

Terminology for Service Directory: endpoint, service, namespace, HTTP/gRPC clients, and Service Directory zone.

## Signature / Usage

Resources are created in the order namespace, then service, then endpoint; the first step with gcloud is:

```bash
gcloud service-directory namespaces create NAMESPACE \
   --location REGION
```

## Options / Props

| Term | Definition |
|------|------------|
| Endpoint | An individual IP/port pair fronting a service that can handle requests. A service can have zero or more endpoints. It can be a VM, container, load balancer, or other entity (for example a cluster of user-managed Redis servers). Optional annotations are key:value pairs (for example `replica:server`); annotations can store URLs. An endpoint exists only within a service and is identified by an endpoint name unique to that service. |
| Service | A collection of endpoints (IP/ports) that provide a set of behaviors. Clients look up a service by name, then connect to its endpoints. Optional annotations (for example `use_https:true`). A service must belong to a namespace; each service name must be unique within that namespace. |
| Namespace | Holds a set of service names along with their endpoint information; groups services for easier management. Namespaces are regional resources and belong to a project; the name must be unique for that project and region. Services in a namespace can exist anywhere and be queried from anywhere; choose a region that maps to where the endpoints run. |
| HTTP/gRPC clients | Service names can be looked up using HTTP/gRPC. The service and client need not be on the same network. Lookup operations over gRPC are controlled by IAM. |
| Service Directory zone | A specific type of Cloud DNS private zone whose complete and authoritative source of information is a Service Directory namespace; allows lookup of Service Directory data using DNS requests. If a namespace is attached to a Service Directory zone, all services in that namespace are visible to all networks that are allowed to query the zone. |

## Notes

- Snippet taken from https://docs.cloud.google.com/service-directory/docs/configuring-service-directory (the source key-terms page has no code).
- Source: https://docs.cloud.google.com/service-directory/docs/key-terms (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-directory/docs/configuring-service-directory (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configuring-service-directory.md](./configuring-service-directory.md)
