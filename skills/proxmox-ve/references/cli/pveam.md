# pveam

Proxmox VE Appliance Manager. Downloads and manages LXC container OS templates from the Proxmox template repository.

## Signature / Usage

```bash
pveam <COMMAND> [OPTIONS]
pveam help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `update` | Refresh the container template database from the repository |
| `available` | List available templates from the online repository |
| `download <storage> <template>` | Download a template to a storage location |
| `list <storage>` | List templates stored on a given storage |
| `remove <template-path>` | Remove a template |

## Options / Props

Key options for `pveam available`:

| Name | Type | Description |
|------|------|-------------|
| `--section` | enum | Filter by category: `system`, `mail`, `turnkeylinux` |

Key options for `pveam download`:

| Name | Type | Description |
|------|------|-------------|
| `<storage>` | string | Target storage ID (must support `vztmpl` content type) |
| `<template>` | string | Template filename (as shown in `pveam available`) |

## Notes

- Run `pveam update` before `pveam available` to get the latest template list.
- The storage must be configured with content type `vztmpl` to accept templates.
- Downloaded templates are used with `pct create` via the `--ostemplate` option.
- Template filenames follow the pattern `<distro>-<version>-standard_<ver>_<arch>.tar.zst`.

## Related

- [pct.md](./pct.md)
- [pvesm.md](./pvesm.md)
