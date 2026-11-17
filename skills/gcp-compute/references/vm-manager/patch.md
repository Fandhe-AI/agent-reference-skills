---
source: https://docs.cloud.google.com/compute/vm-manager/docs/patch
---

# Patch

Patch applies OS patches across sets of Compute Engine VMs and reports patch compliance. A patch deployment schedules patch jobs; a patch job runs across VMs and applies patches using each OS's native update tool.

## Signature / Usage

Patch is configured through the Google Cloud console, Google Cloud CLI or the OS Config API. Requirements: set up VM Manager (OS Config API + OS Config agent). Check the project feature set first:

```bash
gcloud compute os-config project-feature-settings describe \
    --project PROJECT_ID
```

Snippet taken from https://docs.cloud.google.com/compute/vm-manager/docs/setup. To list Google agents installed as packages on Ubuntu:

```bash
apt list --installed | grep -P 'google'
```

## Options / Props

| OS | Update tool used |
|----|------------------|
| RHEL, Rocky Linux, CentOS | `yum upgrade` |
| Debian, Ubuntu | `apt upgrade` |
| SLES | `zypper update` |
| Windows | Windows Update Agent |

| OS family | Updates you can apply (all or a selection) |
|-----------|---------------------------------------------|
| Windows | Definition, driver, feature pack, security, tool updates (or specific KB IDs). Microsoft applications are not updated by default. |
| RHEL / Rocky / CentOS | System updates, security updates |
| Debian / Ubuntu | Distribution updates, package manager updates |
| SLES / openSUSE | System package updates, Zypper patches |

| Vulnerability source | Operating system |
|----------------------|------------------|
| https://access.redhat.com/security/data | RHEL and CentOS (based on the latest minor version of each major version; older minor versions can be inaccurate) |
| https://security-tracker.debian.org/tracker | Debian |
| https://launchpad.net/ubuntu-cve-tracker | Ubuntu |
| https://www.suse.com/support/update | SLES |
| https://errata.rockylinux.org/ | Rocky Linux |
| Windows Update Agent API | Windows |

| Distribution category | Google patch compliance status |
|-----------------------|--------------------------------|
| Critical, Urgent, WINDOWS_CRITICAL_UPDATE | Critical (RED) |
| Important, High, WINDOWS_SECURITY_UPDATE | Important/Security (ORANGE) |
| Everything else | Other (YELLOW) |
| No updates available | Up-to-date (GREEN) |

| Google-managed VM platform | VM Manager behavior |
|----------------------------|---------------------|
| App Engine flexible environment | Disabled in metadata; always No data |
| Serverless VPC Access connector | Disabled on OS image; always No data |
| Managed Service for Apache Spark serverless / personal authentication clusters | Disabled on OS image; always No data |
| Cloud TPU with 1-VM architecture | Not disabled; works as on VMs you manage |
| GKE Autopilot | Not disabled; works as on VMs you manage |

## Notes

- Patch compliance: the OS Config agent reports OS inventory about every 10 minutes; the compliance backend cross-references it with distribution package metadata and the console shows the highest severity per update.
- Instance filters are evaluated when the patch job starts, so environment changes after scheduling are accounted for. You can schedule one-time, recurring and deadline-based deployments with a duration (maintenance window), and cancel in-progress jobs (the agent finishes its current task first).
- The Patch service does not host updates. For VMs without public IPs or in private VPCs, Google recommends a local repository or Windows Server Update Service, or Cloud NAT / proxy. You cannot host a local repository on PAYG RHEL, RHEL for SAP, SLES and SLES for SAP images.
- Limitations: patch jobs run only for VMs in a single project (no cross-project, even with Shared VPC; compliance data can be viewed across projects). By default VMs in a managed instance group (MIG) are not patched (can be overridden when creating the job); MIG repair recreates the VM from the instance template and may revert patches, and autoscaling MIGs delete patched VMs and create unpatched ones.
- No data in the dashboard can mean: unresponsive VM, agent not installed, OS inventory management not enabled, unsupported OS, or a Google-managed VM.
- Patching reboots and package changes affect running workloads; test on a non-production VM first. VPC / Cloud NAT concepts themselves are in `gcp-networking`.
- Source inconsistency: this page says "The Patch service does not host or maintain package updates or patches" and, for a VM that "doesn't use public IPs" or a "private VPC network", recommends "hosting your own local repository or a Windows Server Update Service" or making "external update sources available to your VMs by using Cloud NAT or other proxy services", while overview.md says "For VMs in private networks, you can set up Private Google Access" to reach package sources and repositories; private-google-access.md says such VMs "can reach the external IP addresses of Google APIs and services". For package repositories outside Google, follow this page.
- Source (VM Manager overview, cited above as `overview.md`): https://docs.cloud.google.com/compute/vm-manager/docs/overview (retrieved 2026-11-17)
- Source (Private Google Access, cited above as `private-google-access.md`): https://docs.cloud.google.com/vpc/docs/private-google-access (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/patch (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/compute/vm-manager/docs/setup (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [setup.md](./setup.md)
- [os-inventory-management.md](./os-inventory-management.md)
- Creating patch jobs: https://docs.cloud.google.com/compute/vm-manager/docs/patch/create-patch-job
