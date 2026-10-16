# Core

| Name | Description | Path |
|------|-------------|------|
| Backup & Restore | Integrated backup via `vzdump`. Full backups of VM/CT configuration and disk data; Proxmox Backup Server adds deduplication, live-restore, and single-file restore. | [backup-restore.md](./backup-restore.md) |
| Hyper-Converged Ceph | Ceph integrated directly, so cluster nodes serve as both compute and storage. Core components: OSD, MON, MGR. | [ceph.md](./ceph.md) |
| Certificate Management & ACME | Node certificates for `pveproxy`: cluster-CA default, custom upload, or ACME (Let's Encrypt) with automatic renewal. | [certificates.md](./certificates.md) |
| Cluster Management | Cluster management with `pvecm` and Corosync; `pmxcfs` distributes configuration to all nodes in real time. | [cluster.md](./cluster.md) |
| LXC Containers | Linux Containers via the `pct` CLI and web UI. Containers share the host kernel; unprivileged containers are the recommended default. | [container-lxc.md](./container-lxc.md) |
| Firewall | Built-in firewall at datacenter, node/host, and VM/container levels, with rules in `/etc/pve/firewall/` distributed via `pmxcfs`. Supports iptables-based `pve-firewall` and nftables-based `proxmox-firewall` (tech preview, PVE 9+). | [firewall.md](./firewall.md) |
| Firmware & CPU Microcode Updates | Firmware and CPU microcode updates on bare-metal hosts via persistent firmware, runtime firmware files, and early OS microcode. | [firmware-updates.md](./firmware-updates.md) |
| High Availability (HA) | HA manager restarts or migrates VMs and containers when a node fails. Watchdog-based fencing prevents split-brain. | [ha.md](./ha.md) |
| Host Bootloader | GRUB or systemd-boot, depending on the installer setup. `proxmox-boot-tool` keeps the EFI System Partitions synchronized. | [host-bootloader.md](./host-bootloader.md) |
| Installation | Install from a hybrid ISO (recommended) or on top of an existing Debian system. The installer handles partitioning, network, and packages. | [installation.md](./installation.md) |
| Host LVM & BTRFS Administration | Host-level LVM (installer default) and BTRFS (technology preview as root since PVE 7.0): volume groups, thin pools, BTRFS creation, mounting, subvolumes, snapshots, compression. | [lvm-btrfs.md](./lvm-btrfs.md) |
| Networking & SDN | Linux network stack configured via `/etc/network/interfaces`. SDN adds zones and VNets for multi-node guest networking. | [networking-sdn.md](./networking-sdn.md) |
| Node Management | NTP time sync, external metric servers, S.M.A.R.T. disk monitoring, `pvenode` (Wake-on-LAN, task history, bulk guest actions, ballooning target), and KSM. | [node-management.md](./node-management.md) |
| Notifications | System alerts routed to configurable notification targets using matchers, managed under Datacenter → Notifications. | [notifications.md](./notifications.md) |
| Package Repositories & System Updates | APT repositories in `/etc/apt/sources.list` or deb822 `.sources` files in `/etc/apt/sources.list.d/`. Debian base repositories are always required alongside a Proxmox VE repository. | [package-repositories.md](./package-repositories.md) |
| Proxmox Cluster File System (pmxcfs) | Database-driven file system mounted at `/etc/pve`, replicated in real time to all cluster nodes via `corosync`. FUSE-based, backed by SQLite; the in-RAM maximum is 128 MiB. | [pmxcfs.md](./pmxcfs.md) |
| Storage | Storage configuration in `/etc/pve/storage.cfg`, distributed to all cluster nodes. Backends are file-level (flexible content types) or block-level (raw images only). | [storage.md](./storage.md) |
| Storage Replication | The `pvesr` tool replicates guest volumes to another node using snapshots (incremental after the initial full sync), for guests on local storage. | [storage-replication.md](./storage-replication.md) |
| User & Access Management | Role-based access control (RBAC) with users, groups, roles, and authentication realms. Configuration in `/etc/pve/user.cfg`. | [user-access.md](./user-access.md) |
| Virtual Machines (QEMU/KVM) | KVM virtual machines via the `qm` CLI and web UI. Sensible defaults are applied automatically; key settings affect performance, portability, and storage. | [vm-qemu.md](./vm-qemu.md) |
| Graphical User Interface | Browser-based web interface with no separate management tool, plus built-in HTML5 or SPICE guest consoles. Any node can manage the whole cluster. | [web-gui.md](./web-gui.md) |
| ZFS on Linux | ZFS as an optional file system or root file system choice in the installer. Included packages; main commands are `zpool` and `zfs`. | [zfs.md](./zfs.md) |
