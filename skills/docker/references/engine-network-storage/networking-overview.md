---
source: https://docs.docker.com/engine/network/
---

# Networking overview

Container networking is the ability of containers to connect to each other and to non-Docker network services. A container only sees a network interface with an IP address, a gateway, a routing table, DNS services, and other networking details.

## Signature / Usage

```console
$ docker network create -d bridge my-net
$ docker run --network=my-net -it busybox
```

Container on the default bridge reaching the Internet (masquerading, no extra configuration):

```console
$ docker run --rm -ti busybox ping -c1 docker.com
```

## Options / Props

Built-in network drivers on Linux:

| Driver | Description |
| --- | --- |
| `bridge` | The default network driver. |
| `host` | Remove network isolation between the container and the Docker host. |
| `none` | Completely isolate a container from the host and other containers. |
| `overlay` | Swarm Overlay networks connect multiple Docker daemons together. |
| `ipvlan` | Connect containers to external VLANs. |
| `macvlan` | Containers appear as devices on the host's network. |

DNS-related `docker run` / `docker create` flags:

| Flag | Description |
| --- | --- |
| `--dns` | IP address of a DNS server. Use multiple flags for multiple servers. Requests are forwarded from the container's network namespace, so `--dns=127.0.0.1` refers to the container's own loopback. |
| `--dns-search` | A DNS search domain to search non-fully qualified hostnames. |
| `--dns-opt` | A key-value pair representing a DNS option and its value (see `resolv.conf` documentation). |
| `--hostname` | The hostname a container uses for itself. Defaults to the container's ID. |

`default-address-pools` built-in default (configurable in `/etc/docker/daemon.json`; `base` = subnet to allocate from, `size` = prefix length of each allocated subnet):

```json
{
  "default-address-pools": [
    { "base": "172.17.0.0/16", "size": 16 },
    { "base": "172.18.0.0/16", "size": 16 },
    { "base": "172.19.0.0/16", "size": 16 },
    { "base": "172.20.0.0/14", "size": 16 },
    { "base": "172.24.0.0/14", "size": 16 },
    { "base": "172.28.0.0/14", "size": 16 },
    { "base": "192.168.0.0/16", "size": 20 }
  ]
}
```

## Notes

- On first start, Docker Engine on Linux has one built-in network, the "default bridge". Containers run without `--network` connect to it. Containers on the default bridge reach each other by IP address only, not by name.
- Containers on a user-defined network can communicate by container IP address or container name.
- A container can be connected to multiple networks (`--network` multiple times, or `docker network connect`). Use `--ip` / `--ip6` to set the address on a given network, and `--alias` with `docker network connect` for an extra network alias.
- Default gateway is selected by Docker and may change when connections change. Set `gw-priority` (default `0`; highest wins) in `docker run --network name=gwnet,gw-priority=1` or `docker network connect` to pin it.
- IPv4 allocation is on by default and can be disabled with `--ipv4=false`; IPv6 is enabled with `--ipv6` (e.g. `docker network create --ipv6 --ipv4=false v6net`).
- Explicit subnets: `docker network create --ipv6 --subnet 192.0.2.0/24 --subnet 2001:db8::/64 mynet`. Without `--subnet`, Docker allocates from `default-address-pools`; when IPv6 is required and no IPv6 pool is configured, a ULA prefix is used.
- Unspecified addresses in `--subnet` (e.g. `--subnet ::/56 --subnet 0.0.0.0/24`) were introduced in Docker 29.0.0. If Docker is downgraded to an older version, networks created this way become unusable (remove and re-create them, or they work again on 29.0.0 or later).
- Containers on the default `bridge` receive a copy of the host `/etc/resolv.conf`. Containers on a custom network use Docker's embedded DNS server at `127.0.0.11` (no IPv6 equivalent), which forwards external lookups to the host's DNS servers. On a custom network the embedded server queries upstreams in order and stops after a success or `NXDOMAIN`; resolvers on the default bridge may query in parallel.
- Custom hosts in the host's `/etc/hosts` are not inherited by containers; use `--add-host`.
- `--network container:<name|id>` shares another container's network stack. Not supported in that mode: `--add-host`, `--hostname`, `--dns`, `--dns-search`, `--dns-option`, `--mac-address`, `--publish`, `--publish-all`, `--expose`.
- Windows containers have a different set of network drivers (see Microsoft documentation).

## Related

- [Network drivers](./network-drivers.md)
- [Port publishing and mapping](./port-publishing.md)
- [Bridge network driver](./driver-bridge.md)
- [Use IPv6 networking](./ipv6.md)
