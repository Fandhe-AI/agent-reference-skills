---
source: https://docs.cloud.google.com/filestore/docs/creating-instances
---

# Create a Filestore Instance with Deletion Protection and Mount It on a VM

Create a regional Filestore instance with IP-based access rules and deletion protection, then mount the NFS file share on a Compute Engine VM.

## Signature / Usage

### Create the instance

Enable the Filestore API first and make sure your zonal or regional quota is above `0`. Creation takes 15 minutes to one hour.

Adapted (not in the official docs): removed the invalid `reserved-ip-range="10.0.7.0/29"` (a /29 block is for Basic tier only) so Filestore allocates the range, and joined the wrapped `--deletion-protection-reason` string onto one line.

```bash
gcloud filestore instances create render1 \
  --project=myproject \
  --region=us-central1 \
  --tier=REGIONAL \
  --performance=max-iops-per-tb=17000 \
  --network=name="default" \
  --flags-file=nfs-export-options.json \
  --deletion-protection \
  --deletion-protection-reason="All genomics data must adhere to current organization policies."
```

`nfs-export-options.json`:

Adapted (not in the official docs): added a third rule granting `admin` access (`READ_WRITE` + `NO_ROOT_SQUASH`) to a single admin client, `10.0.0.10/32`, because the page requires at least one `admin` rule at instance creation and the source's two rules (`editor` and `admin-viewer`) include none; replace the address with your admin VM's internal IP.

```json
{
  "--file-share":
    {
      "capacity": "2048",
      "name": "my_vol",
      "nfs-export-options": [
        {
          "access-mode": "READ_WRITE",
          "ip-ranges": [
            "10.0.0.0/29",
            "10.2.0.0/29"
          ],
          "squash-mode": "ROOT_SQUASH",
          "anon_uid": 1003,
          "anon_gid": 1003
        },
        {
          "access-mode": "READ_ONLY",
          "ip-ranges": [
            "192.168.0.0/26"
          ],
          "squash-mode": "NO_ROOT_SQUASH"
        },
        {
          "access-mode": "READ_WRITE",
          "ip-ranges": [
            "10.0.0.10/32"
          ],
          "squash-mode": "NO_ROOT_SQUASH"
        }
      ]
    }
}
```

### Install the NFS client and mount (Debian/Ubuntu)

```bash
sudo apt-get -y update &&
sudo apt-get install nfs-common
```

Create a local mount point and mount the share. `mount-point-directory` is the directory to create (for example `/mnt/filedir`), `ip-address` is the instance's IP address and `file-share` is the share name. The source says the IP address and share name are shown on the Filestore instances page, in the `IP_ADDRESS` field of `gcloud filestore instances list`, and in the `ipAddresses` section of `gcloud filestore instances describe`.

```bash
sudo mkdir -p mount-point-directory
sudo mount -o rw ip-address:/file-share mount-point-directory
```

The source's example for an instance with IP `10.0.1.2` and share `share1`, mounted on an existing `/mnt/render` directory:

```bash
sudo mount 10.0.1.2:/share1 /mnt/render
```

For the instance created above, the share name is `my_vol` and the IP address is the one shown for `render1`. Mount from a VM whose internal IP address is inside one of the `ip-ranges` in `nfs-export-options.json`; other clients are not allowed by those rules.

```bash
df -h --type=nfs
```

## Options / Props

| Item | Value |
|---|---|
| `--tier` | Cannot be changed after creation |
| Regional capacity | 100 GiB to 10,239 GiB (1 GiB step), or 10 TiB to 100 TiB (2.5 TiB step) |
| Reserved IP range | `/29` for basic, `/26` for zonal, regional and enterprise (the gcloud help says `/24`; see Notes); immutable |
| Access rules | Up to 64 IPs or CIDR blocks across at most 10 rules (gcloud); `ROOT_SQUASH` or `NO_ROOT_SQUASH` (default); `anon_uid` / `anon_gid` default `65534`; at least one `admin` rule (`READ_WRITE` + `NO_ROOT_SQUASH`) at creation |
| Recommended mount options | `hard`, `timeo=600`, `retrans=3`, `rsize=524288`, `wsize=524288` |

## Notes

- By default an instance grants root-level read and write to all clients in the same project and VPC network; add IP-based rules to restrict.
- Corrected from the official docs: the regional example passed `--network=name="default",reserved-ip-range="10.0.7.0/29"` (described as "Reserved IP address range is `10.0.7.0/29`"), but a /29 block is valid only for Basic tier; the creating-instances page requires a block size of 26 for zonal, regional and enterprise instances. `reserved-ip-range` is optional (per the `gcloud filestore instances create` help), so it is removed and Filestore allocates a free range, which the page recommends.
- Source inconsistency: for a directly specified CIDR `reserved-ip-range`, the creating-instances page requires a block size of 26 for zonal, regional and enterprise instances, while the `gcloud filestore instances create` help says a /24 block for High Scale, Zonal, Enterprise or Regional tier (/29 only for Basic). Check the current requirement before setting one.
- Corrected from the official docs: the page says "At least one rule must grant `admin` access at the time of instance creation", but its `nfs-export-options.json` example contains only an `editor` rule (`"access-mode": "READ_WRITE"` with `"squash-mode": "ROOT_SQUASH"`) and an `admin-viewer` rule (`"access-mode": "READ_ONLY"` with `"squash-mode": "NO_ROOT_SQUASH"`). A third `admin` rule (`READ_WRITE` + `NO_ROOT_SQUASH`) for the single admin client `10.0.0.10/32` (an example address, not from the source) is added; replace it with your admin VM's internal IP. The rule can be removed once the instance is created.
- The share is unmounted when the VM reboots; use `/etc/fstab` or `autofs` to persist. The source recommends a `n1-standard-8` VM or larger.
- `--deletion-protection` is disabled by default and `--deletion-protection-reason` records the justification. Try creation and deletion on a disposable instance first.
- Adapted from the official docs: the `--deletion-protection-reason` quoted value was wrapped across two lines in the source.
- Filestore is managed NFS file storage, not an object API; distinct from Cloud Storage buckets and Cloud Storage FUSE. Filestore roles are on the Filestore IAM page (https://docs.cloud.google.com/filestore/docs/iam); IAM basics are in `gcp-foundation`, gcloud setup in `gcp-cli`.
- Source: https://docs.cloud.google.com/filestore/docs/creating-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/filestore/docs/mounting-fileshares (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [managed-lustre-create-and-connect.md](./managed-lustre-create-and-connect.md)
- https://docs.cloud.google.com/filestore/docs/mounting-fileshares
