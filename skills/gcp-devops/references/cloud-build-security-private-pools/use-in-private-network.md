---
source: https://docs.cloud.google.com/build/docs/private-pools/use-in-private-network
---

# Use private pools in a private network

Commonly used private pool networking setups: the default network, static internal IP ranges, VPC and shared VPC peering, private GKE clusters, VPC Service Controls, removing public IPs, restricting public egress, enforcing private pool use, private Cloud DNS zones, and NAT.

## Signature / Usage

### Remove public IPs and block public egress

Snippet taken from https://docs.cloud.google.com/build/docs/private-pools/using-vpc-service-controls (private pool config file with `egressOption: NO_PUBLIC_EGRESS`).

```yaml
privatePoolV1Config:
  networkConfig:
    egressOption: NO_PUBLIC_EGRESS
    peeredNetwork: PEERED_NETWORK
  workerConfig:
    diskSizeGb: 'PRIVATE_POOL_DISK_SIZE'
    machineType: PRIVATE_POOL_MACHINE_TYPE
```

## Options / Props

| Setup | What the source says |
|---|---|
| Default network | Used by default when you create a private pool (the network in which private pools reside). Use it if builds need the public internet, you want configurable machine types and sizes, static internal IP ranges or other private pool features, and builds do **not** need resources in your private VPC network |
| Static internal IP range | When you set up a private connection between your VPC network and the pool's VPC network you can create allocated IP address ranges with a defined CIDR range for the pool, and a smaller CIDR range within an allocated range. Needed for example when calling a service that allowlists a defined IP range |
| Running in a VPC network | Create a private connection between the private pool and your managed VPC network so the pool can reach private resources such as source repositories, artifact repositories, databases, secrets instances and runtimes |
| Shared VPC | The project where you create the private pool must be attached to the host project that contains the shared VPC network |
| Peered / shared VPC and Google-managed services | Private pools cannot reach Google-managed services (private GKE clusters, private Cloud SQL) peered into your shared VPC because of the lack of transitive peering. If one connection uses a VPN (or Interconnect) instead of VPC peering, the networks can connect |
| Specific region | Create the pool in one of the supported regions (https://docs.cloud.google.com/build/docs/locations); built images and artifacts can be stored in Artifact Registry repositories and Cloud Storage buckets in specified regions |
| Private GKE cluster with a public endpoint | Create the private pool in the default network with public internet access and define a static internal IP range for the pool to allowlist for access to the cluster |
| Private GKE cluster with a private endpoint | Follow https://docs.cloud.google.com/build/docs/private-pools/accessing-private-gke-clusters-with-cloud-build-private-pools |
| VPC Service Controls | Secure perimeter to guard against data exfiltration; see using-vpc-service-controls.md |
| Removing public IPs | Set `egressOption` in the private pool config file to `NO_PUBLIC_EGRESS`; this restricts the pool from reaching the public internet |
| Restricting egress to the public internet | (1) `NO_PUBLIC_EGRESS` removes all access to the public internet; (2) create the pool within a VPC Service Controls perimeter; (3) customize firewall rules on your VPC network to restrict egress |
| Enforcing private pool usage | Enforce the `constraints/cloudbuild.allowedWorkerPools` organization policy constraint so builds in your organization cannot use the default pool and only use a private pool |
| Private Cloud DNS zones | You can share a private Cloud DNS zone with private pools; see https://docs.cloud.google.com/vpc/docs/configure-private-services-access#dns-peering |
| Running behind a NAT | The IP range of the pool in your VPC is controllable but the external IP addresses (if enabled) are not. To reach a resource from a reserved IP, create a proxy VM and route traffic through it: https://docs.cloud.google.com/build/docs/private-pools/access-external-resources-using-static-external-ip |

## Notes

- Source: https://docs.cloud.google.com/build/docs/private-pools/use-in-private-network (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source page has no code. Snippet taken from https://docs.cloud.google.com/build/docs/private-pools/using-vpc-service-controls (the YAML above); field rules are in private-pool-config-file-schema.md and the `allowedWorkerPools` commands are in using-vpc-service-controls.md.
- Limits stated on the other private pool pages: up to 10 private pools per project per region; the `peeredNetworkIpRange` prefix length must be at most 29 (a `/29` is the smallest allowed range, eight IPs); the default range is `/24` (see create-manage-private-pools.md and private-pool-config-file-schema.md).
- Enforcing `constraints/cloudbuild.allowedWorkerPools` on a project makes builds in it that try to use the default pool fail, and may break services such as App Engine or Cloud Run functions that implicitly use Cloud Build (see using-vpc-service-controls.md). Organization Policy and VPC peering belong to the `gcp-foundation` and `gcp-networking` skills.

## Related

- [private-pools-overview.md](./private-pools-overview.md)
- [create-manage-private-pools.md](./create-manage-private-pools.md)
- [private-pool-config-file-schema.md](./private-pool-config-file-schema.md)
- [using-vpc-service-controls.md](./using-vpc-service-controls.md)
