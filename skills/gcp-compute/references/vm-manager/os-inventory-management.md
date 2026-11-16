---
source: https://docs.cloud.google.com/compute/vm-manager/docs/os-inventory/os-inventory-management
---

# OS inventory management

OS inventory management collects and exposes OS details of VMs: hostname, OS, kernel, installed packages, available updates, Windows applications and vulnerability reports. The OS Config agent scans the VM and sends data to the metadata server, the OS Config API and log streams.

## Signature / Usage

Inventory is read through guest attributes or the OS Config API, or with `gcloud compute instances os-inventory describe` (append `--format=JSON` to see fields hidden in the default output). Enabling it needs VM Manager on the VM:

```bash
gcloud compute instances add-metadata VM_NAME \
  --metadata=enable-osconfig=TRUE
```

Snippet taken from https://docs.cloud.google.com/compute/vm-manager/docs/setup; the inventory twin has no code. Command reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/os-inventory/describe

## Options / Props

| Item | Detail |
|------|--------|
| Scan interval | Every 10 minutes by default; change with metadata `osconfig-poll-interval` |
| Data provided | Hostname, LongName (e.g. `Microsoft Windows Server 2016 Datacenter`), ShortName (e.g. `Windows`), kernel version, architecture, OS version, OS Config agent version, last updated |
| Linux collection | Parses `/etc/os-release` (or equivalent); package data via `apt`, `yum`, GooGet |
| Windows collection | Windows system APIs; Windows Update agent for installed and available updates |
| Storage | OS Config API; installed packages / updates are gzip-compressed then base64 encoded |
| Log streams | Serial port, system logs (Windows event log, Linux syslog), stdout, Cloud Logging (only if enabled on the VM) |
| Installed packages | RPM (RHEL), DEB (Debian/Ubuntu), GooGet (Windows Server): name, architecture, version |
| Windows updates | Title, Description, Categories, CategoryIDs, KBArticleIDs, SupportURL, UpdateID, RevisionNumber, LastDeploymentChangeTime (CategoryIDs, UpdateID, RevisionNumber hidden in default gcloud output; use `--format=JSON`) |
| QuickFixEngineering | Caption, Description, HotFixID, InstalledOn |
| Windows Installer | DisplayName, DisplayVersion, Publisher, InstallDate, HelpLink (requires OS Config agent version `20210811` or later) |
| Vulnerability reports | Require OS Config agent version dated `20201110` or later |

| Vulnerability source | Operating system |
|----------------------|------------------|
| https://access.redhat.com/security/data | RHEL and CentOS |
| https://security-tracker.debian.org/tracker | Debian |
| https://launchpad.net/ubuntu-cve-tracker | Ubuntu |
| https://ftp.suse.com/pub/projects/security/oval/ | SLES |
| https://errata.rockylinux.org/ | Rocky Linux |
| Microsoft Security Response Center | Windows |

## Notes

- Uses: find VMs on a given OS version, list installed packages, list available updates, find missing packages or patches, view vulnerability reports.
- CVE timing: after a package is installed or updated, CVE information appears in VM Manager, Security Command Center and Cloud Asset Inventory within two hours; after a vendor publishes a new advisory, usually within 24 hours. Scans run at least once daily.
- Data retention: stored until the VM is deleted; if the agent stops reporting for a few days, VM Manager deletes the collected inventory and vulnerability data until the agent runs again.
- Limitation: RHEL vulnerability results are based on the latest minor version of each major version, so older minor versions can be inaccurate.
- For the earlier inventory version, `enable-guest-attributes=TRUE` is also required (see [setup.md](./setup.md)).
- Pricing: https://docs.cloud.google.com/compute/vm-manager/docs/pricing (not copied).
- Snippet taken from https://docs.cloud.google.com/compute/vm-manager/docs/setup (source twin has no code).
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/os-inventory/os-inventory-management (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [patch.md](./patch.md)
- [setup.md](./setup.md)
