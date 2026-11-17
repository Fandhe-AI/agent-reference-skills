---
source: https://docs.cloud.google.com/vpc/docs/private-service-connect-architecture
---

# Private Service Connect architecture and performance

Private Service Connect is implemented with Andromeda, Google Cloud's software-defined networking (SDN) distributed control plane and data plane. Packets are processed on the physical servers that host VMs, so there are no centralized bottlenecks on intermediate proxies or appliances.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (list endpoints, which are forwarding rules that target service attachments).

```bash
gcloud compute forwarding-rules list \
    --filter 'target~serviceAttachments'
```

## Options / Props

| Property | Behavior |
|---|---|
| Bandwidth | No additional bandwidth limits imposed by Private Service Connect; the combined bandwidth of the source and destination VM interfaces is effectively the limit |
| Latency | Minimal; the traffic path is the same as VM-to-VM traffic within a single VPC network, and network address translation is the only additional processing step, done on the destination host |
| Client-side load balancing | Applied on the source host (`Host 1`), based on location, load and health |
| Encapsulation | Inner packet from `VPC1` is encapsulated in an Andromeda header with the destination network of `VPC2` |
| NAT | Destination host (`Host 2`) applies SNAT and DNAT: the NAT subnet is the packet source range and the producer load balancer IP address is the destination |

## Notes

- Logically there are consumer endpoints and producer load balancers; physically traffic goes directly from the host of the client VM to the host of the producer load balancer VM.
- Exceptions where traffic is processed by intermediate routing hosts: inter-regional traffic and very small or intermittent flows. Andromeda dynamically offloads flows to direct host-to-host networking whenever possible.
- The source contains no code; the gcloud block above is borrowed from the endpoint page in the same category.
- The producer service's own docs (Cloud SQL, AlloyDB, Memorystore and so on) are in the `gcp-databases-relational` / `gcp-databases-nosql` skills.
- Source: https://docs.cloud.google.com/vpc/docs/private-service-connect-architecture (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/vpc/docs/configure-private-service-connect-services (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-service-connect.md](./private-service-connect.md)
- [about-vpc-hosted-services.md](./about-vpc-hosted-services.md)
- Compatibility: https://docs.cloud.google.com/vpc/docs/private-service-connect-compatibility
