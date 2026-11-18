---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-vm-threat-detection-overview
---

# Virtual Machine Threat Detection overview

Virtual Machine Threat Detection (VM Threat Detection) is a built-in Security Command Center service (Premium and Enterprise (Deprecated) service tiers) that scans Compute Engine VMs from the hypervisor to detect cryptocurrency mining software, kernel-mode rootkits and malware, without guest agents. Its findings are high-severity threats that the source recommends you fix immediately. For organizations enrolled in Premium, scans are automatically enabled; you can disable the service or enable it at the project level.

## Signature / Usage

### Allow VM Threat Detection scanning under an organization policy constraint

Some organization policy constraints, such as `constraints/compute.storageResourceUseRestrictions`, can interfere with the Security Center Service Agent listing VMs and cloning disks to Google-owned projects, so scanning might not work. The source recommends adding the `google.com` organization (ID `433637338589`) to the allowlist policies.

Adapted (not in the official docs): the source YAML is invalid (`-- values:` is not a YAML list item) and uses the placeholder `Org-A`; rewritten as `- values:` in the `spec.rules[].values.allowedValues` shape of the Organization Policy v2 API, with an upper-case `ORGANIZATION_ID` placeholder.

```yaml
name: organizations/ORGANIZATION_ID/policies/compute.storageResourceUseRestrictions
spec:
  rules:
  - values:
      allowedValues:
      - under:organizations/433637338589
```

## Options / Props

### Scan frequency

| Detection | Frequency | Findings generated |
|---|---|---|
| Memory scanning | Each VM immediately after it is created, then every 30 minutes | |
| Cryptocurrency mining | (memory scan) | One finding per process, per VM, per day; unassociated threats are grouped into a single finding per VM per 24-hour period; persisting threats get new findings every 24 hours |
| Kernel-mode rootkit | (memory scan) | One finding per category, per VM, every three days |
| Persistent disk scanning (malware) | Each VM at least daily | |

### Cryptocurrency mining findings (High severity by default)

| Category | Module | Description |
|---|---|---|
| `Execution: Cryptocurrency Mining Hash Match` | `CRYPTOMINING_HASH` | Matches memory hashes of running programs against known cryptocurrency mining software hashes. |
| `Execution: Cryptocurrency Mining YARA Rule` | `CRYPTOMINING_YARA` | Matches memory patterns (for example proof-of-work constants) used by mining software. |
| `Execution: Cryptocurrency Mining Combined Detection` | `CRYPTOMINING_HASH`, `CRYPTOMINING_YARA` | A threat detected by both modules. |

### Kernel-mode rootkit findings (High severity by default)

| Category | Module | Description |
|---|---|---|
| `Defense Evasion: Rootkit` | `KERNEL_MEMORY_TAMPERING`, `KERNEL_INTEGRITY_TAMPERING` | A combination of signals matching a known kernel-mode rootkit; both modules must be enabled to receive this category. |
| `Defense Evasion: Unexpected kernel read-only data modification` | `KERNEL_MEMORY_TAMPERING` | Unexpected modifications of kernel read-only data memory. |
| `Defense Evasion: Unexpected ftrace handler` | `KERNEL_INTEGRITY_TAMPERING` | `ftrace` points with callbacks outside the expected kernel or module code range. |
| `Defense Evasion: Unexpected interrupt handler` | `KERNEL_INTEGRITY_TAMPERING` | Interrupt handlers outside the expected kernel or module code regions. |
| `Defense Evasion: Unexpected kernel modules` | `KERNEL_INTEGRITY_TAMPERING` | Kernel code pages outside the expected kernel or module code regions. |
| `Defense Evasion: Unexpected kprobe handler` | `KERNEL_INTEGRITY_TAMPERING` | `kprobe` points with callbacks outside the expected range. |
| `Defense Evasion: Unexpected processes in runqueue` | `KERNEL_INTEGRITY_TAMPERING` | Processes in the scheduler run queue but not in the process task list. |
| `Defense Evasion: Unexpected system call handler` | `KERNEL_INTEGRITY_TAMPERING` | System call handlers outside the expected kernel or module code regions. |

### Malware findings (Medium severity by default)

| Category | Module | Cloud provider | Description |
|---|---|---|---|
| `Malware: Malicious file on disk` | `MALWARE_DISK_SCAN_YARA_AWS` | AWS | Scans persistent disks of Amazon EC2 VMs and matches known malware signatures. |
| `Malware: Malicious file on disk (YARA)` | `MALWARE_DISK_SCAN_YARA` | Google Cloud | Scans persistent disks of Compute Engine VMs and matches known malware signatures. |

### Limitations

| Limitation | Detail |
|---|---|
| Windows VMs | Limited support: cryptocurrency mining detection primarily focuses on Linux binaries; kernel-mode rootkit detection supports only Linux. |
| Confidential VM | Not supported (memory is protected by cryptography). |
| Arm-based processors | Not supported. |
| Disk scanning | Persistent disks encrypted with CSEK or CMEK are not supported; only `vfat`, `ext2` and `ext4` partitions are scanned. |
| Service agent | Requires the Security Center Service Agent to list VMs and clone disks to Google-owned projects; constraints such as `constraints/compute.storageResourceUseRestrictions` can break scanning. |
| Environments | Relies on Google Cloud's hypervisor and Compute Engine; cannot run on-premises or in other public clouds (AWS EC2 malware detection is the Preview exception below). |
| VPC Service Controls | Add ingress and egress rules in each perimeter you want scanned (see Allow VM Threat Detection to access VPC Service Controls perimeters). |

## Notes

- How it works: a managed service built into Google Cloud's hypervisor that periodically scans the memory of a running guest VM without pausing it, and periodically scans disk clones. No CPU cycles are used in the guest and no network connectivity or signature updates are needed. Malware detection takes short-lived clones of the persistent disk without disrupting workloads.
- Multicloud (Preview, Pre-GA Offerings Terms apply): malware detection is also available for Amazon EC2 VMs. To scan AWS VMs you must be a Security Command Center Enterprise customer and first enable VM Threat Detection for AWS; enable it at the organization level only. Scanning uses resources on both Google Cloud and AWS. The Enterprise tier shuts down on May 21, 2027 (organizations move to Premium on or after that date).
- Privacy: the service accesses disk clones and memory of a running VM and analyzes only what is necessary; data is encrypted in transit and processed by automated systems. Scans run in the VM's region, but findings and metadata (such as project and organization numbers) might be stored outside those regions.
- The allowlist above trusts an organization owned by Google (`google.com`, ID `433637338589`) for the named constraint only, as the source recommends; apply it only when the constraint blocks scanning. The source says to add it to your allowlist policies: merge it with your existing `allowedValues` rather than replacing them (applying the YAML as shown sets exactly this value), because changing this constraint is disruptive; try it on a disposable project first.
- Corrected from the official docs: the source example shows `-- values:` under `rules:` and the placeholder `name: organizations/Org-A/policies/compute.storageResourceUseRestrictions`; both were replaced (see the Adapted line). The Organization Policy v2 API (Discovery document `orgpolicy` v2) gives the policy name as `organizations/{organization_number}/policies/{constraint_name}` and `spec.rules[].values` as a `StringValues` message with `allowedValues` / `deniedValues`, where `under:` denotes a resource subtree.
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-vm-threat-detection-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-threats.md](./overview-threats.md)
- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
- [correlated-threats-overview.md](./correlated-threats-overview.md)
