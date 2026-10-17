---
source: https://docs.docker.com/engine/network/firewall-nftables/
---

# Docker with nftables

Docker Engine can use nftables instead of iptables for bridge-network firewall rules. This support, introduced in Docker 29.0.0, is experimental.

## Signature / Usage

```console
$ dockerd --firewall-backend=nftables
```

or in the configuration file:

```json
{
  "firewall-backend": "nftables"
}
```

## Options / Props

| Option | Description |
| --- | --- |
| `--firewall-backend=nftables` / `"firewall-backend": "nftables"` | Use nftables instead of iptables. |
| `--ip-forward=false` / `"ip-forward": false` | Disable Docker's check for IP forwarding, letting it start and create networks when forwarding is disabled. |
| `--bridge-accept-fwmark` | Accept packets with the given `fwmark` (optionally with mask, e.g. `--bridge-accept-fwmark=0x1/0x3`), replacing `DOCKER-USER` ACCEPT rules. |
| `iptables`, `ip6tables` | Disable creation of rules; these options apply to both iptables and nftables. |

## Notes

- Experimental: configuration options, behavior and implementation may change. Rules for overlay networks are not yet migrated, so nftables cannot be enabled when the daemon runs in Swarm mode.
- Docker creates two tables, `ip docker-bridges` and `ip6 docker-bridges`, with base chains plus chains per bridge network. Do not modify them; Docker expects full ownership. Rules may change between releases.
- There is no `DOCKER-USER` chain. Add rules in separate tables with base chains of the same types and hook points; use base chain priority to order them (a lower number runs earlier). Docker uses well-known priority values for its base chains.
- Migrating: restarting with nftables deletes most of Docker's iptables chains and rules and creates nftables rules. If IPv4 forwarding is disabled, an error is reported at daemon startup because of the default bridge.
- IP forwarding: with nftables Docker will not enable forwarding itself and reports an error if it is needed but not enabled. Set `net.ipv4.ip_forward=1` and `net.ipv6.conf.all.forwarding=1` (e.g. via `systemd-sysctl` / `/etc/sysctl.d/99-sysctl.conf`), and block unwanted forwarding between non-Docker interfaces. After a reboot, if no other service re-enables forwarding, Docker will fail to start.
- An iptables `FORWARD` chain with policy `DROP` will drop packets accepted by Docker's nftables rules (port publishing breaks). Check with `iptables -L FORWARD`; set `iptables -P FORWARD ACCEPT` and `ip6tables -P FORWARD ACCEPT`, or add explicit ACCEPT rules.
- Migrating `DOCKER-USER`: the daemon doesn't remove an existing jump from `FORWARD` to `DOCKER-USER` (rules keep running until the jump is removed or reboot) and doesn't add the jump when starting with nftables. An nftables "accept" isn't final across base chains, so to override Docker's drop rule use a firewall mark with `--bridge-accept-fwmark`; the mark must be set before Docker's rules run (priority `filter - 1` or lower for `filter`/`forward`).
- Direct routed access is dropped in the `raw-PREROUTING` chain of `docker-bridges` tables; a final drop cannot be overridden by your own tables, and `--bridge-accept-fwmark` has no effect on it. Use `com.docker.network.bridge.trusted_host_interfaces` or `allow-direct-routing` for published ports.
- Restrict external connections by creating your own table (change `ext_if`):

```console
table ip my-table {
	chain my-filter-forward {
		type filter hook forward priority filter; policy accept;
		iifname "ext_if" ip saddr != 192.0.2.2 counter drop
	}
}
```

- To target only Docker's user-defined bridges (default device prefix `br-`): `iifname "ext_if" oifname "br-*" ip saddr != 192.0.2.0/24 counter drop`.

## Related

- [Packet filtering and firewalls](./packet-filtering-firewalls.md)
- [Docker with iptables](./firewall-iptables.md)
