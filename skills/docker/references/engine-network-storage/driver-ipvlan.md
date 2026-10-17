---
source: https://docs.docker.com/engine/network/drivers/ipvlan/
---

# IPvlan network driver

The IPvlan driver gives total control over both IPv4 and IPv6 addressing. The VLAN driver builds on it with layer 2 VLAN tagging and IPvlan L3 routing for underlay network integration. Containers attach directly to a Linux Ethernet interface or sub-interface, with no Linux bridge in between.

## Signature / Usage

```console
$ docker network create -d ipvlan \
    --subnet=192.168.1.0/24 \
    --gateway=192.168.1.1 \
    -o ipvlan_mode=l2 \
    -o parent=eth0 db_net

$ docker run --net=db_net -it --rm alpine /bin/sh
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `ipvlan_mode` | `l2` | Sets the IPvlan operating mode. One of: `l2`, `l3`, `l3s` |
| `ipvlan_flag` | `bridge` | Sets the IPvlan mode flag. One of: `bridge`, `private`, `vepa` |
| `parent` |  | Specifies the parent interface to use. |

## Notes

- Requires Linux kernel v4.2+ (earlier kernels are buggy). Examples are single host; a sub-interface like `eth0.10` can be replaced with `eth0` or any valid parent interface. Sub-interfaces with a `.` are created on the fly. If `-o parent` is omitted, the driver creates a `dummy` parent interface (the result is identical to `--internal`: completely isolated network).
- If `--gateway` is left empty, the first usable address of the subnet is the gateway. If no `--subnet` is given, the default IPAM subnet `172.18.0.0/16` is assigned.
- In L2 mode containers cannot ping the underlying host interfaces (intentionally filtered by Linux). Different subnets on the same parent in L2 mode cannot reach each other without an external router; L3 mode routes unicast between subnets sharing the same `-o parent`.
- 802.1Q trunking: use `-o parent=eth0.20` (`interface_name.vlan_tag`) and Docker creates/deletes the VLAN sub-interface (`docker network rm` deletes only sub-interfaces with netlink parent index > 0). Other naming works if the interface exists and is up, but links are not deleted automatically (create/remove with `ip link add link eth0 name eth0.40 type vlan id 40` / `ip link set eth0.40 up` / `ip link del foo`).
- L3 mode: the IPvlan network needs its own subnet distinct from the parent's subnet; route distribution is not handled by the driver (remote hosts need a route to the container subnet via the Docker host); `--gateway` is ignored in `l3` mode (container default route is `default dev eth0`); broadcast and multicast traffic is dropped. `-o ipvlan_mode=l3` must be given explicitly.
- Dual stack: `--ipv6 --subnet=2001:db8:abc2::/64 --gateway=2001:db8:abc2::22 -o parent=eth0.139` for IPv6, plus multiple `--subnet`/`--gateway` pairs for IPv4.
- Router-assigned IPv6 (SLAAC): when the network has no IPv6 subnet Docker disables IPv6 on the container interface. Re-enable with `docker network connect --driver-opt="com.docker.network.endpoint.sysctls=net.ipv6.conf.IFNAME.disable_ipv6=0" my-ipvlan-net my-container` (use literal `IFNAME`; it is a per-interface sysctl so it cannot be set with `docker run --sysctl`).
- Known issue noted in docs: specifying `--ip6=` then deleting and re-creating a container with the same v6 address may fail with `Address already in use`.
- Compared with Macvlan: IPvlan doesn't assign a MAC address per container (containers use the parent interface's MAC), so fewer MAC addresses are seen on the network.

## Related

- [Macvlan network driver](./driver-macvlan.md)
- [Network drivers](./network-drivers.md)
- [Use IPv6 networking](./ipv6.md)
