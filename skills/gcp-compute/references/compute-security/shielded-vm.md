---
source: https://docs.cloud.google.com/compute/shielded-vm/docs/shielded-vm
---

# Shielded VM

Shielded VM gives verifiable integrity of Compute Engine VM instances against boot- or kernel-level malware and rootkits through Secure Boot, a virtual TPM (vTPM) with Measured Boot, and integrity monitoring.

## Signature / Usage

### Reset the integrity policy baseline

The page itself has no code. Snippet taken from https://docs.cloud.google.com/compute/shielded-vm/docs/integrity-monitoring (the VM must be running; you need `setShieldedInstanceIntegrityPolicy`):

```bash
gcloud compute instances update INSTANCE_NAME \
    --zone=ZONE \
    --shielded-learn-integrity-policy
```

Replace `INSTANCE_NAME` with the VM name and `ZONE` with its zone.

## Options / Props

### Triple shield architecture

| Feature | What it is | How it helps |
|---|---|---|
| Secure Boot | UEFI firmware feature; verifies the digital signature of all boot components (firmware drivers, OS bootloader, kernel). | Stops unsigned or tampered bootloaders and kernels; halts boot if a component lacks a trusted signature. |
| vTPM | Virtualized TPM per VM, compatible with TCG TPM library specification 2.0, using BoringSSL (BoringCrypto module, NIST CMVP certificate #5244, FIPS 140-3). | Measured Boot hashes of firmware, bootloader, kernel and drivers; secure key generation and storage (for example BitLocker). |
| Integrity monitoring | Compares current boot measurements with the golden baseline from Measured Boot. | Alerts in Cloud Logging and Security Command Center on discrepancies. |

### Integrity monitoring log events

| Event | Meaning |
|---|---|
| `clearTPMEvent` | The vTPM was cleared (deletes secrets stored in it). |
| `earlyBootReportEvent` | Early boot (UEFI firmware start until control passes to the bootloader) check result and PCR values. |
| `lateBootReportEvent` | Late boot (bootloader until control passes to the OS kernel) check result and PCR values. |
| `setShieldedInstanceIntegrityPolicy` | Logged each time the baseline is updated. |
| `shutdownEvent` / `startupEvent` | VM stopped / started; `startupEvent` carries `bootCounter`. |
| `updateShieldedInstanceConfig` | Logged when a Shielded VM option is enabled or disabled. |

Typical order: `startupEvent`, `earlyBootReportEvent`, `lateBootReportEvent`, `shutdownEvent`, all with the same `bootCounter`. Report event fields: `actualMeasurements`, `policyEvaluationPassed`, `policyMeasurements`.

### PCR mapping (element number to PCR)

| OS / event | `actualMeasurements` | `policyMeasurements` |
|---|---|---|
| Windows early | 0=PCR0, 1=PCR4 (UEFI boot manager), 2=PCR5 (GPT, not validated), 3=PCR7 (Secure Boot policy) | 0=PCR0, 1=PCR4 (not in first boot), 2=PCR7 |
| Windows late | 0=PCR0, 1=PCR4, 2=PCR5 (not validated), 3=PCR7, 4=PCR11 (BitLocker), 5=PCR12 (data events, not validated), 6=PCR13 (kernel and boot drivers), 7=PCR14 (boot authorities) | 0=PCR0, 1=PCR4, 2=PCR7, 3=PCR11, 4=PCR13, 5=PCR14 |
| Linux early | 0=PCR0, 1=PCR4 (OS shim), 2=PCR7 | 0=PCR0, 1=PCR4 (not in first boot), 2=PCR7 |
| Linux late | 0=PCR0, 1=PCR4 (second stage boot loader and kernel), 2=PCR5 (GPT, not validated), 3=PCR7 | 0=PCR0, 1=PCR4, 2=PCR7 |

PCR0 measures only `EV_S_CRTM_VERSION` (firmware version), `EV_NONHOST_INFO` (memory encryption technology) and `EV_SEPARATOR`; it is static for a VM's lifetime and is not used for validation. On Windows late boot, the source says elements 4 and 5 (PCR13, PCR14) of `policyMeasurements` don't appear until after the first reboot following VM creation, when they are captured into the baseline; until then validation uses only elements 1-3 and their PCRs.

### IAM

| Permission | Allows |
|---|---|
| `compute.instances.updateShieldedInstanceConfig` | Change Shielded VM options on a VM. |
| `compute.instances.setShieldedInstanceIntegrityPolicy` | Update the integrity policy baseline. |
| `compute.instances.getShieldedInstanceIdentity` | Retrieve endorsement key information from the vTPM. |

Granted to `roles/compute.instanceAdmin.v1` and `roles/compute.securityAdmin` (and custom roles).

## Notes

- Secure Boot failure shows `UEFI: Failed to load image` and `Status: Security Violation` in the serial console log. To troubleshoot, disable Secure Boot (see https://docs.cloud.google.com/compute/shielded-vm/docs/modifying-shielded-vm), boot, fix, then re-enable. Do not leave Secure Boot off after diagnosis.
- Expected failures (for example after a system update): update the baseline; unexpected failures: stop the VM and investigate. Integrity reports are in Cloud Monitoring, details in Cloud Logging.
- Source inconsistency kept as written: for the Linux and Windows early boot sequence the integrity-monitoring page says element `3` of `actualMeasurements` is PCR7 "for both Windows and Linux"; this page lists element `2` as PCR7 for Linux early boot.
- BitLocker on Windows Shielded VM boot disks: keys live in the vTPM, which is tied to the VM, so a restored snapshot on another disk cannot be decrypted; save the recovery key safely, because without it data is unrecoverable. Data disk keys are not stored in the vTPM, so a recovery key allows recovery from another VM; BitLocker on top of default Persistent Disk encryption may slightly raise vCPU use.
- Secure Boot is off unless you turn it on: this page says "vTPM and integrity monitoring are enabled by default, and Google recommends enabling Secure Boot if possible", and create-enable-service-accounts-for-instances.md's source says "Compute Engine does not enable Secure Boot by default."
- The organization policy constraint `constraints/compute.requireShieldedVm` set to `True` requires all new VMs to be Shielded VMs (organization policy administrator required).
- Limitation: Shielded VM is not supported on bare-metal instances, except A4X and C4A bare metal instances.
- Distance line: Shielded VM on Compute Engine; Cloud Logging / Monitoring themselves are in the planned `gcp-observability`, Security Command Center in the planned `gcp-security`.
- Source (Secure Boot default): https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/shielded-vm/docs/shielded-vm (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/shielded-vm/docs/integrity-monitoring (retrieved 2026-11-17).

## Related

- [integrity-monitoring.md](./integrity-monitoring.md)
- [organization-policies.md](./organization-policies.md)
