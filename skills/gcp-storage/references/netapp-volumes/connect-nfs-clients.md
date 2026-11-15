---
source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients
---

# Connect NFS clients

Prepare Linux NFS clients, control access with volume export policies (up to 20 rules, IP-based for NFSv3 and NFSv4.1), configure squashing, NFSv4 ID mapping and firewall ports.

## Signature / Usage

### Install NFS client tools

```bash
sudo yum install -y nfs-utils
```

Red Hat uses the command above (SUSE: see Notes); Debian and Ubuntu:

```bash
sudo apt-get install nfs-common
```

### Update an export policy (one rule)

```bash
gcloud netapp volumes update VOLUME_ID \
  --project=PROJECT_ID \
  --location=LOCATION \
  --export-policy=access-type=ACCESS_TYPE,allowed-clients=ALLOWED_CLIENTS_IP_ADDRESSES,has-root-access=TRUE_OR_FALSE,nfsv3=NFSV3,nfsv4=NFSV4
```

### Multiple rules (colon separator for comma-separated clients)

```bash
gcloud netapp volumes update my_volume --location=us-east4 \
--export-policy=^:^access-type=READ_WRITE:allowed-clients="10.10.5.3,10.10.5.9":nfsv3=true:nfsv4=true:has-root-access=true \
--export-policy=access-type=READ_WRITE,allowed-clients=10.0.5.0/24,nfsv3=true,has-root-access=false \
--export-policy=access-type=READ_ONLY,allowed-clients=10.0.6.0/24,nfsv3=true,has-root-access=false
```

### Squash mode

```bash
gcloud netapp volumes update my_volume --location=us-east4 \
--export-policy=^:^allowed-clients="10.10.5.3,10.10.5.9":nfsv3=true:access-type=READ_WRITE:squash-mode=NO_ROOT_SQUASH \
--export-policy=allowed-clients=10.0.2.0/24,nfsv3=true,access-type=READ_WRITE,squash-mode=ALL_SQUASH,anon-uid=2000
```

### Mount instructions

```bash
gcloud netapp volumes describe VOLUME_NAME \
    --project=PROJECT_ID \
    --location=LOCATION \
    --format="value(mountOptions.instructions)"
```

Check numeric IDs on the client (default `Y` enables numeric IDs), then set the `rpc.idmapd` domain in `/etc/idmapd.conf` and flush:

```bash
cat /sys/module/nfs/parameters/nfs4_disable_idmapping
nfsidmap -c
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `access-type` | enum | `READ_WRITE`, `READ_ONLY`, `READ_NONE` |
| `allowed-clients` | string | Comma-separated client IPs or CIDRs |
| `nfsv3` / `nfsv4` | bool | Apply the rule to NFSv3 / NFSv4 |
| `has-root-access` | bool | Replaced by `squash-mode` but still accepted; do not combine with `squash-mode` |
| `squash-mode` | enum | `no-root-squash`, `root-squash`, `all-squash` (the CLI example shows `NO_ROOT_SQUASH` / `ALL_SQUASH`) |
| `anon-uid` | int | Required with `all-squash`, which also requires `access-type=READ_WRITE` |

Firewall ports (open for the full NetApp Volumes private services access CIDR or individual volume IPs): `111 TCP/UDP` portmapper, `635 TCP/UDP` mountd, `2049 TCP/UDP` nfsd, `4045 TCP/UDP` nlockmgr (NFSv3 only), `4046 TCP/UDP` status (NFSv3 only).

Best-practice export table from the source: rule 1 admin clients 10.10.5.3, 10.10.5.9 read-write with root access on; rule 2 10.10.5.0/24 read-write root off; rule 3 10.10.6.0/24 read-only root off.

## Notes

- Without Kerberos, NFS uses `AUTH_SYS`; export only to trusted clients, order rules from most specific to least specific, and limit root access to a few admin hosts. NFSv4.1 with Kerberos supports `krb5`, `krb5i`, `krb5p`.
- A volume without an export policy is inaccessible. Root (`UID=0`) is squashed to `UID=65534` by default. One `all-squash` rule per policy; replication is not supported for volumes with a `squash-mode` style rule; on Flex File `all-squash` does not change root inode ownership.
- Source inconsistency: the best-practice table uses 10.10.5.0/24 and 10.10.6.0/24 while the example command uses 10.0.5.0/24 and 10.0.6.0/24; `squash-mode` is lowercase in the value list and uppercase in the CLI examples.
- Enabling NFSv4.1 also enables NFSv4.2 for Flex Unified, Standard, Premium and Extreme; use `-o vers=4.1` to force 4.1. NFSv3 without locks or NSM: add the `nolock` mount option. NFSv3 advisory locks need `rpc.statd` with a static port.
- ID mapping: `domain = defaultv4iddomain.com` when LDAP is not enabled, otherwise the FQDN of the Windows domain; Active Directory is the only supported RFC2307bis LDAP server.
- Also in the source: ONTAP-mode mount path (`IP:junction-path`) and Linux LDAP client guides.
- Export rules are IP-based; broad `allowed-clients` ranges (for example `0.0.0.0/0`) would allow every client that can reach the network.
- SUSE: the source's SuSE tab shows the same `sudo yum install -y nfs-utils` command, but SUSE Linux Enterprise uses `zypper`, not `yum`, so that command does not install the NFS client there; install the NFS client package with the distribution's package manager following the SUSE documentation instead.
- Source: https://docs.cloud.google.com/netapp/volumes/docs/connect-clients/connect-nfs-clients (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [mount-volume.md](./mount-volume.md)
- [create-volume.md](./create-volume.md)
- [networking.md](./networking.md)
