---
source: https://docs.docker.com/engine/network/drivers/overlay/
---

# Overlay network driver

The `overlay` driver creates a distributed network among multiple Docker daemon hosts, sitting on top of the host-specific networks. Docker routes each packet to the correct daemon host and destination container.

## Signature / Usage

```console
$ docker network create -d overlay --attachable my-attachable-overlay
```

A prerequisite for doing this is that the hosts have joined the same Swarm.

To join an overlay network named `multi-host-network` with a `busybox` container:

```console
$ docker run --network multi-host-network busybox sh
```

Encrypted overlay:

```console
$ docker network create \
  --opt encrypted \
  --driver overlay \
  --attachable \
  my-attachable-multi-host-network
```

## Options / Props

Ports that must be open between participating hosts:

| Ports | Description |
| --- | --- |
| `2377/tcp` | Default Swarm control plane port, configurable with `docker swarm join --listen-addr` |
| `4789/udp` | Default overlay traffic port, configurable with `docker swarm init --data-path-port` |
| `7946/tcp`, `7946/udp` | Used for communication among nodes, not configurable |

Publish flags on an overlay network:

| Flag value | Description |
| --- | --- |
| `-p 8080:80` | Map TCP port 80 in the container to port `8080` on the overlay network. |
| `-p 8080:80/udp` | Map UDP port 80 in the container to port `8080` on the overlay network. |
| `-p 8080:80/sctp` | Map SCTP port 80 in the container to port `8080` on the overlay network. |
| `-p 8080:80/tcp -p 8080:80/udp` | Map TCP port 80 to TCP `8080` and UDP port 80 to UDP `8080` on the overlay network. |

## Notes

- Docker hosts must be part of a swarm to use overlay networks, even when connecting standalone containers (Swarm mode is required to establish the connection between hosts). Overlay networks are often used to connect Swarm services; for that, see Swarm service networking documentation.
- `--attachable` lets both standalone containers and Swarm services connect. Without it, only Swarm services can connect.
- `--opt encrypted` enables IPsec encryption at the VXLAN level; this imposes a non-negligible performance penalty, so test before production. Do not attach Windows containers to encrypted overlay networks: encryption isn't supported on Windows, Swarm doesn't report an error, but Windows containers can't communicate with Linux containers on the network and data between Windows containers isn't encrypted.
- Containers are discoverable by DNS lookup using the container name; automatic DNS discovery only works with unique container names.
- After `docker swarm init`/`join`, each host has an overlay network `ingress` and a bridge network `docker_gwbridge` (connects `ingress` to the host's network interface). Services created without a network connect to `ingress`; using separate overlay networks per application is recommended.
- Overlay networks are created automatically on worker nodes as needed for service tasks, but aren't automatically removed.
- Connection limit: overlay networks become unstable and inter-container communication may break when 1000 containers are co-located on the same host (moby/moby#44973).
- All usage examples require at least a single-node swarm (`docker swarm init`). Services can only be created on a manager (`docker service create --name my-nginx --publish target=80,published=80 --replicas=5 --network nginx-net nginx`).
- `overlay` and Swarm: Swarm mode itself is outside this skill's `engine-*` scope.

## Related

- [Network drivers](./network-drivers.md)
- [Bridge network driver](./driver-bridge.md)
- [Networking overview](./networking-overview.md)
