---
source: https://docs.docker.com/engine/cli/filter/
---

# Filter commands

Use the `--filter` flag to scope commands so that they only include entries matching the pattern you specify.

## Signature / Usage

```console
$ docker COMMAND --filter "KEY=VALUE"
$ docker images --filter reference=alpine
```

Combine filters (logical OR for the same key):

```console
$ docker images --filter reference=alpine:latest --filter=reference=busybox
```

Negated label filters:

```console
$ docker container prune --filter "label!=foo"
$ docker container prune --filter "label!=foo" --filter "label!=bar"
```

## Notes

- The flag takes a key-value pair separated by an operator: equals (`=`) or not equals (`!=`). Available fields depend on the command; some filters need an exact match, others partial matches or regular expressions. Check each command's CLI reference.
- Multiple `--filter` flags for the same key are combined as a logical `OR` (as in the `reference` example above). How filters with different keys combine depends on the command; check each command's CLI reference.
- Multiple negated filters create a single negative constraint, a logical `AND`: the last example above prunes all containers except those labeled both `foo` and `bar`; containers labeled either but not both are pruned.
- Commands supporting `--filter` include `docker config ls`, `container prune`, `image prune`, `image ls`, `network ls`, `network prune`, `node ls`, `node ps`, `plugin ls`, `container ls`, `search`, `secret ls`, `service ls`, `service ps`, `stack ps`, `system prune`, `volume ls`, `volume prune`.

## Related

- [Docker object labels](./labels.md)
- [Prune unused Docker objects](./pruning.md)
- [Format command and log output](./cli-formatting.md)
