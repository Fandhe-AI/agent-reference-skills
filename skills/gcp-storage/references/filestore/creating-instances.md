---
source: https://docs.cloud.google.com/filestore/docs/creating-instances
---

# Create a Filestore instance

Create a Filestore instance with the Google Cloud console, `gcloud filestore instances create`, or the REST API. Covers naming, tier, capacity, performance, network, file share, IP-based access control, CMEK and deletion protection.

## Signature / Usage

### Before you begin

Enable the Filestore API (it can take a few minutes to appear). The quota for zonal or regional instances starts at `0`; request and receive a quota increase first (https://docs.cloud.google.com/filestore/docs/requesting-quota-increases). Enterprise and high scale SSD tier instances cannot be created from the console; use the API or `gcloud`. Creation in a new project can take longer than expected.

### gcloud: create an instance

Synopsis from the source (arguments in square brackets are optional; this is not a runnable command, see the example below for one):

```text
gcloud filestore instances create INSTANCE_ID \
    [--project=PROJECT_ID] \
    [--location=LOCATION] \
    [--description=DESCRIPTION] \
    [--performance=PERFORMANCE] \
    --tier=TIER \
    --file-share=name="FILE_SHARE_NAME",capacity=FILE_SHARE_SIZE \
    --network=name="VPC-NETWORK",[connect-mode=CONNECT_MODE],[reserved-ip-range="RESERVED_IP_ADDRESS"] \
    [--labels=KEY=VALUE,[KEY=VALUE,...]] \
    [--kms-key=KMS_KEY] \
    [--deletion-protection] \
    [--deletion-protection-reason="PROTECTION_REASON"]
```

Default project and location (use `filestore/region` for the regional or enterprise tier):

```bash
gcloud config set project PROJECT_ID
gcloud config set filestore/zone zone
gcloud config set filestore/region region
```

Custom performance and a Shared VPC network:

```text
--performance=max-iops-per-tb=17000
```

```text
--network=name=projects/host/global/networks/shared-vpc-1,connect-mode=PRIVATE_SERVICE_ACCESS
```

### Example: regional instance with IP-based access rules and deletion protection

Creates instance `render1` in project `myproject`, region `us-central1`, tier `REGIONAL`, `max-iops-per-tb=17000`, file share `my_vol` (2 TiB), network `default`, reserved range `10.0.7.0/29`, read-write with root squashed for `10.0.0.0/29` and `10.2.0.0/29`, read-only with no root squash for `192.168.0.0/26`, and deletion protection with a reason.

Adapted (not in the official docs): joined the wrapped `--deletion-protection-reason` string onto one line, because the source breaks a quoted value across lines.

```bash
gcloud filestore instances create render1 \
  --project=myproject \
  --region=us-central1 \
  --tier=REGIONAL \
  --performance=max-iops-per-tb=17000 \
  --network=name="default",reserved-ip-range="10.0.7.0/29" \
  --flags-file=nfs-export-options.json \
  --deletion-protection \
  --deletion-protection-reason="All genomics data must adhere to current organization policies."
```

`nfs-export-options.json`:

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
        }
      ]
    }
}
```

## Options / Props

| Flag / field | Description |
|---|---|
| `INSTANCE_ID` | 1-63 chars, begins with a lowercase letter, lowercase letters/digits/dashes, ends with a letter or digit (RFC 1035 label); unique per project and zone; immutable |
| `--tier` | Service tier; cannot be changed after creation |
| `--performance` | `max-iops-per-tb` (scales with capacity) or `max-iops` (fixed). Required for Regional instances below 1024 GiB. Cannot be deactivated once activated; billed per purchased IOPS |
| `--file-share` | `name` (1-32 chars zonal/regional/enterprise, 1-16 basic; begins with a letter; letters, numbers, underscores; ends with letter or number) and `capacity` (GiB default, or TiB) |
| `--network` | `name` (legacy networks not allowed), `connect-mode` `DIRECT_PEERING` or `PRIVATE_SERVICE_ACCESS` (required for Shared VPC; then use the fully qualified `projects/HOST_PROJECT_ID/global/networks/SHARED_VPC_NAME`), `reserved-ip-range` (with private services access, an allocated range name, not CIDR) |
| `--kms-key` | `projects/KMS_PROJECT_ID/locations/REGION/keyRings/KEY_RING/cryptoKeys/KEY` |
| `--deletion-protection`, `--deletion-protection-reason` | Deletion protection (default disabled) and justification note |
| `--description` | Up to 2048 characters; editable later |

Capacity by tier:

| Tier | Minimum | Maximum | Step |
|---|---|---|---|
| Zonal | 1 TiB | 9.75 TiB | 256 GiB |
| Zonal | 10 TiB | 100 TiB | 2.5 TiB |
| Regional | 100 GiB | 10,239 GiB | 1 GiB |
| Regional | 10 TiB | 100 TiB | 2.5 TiB |
| Basic HDD | 1 TiB | 63.9 TiB | 1 GiB |
| Basic SSD | 2.5 TiB | 63.9 TiB | 1 GiB |
| Enterprise | 1 TiB | 10 TiB | 256 GiB |

Basic HDD and basic SSD can only scale up; other tiers scale up or down.

IP-based access rule fields (`--flags-file` JSON): `ip-ranges`; `access-mode` `READ_WRITE` (default) or `READ_ONLY`; `squash-mode` `ROOT_SQUASH` or `NO_ROOT_SQUASH` (default); `anon_uid` / `anon_gid` (default `65534`, set only via API and gcloud). Console access levels: `admin` (read-write, no-root-squash), `admin-viewer` (read-only, no-root-squash), `editor` (read-write, root-squash), `viewer` (read-only, root-squash). Limits: console up to 4 rules and 64 IPs/ranges; gcloud up to 64 IPs/CIDR blocks across at most 10 rules. At least one rule must grant `admin` at creation (removable later).

Reserved IP range: CIDR, valid VPC subnet range; block size `/29` for basic, `/26` for zonal/regional/enterprise (the gcloud help says `/24`; see Notes); must not overlap existing subnets, peered subnets or other Filestore ranges; `172.17.0.0/16` is reserved for internal components; immutable once set. Letting Filestore choose is recommended.

## Notes

- By default an instance grants root-level read and write access to all clients in the same project and VPC network; add IP-based rules to restrict. Non-RFC 1918 clients need explicit access rules.
- Custom performance: IOPS-per-TiB ratio scales with capacity (example: 1 TiB at 6,000 IOPS per TiB, then 2 TiB gives 14,000 IOPS); fixed IOPS must be a multiple of 1,000. Regional instances below 1024 GiB need custom performance with fixed IOPS of at least 2,000 or an IOPS per TiB ratio between 4,000 and 17,000 (computed IOPS not below 2,000). Console enables custom performance by default for regional and zonal tiers.
- Create operations for zonal, regional and enterprise instances take 15 minutes to one hour; quota is consumed at start but billing is not.
- Console uses Private Service Connect (needs a service connection policy); gcloud/API can also use VPC Network Peering (direct peering or private services access). Shared VPC in a service project requires private services access enabled by the network admin. The network cannot be changed after creation.
- NFS file locking may require opening Filestore ports in custom or changed-firewall networks (private services access / direct peering only).
- Adapted from the official docs: the source wraps the `--deletion-protection-reason` quoted value across two lines (`"All genomics data must adhere to current` / `organization policies."`).
- Source inconsistency: the regional example uses `reserved-ip-range="10.0.7.0/29"`, but this page requires a block size of 26 for zonal, regional and enterprise instances, and the `gcloud filestore instances create` help says a direct CIDR value must be a /24 block for High Scale, Zonal, Enterprise or Regional tier (/29 only for Basic). The example is kept verbatim; the page recommends letting Filestore choose a free range.
- Source inconsistency: the page says at least one rule must grant `admin` (read-write, no-root-squash) at creation, but its `nfs-export-options.json` example has only an `editor` rule (`READ_WRITE` + `ROOT_SQUASH`) and an `admin-viewer` rule (`READ_ONLY` + `NO_ROOT_SQUASH`), no `admin` rule. Add a `READ_WRITE` + `NO_ROOT_SQUASH` rule for an admin client range if creation is rejected.
- The synopsis and the `--performance` / `--network` fragments are shown as `text` because they are not runnable shell commands (the source shows the synopsis as an unlabelled block).
- The source also shows Console steps, a REST `curl` example and links to NFSv4.1, CSI driver, Cloud Run and remote mounting. The REST sample is omitted because its JSON is not valid (missing comma after `"performanceConfig"`).
- Filestore is managed file storage (NFS), not an object API; distinct from Cloud Storage (object) and Cloud Storage FUSE. Use the `gcp-foundation` skill for IAM and the `gcp-cli` skill for gcloud setup.
- Source: https://docs.cloud.google.com/filestore/docs/creating-instances (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/create (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [service-tiers.md](./service-tiers.md)
- [mounting-fileshares.md](./mounting-fileshares.md)
- [limits.md](./limits.md)
- [regions.md](./regions.md)
- [iam.md](./iam.md)
