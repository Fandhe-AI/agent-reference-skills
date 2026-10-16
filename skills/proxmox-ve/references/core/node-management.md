# Node Management (time sync, metrics, disk health, bulk actions, KSM)

Node-level administration: NTP time synchronization, external metric servers, S.M.A.R.T. disk monitoring, the `pvenode` tool (Wake-on-LAN, task history, bulk guest power / migration, ballooning target) and Kernel Samepage Merging.

## Signature / Usage

```bash
# Wake-on-LAN
pvenode config set -wakeonlan XX:XX:XX:XX:XX:XX
pvenode wakeonlan <node>

# Task history
pvenode task list --errors --vmid 100
pvenode task log UPID:pve1:00010D94:001CA6EA:6124E1B9:vzdump:100:root@pam:

# Bulk guest power management / migration
pvenode startall --vms 100,101,102 --force
pvenode stopall
pvenode migrateall pve2 --vms 100,101,102 --with-local-disks

# Per-node settings
pvenode config set --startall-onboot-delay 10
pvenode config set --ballooning-target 90
```

## Options / Props

### pvenode settings and commands

| Name | Description |
|------|-------------|
| `wakeonlan` (node property) | MAC address used by `pvenode wakeonlan <node>`; magic packet broadcast on UDP port 9. Suffix `,bind-interface=<iface-name>` overrides the interface (default from default route); `,broadcast-address=<broadcast-address>` overrides `255.255.255.255` |
| `startall` | Starts guests set to start on boot; `--force` overrides, `--vms` limits to VMIDs |
| `stopall` | Clean shutdown first, waits up to an overridable timeout (3 minutes by default), then hard-stops remaining guests unless `force-stop` is explicitly 0; `--vms` limits to VMIDs |
| `--startall-onboot-delay` | Per-node delay in seconds between host boot and the first autostart guest (for slow external resources such as NFS) |
| `migrateall <target>` | Migrates all guests (or those in `--vms`) to the target node; `--with-local-disks` enables live migration of local disks |
| `--ballooning-target` | Target host memory usage percentage for automatic memory allocation (default 80) |
| `task list` / `task log` | Filtered list of finished tasks (e.g. `--errors`, `--vmid`) and log by UPID |

### Time synchronization

Custom NTP servers with chrony (`/etc/chrony/chrony.conf`):

```
server ntp1.example.com iburst
server ntp2.example.com iburst
server ntp3.example.com iburst
```

```bash
systemctl restart chronyd
journalctl --since -1h -u chrony
```

With systemd-timesyncd (`/etc/systemd/timesyncd.conf`):

```ini
[Time]
NTP=ntp1.example.com ntp2.example.com ntp3.example.com ntp4.example.com
```

```bash
systemctl restart systemd-timesyncd
journalctl --since -1h -u systemd-timesyncd
```

### External metric servers

Supported: Graphite, InfluxDB, OpenTelemetry. Definitions are saved in `/etc/pve/status.cfg` and editable in the web interface.

| Server | Defaults / settings |
|--------|---------------------|
| Graphite | Port 2003, path `proxmox`; UDP by default (MTU configurable, default 1500); TCP possible with a timeout so `pvestatd` is not blocked |
| InfluxDB | UDP by default (MTU configurable). HTTP(S) API of InfluxDB 2.x via `influxdbproto` = `http` / `https`; default organization `proxmox`, bucket `proxmox` (`organization`, `bucket`); token required; `timeout` (default 1s); `max-body-size` (default 25000000 bytes) |

InfluxDB server UDP listener example:

```toml
[[udp]]
   enabled = true
   bind-address = "0.0.0.0:8089"
   database = "proxmox"
   batch-size = 1000
   batch-timeout = "1s"
```

### Disk health monitoring

```bash
smartctl -a /dev/sdX
smartctl -s on /dev/sdX   # if "SMART support is: Disabled"
```

`smartd` is active by default; it scans `/dev/sd[a-z]`, `/dev/sd[a-z][a-z]`, `/dev/hd[a-t]` and `/dev/nvme[0-99]` every 30 minutes and e-mails root on problems.

### Kernel Samepage Merging (KSM)

```bash
systemctl status ksmtuned
systemctl disable --now ksmtuned
echo 2 > /sys/kernel/mm/ksm/run   # unmerge all currently merged pages
qm set <vmid> --allow-ksm 0       # disable for one VM
```

## Notes

- Time sync: cluster stack and Ceph rely on precisely synchronized time. As of Proxmox VE 7 `chrony` is the default NTP daemon (Proxmox VE 6 used `systemd-timesyncd`); when upgrading to 7, manually install `chrony`, `ntp` or `openntpd`.
- `pvenode` also manages the node description and the SSL certificates used by `pveproxy`.
- Wake-on-LAN needs a NIC that supports it and the firmware option enabled; check with `ethtool <interface> | grep Wake-on`.
- `smartmontools` is installed and required since Proxmox VE 4.3. Behind a hardware RAID controller use the vendor's tools.
- KSM is enabled by default; it can expose VMs to side-channel attacks. Consider disabling it for hosting services and check local regulations. `allow-ksm` defaults to true.

## Related

- [certificates.md](./certificates.md)
- [vm-qemu.md](./vm-qemu.md)
- [cluster.md](./cluster.md)
- Official docs: https://pve.proxmox.com/pve-docs/chapter-sysadmin.html#_time_synchronization , #external_metric_server , #disk_health_monitoring , #proxmox_node_management , #kernel_samepage_merging (all on chapter-sysadmin.html)
