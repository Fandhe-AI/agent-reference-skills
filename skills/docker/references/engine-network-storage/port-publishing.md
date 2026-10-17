---
source: https://docs.docker.com/engine/network/port-publishing/
---

# Port publishing and mapping

By default, for both IPv4 and IPv6, the Docker daemon blocks access to ports that have not been published. Published container ports are mapped to host IP addresses using firewall rules that perform NAT, PAT, and masquerading.

## Signature / Usage

```console
$ docker run -p 8080:80 [...]
$ docker run -p 127.0.0.1:8080:80 -p '[::1]:8080:80' nginx
```

## Options / Props

`-p` / `--publish` examples:

| Flag value | Description |
| --- | --- |
| `-p 8080:80` | Map port `8080` on the Docker host to TCP port `80` in the container. |
| `-p 192.168.1.100:8080:80` | Map port `8080` on host IP `192.168.1.100` to TCP port `80` in the container. |
| `-p 8080:80/udp` | Map port `8080` on the Docker host to UDP port `80` in the container. |
| `-p 8080:80/tcp -p 8080:80/udp` | Map TCP `8080` to TCP `80` and UDP `8080` to UDP `80`. |

Bridge driver gateway modes (`com.docker.network.bridge.gateway_mode_ipv4` / `gateway_mode_ipv6`, default `nat`):

| Mode | Behavior |
| --- | --- |
| `nat` | NAT and masquerading rules are set up for each published container port; packets leaving the host use a host address. |
| `nat-unprotected` | Unpublished container ports are also reachable via direct routing; no port filtering rules. Included for compatibility with legacy default behaviour. |
| `routed` | No NAT or masquerading, but firewall rules still allow only published container ports. Outgoing packets use the container's address. |
| `isolated` | Only with a network created with `--internal` (or equivalent). No address is assigned to the bridge. |

Daemon options used on this page:

| Name | Where | Description |
| --- | --- | --- |
| `allow-direct-routing` | `daemon.json` / `--allow-direct-routing` | Allow direct access to any published port on any container in any Linux bridge network. |
| `com.docker.network.bridge.trusted_host_interfaces` | network option | Allow direct routing to a specific bridge network via specific host interfaces (colon-separated, e.g. `"vxlan.1:eth3"`). |
| `default-network-opts` | `daemon.json` | Default driver options for user-defined networks (e.g. bridge `host_binding_ipv4`). |
| `ip` | `daemon.json` / `dockerd --ip` | Default binding address for the default bridge; restart the daemon to apply. |

```json
{
  "default-network-opts": {
    "bridge": {
      "com.docker.network.bridge.host_binding_ipv4": "127.0.0.1"
    }
  }
}
```

## Notes

- Publishing container ports is insecure by default: the port becomes available to the outside world. Include `127.0.0.1` / `::1` to restrict to the Docker host. In releases older than 28.0.0, hosts within the same L2 segment can reach ports published to localhost (moby/moby#45610).
- Ports on the host's IPv6 addresses map to the container's IPv4 address when no host IP is given, the bridge network is IPv4-only and `--userland-proxy=true` (default).
- Direct routing: remote hosts must have a route to the bridge network via an address on the Docker host (static routes, BGP, etc.). By default remote hosts can only reach published ports on host addresses.
- In `nat` mode, publishing to a loopback address makes the port inaccessible to remote hosts. With IP forwarding enabled, a port published to a specific host address in `nat` mode can be reached via other host interfaces using direct routing to that host address.
- In `nat` / `nat-unprotected` modes containers in other bridge networks can only reach published ports via host addresses; in `routed` mode they can use direct routing.
- In `routed` mode the host port in `-p` is not used; the host address only chooses IPv4 vs IPv6. Use only `0.0.0.0` or `::` and no host port, otherwise a warning is logged and the value has no effect. Example IPv6-only mapping: `docker run --network mynet -p '[::]::80'`.
- `isolated` mode: in a plain `--internal` network the bridge is assigned an address so host processes and containers can reach each other; with `isolated` no bridge address is assigned.
- Default bind address for published ports is all host addresses (`0.0.0.0` and `[::]`). Set per network with `-o "com.docker.network.bridge.host_binding_ipv4=127.0.0.1"` or for all user-defined bridges with `default-network-opts`. It doesn't affect Swarm services (always exposed on `0.0.0.0`). Default bridge: `{"ip": "127.0.0.1"}` in `daemon.json`.
- Masquerading is on by default for bridge networks; disable per network with `-o com.docker.network.bridge.enable_ip_masquerade=false`. Use `com.docker.network.host_ipv4` / `com.docker.network.host_ipv6` for a specific SNAT address (requires `enable_ip_masquerade=true`).
- Create a network for IPv6 direct routing with NAT for IPv4: `docker network create --ipv6 --subnet 2001:db8::/64 -o com.docker.network.bridge.gateway_mode_ipv6=routed mynet`.

## Related

- [Bridge network driver](./driver-bridge.md)
- [Packet filtering and firewalls](./packet-filtering-firewalls.md)
- [Networking overview](./networking-overview.md)
