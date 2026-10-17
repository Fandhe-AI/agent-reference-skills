---
source: https://docs.docker.com/reference/cli/docker/volume/update/
---

# docker volume update

Update a volume (cluster volumes only). Orchestrator: Swarm.

## Signature / Usage

```console
$ docker volume update [OPTIONS] [VOLUME]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--availability` | `active` | API 1.42+ **Swarm** Cluster Volume availability (`active`, `pause`, `drain`) |

## Related

- [docker volume create](./volume-create.md)
