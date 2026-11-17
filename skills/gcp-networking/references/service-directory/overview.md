---
source: https://docs.cloud.google.com/service-directory/docs/overview
---

# Service Directory overview

Service Directory is a single place to publish, discover, and connect to services in a consistent and reliable way, regardless of their environment. It supports services in Google Cloud, multi-cloud, and on-premises environments and can scale up to thousands of services and endpoints for a single project. Clients can resolve services by using HTTP, gRPC, and DNS.

## Signature / Usage

### Resolve a registered service

Resolving returns all properties of the service, all endpoints, and all annotations.

```bash
gcloud service-directory services resolve SERVICE \
   --namespace NAMESPACE \
   --location REGION
```

## Options / Props

### Features

| Feature | Description |
|---------|-------------|
| Registration and Lookup API | Create and resolve namespaces, services, and endpoints |
| Cloud DNS integration | Service Directory zones make services available on Virtual Private Cloud (VPC) |
| IAM integration | Assign and control service visibility and permissions |
| gcloud CLI and Google Cloud console | Built-in support for interacting with Service Directory |
| Cloud Monitoring and Cloud Logging integration | Monitoring, auditing, and debugging of Service Directory operations |

### Problems solved

| Problem | How Service Directory addresses it |
|---------|------------------------------------|
| Interoperability | Universal naming service across Google Cloud, multi-cloud, and on-premises; the same service name can be used to register and resolve endpoints after migration |
| Service management | Managed service: no high availability, redundancy, scaling, or maintenance concerns for your own registry |
| Access control | IAM controls who can register and resolve services; assign Service Directory roles to teams, service accounts, and organizations |
| Limitations of pure DNS | DNS resolvers can be unreliable about TTLs and caching, cannot handle larger record sizes, and offer no easy way to serve metadata; Service Directory adds HTTP and gRPC APIs |

### Components when using Cloud DNS

1. Endpoints are registered directly with Service Directory by using the Service Directory API (Google Cloud and non-Google Cloud services).
2. External and internal clients look up services at `https://servicedirectory.googleapis.com`.
3. To enable DNS requests, create a Service Directory zone in Cloud DNS associated with a Service Directory namespace.
4. Internal clients can resolve a service by using DNS, HTTP, and gRPC. External clients (not on the private network) must use HTTP or gRPC.

### Example: expose a service over DNS

The `payments` service is registered in the namespace `backend-namespace`, region `us-east1`, project `gcp-project`. The namespace is linked to the private zone `example.com`. Service Directory maintains the services and endpoints; the private zone is in Cloud DNS. A client requests the SRV record for `_payments._tcp.payments.example.com`, which resolves to the port numbers and address records of the endpoints.

## Notes

- Service Directory zones are Cloud DNS private zones; see the Cloud DNS pages of this skill for Google Cloud DNS in general (not Cloudflare DNS).
- Snippet taken from https://docs.cloud.google.com/service-directory/docs/configuring-service-directory (the source overview page has no code).
- Source: https://docs.cloud.google.com/service-directory/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/service-directory/docs/configuring-service-directory (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-terms.md](./key-terms.md)
- [configuring-service-directory.md](./configuring-service-directory.md)
- [quotas.md](./quotas.md)
