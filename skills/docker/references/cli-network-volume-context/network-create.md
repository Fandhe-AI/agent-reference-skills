---
source: https://docs.docker.com/reference/cli/docker/network/create/
---

# docker network create

Create a network. `DRIVER` accepts the built-in `bridge` or `overlay`, or a third-party / custom network driver; the default is `bridge`.

## Signature / Usage

```console
$ docker network create [OPTIONS] NETWORK
$ docker network create -d bridge my-bridge-network
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--attachable` |  | API 1.25+ Enable manual container attachment |
| `--aux-address` |  | Auxiliary IPv4 or IPv6 addresses used by Network driver |
| `--config-from` |  | API 1.30+ The network from which to copy the configuration |
| `--config-only` |  | API 1.30+ Create a configuration only network |
| `-d`, `--driver` | `bridge` | Driver to manage the Network |
| `--gateway` |  | IPv4 or IPv6 Gateway for the master subnet |
| `--ingress` |  | API 1.29+ Create swarm routing-mesh network |
| `--internal` |  | Restrict external access to the network |
| `--ip-range` |  | Allocate container ip from a sub-range |
| `--ipam-driver` |  | IP Address Management Driver |
| `--ipam-opt` |  | Set IPAM driver specific options |
| `--ipv4` | `true` | Enable or disable IPv4 address assignment |
| `--ipv6` |  | Enable or disable IPv6 address assignment |
| `--label` |  | Set metadata on a network |
| `-o`, `--opt` |  | Set driver specific options |
| `--scope` |  | API 1.30+ Control the network's scope |
| `--subnet` |  | Subnet in CIDR format that represents a network segment |

## Notes

- Engine creates a default `bridge` network (the `docker0` bridge) on install; it cannot be removed, and new containers from `docker run` connect to it automatically.
- Bridge networks are isolated on a single Engine. A network spanning multiple hosts requires Swarm mode and an `overlay` network: `docker network create --scope=swarm --attachable -d overlay my-multihost-network`.
- Swarm-scoped networks do not allow manually started containers by default; `--attachable` lifts this restriction.
- Network names must be unique; the daemon attempts to detect conflicts but it is not guaranteed.
- Overlay limitation: create overlay networks with `/24` blocks (the default, 256 IPs) when using the default VIP-based endpoint mode. For more addresses use `dnsrr` endpoint mode with an external load balancer, or multiple smaller overlay networks.
- On a `bridge` network only a single subnet can be created. Overlapping subnets make the create fail.

```console
$ docker network create \
  --driver=bridge \
  --subnet=172.28.0.0/16 \
  --ip-range=172.28.5.0/24 \
  --gateway=172.28.5.254 \
  br0
```

- Bridge driver options (`-o`) and their `docker0` daemon equivalents:

| Network create option | Daemon option for `docker0` | Description |
| --- | --- | --- |
| `com.docker.network.bridge.name` | - | Bridge name to be used when creating the Linux bridge |
| `com.docker.network.bridge.enable_ip_masquerade` | `--ip-masq` | Enable IP masquerading |
| `com.docker.network.bridge.enable_icc` | `--icc` | Enable or Disable Inter Container Connectivity |
| `com.docker.network.bridge.host_binding_ipv4` | `--ip` | Default IP when binding container ports |
| `com.docker.network.driver.mtu` | `--mtu` | Set the containers network MTU |
| `com.docker.network.container_iface_prefix` | - | Set a custom prefix for container interfaces |

- Options valid for any driver, with `docker0` equivalents: `--gateway` (-), `--ip-range` (`--fixed-cidr`, `--fixed-cidr-v6`), `--internal` (-), `--ipv4` (-), `--ipv6` (`--ipv6`), `--subnet` (`--bip`, `--bip6`).
- `--internal`: containers can talk to each other but not to other networks (no default route; firewall rules drop traffic to or from other networks). Communication with the gateway IP and the host is possible. For `overlay`, Docker otherwise also connects a bridge network for external connectivity; `--internal` isolates it.
- `--ingress`: creates the swarm routing-mesh network. Only one ingress network can exist; it can be removed only if no services depend on it. All overlay options apply except `--attachable`.
- Swarm networks with local scope drivers: promote with `--scope swarm`. For cross-host drivers such as macvlan, create per-node `--config-only` networks and reference them with `--config-from`:

```console
node1$ docker network create --config-only --subnet 192.168.100.0/24 --gateway 192.168.100.115 mv-config
node2$ docker network create --config-only --subnet 192.168.200.0/24 --gateway 192.168.200.202 mv-config
node1$ docker network create -d macvlan --scope swarm --config-from mv-config --attachable swarm-network
```

- Services can use the predefined `bridge` and `host` networks: `docker service create --name my-service --network host --replicas 2 busybox top`.

## Related

- [docker network connect](./network-connect.md)
- [docker network ls](./network-ls.md)
- [docker network rm](./network-rm.md)
