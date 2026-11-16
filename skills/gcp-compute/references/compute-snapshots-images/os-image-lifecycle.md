---
source: https://docs.cloud.google.com/compute/docs/images/os-image-lifecycle
---

# OS image lifecycle

Describes the lifecycle stages of public OS images on Compute Engine (general availability, deprecated or end of support, end of life), extended support options per OS, and image naming, update schedule and deprecation policy.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/compute/docs/images/image-families-best-practices (the source twin has no code block; this is how to see which image a family currently points to):

```bash
gcloud compute images describe-from-family IMAGE_FAMILY_NAME  \
   --project=IMAGE_PROJECT
```

Replace `IMAGE_FAMILY_NAME` (for example `debian-13`) and `IMAGE_PROJECT` (for example `debian-cloud`).

## Options / Props

### Notation for the naming table

| Symbol | Meaning |
|---|---|
| `V` | Numeric OS version |
| `R` | Release string / codename (Debian and Ubuntu only) |
| `N` | Numeric build number (Container-Optimized OS and Fedora CoreOS only) |
| `YYYYMMDD` | Build or publish date, sometimes prefixed with `v` |

### Naming, update schedule, deprecation policy

| OS | Image family | OS image | Update schedule | Deprecation policy |
|---|---|---|---|---|
| CentOS Stream | `centos-stream-V`, `centos-stream-V-arm64` | `centos-stream-V-vYYYYMMDD`, `centos-stream-V-arm64-vYYYYMMDD` | Monthly | Deprecated, still usable |
| Container-Optimized OS | `cos-V-lts`, `cos-arm64-V` | `cos-V-N`, `cos-arm64-V-N` | Monthly | Deprecated, still usable |
| Debian | `debian-V`, `debian-V-arm64` | `debian-V-R-vYYYYMMDD`, `debian-V-R-arm64-vYYYYMMDD` | Monthly | Deprecated, still usable |
| Fedora CoreOS | `fedora-coreos-R`, `fedora-coreos-R-arm64` | `fedora-coreos-V-YYYYMMDD-N-gcp-x86-64`, `fedora-coreos-V-YYYYMMDD-N-gcp-aarch64` | Critical bug or security issues | Deleted on EOS date |
| RHEL | `rhel-V`, `rhel-V-arm64` | `rhel-V-vYYYYMMDD`, `rhel-V-arm64-vYYYYMMDD` | Monthly | Deprecated, still usable |
| RHEL BYOS | `rhel-V-byos`, `rhel-V-byos-arm64`, `rhel-V-sap-byos` | `rhel-V-byos-vYYYYMMDD`, `rhel-V-byos-arm64-vYYYYMMDD`, `rhel-V-sap-byos-vYYYYMMDD` | Monthly | Deprecated, still usable |
| RHEL for SAP | `rhel-V-sap-ha` | `rhel-V-sap-vYYYYMMDD` | Monthly | Deprecated, still usable |
| Rocky Linux | `rocky-linux-V`, `rocky-linux-V-arm64`, `rocky-linux-V-optimized-gcp`, `rocky-linux-V-optimized-gcp-arm64` | `rocky-linux-V-vYYYMMDD`, `rocky-linux-arm64-V-vYYYMMDD`, `rocky-linux-V-optimized-gcp-vYYYYMMDD`, `rocky-linux-V-optimized-gcp-arm64-vYYYYMMDD` | Monthly | Deprecated, still usable |
| SQL Server on Windows Server | `sql-R-V-win-V` | `sql-V-R-windows-V-dc-vYYYYMMDD` | Monthly | Deleted on EOS date |
| SLES | `sles-V`, `sles-V-arm64` | `sles-V-vYYYYMMDD-x86-64`, `sles-V-vYYYYMMDD-arm64` | Quarterly | Deprecated, still usable |
| SLES for SAP | `sles-V-sap`, `sles-V-sap-hardened` | `sles-V-sap-vYYYYMMDD-x86-64`, `sles-V-sap-hardened-vYYYYMMDD-x86-64` | Quarterly | Deprecated, still usable |
| SLES for SAP BYOS | `sles-V-byos`, `sles-V-byos-arm64`, `sles-V-sap-byos` | `sles-V-byos-vYYYYMMDD-x86-64`, `sles-V-byos-vYYYYMMDD-arm64`, `sles-V-sap-byos-vYYYYMMDD-x86-64` | Quarterly | Deprecated, still usable |
| Ubuntu LTS | `ubuntu-V-lts`, `ubuntu-V-lts-arm64`, `ubuntu-minimal-V-lts`, `ubuntu-minimal-V-lts-arm64` | `ubuntu-V-R-vYYYYMMDD`, `ubuntu-V-R-arm64-vYYYYMMDD`, `ubuntu-minimal-V-R-vYYYYMMDD`, `ubuntu-minimal-V-R-arm64-vYYYYMMDD` | Critical bug or security issues | Deprecated, still usable |
| Ubuntu Pro | `ubuntu-pro-V-lts`, `ubuntu-pro-V-lts-arm64`, `ubuntu-pro-fips-V-lts` | `ubuntu-pro-V-R-vYYYYMMDD`, `ubuntu-pro-V-R-arm64-vYYYYMMDD`, `ubuntu-pro-fips-V-R-vYYYYMMDD` | Critical bug or security issues | Deprecated, still usable |
| Windows Server | `windows-V`, `windows-V-core` | `windows-server-V-dc-vYYYYMMDD`, `windows-server-V-dc-core-vYYYYMMDD` | Monthly | Deleted on EOS date |

### Extended support options

| OS | Option |
|---|---|
| RHEL | ELS Add-On (PAYG instances past end of maintenance such as RHEL 7: stop the instance, append the RHEL ELS license URI to the boot disk with `gcloud compute disks update`, install the RHUI ELS client package); Extended Update Support (EUS) for specific minor releases, up to two years after release, via RHEL EUS public images or locking an instance to an EUS point release |
| Rocky Linux | CIQ Long Term Support and commercial support via Cloud Marketplace or CIQ |
| SLES | LTSS (purchase via Cloud Marketplace and SUSE); ESPOS included in the base PAYG license for all SLES for SAP versions except the final SP before the next major release, adding three years under LTSS terms |
| Ubuntu | ESM: upgrade existing LTS VMs to Ubuntu Pro PAYG (install `ubuntu-advantage-pro`, stop the instance, replace the boot disk license with `gcloud compute disks update`), create Ubuntu Pro instances, or BYOS Ubuntu Advantage |
| Windows Server | Microsoft Fixed Lifecycle (5 years Mainstream + 5 years Extended); then Microsoft Extended Security Updates purchased from Microsoft |
| CentOS | CIQ Bridge (CentOS 7), SUSE Multi-Linux Support (in-place conversion via Cloud Marketplace) |

## Notes

- GA stage: a new image gets a name like `debian-13-trixie-v20260827` and a family like `debian-13`. A critical update produces a new image (for example `debian-13-trixie-v20260902`), the family moves to it and the previous image is marked `deprecated`.
- EOS: providers stop updates and images are deprecated; the latest family image is deleted or deprecated, the family can no longer be used, and images can be used only by direct reference (`--image` flag, via gcloud CLI or REST) except Windows, where all images are deleted at EOS. Google doesn't guarantee compatibility with new machine families or CPU platforms for such versions; VMs keep running and remain eligible for Google Cloud support, but issues tied to the deprecated OS may not be resolvable.
- EOL: guest environment software and repositories are no longer updated; VMs can't download packages or updates from the OS vendor, keep running without guaranteed compatibility.
- Extended license changes modify boot disk licenses; stop the instance first and try on a disposable instance.
- Source: https://docs.cloud.google.com/compute/docs/images/os-image-lifecycle (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/compute/docs/images/image-families-best-practices

## Related

- [image-families-best-practices.md](./image-families-best-practices.md)
- [support-maintenance-policy.md](./support-maintenance-policy.md)
- [images.md](./images.md)
