---
source: https://docs.cloud.google.com/dns/docs/policies-overview
---

# DNS policies overview

Cloud DNS supports three policy types that can be used at the same time: server policies, response policies, and routing policies.

## Signature / Usage

### Create a response policy

Snippet taken from the `gcloud dns response-policies create` help EXAMPLES (see Notes).

```bash
gcloud dns response-policies create myresponsepolicy \
    --description='My new response policy.' --networks=''
```

## Options / Props

| Policy type | Purpose |
|---|---|
| Server policies | Apply private DNS configuration to a VPC network (DNS forwarding, logging). An inbound server policy lets on-premises workloads resolve names on Google Cloud; an outbound server policy lets workloads use an on-premises resolver. |
| Response policies | Override private DNS responses based on the query name, by using rules instead of records. If a rule affects the incoming query it is processed; otherwise the lookup proceeds normally. Similar in effect to DNS response policy zones (RPZ), but response policies are not DNS zones and are managed separately. |
| Routing policies | Steer traffic for a resource record set based on the query and other factors: weighted round robin (WRR), geolocation, or failover. |

### Routing policies can be used to

| Details |
|---|
| Steer traffic from a geographical location to a content delivery network (CDN) provider. |
| Route on-premises traffic to Google Cloud load balancers based on the query's source region. |
| Serve traffic originating from a continent by services in the same continent. |
| Route traffic to different service providers on a WRR basis. |
| Onboard new services with a percentage of the total traffic. |

## Notes

- Google Cloud DNS, not Cloudflare DNS.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/dns/response-policies/create (gcloud 593.0.0 help); the `$` prompt is removed. The full flag list is in the generated gcloud reference.
- Source: https://docs.cloud.google.com/dns/docs/policies-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [server-policies-overview.md](./server-policies-overview.md)
- [routing-policies-overview.md](./routing-policies-overview.md)
- [overview.md](./overview.md)
