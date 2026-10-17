---
source: https://docs.docker.com/reference/cli/docker/container/export/
---

# docker container export

Export a container's filesystem as a tar archive. Alias: `docker export`.

## Signature / Usage

```console
$ docker container export [OPTIONS] CONTAINER
$ docker export red_panda > latest.tar
$ docker export --output="latest.tar" red_panda
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-o`, `--output` |  | Write to a file, instead of STDOUT |

## Notes

- Does not export the contents of volumes associated with the container. If a volume is mounted on top of an existing directory, the underlying directory's contents are exported, not the volume's.
- For exporting volume data, see "Backup, restore, or migrate data volumes" in the Engine storage volumes docs.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container commit](./container-commit.md)
- [docker container cp](./container-cp.md)
