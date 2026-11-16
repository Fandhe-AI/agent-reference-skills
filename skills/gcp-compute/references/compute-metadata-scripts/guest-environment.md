---
source: https://docs.cloud.google.com/compute/docs/images/guest-environment
---

# Guest environment

The guest environment is the set of scripts, daemons and binaries an instance needs to run on Compute Engine. It talks to the metadata server and is preinstalled on most Google-provided public OS images. Packages come from Google or the OS distributor.

## Signature / Usage

### Install or upgrade a Windows driver

```bash
googet install DRIVER_PACKAGE_NAME
```

### Switch to the global repository track (before September 3, 2026 per the source)

APT (Debian), in `/etc/apt/sources.list.d/google-cloud.list`.

Adapted (not in the official docs): the repository URL uses `https://` instead of the source's `http://`, matching the YUM and GooGet examples of the same page.

```text
deb [signed-by=/etc/apt/keyrings/google-keyring.gpg] https://packages.cloud.google.com/apt google-compute-engine-${VERSION_CODENAME}-global main
```

YUM / DNF (RHEL, CentOS, Rocky Linux), in a repo file such as `/etc/yum.repos.d/google-cloud.repo`:

```ini
[google-cloud-compute-global]
name=Google Cloud Compute Engine Global
baseurl=https://packages.cloud.google.com/yum/repos/google-cloud-compute-${DISTRO}-${ARCH}-global
enabled=1
gpgcheck=1
```

GooGet (Windows):

```text
googet addrepo google-compute-engine-global https://packages.cloud.google.com/yuck/repos/google-compute-engine-global
```

## Options / Props

### Linux packages

| Package | Role | Source |
|---|---|---|
| `google-guest-agent` | Guest agent; reads and writes VM metadata, logs to serial port and optionally Cloud Logging | `GoogleCloudPlatform/guest-agent` |
| `google-compute-engine` | `systemd` init scripts; `udev`, `sysctl`, `rsyslog`, `dhcp` configs for hostname setting; boot-time bash scripts; `gce-resolved.conf` (since October 2024) routes `.local` Cloud DNS lookups to the metadata server and can be removed if you do not use `.local` domains or it conflicts | `GoogleCloudPlatform/guest-configs` |
| `google-compute-engine-oslogin` | OS Login: Authorized Keys Command, NSS modules, PAM modules, `google_oslogin_nss_cache`, `selinux` policy | `GoogleCloudPlatform/guest-oslogin` |
| `gce-disk-expand` | Boot disk resizing | `GoogleCloudPlatform/guest-diskexpand` |
| `google-osconfig-agent` | OS Config agent for VM Manager (inventory, patches, policies); sends nothing until enabled | `GoogleCloudPlatform/guest-osconfig` |

List installed packages with the command in the "Installed packages by operating system version" table of the install page.

### Windows packages (installed with `GooGet`; list with `googet installed`)

| Package | Role |
|---|---|
| `google-compute-engine-windows` | Windows guest agent; logs to Application Event Log, serial port, Cloud Logging |
| `google-compute-engine-sysprep` | Generalizing scripts before image creation and the first-boot `instance_setup.ps1` |
| `google-compute-engine-metadata-scripts` | Runs `sysprep-specialize`, startup and shutdown scripts; reads Cloud Storage for `sysprep-specialize-script-url` and `windows-startup-script-url` |
| `google-compute-engine-powershell` | Shared PowerShell module |
| `google-compute-engine-auto-updater` | Updates Compute Engine packages daily; not installed by default; install with `googet -noconfirm install google-compute-engine-auto-updater` |
| `google-compute-engine-diagnostics` | Collects diagnostics into a Cloud Storage bucket |
| `certgen` / `GooGet` | Certificate creation / package manager (reads `packages.cloud.google.com`) |
| `google-compute-engine-vss` | VSS agent and provider for persistent disk snapshots |
| `google-osconfig-agent` | OS Config agent (see above) |

| Windows driver | Package |
|---|---|
| Ethernet adapter | `google-compute-engine-driver-netkvm` |
| SCSI disk | `google-compute-engine-driver-vioscsi` |
| Display adapter | `google-compute-engine-driver-gga` |
| Crash handler | `google-compute-engine-driver-pvpanic` |
| Virtio memory balloon | `google-compute-engine-driver-balloon` |
| Google virtual NIC | `google-compute-engine-driver-gvnic` |

## Notes

- Package repository rollouts: starting September 3, 2026 Compute Engine moves the default stable track to a regional rollout (region by region, up to two weeks to reach all locations). Multi-region deployments may temporarily see different package versions. If you need consistency, point APT, YUM/DNF, Zypper or GooGet at the `-global` track (published to all regions after the regional repositories are updated); otherwise no action is needed.
- Corrected from the official docs: the source APT line is `deb [signed-by=...] http://packages.cloud.google.com/apt ...`; the YUM and GooGet examples on the same page use `https://`.
- Distance: OS Login here is the guest package on Compute Engine VMs; IAM concepts in general are in `gcp-foundation`.
- The Linux packages are `deb` or `rpm` built per supported distribution. Full OS image list: https://docs.cloud.google.com/compute/docs/images/os-details#user-space-features
- Source: https://docs.cloud.google.com/compute/docs/images/guest-environment (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [guest-agent.md](./guest-agent.md)
- [linux.md](./linux.md)
- [shutdownscript.md](./shutdownscript.md)
- [overview.md](./overview.md)
