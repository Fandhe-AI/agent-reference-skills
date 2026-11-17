---
source: https://docs.cloud.google.com/vpc/docs/private-service-connect
---

# Private Service Connect

Private Service Connect is a Google Cloud networking capability that lets consumers access managed services privately from inside their VPC network, and lets producers host services in their own VPC networks and offer a private connection to consumers. Traffic stays entirely within Google Cloud and consumers use their own internal IP addresses.

## Signature / Usage

### Choosing a feature

| Use case | Private Service Connect feature |
|---|---|
| Consume services | Endpoints provide layer 4 connectivity to services. If you need load balancer features such as custom URLs or advanced traffic management, use backends. |
| Produce services | Published services let consumers send requests to your service. If you need to initiate connections to consumers, use interfaces. |

### Create an endpoint (forwarding rule to a service attachment)

Snippet taken from https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (see `configure-private-service-connect-services.md`).

```bash
gcloud compute forwarding-rules create ENDPOINT_NAME \
    --region=REGION \
    --network=NETWORK_NAME \
    --address=ADDRESS_NAME \
    --target-service-attachment=SERVICE_ATTACHMENT
```

## Options / Props

| Type | Mechanism | Direction / notes |
|---|---|---|
| Endpoints | Forwarding rule that gives the consumer an internal IP address mapped to a service attachment, a bundle of global Google APIs, or a regional or multi-regional API | Consumer initiates (managed service ingress) |
| Backends | Private Service Connect network endpoint groups (NEGs) behind a Google Cloud load balancer; reference a producer service attachment or a supported Google API | Consumer initiates; enables customer-owned domains and certificates, consumer-controlled cross-region failover, centralized security and access control |
| Interfaces | Special network interface that refers to a network attachment | Producer initiates (managed service egress); bidirectional; transitive |
| Service attachments | Producer resource that publishes a service; targets a producer load balancer | Defines consumer accept list, NAT subnet, optional DNS domain |

Characteristics of Private Service Connect:

- Service-oriented design: producer services are exposed through load balancers with a single IP address; consumer access is unidirectional and limited to the service IP address, not an entire peered network.
- Explicit authorization: consumers and producers have granular control over which endpoints can connect.
- No shared dependencies: traffic uses NAT, so no IP address coordination is needed between consumer and producer VPC networks.
- Line-rate performance: traffic goes directly from the physical host of the consumer client VM to the physical host of the producer load balancer VM; bandwidth is limited only by those hosts.

Managed service types: published VPC-hosted services (Google services such as GKE, Apigee or Managed Service for Apache Airflow; third-party services; intra-organization services) and Google APIs (endpoints can target a bundle of global Google APIs or a regional / multi-regional Google API; backends can target a global, regional or multi-regional Google API).

## Notes

- Interface vs endpoint: an interface lets a producer VPC network initiate connections to a consumer VPC network, while an endpoint works in the reverse direction. An interface connection is transitive (producer workloads can reach workloads connected to the consumer VPC network); endpoints can only initiate connections to the producer VPC network.
- Using Private Service Connect for Google APIs is an alternative to Private Google Access or the public domain names for Google APIs.
- The producer service's own docs (Cloud SQL, AlloyDB, Memorystore and so on) are in the `gcp-databases-relational` / `gcp-databases-nosql` skills. The full `gcloud compute forwarding-rules` flag list is in the `gcp-compute` skill.
- The source shows diagrams only; the gcloud block above is borrowed from the endpoint page in the same category.
- Source: https://docs.cloud.google.com/vpc/docs/private-service-connect (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-service-connect-architecture.md](./private-service-connect-architecture.md)
- [about-accessing-google-apis-endpoints.md](./about-accessing-google-apis-endpoints.md)
- [about-vpc-hosted-services.md](./about-vpc-hosted-services.md)
- [about-network-attachments.md](./about-network-attachments.md)
- [configure-private-service-connect-services.md](./configure-private-service-connect-services.md)
