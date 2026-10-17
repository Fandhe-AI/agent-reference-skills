---
source: https://docs.docker.com/reference/cli/docker/network/rm/
---

# docker network rm

Remove one or more networks by name or identifier. Alias: `docker network remove`.

## Signature / Usage

```console
$ docker network rm NETWORK [NETWORK...]
$ docker network rm 3695c422697f my-network
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--force` |  | Do not error if the network does not exist |

## Notes

- To remove a network, first disconnect any containers connected to it.
- With multiple networks, the command attempts to delete each in turn; if one fails it continues with the next and reports success or failure for each.

## Related

- [docker network disconnect](./network-disconnect.md)
- [docker network prune](./network-prune.md)
