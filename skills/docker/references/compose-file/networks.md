---
source: https://docs.docker.com/reference/compose-file/networks/
---

# Define and manage networks in Docker Compose

The top-level `networks` element configures named networks that can be reused across multiple services. By default Compose sets up a single network for your app.

## Signature / Usage

```yml
services:
  proxy:
    build: ./proxy
    networks:
      - frontend
  app:
    build: ./app
    networks:
      - frontend
      - backend
  db:
    image: postgres:18
    networks:
      - backend

networks:
  frontend:
    # Specify driver options
    driver: bridge
    driver_opts:
      com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
  backend:
    # Use a custom driver
    driver: custom-driver
```

`proxy` is isolated from `db` because they share no network; only `app` can talk to both.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `attachable` | boolean | If `true`, standalone containers can attach to this network in addition to services, and communicate with services and other attached standalone containers. |
| `driver` | string | Driver for this network. Compose returns an error if the driver is not available on the platform. |
| `driver_opts` | map | Driver-dependent key-value options passed to the driver. |
| `enable_ipv4` | boolean | Can be used to disable IPv4 address assignment. |
| `enable_ipv6` | boolean | Enables IPv6 address assignment. |
| `external` | boolean | If `true`, the network's lifecycle is maintained outside the application. Compose doesn't create it and returns an error if it doesn't exist. All other attributes apart from `name` are irrelevant; any other attribute makes the file invalid. |
| `ipam` | object | Custom IPAM configuration; see below. |
| `internal` | boolean | By default Compose provides external connectivity to networks. When `true`, creates an externally isolated network. |
| `labels` | array or map | Metadata; reverse-DNS notation recommended. Compose sets `com.docker.compose.project` and `com.docker.compose.network` labels. |
| `name` | string | Custom name for the network; used as is and not scoped with the project name. Can reference networks with special characters. |

`ipam` properties (each optional): `driver` (custom IPAM driver), `config` (list of `subnet` in CIDR format, `ip_range`, `gateway` for the master subnet, `aux_addresses` mapping hostname to IP), `options` (driver-specific key-value mapping).

```yml
networks:
  mynet1:
    ipam:
      driver: default
      config:
        - subnet: 172.28.0.0/16
          ip_range: 172.28.5.0/24
          gateway: 172.28.5.254
          aux_addresses:
            host1: 172.28.1.5
            host2: 172.28.1.6
            host3: 172.28.1.7
      options:
        foo: bar
        baz: "0"
```

External network, and `name` with a parameter:

```yml
networks:
  outside:
    external: true
```

```yml
networks:
  network1:
    external: true
    name: "${NETWORK_ID}"
```

## Notes

- Default network: when a Compose file doesn't declare explicit networks, Compose uses an implicit `default` network; services without explicit `networks` are connected to it. You can customize it:

```yml
networks:
  default:
    name: a_network # Use a custom name
    driver_opts:    # pass options to driver for network creation
      com.docker.network.bridge.host_binding_ipv4: 127.0.0.1
```

- To use a network across multiple services, each service must be granted access with the `networks` attribute in the `services` element.
- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: networks / ports / dns / hosts](./services-networking.md)
- [Volumes top-level element](./volumes.md)
