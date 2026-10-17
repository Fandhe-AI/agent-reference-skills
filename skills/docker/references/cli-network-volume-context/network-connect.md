---
source: https://docs.docker.com/reference/cli/docker/network/connect/
---

# docker network connect

Connect a container to a network. The container can be given by name or ID; once connected it can communicate with other containers in the same network.

## Signature / Usage

```console
$ docker network connect [OPTIONS] NETWORK CONTAINER
$ docker network connect --alias db --alias mysql multi-host-network container2
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--alias` |  | Add network-scoped alias for the container |
| `--driver-opt` |  | driver options for the network |
| `--gw-priority` |  | Highest gw-priority provides the default gateway. Accepts positive and negative values. |
| `--ip` | `<nil>` | IPv4 address (e.g., `172.30.100.104`) |
| `--ip6` | `<nil>` | IPv6 address (e.g., `2001:db8::33`) |
| `--link` |  | Add link to another container |
| `--link-local-ip` |  | Add a link-local address for the container |

## Notes

- `docker run --network=<network-name>` starts a container and connects it to a network in one step: `docker run -itd --network=multi-host-network busybox`.
- `--link` is the legacy option: `docker network connect --link container1:c1 multi-host-network container2`.
- Per-interface `sysctl` settings starting with `net.ipv4.` and `net.ipv6.` can be set via `--driver-opt` label `com.docker.network.endpoint.sysctls`; the interface name must be replaced by `IFNAME`. Network drivers may restrict the sysctl settings that can be modified, and new restrictions may be added in the future.
- A container connects to its configured networks when it runs. If specified, the container's IP address(es) is reapplied when a stopped container is restarted; if the address is no longer available the container fails to start. To guarantee availability, create the network with `--ip-range` and choose static addresses from outside that range.
- Verify with `docker network inspect`; remove with `docker network disconnect`.
- A container can be connected to one or more networks of different types (for example bridge and overlay). For overlay networks or custom plugins that support multi-host connectivity, containers on different Engines can communicate.

## Related

- [docker network disconnect](./network-disconnect.md)
- [docker network create](./network-create.md)
- [docker network inspect](./network-inspect.md)
