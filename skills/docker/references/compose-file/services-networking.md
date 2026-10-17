---
source: https://docs.docker.com/reference/compose-file/services/#networks
---

# services: networks / ports / dns / hosts

Network attachment, port publishing, DNS, and host-name mapping for service containers.

## Signature / Usage

```yml
services:
  some-service:
    networks:
      - some-network
      - other-network
    ports:
      - "8000:8000"
      - "127.0.0.1:8001:8001"
    dns:
      - 8.8.8.8
      - 9.9.9.9
    extra_hosts:
      - "somehost=162.242.195.82"
```

## Notes

### `networks`

Defines the networks that service containers are attached to, referencing entries under the `networks` top-level element.

```yml
services:
  some-service:
    networks:
      - some-network
      - other-network
```

Implicit default network: if `networks` is empty or absent, the service is connected to the `default` network. This is equivalent to:

```yml
services:
  some-service:
    image: foo
    networks:
      default: {}
```

To not connect the service to any network, set `network_mode: none`.

Per-network attributes:

| Attribute | Description |
| --- | --- |
| `aliases` | Alternative hostnames for the service on the network. Network-scoped, so the same service can have different aliases on different networks. A network-wide alias can be shared by multiple containers and services; which container the name resolves to is then not guaranteed. |
| `interface_name` | Name of the network interface used to connect the service to the network. |
| `ipv4_address`, `ipv6_address` | Static IP address on join. The top-level network must have an `ipam` attribute with subnet configurations covering each static address. |
| `link_local_ips` | List of link-local IPs. |
| `mac_address` | MAC address used by the service container when connecting to this network. |
| `driver_opts` | Driver-dependent key-value options passed to the driver. |
| `gw_priority` | The network with the highest `gw_priority` is the default gateway for the container. Default 0. |
| `priority` | Order in which Compose connects the service's containers to networks. Default 0. Does not affect default gateway selection (use `gw_priority`) and cannot determine device names (`eth0` etc.). |

```yml
services:
  frontend:
    image: example/webapp
    networks:
      front-tier:
        aliases:
          - alias1
        interface_name: eth0
        ipv4_address: 172.16.238.10
        ipv6_address: 2001:3984:3989::10
        gw_priority: 1
        priority: 1000

networks:
  front-tier:
    ipam:
      driver: default
      config:
        - subnet: "172.16.238.0/24"
        - subnet: "2001:3984:3989::/64"
```

Note: the snippet above combines per-network attributes documented one at a time on the official page; each is shown there in its own example.

### `network_mode`

Sets a service container's network mode.

| Value | Behavior |
| --- | --- |
| `bridge` | Connects to Docker's default bridge network instead of a project-specific network. Containers on the default bridge cannot resolve each other by service name; use a user-defined network for DNS resolution. |
| `none` | Turns off all container networking. |
| `host` | Gives the container raw access to the host's network interface. |
| `service:{name}` | Gives the container access to the specified container by service name. |
| `container:{name}` | Gives the container access to the specified container by container ID. |

```yml
    network_mode: "bridge"
    network_mode: "host"
    network_mode: "none"
    network_mode: "service:[service name]"
```

When set, the `networks` attribute is not allowed and Compose rejects any file containing both.

### `ports`

Defines the port mappings between the host machine and the containers. Port mapping must not be used with `network_mode: host` (runtime error).

Short syntax is `[HOST:]CONTAINER[/PROTOCOL]`:

- `HOST` is `[IP:](port | range)` (optional). If not set, it binds to all network interfaces (`0.0.0.0`).
- `CONTAINER` is `port | range`.
- `PROTOCOL` is `tcp` or `udp` (optional, default `tcp`).
- `HOST:CONTAINER` should always be a quoted string to avoid conflicts with YAML base-60 float. `HOST` and `CONTAINER` must use equivalent ranges. If only the container port is given, the runtime allocates an unassigned host port. IPv6 addresses can be enclosed in square brackets.
- If no host IP is specified (such as `127.0.0.1`), Docker binds to all interfaces (`0.0.0.0`), bypassing host firewall rules, which can expose the container to the internet if the host has a public IP.
- If host IP mapping is not supported by a container engine, Compose rejects the file and ignores the specified host IP.

```yml
ports:
  - "3000"
  - "3000-3005"
  - "8000:8000"
  - "9090-9091:8080-8081"
  - "49100:22"
  - "8000-9000:80"
  - "127.0.0.1:8001:8001"
  - "127.0.0.1:5000-5010:5000-5010"
  - "::1:6000:6000"
  - "[::1]:6001:6001"
  - "6060:6060/udp"
```

Long syntax fields:

| Field | Description |
| --- | --- |
| `target` | The container port. |
| `published` | The publicly exposed port, as a string; can be a range `start-end` (a remaining available port within the range is assigned). |
| `host_ip` | Host IP mapping; defaults to all interfaces (`0.0.0.0`). |
| `protocol` | `tcp` or `udp`; default `tcp`. |
| `app_protocol` | Application protocol (L7) the port is used for; an optional hint for richer Compose behavior. Introduced in Docker Compose 2.26.0. |
| `mode` | How the port is published in a Swarm setup: `host` publishes on every node, `ingress` allows load balancing across nodes (default). |
| `name` | Human-readable name for the port, documenting its usage. |

```yml
ports:
  - name: web
    target: 80
    host_ip: 127.0.0.1
    published: "8080"
    protocol: tcp
    app_protocol: http
    mode: host

  - name: web-secured
    target: 443
    host_ip: 127.0.0.1
    published: "8083-9000"
    protocol: tcp
    app_protocol: https
    mode: host
```

### `expose`

Defines the incoming port or range of ports that Compose exposes from the container. These ports must be accessible to linked services and should not be published to the host. Only internal container ports can be specified. Syntax is `<portnum>/[<proto>]` or `<startport-endport>/[<proto>]`; default protocol `tcp`.

```yml
expose:
  - "3000"
  - "8000"
  - "8080-8085/tcp"
```

If the image's Dockerfile already exposes ports, they are visible to other containers on the network even if `expose` is not set.

### `dns`

Custom DNS servers to set on the container network interface configuration. A single value or a list.

```yml
dns:
  - 8.8.8.8
  - 9.9.9.9
```

### `dns_opt`

Custom DNS options passed to the container's DNS resolver (`/etc/resolv.conf` on Linux).

```yml
dns_opt:
  - use-vc
  - no-tld-query
```

### `dns_search`

Custom DNS search domains. A single value or a list.

```yml
dns_search:
  - dc1.example.com
  - dc2.example.com
```

### `extra_hosts`

Adds hostname mappings to the container network interface configuration (`/etc/hosts` for Linux).

Short syntax uses `HOSTNAME=IP` strings. IPv6 addresses can be enclosed in square brackets. The separator `=` is preferred, but `:` can also be used (introduced in Docker Compose 2.24.1).

```yml
extra_hosts:
  - "somehost=162.242.195.82"
  - "otherhost=50.31.209.229"
  - "myhostv6=[::1]"
```

Long syntax is a mapping between hostnames and IPs:

```yml
extra_hosts:
  somehost: "162.242.195.82"
  otherhost: "50.31.209.229"
  myhostv6: "::1"
```

On Linux, `/etc/hosts` gets matching extra lines (`162.242.195.82  somehost`, ...).

### `links`

Defines a network link to containers in another service: either `SERVICE:ALIAS`, or just the service name.

```yml
web:
  links:
    - db
    - db:database
    - redis
```

Links are not required to enable services to communicate; with no specific network configuration, any service reaches any other at its service name on the `default` network. `links` does not override the network configuration, and Compose doesn't warn about a mismatch. Links also express an implicit dependency, like `depends_on`, so they determine startup order.

### `external_links`

Links service containers to services managed outside of your Compose application, by the name of an existing service retrieved with the platform lookup mechanism. An alias of the form `SERVICE:ALIAS` can be specified.

```yml
external_links:
  - redis
  - database:mysql
  - database:postgresql
```

### `mac_address`

Sets a MAC address for the service container. Available with Docker Compose 2.24.0 and later. Container runtimes might reject this value (for example Docker Engine >= v25.0); in that case use `networks.mac_address` instead.

### Other notes

- Services without explicit `networks` join the implicit `default` network and reach each other by service name; `links` is not required for communication.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [Networks top-level element](./networks.md)
- [services: volumes / tmpfs / configs / secrets](./services-storage.md)
