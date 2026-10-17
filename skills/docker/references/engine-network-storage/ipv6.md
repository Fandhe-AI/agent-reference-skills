---
source: https://docs.docker.com/engine/daemon/ipv6/
---

# Use IPv6 networking

IPv6 is only supported on Docker daemons running on Linux hosts.

## Signature / Usage

```console
$ docker network create --ipv6 --subnet 2001:db8::/64 ip6net
$ docker run --rm --network ip6net -p 80:80 traefik/whoami
```

Docker Compose:

```yaml
networks:
  ip6net:
    enable_ipv6: true
    ipam:
      config:
        - subnet: 2001:db8::/64
```

## Options / Props

Default bridge network (`/etc/docker/daemon.json`; restart the Docker daemon after editing):

| Key | Description |
| --- | --- |
| `ipv6` | Enables IPv6 networking on the default network. |
| `fixed-cidr-v6` | Assigns a subnet to the default bridge, enabling dynamic IPv6 address allocation. |
| `ip6tables` | Enables additional IPv6 packet filter rules (network isolation and port mapping). Enabled by default, can be disabled. |
| `default-address-pools` | Pools used for dynamic subnet allocation; add IPv6 pools alongside the IPv4 defaults. |

```json
{
  "ipv6": true,
  "fixed-cidr-v6": "2001:db8:1::/64"
}
```

```json
{
  "default-address-pools": [
    { "base": "172.17.0.0/16", "size": 24 },
    { "base": "2001:db8::/56", "size": 64 }
  ]
}
```

## Notes

- `2001:db8::/64` is reserved for documentation; replace it with a valid IPv6 network, for example a ULA subnet from `fd00::/8`.
- Publishing port 80 with `-p 80:80` publishes on both IPv6 and IPv4; verify with `curl http://[::1]:80`.
- Dynamic allocation: networks without an explicit `--subnet` (including Compose networks with `enable_ipv6: true`) use the daemon's default address pools. With no IPv6 pool in `default-address-pools` and no `--subnet`, ULA `/64` subnets are used (40-bit Global ID based on the Engine's random ID). The built-in default pools contain no IPv6 pools. A custom config must include the default IPv4 pools plus your own IPv6 pools; the example gives 256 subnets from each pool (`/24` from a `/16`, `/64` from a `/56`).
- Docker in Docker: on a host using `xtables` (legacy iptables), kernel module `ip6_tables` must be loaded before an IPv6 network can be created. It is normally auto-loaded; if the DinD image isn't based on a recent official `docker` image, run `modprobe ip6_tables` on the host or start the containerized engine with `--ip6tables=false`.

- Adapted: sudo commands rephrased as prerequisites (restarting the daemon requires root).

## Related

- [Networking overview](./networking-overview.md)
- [Bridge network driver](./driver-bridge.md)
- [Port publishing and mapping](./port-publishing.md)
