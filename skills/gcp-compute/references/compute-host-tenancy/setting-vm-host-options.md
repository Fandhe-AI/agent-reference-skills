---
source: https://docs.cloud.google.com/compute/docs/instances/setting-vm-host-options
---

# Set VM host maintenance policy

A host maintenance policy determines how a Compute Engine instance responds when its host needs maintenance or hits an error. Configuring it helps minimize downtime and prevent data loss. The policy can be set on an existing instance, while creating an instance, while creating instances in bulk, or in an instance template.

## Signature / Usage

### Set the policy for an existing instance

Uses `gcloud compute instances set-scheduling` (REST: `instances.setScheduling`). Flags: `--maintenance-policy`, `--restart-on-failure` / `--no-restart-on-failure`, `--local-ssd-recovery-timeout`, `--host-error-timeout-seconds`.

```bash
gcloud compute instances set-scheduling INSTANCE_NAME \
    --host-error-timeout-seconds=ERROR_DETECTION_TIMEOUT \
    --local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT \
    --maintenance-policy=MAINTENANCE_POLICY \
    --restart-on-failure \
    --zone=ZONE
```

REST request. The source gives `LOCAL_SSD_RECOVERY_TIMEOUT` as a number of hours; set `LOCAL_SSD_RECOVERY_TIMEOUT_SECONDS` to that number of hours multiplied by 3600 (for example 3 hours = `10800`).

Adapted (not in the official docs): `localSsdRecoveryTimeout` is a `Duration` object in the Compute API (`seconds` is an int64 carried as a string), not a plain number, so the source's `"localSsdRecoveryTimeout": LOCAL_SSD_RECOVERY_TIMEOUT` would be rejected.

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/setScheduling

{
  "automaticRestart": AUTOMATIC_RESTART,
  "hostErrorTimeoutSeconds": ERROR_DETECTION_TIMEOUT,
  "localSsdRecoveryTimeout": {
    "seconds": "LOCAL_SSD_RECOVERY_TIMEOUT_SECONDS"
  },
  "onHostMaintenance": "MAINTENANCE_POLICY"
}
```

### Set the policy while creating an instance

```bash
gcloud compute instances create INSTANCE_NAME \
    --host-error-timeout-seconds=ERROR_DETECTION_TIMEOUT \
    --local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT \
    --machine-type=MACHINE_TYPE \
    --maintenance-policy=MAINTENANCE_POLICY \
    --restart-on-failure \
    --zone=ZONE
```

### Set the policy while creating instances in bulk

```bash
gcloud compute instances bulk create \
    --count=COUNT \
    --host-error-timeout-seconds=ERROR_DETECTION_TIMEOUT \
    --local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT \
    --machine-type=MACHINE_TYPE \
    --maintenance-policy=MAINTENANCE_POLICY \
    --name-pattern=NAME_PATTERN \
    --restart-on-failure \
    --zone=ZONE
```

### Set the policy in an instance template

Omit `--instance-template-region` for a global template.

```bash
gcloud compute instance-templates create INSTANCE_TEMPLATE_NAME \
    --host-error-timeout-seconds=ERROR_DETECTION_TIMEOUT \
    --instance-template-region=REGION \
    --local-ssd-recovery-timeout=LOCAL_SSD_RECOVERY_TIMEOUT \
    --machine-type=MACHINE_TYPE \
    --maintenance-policy=MAINTENANCE_POLICY \
    --restart-on-failure
```

### View the policy

```bash
gcloud compute instances describe INSTANCE_NAME \
   --flatten=scheduling \
   --zone=ZONE
```

Output is similar to:

```yaml
---
scheduling:
  automaticRestart: true
  hostErrorTimeoutSeconds: 120
  localSsdRecoveryTimeout:
    nanos: 0
    seconds: '10800'
  onHostMaintenance: MIGRATE
  preemptible: false
  provisioningModel: STANDARD
```

## Options / Props

| Property | Values | Default |
|---|---|---|
| Maintenance behavior (`onHostMaintenance`, `--maintenance-policy`) | `MIGRATE` (live migrate) or `TERMINATE` (stop) | `MIGRATE` for all instances except Spot VMs and preemptible VMs; `TERMINATE` for those. `TERMINATE` is the only supported value for H4D, Z3 with more than 18,000 GiB Titanium SSD, Z4D/Z4M with more than 42,000 GiB Titanium SSD, instances with a Cloud RDMA network interface, bare metal instances, and instances with GPUs or TPUs. |
| Automatic restart (`automaticRestart`; `--restart-on-failure` / `--no-restart-on-failure`) | `true` / `false` | On for all instances except Spot VMs and preemptible VMs (Off). |
| Local SSD data recovery timeout (`localSsdRecoveryTimeout`; `--local-ssd-recovery-timeout`) | Unset, or integer 0 to 168 (hours); `0` = do not recover Local SSD data and restart immediately | Unset: 168 hours for Z4M bare metal and Z3 bare metal `z3-highmem-192-highlssd-metal`; 6 hours for Z4D, Z4M and Z3 VMs; 1 hour for all others. Applies only to instances with Local SSD disks. |
| Host error timeout (`hostErrorTimeoutSeconds`; `--host-error-timeout-seconds`) | Unset, or integer 90 to 330 (seconds), in increments of 30 | Unset: waits up to 330 seconds (5 minutes 30 seconds). Must be configured before the instance becomes unresponsive. |

### Limitations

- E2 VMs can only live migrate during host maintenance events, unless they are Spot VMs or preemptible VMs.
- These instances can only stop during host events: those that do not support live migration (H4D; Z3 with more than 18,000 GiB Titanium SSD; Z4D and Z4M with more than 42,000 GiB Titanium SSD; Cloud RDMA network interface; bare metal; GPUs or TPUs attached) and Spot VMs / preemptible VMs.
- Spot VMs and preemptible VMs cannot automatically restart after host errors or programmed stops. Including `--restart-on-failure` for them is ignored (same as `--no-restart-on-failure`).
- You cannot change `onHostMaintenance` on an existing E2 VM, Spot VM, preemptible VM, or instance that does not support live migration.

### Required role

Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) on the project. To update the policy on an existing instance, the key permission is `compute.instances.setScheduling` on the instance; creating an instance needs `compute.instances.create` on the project plus the usual image, disk, network and metadata permissions.

## Notes

- Instances that do not support live migration must be configured to `TERMINATE`; otherwise you get errors.
- The Local SSD recovery time does not count toward SLA downtime; the Compute Engine SLA does not cover the instance while it recovers Local SSD data.
- When viewing with gcloud or REST, `localSsdRecoveryTimeout` and `hostErrorTimeoutSeconds` appear only if you specified them while creating or updating the instance.
- Corrected from the official docs: the REST example `"localSsdRecoveryTimeout": LOCAL_SSD_RECOVERY_TIMEOUT` (a plain number of hours) was changed to the `Duration` object `{"seconds": "LOCAL_SSD_RECOVERY_TIMEOUT_SECONDS"}` (hours x 3600), matching the view output above (`seconds: '10800'`) and the Compute API `Scheduling.localSsdRecoveryTimeout` type. The gcloud flag `--local-ssd-recovery-timeout` still takes hours.
- Source inconsistency: this page says Terminate is "the only supported setting for H4D instances, Z3 instances with more than 18,000 GiB of attached Titanium SSD, Z4D and Z4M instances with more than 42,000 GiB of attached Titanium SSD, instances that have a Cloud RDMA network interface, bare metal instances, and instances with GPUs or TPUs attached", while host-maintenance-overview.md says "For all machine series except Z3, you can override this behavior and explicitly set the instances to terminate and optionally restart".
- Source inconsistency (kept as written): the REST bullet lists say to "include the `automaticRestart` field" for both restart and no-restart, and the instance-template gcloud bullet list names REST fields (`onHostMaintenance`, `automaticRestart`, ...) instead of flags; the command and body show the actual flags/fields (`--restart-on-failure` / `--no-restart-on-failure`, `automaticRestart` true/false).
- In gcloud 593.0.0, `gcloud compute instances bulk create` marks `--maintenance-policy` as deprecated in favor of `--on-host-maintenance` (the command above still parses and prints a deprecation warning; help text: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/bulk/create).
- The source also shows Console steps and the REST bodies for `instances.insert`, `instances.bulkInsert`, `instanceTemplates.insert` and `regionInstanceTemplates.insert` (each with a `scheduling` object like the one above); they are omitted here.
- VM-side setting; VPC networks and firewall are in `gcp-networking`.
- Source (About host events, cited above as `host-maintenance-overview.md`): https://docs.cloud.google.com/compute/docs/instances/host-maintenance-overview (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/instances/setting-vm-host-options (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [host-maintenance-overview.md](./host-maintenance-overview.md)
- [live-migration-process.md](./live-migration-process.md)
- [sole-tenant-nodes.md](./sole-tenant-nodes.md)
