---
source: https://docs.docker.com/reference/cli/docker/network/disconnect/
---

# docker network disconnect

Disconnect a container from a network.

## Signature / Usage

```console
$ docker network disconnect [OPTIONS] NETWORK CONTAINER
$ docker network disconnect multi-host-network container1
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--force` |  | Force the container to disconnect from a network |

## Notes

- The container must be running to disconnect it from the network.

## Related

- [docker network connect](./network-connect.md)
- [docker network rm](./network-rm.md)
