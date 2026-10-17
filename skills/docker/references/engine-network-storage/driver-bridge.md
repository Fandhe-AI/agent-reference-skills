---
source: https://docs.docker.com/engine/network/drivers/bridge/
---

# Bridge network driver

A Docker bridge network has an IPv4 subnet and, optionally, an IPv6 subnet. Each container connected to it has a network interface with addresses in the network's subnets. Bridge networks apply to containers on the same Docker daemon host.

## Signature / Usage

```console
$ docker network create my-net
$ docker create --name my-nginx \
  --network my-net \
  --publish 8080:80 \
  nginx:latest
$ docker network connect my-net my-nginx
$ docker network disconnect my-net my-nginx
$ docker network rm my-net
```

## Options / Props

Driver options passed with `--opt` / `-o` to `docker network create`:

| Option | Default | Description |
| --- | --- | --- |
| `com.docker.network.bridge.name` |  | Interface name to use when creating the Linux bridge. |
| `com.docker.network.bridge.enable_ip_masquerade` | `true` | Enable IP masquerading. |
| `com.docker.network.host_ipv4`, `com.docker.network.host_ipv6` |  | Address to use for source NAT (see port publishing, masquerade or SNAT). |
| `com.docker.network.bridge.gateway_mode_ipv4`, `com.docker.network.bridge.gateway_mode_ipv6` | `nat` | Control external connectivity (see port publishing, gateway modes). |
| `com.docker.network.bridge.enable_icc` | `true` | Enable or disable inter-container connectivity. |
| `com.docker.network.bridge.host_binding_ipv4` | all IPv4 and IPv6 addresses | Default IP when binding container ports. |
| `com.docker.network.driver.mtu` | `0` (no limit) | Set the containers network Maximum Transmission Unit (MTU). |
| `com.docker.network.container_iface_prefix` | `eth` | Set a custom prefix for container interfaces. |
| `com.docker.network.bridge.inhibit_ipv4` | `false` | Prevent Docker from assigning an IP address to the bridge. |

Equivalent `dockerd` flags for the default `docker0` bridge:

| Option | Flag |
| --- | --- |
| `com.docker.network.bridge.name` | - |
| `com.docker.network.bridge.enable_ip_masquerade` | `--ip-masq` |
| `com.docker.network.bridge.enable_icc` | `--icc` |
| `com.docker.network.bridge.host_binding_ipv4` | `--ip` |
| `com.docker.network.driver.mtu` | `--mtu` |
| `com.docker.network.container_iface_prefix` | - |

Default bridge configuration in `daemon.json` (only specify what you need; restart Docker afterwards):

```json
{
  "bip": "192.168.1.1/24",
  "fixed-cidr": "192.168.1.0/25",
  "mtu": 1500,
  "default-gateway": "192.168.1.254",
  "dns": ["10.20.1.2", "10.20.1.3"]
}
```

Default bridge IPv6 options (`ipv6` required; the others optional; these affect only the default bridge):

```json
{
  "ipv6": true,
  "bip6": "2001:db8::1111/64",
  "fixed-cidr-v6": "2001:db8::/64",
  "default-gateway-v6": "2001:db8:abcd::89"
}
```

## Notes

- Default behavior: unrestricted access to containers in the network from the host and other containers on the same bridge; blocks access from other networks and from outside the Docker host; masquerading for external access; port publishing supported.
- User-defined bridges are superior to the default `bridge`: automatic DNS resolution between containers by name or alias; better isolation (containers without `--network` all land on the default bridge); containers can be attached/detached on the fly; each user-defined network has its own configurable bridge (MTU, `iptables` rules); legacy `--link` env-variable sharing isn't possible on user-defined networks.
- Containers on the same user-defined bridge effectively expose all ports to each other; to be reachable from other networks or non-Docker hosts a port must be published with `-p` / `--publish`.
- The default `bridge` network is considered a legacy detail and is not recommended for production use. Configuring it requires `daemon.json` edits and a Docker restart.
- IPv6: `docker network create --ipv6 --subnet 2001:db8:1234::/64 my-net` (a ULA prefix is chosen if no `--subnet`). IPv6-only: `docker network create --ipv6 --ipv4=false v6net`; IPv4 cannot be disabled on the default bridge.
- Default host binding: with no host address in `-p 80` / `-p 8080:80`, the port is available on all host addresses (IPv4 and IPv6). `host_binding_ipv4` can change this (an IPv6 address is allowed despite the name). Setting it to `::` limits to the host's IPv6 addresses; `0.0.0.0` covers IPv4 and IPv6. To restrict a published port to IPv4 only, include the address in the publish option, e.g. `-p 0.0.0.0:8080:80`.
- `dockerd --bridge` defines your own `docker0` bridge (use when running multiple daemon instances on one host).
- Connection limit: bridge networks become unstable and inter-container communication may break when 1000 or more containers connect to a single network (Linux kernel limitation, moby/moby#44973).
- `com.docker.network.bridge.inhibit_ipv4`: north-south traffic won't work unless you manually configure the gateway address on the bridge or an attached device. Only for user-defined bridge networks.
- Removing a network with containers connected requires disconnecting them first. Docker manages the underlying bridge devices and `iptables` rules; treat these as implementation details.
- On the default bridge, containers cannot resolve each other by name (e.g. `ping alpine2` fails with `bad address`); on a user-defined bridge they can (only custom container names, not auto-generated ones).

## Related

- [Network drivers](./network-drivers.md)
- [Port publishing and mapping](./port-publishing.md)
- [Legacy container links](./links.md)
- [Use IPv6 networking](./ipv6.md)
