---
source: https://docs.cloud.google.com/run/docs/configuring/networking-best-practices
---

# Networking best practices for Cloud Run

Practices for outbound traffic and VPC connectivity: monitor IP usage, avoid IPv4 and port exhaustion, isolate internet egress, improve throughput, keep the default MTU, and control cost.

## Signature / Usage

### Estimate IP usage (Direct VPC egress)

Look up the number of container instances with the Cloud Monitoring metric `run.googleapis.com/container/instance_count` in Metrics explorer and multiply by 2 to estimate IP addresses in use.

### Isolate outbound internet traffic

Do not use the default shared IP pool for IP-reputation-sensitive or high-volume probing workloads. Use Direct VPC egress with `--vpc-egress=all-traffic` and Cloud NAT with dedicated static IPs.

```bash
gcloud run deploy SERVICE_NAME \
--image=IMAGE_URL \
--network=NETWORK \
--subnet=SUBNET \
--region=REGION \
--vpc-egress=all-traffic
```

Snippet taken from https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip (the source page itself has no code).

### Google APIs over Direct VPC egress (example: Cloud Storage)

- `--vpc-egress=private-ranges-only` (default): enable Private Google Access and configure DNS so the target domain (such as `storage.googleapis.com`) maps to `199.36.153.8/30` or `199.36.153.4/30`.
- `--vpc-egress=all-traffic`: enable Private Google Access.

## Options / Props

| Topic | Guidance |
|-------|----------|
| IPv4 ranges | RFC 1918 plus RFC 6598 (`100.64.0.0/10`, recommended first) and Class E / RFC 5735 (`240.0.0.0/4`, over 268 million addresses; not supported on Windows or some on-premises hardware) |
| On-premises accepts only RFC 1918 | Hybrid NAT (small RFC 1918 range) or expose the on-premises service as a Private Service Connect hybrid service |
| Dual-stack | IPv6 does not reduce IPv4 exhaustion but avoids future problems |
| Port exhaustion | Use connection pooling and reuse; high connection rates to one IP can exhaust outbound ports and cause connection refused errors |
| Scanning / high-connection workloads via Cloud NAT | Allocate enough static IPs and configure port reservation |
| Execution environment | Use the second generation execution environment with Direct VPC egress (faster networking, especially with packet loss) |
| Internet egress | `all-traffic` plus Cloud NAT (Public NAT) |
| MTU | Do not change the VPC network MTU; use the default of 1,460 bytes |

Cost considerations: co-locate Cloud Run with backends and buckets in the same region (same-region transfer between Google Cloud resources is free); switch from connectors to Direct VPC egress (scales to zero, no idle connector cost); use Cloud CDN for cacheable content; inbound traffic is free and 1 GiB of free outbound internet transfer per month within North America.

## Notes

- Comparison (from the source): Direct VPC egress is recommended over Serverless VPC Access connectors for faster egress throughput and because it scales to zero, eliminating connector baseline compute and idle costs.
- Source inconsistency: this page and the static outbound IP page recommend Direct VPC egress with Cloud NAT for internet egress (https://docs.cloud.google.com/run/docs/configuring/networking-best-practices, https://docs.cloud.google.com/run/docs/configuring/static-outbound-ip), while the Direct VPC egress page warns of cold-start delays of 30s or more with Cloud NAT and recommends Serverless VPC Access connectors with Cloud NAT for better startup performance (https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc).
- Internet egress needs Public NAT: the source links to "Cloud NAT Direct VPC egress interactions" for setting up "Public NAT or Private NAT", but Private NAT translates traffic between private networks (for example Hybrid NAT to on-premises RFC 1918 destinations) and does not provide internet access.
- Running scanning or load testing over the default shared pool degrades IP reputation, can disrupt other customers in violation of the Google Cloud Acceptable Use Policy, and might get your workload throttled or suspended.
- A reputation-sensitive workload on the shared pool can trigger external WAF blocks or `HTTP 403` errors caused by other tenants' noisy traffic.
- Source: https://docs.cloud.google.com/run/docs/configuring/networking-best-practices (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-direct-vpc.md](./vpc-direct-vpc.md)
- [static-outbound-ip.md](./static-outbound-ip.md)
- [vpc-connectors.md](./vpc-connectors.md)
