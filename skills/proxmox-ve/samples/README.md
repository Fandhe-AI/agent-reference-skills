# samples

| Name | Description | Path |
| --- | --- | --- |
| VM Lifecycle | Create, start, stop, clone, convert to template, and migrate QEMU/KVM VMs using `qm`. | [vm-lifecycle.md](./vm-lifecycle.md) |
| Container Lifecycle | Create, start, configure, snapshot, and restore LXC containers using `pct` and `pveam`. | [container-lifecycle.md](./container-lifecycle.md) |
| Cluster Setup | Create a Proxmox VE cluster, join nodes, verify quorum, and remove nodes using `pvecm`. | [cluster-setup.md](./cluster-setup.md) |
| Backup and Restore | Back up VMs and containers with `vzdump`, restore with `qmrestore`/`pct restore`, and schedule recurring jobs. | [backup-restore.md](./backup-restore.md) |
| API Automation | Automate Proxmox VE operations via the REST API (curl + API token) and the `pvesh` CLI wrapper. | [api-automation.md](./api-automation.md) |
