---
source: https://docs.docker.com/engine/network/drivers/macvlan/
---

# Macvlan network driver

The `macvlan` driver assigns a MAC address to each container's virtual network interface, making it appear as a physical interface directly connected to the physical network. You designate a physical parent interface on the Docker host plus the subnet and gateway.

## Signature / Usage

```console
$ docker network create -d macvlan \
  --subnet=172.16.86.0/24 \
  --gateway=172.16.86.1 \
  -o parent=eth0 pub_net
```

802.1Q trunk bridge mode (a dot in the parent name makes Docker create the sub-interface):

```console
$ docker network create -d macvlan \
    --subnet=192.168.50.0/24 \
    --gateway=192.168.50.1 \
    -o parent=eth0.50 macvlan50
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `macvlan_mode` | `bridge` | Sets the Macvlan mode. One of: `bridge`, `vepa`, `passthru`, `private` |
| `parent` |  | Specifies the parent interface to use. |

## Notes

- Platform: Linux hosts only. Not supported on Docker Desktop for Mac or Windows, or Docker Engine on Windows. Most cloud providers block macvlan. Requires Linux kernel 3.9+ (4.0+ recommended). Not supported in rootless mode.
- Considerations: risk of IP address exhaustion or "VLAN spread" (too many unique MAC addresses); networking equipment must handle promiscuous mode; bridge or overlay may be better long term; containers on a macvlan network cannot communicate with the host directly (Linux kernel restriction). Workarounds: also connect containers to a bridge network, or create a macvlan interface on the host with the same parent interface and an address in the Docker network's subnet.
- Exclude addresses with `--aux-address` (e.g. `--ip-range=192.168.32.128/25 --aux-address="my-router=192.168.32.129"`).
- IPvlan alternative: `-d ipvlan -o ipvlan_mode=l2 -o parent=eth0` doesn't assign a MAC per container (the parent's MAC is used).
- Dual-stack IPv4/IPv6 macvlan requires the daemon to be configured for IPv6. Router-assigned IPv6 (SLAAC): re-enable IPv6 on the interface with `docker network connect --driver-opt="com.docker.network.endpoint.sysctls=net.ipv6.conf.IFNAME.disable_ipv6=0" my-macvlan-net my-container` (literal `IFNAME`; per-interface sysctl cannot be set with `docker run --sysctl`).
- Examples assume the ethernet interface is `eth0`; inspect the container's `MacAddress` under `Networks` with `docker container inspect`.

## Related

- [IPvlan network driver](./driver-ipvlan.md)
- [Network drivers](./network-drivers.md)
- [Use IPv6 networking](./ipv6.md)
