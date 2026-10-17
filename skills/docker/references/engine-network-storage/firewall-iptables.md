---
source: https://docs.docker.com/engine/network/firewall-iptables/
---

# Docker with iptables

Docker creates iptables rules in the host's network namespace for bridge networks. For bridge and other network types, iptables rules for DNS are also created in the container's network namespace.

## Signature / Usage

Restrict external access to published ports by inserting a negated rule at the top of `DOCKER-USER` (change `ext_if` to the host's external interface):

```console
$ iptables -I DOCKER-USER -i ext_if ! -s 192.0.2.2 -j DROP
```

## Options / Props

Custom chains in the `filter` table:

| Chain | Description |
| --- | --- |
| `DOCKER-USER` | Placeholder for user-defined rules, processed before rules in `DOCKER-FORWARD` and `DOCKER`. |
| `DOCKER-FORWARD` | First stage of processing for Docker's networks: passes non-established packets to the other Docker chains, accepts packets of established connections. |
| `DOCKER`, `DOCKER-BRIDGE`, `DOCKER-INTERNAL` | Decide whether a packet not part of an established connection is accepted, based on port forwarding configuration of running containers. |
| `DOCKER-CT` | Per-bridge connection tracking rules. |
| `DOCKER-INGRESS` | Rules related to Swarm networking. |

## Notes

- Creation of iptables rules can be disabled with daemon options `iptables` and `ip6tables`, but this will likely break container networking.
- In `FORWARD`, Docker adds rules that unconditionally jump to `DOCKER-USER`, `DOCKER-FORWARD` and `DOCKER-INGRESS`. In the `nat` table Docker creates chain `DOCKER` with masquerading and port-mapping rules. If Docker enables IP forwarding it also sets the default `FORWARD` policy to `DROP`.
- Rules appended to `FORWARD` are processed after Docker's rules; to filter packets Docker already accepted/rejected, use `DOCKER-USER`.
- Direct routed access (packets sent to the container's own IP) is dropped by a rule in the `raw` table `PREROUTING` chain, so a `DOCKER-USER` rule cannot allow it. Use network option `com.docker.network.bridge.trusted_host_interfaces` or daemon option `allow-direct-routing` for published ports (unpublished ports stay protected), or Gateway modes for all ports. A Kubernetes CNI plugin translating a Service address to a container address is treated the same way.
- Packets reach `DOCKER-USER` after DNAT, so flags match internal container IPs/ports. To match the original destination use the `conntrack` extension (may degrade performance). Run as root:

```console
$ iptables -I DOCKER-USER -p tcp -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
$ iptables -I DOCKER-USER -p tcp -m conntrack --ctorigdst 198.51.100.2 --ctorigdstport 80 -j ACCEPT
```

- Allow forwarding between host interfaces when `FORWARD` policy is `DROP`: `iptables -I DOCKER-USER -i src_if -o dst_if -j ACCEPT`.
- Allow only a subnet: `iptables -I DOCKER-USER -i ext_if ! -s 192.0.2.0/24 -j DROP`. For ranges add `-m iprange` and use `--src-range` / `--dst-range`, e.g. `iptables -I DOCKER-USER -m iprange -i ext_if ! --src-range 192.0.2.1-192.0.2.3 -j DROP`.
- When restricting external sources, also accept responses: `iptables -I DOCKER-USER -m state --state RELATED,ESTABLISHED -j ACCEPT`, placed before the `DROP` rules.
- Adapted: sudo commands rephrased as prerequisites (iptables rules require root).

## Related

- [Packet filtering and firewalls](./packet-filtering-firewalls.md)
- [Docker with nftables](./firewall-nftables.md)
- [Port publishing and mapping](./port-publishing.md)
