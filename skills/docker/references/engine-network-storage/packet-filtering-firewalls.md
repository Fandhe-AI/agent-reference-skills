---
source: https://docs.docker.com/engine/network/packet-filtering-firewalls/
---

# Packet filtering and firewalls

On Linux, Docker creates firewall rules to implement network isolation, port publishing and filtering. These rules are required for Docker bridge networks to work, so you should not modify them.

## Signature / Usage

Select the firewall backend and IP forwarding behavior in `/etc/docker/daemon.json`:

```json
{
  "firewall-backend": "nftables",
  "ip-forward-no-drop": true
}
```

## Options / Props

| Daemon option | Description |
| --- | --- |
| `firewall-backend` | Select whether iptables (default) or nftables is used. |
| `ip-forward-no-drop` (`--ip-forward-no-drop`) | Stop Docker from setting the forwarding policy to "drop" (use when the host must act as a router). |
| `iptables`, `ip6tables` | Set to `false` to prevent Docker from creating most of its iptables/nftables rules. Not appropriate for most users. |

## Notes

- Docker creates firewall rules for bridge networks only. No rules are created for `ipvlan`, `macvlan` or `host` networking.
- For bridge networks iptables and nftables have the same functionality.
- Docker needs IP forwarding on Linux. It enables `net.ipv4.ip_forward` and `net.ipv6.conf.all.forwarding` at start if not already enabled, and configures the firewall to drop forwarded packets unless explicitly accepted. Dropping prevents the host from acting as a router (recommended unless router functionality is required). With the experimental nftables backend, Docker doesn't enable IP forwarding itself and doesn't create a default "drop" policy.
- With firewalling disabled and no replacement rules, containers in bridge networks can't reach internet hosts by masquerading, but all their ports are accessible to hosts on the local network. It is not possible to completely prevent Docker from creating firewall rules.
- firewalld: with `iptables` / `ip6tables` set to `true` and firewalld enabled, Docker creates a firewalld zone `docker` (target `ACCEPT`), inserts all Docker bridge interfaces (e.g. `docker0`) into it, and creates a forwarding policy `docker-forwarding` allowing forwarding from `ANY` zone to the `docker` zone.
- ufw: Docker and ufw are incompatible. Published-port traffic is routed in the `nat` table before reaching the `INPUT` and `OUTPUT` chains that ufw uses, so ufw rules are effectively ignored.

## Related

- [Docker with iptables](./firewall-iptables.md)
- [Docker with nftables](./firewall-nftables.md)
- [Port publishing and mapping](./port-publishing.md)
