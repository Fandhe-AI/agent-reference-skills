---
source: https://docs.docker.com/engine/network/drivers/host/
---

# Host network driver

With `host` network mode the container's network stack isn't isolated from the Docker host (it shares the host's networking namespace) and the container doesn't get its own IP address.

## Signature / Usage

```console
$ docker run --rm -d --network host --name my_nginx nginx
```

## Notes

- A container binding to port 80 with host networking is available on port 80 of the host's IP address.
- Port mapping doesn't take effect: `-p`, `--publish`, `-P`, `--publish-all` are ignored and produce `WARNING: Published ports are discarded when using host network mode`.
- Useful to optimize performance and when a container needs to handle a large range of ports: no NAT and no "userland-proxy" per port.
- Supported on Docker Engine on Linux and on Docker Desktop 4.34 and later (opt-in: Settings > Resources > Network > Enable host networking).
- For a Swarm service, `docker service create --network host`: control traffic still goes over an overlay network, but service containers use the daemon's host network and ports (e.g. only one container binding port 80 per node).
- Docker Desktop limitations: processes in the container cannot bind to the host's IP addresses; works on layer 4 only (protocols below TCP/UDP unsupported); does not work with Enhanced Container Isolation; Linux containers only.
- Prerequisite for the Nginx example: port 80 must be free on the Docker host. Verify no new interface was created (`ip addr show`) and which process owns port 80 (check which process owns port 80 with `netstat -tulpn | grep :80`; requires root).
- Adapted: sudo commands rephrased as prerequisites.

## Related

- [Network drivers](./network-drivers.md)
- [Bridge network driver](./driver-bridge.md)
- [Port publishing and mapping](./port-publishing.md)
