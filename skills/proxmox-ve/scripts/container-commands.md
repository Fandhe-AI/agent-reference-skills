# Container Commands

Commands for managing LXC containers via `pct` and container template images via `pveam`.

## List all containers on current node

```sh
pct list
```

## Show container status

```sh
pct status <vmid>
```

## Show container configuration

```sh
pct config <vmid>
```

## Show configuration including pending changes

```sh
pct pending <vmid>
```

## Create a new container

```sh
pct create <vmid> <ostemplate> [OPTIONS]
```

Common options: `--hostname <name>`, `--memory <mb>`, `--cores <n>`, `--rootfs <storage>:<size>`, `--net0 name=eth0,bridge=vmbr0,ip=dhcp`, `--password`.

Example: `pct create 200 local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst --hostname myct --memory 512 --rootfs local-lvm:8`

## Start a container

```sh
pct start <vmid>
```

## Shutdown a container gracefully

```sh
pct shutdown <vmid>
```

Optional: `--timeout <seconds>`.

## Stop a container immediately

> **警告**: Force-stops the container without a clean shutdown. May cause data loss or filesystem corruption inside the container.

```sh
pct stop <vmid>
```

## Reboot a container

```sh
pct reboot <vmid>
```

## Set container options

```sh
pct set <vmid> [OPTIONS]
```

Example: `pct set <vmid> --memory 1024 --cores 2`

## Delete a container

> **警告**: Removes the container and all associated files permanently. This operation is irreversible.

```sh
pct destroy <vmid>
```

## Enter a shell session in a running container

```sh
pct enter <vmid>
```

## Open a console for a container

```sh
pct console <vmid>
```

## Execute a command inside a running container

```sh
pct exec <vmid> -- <command> [args...]
```

## Clone a container

```sh
pct clone <vmid> <newid>
```

Optional: `--hostname <name>`, `--storage <storage>`, `--full 1` for full clone.

## Convert container to template

```sh
pct template <vmid>
```

## Migrate a container to another node

```sh
pct migrate <vmid> <target-node>
```

Optional: `--restart 1` to stop, migrate, then restart; `--timeout <seconds>`.

## Migrate a container to a remote cluster (experimental)

```sh
pct remote-migrate <vmid> [<target-vmid>] <target-endpoint> \
  --target-bridge <bridge> \
  --target-storage <storage>
```

## Create a container snapshot

```sh
pct snapshot <vmid> <snapname>
```

Optional: `--description <text>`.

## List container snapshots

```sh
pct listsnapshot <vmid>
```

## Roll back to a snapshot

> **警告**: Reverts the container to the snapshot state. All changes made after the snapshot are lost.

```sh
pct rollback <vmid> <snapname>
```

## Delete a snapshot

```sh
pct delsnapshot <vmid> <snapname>
```

## Resize a container disk

```sh
pct resize <vmid> <disk> <size>
```

Example: `pct resize 200 rootfs 20G`

## Move a container volume to different storage

```sh
pct move-volume <vmid> <volume> <storage>
```

Optional: `--delete 1` to remove source after move.

## Show container disk usage

```sh
pct df <vmid>
```

## Run filesystem check on container volumes

```sh
pct fsck <vmid>
```

Optional: `--device <dev>` to check a specific device.

## Trim unused space on container mounts

```sh
pct fstrim <vmid>
```

## Mount container filesystem on host (emergency access)

```sh
pct mount <vmid>
```

## Unmount container filesystem from host

```sh
pct unmount <vmid>
```

## Push a file into a container

```sh
pct push <vmid> <local-file> <destination>
```

Optional: `--user <user>`, `--group <group>`, `--perms <octal>`.

## Pull a file from a container

```sh
pct pull <vmid> <container-path> <local-destination>
```

## Remove a lock from a container

```sh
pct unlock <vmid>
```

## Show CPU assignments across containers

```sh
pct cpusets
```

## Rescan storage for container disk changes

```sh
pct rescan
```

## Restore a container from backup

```sh
pct restore <vmid> <ostemplate>
```

Optional: `--storage <storage>`, `--force 1` (overwrite existing).

> **警告**: Using `--force 1` overwrites an existing container with the same `<vmid>`.

---

## pveam — Container Template Management

## Update the container template database

```sh
pveam update
```

Run before listing available templates to get the latest index.

## List available templates

```sh
pveam available
```

Optional: `--section <mail|system|turnkeylinux>` to filter by category.

## List templates stored on a storage

```sh
pveam list <storage>
```

Example: `pveam list local`

## Download a template to storage

```sh
pveam download <storage> <template>
```

Example: `pveam download local debian-12-standard_12.7-1_amd64.tar.zst`

## Remove a template

> **警告**: Permanently deletes the template file from storage.

```sh
pveam remove <template-path>
```

Example: `pveam remove local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst`
