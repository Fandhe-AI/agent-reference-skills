---
source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-storage-pool
---

# Prepare NetApp Volumes Networking, Restrict Access and Mount a Volume

Set up private services access for NetApp Volumes, restrict a volume's export policy, install the NFS client and look up the mount command. The pool and volume themselves are created in the console.

## Signature / Usage

### Set up private services access

Enable the Service Networking API (`servicenetworking.googleapis.com`) first. Reserve an address range (replace `PROJECT_ID` and `VPC`):

```bash
gcloud compute addresses create netapp-addresses-production-vpc1 \
 --project=PROJECT_ID \
 --global \
 --purpose=VPC_PEERING \
 --prefix-length=24 \
 --network=VPC \
 --no-user-output-enabled
```

Peer the networks. Replace `ADDITIONAL_IP_RANGES` with a comma-separated list of additional address ranges to peer, or remove `,ADDITIONAL_IP_RANGES` to peer only with the range created above:

```bash
gcloud services vpc-peerings connect \
 --project=PROJECT_ID \
 --service=netapp.servicenetworking.goog \
 --ranges=netapp-addresses-production-vpc1,ADDITIONAL_IP_RANGES \
 --network=VPC
```

Enable custom route propagation on the `sn-netapp-prod` peering that NetApp Volumes creates (with PUPI, the source uses the `import-subnet-routes-with-public-ip` and `export-subnet-routes-with-public-ip` parameters instead):

```bash
gcloud compute networks peerings update sn-netapp-prod \
  --project=PROJECT_ID \
  --network=VPC  \
  --import-custom-routes \
  --export-custom-routes
```

### Create the pool and volume

Use the console quickstarts: choose location and service level, capacity, the VPC from above, and for the volume a share name, NFSv3 and an export rule. The sources give no gcloud pool or volume creation command.

### Restrict the export policy (one rule)

```bash
gcloud netapp volumes update VOLUME_ID \
  --project=PROJECT_ID \
  --location=LOCATION \
  --export-policy=access-type=ACCESS_TYPE,allowed-clients=ALLOWED_CLIENTS_IP_ADDRESSES,has-root-access=TRUE_OR_FALSE,nfsv3=NFSV3,nfsv4=NFSV4
```

`ALLOWED_CLIENTS_IP_ADDRESSES` holds one address or range here. For several comma-separated addresses, the source switches the separator with gcloud escaping, for example `--export-policy=^:^access-type=READ_WRITE:allowed-clients="10.10.5.3,10.10.5.9":nfsv3=true:nfsv4=true:has-root-access=true`; without it gcloud cannot tell the commas apart.

### Install the NFS client and get the mount command

```bash
sudo apt-get install nfs-common
```

```bash
gcloud netapp volumes describe VOLUME_NAME \
  --project=PROJECT_ID \
  --location=LOCATION \
  --format="value(mountOptions.instructions)"
```

Create a directory and run the mount command that the describe output prints.

## Options / Props

| Item | Detail |
|---|---|
| Service levels | Flex Unified (Default-mode or ONTAP-mode), Flex File, Standard, Premium, Extreme |
| Firewall ports | `111`, `635`, `2049` TCP/UDP; `4045`, `4046` TCP/UDP for NFSv3 only |
| `--prefix-length` | `24` in the source example for the address range |

## Notes

- Flex File: effective September 15, 2026 you cannot create new Flex File storage pools.
- The IP range used by volumes cannot be changed once in use.
- Deleting a pool or volume deletes its contents; try it on disposable resources first.
- The source gives no literal `mount` line; use the command from `mountOptions.instructions`.
- NetApp Volumes is managed file storage, not an object API; distinct from Cloud Storage buckets and Cloud Storage FUSE. IAM and org-level setup are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-storage-pool (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-volume (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/mount-volume (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/plan-and-prepare/networking (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [filestore-create-and-mount.md](./filestore-create-and-mount.md)
- https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients
