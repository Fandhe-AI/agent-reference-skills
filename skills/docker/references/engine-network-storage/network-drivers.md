---
source: https://docs.docker.com/engine/network/drivers/
---

# Network drivers

Docker's networking subsystem is pluggable, using drivers. Several drivers exist by default and provide core networking functionality.

## Signature / Usage

```console
$ docker network create -d <driver> <network-name>
$ docker run --network <network-name> ...
```

## Options / Props

| Driver | Description |
| --- | --- |
| `bridge` | The default network driver. If you don't specify a driver, this is the type of network you are creating. Used when an application in a container needs to communicate with other containers on the same host. |
| `host` | Remove network isolation between the container and the Docker host, and use the host's networking directly. |
| `overlay` | Overlay networks connect multiple Docker daemons together and enable Swarm services and containers to communicate across nodes, removing the need for OS-level routing. |
| `ipvlan` | Total control over both IPv4 and IPv6 addressing; the VLAN driver builds on it with layer 2 VLAN tagging and IPvlan L3 routing for underlay network integration. |
| `macvlan` | Assign a MAC address to a container, making it appear as a physical device on your network. Docker routes traffic to containers by MAC address. Often best for legacy applications that expect to be directly connected to the physical network. |
| `none` | Completely isolate a container from the host and other containers. `none` is not available for Swarm services. |
| Network plugins | Third-party network plugins can be installed and used with Docker. |

## Notes

- The default bridge network suits containers that don't require special networking capabilities.
- User-defined bridge networks let containers on the same Docker host communicate; a user-defined network typically defines an isolated network for the containers of a common project or component.
- Host network shares the host's network with the container (no isolation).
- Overlay is best when containers on different Docker hosts must communicate, or when multiple applications work together using Swarm services.
- Macvlan is best when migrating from a VM setup or when containers must look like physical hosts, each with a unique MAC address.
- IPvlan is similar to Macvlan but doesn't assign unique MAC addresses to containers; consider it when the number of MAC addresses on a network interface or port is restricted.

## Related

- [Networking overview](./networking-overview.md)
- [Bridge network driver](./driver-bridge.md)
- [Host network driver](./driver-host.md)
- [Overlay network driver](./driver-overlay.md)
- [IPvlan network driver](./driver-ipvlan.md)
- [Macvlan network driver](./driver-macvlan.md)
- [None network driver](./driver-none.md)
