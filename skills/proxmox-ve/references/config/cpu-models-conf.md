# cpu-models.conf — Custom CPU Model Configuration File

Configuration file for defining custom CPU models used by QEMU/KVM virtual machines managed by Proxmox VE.

**Path:** `/etc/pve/virtual-guest/cpu-models.conf`

## Signature / Usage

```
cpu-model: <name>
	OPTION value
```

Each custom CPU model starts a new section with `cpu-model: <name>`. Options are indented with a tab or space and use the format `option value`. Blank lines and comments are ignored. The model is referenced in a VM's `cpu` option (`qm.conf`) with a `custom-` prefix, e.g. `custom-<name>`; the prefix itself is omitted in this file.

```ini
cpu-model: avx
	flags +avx;+avx2
	phys-bits host
	hidden 0
	hv-vendor-id proxmox
	reported-model kvm64
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `reported-model` | enum | kvm64 | Base QEMU/KVM CPU model to report to the guest, from the predefined QEMU CPU model list |
| `flags` | string | — | Semicolon-separated CPU flag toggles: `+FLAG` enables, `-FLAG` disables (e.g. `+aes;-hyperv-*`); special `+nested-virt` shorthand enables nested virtualisation flags |
| `phys-bits` | integer (8–64) or `host` | — | Physical memory address bits presented to the guest; using `host` breaks live migration to hosts with different physical-bits |
| `guest-phys-bits` | integer (32–64) | — | Physical address bits available to the guest for its own use |
| `hidden` | boolean | 0 | Hide the KVM identification from the guest (x86-64 only) |
| `hv-vendor-id` | string | — | Hyper-V vendor ID string reported to the guest, for Windows guest compatibility |
| `level` | integer (0–4294967295) | — | Limits the maximum CPUID leaf queried by the guest; `30` is a common workaround for Hyper-V boot failures on Windows guests |

## Notes

- Custom CPU models are managed from the web UI under Datacenter → Custom CPU Models, or directly by editing this file / via CLI (`man cpu-models.conf`).
- A custom model defined as `cpu-model: <name>` is referenced in `qm.conf`'s `cpu` option as `custom-<name>`.
- Access control uses ACL path `/mapping/cpu/<name>` to restrict which users may assign a given custom CPU model.
- Setting `phys-bits host` prevents live migration between hosts with differing physical address bits.

## Related

- [qm-conf.md](./qm-conf.md) — VM configuration file; `cpu` option references custom CPU models defined here
