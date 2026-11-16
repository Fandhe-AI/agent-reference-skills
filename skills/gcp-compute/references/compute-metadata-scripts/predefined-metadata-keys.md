---
source: https://docs.cloud.google.com/compute/docs/metadata/predefined-metadata-keys
---

# Predefined metadata keys

Compute Engine creates predefined keys in the `instance/` and `project/` metadata directories of every instance and fills in some values automatically (instance ID, project ID). For other keys you set values to enable or disable features, for example `enable-oslogin` set to `TRUE`. Values are case-sensitive and can be updated; the keys themselves cannot be modified.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux (first two lines of the "Accessing metadata" block). The same pattern reads any key below.

Adapted (not in the official docs): `curl` changed to `curl -fsS` and `|| exit 1` added, as in the adapted linux.md script, so a missing key or an unavailable metadata server stops the script instead of storing the error body in `METADATA_VALUE`.

```bash
#! /bin/bash
METADATA_VALUE=$(curl -fsS http://metadata.google.internal/computeMetadata/v1/instance/attributes/foo -H "Metadata-Flavor: Google") || exit 1
```

## Options / Props

### `project/` keys (`http://metadata.google.internal/computeMetadata/v1/project/`)

| Key | Description |
|---|---|
| `attributes/` | Custom metadata passed to project VMs at startup or shutdown (Google Cloud attributes or user-created) |
| `numeric-project-id` | Project number; different from `project-id` |
| `project-id` | The project ID |

### `project/attributes/` keys (effective only if set on the project)

| Key | Description |
|---|---|
| `disable-legacy-endpoints` | Disables legacy metadata server endpoints for all VMs; legacy endpoints are deprecated, always set `TRUE` |
| `enable-guest-attributes` | Enables guest attributes for the project; any user or process on the VM can read and write `guest-attributes` namespaces and keys |
| `enable-os-inventory` | Enables or disables OS inventory (hostname, kernel version, architecture, installed packages) |
| `enable-osconfig` | `TRUE` enables VM Manager (Patch, OS policies, OS inventory) |
| `osconfig-poll-interval` | OS inventory scan interval in minutes; default is every 10 minutes |
| `enable-oslogin` | Enables or disables SSH key management through OS Login |
| `enable-windows-ssh` | Preview. Enables or disables SSH for Windows VMs |
| `google-compute-default-data-protection` | Default backup option for new instances in the project |
| `google-compute-default-region` / `google-compute-default-zone` | Default region / zone of the project |
| `ssh-keys` | "If you are managing SSH keys using metadata": public SSH keys allowed on project VMs, one per line separated by `\n`, e.g. `"user1:ssh-rsa mypublickey user1@host.com\nuser2:ssh-rsa mypublickey user2@host.com"`; OS Login keys are not shown |
| `sshKeys` | Deprecated: use `ssh-keys` |
| `vmdnssetting` | Enables zonal DNS and global DNS for project VMs |

### `instance/` keys (`http://metadata.google.internal/computeMetadata/v1/instance/`)

| Key | Description |
|---|---|
| `attributes/` | Custom metadata passed to the VM at startup or shutdown |
| `cpu-platform` | CPU platform of the VM |
| `description` | Free-text description set with `--description` or the API |
| `disks/` | Attached disks; per disk: `device-name`, `index`, `interface`, `mode`, `type` |
| `gce-workload-certificates/` (Deprecated) | Managed workload identities endpoints: `config-status`, `workload-identities` (X.509 certificate and private key), `trust-anchors` |
| `guest-attributes/` | Guest attributes of the VM; any user or process on the VM can read and write them |
| `hostname`, `id`, `name` | VM hostname; unique numeric ID within the project and zone; VM name |
| `image` | Format `projects/IMAGE_PROJECT/global/images/IMAGE_NAME` |
| `legacy-endpoint-access/` | List of legacy endpoints; values `0.1` and `v1beta1` |
| `licenses/` | License code IDs attached to images, snapshots and disks |
| `machine-type` | Format `projects/PROJECT_NUM/machineTypes/MACHINE_TYPE` |
| `maintenance-event` | Whether a maintenance event affects the VM |
| `network-interfaces/` | Per interface: `access-configs/0/` (`external-ip`, `type` = `ONE_TO_ONE_NAT`, `dns-servers`, `forwarded-ips/`, `forwarded-ipv6s/`), `gateway`, `gateway-ipv6`, `ip`, `ip-aliases/`, `ipv6`, `ipv6s`, `mac`, `mtu`, `network` (`projects/PROJECT_ID/networks/NETWORK_NAME`), `subnetmask`, `target-instance-ips` |
| `partner-attributes/` (Deprecated) | Namespaces created by Google Cloud services (for example managed workload identities); empty when unused |
| `preempted` | Boolean: VM is about to be preempted |
| `scheduling/` | `on-host-maintenance`, `automatic-restart` (`TRUE` restarts after maintenance or crash), `preemptible` (`TRUE` if preemptible; set at creation, cannot change) |
| `service-accounts/` | Per account: `aliases`, `email`, `identity` (VM-unique JWT; request needs `?audience=...`, e.g. `?audience=http://www.example.com`), `scopes`, `token` (OAuth2 access token) |
| `tags` | Network tags of the VM |
| `virtual-clock/drift-token` | Accumulated clock drift; starts at zero, grows with each live migration |
| `zone` | Format `projects/PROJECT_NUM/zones/ZONE` |

### `instance/attributes/` keys (effective only if set on the instance)

| Key | Description |
|---|---|
| `physical_host_topology` | Hash string of the VM's physical location within a zone |
| `enable-osconfig`, `osconfig-poll-interval`, `enable-oslogin`, `enable-windows-ssh` (Preview), `vmdnssetting`, `ssh-keys` | Same meaning as the project keys above, scoped to the VM |
| `enable-workload-certificate` (Deprecated) | Enables managed workload identities on a VM |
| `block-project-ssh-keys` | Blocks project SSH keys on VMs that use metadata-based SSH keys |
| `disable-https-mds-setup` | Disables automatic HTTPS metadata server certificate provisioning |
| `enable-https-mds-native-cert-store` | Adds the HTTPS metadata server root certificate to the OS trust store during automatic provisioning |

### `instance/guest-attributes/` keys

| Key | Description |
|---|---|
| `guestInventory/` | OS inventory of the VM (hostname, kernel version, architecture, installed packages) |
| `hostkeys/` | SSH host keys |

## Notes

- Distance: `enable-oslogin` is the VM-side setting; IAM roles in general are in `gcp-foundation`. `network-interfaces/` and `tags` expose the VM side of VPC settings; VPC networks and firewall policies themselves are in the planned `gcp-networking`.
- `ssh-keys` applies only when SSH keys are managed through metadata (the source's own condition, kept in the table). oslogin.md (compute-access-ssh) says "Compute instances that use OS Login can't use metadata-based SSH keys. If you enable OS Login for a compute instance, then the compute instance's guest agent ignores the keys stored in metadata"; with `enable-oslogin` set to `TRUE`, keys in `ssh-keys` do not grant access.
- Never store secrets in custom metadata; any process on the VM can read the whole metadata server.
- Corrected from the official docs: the borrowed snippet calls `curl` without `-f`; the metadata server returns `404` ("Not Found: the requested endpoint doesn't exist") for a path that does not exist, such as an unset attribute key, and `503` while it "isn't ready to serve"; without `-f`, `curl` prints the error response body and exits 0, so `METADATA_VALUE` holds the error text instead of failing. It now uses `curl -fsS`.
- Source (metadata server status codes): https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshoot-metadata-server (retrieved 2026-11-17)
- Source (OS Login and metadata SSH keys): https://docs.cloud.google.com/compute/docs/oslogin (retrieved 2026-11-17)
- Adapted from the official docs: `|| exit 1` is added to the `METADATA_VALUE=$(curl -fsS ...)` assignment; the script has no `set -e`, so without it a failed metadata request would not stop the commands that follow.
- Source: https://docs.cloud.google.com/compute/docs/metadata/predefined-metadata-keys (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/instances/startup-scripts/linux

## Related

- [overview.md](./overview.md)
- [linux.md](./linux.md)
- [guest-environment.md](./guest-environment.md)
