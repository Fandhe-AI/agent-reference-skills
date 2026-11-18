---
source: https://docs.cloud.google.com/compute/shielded-vm/docs/integrity-monitoring
---

# Monitoring the integrity of Shielded VM instances

Use Cloud Monitoring and Cloud Logging to watch boot integrity of Shielded VM instances that have integrity monitoring enabled, find the cause of an integrity validation failure, and update the integrity policy baseline.

## Signature / Usage

### Update the integrity policy baseline (gcloud)

Uses `compute instances update` with `--shielded-learn-integrity-policy`; the source example resets the baseline of a VM:

```bash
gcloud compute instances update INSTANCE_NAME \
    --zone=ZONE \
    --shielded-learn-integrity-policy
```

Replace `INSTANCE_NAME` with the name of the VM and `ZONE` with the zone where it exists.

### Update the integrity policy baseline (REST)

Use the `updateAutoLearnPolicy` request body item with the `setShieldedInstanceIntegrityPolicy` method.

Adapted (not in the official docs): removed `?key=YOUR_API_KEY` from the URL (the source lists `YOUR_API_KEY` as "An API key that lets you access the API"; this method is IAM-protected, so send an OAuth access token in an `Authorization: Bearer` header instead of putting a key in the URL).

```http
PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/setShieldedInstanceIntegrityPolicy
{
  "updateAutoLearnPolicy": true
}
```

Replace `PROJECT_ID` with the project ID, `INSTANCE_NAME` with the VM name, and `ZONE` with its zone.

## Options / Props

| Task | Where / what |
|---|---|
| View validation events | Metrics Explorer, resource "VM instance", category "Instance", metrics "Early Boot Validation" and "Late Boot Validation" (pass/fail). Shielded VMs with integrity monitoring disabled show as unknown. |
| Alerts | Alert on the two metrics; policy settings: `Compute Engine early boot validation` and `Compute Engine late boot validation` in the alerting target-configuration library. |
| Event details | VM instance details page, Logs, Cloud Logging; entries `earlyBootReportEvent` / `lateBootReportEvent`, `jsonPayload`, `policyEvaluationPassed`, `actualMeasurements`, `policyMeasurements`. |
| Automate responses | Export Cloud Logging logs and process them, for example in Cloud Run functions. |
| Update the baseline | Needs the `setShieldedInstanceIntegrityPolicy` permission; the VM must be running. |

## Notes

- Early boot runs from the start of the UEFI firmware to the bootloader; late boot from the bootloader through loading the OS kernel.
- Diagnosing a failure: find the latest `earlyBootReportEvent` / `lateBootReportEvent` with `policyEvaluationPassed` false, compare `actualMeasurements` and `policyMeasurements`. Element numbers seldom match PCR numbers. On Windows, elements for PCR13 and PCR14 do not appear in `policyMeasurements` until after the first reboot; until then validation uses only PCR4, PCR7 and PCR11.
- Source inconsistency: this page says "in the early boot sequence for both Windows and Linux, the `3` element in `actualMeasurements` and the `2` element in `policyMeasurements` both represent PCR7", while shielded-vm.md lists Linux early boot element `2` of `actualMeasurements` as PCR7; both are kept as written.
- Update the baseline after planned boot-specific changes (kernel updates, kernel driver installation). For an unexpected failure, investigate and be prepared to stop the instance. The initial baseline comes from the implicitly trusted boot image at instance creation.
- Adapted from the official docs: the source REST example is `PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/setShieldedInstanceIntegrityPolicy?key=YOUR_API_KEY`; the `?key=YOUR_API_KEY` parameter and its placeholder bullet were removed.
- The source also shows Console steps (Metrics Explorer, VM details) which are summarized in the table above.
- Distance line: Shielded VM on Compute Engine; Cloud Monitoring / Logging themselves are in the `gcp-observability`, Security Command Center in `gcp-security-compliance`.
- Source (compared page): https://docs.cloud.google.com/compute/shielded-vm/docs/shielded-vm (shielded-vm.md) (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/shielded-vm/docs/integrity-monitoring (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [shielded-vm.md](./shielded-vm.md)
- [organization-policies.md](./organization-policies.md)
