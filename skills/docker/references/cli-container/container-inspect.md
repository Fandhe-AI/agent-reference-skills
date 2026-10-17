---
source: https://docs.docker.com/reference/cli/docker/container/inspect/
---

# docker container inspect

Display detailed information on one or more containers.

## Signature / Usage

```console
$ docker container inspect [OPTIONS] CONTAINER [CONTAINER...]
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints output using the given Go template. See https://docs.docker.com/go/formatting/ |
| `-s`, `--size` |  | Display total file sizes |

## Notes

- The source page lists no aliases and no examples for this command.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container ls](./container-ls.md)
