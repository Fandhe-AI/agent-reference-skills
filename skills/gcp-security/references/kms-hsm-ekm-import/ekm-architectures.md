---
source: https://docs.cloud.google.com/kms/docs/ekm-architectures
---

# Reference architectures for Cloud External Key Manager

Using Cloud EKM trades workload reliability for data protection control: every cryptographic request becomes an operation on the external key, so an unavailable EKM service can make Google Cloud service data inaccessible (it looks like a disabled Cloud KMS key; errors appear in Cloud KMS data access audit logs). This page gives best practices and three reference architectures for `EXTERNAL` and `EXTERNAL_VPC` keys.

## Signature / Usage

In the VPC-based architectures, Cloud EKM reaches the EKM service through an EKM connection that points at a Service Directory service (for example the internal load balancer's IP and port):

```bash
gcloud beta kms ekm-connections create EKM_CONNECTION \
    --location LOCATION \
    --service-directory-service SERVICE_DIRECTORY_SERVICE \
    --hostname HOSTNAME \
    --server-certificates-files SERVER_CERTIFICATE_FILES \
    --key-management-mode manual
```

### Best practices

- **Low-latency, reliable network**: each EKM-bound call has a 150 millisecond timeout, measured from Cloud KMS in the location of the key (for a multi-region, from the region where Cloud KMS receives the request). Serve the EKM geographically close to the key's location; prefer Cloud Interconnect (or HA VPN over the internet); use Cloud VPN in the region nearest the EKM when needed; use Premium Tier when traffic transits the internet; when calling the Cloud KMS API directly for Cloud EKM keys use a client deadline of at least 10 seconds.
- **High availability**: at least two EKM replicas (multi-region locations: at least two separate geographic locations with at least two replicas each); each replica of at least three appliances/machines/VM hosts (N+2); limit control plane blast radius (slow propagation, shards, previews, canarying); holistic health checks; failover via load balancing; overload protection; key durability with multi-location backups and recoverable deletion.
- **Detect and mitigate quickly**: report error-rate and latency metrics; track MTTD and MTTR.

## Options / Props

### Reference architecture comparison

| Option | Direct connection | Load balanced from internet | Load balanced in a VPC network | Fully-managed EKM provided by partner |
|---|---|---|---|---|
| Internet or VPC network | VPC | Internet | VPC | Internet |
| Load balancer in Google Cloud | No | Yes | Yes | No |
| On-premises load balancer required | Yes | No | No | Yes (managed by partner) |
| Supports multi-regional Cloud KMS locations | No | Yes | No | Yes |
| Recommended for | High throughput applications where the EKM service runs in a single site | When multi-regional Cloud KMS keys are required | Most EKM services where you deploy your own EKM | Using a partner's EKM instead of deploying your own |

## Notes

- Direct connection over Cloud VPN or Cloud Interconnect: no intermediate hops. Use the 99.9% single-region availability configuration where possible; the 99.99% configuration needs Cloud Interconnect in multiple regions. With multiple data centers you must configure load balancers in all of them with the same anycast IP, and failover is limited to route availability.
- Load balanced from internet: an external proxy Network Load Balancer with hybrid connectivity NEGs per replica and an external IP; not region-bound, so it suits multi-regional keys, but it has no primary/failover backend configuration (traffic is spread evenly across backends in a region).
- Load balanced in a VPC network: an internal passthrough Network Load Balancer with a VM instance group (for example Nginx as a TCP load balancer) proxying to on-premises backends; fails over by backend health. Keys accessed over a VPC network must use a regional Cloud KMS location. External keys in a multi-regional location must use the internet.
- Because EKM keys are the only copy of the key material, losing them is unrecoverable; make EKM key deletion recoverable.
- Source: https://docs.cloud.google.com/kms/docs/ekm-architectures (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kms/docs/create-ekm-connection (EKM connection for manually managed external keys).
- Load balancer and Cloud Interconnect setup is covered by the `gcp-load-balancing` and `gcp-networking` skills.

## Related

- [ekm.md](./ekm.md)
- [create-ekm-connection.md](./create-ekm-connection.md)
