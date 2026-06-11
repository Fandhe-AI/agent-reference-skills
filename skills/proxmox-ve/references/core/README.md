# Core

| Name | Description | Path |
|------|-------------|------|
| Installation | ISO/bare-metal install, ZFS/LVM/BTRFS root, post-install access | [installation.md](./installation.md) |
| Cluster Management | pvecm, pmxcfs, Corosync quorum, node join/remove | [cluster.md](./cluster.md) |
| Storage | Storage backends (dir/LVM/ZFS/NFS/CIFS/RBD/iSCSI), storage.cfg | [storage.md](./storage.md) |
| Virtual Machines (QEMU/KVM) | qm CLI, CPU/memory/disk/cloud-init, templates, migration | [vm-qemu.md](./vm-qemu.md) |
| LXC Containers | pct CLI, templates, bind mounts, privileged/unprivileged | [container-lxc.md](./container-lxc.md) |
| Networking & SDN | bridge/bond/VLAN, SDN zones/VNets/subnets | [networking-sdn.md](./networking-sdn.md) |
| Hyper-Converged Ceph | OSD/MON/MGR setup, pools, hardware recommendations | [ceph.md](./ceph.md) |
| High Availability (HA) | HA resources, node affinity rules, fencing, watchdog | [ha.md](./ha.md) |
| Backup & Restore | vzdump modes, PBS integration, retention, live-restore | [backup-restore.md](./backup-restore.md) |
| Firewall | Datacenter/node/VM firewall rules, security groups, IP sets | [firewall.md](./firewall.md) |
| User & Access Management | Users/groups/roles/realms, ACLs, API tokens, 2FA | [user-access.md](./user-access.md) |
| Notifications | Notification targets (sendmail/SMTP/Gotify/webhook), matchers | [notifications.md](./notifications.md) |
