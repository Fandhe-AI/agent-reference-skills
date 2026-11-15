---
source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/networking
---

# Configure networking for NetApp Volumes

NetApp Volumes uses private services access (VPC peering) for a private high-throughput, low-latency data path. Set it up once per VPC before creating your first storage pool.

## Signature / Usage

Reserve a CIDR range (minimum `/24`):

```bash
gcloud compute addresses create netapp-addresses-production-vpc1 \
 --project=PROJECT_ID \
 --global \
 --purpose=VPC_PEERING \
 --prefix-length=24 \
 --network=VPC \
 --no-user-output-enabled
```

To choose the base address add `--addresses=192.168.0.0 \`. Peer the networks:

```bash
gcloud services vpc-peerings connect \
 --project=PROJECT_ID \
 --service=netapp.servicenetworking.goog \
 --ranges=netapp-addresses-production-vpc1,ADDITIONAL_IP_RANGES \
 --network=VPC
```

Enable custom route propagation (the `sn-netapp-prod` peering is created by the service):

```bash
gcloud compute networks peerings update sn-netapp-prod \
  --project=PROJECT_ID \
  --network=VPC  \
  --import-custom-routes \
  --export-custom-routes
```

## Options / Props

| Service level | Subrange consumption |
|---|---|
| Standard, Premium, Extreme | Volumes share IPs; a `/28` subrange is shared across volumes and pools; large capacity volumes use `/27`; intercluster, migration, external replication and FlexCache use `/27` |
| Flex Unified | Regular pool: `/28` shared by its volumes; large capacity pool: `/26` |
| Flex File | First pool uses `/28` (one IP for volume access, one for Active Directory); further pools share it until 12 IPs are used, then a new `/28` |

## Notes

- Enable the `servicenetworking.googleapis.com` API. Private connection setup is once per VPC, not per service project or region. For Shared VPC, peer in the host project.
- RFC 1918 or privately used public IP (PUPI) ranges. Standard, Premium, Extreme and Flex File support PUPI (Flex File excludes `6.0.0.0/8` and `7.0.0.0/8`); Flex Unified does not. With PUPI use gcloud (not the console) and `import-subnet-routes-with-public-ip` / `export-subnet-routes-with-public-ip` instead of the custom-routes flags.
- Choose a CIDR that does not collide with on-premises ranges. After the first volume is provisioned you cannot change the CIDR ranges, only add ranges. To modify: delete all volumes, remove the peering, wait at least six hours, create a new peering (destructive; try on a disposable project first).
- You cannot control or change the IP address assigned to a volume. Traffic cannot traverse two consecutive VPC peerings, so clients and Active Directory servers must be in the attached VPC; see https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/connect-additional-networks.
- `Constraint constraints/compute.restrictVpcPeering violated for project` means an org policy restricts peering; get an exception from your organization administrator.
- Different service levels cannot share a subrange (except Standard, Premium and Extreme together); each region and each Shared VPC service project needs its own allocation.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/networking (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-storage-pool.md](./create-storage-pool.md)
- [iam.md](./iam.md)
- [connect-nfs-clients.md](./connect-nfs-clients.md)
