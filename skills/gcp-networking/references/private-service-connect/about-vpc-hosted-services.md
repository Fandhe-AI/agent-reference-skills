---
source: https://docs.cloud.google.com/vpc/docs/about-vpc-hosted-services
---

# About published services

As a service producer, you publish a service with Private Service Connect by creating one or more dedicated NAT subnets and a service attachment that refers to them. Consumers reach it through endpoints (forwarding-rule based) or backends (load-balancer based) by using internal IP addresses in their own VPC networks.

## Signature / Usage

Snippet taken from the EXAMPLES section of `gcloud compute service-attachments create` (gcloud 593.0.0 help).

```bash
gcloud compute service-attachments create \
    SERVICE_ATTACHMENT_NAME --region=us-central1 \
    --producer-forwarding-rule=MY_ILB \
    --connection-preference=ACCEPT_AUTOMATIC \
    --nat-subnets=MY_SUBNET1,MY_SUBNET2
```

## Options / Props

### Service attachments

| Service attachments |
|---|
| Target service is one of: the forwarding rule of a load balancer, or a Secure Web Proxy instance. Only one target service per attachment; multiple attachments can share a target. |
| URI format: `projects/SERVICE_PROJECT/regions/REGION/serviceAttachments/SERVICE_NAME`. |
| Target can be updated without recreating the attachment (service mutability). Connections are kept and retain their `pscConnectionId`; traffic is disrupted briefly. |
| Service mutability limits: the attachment must keep a target; the new target needs the same VPC network, region and IP version; a port mapping target cannot be replaced while the attachment has connections from backends; `allow-psc-global-access` of old and new targets must match (change it in a separate operation afterwards); to or from internal protocol forwarding requires gcloud or API. |
| Supported replacements: any of internal passthrough Network Load Balancer, internal protocol forwarding (target instance), port mapping services, regional internal Application Load Balancer and regional internal proxy Network Load Balancer to any of the same five; cross-region internal Application Load Balancer and Secure Web Proxy can neither be replaced nor be a replacement. |

### NAT subnets

| Rule | Value |
|---|---|
| Per attachment | Can have multiple NAT subnets; more can be added at any time without interrupting traffic |
| Per subnet | A NAT subnet cannot be used in more than one attachment; cannot host VMs or forwarding rules |
| IPs consumed | By default one NAT IP per endpoint or backend; can be configured to two. With connection propagation, one or two extra per VPC spoke per endpoint |
| Unusable IPs | Four per subnet (a `/29` has four usable, a `/24` has 252) |
| UDP mapping idle timeout | 30 seconds, not configurable |
| TCP established idle timeout | 20 minutes, not configurable |
| TCP transitory idle timeout | 30 seconds, not configurable |
| 5-tuple reuse delay | 65 seconds |
| IP fragments | Not supported by SNAT |

### Maximum connections

| NAT IP addresses per endpoint | Backend VM vCPUs | Max simultaneous IPv4 connections per endpoint |
|---|---|---|
| 1 (default) | Any | 64,512 |
| 2 | 1 to 7 | 65,535 |
| 2 | 8 to 15 | 98,302 |
| 2 | 16 or more | 131,070 |

### Support for endpoints (target producer)

| Producer type | Consumer global access | Producer backends | PROXY protocol | Endpoint IP versions |
|---|---|---|---|---|
| Cross-region internal Application Load Balancer | Yes | GCE_VM_IP_PORT zonal NEGs, hybrid NEGs, serverless NEGs, PSC NEGs, instance groups | No | Producer IPv4; IPv4 or IPv6 endpoints |
| Internal passthrough Network Load Balancer | Only if global access enabled on the load balancer (known issue) | GCE_VM_IP zonal NEGs, instance groups | Yes | Producer IPv4 and IPv6 |
| Internal protocol forwarding (target instance) | Only if global access enabled on the producer forwarding rule (known issue) | n/a | Yes | IPv4 and IPv6 |
| Port mapping services | Only if global access enabled on the producer forwarding rule | Port mapping NEG | Yes | IPv4 and IPv6 |
| Regional internal Application Load Balancer | Only if global access enabled before the attachment is created | As cross-region plus regional internet NEGs | No | IPv4 |
| Regional internal proxy Network Load Balancer | Only if global access enabled before the attachment is created | GCE_VM_IP_PORT zonal NEGs, hybrid NEGs, PSC NEGs, instance groups | No | IPv4 |
| Secure Web Proxy | No | n/a | No | IPv4 |

### Support for backends (consumer load balancer)

| Consumer load balancer | Protocols | IP version | Cross-region failover |
|---|---|---|---|
| Cross-region internal Application Load Balancer | HTTP, HTTPS, HTTP2 | IPv4 | Yes |
| Cross-region internal proxy Network Load Balancer | TCP | IPv4 | Yes |
| Global external Application Load Balancer (classic not supported; regional internal proxy Network Load Balancer producers not supported) | HTTP, HTTPS, HTTP2 | IPv4 | Yes |
| Global external proxy Network Load Balancer (classic not supported; use gcloud or API to associate a PSC NEG) | TCP/SSL | IPv4 | Yes |
| Regional external Application Load Balancer | HTTP, HTTPS, HTTP2 | IPv4 | No |
| Regional external proxy Network Load Balancer | TCP | IPv4 | No |
| Regional internal Application Load Balancer | HTTP, HTTPS, HTTP2 | IPv4 | No |
| Regional internal proxy Network Load Balancer | TCP | IPv4 | No |

### Producer port configuration (internal passthrough Network Load Balancer, consumer backends)

| Item | Details |
|---|---|
| Single port | consumer uses the same port. Multiple ports: port `443` if included, otherwise the first port after alphabetical sort (for `80` and `1111` the consumer uses `1111`). Changing backend ports can interrupt consumers. |
| All ports | the consumer must specify a producer port in the NEG; otherwise it uses port `1`, which does not work. |

### IP version translation

| IP version translation |
|---|
| Endpoint IP version follows the consumer forwarding rule address (IPv4 or IPv6, not both). Supported: IPv4 to IPv4, IPv6 to IPv6, IPv6 to IPv4 (automatic translation). An IPv4 endpoint cannot target an IPv6 service attachment (error: `Private Service Connect forwarding rule with an IPv4 address cannot target an IPv6 service attachment.`). Backend-to-attachment connections require IPv4 on both sides. |

### Other

| Item | Details |
|---|---|
| Shared VPC | the producer forwarding rule uses an address from the Shared VPC network and the PSC subnet comes from it; both subnets must be shared with the service project. |
| Quota | `PSC ILB consumer forwarding rules per producer VPC network` (endpoints plus propagated connections, counted until deleted). |
| Limitations | load balancers with protocol `L3_DEFAULT` are not supported; Packet Mirroring cannot mirror PSC published service traffic; attachments to internal protocol forwarding rules require gcloud or API. |

## Notes

- NAT subnets: If all NAT IPs are used, additional connections fail. Monitor metric `private_service_connect/producer/used_nat_ip_addresses`, watch for the **Needs attention** connection status, and use connection limits for multi-tenant services.
- Maximum connections: Simultaneous connections through an endpoint or backend are bounded by client ephemeral ports (Linux `net.ipv4.ip_local_port_range`; source ports 1024 to 65535, 64,512 per source IP, destination IP and protocol, including TCP `TIME_WAIT`), NAT IP source ports (64,512 per NAT IP), and a baseline per-backend limit of 65,535 connections (can increase with vCPUs for IPv4 backend VMs; not typically restrictive for Envoy-proxy services).
- Maximum connections: No overall limit across all producer VMs; the practical bound is the number of VMs or Envoy proxies times the per-backend limit.
- Support for endpoints (target producer): All endpoint targets support hybrid access and automatic DNS configuration (IPv4-only) and NCC connection propagation (IPv4 only); none support VPC Network Peering access.
- Support for backends (consumer load balancer): Producer load balancers for backends: cross-region internal Application Load Balancer (TCP, HTTP, HTTPS, HTTP/2, gRPC; one, multiple or all ports; no Composite Health), internal passthrough Network Load Balancer (TCP; Composite Health), regional internal Application Load Balancer (HTTP, HTTPS, HTTP/2; single port; Composite Health), regional internal proxy Network Load Balancer (TCP; single port; Composite Health; no connections from consumer global external Application Load Balancers), Secure Web Proxy (no Composite Health). PROXY protocol is not supported for any producer behind backends. For global or cross-region consumer backends, global access must be on for the producer load balancer before the attachment is created; do not disable it while global-access PSC NEGs connect.
- PROXY protocol: PROXY protocol v2 reveals the consumer source IP and `pscConnectionId`; enable it when publishing. It applies to new connections only and the backend must be configured to parse it, otherwise requests may be malformed. The ID is a TLV: type 1 byte `0xE0` (PP2_TYPE_GCP), length 2 bytes `0x8`, value 8 bytes (`pscConnectionId`, network order). `pscConnectionId` can be reused (same IP re-created in a network; after a seven-day wait following network deletion). `pscServiceAttachmentId` (16 bytes) is available from the attachment but is not in the header.
- Multi-region failover: deploy and publish the service in each region; consumers use a PSC NEG per region plus a global backend service behind a load balancer that supports cross-region failover.
- VPC Service Controls is compatible; establishing a connection between projects in different perimeters needs no explicit egress policy. VPC Flow Logs can be enabled on backend subnets; flows on the PSC subnet itself are not logged because no VMs connect to it.
- PROXY protocol is not a substitute for TLS or application-layer authentication.
- Updating or deleting attachments, NAT subnets or target services can interrupt consumer traffic; try it on a disposable resource first.
- The source has no code; the gcloud example is borrowed from the gcloud 593.0.0 help. The full flag list is in the `gcp-compute` skill. The producer service's own docs (Cloud SQL, AlloyDB, Memorystore and so on) are in `gcp-databases-relational` / `gcp-databases-nosql`. Pricing is on the VPC pricing page and is not copied.
- Source inconsistency: the table gives `131,070` as the maximum simultaneous IPv4 connections per endpoint with 2 NAT IP addresses and 16 or more vCPUs, but the same page says each NAT IP address provides 64,512 source ports, so two NAT IP addresses bound the NAT-port limit at 129,024; the page also says the table shows the "potential maximum" only when it "isn't constrained by the other limits described in this section". Safe reading: treat 129,024 as the NAT-port bound.
- Source: https://docs.cloud.google.com/vpc/docs/about-vpc-hosted-services (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/service-attachments/create (gcloud 593.0.0 help).

## Related

- [private-service-connect.md](./private-service-connect.md)
- [configure-private-service-connect-services.md](./configure-private-service-connect-services.md)
- [private-service-connect-architecture.md](./private-service-connect-architecture.md)
- Controlling access: https://docs.cloud.google.com/vpc/docs/about-controlling-access-published-services
