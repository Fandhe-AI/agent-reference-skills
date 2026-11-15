---
source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-volume
---

# Quickstart: Create a volume

Console quickstart for creating a first NFSv3 volume in a storage pool. Not applicable to Flex Unified ONTAP-mode.

## Signature / Usage

Update a volume's export policy from the CLI (one rule):

```bash
gcloud netapp volumes update VOLUME_ID \
  --project=PROJECT_ID \
  --location=LOCATION \
  --export-policy=access-type=ACCESS_TYPE,allowed-clients=ALLOWED_CLIENTS_IP_ADDRESSES,has-root-access=TRUE_OR_FALSE,nfsv3=NFSV3,nfsv4=NFSV4
```

Snippet taken from https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (the quickstart twin has no code).

## Options / Props

| Console field | Detail |
|---|---|
| Volume name, Description | Name required; description optional |
| Share name | Corresponds to the export path for an NFS volume |
| Volume type | Select the volume type |
| Capacity | Volume capacity |
| Protocol | Quickstart recommends NFSv3 first |
| Export rule | Add an export rule for allowed clients |

## Notes

- The first volume creation takes a few minutes; each subsequent volume takes a few seconds.
- Clean up: select the volume, Delete, type the volume name to confirm. The volume and its contents are deleted. Destructive: try it on a disposable volume first.
- No gcloud volume-creation command appears in the source twin.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/get-started/quickstarts/create-volume (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (borrowed snippet)

## Related

- [create-storage-pool.md](./create-storage-pool.md)
- [mount-volume.md](./mount-volume.md)
- [connect-nfs-clients.md](./connect-nfs-clients.md)
