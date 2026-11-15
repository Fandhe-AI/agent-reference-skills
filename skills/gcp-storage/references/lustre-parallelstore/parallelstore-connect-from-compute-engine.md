---
source: https://docs.cloud.google.com/parallelstore/docs/connect-from-compute-engine
---

# Connect from a Compute Engine client (Parallelstore)

Create a Compute Engine client, install the DAOS client library, configure and start the DAOS agent, and mount a Parallelstore instance with dfuse. Create client VMs in the same zone as the instance.

## Signature / Usage

### Create a VM

Supported images: HPC Rocky Linux 8, Rocky Linux 9 Optimized, RHEL 9, Ubuntu 22.04, Debian 12. Ubuntu 22.04 example:

```bash
gcloud compute instances create VM_NAME \
  --project=PROJECT_ID \
  --zone=LOCATION \
  --machine-type=c2d-standard-112 \
  --network-interface=stack-type=IPV4_ONLY,subnet=NETWORK_NAME,nic-type=GVNIC \
  --network-performance-configs=total-egress-bandwidth-tier=TIER_1 \
  --create-disk=auto-delete=yes,boot=yes,device-name=VM_NAME,\
image=projects/ubuntu-os-cloud/global/images/ubuntu-2204-jammy-v20240927,\
mode=rw,size=100,type=pd-balanced
```

Adapted (not in the official docs): added `--tunnel-through-iap`; the source's SSH firewall rule opened TCP 22 to `0.0.0.0/0` and was dropped, so the connection goes through IAP TCP forwarding instead.

```bash
gcloud compute ssh VM_NAME --zone=ZONE --project=PROJECT_ID --tunnel-through-iap
```

### Install the DAOS client (Rocky Linux / RHEL)

For HPC Rocky Linux 8, Rocky Linux 9 Optimized and RHEL 9, follow the "Install the DAOS client library" section of https://docs.cloud.google.com/parallelstore/docs/connect-from-compute-engine (see Notes for why the repository definition is not reproduced here).

### Install the DAOS client (Ubuntu 22.04 / Debian 12)

Adapted (not in the official docs): `curl` gets `-fsSL`, and the deprecated `apt-key add` is replaced by a dedicated keyring referenced with `signed-by`, so the key is trusted only for this repository.

```bash
curl -fsSL https://us-central1-apt.pkg.dev/doc/repo-signing-key.gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/parallelstore.gpg
echo "deb [signed-by=/usr/share/keyrings/parallelstore.gpg] https://us-central1-apt.pkg.dev/projects/parallelstore-packages v2-6-deb main" \
  | sudo tee -a /etc/apt/sources.list.d/artifact-registry.list
sudo apt update
sudo apt install -y daos-client
```

Ubuntu 22.04 only, raise the open files limit then reboot (or run `ulimit -n 131072` before dfuse if not using the interception library):

```bash
sudo tee -a /etc/security/limits.conf <<EOF
* soft nofile 131072
* hard nofile 131072
EOF
sudo reboot
```

### Configure and start the DAOS agent

In `/etc/daos/daos_agent.yml`, uncomment and set `access_points` to the instance's `accessPoints` IP addresses (for example `access_points: ['172.21.95.2', '172.21.95.4', '172.21.95.5']`), uncomment `transport_config` with `allow_insecure: true`, and set the interface. `allow_insecure: true` is required because certificates are not supported, so DAOS agent-to-server traffic is not authenticated; use it only on trusted, private networks.

```yaml
transport_config:
  allow_insecure: true
include_fabric_ifaces: ["eth0"]
```

```bash
sudo systemctl start daos_agent.service
systemctl status daos_agent.service
```

On Ubuntu 22.04 and Debian 12:

```bash
sudo mkdir /var/run/daos_agent && \
sudo daos_agent -o /etc/daos/daos_agent.yml &
```

### Mount with dfuse

Edit `/etc/fuse.conf` to add `user_allow_other`, then:

```bash
mkdir -p /tmp/parallelstore
dfuse -m /tmp/parallelstore \
  --pool default-pool \
  --container default-container \
  --disable-wb-cache \
  --thread-count=20 \
  --eq-count=10 \
  --multi-user
```

```bash
sudo umount /tmp/parallelstore/
```

## Notes

- Required role to create the VM: Compute Instance Admin (v1) `roles/compute.instanceAdmin.v1`. Recommended at least `c2-standard-4`; `c3-standard-176` with Tier 1 networking gives 200 Gbps egress.
- Parallelstore needs firewall ports open from the client to the server VMs or some writes may be blocked; follow https://docs.cloud.google.com/parallelstore/docs/vpc#create_and_configure_the_vpc before mounting.
- `df` reports SIZE as 1.5x the instance capacity (`capacityGib`) because of erasure coding (every 2 bytes written use 3 bytes); usable space is still `capacityGib`.
- gcloud 593.0.0 has no `parallelstore` command group; the source's `gcloud beta parallelstore instances describe` command (which prints `access_points` for `daos_agent.yml`) does not run with this version and was omitted — read `accessPoints` from the Console or the Parallelstore REST API (https://docs.cloud.google.com/parallelstore/docs/reference/rest/v1beta/projects.locations.instances#Instance).
- Omitted: the source's Rocky Linux / RHEL yum repository definitions set `repo_gpgcheck=0` and `gpgcheck=0` (packages and metadata are not signature-checked) and the source publishes no RPM signing key, so those blocks are not reproduced; use the official page above and install only on trusted networks.
- Omitted: the source's SSH firewall rule opens TCP 22 to `--source-ranges=0.0.0.0/0` (allows every client that can reach the network); that block was dropped. IAP TCP forwarding (`gcloud compute ssh --tunnel-through-iap`) needs a firewall rule that allows TCP port 22 from `35.235.240.0/20` on the VM's network; the Managed Lustre connect page in this category shows that rule.
- `allow_insecure: true` is kept from the source because certificates are not supported; use only on trusted networks.
- Other OS variants (HPC Rocky 8, RHEL 9, Debian 12 VM commands), the interface discovery output (`ip a`, `route`) and logging env vars (`D_LOG_MASK`, `D_LOG_FILE`) are in the source; Console steps also omitted.
- Thread and event queue tuning: https://docs.cloud.google.com/parallelstore/docs/performance#thread_count_and_event_queue_count. POSIX exceptions: https://docs.cloud.google.com/parallelstore/docs/posix-compliance.
- Adapted from the official docs: `curl https://us-central1-apt.pkg.dev/doc/repo-signing-key.gpg | sudo apt-key add -` and `echo "deb https://us-central1-apt.pkg.dev/projects/parallelstore-packages v2-6-deb main"` became `curl -fsSL ... | sudo gpg --dearmor -o /usr/share/keyrings/parallelstore.gpg` and a `deb [signed-by=/usr/share/keyrings/parallelstore.gpg] ...` source line (`apt-key` is deprecated and trusts the key for every repository).
- Adapted from the official docs: `gcloud compute ssh VM_NAME --zone=ZONE --project=PROJECT_ID` gained `--tunnel-through-iap` because the open `0.0.0.0/0` SSH firewall rule was dropped.
- Source: https://docs.cloud.google.com/parallelstore/docs/connect-from-compute-engine (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/managed-lustre/docs/connect-from-compute-engine (IAP range `35.235.240.0/20` and the `gpg --dearmor` + `signed-by` keyring pattern)
- Source: https://docs.cloud.google.com/parallelstore/docs/create-instance (REST `Instance` reference link)

## Related

- [parallelstore-create-instance.md](./parallelstore-create-instance.md)
- [parallelstore-overview.md](./parallelstore-overview.md)
- [managed-lustre-connect-from-compute-engine.md](./managed-lustre-connect-from-compute-engine.md)
