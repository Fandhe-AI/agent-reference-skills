---
source: https://docs.cloud.google.com/compute/docs/instances/stop-start-instance
---

# Stop and start a compute instance

Manually stop or restart a Compute Engine instance. After a stop completes and the instance state is `TERMINATED`, you can restart it or delete it. A stopped instance keeps its attached disks, configuration, IP addresses, MAC addresses and metadata; to also keep in-memory state, suspend the instance instead.

## Signature / Usage

### Stop an instance (no Local SSD disks)

```bash
gcloud compute instances stop INSTANCE_NAMES \
    --zone=ZONE
```

Skip or end an ongoing graceful shutdown:

```bash
gcloud compute instances stop INSTANCE_NAMES \
    --no-graceful-shutdown \
    --zone=ZONE
```

REST:

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/stop
```

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME/stop?noGracefulShutdown=true
```

### Stop an instance with Local SSD disks

Discard Local SSD data (destructive for the Local SSD contents):

```bash
gcloud compute instances stop INSTANCE_NAMES \
    --discard-local-ssd=true \
    --zone=ZONE
```

Preserve Local SSD data (Preview, `gcloud beta` only):

```bash
gcloud beta compute instances stop INSTANCE_NAMES \
    --discard-local-ssd=false \
    --zone=ZONE
```

Combined with skipping graceful shutdown (`--discard-local-ssd=false` requires `gcloud beta`):

```bash
gcloud compute instances stop INSTANCE_NAMES \
    --discard-local-ssd=DISCARD_LOCAL_SSD \
    --no-graceful-shutdown \
    --zone=ZONE
```

REST:

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/stop?discardLocalSsd=true
```

```http
POST https://compute.googleapis.com/compute/beta/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/stop?discardLocalSsd=false
```

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME/stop?discardLocalSsd=DISCARD_LOCAL_SSD&noGracefulShutdown=true
```

### Stop from the guest OS

Linux (clean shutdown after shutdown scripts finish, or forced):

```bash
sudo shutdown -h now
```

```bash
sudo poweroff
```

Windows (clean shutdown after shutdown scripts finish, or forced):

```text
shutdown /s
```

Adapted (not in the official docs): the source shows `shutdown /f` alone; `/s` is added because `/f` only forces running applications to close and does not select the shutdown action.

```text
shutdown /s /f
```

### Restart an instance (no CSEK-encrypted disks)

```bash
gcloud compute instances start INSTANCE_NAMES \
    --zone=ZONE
```

```http
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/start
```

### Restart an instance with CSEK-encrypted disks

Use `gcloud beta compute instances start` instead if you use an RSA-wrapped key.

```bash
gcloud compute instances start INSTANCE_NAMES \
    --csek-key-file=ENCRYPTION_KEY_FILE \
    --zone=ZONE
```

```http
POST  https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE_NAME/startWithEncryptionKey

{
  "disks": [
    {
      "source": "DISK_URL",
      "diskEncryptionKey": {
        "ENCRYPTION_TYPE": "ENCRYPTION_KEY"
      }
    }
  ]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `INSTANCE_NAMES` | string list | Space-separated instance names in the same zone, e.g. `instance-01 instance-02 instance-03`. |
| `ZONE` | string | Zone where the instances exist. |
| `--no-graceful-shutdown` / `noGracefulShutdown=true` | flag / query | Skip or end an ongoing graceful shutdown (only relevant if graceful shutdown is enabled). |
| `--discard-local-ssd` / `discardLocalSsd` | bool | `true` discards Local SSD data; `false` preserves it. `false` is Preview and needs `gcloud beta` / the `beta` REST endpoint. Not available for machine types that use Titanium SSD. |
| `--csek-key-file` | path | Relative path to the JSON key file for customer-supplied encryption keys. Multiple instances can be restarted together only if they use the same key. |
| `DISK_URL` | string | Resource URL of the attached disk encrypted with a customer-supplied key. |
| `ENCRYPTION_TYPE` | enum | `rawKey`, `kmsKeyName` or `rsaEncryptedKey`. `rsaEncryptedKey` requires the `beta.instances.startWithEncryptionKey` method. |
| `ENCRYPTION_KEY` | string | Key for the attached disks; `rawKey` / `rsaEncryptedKey` must be base64-encoded. |

### Required roles and permissions

Role: Compute Instance Admin (v1), `roles/compute.instanceAdmin.v1`, on the project.

| Action | Permission |
|--------|------------|
| Stop | `compute.instances.stop` |
| Stop from the guest OS (instance-level public SSH keys) | `compute.instances.setMetadata` |
| Restart | `compute.instances.start` |
| Restart with encryption keys | `compute.instances.startWithEncryptionKey` |

## Notes

- Source inconsistency: the Limitations section says "You can't restart TPU compute instances. After you stop TPU compute instances, you can only delete them.", while suspend-stop-reset-instances-overview.md (compute-overview) says for TPUs under stop "Not supported. If a TPU is attached to an instance, then you can't stop the instance."
- Source (`--discard-local-ssd`): `gcloud compute instances stop --help` and `gcloud beta compute instances stop --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source (suspend, stop and reset overview): https://docs.cloud.google.com/compute/docs/instances/suspend-stop-reset-instances-overview (retrieved 2026-11-17)
- Source (CSEK deprecation notice): https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine (retrieved 2026-11-17)
- Corrected from the official docs: the forced Windows shutdown is `shutdown /f` in the source. `/f` forces running applications to close without warning but does not choose an action; `shutdown /s /f` shuts down the guest OS with forced application close.
- Source: https://docs.cloud.google.com/compute/docs/instances/stop-start-instance (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Limitations: an instance can be stopped or restarted only if its lifecycle state allows it; restart needs sufficient resources in the zone; TPU instances cannot be restarted, only deleted after stopping.
- After a stop you still pay for attached disks, disk snapshots and external IP addresses; detach and delete what you no longer need.
- Stopping from the guest OS discards Local SSD data unless you first copy it to durable storage. Stopping from Google Cloud lets you choose to discard or preserve (Preview) Local SSD data. Shutdown scripts must finish before the instance stops. Stopping from the guest OS can skip or end graceful shutdown.
- `DISCARD_LOCAL_SSD` in the GA `gcloud compute instances stop ... --no-graceful-shutdown` command and the v1 REST URL with `noGracefulShutdown=true`: use `true` there; `true` permanently discards the Local SSD data, so try it on a disposable instance first. For `false` this page says "If you specify `false`, then you must use the `gcloud beta compute instances stop` command" and, for REST, "you must make a `POST` request to the `beta.instances.stop` method".
- Source inconsistency: this page requires `gcloud beta` for `--discard-local-ssd=false`, while the gcloud help of both `gcloud compute instances stop` and `gcloud beta compute instances stop` says "To stop the VM and preserve the Local SSD data when you stop the VM by setting --discard-local-ssd=False.", documents the flag as "If set to true, local SSD data is discarded." and says "Using '--discard-local-ssd' without a value defaults to True."
- Destructive: `--discard-local-ssd=true` and guest-OS shutdown with Local SSD disks lose that data. Try on a disposable instance first.
- If you preserve Local SSD data, Compute Engine stores it on durable storage while stopped; verify enough disk quota first. You may need to remount Local SSD disks after restart.
- Stopping multiple instances at once: Console, or gcloud for instances in the same zone. Restarting across zones: Console only.
- Keep CSEK key files and raw keys out of source control and shell history.
- Source inconsistency: the Compute Engine deprecations page lists customer-supplied encryption keys (CSEKs) as deprecated "June 15, 2026" with shutdown "June 16, 2027", while the CSEK deprecation notice page (csek-deprecation-in-compute-engine.md in this skill) says "As of **July 20, 2026**, you can no longer use a CSEK to encrypt" Persistent Disks, images, machine images, standard and archive snapshots, and instant snapshots, and "CSEK will be completely removed from Compute Engine on **July 20, 2027**." As of the retrieval date 2026-11-17 the earlier dates of both pages have passed, so new CSEK encryption is blocked per the notice page; the removal date differs by about a month between the pages. The CSEK restart procedure on this page therefore applies only to instances whose existing disks are already CSEK-encrypted; it is not a way to encrypt new disks.
- The source also shows Console steps and Go, Java, Node.js, PHP and Python client-library samples; they are omitted here.

## Related

- [deleting-instance.md](./deleting-instance.md)
- Schedule start/stop: https://docs.cloud.google.com/compute/docs/instances/schedule-instance-start-stop
- Suspend/resume: https://docs.cloud.google.com/compute/docs/instances/suspend-resume-instance
- Graceful shutdown: https://docs.cloud.google.com/compute/docs/instances/graceful-shutdown-overview
